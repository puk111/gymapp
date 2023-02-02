import { getSession } from "next-auth/react";
import { connectToDb } from "../../../helpers/db/dbcon";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const userEmail = session.user.email;
  const { day, active, exerciseCounter, seriesArr } = req.body;

  const client = await connectToDb();
  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "user dont exist" });
    client.close();
    return;
  }

  const trainCollection = client.db().collection(userEmail);

  const dayIsSet = await trainCollection.findOne({ day: day });

  if (dayIsSet) {
    res.status(422).json({ ErrMessage: "day is allredy set" });
    client.close();
    return;
  }

  const result = await trainCollection.insertOne({
    day,
    active,
    exerciseCounter,
    seriesArr,
  });
  client.close();
  res.status(200).json({ message: "added day" });
}

export default handler;
