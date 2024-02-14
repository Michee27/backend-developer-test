const aws = require("aws-sdk")

const endpoint = new aws.Endpoint(process.env.ENDPOINT_BACKBLAZE)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

const getFeed = async (req, res) => {
    try {
        const data = await s3.getObject({
            Bucket: process.env.BUCKET_NAME,
            Key: process.env.KEY_NAME
        }).promise()

        const feed = JSON.parse(data.Body.toString())

        res.json(feed)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = getFeed