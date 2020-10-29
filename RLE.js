let fs = require('fs');
let arg = process.argv;
let i = 0, n = 1;
let resultString = '';


if (arg[3] == 'code') {
	fs.readFile(arg[2], (err, data) => {
		if (err) {
			console.error(err);
			return;
		}

		let inText = data.toString();

		if (inText.length == 0){
			console.log('Пустой файл');
			return;
		}

		while (i < inText.length) {
			while (inText.charAt(i) == inText.charAt(i + n))
				n++;
			let nJump = n;


			while (n > 0) {
				if (n < 3 && inText.charAt(i) != '#') {
					resultString += inText.charAt(i) * n;
					break;
				} else if (n > 127){
					resultString += '#' + String.fromCharCode(127) + inText.charAt(i);
					n -= 127;
				} else {
					resultString += '#' + String.fromCharCode(n) + inText.charAt(i);
					break;
				}
			}

			i += nJump;
			n = 1;
		}

		fs.writeFile(arg[4], resultString, (err) => {
			if (err){
				console.err(err);
				return;
			}
			console.log('Файл сохранен');
		});
	});
} else if (arg[3] == 'decode'){
	fs.readFile(arg[2], (err, data) => {
		if (err) {
			console.error(err);
			return;
		}

		let inText = data.toString();

		if (inText.length == 0){
			console.log('Пустой файл');
			return;
		}

		while (i < inText.length){
			if (inText.charAt(i) == '#'){
				resultString += inText.charAt(i + 2) * inText.charCodeAt(i + 1);
				i += 3;
			} else {
				resultString += inText.charAt(i);
				i++;
			}
		}

		fs.writeFile(arg[4], resultString, (err) => {
			if (err){
				console.err(err);
				return;
			}
			console.log('Файл сохранен');
		});
	});
} else {
	console.log('Неизвестная комманда');
}
