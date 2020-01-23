const next = require("next");
const express = require("express");
const bodyParser = require("body-parser");
const ApiRouter = require("./routes/apiRouter");

const dev = process.env.NODE_DEV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());

    server.use("/api", ApiRouter);

    server.get("/search", (req, res) => {
      return app.render(req, res, "/search", req.query);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
