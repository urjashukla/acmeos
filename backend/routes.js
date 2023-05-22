module.exports = function (app) {
  /*
   * Routes
   */
  app.use('/doubt', require('./routes/doubt'));
  app.use('/comment', require('./routes/comment'));
  app.use('/vote', require('./routes/vote'));
  app.use('/note', require('./routes/note'));
  app.use('/bookmark', require('./routes/bookmark'));
  app.use('/inprogress', require('./routes/inprogress'));
  app.use('/profile', require('./routes/profile'));
};
