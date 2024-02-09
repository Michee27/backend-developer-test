const knex = require("../config/connection")

const listCompanies = async (req, res) => {
    try {
        const companies = await knex("companies")
        return res.status(200).json(companies)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const findCompany = async (req, res) => {
    const { company_id } = req.params
    try {
        const company = await knex("companies").where("id", company_id)

        return res.status(200).json(company)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    listCompanies,
    findCompany
}