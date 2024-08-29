const writeToFile = require("../utils/write-to-file");
module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  

   if (baseUrl === "/api/persons/") {
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
      req.persons.splice(index, 1);
      writeToFile(req.persons);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.persons));
    }
  } 
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};