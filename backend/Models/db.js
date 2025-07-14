const mongoose = require('mongoose');
const url = process.env.URL;

try {
    mongoose.connect(url);
    console.log("DataBase connected Successfully ")
    
} catch (error) {
    console.log("DB connection error",error);
    
}