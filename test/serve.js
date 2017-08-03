'use strict';

const Koa = require('koa');
const version = require('..');
const request = require('supertest');
const assert = require('assert');

describe('serve', () => {
  it('should get version from url success', (done) => {
    const app = new Koa();
    app.use(version());
    app.use(ctx => {
      ctx.body = ctx.acceptConfig;
    });
    request(app.listen())
      .get('/v2/users/me?_type=xml')
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(res.body.version, 2);
        assert.equal(res.body.type, 'xml');
        done();
      });
  });

  it('should get version from url with custom type key', (done) => {
    const app = new Koa();
    app.use(version('type'));
    app.use((ctx) => {
      /* eslint no-param-reassign:0 */
      ctx.body = ctx.acceptConfig;
    });
    request(app.listen())
      .get('/v2/users/me?type=xml')
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(res.body.version, 2);
        assert.equal(res.body.type, 'xml');
        done();
      });
  });

  it('should get version form http accept header', done => {
    const app = new Koa();
    app.use(version());
    app.use((ctx) => {
      /* eslint no-param-reassign:0 */
      ctx.body = ctx.acceptConfig;
    });
    request(app.listen())
      .get('/users/me')
      .set('Accept', 'application/vnd.app-name.v3+xml')
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(res.body.version, 3);
        assert.equal(res.body.type, 'xml');
        done();
      });
  });

  it('should override the url', (done) => {
    const app = new Koa();
    app.use(version({
      override: true,
      typeKey: 'type',
    }));
    app.use((ctx) => {
      const acceptConfig = ctx.acceptConfig;
      ctx.body = {
        version: acceptConfig.version,
        type: acceptConfig.type,
        path: ctx.originalPath,
      };
    });
    request(app.listen())
      .get('/v3/users/me?type=xml')
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(res.body.version, 3);
        assert.equal(res.body.type, 'xml');
        assert.equal(res.body.path, '/users/me');
        done();
      });
  });
});
