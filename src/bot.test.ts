import bot from "./bot";

let instance = new bot("techbot [jest]", "#fff");
let botsaidstuff = false;
instance.onMessage = (msg) => {
	if (msg.msg == "helo! " + new Date().getDay()) {
		botsaidstuff = true;
	}
};
instance.init();

function sleep(time = 2000) {
	return new Promise((resolve) => {
		setTimeout(() => resolve("dome sleeping"), time);
	});
}

it("should be able be able to say stuff", () => {
	return new Promise((resolve) => {
		instance.sendMessage("helo! " + new Date().getDay());
		sleep(5000).then(() => {
			resolve("works");
			expect(botsaidstuff).toBe(true);
		});
	});
}, 10000);
