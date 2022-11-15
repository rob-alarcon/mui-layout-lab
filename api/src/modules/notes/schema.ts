import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    title: String,
    details: String,
    category: String, // TODO: make this an enum
    createdDate: {
        type: Date,
        default: new Date()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('notes', schema);