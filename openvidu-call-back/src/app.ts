const fs = require('fs');
const https = require('https');
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cors from 'cors';
import { app as authController } from './controllers/AuthController';
import { app as broadcastController } from './controllers/BroadcastController';
import { app as callController } from './controllers/CallController';
import { app as recordingController, proxyGETRecording } from './controllers/RecordingController';
import { app as sessionController } from './controllers/SessionController';
import { AuthService } from './services/AuthService';

import * as chalk from 'chalk';
import {
	CALL_ADMIN_SECRET,
	CALL_BROADCAST,
	CALL_OPENVIDU_CERTTYPE,
	CALL_PRIVATE_ACCESS,
	CALL_RECORDING,
	CALL_SECRET,
	CALL_USER,
	OPENVIDU_SECRET,
	OPENVIDU_URL,
	SERVER_PORT
} from './config';

const authService = AuthService.getInstance();

dotenv.config();
const app = express();

const privateKey = fs.readFileSync('./privkey.pem', 'utf8');
const certificate = fs.readFileSync('./fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Allow cors by default
// Modify this if you want to restrict access to the server
app.use(
	cors({
		origin: '*',
	})
);
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser());
app.use('/call', callController);
app.use('/sessions', authService.authorizer, sessionController);
app.use('/recordings', authService.authorizer, recordingController);
app.use('/recordings/:recordingId', proxyGETRecording);
app.use('/broadcasts', authService.authorizer, broadcastController);
app.use('/auth', authController);

// Accept selfsigned certificates if CALL_OPENVIDU_CERTTYPE=selfsigned
if (CALL_OPENVIDU_CERTTYPE === 'selfsigned') {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(SERVER_PORT, () => {
	const credential = chalk.yellow;
	const text = chalk.cyanBright;
	const enabled = chalk.greenBright;
	const disabled = chalk.redBright;

	console.log(' ');
	console.log('---------------------------------------------------------');
	console.log(' ');
	console.log('OpenVidu Call Server is listening on port', text(SERVER_PORT));
	console.log(' ');
	console.log('---------------------------------------------------------');
	console.log('OPENVIDU URL: ', text(OPENVIDU_URL));
	console.log('OPENVIDU SECRET: ', credential(OPENVIDU_SECRET));
	console.log('CALL OPENVIDU CERTTYPE: ', text(CALL_OPENVIDU_CERTTYPE));
	console.log('CALL RECORDING: ', CALL_RECORDING === 'ENABLED' ? enabled(CALL_RECORDING) : disabled(CALL_RECORDING));
	console.log('CALL BROADCAST: ', CALL_BROADCAST === 'ENABLED' ? enabled(CALL_BROADCAST) : disabled(CALL_BROADCAST));
	console.log('---------------------------------------------------------');
	console.log(' ');
	console.log('CALL PRIVATE ACCESS: ', CALL_PRIVATE_ACCESS === 'ENABLED' ? enabled(CALL_PRIVATE_ACCESS) : disabled(CALL_PRIVATE_ACCESS));
	if (CALL_PRIVATE_ACCESS === 'ENABLED') {
		console.log('CALL USER: ', credential(CALL_USER));
		console.log('CALL SECRET: ', credential(CALL_SECRET));
	}
	console.log('CALL ADMIN PASSWORD: ', credential(CALL_ADMIN_SECRET));
	console.log('---------------------------------------------------------');
	console.log(' ');
});
