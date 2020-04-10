import { Request, Response } from 'express';
import User from '../models/user.model';
import Note from '../models/notes.model';


export function renderSignUpForm(req: Request, res: Response) {
    res.render('users/signup')
};

export async function signUp(req: Request, res: Response) {
    const { name, email, password, confirm_password } = req.body;
    const userExist = await User.findOne({ email: email });
    let errors = [];
    let successAlert = [];

    if (userExist) {
        errors.push({ text: 'User already exists' });
    };
    if (password !== confirm_password) {
        errors.push({ text: 'Passwords do not match' });
    };

    if (password.length < 5) {
        errors.push({ text: 'Passwords should be at least five characters' });
    };

    if (errors.length > 0) {
        const data = [{ name, email, password, confirm_password }];
        return res.render('users/signup', {
            errors,
            data
        });
    } else {
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        newUser.save();
        successAlert.push({ text: 'User successfully created!' });
        const notes = await Note.find().lean();
        return res.render('notes/allnotes', {
            successAlert,
            notes
        });
    };
}

export async function renderSingInForm(req: Request, res: Response): Promise<any> {
    res.render('users/signin');
};



export function logout(req: Request, res: Response) {
    req.logOut();
    req.flash('success_msg', 'You Are logged out');
    res.redirect('/user/signin');
}