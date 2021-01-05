function testSlice(){
    console.log(arguments)
    let array = Array.prototype.slice.call(arguments,1)
    console.log(array)
}

testSlice('a','b','c')

var arr1 = [1,2,3]
var arr2 = [2,3,4]

console.log(arr1.concat(arr2))