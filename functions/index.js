const functions = require('firebase-functions');
const admin = require('firebase-admin');
var fetch = require('node-fetch');
admin.initializeApp(functions.config().firebase);

exports.sendNotificationToTopic = functions.firestore.document('Users/{uid}/Doctors/{id}').onWrite(async (event) => {
    let docID = event.after.id;
  
    // let title = event.after.get('title');
    // let content = event.after.get('content');
    var message = {
        notification: {
            title: "Chnage occured",
            body: "Yes test",
        },
        topic: 'namelesscoder',
    };

    let response = await admin.messaging().send(message);
 
});

exports.sendHttpPushNotification = functions.firestore.document('Chats/{uid}/Messages/{id}').onWrite(async (event) => {
  console.log("---------------------START sendHttpPushNotification---------------------");
    let docId = event.after.id; 
    console.log("docId...", docId);

    const clinicId = event.after.get('clinicId');
    const patientId = event.after.get('patientId');
    const userType = event.after.get('userType');
    const userName = event.after.get('userName');
    console.log("clinicId...", clinicId);
    console.log("patientId...", patientId);
    console.log("userName...", userName);
    console.log("userType...", userType);
    
    const content = event.after.get('text');
    let clinicDoc = await admin.firestore().doc(`Users/${clinicId}`).get();
    let patientDoc = await admin.firestore().doc(`Users/${patientId}`).get();

    let expoTokenClinic = clinicDoc.get('expoToken');
    let expoTokenPatient = patientDoc.get('expoToken');

    console.log("expoTokenClinic...", expoTokenClinic);

    console.log("expoTokenPatient...", expoTokenPatient);
    
    const messageClinic = {
        to: expoTokenClinic,
        sound: 'default',
        title: userName,
        body: content,
        data: { someData: 'goes here' },
    };
    
    console.log("messageClinic...", messageClinic);

    if(userType === "patient"){
      console.log("---- is USER TYPE .....PATIENT.... ---" );

      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageClinic),
      });

    } 


  const messagePatient = {
    to: expoTokenPatient,
    sound: 'default',
    title: userName,
    body: content,
    data: { someData: 'goes here' },
};


if(userType === "clinic"){
  console.log("---- is USER TYPE .....CLINIC.... ---" );
  await fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Accept-encoding': 'gzip, deflate',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(messagePatient),
  });

}

console.log("messagePatient...", messagePatient);

    // var message = {
    //     notification: {
    //         title: "title",
    //         body: "TEST SUCCESS!",
    //     },
    //     token: fcmToken,
    // }

    // let response = await admin.messaging().send(message);
   
});

// https://www.youtube.com/watch?v=R2D6J10fhA4

// https://www.youtube.com/watch?v=Y6jMKQ9zo-o

// sendHttpPushNotification