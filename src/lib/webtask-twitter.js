const assert = require('assert')

const getConfigFromContext = ctx => {
  assert(ctx.secrets.TWITTER_CONSUMER_KEY, 'A valid twitter TWITTER_CONSUMER_KEY is required')
  assert(ctx.secrets.TWITTER_CONSUMER_SECRET, 'A valid twitter TWITTER_CONSUMER_SECRET is required')
  assert(ctx.secrets.TWITTER_ACCESS_TOKEN, 'A valid twitter TWITTER_ACCESS_TOKEN is required')
  assert(ctx.secrets.TWITTER_ACCESS_TOKEN_SECRET, 'A valid twitter TWITTER_ACCESS_TOKEN_SECRET is required')

  return {
    consumerKey: ctx.secrets.TWITTER_CONSUMER_KEY,
    consumerSecret: ctx.secrets.TWITTER_CONSUMER_SECRET,
    accessTokenKey: ctx.secrets.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: ctx.secrets.TWITTER_ACCESS_TOKEN_SECRET,
  }
}

module.exports = {
  getConfigFromContext,
}
