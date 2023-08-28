const flash = require('connect-flash');
const { getCompanyProfiles, getCompanyProfile, addRoom, addCompany, editCompanyProfile, deleteCompany } = require('../fetches');

module.exports.showCompanies = async(req, res) => {
    const token = req.session.token;
    var companies = await getCompanyProfiles(token);
    if(companies) {
        res.render('company/showCompanies', { companies })
    }
    else {
        res.send("No companies currently")
    }
}

module.exports.showCompany = async(req, res) => {
    const token = req.session.token;
    var { id } = req.params;
    var company = await getCompanyProfile(token, id);
    if(company) {
        var rooms = company.rooms;
        res.render('company/showCompany', { company, rooms })
    }
    else {
        res.send("Not found")
    }
}

module.exports.findCompany = async(req, res) => {
    var { id } = req.body;
    res.redirect(`/company/${id}`);
}

module.exports.renderCreateCompany = async(req, res) => {
    res.render('company/createCompany');
}

module.exports.createCompany = async(req, res) => {
    const token = req.session.token;
    var { name, description, logo, email, active } = req.body;
    const id = Math.floor(Math.random() * 100001);
    if(active=='true') {
        active = true;
    }
    else {
        active = false;
    }
    var information = {
        id,
        name,
        description,
        email,
        logo,
        active
    }
    const result = await addCompany(token, information);
    console.log(result);
    req.flash('success', 'Added company')
    res.redirect('/company/all')
}

module.exports.deleteCompany = async(req, res) => {
    const token = req.session.token;
    const { companyId } = req.params;
    const result = await deleteCompany(token, companyId)
    console.log(result)
    req.flash('success', 'Company removed')
    res.redirect('../../company/all')
}

module.exports.renderEditCompany = async(req, res) => {
    if(!req.session.user.admin) {
        const token = req.session.token;
        const { companyId } = req.params;
        const company = await getCompanyProfile(token, companyId);
        res.render('company/editCompany', { company });
    }
    else {
        res.sendStatus(403);
    }
}

module.exports.editCompany = async(req, res) => {
    const token = req.session.token;
    const { companyId } = req.params;
    var { id, name, description, logo, email } = req.body;
    const changes = {
        id,
        name,
        description,
        email,
        logo
    }
    const result = await editCompanyProfile(token, changes, companyId);
    req.flash('success', 'Edited company')
    res.redirect(`/company/${companyId}`);
}

module.exports.deactivateCompany = async(req, res) => {
    const token = req.session.token;
    const { companyId } = req.params;
    const company = await getCompanyProfile(token, companyId)
    const changes = {
        id: company.id,
        logo: company.logo,
        description: company.description,
        name: company.name,
        email: company.email,
        active: false
    }
    const result = await editCompanyProfile(token, changes, companyId);
    req.flash('success', 'Deactivated company')
    res.redirect(`/company/${companyId}`);
}

module.exports.activateCompany = async(req, res) => {
    const token = req.session.token;
    const { companyId } = req.params;
    const company = await getCompanyProfile(token, companyId)
    const changes = {
        id: company.id,
        logo: company.logo,
        description: company.description,
        name: company.name,
        email: company.email,
        active: true
    }
    const result = await editCompanyProfile(token, changes, companyId);
    req.flash('success', 'Activated company')
    res.redirect(`/company/${companyId}`);
}

module.exports.allCompanyRooms = async(req, res) => {
    const token = req.session.token;
    const { companyId } = req.params;
    const company = await getCompanyProfile(token, companyId)
    const rooms = company.rooms.$values;
    if(rooms.length != 0) {
        res.render('company/rooms', { rooms })
    }
    else {
        res.send('No rooms')
    }
}

module.exports.allCompanyUsers = async(req, res) => {
    const token = req.session.token;
    const { companyId } = req.params;
    const company = await getCompanyProfile(token, companyId)
    const users = company.users.$values;
    if(users.length != 0) {
        res.render('company/users', { users })
    }
    else {
        res.send('No users in company')
    }
}

module.exports.renderAddRoom = async(req, res) => {
    const token = req.session.token;
    const { companyId } = req.params;
    res.render('company/addRoom', { companyId })
}

module.exports.addRoom = async(req, res) => {
    const  { companyId } = req.params;
    const token = req.session.token;
    const { name, location, capacity, description } = req.body;
    const id = Math.floor(Math.random() * 100001);
    var company = await getCompanyProfile(token, companyId);
    var information = {
       id,
       name,
       location,
       capacity,
       description,
       relatedCompany: companyId,
       relatedCompanyNavigation: company
    }
    const result = await addRoom(token, information)
    console.log(result)
    res.redirect(`/company/${companyId}/all-rooms`);
}