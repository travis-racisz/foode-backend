
const serviceAccount = require('./serviceAccount')
const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const { getFirestore } = require('firebase-admin/firestore');

const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.BUCKET
});

const db = getFirestore(app)

const bucket = getStorage().bucket();

module.exports = db