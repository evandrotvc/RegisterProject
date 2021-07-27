// const admin = require("firebase-admin");
const admin = require('firebase-admin');

const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;