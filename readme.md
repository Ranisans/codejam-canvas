# CodeJam Canvas

## This is home task project from [Rolling Scopes School](https://rs.school)

### How to start this project

1. Visual Studio Code
   1. Install extension `Live Server`
   2. Right click on `index.html` chen change `Open with Live Server`
   3. File opened in default browser or open link http://127.0.0.1:5500/index.html
2. Python:
   1. Go to [python.org](https://www.python.org/)
   2. Download Python 3
   3. Install
   4. In this project path open terminal
   5. Run `python -m http.server`
   6. Go to `localhost: 8000`
3. NodeJs:

   1. Go to [nodejs.org](https://nodejs.org/)
   2. Download Node.js
   3. Install
   4. Create file `server.js` with content:

   ```
     var http = require('http');
     var fs = require('fs');
     const PORT=8080;
     fs.readFile('./index.html', function (err, html) {

         if (err) throw err;

         http.createServer(function(request, response) {
             response.writeHeader(200, {"Content-Type": "text/html"});
             response.write(html);
             response.end();
         }).listen(PORT);
     });

   ```

   5. In this project path open terminal
   6. run `node server.js`
   7. Go to http://localhost:8080
