'use strict';

/**
 * [version description]
 * @return {[type]} [description]
 */
function version(options) {
  let opts = options || {
    typeKey: '_type',
  };
  if (typeof options === 'string') {
    opts = {
      typeKey: options,
    };
  }
  const typeKey = opts.typeKey;
  const override = opts.override;

  return (ctx, next) => {
    const query = ctx.query;
    const currentPath = ctx.path;
    const reg = /^\/v\d+/i;
    const result = reg.exec(currentPath);
    const acceptConfig = {};
    if (result) {
      const versionDesc = result[0];
      const v = parseInt(versionDesc.substring(2), 10);
      /* eslint no-param-reassign:0 */
      ctx.path = ctx.path.substring(versionDesc.length);
      if (override) {
        ctx.originalPath = ctx.path;
      }
      acceptConfig.version = v;
    }
    if (query[typeKey]) {
      acceptConfig.type = query[typeKey];
      delete query[typeKey];
      /* eslint no-param-reassign:0 */
      ctx.query = query;
    }
    const acceptReg = /^application\/vnd\.\S+\.v(\d)+(\+(\S+))?/i;
    const acceptResult = acceptReg.exec(ctx.get('Accept'));
    /* istanbul ignore else */
    if (acceptResult) {
      acceptConfig.version = parseInt(acceptResult[1], 10);
      /* istanbul ignore else */
      if (acceptResult[3]) {
        acceptConfig.type = acceptResult[3];
      }
    }
    /* istanbul ignore else */
    if (acceptConfig.version) {
      /* eslint no-param-reassign:0 */
      ctx.acceptConfig = acceptConfig;
      ctx.versionConfig = acceptConfig;
    }
    return next();
  };
}

module.exports = version;
