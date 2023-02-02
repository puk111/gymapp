import { getSession } from "next-auth/react";
import { connectToDb } from "../../../helpers/db/dbcon";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const userEmail = session.user.email;
  const { day, active, exerciseCounter, seriesArr } = req.body;

  let client;
  try {
    client = await connectToDb();
  } catch (error) {
    res.status(500).json({ MessageErr: "server propably dead" });
    client.close();
    return;
  }

  const userCollection = client.db().collection(userEmail);

  let result;
  try {
    result = await userCollection.updateOne(
      { day: day },
      {
        $set: {
          active: active,
          exerciseCounter: exerciseCounter,
          seriesArr: seriesArr,
        },
      }
    );
  } catch (error) {
    res.status(404).json({ MessageErr: "cos nie tak" });
    client.close();
    return;
  }

  client.close();
  res.status(200).json({ message: "progress updated" });
}

export default handler;
