const http = require('http');
const fs = require('fs');

const pages = new Map();

pages.set("/", {path: "home.html", type: "text/html"});
pages.set("/about", {path: "about.html", type: "text/html"});
pages.set("/home", {path: "home.html", type: "text/html"});
pages.set("/portfolio", {path: "portfolio.html", type: "text/html"});
pages.set("/contact", {path: "contact.html", type: "text/html"});

pages.set("/style.css", {path: "style.css", type: "text/css"});

const server =  http.createServer((req, res) => {
    if(pages.has(req.url)){
        let reqObject = pages.get(req.url);

        res.setHeader("Content-Type", reqObject.type);
        res.statusCode = 200;

        res.write(fs.readFileSync(reqObject.path));
    }
    else if (req.url.match("^\/images\/[^\/]+\.jpg$")) {
        try {
            res.statusCode = 200;
            res.setHeader("Content-Type", "image/jpg");
            imgLoc = "." + req.url;
            console.log(imgLoc);
            image = fs.readFileSync(imgLoc);
            res.end(image);
        } catch {
            res.statusCode = 404;
            res.write("404");
            console.log(req.url);
        }
    } 
    else {
        res.statusCode = 404;
        res.write("404");
        console.log(req.url + "Not Found");
    }

    res.end();
});

server.listen(3000);