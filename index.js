'use strict';
/**
 * [version description]
 * @return {[type]} [description]
 */
function version(key) {
  const typeKey = key || '_type';
  return (ctx, next) => {
    const cloneCxt = ctx;
    const query = ctx.query;
    const currentPath = ctx.path;
    const reg = /^\/v\d+/i;
    const result = reg.exec(currentPath);
    const versionConfig = {};
    if (result) {
      const versionDesc = result[0];
      const v = parseInt(versionDesc.substring(2), 10);
      cloneCxt.path = cloneCxt.path.substring(versionDesc.length);
      versionConfig.version = v;
    }
    if (query[typeKey]) {
      versionConfig.type = query[typeKey];
      delete query[typeKey];
      cloneCxt.query = query;
    }
    const acceptReg = /^application\/vnd\.\S+\.v(\d)+(\+(\S+))?/i;
    const acceptResult = acceptReg.exec(ctx.get('Accept'));
    /* istanbul ignore else */
    if (acceptResult) {
      versionConfig.version = parseInt(acceptResult[1], 10);
      /* istanbul ignore else */
      if (acceptResult[3]) {
        versionConfig.type = acceptResult[3];
      }
    }
    /* istanbul ignore else */
    if (versionConfig.version) {
      cloneCxt.versionConfig = versionConfig;
    }
    return next();
  };
}

module.exports = version;
