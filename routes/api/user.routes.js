module.exports = (app) => {
    const users = require('../../controllers/user.controller');
    const { check, validationResult } = require('express-validator');

    // Registering a new user
    app.post('/users',[
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email','Email is required').isEmail().exists()
    ],users.create);

//     // Retrieve all Users
     app.get('/users', users.findAll);

//     // Retrieve a single User with userId
     app.get('/users/:userId', users.findOne);

//     // Update a user with userId
     app.put('/users/:userId', users.update);

//     // Delete a user with userId
     app.delete('/users/:userId', users.delete);
 
}