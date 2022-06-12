import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type : String, required: true, unique: true },
    username:  { type:String, required: true, unique:true},
    password: { type:String, requrired: true, minlength:8},
    name: { type: String, reqired:true},
    location: String,
    
});
userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);
export default User