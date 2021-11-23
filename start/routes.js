"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

function generateRandomString(length) {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

const dayjs = require("dayjs");
const { randomUUID } = require("crypto");
const fs = require("fs");
const Helpers = use("Helpers");

const formatDatetime = () => {
	return dayjs().format("YYYY-MM-DD HH:mm:ss");
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

Route.get("/", async ({ response, request }) => {
	return "Hello from Aggregator Simulator";
});

//=================================================================================
// 	King Simulator
//=================================================================================
Route.post("/email/send", async ({ response, request }) => {
	// const random = (3 * Math.random()) | 0;

	//simulasi real life, bisa ada timeout seolah-olah
	// await sleep(random * 1000);

	return response.json({
		success: true,
		data: {
			transactionid: randomUUID(),
			messageid: randomUUID(),
			status: "success"
		}
	});
});

Route.post("/email/status", async ({ response, request }) => {
	const status = ["Submitted", "Delivered", "Opened", "Clicked", "Unsubscribed", "Bounced", "Complaints", "Suppressed"];
	const random = (status.length * Math.random()) | 0;

	return response.json({
		success: true,
		data: {
			messageid: randomUUID(),
			transactionid: randomUUID(),
			status: random,
			statusname: status[random],
			statuschangedate: formatDatetime(),
			datesent: formatDatetime(),
			dateopened: formatDatetime(),
			dateclicked: formatDatetime(),
			errormessage: "no error"
		}
	});
});

//=================================================================================
// 	Nadyne Simulator
//=================================================================================
Route.get("/sms.php", async ({ response, request }) => {
	//save sebagai file
	const msisdn = request.only("msisdn");
	const sender = request.only("sender");
	const message = request.only("message");
	// fs.appendFileSync(Helpers.tmpPath(`response1.csv`), `${msisdn.msisdn},${sender.sender},${message.message}\n`, "utf8");

	//return balik
	const status = ["Failed-User Not Found", "Failed-Sender Not Found", "FAILED|Unsupported Prefix Number", "FAILED|Invalid MSISDN"];
	const trxId = (status.length * Math.random()) | 0; //random trx ID

	response.header("Content-type", "application/xml");

	return `<?xml version="1.0" encoding="iso-8859-1" ?>
	<message>
		<TrxID>${trxId === 0 ? trxId : generateRandomString(20)}</TrxID>
		<Status>${trxId === 0 ? status[trxId] : `SENT|${msisdn.msisdn}`}</Status>
	</message>`;
});

//=================================================================================
// 	Sprint Simulator
//=================================================================================
Route.post("/sprint", async ({ response, request }) => {
	const ref_id = request.input("ref_id");

	//return balik
	const status = [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const index = (status.length * Math.random()) | 0; //random
	const code = status[index];

	const result = {
		rc: code,
		ref_id: ref_id,
		code_sms: generateRandomString(33)
	};

	return response.json(result);
});

//=================================================================================
// 	Generate CSV
//=================================================================================
Route.get("/write/msisdn/:total", async ({ params, response, request }) => {
	const filename = Helpers.tmpPath(`test-${new Date().getTime()}.csv`);

	//buat header
	const new_file = fs.createWriteStream(filename);
	new_file.write(`msisdn,nama\n`);

	//create jumlah line yang dikehendaki
	for (var i = 0; i < params.total; i++) {
		new_file.write(`6281${Math.floor(Math.random() * 100000000)},${generateRandomString(10)}\n`);
	}

	return "success";
});

Route.get("/write/email/:total", async ({ params, response, request }) => {
	const filename = Helpers.tmpPath(`test-${new Date().getTime()}.csv`);

	//buat header
	const new_file = fs.createWriteStream(filename);
	new_file.write(`msisdn,nama\n`);

	//create jumlah line yang dikehendaki
	for (var i = 0; i < params.total; i++) {
		new_file.write(`${generateRandomString(7)}@gmail.com,${generateRandomString(5)}\n`);
	}

	return "success";
});
