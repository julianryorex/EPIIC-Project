const express = require("express");
const app = express();
const ee = require('@google/earthengine');
const PRIVATE_KEY = process.env.PRIVATE_KEY || require('../privatekey.json');


const validInput = (req) => {

    let responseData = {
        msg: "",
        success: false,
        bands: null
    };

};


app.get("/", (req, res) => {

    if (!validInput(req).success) {
        const responseData = {
            msg: valid.msg,
            success: valid.success,
            data: null
        };
        res.json(responseData);
        return;
    }

    const dataset = req.query.dataset;

    ee.data.authenticateViaPrivateKey(PRIVATE_KEY, () => {
        let bandNames = [];
        ee.initialize(() => {
            console.log("Successfully initialized the EE client library in getBands.js");
            const dataSetName = 'NASA/GPM_L3/IMERG_V06';
            const dataSet = ee.ImageCollection(dataSetName)
                .filter(ee.Filter.date(startDate, endDate))
                .mosaic();
            // request all the known information about this collection via an AJAX call.
            const data = dataSet.getInfo();

            for (let i in data.bands) {
                bandNames.push(data.bands[i].id);
            }
            console.log("Pushed all bands to badnNames JSON");
        });
    });

    const responseData = {
        msg: `Band request for the ${dataset} dataset`,
        success: true,
        bands: JSON.stringify(bandsnames)
    };

    res.json(responseData);
    console.log("Bands sent successfully");
});


module.exports = app;