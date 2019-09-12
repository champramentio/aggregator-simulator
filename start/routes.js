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
	const status = ["Sent", "Opened", "Clicked", "Unsubscribed", "Pending", "Failed", "Delivered"];
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
	const status = ["SENT", "SENT FAILED - No Route", "FAILED - Sender Not Found", "Failed - Token not enough", "Failed - User not found"];
	const random = (status.length * Math.random()) | 0;

	response.header("Content-type", "application/xml");

	return `<?xml version="1.0" encoding="iso-8859-1" ?>
	<message>
	<TrxID>${generateRandomString(20)}</TrxID>
	<Status>${status[random]}</Status>
	</message>`;
});

//=================================================================================
// 	Generate CSV
//=================================================================================
Route.get("/write/msisdn", async ({ response, request }) => {
	const fs = require("fs");
	const Helpers = use("Helpers");

	fs.appendFileSync(Helpers.tmpPath("test1.csv"), `msisdn\n`, "utf8");

	for (var i = 0; i < 1000; i++) {
		fs.appendFileSync(Helpers.tmpPath("test1.csv"), `62${Math.floor(Math.random() * 100000000)}\n`, "utf8");
	}

	return "success";
});
