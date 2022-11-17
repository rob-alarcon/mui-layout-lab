import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as cors from 'cors'
import environment from "../environment";
import { CommonRoutes } from "../routes/CommonRoutes";
import { NotesRoutes } from "../routes/NotesRoutes";

class App {
   public app: express.Application;

   // mongo setup
   //public mongoUrl:string = 'mongodb://localhost/' + environment.getDBName();
   public mongoUrl:string = 'ups';

   private commonRoutes:CommonRoutes = new CommonRoutes();
   private notesRoutes:NotesRoutes = new NotesRoutes();

   constructor() {
      this.app = express();

      // configure cors
      const allowlist = ['http://localhost:5173/', 'http://localhost:5174/']
      const corsOptionsDelegate = function (req, callback) {
         var corsOptions;
         if (allowlist.indexOf(req.header('Origin')) !== -1) {
           corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
         } else {
           corsOptions = { origin: false } // disable CORS for this request
         }
         callback(null, corsOptions) // callback expects two parameters: error and options
      }

      this.app.use(cors());
      this.config();
      this.mongoSetup();
      this.notesRoutes.route(this.app);
      this.commonRoutes.route(this.app);
   }

   private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl);
   }
}
export default new App().app;