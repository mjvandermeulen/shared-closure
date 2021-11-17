const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');

app.use(serve('.'));

port = 4545

app.listen(port, function() {
  console.log(`Server running on https://localhost:${port}`);
});

