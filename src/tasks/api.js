const { taskFromPromise } = require('../helpers/webtask-helpers')
const { getValue, setValue } = require('../lib/storage')
const Twitter = require('../lib/twitter')
const assert = require('assert')

module.exports = taskFromPromise(async ctx => {
  assert(ctx.data.API_KEY, 'A valid bot token is required')

  Twitter.setContext({
    apiKey: ctx.data.API_KEY,
  })

  const currentCounter = await getValue(ctx, 'counter')
  const counter = currentCounter ? currentCounter + 1 : 1
  await setValue(ctx, 'counter', counter)
  return { counter }
})