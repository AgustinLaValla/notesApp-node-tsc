import { Request, Response, NextFunction } from 'express';

export function isAuthenticated(req: Request, res: Response, next: NextFunction) { 
    if(req.isAuthenticated()) { 
        return next();
    };
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/user/signin');
};