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
  public versionInfo: {
    commitId: string;
    commitReason: string;
  };
  public nickname: string;
  public color: string;
  public socket: SocketIOClient.Socket;
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
    this.versionInfo = {
      commitId: "",
      commitReason: "",
    };
    this.onMessage = () => null;
    this.onUserJoined = () => null;
    this.onUserLeft = () => null;
  }
  public async getVersion() {
    let res = await axios.get(
      "https://api.github.com/repos/techs-sus/techbot/commits/main"
    );
    this.version = res.data.sha.slice(0, 7);
    this.versionInfo.commitId = this.version;
    this.versionInfo.commitReason = res.data.commit.message;
  }
  public sendMessage(message: string) {
    this.socket.emit("message", message);
  }
  public changeColor(color: string) {
    this.socket.emit("user joined", this.nickname, color);
    this.color = color;
  }
  public changeNickname(nickname: string) {
    this.socket.emit("user joined", nickname, this.color);
    this.nickname = nickname;
  }
  public getNickname() {
    return this.nickname;
  }
  public getColor() {
    return this.color;
  }
  public init() {
    this.socket.on("message", this.onMessage);
    this.socket.on("user joined", this.onUserJoined);
    this.socket.on("user left", this.onUserLeft);
  }
}

export default bot;
