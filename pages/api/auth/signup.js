import { hashPassword } from "../../../helpers/db/crypt";
import { connectToDb } from "../../../helpers/db/dbcon";
import {
  validEmail,
  validPassword,
} from "../../../helpers/functions/validators";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password, password2, name } = data;

  if (!email || !password || !password2 || !name) {
    res.status(422).json({ message: "Invalid input" });
    return;
  }

  if (!validEmail(email)) {
    res.status(422).json({ message: "Invalid email" });
    return;
  }
  if (!validPassword(password)) {
    res.status(422).json({ message: "Invalid password" });
    return;
  }
  if (password !== password2) {
    res.status(422).json({ message: "difrence password" });
    return;
  }

  let client;
  try {
    client = await connectToDb();
  } catch (error) {
    res.status(500).json({ message: "server propably dead" });
    return;
  }
  const db = client.db();

  let existingUser;
  try {
    existingUser = await db.collection("users").findOne({ email: email });
  } catch (error) {
    res.status(500).json({ message: "db fail" });
    client.close();
    return;
  }

  if (existingUser) {
    res.status(422).json({ message: "user exist" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  let result;
  try {
    result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
      name: name,
    });
  } catch (error) {
    res.status(500).json({ message: "nie udalo sie utworzyc usera" });
    client.close();
    return;
  }

  res.status(201).json({ message: "Created user" });
  client.close();
}

export default handler;
