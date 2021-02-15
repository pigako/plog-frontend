const express = require("express");
const next = require("next");
const morgan = require("morgan");

const port = process.env.NODE_ENV === "production" ? 80 : 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(morgan("dev"));

    server.get("/", (req, res) => {
        if (req.hostname == "hc.check") {
            res.send("200 OK");
        }
    });

    server.get("/blog/post/:id", (req, res) => {
        const query = Object.assign(req.query, {
            id: req.params.id
        });

        return app.render(req, res, "/post", query);
    });

    server.get("/blog/*", (req, res) => {
        const path = req.url.slice(5, req.url.length + 1);
        return app.render(req, res, path, req.query);
    });

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (error) => {
        if (error) throw error;
        console.log("> Ready with Express");
    });
});
