import { Schema, ObjectId , model, Document } from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: ObjectId[],
    friends: ObjectId[],
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
    },
    email: {
        type: String,
        required: true,
        max_length: 50,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'thought',
        },
      ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
},
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
  });

const User = model('User', userSchema);

export default User;
