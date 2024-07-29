const { MongoClient, ServerApiVersion } = require('mongodb')

const uri =
  'mongodb+srv://LFadmin:31feSY1FisrK4MYa@lf.fo7upyu.mongodb.net/?retryWrites=true&w=majority&appName=LF'

let client
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })
    await client.connect()
  }
  return client
}

export async function GET() {
  try {
    const client = await connectToDatabase()
    const coll = client.db('LF').collection('students')
    const cursor = coll.find({})
    const students = await cursor.toArray()
    const data = { status: 'successfully completed', res: students }
    return Response.json(data)
  } catch (error) {
    console.error(error)
    return Response.json({ status: 'error', message: error.message })
  } finally {
    // Do not close the client here, reuse it for future requests
  }
}
