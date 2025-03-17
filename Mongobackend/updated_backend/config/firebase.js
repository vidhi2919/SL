const admin = require('firebase-admin');
const serviceAccount = require('../config/service-account-key.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // ✅ Initialize Firebase Admin SDK
  databaseURL: "https://smartlend-4e7bd.firebaseio.com" // ✅ Replace with your Firebase project URL
});

module.exports = admin;
