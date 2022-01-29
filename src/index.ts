const { decode } = require("he");
import bot from "./bot";

let instance = new bot("techbot [e!]", "red");
instance.botIsReady().then(() => {
	instance.onMessage = (data) => {
		if (data.msg.startsWith("e!")) {
			switch (data.msg.slice(1, data.msg.length)) {
				case "test":
					instance.sendMessage("test");
					break;
			}
		}
	};
	instance.init();
});

console.log(instance.version);
