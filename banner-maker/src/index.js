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
    console.log("URL страницы: " + req.url);
    const path=req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    console.log("path страницы: " + path);
    switch (path){
        case "":
            serveStaticFile(res,'/index.html',"text/html");
            break;
        case "/renderer.js":
            serveStaticFile(res,'/renderer.js',"application/javascript");
            break;
        case "/index.css":
            serveStaticFile(res,'/index.css',"text/css");
            break;
        default:
            serveStaticFile(res,'/404.html',"text/html",404);
            break;
    }
}).listen(3999);

console.log("Сервер запущен на 3999. Чтобы закрыть (ctrl+c)");