import fs from 'fs';
import { google } from 'googleapis';
import { oAuthClient, TOKEN, FOLDER } from './../config/config.js';

async function authorize() {
	try {
		const token = JSON.parse(fs.readFileSync(TOKEN, 'utf8'));
		oAuthClient.setCredentials(token);
		return oAuthClient;
	} catch (err) {
		console.log('Invalid Token or No Token');
	}
}

export async function uploadToDrive(filePath, fileName, jiraId) {
	const auth = await authorize();
	const drive = google.drive({ version: 'v3', auth });

	const parentId = await createFolder(jiraId, FOLDER, drive);

	const fileMetadata = {
    	name: fileName,
  	};

  	if (parentId) {
  		fileMetadata.parents = [parentId];
  	}

  	const media = {
  		mimeType: 'image/png',
  		body: fs.createReadStream(filePath),
  	}

		try {
			const response = await drive.files.create({
				resource: fileMetadata,
				media,
				fields: 'id, webViewLink, webContentLink',
				supportsAllDrives: true, // needed for shared drives
			});
			console.log('File uploaded successfully');
		} catch (err) {
			console.log('Failed to upload to g-drive');
		}
}

async function createFolder(folderName, parentFolderId = null, drive) {
  try {
    let query = `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`;
    if (parentFolderId) {
      query += ` and '${parentFolderId}' in parents`;
    }

    const listResponse = await drive.files.list({
      q: query,
      fields: 'files(id, name)',
      spaces: 'drive',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    
    if (listResponse.data.files.length > 0) {
      const folder = listResponse.data.files[0];
      return folder.id;
    }

    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    };

    if (parentFolderId) {
      fileMetadata.parents = [parentFolderId];
    }

    const response = await drive.files.create({
      resource: fileMetadata,
      fields: 'id, name, webViewLink',
      supportsAllDrives: true, // needed for Shared Drives
    });
	
    return response.data.id;
  } catch (error) {
    console.error('❌ Error creating folder:', error.message);
    if (error.response?.data) console.error(error.response.data);
  }
}