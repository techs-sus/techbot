import _h from "he";
const { decode } = _h;
import io from "socket.io-client";

let socket = io("https://trollbox.party");
