// World record speedrun of coding a bot base; go!

import io from "socket.io-client";
import http from "http";

class bot {
	public version: string;
	private nickname: string;
	private color: string;
	private socket: SocketIOClient.Socket;
	public onMessage: (message: string) => null;
	public onUserJoined: () => null;
	public onUserLeft: (message: string) => null;
	constructor(nick: string, color: string) {
		this.nickname = nick;
		this.color = color;
		this.socket = io("https://trollbox.party", {
			reconnectionAttempts: Infinity, // Keep trying until infinity and beyond
			timeout: 10000, // wait 10 seconds before retrying
			transports: ["websocket"], // Force websocket
			path: "/api/v0/si",
		});
		this.socket.on("_connected", () => {
			this.socket.emit("user joined", nick, color);
			let atlast = "";
			http.get(
				"https://api.github.com/repos/techs-sus/techbot/commits/main",
				(res) => {
					res.on("data", (data) => {
						atlast += data;
					});
				}
			);
			this.sendMessage(
				"techbot!!!\nversion: " + JSON.parse(atlast).sha + " (latest commit)"
			);
		});
		this.socket.on("message", this.onMessage);
		this.socket.on("user joined", this.onUserJoined);
		this.socket.on("user left", this.onUserLeft);
	}
	sendMessage(message: string) {
		this.socket.emit("message", message);
	}
	changeColor(color: string) {
		this.socket.emit("user joined", this.nickname, color);
		this.color = color;
	}
	changeNickname(nickname: string) {
		this.socket.emit("user joined", nickname, this.color);
		this.nickname = nickname;
	}
	getNickname() {
		return this.nickname;
	}
	getColor() {
		return this.color;
	}
}

export default bot;
