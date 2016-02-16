# koa-rest-version

parse rest api version config, support two url format:

- `/v2/user/me?_type=json`

- `/user/me` (Accept: application/vnd.app-name.v2+json)

## API

```js
const Koa = require('koa');
const version = require('version');
const app = new Koa();
app.use(version());
app.use(ctx => {
	// url: /user/me
	// {"version": 2, "type": "xml"}
	console.info(ctx.versionConfig);
});
app.listen();
// GET /v2/user/me?_type=xml
```


## License

MIT