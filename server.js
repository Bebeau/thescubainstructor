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
		if(res.statusCode === 200) {
			res.title = 'Successfully Subscribed';
			res.detail = 'You have been successfully subscribed to The Scuba Instructor\'s newsletter';
		}
		res.send(res);
	})
	.catch((err) => {
		res.send(err);
	});
});

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
var transporter = nodemailer.createTransport({
	service: 'gmail',
	host : 'smtp.gmail.com',
  	secureConnection : true,
	auth: {
		user: config.gmail.username,
		pass: config.gmail.pass
	}
});

app.post('/submitRequest', function(req, res) {

	// TODO: Make sure to send autoresponder to customer and instructor if not being handled by mailchimp

	const handlebarOptions = {
		viewEngine: {
			extName: '.hbs',
			partialsDir: 'client/app/src/partials',
			layoutsDir: 'client/app/src/emails',
			defaultLayout: '',
		},
		viewPath: 'client/app/src/emails',
		extName: '.hbs',
	};

	transporter.use('compile', hbs(handlebarOptions));

	// TODO: Change from email to sabina@thescubainstructor.com
	const mailOptions = {
		from: 'The Scuba Instructor <kylebebeau@gmail.com>',
	    to: req.body.email,
		subject: 'New Booking Inquiry',
		template: 'inquiry',
		context: { 
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phone: req.body.phone,
			date: req.body.date,
			course: req.body.course
		}
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});

});
