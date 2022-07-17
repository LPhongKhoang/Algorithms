const https = require('https');
const fs = require('fs').promises;

const PROVIDED_URL = 'https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json';
/**
 * 
 * @param {string} url 
 * @returns {Promise<{websiteId: string; date: string; chats: number; missedChats: number}[]>}
 */
function getRawChatStatisticData(url) {
	return new Promise((resolve, reject) => {
		const request = https.request(url, (response) => {
			let data = '';
			response.on('data', (chunk) => {
					data = data + chunk.toString();
					// console.log('chunk', chunk);
					// console.log('chunk toString', chunk.toString());
			});
		
			response.on('end', () => {
					const body = JSON.parse(data);
					resolve(body);
			});
		});
  
		request.on('error', (error) => {
				console.log('An error', error);
				reject(error);
		});
			
		request.end();

	});
}

/**
 * 
 * @param {{websiteId: string; date: string; chats: number; missedChats: number}} item
 * @param {Date} startDate nullable
 * @param {Date} endDate nullable
 * @returns {boolean}
 */
function checkInRange(item, startDate, endDate) {
	if(startDate && new Date(item.date) < startDate) return false;
	
	if(endDate && new Date(item.date) > endDate) return false;

	return true;
}

/**
 * 
 * @param {{websiteId: string; date: string; chats: number; missedChats: number}[]} items 
 * @param {Date} startDate nullable
 * @param {Date} endDate nullable
 * @returns {{websiteId: string; chats: number; missedChats: number}[]}
 */
function aggregateStatistic(items, startDate, endDate) {
	const websiteMap = new Map();
	
	for(let i = 0; i < items.length; i++) {
		// Filter valid 
		if(checkInRange(items[i], startDate, endDate)) {
			// Check item in map or not
			if(websiteMap.has(items[i].websiteId)) {
				const websiteCount = websiteMap.get(items[i].websiteId);
				// Accumulate count
				websiteCount.chats += items[i].chats;
				websiteCount.missedChats += items[i].missedChats;
			}else {
				// Init count
				websiteMap.set(items[i].websiteId, {
					websiteId: items[i].websiteId,
					chats: items[i].chats,
					missedChats: items[i].missedChats
				});
			}
		}
	}

	return Array.from(websiteMap.values());
}


async function _writeToFile(data, filename) {
	const path = __dirname + '/data/' + filename;
	return fs.writeFile(path, JSON.stringify(data));
}

/**
 * 
 * @param {Date} startDate nullable
 * @param {Date} endDate nullable
 * @returns {Promise<{websiteId: string; chats: number; missedChats: number}[]>}
 */
async function processStatistic(startDate, endDate) {
	try {
		const items = await getRawChatStatisticData(PROVIDED_URL);
		// await _writeToFile(items, 'origin.json');
		const result = aggregateStatistic(items, startDate, endDate);
		// await _writeToFile(result, 'result' + (flag || process.argv[2]) +'.json');
		return result;
	}catch(ex) {
		console.error('processStatistic error', ex.message);
	}
}



async function main() {
	const startDate = new Date('2019-04-04T00:00:00.000Z');
	const endDate = new Date('2019-04-10T00:00:00.000Z');
	const result = await processStatistic(startDate, null);
	console.log(result);
}

main();