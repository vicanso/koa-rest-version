'use strict';
const Koa = require('koa');
const version = require('..');
const request = require('supertest');
const assert = require('assert');

describe('serve', () => {
	it('should get version from url success', done => {
		const app = new Koa();
		app.use(version());
		app.use(ctx => {
			ctx.body = ctx.versionConfig;
		});
		request(app.listen())
			.get('/v2/users/me?_type=xml')
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert.equal(res.body.version, 2);
				assert.equal(res.body.type, 'xml');
				done();
			});
	});

	it('should get version form http accept header', done => {
		const app = new Koa();
		app.use(version());
		app.use(ctx => {
			ctx.body = ctx.versionConfig;
		});
		request(app.listen())
			.get('/users/me')
			.set('Accept', 'application/vnd.app-name.v3+xml')
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert.equal(res.body.version, 3);
				assert.equal(res.body.type, 'xml');
				done();
			});
	});
});