const knex = require("../config/connection")

const createDraft = async (req, res) => {
    const { company_id, title, description, location, notes, job_status } = req.body

    try {
        await knex("jobs").insert({
            company_id,
            title,
            description,
            location,
            notes,
        })

        return res.status(201).json({
            message: "Job successfully created"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const publishDraft = async (req, res) => {
    const { job_id } = req.params

    try {
        await knex("jobs").where("id", job_id).update({
            status: "published",
            updated_at: knex.raw("now()")
        })

        return res.status(200).json({
            message: "Job successfully published"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const editDraft = async (req, res) => {
    const { title, description, location } = req.body

    try {
        await knex("jobs").where("id", req.jobDraft.id).update({
            title,
            description,
            location,
            updated_at: knex.raw("now()")
        })

        return res.status(200).json({
            message: "Draf successfully edited"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const deleteDraft = async (req, res) => {
    try {
        await knex("jobs").where("id", req.jobDraft.id).del()

        return res.status(200).json({
            message: "Draf successfully deleted"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const archiveJob = async (req, res) => {

    try {
        await knex("jobs").where("id", req.ativeJob.id).update({
            status: "archived",
            updated_at: knex.raw("now()")
        })

        return res.status(200).json({
            message: "Job successfully archived"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createDraft,
    publishDraft,
    editDraft,
    deleteDraft,
    archiveJob
}