const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10)

const encode = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, salt)
}

const decode = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = { encode, decode }