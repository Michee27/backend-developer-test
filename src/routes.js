const express = require("express")

const { listCompanies,
    findCompany } = require("./controllers/companies")

const { createDraft,
    publishDraft,
    editDraft,
    deleteDraft,
    archiveJob } = require("./controllers/jobs")

const { checkJob,
    checkActiveJob } = require("./middlers/validations")

const getFeed = require("./controllers/feed")


const routes = express()

routes.get("/companies", listCompanies)
routes.get("/companies/:company_id", findCompany)
routes.post("/job", createDraft)
routes.put("/job/:job_id/publish", publishDraft)
routes.put("/job/:job_id", checkJob, editDraft)
routes.delete("/job/:job_id", checkJob, deleteDraft)
routes.put("/job/:job_id/archive", checkActiveJob, archiveJob)
routes.get("/feed", getFeed)

module.exports = routes