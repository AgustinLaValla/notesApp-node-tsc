import { Router, Request, Response } from 'express';
import { renderAbout, renderIndex } from '../controllers/index.controller';

class IndexRoutes {

    public router: Router;

    constructor() { 
        this.router = Router();
        this.routes();
    }

    routes() { 
        this.router.get('/', renderIndex);
        this.router.get('/about', renderAbout);
    }
}


const indexRoutes = new IndexRoutes();
export default indexRoutes.router;