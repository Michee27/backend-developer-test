const knex = require("../config/connection")

const checkJob = async (req, res, next) => {
    const { job_id } = req.params

    try {
        const check = await knex("jobs").where("id", job_id)

        if (check.length === 0) {
            return res.status(400).json({
                message: "Job does not exist"
            })
        }

        if (check[0].status !== "draft") {
            return res.status(400).json({
                message: "You can't edit/delete a job that has already been published"
            })
        }

        req.jobDraft = check[0]
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const checkActiveJob = async (req, res, next) => {
    const { job_id } = req.params

    try {
        const checkJob = await knex("jobs").where("id", job_id)

        if (checkJob[0].status !== "published") {
            return res.status(400).json({
                message: "You can only archive a published a job."
            })
        }

        req.ativeJob = checkJob[0]
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    checkJob,
    checkActiveJob
}