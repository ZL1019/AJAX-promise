myButton.addEventListener('click', ()=>{
    window.jQuery.ajax(
      { method:'post',
        url:'/xxx',
        body:'第四部分',
        headers:{
          "qqq":"www",
          "aaa":"sss"}
      }
    ).then(
      (text)=>{console.log(text)},
      (request)=>{console.log(request)}
    )
})
window.$=window.jQuery
window.jQuery={ajax:null}
window.promise = function(fn){
  //...
  return{
    then:function(){}
  }
}

window.jQuery.ajax=function({url,method,body,headers}){ //ES8
  return new Promise(function(resolve,reject){ //返回promise对象
    let request = new XMLHttpRequest()
    request.open(method, url)
    request.setRequestHeader('Content-type','x-www-form-urlencoded')
  
    for(key in headers){
      request.setRequestHeader(key,headers[key])
    }
  
    request.send(body)
    request.onreadystatechange = ()=>{
      if(request.readyState === 4){
        if(request.status >= 200 && request.status < 300){
          resolve.call(undefined,request.responseText)
        }else if(request.status >= 400){
          reject.call(undefined,request)
        }
      }
    }
  })
    /*
  let url
  if(arguments.length===1){ //传一个参数
    url = options.url
  }else if (arguments,length ===2){ //传两个参数
    url = arguments[0]
    options=arguments[1]
  }
  */
  /*  ES6
  let {url,method,body,headers,successfn,failFn} =options
  //相当于下面六句
  */
  /*
  let url = options.url
  let method = options.method
  let body = options.body
  let headers=options.headers
  let successFn = options.successFn
  let failFn = options.failFn
  */
}
