import firebase from 'firebase/app'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyDljSD5y174236J5U4bX3pZzqJK3Lm8qjA",
    authDomain: "eorzean-calendar.firebaseapp.com",
    databaseURL: "https://eorzean-calendar.firebaseio.com",
    projectId: "eorzean-calendar",
    storageBucket: "eorzean-calendar.appspot.com",
    messagingSenderId: "1014169787663",
    appId: "1:1014169787663:web:f024c5cb0774473b71727a",
    measurementId: "G-2F71979HVS"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()

// firebase collections
const eventsCollection = db.collection('events')

export {
    db,
    eventsCollection
}