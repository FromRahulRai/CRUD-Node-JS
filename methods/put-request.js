const requestBodyparser = require("../utils/body-parser");
const writeToFile = require("../utils/write-to-file");
module.exports = async (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
 

   if (baseUrl === "/api/persons/") {
    try {
      let body = await requestBodyparser(req);
      const index = req.persons.findIndex((person) => {
        return person.id === id;
      });
      if (index === -1) {
        res.statusCode = 404;
        res.write(
          JSON.stringify({ title: "Not Found", message: "Person not found" })
        );
        res.end();
      } else {
        req.persons[index] = { id, ...body };
        writeToFile(req.persons);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.persons[index]));
      }
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request body is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};