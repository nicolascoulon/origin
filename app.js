var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

      var clientList = [
      {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      phone: "0612457845"
    },
      {
      id: "2",      
      firstName: "Don",
      lastName: "Draper",
      email: "don@gmail.com",
      phone: "0654453587"
  },
    {
      id: "3",    
      firstName: "Jon",
      lastName: "Snow",
      email: "snow@gmail.com",
      phone: "0854357845"
    }
      ];

/*
var clientList = [];
// creation d'un objet instance
    var contact = {
    init: function (id,firstName, lastName, phone, email) {
    this.id = id;    
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email    
}
};*/


// def des objets et insertion dans le tab
/*
var contact1 = Object.create(contact);
contact1.init("1", "John", "Doe", "0612457845", "john@gmail.com");
clientList.push(contact1);

var contact2 = Object.create(contact);
contact2.init("2", "Don", "Draper", "0612457845", "don@gmail.com");
clientList.push(contact2);

var contact3 = Object.create(contact);
contact3.init("3", "Jon", "Snow", "0612457845", "snow@gmail.com");
clientList.push(contact3);
*/

app.get('/', function (req, res) {
  res.render('home', {clientList : clientList });
});


app.post('/add', function (req, res) {
    clientList.push(req.body);
     /*                          
    var newContact = Object.create(contact);
    newContact.init(req.body.id, req.body.firstName, req.body.lastName, req.body.phone, req.body.email);
    clientList.push(newContact);//}});  */
    res.render('home', {clientList : clientList});

});

app.get('/update', function (req, res){
     for (var i=0; i < clientList.length; i++) {
  
    console.log(req.query);
    var client;
    if (req.query.id == clientList[i].id){
        client = clientList[i];
        console.log(client);
    }
     }
res.render('update', {clientList : clientList, client : client});  
});

app.get('/edit', function (req, res) {
    console.log('^^^');
    console.log(req.query); 
   
   for (var i=0; i < clientList.length; i++) {
   
    if (req.query.id == clientList[i].id){   
        
       console.log('ok');
 
      clientList[i].id = req.query.id;
      console.log("id"+req.query);

    clientList[i].firstName = req.query.firstName;
    clientList[i].lastName = req.query.lastName;
    clientList[i].email = req.query.email;
    clientList[i].phone = req.query.phone;
  
   }}
      
  res.render('home', {clientList : clientList });
});


app.get('/delete', function (req, res) {
  for (var i=0; i < clientList.length; i++) {
      if (req.query.id == clientList[i].id){
        
          clientList.splice(i, 1);
      }
  }    
  res.render('home', {clientList : clientList});
    });


app.listen(8080, function () {
  console.log("Server listening on port 80");
});