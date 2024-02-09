const express = require("express")
const { listCompanies, findCompany } = require("./controllers/companies")
const routes = express()

routes.get("/companies", listCompanies)
routes.get("/companies/:company_id", findCompany)

module.exports = routes