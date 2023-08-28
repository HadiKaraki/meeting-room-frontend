// AUTHENTICATION

module.exports.login = async(credentials) => {
    try {
        const response = await fetch("https://localhost:44338/api/Auth/SignIn", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(credentials)
        });
        const token = await response.text();
        return token;
    } catch(e) {
        console.log(e)
    }
}

module.exports.addUser = async(credentials) => {
    try {
        const response = await fetch("https://localhost:44338/api/Auth/SignUp", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(credentials)
        });
        const result = await response.text();
        return result;
    } catch(e) {
        console.log(e)
    }
}

module.exports.getUsers = async() => {
    try {
        const response = await fetch("https://localhost:44338/User/All", {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        });
        const users = await response.json();
        return users;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getUserByEmail = async(email) => {
    try {
        const response = await fetch(`https://localhost:44338/User/Email${email}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        });
        const user = await response.json();
        return user;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getUserByEmail = async(email) => {
    try {
        const response = await fetch(`https://localhost:44338/User/Email${email}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        });
        const user = await response.json();
        return user;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getUserByUsername = async(username) => {
    try {
        const response = await fetch(`https://localhost:44338/User/Username/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        });
        const user = await response.json();
        return user;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getUserById = async(id) => {
    try {
        const response = await fetch(`https://localhost:44338/User/Id/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        });
        const user = await response.json();
        return user;
    } catch(e) {
        console.log(e);
    }
}

module.exports.editUser = async(token, changes, id) => {
    try {
        const response = await fetch(`https://localhost:44338/api/Auth/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(changes),
        });
        const finalResponse = await response.text();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

module.exports.deleteUser = async(id) => {
    try {
        const response = await fetch(`https://localhost:44338/User/${id}`, {
            method: 'DELETE',
        });
        const finalResponse = await response.text();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

// COMPANY PROFILE

module.exports.addCompany = async(token, information) => {
    try {
        const response = await fetch('https://localhost:44338/api/CompanyProfile/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(information),
        });
        const finalResponse = await response.text();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getCompanyProfiles = async(token) => {
    try {
        const response = await fetch("https://localhost:44338/api/CompanyProfile", {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        const finalResponse = await response.json();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getCompanyProfile = async(token, id) => {
    try {
        const response = await fetch(`https://localhost:44338/api/CompanyProfile/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        const finalResponse = await response.json();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

module.exports.editCompanyProfile = async(token, changes, id) => {
    try {
        const response = await fetch(`https://localhost:44338/api/CompanyProfile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(changes),
        });
        const finalResponse = await response.text();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

module.exports.deleteCompany = async(token, id) => {
    try {
        const response = await fetch(`https://localhost:44338/api/CompanyProfile/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const finalResponse = await response.text();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

// ROOM

module.exports.addRoom = async(token, information) => {
    try {
        const response = await fetch('https://localhost:44338/api/Room/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(information),
        });
        const finalResponse = await response.text();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getRoom = async(token, id) => {
    try {
        const response = await fetch(`https://localhost:44338/api/Room/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        const finalResponse = await response.json();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

module.exports.editRoom = async(token, changes, id) => {
    try {
        const response = await fetch(`https://localhost:44338/api/Room/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(changes),
        });
        const finalResponse = await response.text();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

module.exports.deleteRoom = async(token, id) => {
    try {
        const response = await fetch(`https://localhost:44338/api/Room/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const finalResponse = await response.text();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

// MEETING

module.exports.addMeeting = async(token, information) => {
    try {
        const response = await fetch('https://localhost:44338/api/Meeting/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(information),
        });
        const finalResponse = await response.text();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getMeetings = async(token) => {
    try {
        const response = await fetch('https://localhost:44338/api/Meeting', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        const meeting = await response.json();
        return meeting;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getMeetingById = async(token, id) => {
    try {
        const response = await fetch(`https://localhost:44338/api/Meeting/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        const meeting = await response.json();
        return meeting;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getMeetingByStartTime = async(token, startTime, dateOfStart) => {
    try {
        const response = await fetch(`https://localhost:44338/Meeting/startTime/${startTime}/${dateOfStart}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        const meeting = await response.json();
        return meeting;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getMeetingsByRoomId = async(token, roomId) => {
    try {
        const response = await fetch(`https://localhost:44338/Meeting/roomId/${roomId}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        const meeting = await response.json();
        return meeting;
    } catch(e) {
        console.log(e);
    }
}

module.exports.deleteMeeting = async(token, id) => {
    try {
        const response = await fetch(`https://localhost:44338/api/Meeting/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const finalResponse = await response.text();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

module.exports.editMeeting = async(token, changes, id) => {
    try {
        const response = await fetch(`https://localhost:44338/api/Meeting/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(changes),
        });
        const finalResponse = await response.text();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

// ROLE

module.exports.addRole = async(name) => {
    try {
        const response = await fetch(`https://localhost:44338/api/Auth/Roles?roleName=${name}`, {
            method: 'POST',
            // headers: {
            //     'Content-Type':'application/json',
            // },
            // body: JSON.stringify(name),
        });
        const finalResponse = await response.text();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

module.exports.deleteRole = async(id) => {
    try {
        const response = await fetch(`https://localhost:44338/Role/${id}`, {
            method: 'DELETE'
        });
        const finalResponse = await response.text();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getRoles = async() => {
    try {
        const response = await fetch("https://localhost:44338/api/Auth/getAllRoles", {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        });
        const finalResponse = await response.json();
        return finalResponse;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getRoleByName = async(name) => {
    try {
        const response = await fetch(`https://localhost:44338/Role/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        });
        const role = await response.json();
        return role;
    } catch(e) {
        console.log(e);
    }
}

module.exports.getUserRoles = async(username) => {
    try {
        const response = await fetch(`https://localhost:44338/User/${username}/Role`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        });
        const roles = await response.json();
        return roles;
    } catch(e) {
        console.log(e);
    }
}