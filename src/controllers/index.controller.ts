import { Request, Response } from 'express'

export function renderIndex(req:Request, res:Response):void {
    res.render('index');
};

export function renderAbout(req: Request, res: Response):void { 
    res.render('about');
};