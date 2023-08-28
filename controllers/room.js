const flash = require('connect-flash');
const { getRoom, deleteRoom, addMeeting, editRoom, getCompanyProfile, getMeetingsByRoomId } = require('../fetches');

module.exports.showRoom = async(req, res) => {
    const token = req.session.token;
    const { id } = req.params;
    const room = await getRoom(token, id)
    if(!room) {
        return res.send("Room not found")
    }
    res.render('room/showRoom', { room });
}

module.exports.calender = async(req, res) => {
    const token = req.session.token;
    const { roomId } = req.params;
    const room = await getRoom(token, roomId);
    const meetings = room.meetings.$values;
    // Get current date
    const currentDate = new Date();

    // Extract year, month, and day
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Format the date as yyyy-mm-dd
    const formattedDate = `${year}-${month}-${day}`;

    res.render('room/calender', { meetings, formattedDate })
}

module.exports.createRoom = async(req, res) => {
    const token = req.session.token;
    var { id,  } = req.body;
    res.render('room/createRoom', { token })
}

module.exports.deleteRoom = async(req, res) => {
    const token = req.session.token;
    const { id } = req.params;
    const room = await getRoom(token, id);
    const companyId = room.relatedCompany;
    const result = await deleteRoom(token, id)
    console.log(result);
    res.redirect(`/company/${companyId}/all-rooms`);
}

module.exports.renderEditRoom = async(req, res) => {
    const token = req.session.token;
    const { roomId } = req.params;
    const room = await getRoom(token, roomId)
    res.render('room/editRoom', { room })
}

module.exports.editRoom = async(req, res) => {
    const token = req.session.token;
    const { roomId } = req.params;
    const room = await getRoom(token, roomId)
    const company = await getCompanyProfile(token, room.relatedCompany);
    var { name, description, location, capacity } = req.body;
    const changes = {
        name, 
        description, 
        location, 
        capacity,
        relatedCompanyNavigation: company
    }
    const results = await editRoom(token, changes, roomId);
    console.log(results)
    req.flash('success', 'Edited room')
    res.redirect(`/room/${roomId}`);
}

module.exports.renderAddMeeting = async(req, res) => {
    const token = req.session.token;
    const { roomId } = req.params;
    res.render('room/addMeeting', { roomId })
}

module.exports.addMeeting = async (req, res) => {
    const { roomId } = req.params;
    const token = req.session.token;
    const id = Math.floor(Math.random() * 100001);
    const { dateOfStart, dateOfEnd, startTime, endTime, nbOfAttendees, title } = req.body;
    var room = await getRoom(token, roomId);
    var user = req.session.user;

    // VALIDATIONS
    if(nbOfAttendees > room.capacity) {
        req.flash('error', 'Number of attendees is greater than room capacity')
        res.redirect(`/room/${roomId}/add-meeting`)
        return false;
    }
    
    const meetingsInRoom = await getMeetingsByRoomId(token, roomId);
    for(let meeting of meetingsInRoom.$values) {
        if(meeting.dateOfStart == dateOfStart && meeting.dateOfEnd == dateOfEnd){
            if(meeting.startTime.substring(1) == startTime) {
                req.flash('error', 'Meeting already scheduled at that time')
                res.redirect(`/room/${roomId}/add-meeting`)
                return false;
            }
            if(meeting.startTime.substring(1) < startTime && meeting.endTime.substring(1) > endTime){
                req.flash('error', 'Meeting already scheduled between this time period')
                res.redirect(`/room/${roomId}/add-meeting`)
                return false;
            }
            if(meeting.startTime.substring(1) > startTime && meeting.endTime.substring(1) < endTime){
                req.flash('error', 'Meeting already scheduled between this time period')
                res.redirect(`/room/${roomId}/add-meeting`)
                return false;
            }
        }
        if(meeting.dateOfStart < dateOfStart && meeting.dateOfEnd > dateOfEnd) {
            req.flash('error', 'Meeting already scheduled between this time period')
            res.redirect(`/room/${roomId}/add-meeting`)
            return false;
        }
        if(meeting.dateOfStart < dateOfStart && meeting.dateOfEnd == dateOfEnd){
            if(meeting.endTime.substring(1) < startTime) {
                req.flash('error', 'Meeting overlaps with the start time of another meeting')
                res.redirect(`/room/${roomId}/add-meeting`)
                return false;
            }
        }
    }

    var information = {
        id,
        relatedRoom: roomId,
        userId: user.id,
        dateOfStart,
        dateOfEnd,
        startTime: 'T' + startTime,
        endTime: 'T' + endTime,
        nbOfAttendees,
        title,
        meetingStatus: true,
        relatedRoomNavigation: room,
    };

    const meeting = await addMeeting(token, information);
    console.log(meeting);
    res.redirect(`/room/${roomId}/calender`);
};
