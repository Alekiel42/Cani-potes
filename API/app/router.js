const {Router} = require('express');
const router = Router();
const userController = require('./controllers/userController');
const ckeckToken  = require('./middlewares/checkJwt');
const rideController = require('./controllers/rideController');

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (request, file, cb)=>{}
})
const upload = multer({ storage: storage });



router.get('/', ckeckToken, function (req, res) {
    res.send('GET request to the homepage token ok '+ req.userId)});

router.post('/login',userController.login),

router.post('/subscribe',userController.addNewUser);

router.get('/rides', rideController.findAll);

//todo rajouter mw de verif identité
router.delete('/ride/:rideId(\\d+)', rideController.delete);

//todo rajouter mw de verif token
router.delete('/ride/:rideId(\\d+)/participation', rideController.leaveARide);
router.post('/ride/:rideId(\\d+)/participation', rideController.addNewParticipant);

//todo rajouter mw de verif token
router.delete('/ride/:rideId(\\d+)/participation/user/:userId(\\d+)', rideController.removeUserFromRide);

module.exports = router;