// const path = require("path");
// const http = require("http");
const fs = require("fs").promises;

const indexHTML = path.resolve("index.html");

const PORT = 8080;

const requestHandler = async (request, response) => {
  const data = await fs.readFile(indexHTML, "utf8");

  response.writeHead(200, { "Conttent-Type": "text/html" });
  return response.end(data);
};

const server = http.createServer(requestHandler);

server.listen(PORT, (err, data) => {
  if (err) {
    console.error(err);
  }

  console.log(`Server works on port ${PORT}`);
});
// =============================================
// async function noName() {
//   const data = await fs.readFile("index.html", "utf8");
//   console.log("noName ~ data", data);
// }

// noName();
