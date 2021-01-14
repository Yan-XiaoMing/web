/**
 * 快速排序
 * o(nlogn)
 * 
 * 过程
 * 从数列中选择一个数作为基准
 * 分区过程: 比基准大的放右边 小于等于基准的放左边
 * 再在左右区间重复分区过程，直到各区间只有一个数
 */

let arr = [5,1,3,2]

var quickSort = function(arr){
    if(arr.length <=1 ){
        return arr
    }
    var pivotIndex = Math.floor(arr.length/2) //基准位置
    var pivot = arr.splice(pivotIndex,1)[0] //基准数
    var left = []
    var right = []
    for(let i = 0;i<arr.length;i++){
        if(arr[i] < pivot){
            left.push(arr[i])
        }
        else{
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pivot],quickSort(right))
}

console.log(quickSort(arr))