
const axios = require('axios')

const BASE_URL = 'https://api.twitter.com'
let context = null

/* Call the given endpoing in Slack API */
const setContext = _context => {
  context = _context
}


const twitterRequest = ({
  path,
  query,
  data,
}) => {
  return axios({
    url: BASE_URL + path,
    headers: {
      Authorization: `Bearer ${context.apiKey}`,
    },
    query,
    data,
  })
}


module.exports = {
  setContext,
  twitterRequest,
}