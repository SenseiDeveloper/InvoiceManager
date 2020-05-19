const express = require('express');
const cors = require('cors');
const app  = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

let USERS = [{
  id: 1574081853851,
  name: 'Administrator',
  mail: 'admin@gmail.com',
  password: '123456789'
}];

let PRODUCTS = [
  {
    id:1,
    name: 'Grapes',
    description: 'eating',
    price: 5
  },
  {
    id:2,
    name: 'Lime',
    description: 'eating',
    price: 3
  },
  {
    id:3,
    name: 'Apple',
    description: 'eating',
    price: 7
  },
  {
    id:4,
    name: 'Lemon ',
    description: 'fresh',
    price: 4
  },
  {
    id:5,
    name: 'Cherry',
    description: 'fresh',
    price: 10
  },
  {
    id:6,
    name: 'Blueberry',
    description: 'fresh',
    price: 15
  },
  {
    id:7,
    name: 'Banana',
    description: 'salat',
    price: 11
  },{
    id:8,
    name: 'Watermelon',
    description: 'salat',
    price: 20
  },
  {
    id:9,
    name: 'Pineapple',
    description: 'salat',
    price: 30
  },
  {
    id:10,
    name: 'Orange',
    description: 'salat',
    price: 17
  },
  {
    id:11,
    name: 'Avocado',
    description: 'eating',
    price: 26
  }
];

let INVOICE = [
  {
    id:1,
    name: 'Invoice 1',
    data: "2020-05-04T21:00:00.000Z",
    totalPrice: 90.2,
    products:[
      {
        id: 6,
        name: "Blueberry",
        description: "fresh",
        price: 15,
        discount: 5
      },
      {
        id: 5,
        name: "Cherry",
        description: "fresh",
        price: 10,
        discount: 15
      },
      {
        id: 8,
        name: "Watermelon",
        description: "salat",
        price: 20,
        discount: 20
      },
      {
        id: 9,
        name: "Pineapple",
        description: "salat",
        price: 30,
        discount: 10
      },
      {
        id: 10,
        name: "Orange",
        description: "salat",
        price: 17,
        discount: 30
      },
      {
        id: 4,
        name: "Lemon ",
        description: "fresh",
        price: 4,
        discount: 40
      },
      {
        id: 3,
        name: "Apple",
        description: "eating",
        price: 7,
        discount: 20
      },
      {
        id: 1,
        name: "Grapes",
        description: "eating",
        price: 5,
        discount: 10
      }
    ]
  },
  {
    id:2,
    name: 'Invoice 2',
    data: "2020-04-03T21:00:00.000Z",
    totalPrice: 18.6,
    products:[
      {
        id: 7,
        name: "Banana",
        description: "salat",
        price: 11,
        discount: 11
      },
      {
        id: 2,
        name: "Lime",
        description: "eating",
        price: 3,
        discount: 12
      },
      {
        id: 3,
        name: "Apple",
        description: "eating",
        price: 7,
        discount: 40
      },
      {
        id: 4,
        name: "Lemon ",
        description: "fresh",
        price: 4,
        discount: 50
      }
    ]
  },
  {
    id:3,
    name: 'Invoice 3',
    data: "2020-03-03T21:00:00.000Z",
    totalPrice: 23.4,
    products:[
      {
        id: 2,
        name: "Lime",
        description: "eating",
        price: 40,
        discount: 100
      },
      {
        id: 11,
        name: "Avocado",
        description: "eating",
        price: 26,
        discount: 10
      }
    ]
  },
  {
    id: 1589387651868,
    name: "testing",
    data: "2020-05-03T21:00:00.000Z",
    totalPrice: "40.0",
    products: [
      {
        id: 4,
        name: "Lemon ",
        description: "fresh",
        price: 4,
        discount: 10
      },
      {
        id: 7,
        name: "Banana",
        description: "salat",
        price: 11,
        discount: 15
      },
      {
        id: 6,
        name: "Blueberry",
        description: "fresh",
        price: 15,
        discount: 20
      },
      {
        id: 5,
        name: "Cherry",
        description: "fresh",
        price: 10,
        discount: 5
      }
    ]
  }
];

//VERIFICATION TOKEN
function verifyToken(req,res,next){
  if(!req.headers.authorization) {
    return res.status(401).send('Unautorized request')
  }

  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null'){
    return res.status(401).send('Unautorized request')
  }

  let payload = jwt.verify(token, 'secretKey')
  if(!payload){
    return res.status(401).send('Unautorized request')
  }
  req.userId = payload.subject;
  next();
}

