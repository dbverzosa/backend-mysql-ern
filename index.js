import express from 'express'
import cors from 'cors'
import session from 'express-session'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import db from './config/Database.js' //// enable if connect to database
import UserRoute from "./routes/UserRoute.js"
import VehicleRoute from "./routes/VehicleRoute.js"
import AuthRoute from "./routes/AuthRoute.js"
import SequelizeStore from "connect-session-sequelize"



dotenv.config();


const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore ({
    db : db
});
// (async()=>{
//     await db.sync();
// })(); ////enable the import to connect to mysqldatabase, it will automatically create tables in database



app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized:true,
    store: store,
    cookie:{
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json());
app.use(UserRoute);
app.use(VehicleRoute);
app.use(AuthRoute);

// store.sync(); ////done creating the table session in database mysql

app.listen(process.env.APP_PORT, ()=>{
    console.log('Server is up and running...')
})

