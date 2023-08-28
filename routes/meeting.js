const express = require('express');
const router = express.Router();
const meetings = require('../controllers/meeting');
const { isLoggedIn } = require('../middleware');

router.route('/:meetingId/edit') 
    .get(isLoggedIn, meetings.renderEditMeeting)
    .post(isLoggedIn, meetings.editMeeting)

router.get('/:id/delete', isLoggedIn, meetings.deleteMeeting)

router.get('/:id', isLoggedIn, meetings.showMeeting)

module.exports = router;