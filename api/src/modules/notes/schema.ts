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

// Duplicate the ID field.
schema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
schema.set('toJSON', {
    virtuals: true
});

// schema.set("toJSON", {   
//     virtuals: true,   
//     versionKey: false,   
//     transform: function(doc, ret) {     delete ret._id;   } });

export default mongoose.model('notes', schema);