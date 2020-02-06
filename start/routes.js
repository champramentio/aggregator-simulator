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

const uuid4 = require("uuid4");
const Moment = require("moment");
const fs = require("fs");
const Helpers = use("Helpers");

Route.get("/", async ({ response, request }) => {
	return "Hello from Aggregator Simulator";
});

//=================================================================================
// 	King Simulator
//=================================================================================
Route.post("/email/send", async ({ response, request }) => {
	return response.json({
		success: true,
		data: {
			transactionid: uuid4(),
			messageid: uuid4(),
			status: "success"
		}
	});
});

Route.post("/email/status", async ({ response, request }) => {
	const status = ["AbuseReports", "Sent", "Opened", "Clicked", "Unsubscribed", "Pending", "Failed", "Delivered"];
	const random = (status.length * Math.random()) | 0;

	return response.json({
		success: true,
		data: {
			messageid: uuid4(),
			transactionid: uuid4(),
			status: random,
			statusname: status[random],
			statuschangedate: Moment().format("YYYY-MM-DD HH:mm:ss"),
			datesent: Moment().format("YYYY-MM-DD HH:mm:ss"),
			dateopened: Moment().format("YYYY-MM-DD HH:mm:ss"),
			dateclicked: Moment().format("YYYY-MM-DD HH:mm:ss"),
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
	const status = ["Failed-User Not Found", "Failed-Sender Not Found", "Unsupported Prefix", "Failed-Invalid Phone number"];
	const trxId = (status.length * Math.random()) | 0; //random trx ID

	response.header("Content-type", "application/xml");

	return `<?xml version="1.0" encoding="iso-8859-1" ?>
	<message>
	<TrxID>${trxId === 0 ? trxId : generateRandomString(20)}</TrxID>
	<Status>${trxId === 0 ? status[trxId] : `SENT|${msisdn.msisdn}`}</Status>
	</message>`;
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
