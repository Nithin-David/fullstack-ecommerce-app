const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const path = require('path');
const multer = require('multer');
const cors = require('cors');
require("dotenv").config({});

PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  `mongodb+srv://nithindavid96:${process.env.DBPASSWORD}@cluster0.hqnab.mongodb.net/e-commerce`
);

app.get('/', (req, res) => {
  res.send('Hello from the server!');
})

const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

//generate image url.
app.use("/images", express.static("uploads/images"));


//upload the image.
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: true,
    img_url: `http://localhost:${PORT}/images/${req.file.filename}`
  })
});


const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  new_price:{
    type: Number,
    required: true,
  },
  old_price:{
    type: Number,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now,
  },
  available:{
    type: Boolean,
    default: true,
  }
})

//add the products
app.post('/addproduct', async (req, res) => {
  const products = await Product.find({})
  let id;
  if (products.length > 0) {
    let lastProductArray = products.slice(-1);
    let lastProduct = lastProductArray[0];
    id = lastProduct.id + 1;
  }else{
    id=1;
  }
  const {name, category, image, old_price, new_price} = req.body;

  try {
    const product = new Product({id: id, name, category, image, old_price, new_price});
    await product.save();
    res.status(201).json({product});
    
  } catch (error) {
    res.status(400).send(error);
  }
});

//remove the products
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({id: req.body.id});

  res.status(200).json({
    id: req.body.id,
    name: req.body.name,
  })
});

//get all products
app.get('/getallproducts', async(req, res) => {
  const allProducts = await Product.find({});

  res.json(allProducts);
})


//Users schema creation
const Users = mongoose.model("Users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
    default: {},
  },
  date: {
    type: Date,
    default: Date.now,
  }

});

//signup endpoint creation.
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password){
    return res.status(400).json({ message: 'Please provide all the required fields' });
  }

  const existingUser = await Users.findOne({ email });
  if(existingUser){
    return res.status(409).json({ message: 'Email already exists' });
  }

  let cart = {};
  for(let i=0; i <= 300; i++){
      cart[i] = 0
  }

  const user = new Users({ name: username, email, password, cartData: cart });
  await user.save();

  const data = {
    user: {
      id: user.id,
    }
  }

  const token = jwt.sign(data, 'secret_ecom');
  res.json({success: true, token });
});

//login endpoint creation.
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  const user = await Users.findOne({ email });

  if(!user){
    return res.status(200).json({success: false, message: "User not found"});
  }

  if (password !== user.password) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid password" });
  } 

  const data = {
    user: {
      id: user.id,
    }
  }
  const token = jwt.sign(data,'secret_ecom');
  res.json({success: true, token });

});

//end point for new collection.
app.get('/newcollections', async (req, res) => {
  let products = await Product.find({});
  let newCollections = products.slice(1).slice(-8);
  console.log(newCollections);
  
  res.send(newCollections);
});

//end point for populat in women.
app.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({category: "women"});
  let popularInWomen = products.slice(0, 4);

  res.send(popularInWomen);
});

//middleware for user authentication.
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");

  if(!token){
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;

    next();
  } catch (error) {
    res.status(401).json({message: "Invalid token, authorization denied"});
  }
}

app.post("/addtocart", fetchUser,async (req, res) => {
   let userData = await Users.findOne({_id: req.user.id});
   userData.cartData[req.body.itemId] += 1;

   await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});

   res.json("Added");
  
});

//remove from the cart.
app.post("/removecart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
 
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );

  res.json("Removed");
});


//get all cart data.
app.post("/getcart", fetchUser, async (req, res) => {
  const userData = await Users.findOne({_id: req.user.id});
  res.json(userData.cartData);
})

app.listen(PORT, (error) => {
 if(!error){
  console.log(`Server is running on port ${PORT}`);
 }else{
  console.log(error);
 }
})
