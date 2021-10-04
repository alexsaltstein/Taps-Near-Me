const apiRoutes = require('./api');

const constructorMethod = (app) => {
  app.use('/api', apiRoutes);
  app.get('*', (req, res) => {
    res.json({
      error: 'Not a valid route',
    });
  });
};

module.exports = constructorMethod;
