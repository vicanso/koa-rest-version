# koa-rest-version

[![Build Status](https://travis-ci.org/vicanso/koa-rest-version.svg?style=flat-square)](https://travis-ci.org/vicanso/koa-rest-version)
[![Coverage Status](https://img.shields.io/coveralls/vicanso/koa-rest-version/master.svg?style=flat)](https://coveralls.io/r/vicanso/koa-rest-version?branch=master)
[![npm](http://img.shields.io/npm/v/koa-rest-version.svg?style=flat-square)](https://www.npmjs.org/package/koa-rest-version)
[![Github Releases](https://img.shields.io/npm/dm/koa-rest-version.svg?style=flat-square)](https://github.com/vicanso/koa-rest-version)

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