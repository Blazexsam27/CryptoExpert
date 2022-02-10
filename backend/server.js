const express = require("express");
const port = process.env.PORT || 3001;
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.json({ message: "Hello There This Port Is For Server" });
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

let firebaseAdmin = require("firebase-admin");
let serviceAccount = require("./cryptoexpert-key.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

let db = firebaseAdmin.firestore();
let cryptoCollection = db.collection("crypto");
let about_crypto = db.collection("about_crypto");

app.get("/cryptoList", async (request, response) => {
  let crypto = [];
  await cryptoCollection.get().then((querySnapshot) => {
    querySnapshot.docs.forEach((element) => {
      crypto.push(element.data());
    });
  });
  response.send(crypto);
});

app.get("/about_crypto", async (request, response) => {
  let id = request.query.id;
  let about;
  await about_crypto
    .doc(id)
    .get()
    .then((response) => {
      about = response.data();
    });
  response.send(about);
});
