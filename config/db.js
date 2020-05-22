const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
    try {
        await mongoose.connect(config.get("mongoURI"),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => console.log('Connected To Database!')
       )
    }
    catch (err){
        res.status(500).json({"Error":err.message});
    }
}

module.exports = connectDB;