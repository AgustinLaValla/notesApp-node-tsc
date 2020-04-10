import { Request, Response } from 'express'
import Note from '../models/notes.model';


export function renderNotesForm(req: Request, res: Response) {
    res.render('notes/newnote');
    console.log(req.user.id)
};

export async function renderAllNotes(req: Request, res: Response): Promise<void> {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: 'desc' });
    res.render('notes/allnotes', { notes });
};

export async function createNewNote(req: Request, res: Response): Promise<void> {
    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success-msg', 'Note added succesfully'); //Save a message in the server
    res.redirect('/notes');
};

export async function renderEditForm(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const note = await Note.findById(id).lean();
    if (!note) {
        return res.status(400).json({ message: 'Note does not exists!' })
    };
    if (note.user != req.user.id) {
        req.flash('error_msg', 'Not Authorized')
        return res.redirect('/notes');
    };
    return res.render('notes/edit-note', { note });

};

export async function updateNotes(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { body } = req;
    await Note.findByIdAndUpdate(id, body);
    req.flash('success_msg', 'Note succesfully updated!');
    res.redirect('/notes');
};

export async function deleteNotes(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    let errors = [];
    let successAlerts = [];
    const noteExist = await Note.findById(id);


    if (!noteExist) {
        errors.push({ text: 'Note does not exists!' });

        const notes = await Note.find().lean();
        return res.render('notes/allnotes', {
            errors,
            notes
        });
    };

    if (noteExist) {
        if (noteExist.user != req.user.id) {
            req.flash('error_msg', 'Not Authorized')
            return res.redirect('/notes');
        };
        await Note.findByIdAndRemove(id);
        // req.flash('success_msg', 'Note succesfully deleted');
        successAlerts.push({ text: 'Note successfully deleted' });

        const notes = await Note.find().lean();

        return res.render('notes/allnotes', {
            successAlert: successAlerts,
            notes
        });
    }








}
