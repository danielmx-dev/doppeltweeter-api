const { taskFromPromise } = require('../helpers/webtask-helpers')
const Twitter = require('../lib/twitter')
const assert = require('assert')

module.exports = taskFromPromise(async ctx => {
  assert(ctx.secrets.API_KEY, 'A valid twitter API_KEY is required')

  const twitterClient = Twitter.createClient({
    apiKey: ctx.secrets.API_KEY,
  })

  const users = [
    ctx.query.user_1,
    ctx.query.user_2,
  ]

  const tweetsPerUser = await Promise.all(
    users.map(getTweetsPerUser(twitterClient))
  )

  return { tweetsPerUser }
})

const getTweetsPerUser = twitterClient => async username =>
  await twitterClient.search({ username })
