const { decode } = require("he");
import safeEval from "./safeEval";
import bot from "./bot";

let instance = new bot("techbot [e!]", "red");
instance.getVersion().then(() => {
  let vstring = `techbot (git & node edition);\nRunning on Node ${process.version};\ncommitId: ${instance.versionInfo.commitId} (${instance.versionInfo.commitReason});`;

  instance.onMessage = (_data) => {
    let data = _data;
    data.msg = decode(_data.msg);
    if (data.msg.startsWith("e!")) {
      let split = data.msg.split(" ");
      switch (split[0].slice(2)) {
        case "test":
          instance.sendMessage("test");
          break;
        case "version":
          instance.sendMessage(vstring);
          break;
        case "help":
          instance.sendMessage(
            `${vstring}\n;commands:\n- version; usage -> Shows the current version committed to github.\n- test; usage -> Test command to see if my code is stupid.\n- u_eval; perms -> !!root -> usage -> unsafely eval code\nseval; perms -> !!normal -> usage -> safely eval code -> usage: \n"glorified switch statement!" - god`
          );
          break;
        case "s_eval":
          let __unsafe = safeEval(data.msg.slice(9));
          instance.sendMessage(`@${data.nick} res: ` + __unsafe);
          break;
        case "u_eval":
          if (data.home === "HMCFAS1GCE8771IAEJ7FEGF4ASJHASG8") {
            instance.sendMessage(
              `@${data.nick} hello my grandmaster, for I will run your code!`
            );
            let returned;
            try {
              returned = eval(data.msg.slice(9));
            } catch (e: any) {
              returned = e.toString();
            }
            instance.sendMessage(`@${data.nick} output: ${returned}`);
          } else {
            instance.sendMessage(
              `@${data.nick} sike! i will not run your code because you arent my grandmaster!`
            );
          }
          break;
        default:
          instance.sendMessage(
            `@${data.nick}, what command are you talking about? Try e!help for more information.`
          );
          break;
      }
    }
  };
});
