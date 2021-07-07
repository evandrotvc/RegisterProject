import 'reflect-metadata'
import express from 'express'
import routes from './routes'
import cors from 'cors';

import { Router, Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(express.json())

const route = Router()
app.use(routes);

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript aaaaaa' })
})

app.use(route)


const server = app.listen(3333, () => {
   console.log('\n ✈️ server running on port 3333 ✈️');
});


/**
 * Ao encerrar o processo, o app é finalizado também
 */
 process.on('SIGINT', () => {
    server.close();
    console.log('\nApp finalizado');
});