//API CKECK EMAIL FOR REPIT
app.post('/api/checkEmailNotTaken', cors(),function (req,res){
  let email = req.body.mail;

  const validation = USERS.filter(user => user.mail === email);
  if(validation.length === 0){
    res.send(null);
  }else{
    res.send({invalidEmail: true});
  }

});

//API CREATE USER
app.post('/api/createuser', cors(), function (req,res) {
  let user = {
    id: Date.now(),
    name: req.body.name,
    mail: req.body.email,
    password: req.body.password
  };
  USERS.push(user);
  res.status(200).send(user);
});

//API CKECK DATA LOGIN USER
app.post('/api/login', cors(),function (req,res){
  let userData = req.body;

 let find = USERS.filter(user => {
    if(user.mail === userData.email && user.password === userData.password ){
      return user;
    }else  {
       return 0;
    }
  });

 if(find.length !==0 ){
   let payload = { subject: find.id };
   let token = jwt.sign(payload,'secretKey');
   res.status(200).send({token, name: find.name});
 } else {
   res.status(401).send('Missing password or email');
 }
});

//API GET PRODUCTS LIST
app.get('/api/products',cors(),verifyToken,function(req, res){
  res.send(PRODUCTS);
});

//API CREATE PRODUCTS
app.post('/api/products/create',cors(),function(req, res){
  let product = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };
  PRODUCTS.push(product);
  res.send(PRODUCTS);
});

//API UPDATEP RODUCTS
app.put('/api/products/update/:id',cors(),function(req, res){
  let newProduct = PRODUCTS.find(function(product){
    return product.id === Number(req.params.id)
  });
  newProduct.name = req.body.name;
  newProduct.description = req.body.description;
  newProduct.price = Number(req.body.price);

  res.status(200).send(PRODUCTS);
});

//API DELETE PRODUCTS
app.delete('/api/products/:id',cors(),function(req, res){
  PRODUCTS = PRODUCTS.filter(function(product){
    return product.id !== Number(req.params.id)
  });
  res.status(200).send(PRODUCTS)
});

//API DUBLICATE PRODUCTS
app.post('/api/products/dublicate',cors(),function(req, res){
  let product = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };
  PRODUCTS.push(product);
  res.status(200).send(PRODUCTS);
});

//API GET INVOICE LIST
app.get('/api/invoice',cors(),verifyToken,function(req, res){
  res.send(INVOICE);
});

//API ADD NEW INVOICE
app.post('/api/invoice/create',cors(),function(req, res){
  let invoice = {
    id: Date.now(),
    name: req.body.name,
    data: req.body.data,
    totalPrice: req.body.totalPrice,
    products: req.body.products
  };
  INVOICE.push(invoice);
  res.send(INVOICE);
});

//API REMOVE INVOICE
app.delete('/api/invoices/delete/:id',cors(),function(req, res){
  INVOICE = INVOICE.filter(function(inv){
    return inv.id !== Number(req.params.id)
  });
  res.send(INVOICE);
});

//API GET SELECT INVOICE
app.get('/api/invoice/select/:id',cors(),function(req, res){
  let invoice = INVOICE.find(function(inv){
    return inv.id === Number(req.params.id)
  });
  res.send(invoice);
});

//API GET INVOICE AND PRODUCTS
app.get('/api/invoice/selectinv/:id',cors(),function(req, res){
  let invoice = INVOICE.find(function(inv){
    return inv.id === Number(req.params.id)
  });
  const newSelectProducts = invoice.products.map(p => p.id);
  const newProducts = PRODUCTS.filter(e => ! newSelectProducts.includes(e.id));
  Object.assign(invoice,{nonSelect: newProducts});
  res.send(invoice);
});

//API UPDATE INVOICE
app.put('/api/invoice/edit/:id',cors(),function(req, res){
  let newInvoice = INVOICE.find(function(inv){
    return inv.id === Number(req.params.id)
  });

  newInvoice.name = req.body.name;
  newInvoice.data = req.body.data;
  newInvoice.totalPrice = Number(req.body.totalPrice);
  newInvoice.products = req.body.products;

  res.send(INVOICE);
});


app.listen(9000,function(){
  console.log('Api app started');
});
