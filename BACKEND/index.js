const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
app.use(express.json());
app.use(cors());
// db connection with mongodb
mongoose.connect("mongodb+srv://rbsvcode:rbsvcode@cluster0.cm0g4my.mongodb.net/e-commerce");


//api creation
//image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
app.use("/images", express.static("upload/images"));
const upload = multer({ storage: storage });
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://192.168.120.221:${port}/images/${req.file.filename}`
    })
})


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
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }

})
app.post("/addproduct", async (req, res) => {

    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let latest_product_reverse_array = products.slice(-1);
        let latest_product = latest_product_reverse_array[0];
        id = latest_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({

        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        old_price: req.body.old_price,
        new_price: req.body.new_price

    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name
    })
})

app.post("/removeproduct", async (req, res) => {
    console.log(req.body.id);
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("deleted");
    res.json({
        success: 1,
        name: req.body.name
    })
})

app.get("/allproducts", async (req, res) => {
    const products = await Product.find({});
    console.log(" all products is running");
    res.send(products);
})


const Users = mongoose.model('User', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    Date: {
        type: Date,
        default: Date.now,
    }
})

app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "existing user found with same email id" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;

    }
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();
    const data = {
        users: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');

    let datas = {

        success: true,
        token: token
    }
    console.log(datas);
    res.json(datas);

})

app.post("/login", async (req, res) => {
    let users = await Users.findOne({ email: req.body.email });
    if (users) {
        let passCompare = req.body.password === users.password;
        if (passCompare) {
            const data = {
                users: {
                    id: users.id
                }
            }
            const token = jwt.sign(data, "secret_ecom");
            res.json({ success: true, token, name: users.name });
        }
        else {
            res.json({ success: false, errors: "wrong password" });
        }
    }
    else {
        res.json({ success: false, errors: "wrong email id" });
    }
})

app.get("/newcollections", async (req, res) => {
    let product = await Product.find({});
    let newcollections = product.slice(1).slice(-8);
    console.log("fetched");
    res.json(newcollections);
})

app.get("/popularinwomen", async (req, res) => {
    let product = await Product.find({ category: "women" });
    let popularinwomen = product.slice(0, 4);
    res.send(popularinwomen);
})

const fetchUser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"not authenticated"});
    }
    else{
        try{
            const data= jwt.verify(token,'secret_ecom');
            req.user=data.users;
           
            next();
        }
        catch(error){
            res.status(401).send({errors:"token expired"});
            
        }
    }
}
app.post("/addtocart", fetchUser,async(req, res) => {
  
    const user=await Users.findOne({_id:req.user.id});
    user.cartData[req.body.id]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:user.cartData});
    res.send("Added");
  
})
app.post("/removefromcart", fetchUser,async(req, res) => {
  
    const user=await Users.findOne({_id:req.user.id});
    if(user.cartData[req.body.id] >0)

    user.cartData[req.body.id]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:user.cartData});
    res.send("removed");
  
})
app.post("/getcart",fetchUser,async(req,res)=>{
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})
app.post("/relatedproducts", async(req, res) => {
    // console.log(req.body);
    let products = await Product.find({ category: req.body.category });
    let relatedproducts=products.slice(0,4);

    res.json(relatedproducts);
   
})
app.get('/*', function(req, res) {
    console.log(path.join(__dirname, './error.html'));
    res.sendFile(path.join(__dirname, './error.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
app.listen(port, (error) => {
    if (!error) {
        console.log("server running on port " + port);

    }
    else {
        console.log("error " + error);
    }
})