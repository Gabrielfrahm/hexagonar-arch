
import express, { Express ,Request, Response} from "express";
import { HttpServer } from "../http-server.interface";


export default class ExpressAdapter implements HttpServer {
	app: Express;

	constructor () {
		this.app = express();
    this.app.use(express.json())
	}

	async register(method: string, url: string, callback: Function): Promise<void> {
    console.log(`Registrando rota ${method.toUpperCase()} ${url}`);
		this.app[method](url, async function (req: Request, res: Response) {
      try {
       await callback(req, res);
      } catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
		});
	}

	async listen(port: number): Promise<any> {
		return this.app.listen(port);
	}

}
