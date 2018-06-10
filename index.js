const functions = require('firebase-functions');


// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, snapshot.ref.toString());
  });
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.bigben = functions.https.onRequest((req, res) => {
  const hours = (new Date().getHours() % 12) + 1 // London is UTC + 1hr;
  res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
    </head>
    <body>
      ${'BONG '.repeat(hours)}
    </body>
  </html>`);
});


// var _nemLibrary = require("nem-library");

// // Initialize NEMLibrary for TEST_NET Network
// _nemLibrary.NEMLibrary.bootstrap(_nemLibrary.NetworkTypes.MAIN_NET);

// var address_string = "N**********************";
// var address = new _nemLibrary.Address(address_string);

// var accountHttp = new _nemLibrary.AccountHttp();

// var TxTotalfromSelf = {};
// var RxTotalfromSelf = {};
// var transactionEdges = [[], [], []];
// var friends = [];
// var loopFlag = true;

// accountHttp.getFromAddress(address).subscribe(function (accountInfoWithMetaData) {
//     console.log(accountInfoWithMetaData);
// });

// accountHttp.allTransactions(address).subscribe(function (allTransactions) {
//     for (var i_t = 0, len_t = allTransactions.length; i_t < len_t; ++i_t) {}
//     // console.log(allTransactions[i_t]);

//     //    console.log("------------**********------------");
//     // console.log(allTransactions);
// });

// function getFriendRelation(central_address) {
//     var caddress = new _nemLibrary.Address(central_address);
//     var pagedTransactions = accountHttp.allTransactionsPaginated(caddress, undefined);
//     pagedTransactions.subscribe(function (x) {
//         x.forEach(function (value) {
//             if (value.signer === undefined) {
//                 return;
//             }

//             if (value.recipient === undefined) {
//                 return;
//             }

//             var signerAddress = value.signer.address.value;
//             var recipientAddress = value.recipient.value;
//             var amount = value._xem.amount;

//             var flag = 1;
//             for (var i = 0; i < transactionEdges[0].length; i++) {
//                 if (transactionEdges[0][i] === signerAddress && transactionEdges[1][i] === recipientAddress) {
//                     transactionEdges[2][i] += amount;
//                     flag = 0;
//                     break;
//                 }
//             }
//             if (flag) {
//                 transactionEdges[0].push(signerAddress);
//                 transactionEdges[1].push(recipientAddress);
//                 transactionEdges[2].push(amount);
//             }
//             console.log("^^^^^^^^^^^^^^^^^^^^--------------------");
//             console.log(transactionEdges);
//             console.log("^^^^^^^^^^^^^^^^^^^^--------------------");

//             if (signerAddress === central_address) {

//                 if (TxTotalfromSelf[recipientAddress] !== undefined) {
//                     TxTotalfromSelf[recipientAddress] += amount;
//                 } else {
//                     TxTotalfromSelf[recipientAddress] = amount;
//                 }
//             } else {
//                 if (friends.indexOf(signerAddress) < 0) {
//                     friends.push(signerAddress);
//                 }
//             }
//             if (recipientAddress === central_address) {
//                 if (RxTotalfromSelf[signerAddress] !== undefined) {
//                     RxTotalfromSelf[signerAddress] += amount;
//                 } else {
//                     RxTotalfromSelf[signerAddress] = amount;
//                 }
//             } else {
//                 if (friends.indexOf(recipientAddress) < 0) {
//                     friends.push(recipientAddress);
//                 }
//             }

//             if (friends.length > 30) {
//                 console.log("TOO MANY FRIENDS");
//                 return;
//             }

//             // console.log( value );
//             console.log("...................");
//         });
//         pagedTransactions.nextPage();
//     }, function (err) {
//         console.log('error');
//         console.log(err);
//     }, function () {
//         // when this lambda is called, it means all transactions have been fetched
//         console.log('complete');
//         console.log(TxTotalfromSelf);
//         console.log(RxTotalfromSelf);
//         console.log(transactionEdges);
//         console.log(friends);

//         if (loopFlag) {
//             loopFlag = false;
//             for (var i = 0; i < friends.length; i++) {
//                 getFriendRelation(friends[i]);
//             }
//         }
//     });
// }

// // getFriendRelation(address_string);

// // pageable.subscribe(transactions => {
// // 	    console.log("////////////////////////////////////////////////////////////");
// // 	    console.log("////////////////////////////////////////////////////////////");
// // 	    console.log("////////////////////////////////////////////////////////////");
// //     // do something with the info
// // 	for (let i_t = 0, len_t = transactions.length; i_t < len_t; ++i_t) {
// // 	    console.log("------------**********------------");
// // 	    console.log("------------**********------------");
// // 	    console.log("------------**********------------");
// //   		console.log(transactions[i_t]);
// // 	}
// // });


// // accountHttp.incomingTransactions(address)
// //     .subscribe(transactions => {
// //     	console.log(transactions.length);
// //     	console.log("...................");
// // 		for (let i_t = 0, len_t = transactions.length; i_t < len_t; ++i_t) {
// // 	  		if(transactions[i_t].signer!=undefined){
// // 	  			console.log('FROM : '+transactions[i_t].signer.address.value);
// // 	  		}else{
// // 		  		console.log('FROM : '+"not normal transactions");
// // 	  		}

// // 	  		if(transactions[i_t].recipient!=undefined){
// // 		  		console.log('TO   : '+transactions[i_t].recipient.value);	  		
// // 	  		}else{
// // 		  		console.log('TO   : '+"not normal transactions");
// // 	  		}
// // 		}
// //     });


// // accountHttp.outgoingTransactions(address)
// //     .subscribe(transactions => {
// //     	console.log(transactions.length);
// //     	console.log("...................");
// // 		for (let i_t = 0, len_t = transactions.length; i_t < len_t; ++i_t) {
// // 	  		if(transactions[i_t].signer!=undefined){
// // 	  			console.log('FROM : '+transactions[i_t].signer.address.value);
// // 	  		}else{
// // 		  		console.log('FROM : '+"not normal transactions");
// // 	  		}

// // 	  		if(transactions[i_t].recipient!=undefined){
// // 		  		console.log('TO   : '+transactions[i_t].recipient.value);	  		
// // 	  		}else{
// // 		  		console.log('TO   : '+"not normal transactions");
// // 	  		}
// // 		}
// //     });