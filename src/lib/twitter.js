const axios = require('axios')
const { encode } = require('../helpers/base64')
const { log } = require('../helpers/logger')

const BASE_URL = 'https://api.twitter.com'

const createClient = ({
  consumerKey,
  consumerSecret,
  // accessTokenKey,
  // accessTokenSecret,
}) => {
  const basic = encode(`${consumerKey}:${consumerSecret}`)
  let _token = null

  const getToken = async () => {
    if (!_token) {
      const response = await twitterRequest({
        path: '/oauth2/token',
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: 'grant_type=client_credentials'
      })
      _token = response.data.access_token
    }

    return _token
  }

  const twitterRequest = async ({
    method = 'GET',
    path,
    query,
    headers,
    data,
  }) => {
    try {
      const options = {
        data,
        headers,
        method,
        query,
        url: `${BASE_URL}${path}`,
      }
      log('Making Request to Twitter API with options', JSON.stringify(options, null, 2))
      return await axios(options)
    } catch (error) {
      const status = error.response.status
      const cause = new Error(`Twitter request failed with status ${status} and body: ${JSON.stringify(error.response.data)}`)
      cause.code = status
      cause.statusCode = status

      throw cause
    }
  }

  const request = async options => {
    const token = await getToken()
    return await twitterRequest({
      ...options,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  const getUserTimeline = (user, {
    count = 10,
  } = {}) =>
    request({
      path: '/1.1/statuses/user_timeline.json',
      query: {
        screen_name: user,
        count,
      },
    })

  return {
    getUserTimeline,
  }
}

module.exports = {
  createClient,
}
