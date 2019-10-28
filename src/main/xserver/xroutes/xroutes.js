let router = require("express").Router();

let urlFilePath = '';

function setURLFilePath(url) {
    urlFilePath = url
    console.log(urlFilePath);
};

// Function that dynamically sets routes based on passed in bodyItems object
// Called when hitting the /gotem route

// This function currently doesn't work
// const resetRoutes = () => {
//   router = require('express').Router();
//   router.use('/676F74E28099656D', setDynamicRoutes, (req, res) => {
//     console.log("ROUTES HAVE BEEN SET");
//     res.status(200).end();
//   });
// }


const setDynamicRoutes = (req, res, next) => {
    const {bodyItems} = req.body;
    try {
        for (let item in bodyItems) {
            const {customMethod, customRoute, customResponse} = bodyItems[item];
            router[customMethod.toLowerCase()](customRoute, (req, res, next) => {
                res.locals.response = customResponse;
                next();
            }, handleRequest);
        }
        next();
    } catch (err) {
        res.status(500).send(err).end();
    }
}

// Placeholder middleware for making sure dynamic routing works
const handleRequest = (req, res) => {
    try {
        if (req.headers['content-type'].includes('json') ||
            req.headers['content-type'].includes('xml')) {
            res.status(200).send(res.locals.response);
            res.end();
        } else {
            res.status(404);
            res.end();
        }
    } catch {
        res.status(500);
        res.end();
    }
};

// Route for setting up other routes dynamically
router.use('/676F74E28099656D', setDynamicRoutes, (req, res) => {
    console.log("ROUTES HAVE BEEN SET");
    res.status(200).end();
});



module.exports = { router, setURLFilePath };
