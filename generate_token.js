import fs from 'fs';
import readline from 'readline';
import { authUrl, oAuthClient, TOKEN } from './config/config.js';

console.log('\n Authorize this app by visiting this URL:\n');
console.log(authUrl, '\n');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

new Promise((resolve) => {
	rl.question('Paste the code from that page here: ', async (code) => {
		rl.close();
		const { tokens } = await oAuthClient.getToken(code);
		fs.writeFileSync(TOKEN, JSON.stringify(tokens, null, 2));
		console.log('Token saved to ', TOKEN);
		resolve(oAuthClient);
	});
});