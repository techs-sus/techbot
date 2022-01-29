// World record speedrun of coding a bot base; go!

import io from "socket.io-client";
import axios from "axios";

interface Message {
	nick: string;
	msg: string;
	color: string;
	home: string; // Home is like ip but secured,
	date: number;
}

class bot {
	public version: string;
	private nickname: string;
	private color: string;
	private socket: SocketIOClient.Socket;
	public onMessage: (message: Message) => void;
	public onUserJoined: () => void;
	public onUserLeft: () => void;
	constructor(nick: string, color: string) {
		this.nickname = nick;
		this.color = color;
		this.socket = io("https://trollbox.party", {
			path: "/api/v0/si",
			transports: ["websocket"], // Force websocket
		});
		this.socket.on("_connected", () => {
			this.socket.emit("user joined", nick, color);
		});
		this.version = "";
		axios
			.get("https://api.github.com/repos/techs-sus/techbot/commits/main")
			.then((res) => {
				this.version = res.data.sha.slice(0, 7);
				let tosend = `techbot;\nrunning on Node ${process.version};\nversion: ${this.version} (${res.data.commit.message});\n(node & git edition)`;
				this.sendMessage(tosend);
				console.log(tosend);
			})
			.catch(() => (this.version = "cannot resolve"));
		this.onMessage = () => null;
		this.onUserJoined = () => null;
		this.onUserLeft = () => null;
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
	botIsReady() {
		return new Promise((r) => {
			let x = setInterval(() => {
				if (this.version != "") {
					clearInterval(x);
					r(this.version);
				}
			}, 1);
		});
	}
	init() {
		this.socket.on("message", this.onMessage);
		this.socket.on("user joined", this.onUserJoined);
		this.socket.on("user left", this.onUserLeft);
	}
}

export default bot;
