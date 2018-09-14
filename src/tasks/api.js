const { taskFromPromise } = require('../helpers/webtask-helpers')
const Twitter = require('../lib/twitter')
const { getConfigFromContext } = require('../lib/webtask-twitter')
const assert = require('assert')

module.exports = taskFromPromise(async ctx => {
  assert(ctx.query.user_1, 'User 1 is required')
  assert(ctx.query.user_2, 'User 2 is required')

  const twitterClientConfig = getConfigFromContext(ctx)
  const twitterClient = Twitter.createClient(twitterClientConfig)

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
  await twitterClient.getUserTimeline(username)
