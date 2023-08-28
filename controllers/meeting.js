const flash = require('connect-flash');
const { getMeetings, getMeetingById, deleteMeeting, editMeeting } = require('../fetches');

module.exports.createMeeting = async(req, res) => {
    var { token } = req.cookies;
    res.render('meeting/createMeeting', { token })
}

module.exports.showMeeting = async(req, res) => {
    const token = req.session.token;
    const { id } = req.params;
    const meeting = await getMeetingById(token, id)
    if(!meeting) {
        res.send("Meeting not found")
    }
    res.render('meeting/showMeeting', { meeting });
}

module.exports.renderEditMeeting = async(req, res) => {
    const token = req.session.token;
    const { meetingId } = req.params;
    const meeting = await getMeetingById(token, meetingId)
    res.render('meeting/editMeeting', { meeting })
}

module.exports.editMeeting = async(req, res) => {
    const token = req.session.token;
    const { meetingId } = req.params;
    const { dateOfStart, dateOfEnd, startTime, endTime, nbOfAttendees, title } = req.body;
    const meeting = await getMeetingById(token, meetingId);
    console.log(meeting)
    var changes = {
        dateOfStart,
        dateOfEnd,
        startTime: 'T' + startTime,
        endTime: 'T' + endTime,
        nbOfAttendees,
        title,
        relatedRoomNavigation: meeting.relatedRoomNavigation
    }
    console.log(changes)
    const result = await editMeeting(token, changes, meetingId);
    console.log(result)
    res.redirect(`/meeting/${meetingId}`);
}

module.exports.deleteMeeting = async(req, res) => {
    const token = req.session.token;
    const { id } = req.params;
    const meeting = await getMeetingById(token, id);
    const roomId = meeting.relatedRoom;
    const result = await deleteMeeting(token, id)
    console.log(result)
    req.flash('success', 'Deleted meeting')
    res.redirect(`../../room/${roomId}/calender`)
}