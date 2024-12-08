import express, { Request, Response, urlencoded } from 'express';
import cors from 'cors';
import { router } from './router/router'

const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(router);

app.listen(port || 4000, () => {
    console.log(`Server: http://localhost:${port}`);
});


