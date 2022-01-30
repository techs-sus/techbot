import bot from "./bot";

let instance = new bot("techbot [jest]", "#fff");
let botsaidstuff = false;
instance.onMessage = (msg) => {
  if (msg.nick == "techbot [jest]" && msg.msg == "helo") {
    botsaidstuff = true;
  }
};
instance.init();

it("should be able be able to say stuff", (done) => {
  instance.sendMessage("helo");
  setInterval(() => {
    expect(botsaidstuff).toBe(true);
    done();
  }, 1000);
});
