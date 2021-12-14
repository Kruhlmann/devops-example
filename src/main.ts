import express, { Request, Response, NextFunction } from "express";
import { RandomNumberGenerator } from "./domain";

const DEV_MODE = process.env.NODE_ENV !== "production";

function seed_route_middleware(request: Request, response: Response): void {
    let new_seed = Number.parseInt(request.body.seed);
    if (isNaN(new_seed)) {
        new_seed = rng.random_seed();
    }
    rng.seed(new_seed);
    response.json({ seed: new_seed }).end();
}

function index_page_middleware(_: Request, response: Response): void {
    response.render("index", { random_number: rng.random() });
}

function cache_middleware(_: Request, response: Response, next: NextFunction) {
    if (DEV_MODE) {
        response.set("Cache-Control", "no-store");
    }
    next();
}

const rng = new RandomNumberGenerator();
rng.seed(parseInt(process.env.SEED));

const server = express();
server.set("view engine", "pug");
server.set("views", "./views");
server.set("etag", !DEV_MODE);
server.use(express.json());
server.use(cache_middleware);
server.use(express.static("static"));
server.put("/seed", seed_route_middleware);
server.get("/", index_page_middleware);
server.listen(process.env.PORT, console.error);
