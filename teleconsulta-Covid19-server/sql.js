const Sequelize = require("sequelize");
const crypto = require("crypto");
// const session = require('express-session');

//const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sequelize = new Sequelize("telecovid", "root", "Root150", {
    host: "localhost",
    dialect: "mariadb",
    port: 3306,
    storage: "./session.mariadb"
});
/*
const Usersregister = sequelize.define('Userreg', {

    Name: { type: Sequelize.STRING },
    Last_nameF: { type: Sequelize.STRING },
    Last_nameM: { type: Sequelize.STRING },
    CURP: { type: Sequelize.STRING },
    Date_of_birth: { type: Sequelize.STRING },
    Gender: { type: Sequelize.STRING },
    Email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    tipeu: {type: Sequelize.INTEGER},//tu
    salt: { type: Sequelize.STRING, allowNull: false }
    
});
*/
/*
var sessionStore = new SequelizeStore({
    db:sequelize
})

const sessionconf = (app) =>{
    app.use(
    session({
        key: "cat150",
        secret: "keyboard cat",
        store: sessionStore,
        saveUninitialized:false,
        resave: false, // we support the touch method so per the express-session docs this should be set to false
        proxy: true, // if you do SSL outside of node.
        cookie:{maxAge:( 24*60*60*1000)}
    })
    );
};
//sessionStore.sync();
module.exports.sessionconf = sessionconf;
*/

const Usersregister = sequelize.define('Pacientes', {

    Nombre: { type: Sequelize.STRING },
    Apellido_paterno: { type: Sequelize.STRING },
    Apellido_materno: { type: Sequelize.STRING },
    CURP: { type: Sequelize.STRING },
    Fecha_nacimiento: { type: Sequelize.DATEONLY },
    Sexo: { type: Sequelize.STRING },
    Email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    tipeu: {type: Sequelize.INTEGER},//tu
    salt: { type: Sequelize.STRING, allowNull: false }
    
});

const Usersregistermedic = sequelize.define('Medicos', {

    Nombre: { type: Sequelize.STRING },
    Apellido_paterno: { type: Sequelize.STRING },
    Apellido_materno: { type: Sequelize.STRING },
    CURP: { type: Sequelize.STRING },
    Fecha_nacimiento: { type: Sequelize.DATEONLY },
    Sexo: { type: Sequelize.STRING },
    Email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    Especialidad: { type: Sequelize.STRING },
    Hospital: { type: Sequelize.STRING },
    Cedula_profecional: { type: Sequelize.STRING },
    Consultorio: { type: Sequelize.STRING },
    tipeu: {type: Sequelize.INTEGER},//tu
    salt: { type: Sequelize.STRING, allowNull: false }
    
});

const Regsignosvitalesidp = sequelize.define('Signos_vitales', {

    Id_paciente: { type: Sequelize.INTEGER},
    Temperatura: { type: Sequelize.STRING},
    Oxigenacion: { type: Sequelize.STRING},
    Frecuencia_cardiaca: { type: Sequelize.STRING},
    Fechahora: { type: Sequelize.DATE}
}, {
    timestamps: false
});

init = function() {
    sequelize
        .authenticate()
        .then(() => {
            console.log("Conexion  exitosa ");
        })
        .catch(err => {
            console.error("Conexion fracasada ", err)
        });

    //Usersregistermedic.sync();


};

// createUser = function(request, callback) {
//     Usersregister.create({
//         Name: request.Name,
//         Last_nameF: request.Last_nameF,
//         Last_nameM: request.Last_nameM,
//         CURP: request.CURP,
//         Date_of_birth: request.Date_of_birth,
//         Gender: request.Gender,
//         Email: request.Email,
//         password: request.password

//     }).then(userr => callback(userr));
// };

//REGISTER P------------
addUser = function(user, callback) {
    Usersregister.create({
        Nombre: user.Nombre,
        Apellido_paterno: user.Apellido_paterno,
        Apellido_materno: user.Apellido_materno,
        CURP: user.CURP,
        Fecha_nacimiento: user.Fecha_nacimiento,
        Sexo: user.Sexo,
        Email: user.Email,
        password: user.password,
        tipeu: user.tipeu,//tu
        salt: user.salt
    }).then(callback(true));
}

//REGISTER M------------
addmedic = function(user, callback) {
    Usersregistermedic.create({
        Nombre: user.Nombre,
        Apellido_paterno: user.Apellido_paterno,
        Apellido_materno: user.Apellido_materno,
        CURP: user.CURP,
        Fecha_nacimiento: user.Fecha_nacimiento,
        Sexo: user.Sexo,
        Email: user.Email,
        password: user.password,
        Especialidad: user.Especialidad,
        Hospital: user.Hospital,
        Cedula_profecional: user.Cedula_profecional,
        Consultorio: user.Consultorio,
        tipeu: user.tipeu,//tu
        salt: user.salt
    }).then(callback(true));
}

//LOGIN P----------------
login = function(request, callback) {

        Usersregister.findOne({
            where: {
                Email: request.Email
            }
        }).then(function(Email) {
            if (Email !== null) {
                var passwordHash = crypto
                    .pbkdf2Sync(request.password, Email.salt, 1000, 64, "sha512")
                    .toString("hex");

                if (passwordHash === Email.password) {
                    callback(true);
                    return;
                }
            }
            callback(false);
        })
    }

//LOGIN M----------------
loginmedic = function(request, callback) {

    Usersregistermedic.findOne({
        where: {
            Email: request.Email
        }
    }).then(function(Email) {
        if (Email !== null) {
            var passwordHash = crypto
                .pbkdf2Sync(request.password, Email.salt, 1000, 64, "sha512")
                .toString("hex");

            if (passwordHash === Email.password) {
                callback(true);
                return;
            }
        }
        callback(false);
    })
}

// Regsignosvitalesid
addRegsigvitalp = function(user,callback){
    Regsignosvitalesidp.create({
        Id_paciente: user.Id_paciente,
        Temperatura: user.Temperatura,
        Oxigenacion: user.Oxigenacion,
        Frecuencia_cardiaca: user.Frecuencia_cardiaca,
    }).then(callback(true));
}

// UDAPTE USER

// SELECT SHOW 1
Getpacientes = function(callback){
Usersregister.findAll({
    order: sequelize.literal( "Apellido_paterno DESC")
}).then(Pacientes => callback(Pacientes));
};

// SELECT SHOW 2
selectallpatients = function(_,require){
    sequelize.query("Select * from Pacientes");
    return;
};

//select vitalsigid
Getvitaltempid = function (idp,callback) {
    
    Regsignosvitalesidp.findAll({
        where:{
            Id_paciente: idp,
        },
        order: sequelize.literal("Fechahora DESC limit 5")
    }).then(signosv => callback(signosv));
};

Getvitalsigall = function (callback) {
   Regsignosvitalesidp.findAll({
       order:sequelize.literal("Id_paciente DESC limit 4")
   }).then( Signos => callback(Signos));
};

// DELETE



    // module.exports.createUser = createUser;
module.exports.init = init;
module.exports.login = login;
module.exports.loginmedic = loginmedic;
module.exports.addUser = addUser;
module.exports.addmedic = addmedic;
module.exports.Getpacientes = Getpacientes;
module.exports.addRegsigvitalp = addRegsigvitalp;
module.exports.Getvitalsigall = Getvitalsigall;
module.exports.Getvitaltempid = Getvitaltempid;