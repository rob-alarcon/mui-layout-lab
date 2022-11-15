import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import environment from "../environment";
import { TestRoutes } from "../routes/test_routes";
import { CommonRoutes } from "../routes/CommonRoutes";
import { UserRoutes } from "../routes/UserRoutes";
import { NotesRoutes } from "../routes/NotesRoutes";

class App {
   public app: express.Application;

   // mongo setup
   //public mongoUrl:string = 'mongodb://localhost/' + environment.getDBName();
   public mongoUrl:string = 'ups';

   private testRoutes:TestRoutes = new TestRoutes();
   private commonRoutes:CommonRoutes = new CommonRoutes();
   private userRoutes:UserRoutes = new UserRoutes();
   private notesRoutes:NotesRoutes = new NotesRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.notesRoutes.route(this.app);
      this.userRoutes.route(this.app);
      this.testRoutes.route(this.app);
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