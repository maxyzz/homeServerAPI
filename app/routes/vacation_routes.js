var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
  app.get('/vacation/all',(req, res, next)  => {
    db.collection('vacation').find({}).toArray((err, items) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(items);
        //dynamic table
        // let result = '';
        // let tablerows = '';
        // let tableHeader = '';
        // items.forEach(function(doc) {
        //   tablerows += "<tr>";
        //   tableHeader = '';
        //   for (let el in doc) {
        //     tableHeader += '<th style="border: 1px solid grey">' + el + '</th>';
        //     tablerows += '<td style="border: 1px solid grey">' + doc[el] + '</td>';
        //   }
        //   tablerows += "</tr>";
        // });
        
        // result += '<table {border: 1px solid grey;}>' +tableHeader +tablerows + '</table>';
        // res.send(result);
        //dynamic table END
      } 
    });
  });
  app.get('/vacation/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('vacation').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
  app.post('/vacation', (req, res) => {
    const vac = { year: req.body.year, region: req.body.region, hotel: req.body.hotel, status: req.body.status, choice: req.body.choice, comments: req.body.comments };
    db.collection('vacation').insert(vac, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.delete('/vacation/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('vacation').deleteOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Vacation ' + id + ' deleted!');
      } 
    });
  });
  app.put('/vacation/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = {$set: { year: req.body.year, region: req.body.region, hotel: req.body.hotel, status: req.body.status, choice: req.body.choice, comments: req.body.comments }};
    db.collection('vacation').updateOne(details, note,{ upsert: true }, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
          console.log(err)
      } else {
          res.send(note);
      } 
    });
  });
  
};