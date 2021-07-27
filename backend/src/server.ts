import 'reflect-metadata'
// require('dontenv').config();
import express from 'express'
import routes from './routes'
import './database';
import cors from 'cors';
import morgan from 'morgan'
import {connectDb} from './database/index';
import cookieParser from 'cookie-parser';

import EnsureAuth from './middlewares/ValidateCookie';
import { Router, Request, Response } from 'express';

export const app = express();

//
app.use(cors({credentials: true, origin: true}));
app.use(cookieParser())
app.use(express.json())

app.use(morgan('dev'));

connectDb();

const route = Router()
app.use(routes);

route.get('/', (req: Request, res: Response) => {
  res.send('hello world with Typescript').status(200);
})
app.use(EnsureAuth);
app.use(route);