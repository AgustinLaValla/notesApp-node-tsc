import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs'; 

//User Model
const userSchema = new Schema<User>({
    email: { type:String, required:true, lowercase:true, unique:true },
    password: { type: String,  required: true },
    name: { type: String, required:true }
},  {timestamps: true}
);

//Internal encryption
userSchema.methods.encryptPassword = async (password:string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
};

//Compare password with encrypted password
userSchema.methods.validatePassword = async function(password:string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export interface User extends Document {
    email:string;
    password:string;
    name:string;
    encryptPassword(password:string):Promise<string>,
    validatePassword(password:string): Promise<boolean> 
};
 
export default model<User>('User', userSchema);


