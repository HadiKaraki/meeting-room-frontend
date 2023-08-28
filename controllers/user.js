const flash = require('connect-flash');
const { login, getCompanyProfile, getCompanyProfiles, addUser, getUserByEmail: getUser, getUsers, deleteUser, getUserByUsername, getUserById, editUser, getRoles, getUserRoles} = require('../fetches');

module.exports.showUsers = async(req, res) => {
    var users = await getUsers();
    if(users) {
        res.render('user/showUsers', { users })
    }
    else {
        res.send("Not found")
    }
}

module.exports.showUser = async(req, res) => {
    var { id } = req.params;
    var user = await getUserById(id);
    if(user) {
        res.render('user/showUser', { user })
    }
    else {
        res.send("Not found")
    }
}

module.exports.renderLogin = async(req, res) => {
    if(req.session.token){
        const user = req.session.user;
        res.redirect(`/company/${user.companyId}`);
    }
    res.render('user/login')
}

module.exports.login = async(req, res) => {
    const { userName, password } = req.body;
    const credentials = {
        userName,
        password
    }
    const token = await login(credentials);
    const user = await getUserByUsername(userName);
    const roles = await getUserRoles(userName);
    if (token!='User not found') {
        //res.cookie('token', token);
        //{ expires: new Date(Date.now() + 900000), httpOnly: true }
        req.session.token = token;
        req.session.user = user;
        req.session.roles = roles.$values;
        req.flash('success', 'welcome back!');
        if(roles.$values.includes('admin')) {
            res.redirect('/company/all');
        }
        else {
            res.redirect(`/company/${user.companyId}`);
        }
    }
    else {
        req.flash('error', 'Wrong email or password');
        res.redirect('../user/login')
    }
}

module.exports.logout = async(req, res) => {
    req.session.destroy();
    res.redirect('../../user/login')
}

module.exports.renderAddUser = async(req, res) => {
    const token = req.session.token;
    const roles = await getRoles();
    const companies = await getCompanyProfiles(token)
    res.render('user/addUser', { roles, companies })
}

module.exports.addUser = async(req, res) => {
    const token = req.session.token;
    var { companyId, firstName, lastName, email, userName, password, age, phoneNumber, role } = req.body;
    const company = await getCompanyProfile(token, companyId);
    var credentials = {
        email,
        userName,
        firstName,
        lastName,
        password,
        phoneNumber,
        age,
        role,
        companyId,
        company
    }
    const result = await addUser(credentials);
    console.log(result)
    req.flash('success', 'User added')
    res.redirect('../../user/all')
}

module.exports.renderAccount = async(req, res) => {
    res.render('user/account')
}

module.exports.editAccount = async(req, res) => {
    const token = req.session.token;
    const user = req.session.user;
    var { firstName, lastName, email, userName, age, phoneNumber } = req.body;
    const company = await getCompanyProfile(token, user.companyId)
    const changes = {
        id: user.id,
        email,
        userName,
        firstName,
        lastName,
        phoneNumber,
        age,
        company
        //companyId
    }
    const result = await editUser(changes, user.id);
    console.log(result)
    req.flash('success', 'Edited account')
    res.redirect(`../user/account`);
}

module.exports.deleteUser = async(req, res) => {
    const { id } = req.params;
    const result = await deleteUser(id)
    console.log(result);
    req.flash('success', 'User removed')
    res.redirect('../../user/all')
}