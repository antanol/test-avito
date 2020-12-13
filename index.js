const http=require("http"), //модуль http
        fs=require("fs"); //модуль файловой системы

// Имена параметров запроса(Requrst) и ответа(Response) принято сокращать до req и res соответственно
function serveStaticFile(res, path, contentType, responseCode){
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname+path,function(err,data){
        if (err) {
            res.writeHead(500,{'Content-Type': 'text/plain'});
            res.end("500 - Internal error");
        }else{
            res.writeHead(responseCode, {"Content-Type": contentType});
            res.end(data);
        }
    });
}

// Имена параметров запроса(Requrst) и ответа(Response) принято сокращать до req и res соответственно
http.createServer(function(req,res){
    const path=req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch (path){
        case "":
            serveStaticFile(res,'/src/index.html',"text/html");
            break;
        case "/dist/bundle.js":
            serveStaticFile(res,'/src/dist/bundle.js',"application/javascript");
            break;
        case "/styles/index.css":
            serveStaticFile(res,'/src/styles/index.css',"text/css");
            break;
        default:
            serveStaticFile(res,'/src/404.html',"text/html",404);
            break;
    }
}).listen(3999);

console.log("Сервер запущен на 3999. Чтобы закрыть (ctrl+c)");