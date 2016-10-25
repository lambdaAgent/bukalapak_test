var express = require("express");
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require("fs");

app.set('views', path.join(__dirname, '../client/build'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.get("/", (req, res) => {
	res.render("index")
});

app.get("/getMain", (req,res) => {
	createMainJSON().then(main =>  res.json(main));
});

app.get("/category", (req, res) => {
	var filename = "./json/" + req.query.category;
	getOneJson(filename).then(file => {
		res.json(file) 
	});
});

app.listen(8000, () => {
	console.log("start at port", 8000)
});


// ==========
//	 HELPER
// ==========

function getOneJson(filename){
	return new Promise((resolve, reject) => {
		fs.readFile(filename, "utf-8", (err, file) => {
			var file = JSON.parse(file)
			resolve(file);
		});
	});
}

function createMainJSON(){
	return new Promise((resolve, reject) => {
		fs.readFile("./json/main.json", "utf-8", (err, file) =>{
			var data = JSON.parse(file);
			resolve(data)
		});
	});
}