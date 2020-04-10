import Server from './app';
import { connect }  from './database';
import { config } from 'dotenv';

class Index { 
    constructor() { 
        this.main();
    }

    databaseConnection() { 
        connect();
    }

    main() { 
        config(); //To load enviroment variables
        this.databaseConnection();
        const app = new Server();
        app.start();
    }
}


new Index();