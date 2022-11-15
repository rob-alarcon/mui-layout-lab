//lib/routes/test_routes.ts
import {Application, Request, response, Response } from 'express';

export class TestRoutes {
   public route(app: Application) {
      
      app.get('/api/test', (req: Request, res: Response) => {
         res.status(200).json({message: "Get request successfull"});
      });
      
      app.post('/api/test', (req: Request, res: Response) => {
         res.status(200).json({message:"Post request successfull"});
      });

      app.post('/api/papitas', (req:Request, res:Response) => {
         res.status(200).json({foo:"fritas"});
      });

      app.get('/api/foo', (req: Request, res: Response) => {
         res.status(200).json({message: "bar"});
      });
   }
}