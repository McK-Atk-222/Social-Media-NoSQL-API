import { Schema, Types, model, type Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date | any,
}

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date | any,
    username: string,
    reactions: Schema.Types.ObjectId[]
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter function to format timestamp
            get: function (timestamp: any) {
                return new Date(timestamp).toLocaleString(); // Format the timestamp
        },
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        timestamps: true,
        _id: false
    }
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter function to format timestamp
            get: function (timestamp: any) {
                return new Date(timestamp).toLocaleString(); // Format the timestamp
            }
        },
        username: {
            type: String,
            require: true
        },
        reactions: [
           reactionSchema
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        timestamps: true
    },
);

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
