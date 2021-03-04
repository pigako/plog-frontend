const express = require("express");
const next = require("next");
const morgan = require("morgan");

const port = process.env.NODE_ENV === "production" ? 80 : 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(
        morgan("dev", {
            skip: (req, res) => {
                if (req.hostname == "hc.check") {
                    return true;
                }

                // if (req.url.slice(0, 6) == "/_next") {
                //     return true;
                // }
            }
        })
    );

    server.use((req, res, next) => {
        if (req.hostname == "hc.check") {
            return res.send("200 OK");
        }

        next();
    });

    server.use(
        "/blog",
        (() => {
            const router = express.Router();

            router.get("/post/:id", (req, res) => {
                const query = Object.assign(req.query, {
                    id: req.params.id
                });

                return app.render(req, res, "/post", query);
            });

            router.get("*", (req, res) => {
                return app.render(req, res, req.url || "/", req.query);
            });

            return router;
        })()
    );

    server.get("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (error) => {
        if (error) throw error;
        console.log("> Ready with Express");
    });
});
