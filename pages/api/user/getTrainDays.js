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

  const userEmail = session.user.email;
  let client;
  try {
    client = await connectToDb();
  } catch (error) {
    res.status(500).json({ message: "server propably dead" });
    return;
  }

  const usersCollection = client.db().collection("users");

  let user;
  try {
    user = await usersCollection.findOne({ email: userEmail });
  } catch (error) {
    res.status(422).json({ message: "user exist" });
    client.close();
    return;
  }

  let trainDoc;
  try {
    trainDoc = await client.db().collection(userEmail).find().toArray();
  } catch (error) {
    res.status(422).json({ message: "nie ma takiej kolekcji " });
    client.close();
    return;
  }

  if (trainDoc.length === 0) {
    res.status(200).json({ message: "nie ma takiej kolekcji " });
    client.close();
  } else {
    res.status(200).json({ trainDays: trainDoc });
    client.close();
  }
}

export default handler;
