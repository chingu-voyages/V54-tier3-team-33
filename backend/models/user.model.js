import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
        firstname:{ type:String },
        lastname: { type: String},
        email: { type:String ,},
        password:{
            type:String
        },
        account_verify:{
            type: Boolean,
            default:false,
        },
        profile:{
            type: String,
            required: false
        },
    },
    {
        timestamps: true,
    })

UserSchema.pre('save',async function(next){
    let user = this;
    // only hash password if it has modified or new
    if(!(user.isModified('password')) || !(user.isNew) ) {
        return next();
    }
    //generate a salt
    try{
        const salt = await bcrypt.genSalt(10)
        //hash the password
        user.password = await bcrypt.hash(user.password, salt);
        next()
    }
    catch(err){
        next(err)
    }
});

UserSchema.methods.comparePassword =  function(candidatePassword){
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err , isMatch)=>{
            if(err) return reject(err)
            resolve(isMatch)
        })
    })
}
module.exports = mongoose.model("User", UserSchema);
