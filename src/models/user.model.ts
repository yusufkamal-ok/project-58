import mongoose from 'mongoose';
import { encrypt } from '../utils/encryption';
import { SECRET } from '../utils/env';

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    fullName  : {
        type : String,
        require : true,
    },
    username : {
        type : String,
        require : true,
        unique : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    role : {
        type : String,
        enum : ["admin", "user"],
        default : "user"
    },
    profilePicture : {
        type : String,
        default : "default.jpg"
    },
},
{
    timestamps : true
}
);

UserSchema.pre("save", async function(next) {
    const user = this;
    user.password = encrypt(SECRET, user.password as string);
    next();
});

UserSchema.pre("updateOne", async function (next) {
    const user = (this as unknown as { _update: any })._update;
    user.password = encrypt(SECRET, user.password);
    next();
});
  
UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

const UserModel = mongoose.model("User",UserSchema);

export default UserModel;