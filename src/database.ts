import mongoose from 'mongoose';
import colors from 'colors';
import "dotenv/config";

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE  } = process.env
const mongodbURI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`

export async function connect() {
    try {
        await mongoose.connect(`mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        });
        console.log(`${colors.yellow('DATABSE IS CONNECTED')}`);
    } catch (error) {
        console.log(`${colors.red('Database Error:')} ${colors.blue(error)}`)
    }

}