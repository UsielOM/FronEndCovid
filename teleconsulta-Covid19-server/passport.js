const passport = require('passport');
const localpass = require('passport-local').Strategy;

const u = require('./mock-usuarios');

passport.serializeUser((usuario,done) =>{
done(null,usuario.id);
});

passport.deserializeUser((id, done)=>{
    u.find(id,(err,usuario) =>{
        done(err,usuario);
    })
})
