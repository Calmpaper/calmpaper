const jwt = require('jsonwebtoken')

const jwtSecret = 'appsecret321'

function generateToken(data) {
  const token = jwt.sign(data, jwtSecret)
  return token
}

function validateToken(token) {
  try {
    var decoded = jwt.verify(token, jwtSecret)
    return decoded
  } catch (err) {
    return {}
  }
}

export { generateToken, validateToken }
