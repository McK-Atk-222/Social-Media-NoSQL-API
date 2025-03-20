import { Schema, model, type Document } from 'mongoose';

interface IAssignment extends Document {
    assignmentId: Schema.Types.ObjectId,
    name: string,
    score: number
}

interface ICourse extends Document {
    name: string,
    inPerson: boolean,
    start: Date,
    end: Date,
    students: Schema.Types.ObjectId[]
}

const courseSchema = new Schema<ICourse>(
    {
        name: {
            type: String,
            required: true,
        },
        inPerson: {
            type: Boolean,
            default: true,
        },
        start: {
            type: Date,
            default: Date.now(),
        },
        end: {
            type: Date,
            // Sets a default value of 12 weeks from now
            default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: 'student',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

const assignmentSchema = new Schema<IAssignment>(
    {
        assignmentId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        name: {
            type: String,
            required: true,
            maxlength: 50,
            minlength: 4,
            default: 'Unnamed assignment',
        },
        score: {
            type: Number,
            required: true,
            default: () => Math.floor(Math.random() * (100 - 70 + 1) + 70),
        },
    },
    {
        timestamps: true,
        _id: false
    }
);

const Course = model<ICourse>('Course', courseSchema);

export default Course;
