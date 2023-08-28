const express = require('express');
const router = express.Router();
const roles = require('../controllers/role');
const { isLoggedIn, isLoggedOut } = require('../middleware');

router.get('/all', isLoggedIn, roles.showRoles);

router.route('/add')
    .get(isLoggedIn, roles.renderAddRole)
    .post(isLoggedIn, roles.addRole);

router.get('/:roleId/delete', isLoggedIn, roles.deleteRole)

module.exports = router;