const Koa = require("koa");
const app = new Koa();
const serve = require("koa-static");

// Read port argument (if provided)
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const port = argv.port || 80;

app.use(serve("src"));

app.listen(port, function () {
  console.log(`Server running on http://localhost:${port}`);
});
