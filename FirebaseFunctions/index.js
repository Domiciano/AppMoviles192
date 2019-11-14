const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

const ITEMS = 5;

admin.initializeApp();
const app = express();
app.use(express.json());

app.get('/param', (req, res) => {
  res.send("Received GET param. Alfa: " + req.query.alfa + ", Beta: " + req.query.beta);
});

app.get('/photos', (req, res) => {
	var fotos = [];
	var out = [];
	var page = req.query.page;
	var album = req.query.uid;

	admin.database().ref()
		.child('fotos')
		.child(album)
		.once('value', function(snap){

			snap.forEach(
				(item) => {
					fotos.push( item.val() );														
				}
			);

			for(let i=page*ITEMS ; i < ITEMS + page*ITEMS - 1 ; i++){
				if(fotos[i] !== undefined){
					out.push(fotos[i]);
				}
			}

			res.send(out);

	});
	
});

exports.functions = functions.https.onRequest(app);
