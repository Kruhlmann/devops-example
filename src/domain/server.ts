import { Server } from "http";
import express, { Request, Response, NextFunction, Express } from "express";

import { RandomNumberGenerator } from "./random_number_generator";
import { DEV_MODE, PORT, SEED } from "./env";

export class WebServer {
    protected rng: RandomNumberGenerator;
    protected server: Express;
    protected socket: Server;

    public constructor() {
        this.rng = new RandomNumberGenerator(SEED);
        this.server = express();
        this.server.set("view engine", "pug");
        this.server.set("views", "./views");
        this.server.set("etag", !DEV_MODE);
        this.server.use(express.json());
        this.server.use(this.generate_cache_middleware());
        this.server.use(express.static("static"));
        this.server.put("/seed", this.generate_seed_route_middleware());
        this.server.get("/", this.generate_index_page_middleware());
    }

    protected generate_seed_route_middleware() {
        return (request: Request, response: Response) => {
            let new_seed = Number.parseInt(request.body.seed);
            if (isNaN(new_seed)) {
                new_seed = this.rng.random_seed();
            }
            this.rng.seed(new_seed);
            response.json({ seed: new_seed }).end();
        };
    }

    protected generate_index_page_middleware() {
        return (_: Request, response: Response) => {
            response.render("index", { random_number: this.rng.random() });
        };
    }

    protected generate_cache_middleware() {
        return (_: Request, response: Response, next: NextFunction) => {
            if (DEV_MODE) {
                response.set("Cache-Control", "no-store");
            }
            next();
        };
    }

    public start() {
        this.socket = this.server.listen(PORT, console.error);
    }

    public stop() {
        this.socket.close(() => process.exit(0));
        setTimeout(() => process.exit(1), 10000);
    }
}
