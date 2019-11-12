const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

admin.initializeApp();
const app = express();
app.use(express.json());

app.get('/user', (req, res) => {
  res.send("Received GET param: "+req.query.alfa);
});

app.get('/photos', (req, res) => {

	var out = [];
	var fotos = [];

	admin.database().ref().child('fotos').child(req.query.uid).on('value', function(snap){
		snap.forEach(
				(item) => {
					fotos.push( item.val() );														
				}
			);


		for(var i = fotos.length-1 ; i>=0 ; i--) {
			if( i >= parseInt(req.query.from) && i <= parseInt(req.query.to) ){
				out.push(fotos[i]);
			}
		}
		res.send(out);
	});
});

exports.functions = functions.https.onRequest(app);