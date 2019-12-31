const createError = require('http-errors')

module.exports = redis => {
  return (req, res, next) => {
    const userId = req.body.user_id
    const keySession = 'user:' + userId + ':session'

    // remove session id from database
    redis.DEL(keySession)
      .then(num => {
        res.json({
          success: 'Successful logout'
        })
      }).catch((err) => {
        console.log(err)
        next(createError(500, 'Database error'))
      })
  }
}
