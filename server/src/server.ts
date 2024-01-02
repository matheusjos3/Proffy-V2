import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(
    { host: '0.0.0.0', port: 3333 },
    () => console.log("server running")
)