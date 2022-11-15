import { INote } from './model';
import notesSchema from './schema'

export default class NotesService {
    public getNotes(callback: (error: any, notes: INote[]) => void) {
        notesSchema.find({}, (error:any, notes:INote[]) => {
            // response.send(notes);
            callback(null, notes);
        });
    }
    
    public addNote(note:INote, callback: any) {
        const _session = new notesSchema(note);
        _session.save(callback);
    }

    public deleteNote(id: String, callback: any) {
        const query = { _id: id };
        notesSchema.deleteOne(query, callback);
    }

}