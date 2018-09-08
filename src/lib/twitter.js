const axios = require('axios')

const BASE_URL = 'https://api.twitter.com'

const createClient = ({
  apiKey,
}) => {

  const twitterRequest = ({
    path,
    query,
    data,
  }) => {
    return axios({
      url: BASE_URL + path,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      query,
      data,
    })
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