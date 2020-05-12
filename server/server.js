const http = require("http");
http
  .createServer((request, response) => {
    console.log("request url", request.url);
    if (request.url.toLocaleLowerCase() === "/flightdetails") {
      response.writeHead(200, {
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
        "Access-Control-Allow-Origin": "*",
      });
      response.write("\n");
      setTimeout(() => {
        response.write('data: {"flight": "A123", "status": "Started"}');
        response.write("\n\n");
      }, 5000);
      setTimeout(() => {
        response.write('data: {"flight": "A123", "status": "Flying......."}');
        response.write("\n\n");
      }, 7000);
      setTimeout(() => {
        response.write('data: {"flight": "D654", "status": "Started"}');
        response.write("\n\n");
      }, 7000);

      setTimeout(() => {
        response.write('data: {"flight": "D654", "status": "Flying....."}');
        response.write("\n\n");
      }, 10000);

      setTimeout(() => {
        response.write('data: {"flight": "D654", "status": "Landed"}');
        response.write("\n\n");
      }, 15000);

      setTimeout(() => {
        response.write('data: {"flight": "A123", "status": "Landed"}');
        response.write("\n\n");
      }, 17000);
    } else {
      response.writeHead(404);
      response.end();
    }
  })
  .listen(1234, () => {
    console.log("Server listened to port : 1234");
  });
