import express from "express";
import "dotenv/config";

const app = express();
const PORT = 8080;

//console.log(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(PORT, () => {
  console.log(`Server connected at port http://localhost:${PORT}`);
});
