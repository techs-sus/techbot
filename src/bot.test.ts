import bot from "./bot";

let instance = new bot("techbot [jest]", "#fff");
let botsaidstuff = false;
instance.onMessage = (msg) => {
  if (msg.msg == "helo! " + new Date().getDay()) {
    botsaidstuff = true;
  }
};
instance.init();

function sleep(time = 2) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time * 1000);
  });
}

it("should be able be able to say stuff", () => {
  return new Promise((resolve) => {
    instance.sendMessage("helo! " + new Date().getDay());
    await sleep(3);
    expect(botsaidstuff).toBe(true);
    resolve();
  });
}, 10000);
