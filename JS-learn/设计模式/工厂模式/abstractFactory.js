class MobilePhoneFactory{
    createOS(){
        throw new Error('抽象工厂方法不允许直接调用')
    }
    createHardWare(){
        throw new Error('抽象工厂方法不允许直接调用')
    }
}

class OS{
    controlHardWare(){
        throw new Error('抽象产品方法不允许直接调用')
    }
}

class AndroidOS extends OS{
    controlHardWare(){
        console.log('使用Android方法去操作硬件')
    }
}

class AppleOS extends OS{
    controlHardWare(){
        console.log('使用IPhone的方法操作')
    }
}

class HardWare {
    // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
    operateByOrder() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
    operateByOrder() {
        console.log('我会用高通的方式去运转')
    }
}

class FakeStarFactory extends MobilePhoneFactory{
    createOS() {
        return new AndroidOS()
    }
    createHardWare(){
        return new QualcommHardWare()
    }
}