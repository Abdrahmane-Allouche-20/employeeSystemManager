const express = require('express');
const router = express.Router();
const {
    getAllEmployees,
    addEmployee,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee
}=require('../controllers/employee')
 router.route("/").post(addEmployee).get(getAllEmployees);
 router.route("/:id").get(getSingleEmployee).delete(deleteEmployee).patch(updateEmployee);
module.exports = router;
