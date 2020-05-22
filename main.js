const express = require('express');
const db = require('./config/db');
const authRouter = require('./routes/api/auth');

const app = express();
app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 5000;


//DatabaseConnectivity
db();
require('./routes/api/user.routes')(app);
//Routes
 app.use('/api', authRouter);

app.listen(PORT, () => console.log(`Server is up and running on Port ${PORT}`));