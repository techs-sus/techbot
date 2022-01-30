import bot from "./bot";

let instance = new bot("techbot [jest]", "#fff");
let botsaidstuff = false;
instance.onMessage = (msg) => {
  if (msg.msg == "helo! " + new Date().getDay()) {
    botsaidstuff = true;
    console.log("yes");
  }
};
instance.init();

function sleep(time = 2) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("dome sleeping"), time * 1000);
  });
}

it("should be able be able to say stuff", () => {
  return new Promise((resolve) => {
    instance.sendMessage("helo! " + new Date().getDay());
    sleep(2).then(() => {
      expect(botsaidstuff).toBe(true);
      resolve("works");
    });
  });
}, 10000);
