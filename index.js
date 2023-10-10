//import all my node modules
import express from 'express'
import { engine } from 'express-handlebars'
import bodyParser from 'body-parser'
import flash from 'express-flash'
import session from 'express-session'
import 'dotenv/config';
import db from './db/database.js'
import home_route from './routes/index_routes.js'
import waiterDatabase from './quiries/databaselogic.js'
import waiterData from './quiries/databaselogic.js'

const app = express()
const waiterModule = waiterDatabase(db)

let homeRoute = home_route(waiterData,waiterModule);
let WaiterData =waiterData(waiterModule)




app.engine(
  "handlebars",
  engine({
    layoutsDir: "./views/layouts",
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "Asiphe's",
  })
);
// session middleware
app.use(flash());
app.get("/",homeRoute.home)
app.post("/waiters",homeRoute.enterUsername)
app.get("/waiters/:username", homeRoute.selectDays)
app.post("/waiters/:username", homeRoute.getSelectedDays)
// app.get("/days",homeRoute.showNameAndDays)
// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("listen at localhost:", PORT);
})