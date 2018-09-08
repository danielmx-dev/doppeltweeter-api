const axios = require('axios')

const BASE_URL = 'https://api.twitter.com'

const createClient = ({
  apiKey,
}) => {

  const twitterRequest = async ({
    path,
    query,
    data,
  }) => {
    try {
      return await axios({
        url: BASE_URL + path,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        query,
        data,
      })
    } catch (error) {
      const status = error.response.status
      const cause = new Error(`Twitter request failed with status ${status} and body: ${JSON.stringify(error.response.data)}`)
      cause.code = status
      cause.statusCode = status

      throw cause
    }
  }

  const search = query =>
    twitterRequest({
      path:' /1.1/search/tweets.json',
      query,
    })

  return {
    search,
  }
}

module.exports = {
  createClient,
}
