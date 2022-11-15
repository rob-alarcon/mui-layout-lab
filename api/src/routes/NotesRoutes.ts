import { Application, Request, Response } from "express";
import { NotesController } from "../controllers/NotesController";

export class NotesRoutes {
    private notesController:NotesController = new NotesController();

    public route(app: Application) {
        app.post('/api/notes', (req:Request, res:Response) => {
            this.notesController.addNote(req, res);
        });

        app.get('/api/notes', (request:Request, response:Response) => {
            this.notesController.getNotes(request, response);
        });

        app.delete('/api/notes/:id', (req: Request, res: Response) => {
            this.notesController.deleteNote(req, res);
        });
    }

}