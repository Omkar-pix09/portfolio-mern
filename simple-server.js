const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/home") {
        res.end("<h1>My Portfolio - Home</h1>");
    }
    else if (req.url === "/about") {
        res.end("<h1>My Portfolio - About</h1>");
    }
    else {
        res.end("<h1>404 Page Not Found</h1>");
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});