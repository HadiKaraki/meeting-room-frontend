const express = require('express');
const router = express.Router();
const rooms = require('../controllers/room');
const { isLoggedIn, isAdmin } = require('../middleware');

router.post('/create', isLoggedIn, isAdmin, rooms.createRoom);

router.route('/:roomId/edit') 
    .get(isLoggedIn, rooms.renderEditRoom)
    .post(isLoggedIn, rooms.editRoom)

router.route('/:roomId/add-meeting')
    .get(isLoggedIn, rooms.renderAddMeeting)
    .post(isLoggedIn, rooms.addMeeting);

router.get('/:roomId/calender', isLoggedIn, rooms.calender)

router.get('/:id/delete', isLoggedIn, rooms.deleteRoom)

router.get('/:id', isLoggedIn, rooms.showRoom)

module.exports = router;