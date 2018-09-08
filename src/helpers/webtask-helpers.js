const taskFromPromise = fn => (ctx, cb) => {
  return fn(ctx)
    .then(
      result => cb(null, result),
      error => cb(error)
    )
}

module.exports = {
  taskFromPromise,
}