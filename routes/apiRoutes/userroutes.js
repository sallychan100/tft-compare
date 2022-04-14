const router = require('express').Router();
const { User } = require("../../models");

router.post('/signup', (req, res) => {
    // Access our User model and run .findAll() method)
    console.log(req.body)
    User.create({email: req.body.email,
        password: req.body.password,})
    
    .then(dbUser => res.json(dbUser))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req,res) => {
    User.findOne({
        where: {
            email: req.body.email,
        }   
    }).then((dbUserData)=>{
        if (dbUserData) {
            var passwordMatch = dbUserData.checkPassword(req.body.password)
            if (passwordMatch){
            res.status(200).json(dbUserData)
            }else {
            res.status(400).json({Message: "Invalid password"})
            }
        } else {
            res.status(400).json({Message: "No User Found"})
        }
    }); 
});

module.exports = router;