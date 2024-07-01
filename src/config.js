const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut", { useNewUrlParser: true  , useUnifiedTopology: true});

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
});

// User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Price Schema
const PriceSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});


//drivers data

const pastRideSchema = new mongoose.Schema({
    driverName: String,
    age: Number,
    location: String,
    date: Date
});



// User Collection
const UserCollection = new mongoose.model("users", UserSchema);

// Price Collection
const PriceCollection = new mongoose.model("price", PriceSchema);

//booknow
const PastRide = mongoose.model('PastRide', pastRideSchema);

module.exports = {
    UserCollection,
    PriceCollection,
    PastRide
};
