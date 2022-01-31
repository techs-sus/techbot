import bot from "./bot";

let instance = new bot("techbot [jest]", "#fff", () => {
	let botsaidstuff = false;
	instance.onMessage = (msg) => {
		if (msg.msg == "helo! " + new Date().getDay()) {
			botsaidstuff = true;
		}
	};
	instance.init();
	it("should be able be able to say stuff", () => {
		return new Promise((resolve) => {
			instance.sendMessage("helo! " + new Date().getDay());
			let s = setInterval(() => {
				if (botsaidstuff) {
					clearInterval(s);
					expect(botsaidstuff).toBe(true);
					resolve(">wins");
				}
			}, 100);
		});
	}, 50000);
});
