import bot from "./bot";

let instance = new bot("techbot [jest]", "#fff");
let botsaidstuff = false;
instance.onMessage = (msg) => {
  if (msg.nick == "techbot [jest]" && msg.msg == "helo") {
    botsaidstuff = true;
  }
};
instance.init();

it("should be able be able to say stuff", () => {
  return new Promise((resolve) => {
    instance.sendMessage("helo");
    setInterval(() => {
      expect(botsaidstuff).toBe(true);
      resolve("bot said stuff hopefully")
    }, 2000);
  })
});
