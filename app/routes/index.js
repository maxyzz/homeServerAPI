const noteRoutes = require('./note_routes');
const userRoutes = require('./user_routes');
const vacationRoutes = require('./vacation_routes');

module.exports = function(app, db) {
  //note routes
  noteRoutes(app, db);
  //user routes
  userRoutes(app);
  //vacation routes
  vacationRoutes(app, db);
};