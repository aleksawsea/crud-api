import http from 'node:http';
import dotenv from 'dotenv';
import { userController } from './src/controllers/userController';

dotenv.config();
const PORT = Number(process.env.PORT) || 4000;

const server = http.createServer(userController);
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
