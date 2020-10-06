const mongoose = require('mongoose');
require('dotenv').config()

const connectDb = () => {
    mongoose.set('useUnifiedTopology', true);
    return mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true });
};

module.exports= { connectDb };
