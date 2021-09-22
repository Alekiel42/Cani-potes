const UserModel = require('../models/userModel');

const userController = {
    addNewUser : async (request, response)=>{   
        try {
            const user = new UserModel(request.body);
            const newUser = await user.save();
                if (newUser) {
                    //return un json avec les data de l'INSERT avec le nouvelle ID
                    response.status(201).json(newUser);
                    
                } else {
                    response.status(204).json('Update done');
                    
                }
        } catch (error) {
            response.status(500)
        }

    },
};

module.exports = userController;