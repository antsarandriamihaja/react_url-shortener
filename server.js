var express = require('express');
var path = require('path');
var { config } = require('./config');
const stripe = require('stripe')(config.secret_key);
const bodyParser = require('body-parser');
const html = require('html');
const { mongoose } = require('./server/db/mongoose');
var base58 = require('./base58');
var Url = require('./server/models/url');

var port = process.env.PORT || 3000;
var app = express();
var webhost = process.env.HOST || config.webhost;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/getCardToken', (req, res) => {
    var response = req.body;
    stripe.customers.create({
        source: response.id
    })
        .then((customer) => {
            console.log('charging customer')
            stripe.charges.create({
                amount: 250.99 * 100,
                currency: 'cad',
                customer: customer.id,
                description: 'URL-shortening service provided by the government of Canada.'

            })
        })
        .catch((error) => {
            console.log(`There was an error: ${error}`);
        })
    res.json({
        status: 'ok',
        message: 'Successful Payment'
    });
});

app.post('/api/shorten', function (req, res) {
    var longUrl = req.body.url;
    var shortUrl = '';
    Url.findOne({
        long_url: longUrl
    }, function (err, doc) {
        if (doc) {
            shortUrl = webhost + base58.encode(doc._id);

            res.json({ 'shortUrl': shortUrl });
        }
        else {
            var newUrl = Url({
                long_url: longUrl
            });

            newUrl.save(function (err) {
                if (err) { return console.log(err); }
                shortUrl = webhost + base58.encode(newUrl._id);
                //shortUrl = process.env.HOST + base58.encode(newUrl._id);
                res.json({ 'shortUrl': shortUrl });
            });
        }
    });
});

app.get('/:encoded_id', function (req, res) {
    var base58Id = req.params.encoded_id;
    var id = base58.decode(base58Id);
    Url.findOne({ _id: id }, function (err, doc) {
        if (doc) { res.redirect(doc.long_url); }
        else {
            res.redirect(webhost);
        }
    });
});

app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});
