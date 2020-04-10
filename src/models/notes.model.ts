import { Schema, model, Document } from 'mongoose';


const NoteSchema = new Schema<Note>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: String, required:true }
} , 
   { timestamps:true } //To create properties related to the time of the model creation and model updating
);



interface Note extends Document{
    title: string;
    description: string,
    user:string
}

export default model<Note>('Note', NoteSchema);