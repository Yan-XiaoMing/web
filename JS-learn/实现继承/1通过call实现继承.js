function Parent1(){
    this.name = 'parent1'
}

function Child1(){
    Parent1.call(this)
    this.type = 'child1'
}

console.log(new Child1)

function Parent2(){
    this.name = 'parent2'
    this.arr = [1,2,3]
}

function Child2(){
    this.type = 'child2' 
}

Child2.prototype = new Parent2()

console.log(new Child2())

function Parent3(){
    this.name = 'parent3'
    this.arr = [1,2,3]
}
function Child3(){
    Parent3.call(this)
    this.type = 'child3'
}
Child3.prototype = new Parent3()
var s3 = new Child3()
var s4 = new Child3()
s3.arr.push(4)
console.log(s3.arr,s4.arr)

function Parent4(){
    this.name = 'parent4'
    this.arr = [1,2,3]
}
function Child4(){
    Parent4.call(this)
    this.type = 'child4'
}
Child4.prototype = Parent4.prototype
var s3 = new Child4()
var s4 = new Child4()
s3.arr.push(4)
console.log(s3,s4)

function Parent5(){
    this.name = 'parent5'
    this.arr = [1,2,3]
}
function Child5(){
    Parent5.call(this)
    this.type = 'child5'
}
Child5.prototype = Object.create(Parent5.prototype)
Child5.prototype.constructor = Child5
var s5 = new Child5()
var s6 = new Child5()
s5.arr.push(4)
console.log(s5,s6)