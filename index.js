import express from 'express'
import cors from 'cors'

import { PORT } from './src/api/config/environment.js'

import router from './src/api/modules/Pad/PadRoutes.js'


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(PORT);

console.log(`Starting Padont on ${PORT}`);
