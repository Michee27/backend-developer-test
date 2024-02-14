const knex = require("../config/connection")
const aws = require("aws-sdk")

const endpoint = new aws.Endpoint(process.env.ENDPOINT_BACKBLAZE)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

const updateFeed = async (event, context) => {
    try {
        const feed = await knex("jobs")
            .select("id", "title", "description", "company_id", "created_at")
            .where("status", "published")

        let feedContent = []

        for (const element of feed) {
            const companyName = await knex("companies").select("name").where("id", element.company_id)

            feedContent.push({
                id: element.id,
                title: element.title,
                description: element.description,
                name: companyName[0].name,
                created_at: element.created_at
            })
        }

        await s3.putObject({
            Bucket: process.env.BUCKET_NAME,
            Key: process.env.KEY_NAME,
            Body: JSON.stringify(feedContent),
            ContentType: "application/json"
        }).promise()

        return {
            statusCode: 200,
            body: "Feed successefuly updated!"
        }

    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        }
    }
}


module.exports = updateFeed

