"use strict";
// World record speedrun of coding a bot base; go!
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tbparty_1 = __importDefault(require("tbparty"));
const axios_1 = __importDefault(require("axios"));
class bot {
    constructor(nick, color) {
        this.nickname = nick;
        this.color = color;
        this.socket = (0, tbparty_1.default)();
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
    async getVersion() {
        let res = await axios_1.default.get("https://api.github.com/repos/techs-sus/techbot/commits/main");
        this.version = res.data.sha.slice(0, 7);
        this.versionInfo.commitId = this.version;
        this.versionInfo.commitReason = res.data.commit.message;
    }
    sendMessage(message) {
        this.socket.emit("message", message);
    }
    changeColor(color) {
        this.socket.emit("user joined", this.nickname, color);
        this.color = color;
    }
    changeNickname(nickname) {
        this.socket.emit("user joined", nickname, this.color);
        this.nickname = nickname;
    }
    getNickname() {
        return this.nickname;
    }
    getColor() {
        return this.color;
    }
    init() {
        this.socket.on("message", this.onMessage);
        this.socket.on("user joined", this.onUserJoined);
        this.socket.on("user left", this.onUserLeft);
    }
}
exports.default = bot;
