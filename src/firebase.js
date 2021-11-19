import * as firebase from 'firebase/app';
// const dotenv = require('dotenv');
// import 'firebase/auth';
// import 'firebase/storage';
// console.log(process.env.APP_FIREBASE_KEY)

const firebaseservice = firebase.initializeApp({
    apiKey: "AIzaSyCCN6juG0IgUzhdI4mW76Gn25DT51Av9kw",
authDomain: "binar-web-app.firebaseapp.com",
projectId: "binar-web-app",
storageBucket: "binar-web-app.appspot.com",
messagingSenderId: "162061415345",
appId: "1:162061415345:web:1c3d08f290678145458390",
measurementId: "G-D0VBK3NLHS"})


export default firebaseservice