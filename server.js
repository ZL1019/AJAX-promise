var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)

  if(path === '/'){
    let string = fs.readFileSync('./index.html', 'utf8')//同步读取文件
    response.statusCode = 200 
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string) //给浏览器返回符合html格式的字符串
    response.end() //要有end 不然会一直等
  }else if(path==='/main.js'){ //没有点 ，因为http路径都是绝对路径
    let string = fs.readFileSync('./main.js', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path==='/xxx'){ 
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    //若要返回 xml 则搜索“xml mime type ” 结果为text/xml
    response.setHeader('Access-Control-Allow-Origin', 'http://frank.com:8001')
    //让frank.com:8001 突破同源策略，可以用AJAX get到 ，jack.com:8002 里面 
    response.write(`
    {
      "note":{
        "to": "小谷",
        "from": "方方",
        "heading": "打招呼",
        "content": "hi"
      }
    }
    `)//返回一个符合json语法的字符串，不是对象
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.write(`
    {
      "error":"yyyy"
    }
    `)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


