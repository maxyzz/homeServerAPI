const userService = require('../../users/user.service');

module.exports = function (app) {

    app.post('/users/authenticate', (req, res, next) => {
      console.log("req.body="+JSON.stringify(req.body));
      console.log("req.headers="+JSON.stringify(req.headers));
      userService.authenticate(req.body)
      .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
      ////.then(user => user ? res.cookie('access_token', user.token, {httpOnly: true}).status(301).redirect('http://localhost:5500/index.html') : res.status(400).json({ message: 'Username or password is incorrect' }))
      .catch(err => next(err));
      //res.cookie('access_token', res.token, {httpOnly: true}).status(301).redirect('/index.html');
    });

    app.post('/users/register', (req, res, next) => {
      userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
    });

    app.get('/users/',(req, res, next)  => {
      userService.getAll()
      .then(users => res.json(users))
      .catch(err => next(err));
    });

    app.get('/users/current',(req, res, next)  => {
      userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
    });

    app.get('/users/:id',(req, res, next)  => {
      userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
    });

    app.put('/users/:id',(req, res, next)  => {
      serService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
    });

    app.delete('/users/:id',(req, res, next)  => {
      userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
    });

  };