const express = require("express");
const session = require('express-session');
const Sequelize = require("sequelize");
const bdsession = require('express-mysql-session');
const cors = require("cors");
const multer = require("multer");//storage docs

const sql = require("./sql")
const bodyParser = require("body-parser");
const { Session } = require("inspector");
const app = express("");
//storage
/*
const extend = multer.diskStorage({
    destination:'Files/',
    function(req,file,cb) {
        cb("",date.now()+ file.originalName +"."+mimeTypes.extension(file.mimeTypes));
    }
})
const upload = multer({
    storage= extend
    //dest: 'Files/'
});*/
//----
var corsOptions = {
    origin: ["http://localhost:4200"]
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

var sesion = session({
    secret:'qwe123qwe123',
    key:"sessionu",
    resave: true,
    saveUninitialized:true,
    cookie: {
        maxAge: 1000*60*60*24
    }
})

app.use(sesion);

app.listen(4500, () => {
    console.log("Server is started and listening.");
    sql.init();
    
    
});

app.get("/",function(req,res){
    res.send('HOLA :)');
    console.log("HOla1");
});

/*
app.get('/', (req,res)=>{
    req.session.user = 'algien';
    req.session.rol = 'admin';
    req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
    res.send(`
    el usuario <strong>${req.session.user}</strong> con rol <strong>${ req.session.rol}</strong> ha visitado es <strong>${ req.session.visitas}</strong>   
    `);
})
*/
/*
app.get("/", function(request, response) {
    console.log(__dirname);
    response.sendFile(__dirname +  "../view/indes.html");
    response.send("Hello Node.js :)");
});

app.post("/files",upload.single('avatar'), (request,response)=>{
    response.send("archivo subido");
});
*/

require("./usuarios")(app, sql);
require("./auth")(app, sql);

module.exports.use = session;
// require("./register")(app, sql);