import bot from "./bot";

it("should be able to connect to trollbox.party", () => {
	return new Promise((resolve) => {
		let instance = new bot("techbot [jest]", "#fff", () => {});
		let botsaidstuff = false;
		instance.onMessage = (msg) => {
			if (msg.msg == "helo! " + new Date().getDay()) {
				botsaidstuff = true;
			}
		};
		instance.init();
		instance.sendMessage("helo! " + new Date().getDay());
		let s = setInterval(() => {
			if (botsaidstuff === true) {
				clearInterval(s);
				expect(botsaidstuff).toBe(true);
				instance.disconnect();
				resolve(true);
			}
		}, 50);
	});
}, 50000);
