const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

readline.question("What to decode", (base: string) => {
	readline.close();
	let ori = base;
	let n = ori;

	function isBase64(str: string) {
		if (str === "" || str.trim() === "") {
			return false;
		}
		try {
			return btoa(atob(str)) == str;
		} catch (err) {
			return false;
		}
	}

	let interval = setInterval(() => {
		n = Buffer.from(n, "base64").toString();
		if (!isBase64(n)) {
			clearInterval(interval);
			console.clear();
			console.log("Result: " + n);
		}
	}, 100);
});
