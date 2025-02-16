const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/roadbook",{
  useNewUrlParser: true,
  useCreateIndex: true,
})
.then(() => {
  console.log('MongoDB Connected');
})
  .then(() => {
    console.log("connecting");
  })
  .catch((err)=>{
    console.log(err);
  });

const customerSchema = mongoose.Schema({
  name: 'string',
  age: 'number',
  sex: 'string',
},
  {
    collection:'newCustomer'
  }
);

const Customer = mongoose.model('Schema', customerSchema);

const customer1 =new Customer({name:'홍길동', age:30,sex:'남'});

customer1.save().then(() => {
  console.log(customer1);
})
  .catch((err) => {
  console.log('error: ' + err.message)
});
