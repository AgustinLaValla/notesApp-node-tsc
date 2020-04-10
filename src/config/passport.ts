import passport from 'passport';
import  passport_local from 'passport-local';
import User from '../models/user.model';

passport.use(new passport_local.Strategy({
    usernameField: 'email',  
    passwordField: 'password'
} , async (email, password, done) => {
    //Match user's Email
    const user = await User.findOne({email});
    if(!user) { 
        return done(null, false, {message: 'Not user Found'});
    } else { 
        //Match user's Password
       const match = await user.validatePassword(password);
       if(match) { 
           return done(null, user);
       } else {
           return done(null, false, {message: 'Incorrect password'});
       };
    };
}));


passport.serializeUser((user:any, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
        done(error,user);
    });
});