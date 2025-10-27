import fs from 'fs';
import { google } from 'googleapis';

export const CREDENTIALS = './credentials.json';
export const TOKEN = './token.json';
export const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
export const FOLDER = '1TSVG18V48ZNMo1CXz3L1dlQAf4Zv1WqL';

const credentials = JSON.parse(fs.readFileSync(CREDENTIALS, 'utf8'));
const { client_secret, client_id, redirect_uris } = credentials.installed;

export const oAuthClient = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

export const authUrl = oAuthClient.generateAuthUrl({
	access_type: 'offline',
	scope: SCOPES,
});