const { request } = require("http");

module.exports = function(app, sql,session) {
    const jwtUtil = require("./jwtUtil");
    const crypto = require("crypto");

    //Registro P
    app.post("/register", function(request, response) {
        request.body.salt = crypto.randomBytes(16).toString("hex");
        var passwordHash = crypto.pbkdf2Sync(request.body.password, request.body.salt, 1000, 64, "sha512").toString("hex");
        request.body.password = passwordHash;

        sql.addUser(request.body, function(result) {
            response.send(result);
        });

    });

    // Login P
    app.post("/login", function(request, response) {

        const Email = request.body.Email;
        const password = request.body.password;

        sql.login({ Email, password }, result => {
            if (!result) {
                response.send(401);
                
            } else {
                session.response={
                    id:response.Id_paciente
                }
                var token = jwtUtil.signJwt(Email);
                response.send({ token });
            }

        });
    });
    // */

    //Register M
    app.post("/registermedic", function(request, response) {
        request.body.salt = crypto.randomBytes(16).toString("hex");
        var passwordHash = crypto.pbkdf2Sync(request.body.password, request.body.salt, 1000, 64, "sha512").toString("hex");
        request.body.password = passwordHash;

        sql.addmedic(request.body, function(result) {
            response.send(result);
        });

    });

     //Login M
     app.post("/loginmedic", function(request, response) {

        const Email = request.body.Email;
        const password = request.body.password;

        sql.loginmedic({ Email, password }, result => {
            if (!result) {
                response.send(401);
                
            } else {
                var token = jwtUtil.signJwt(Email);
                response.send({ token });
            }

        });
    });
    //listallpatients
    app.get('/Getpacientes', function (request, response) {
       sql.Getpacientes(result => response.send(result));
    });
    //getapatientid
    
    //insertivitalsingid
    app.post('/addRegsigvitalp',function(request,response){
        sql.addRegsigvitalp(request.body, function(result){
            response.send(result);
        })
    });
    //selectvitalspi
    app.get("/Getvitaltempid/:id",function(request,response) {
        sql.Getvitaltempid({id: request},function (result){
            response.send(result);
        });
    });

    app.get('/Getvitalsigall', function (_,response) {
        sql.Getvitalsigall(result => response.send(result));
    });
    //
};