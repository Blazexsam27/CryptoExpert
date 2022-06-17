const express = require("express");
const port = 3001;
const app = express();
const cors = require("cors");
const { Pool, Client } = require("pg");

const credentials = {
  user: "blazexsam",
  host: "localhost",
  database: "blazexsam",
  password: "blaze",
  port: 5432,
};
let req_query = "SELECT * FROM crypto_currencies";
async function pool() {
  const newPool = new Pool(credentials);
  const now = await newPool.query("SELECT NOW()");
  await newPool.end();
  return now;
}

async function client(req_query) {
  const newClient = new Client(credentials);
  await newClient.connect();
  const now = await newClient.query(req_query);
  await newClient.end();
  return now;
}

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.json({
    message: "Hello There This Port Is For Node Server Of Crypto Expert",
  });
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

app.get("/cryptoList", async (request, response) => {
  let search_query = request.query.search_query;
  if (search_query != undefined && search_query.toString().length > 2) {
    req_query = `SELECT * FROM crypto_currencies WHERE name='${search_query
      .toString()
      .toLowerCase()}'`;
    const result = await client(req_query);
    response.send(result.rows);
  } else {
    req_query = "SELECT * FROM crypto_currencies";
    const result = await client(req_query);
    response.send(result.rows);
  }
});

app.get("/about_crypto", async (request, response) => {
  let symbol = request.query.symbol;
  if (symbol != undefined) {
    req_query = `SELECT * FROM crypto_currencies WHERE symbol='${symbol}'`;
    const result = await client(req_query);
    response.send(result.rows);
  } else response.send("<h1>SORRY NO DATA FOUND FOR RELATED QUERY!</h1>");
});
