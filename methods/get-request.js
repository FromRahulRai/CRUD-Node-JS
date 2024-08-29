module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];
 
  
  
    if (req.url === "/api/persons") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(req.persons));
      res.end();
    }

    else if (baseUrl === "/api/persons/") {
        console.log(id)
        res.setHeader("Content-Type", "application/json");
      let filteredPerson = req.persons.filter((person) => {
        return person.id === id;
      });
  
      if (filteredPerson.length > 0) {
        res.statusCode = 200;
        res.write(JSON.stringify(filteredPerson));
        res.end();
      } else {
        res.statusCode = 404;
        res.write(
          JSON.stringify({ title: "Not Found", message: "Person not found" })
        );
        res.end();
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
  };