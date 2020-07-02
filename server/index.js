const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pdfcrowd = require("pdfcrowd");

const pdfTemplate = require('./documents');

const app = express();

const port = process.env.PORT || 5000;

const client = new pdfcrowd.HtmlToPdfClient("pdfcrowd username", "API KEY");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// POST - PDF generation and fetching of the data
app.post('/create-pdf', (req, res) => {
    //console.log(pdfTemplate(req.body));
    client.convertStringToFile(pdfTemplate(req.body), "result.pdf", (err, fileName) => {

        if (err) res.send(Promise.reject("Pdfcrowd Error: " + err));

        res.send(Promise.resolve());
        console.log("Success: the file was created " + fileName);
    });
});

// GET - Send the generating PDF to the client
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`);
});


app.listen(port, () => console.log(`Listening on port ${port}`));