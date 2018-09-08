const getAllData = ctx =>
  new Promise((resolve, reject) => {
    ctx.storage.get((err, data) => {
      if (err) return reject(err)
      if (!data) data = {}

      resolve(data)
    })
  })

const setAllData = (ctx, data) =>
  new Promise((resolve, reject) => {
    ctx.storage.set(data, err => {
      if (err) return reject(err)
      resolve()
    })
  })

const getValue = (ctx, key) =>
  getAllData(ctx)
    .then(data => data[key])

const setValue = (ctx, key, value) =>
  getAllData(ctx)
    .then(data => setAllData(ctx, { ...data, [key]: value }))

module.exports = {
  getAllData,
  setAllData,
  getValue,
  setValue,
}