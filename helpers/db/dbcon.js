import { MongoClient, ServerApiVersion } from "mongodb";

export async function connectToDb() {
  const conString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ral6ut9.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const uri = conString;

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  return client;
}
