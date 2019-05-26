const request = require('request-promise')

module.exports = (uri, body = {}) => {
  return request({
    uri,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.102011-10-16 20:23:10',
    },
    body,
    json: true,
    method: 'GET',
  })
}
