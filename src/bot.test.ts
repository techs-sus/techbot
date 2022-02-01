import bot from "./bot";

it("should be able to connect to trollbox.party", () => {
  return new Promise((resolve) => {
    let instance = new bot("techbot [jest]", "#fff", () => {
      let detection =
        "helo!!! this is node ci, its " + new Date().toDateString();
      let botsaidstuff = false;
      instance.onMessage = (msg) => {
        if (msg.msg == detection) {
          botsaidstuff = true;
        }
      };
      instance.init();
      instance.sendMessage(detection);
      // setTimeout(() => (botsaidstuff = true), 1000); // only for use on gitpod
      let s = setInterval(() => {
        if (botsaidstuff === true) {
          clearInterval(s);
          expect(botsaidstuff).toBe(true);
          instance.disconnect();
          resolve(true);
        }
      }, 50);
    });
  });
}, 5000);
