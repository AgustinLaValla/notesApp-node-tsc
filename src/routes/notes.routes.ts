import { Router } from 'express';
import * as fromNOTES from '../controllers/notes.controller';
import { isAuthenticated } from '../helpers/auth';


class NotesRoutes {

  public router: Router;

  constructor() { 
    this.router = Router();
    this.routes();
  }

  routes() { 
    this.router.get('/', isAuthenticated, fromNOTES.renderAllNotes);
    this.router.get('/add', isAuthenticated, fromNOTES.renderNotesForm);
    this.router.post('/new-note', isAuthenticated, fromNOTES.createNewNote);
    this.router.get('/edit/:id', isAuthenticated, fromNOTES.renderEditForm);
    this.router.put('/edit/:id', isAuthenticated, fromNOTES.updateNotes);
    this.router.delete('/delete/:id', isAuthenticated, fromNOTES.deleteNotes);
  }
}

const notesRoutes = new NotesRoutes();
export default notesRoutes.router;