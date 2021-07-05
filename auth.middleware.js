
function isAuthorized(req) {
  const { headers } = req;
  const apiKey = headers['x-api-key'];
  if (!apiKey || apiKey !== '3B6E3963-CA80-42D2-9A45-0605A7BF242D') {
    return false;
  }
  return true;
}

module.exports = function (req, res, next) {
  if (isAuthorized(req)) {
    next()
  } else {
    res.sendStatus(401)
  }
}
