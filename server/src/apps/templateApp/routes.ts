/*  
    Routes:
        - POST /user/login

    Base Endpoint Url: /user
*/

import express = require('express');
import { User } from './template';
const TemplateRouter = express.Router();


TemplateRouter.post("/login", async (req, res) => {

    const filterQuery = {
        _id: req.body._id
    }
    
    // Check if user exists in the database
    var user = await User.db.findOne(filterQuery);
    
    if (user != null) {
        // Instantiate User Object
        let currentUser = new User(user.userType, user.name, user.emailId,
                                 user.password, "");
        // Ensure the password is the same
        if (currentUser.getPassword() == req.body.password){
            // Send token
            var token = currentUser.getToken();
            res.status(200).send({token});
        }
        // Return unauthorized error code
        else {
            res.sendStatus(401);
        }      
    } 
    // Did not find the item in the database
    else {
        res.sendStatus(404);
    }

});

export { TemplateRouter };