const router = require('express').Router();
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

router.post('/users',[
    check('email', 'Enter a valid email').isEmail(),
    check('password','Enter a password!').exists(),
],
 async (req, res) => {
     //Validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    //Creating new user
    const { email,password } = req.body;
    try{
        //Check email if already exists
        const foundUser = await User.findOne({email});
        if(!foundUser){
          return res.status(400).json({errors: "Invalid Credentials."});
        }
        
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if(!isMatch){
            res.status(401).json({errors: "Invalid Credentials."});
        }
        res.send("LoggedIn!")
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;