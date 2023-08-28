const express = require('express');
const router = express.Router();
const users = require('../controllers/user');
const { isLoggedIn, isLoggedOut } = require('../middleware');

router.get('/all', isLoggedIn, users.showUsers);

router.route('/login')
    .get(isLoggedOut, users.renderLogin)
    .post(isLoggedOut, users.login);

router.get('/logout', isLoggedIn, users.logout)

router.route('/add-user')
    .get(isLoggedIn, users.renderAddUser)
    .post(isLoggedIn, users.addUser);

router.route('/account')
    .get(isLoggedIn, users.renderAccount)
    .post(isLoggedIn, users.editAccount);

router.get('/:id/delete', isLoggedIn, users.deleteUser)

router.get('/:id', isLoggedIn, users.showUser)

module.exports = router;