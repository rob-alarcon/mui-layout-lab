import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { INote } from "../modules/notes/model"
import NotesService from "../modules/notes/service";
import { ParsedQs } from "qs";
import { failureResponse, insufficientParameters, mongoError, successResponse } from '../modules/common/service';

export class NotesController {
    private notesService:NotesService = new NotesService();
    
    public addNote(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, 
        res: Response<any, Record<string, any>>) {
        
        if (!req || !req.body) {
            return insufficientParameters(res);
        }

        const body = req.body;

        if (!body.title || !body.details || !body.category) {
            return insufficientParameters(res);
        }

        const note:INote = {
            "title": body.title,
            "details": body.details,
            "category": body.category,
            "createdDate": new Date()
        };

        this.notesService.addNote(note, (error:any, noteResponse:INote) => {
            if (error) {
                mongoError(error, res);
            } else {
                successResponse('created note successfully', noteResponse, res);
            }
        });
    }

    public getNotes(request:Request, response:Response) {

        this.notesService.getNotes((error:any, notes:INote[]) => {
            if (error) {
                mongoError(error, response);
            }

            successResponse('notes', notes, response);
        });
    };

    public deleteNote(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) {
        if (!req || !req.params || !req.params.id) {
            insufficientParameters(res);
        }

        this.notesService.deleteNote(req.params.id, (error:any, errorDetails) => {
            if (error) {
                mongoError(error, res);
            } else if (errorDetails.deletedCount > 0) {
                successResponse('note deleted', null, res);
            } else {
                failureResponse('note deletion failed', null, res);
            }
        });
    }

}