import { IncomingMessage, ServerResponse } from 'node:http';
import { userService } from '../services/UserService';
import { parseJsonBody } from '../utils/bodyParser';
import { User } from '../types/user';
import { HttpError } from '../utils/httpError';

export async function userController(req: IncomingMessage, res: ServerResponse) {
  try {
    const url = req.url || '';
    const idMatch = url.match(/^\/api\/users\/([^/]+)$/);
    if (req.method === 'GET' && url === '/api/users') {
      const usersList = userService.getAll();
      res.writeHead(200, {'Content-Type': 'application/json'}).end(JSON.stringify(usersList));
    } else if (req.method === 'GET' && idMatch) {
      const user = userService.getByUserId(idMatch[1]);
      res.writeHead(200, {'Content-Type': 'application/json'}).end(JSON.stringify(user));
    } else if (req.method === 'POST' && url === '/api/users') {
      const body = await parseJsonBody(req) as Omit<User, 'id'>;
      const newUser = userService.create(body);
      res.writeHead(201, {'Content-Type': 'application/json'}).end(JSON.stringify(newUser));
    } else if (req.method === 'PUT' && idMatch) {
      const body = await parseJsonBody(req) as Partial<Omit<User, 'id'>>;
      const updatedUser = userService.update(idMatch[1], body);
      res.writeHead(200, {'Content-Type': 'application/json'}).end(JSON.stringify(updatedUser));
    } else if (req.method === 'DELETE' && idMatch) {
      userService.remove(idMatch[1]);
      res.writeHead(204).end();
    } else {
      res.writeHead(404).end(JSON.stringify({ message: 'Endpoint not found' }));
    }
  } catch (err) {
    if (err instanceof HttpError) {
      res.writeHead(err.status, {'content-Type': 'application/json'}).end(JSON.stringify({message: err.message }));
    } else if (err instanceof Error) {
      res.writeHead(500, {'content-Type': 'application/json'}).end(JSON.stringify({message: err.message }));
    }
  }
}
