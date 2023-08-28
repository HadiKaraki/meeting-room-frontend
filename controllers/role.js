const flash = require('connect-flash');
const { addRole, getRoles, deleteRole } = require('../fetches');

module.exports.showRoles = async(req, res) => {
    const roles = await getRoles();
    if(roles) {
        res.render('role/showRoles', { roles })
    }
    else {
        res.send("No roles currently")
    }
}

module.exports.renderAddRole = async(req, res) => {  
    res.render('role/addRole');
}

module.exports.addRole = async(req, res) => {
    const { roleName } = req.body;
    const result = await addRole(roleName);
    console.log(result);
    res.redirect('/role/all')
}

module.exports.deleteRole = async(req, res) => {
    const { roleId } = req.params;
    const result = await deleteRole(roleId);
    console.log(result);
    req.flash('success', 'Deleted role');
    res.redirect('/role/all')
}