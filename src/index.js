const express = require("express");
const path = require("path");
const { UserCollection, PriceCollection ,PastRide } = require("./config");
const bcrypt = require('bcrypt');

const app = express();


app.use(express.json());

// Static file
app.use(express.static("public"));


app.use(express.urlencoded({ extended: false }));

// Use EJS as the view engine
app.set("view engine", "ejs");

app.get("", (req, res) => {
    res.render("home");
});

app.get("/driver", (req, res) => {
    res.render("driver");
});

app.get("/booknow", (req, res) => {
    res.render("booknow");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/logout", (req, res) => {
    res.render("home");
});

app.get('/welcome', (req, res) => {
    res.render('welcome', { username: req.query.username });
});

app.get('/review', (req, res) => {
    res.render('review', { username: req.query.username });
});



app.get("/booknow", (req, res) => {
    res.render("booknow");
});



app.get('/pastride', async (req, res) => {
    try {
        const pastRides = await PastRide.find();
        res.render('pastride', { pastRides });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
// Generate OTP
app.get('/generateOTP', (req, res) => {
    currentOTP = Math.floor(100000 + Math.random() * 900000);
    res.json({ otp: currentOTP });
    
});

app.post('/booknow', (req, res) => {
    const enteredOTP = req.body.otpInput;

    if (enteredOTP == currentOTP) {
        // Redirect to review page
        res.redirect(`/review?username=${req.query.username}`);
    } else {
        res.status(400).send('Incorrect OTP');
    }
});


// Get Price route
app.post("/getPrice", async (req, res) => {
    try {
        const location = req.body.location.trim().toLowerCase();
        const destination = req.body.destination.trim().toLowerCase();
        
        console.log(`Requested location: ${location}, destination: ${destination}`);

        // Fetch all prices from the database
        const allPrices = await PriceCollection.find({});
        
        console.log(`All Price Data: ${JSON.stringify(allPrices)}`);

        // Fetch price from database based on location and destination
        const priceData = await PriceCollection.findOne({ location: location, destination: destination });

        console.log(`Price Data: ${JSON.stringify(priceData)}`);

        if (priceData) {
            res.render("getPrices", { location: location, destination: destination, price: priceData.price });
        } else {
            res.send('Price not found for the given location and destination.');
        }
    }
    catch (error) {
        console.error(`Error fetching price details: ${error}`);
        res.send("Error fetching price details");
    }
});



// Register User
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    // Check if the username already exists in the database
    const existingUser = await UserCollection.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await UserCollection.insertMany([data]);
        console.log(userdata);
    }
});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await UserCollection.findOne({ name: req.body.username });
        console.log(check); // Debugging line
        if (!check) {
            res.send("User name cannot found");
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        console.log(isPasswordMatch); // Debugging line
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            res.render("welcome", { username: req.body.username });
        }
    }
    catch (error) {
        console.log(error); // Debugging line
        res.send("wrong Details");
    }
});

// Define Port for Application
const PORT = 3000; // Change this to your desired port number
const server = app.listen(PORT, () => {
    const port = server.address().port;
    console.log(`Server is running on port ${port}`);
});
