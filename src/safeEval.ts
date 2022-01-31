const sandboxProxies = new WeakMap();

function compileCode(src: string) {
  src = "with (sandbox) {" + src + "}";
  const code = new Function("sandbox", src);

  return function (sandbox: object) {
    if (!sandboxProxies.has(sandbox)) {
      const sandboxProxy = new Proxy(sandbox, { has, get });
      sandboxProxies.set(sandbox, sandboxProxy);
    }
    return code(sandboxProxies.get(sandbox));
  };
}

function has(target: any, key: any) {
  return true;
}

function get(target: any, key: any) {
  if (key === Symbol.unscopables) return undefined;
  return target[key];
}

function safeEval(x: string) {
  let c = compileCode(x);
  return c({});
}

export default safeEval;
