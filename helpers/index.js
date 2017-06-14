function checkIfLoggedIn(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(403).send('Please log in');
  }
}

module.exports = {
  checkIfLoggedIn,
};
