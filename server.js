const config = require('./config/keys');
const cors = require('cors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client/app/build')));
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'client', 'app', 'build', 'index.html'));
});

const port = config.proxyPort || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));


const Mailchimp = require('mailchimp-api-v3')
const mailchimp = new Mailchimp(config.mailchimp.apiKey);
app.post('/newsletter', function(req, res) {
	mailchimp.post(`/lists/`+config.mailchimp.listID+`/members`, {
		email_address: req.body.email,
		status: 'subscribed',
		merge_fields: {
			EMAIL: req.body.email,
		}
	})
	.then((res) => { 
		console.log(res);
		console.log(res.statusCode);
		console.log(res.statusCode === 200);
		if(res.statusCode === 200) {
			res.title = 'Successfully Subscribed';
			res.detail = 'You have been successfully subscribed to The Scuba Instructor\'s newsletter';
		}
		console.log(res);
		res.send(res);
	})
	.catch((err) => {
		res.send(err);
	});
});