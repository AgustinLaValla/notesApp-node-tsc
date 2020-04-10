import { Router } from 'express';
import { renderSignUpForm, renderSingInForm, signUp, logout } from '../controllers/users.controller';
import passport from 'passport';


class UserRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    };

    routes() {
        this.router.get('/signup', renderSignUpForm);
        this.router.post('/signup', signUp);
        this.router.get('/signin', renderSingInForm);
        this.router.post('/signin', passport.authenticate('local', {
            failureRedirect: '/user/signin',
            successRedirect: '/notes',
            failureFlash: true
        }));
        this.router.get('/logout', logout);
    };
};

const userRoutes = new UserRoutes();
export default userRoutes.router;
