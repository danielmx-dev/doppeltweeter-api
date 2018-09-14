const encode = source => Buffer.from(source).toString('base64')
const decode = source => Buffer.from(source, 'base64').toString('ascii')

module.exports = {
  encode,
  decode
}
