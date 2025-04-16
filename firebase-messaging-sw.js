importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDvrQH8cgKTa5naq_X-LRX2hKvwKPVdyPs",
    authDomain: "lovenotesforanika.firebaseapp.com",
    databaseURL: "https://lovenotesforanika-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lovenotesforanika",
    storageBucket: "lovenotesforanika.firebasestorage.app",
    messagingSenderId: "955890146894",
    appId: "1:955890146894:web:458debbf68510359bd6d1f",
    measurementId: "G-Z0KZYDREQS"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/heart.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
