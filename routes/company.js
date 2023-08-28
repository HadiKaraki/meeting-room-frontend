const express = require('express');
const router = express.Router();
const companies = require('../controllers/company');
const { isLoggedIn, isAdmin } = require('../middleware');

router.get('/all', isLoggedIn, companies.showCompanies);

router.route('/add') 
    .get(isLoggedIn, isAdmin, companies.renderCreateCompany)
    .post(isLoggedIn, isAdmin, companies.createCompany)

router.route('/:companyId/edit') 
    .get(isLoggedIn, companies.renderEditCompany)
    .post(isLoggedIn, companies.editCompany)

router.get('/:companyId/delete', isLoggedIn, companies.deleteCompany)

router.get('/:companyId/deactivate', isLoggedIn, companies.deactivateCompany)

router.get('/:companyId/activate', isLoggedIn, companies.activateCompany)

router.route('/:companyId/add-room')
    .get(isLoggedIn, companies.renderAddRoom)
    .post(isLoggedIn, companies.addRoom);
    
router.get('/:companyId/all-rooms', isLoggedIn, companies.allCompanyRooms)

router.get('/:companyId/all-users', isLoggedIn, companies.allCompanyUsers)

router.post('/search', isLoggedIn, companies.findCompany)

router.get('/:id', isLoggedIn, companies.showCompany)

module.exports = router;