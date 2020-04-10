import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import colors from 'colors';
import path from 'path';
import exphbs from 'express-handlebars';
import indexRoutes from './routes/index.routes';
import notesRoutes from './routes/notes.routes';
import methodOverride from 'method-override';
import userRoutes from './routes/users.routes';
import flash from 'connect-flash';
import sesion from 'express-session';
import passport from 'passport';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

class Server {

    public app: Application

    constructor() {
        this.app = express();
        require('./config/passport');
        this.settings();
        this.middlewares();
        this.staticFiles();
        this.setGlobalVariables();
        this.routes();
    }

    settings() {
        //port
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('views', path.join(__dirname, '..', 'src', 'views'));
        this.app.engine('.hbs', exphbs({ //To set template engine
            extname: '.hbs',
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layouts'), //Common template
            partialsDir: path.join(this.app.get('views'), 'partials'),//Template pieces
            handlebars: allowInsecurePrototypeAccess(Handlebars)
        }));
        this.app.set('view engine', '.hbs');
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(methodOverride('_method')); // To enbable delete and put methods from html views (allnotes.hbs)
        this.app.use(sesion({ //Allow to save messages in the server
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(flash()); //
    }

    staticFiles() {
        this.app.use(express.static('./')); //To set the accesible files from browser
    }

    setGlobalVariables() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            //To return values of success message, if there is any, and save it into a local properety of the Response Objects
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            res.locals.error = req.flash('errors');
            res.locals.user = req.user || null;
            next(); //It's a middleware, so we want to continue the proccess
        })
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/notes', notesRoutes);
        this.app.use('/user', userRoutes);
    }

    async start() {
        await this.app.listen(this.app.get('port'));
        console.log(`${colors.magenta('Server on port:')} ${colors.green(this.app.get('port'))}`);
    }
}


export default Server;