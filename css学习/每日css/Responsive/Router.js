class Router{
    constructor(){
        //存放路由规则
        this.routes = [];
        //注册fetch事件拦截
        this.initProxy()
    }

    initProxy(){
        self.addEventListener('fetch',event=>{
            for(let route of this.routes){
                //使用封装好的match函数进行路由的匹配
                if(match(route.rule,event.request)){
                    //使用封装好的respond方法执行回调
                    respond(event,route.handler)
                    break
                }
            }
        })
    }

    registerRoute(rule,handler){
        this.routes.push({rule,handler})
    }
}

const router = new Router();

router.registerRoute('/data.txt',()=>new Response('Hello World!'));