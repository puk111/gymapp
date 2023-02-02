import { getSession } from "next-auth/react";
import { connectToDb } from "../../../helpers/db/dbcon";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  let client;
  try {
    client = await connectToDb();
  } catch (error) {
    res.status(500).json({ message: "server propably dead" });
    return;
  }

  const postCollection = client.db().collection("posts");
  let posts;
  try {
    posts = await postCollection.find({}).toArray();
  } catch (error) {
    res.status(422).json({ message: "nie ma takiej kolekcji " });
    client.close();
    return;
  }

  if (posts.length === 0) {
    res.status(200).json({ message: "pusto" });
    client.close();
  } else {
    res.status(200).json({ posts: posts });
    client.close();
  }
}

export default handler;
