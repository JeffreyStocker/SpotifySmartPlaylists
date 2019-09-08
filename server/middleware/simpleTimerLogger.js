const timer = async (ctx, next) => {
  const initTime = Date.now();
  await next();
  console.log (ctx.method, ctx.url, 'Time Interval:', Date.now() - initTime);
}

module.exports = timer;