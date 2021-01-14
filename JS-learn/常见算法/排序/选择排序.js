/**
 * 时间复杂度为o(n²)
 * @param {number[]} list 
 * @return {number[]}
 */

function selectSort(list){
    list = [...list] //不对原数组进行操作
    const newList = [] 
    while(list.length){
        let min = Infinity 
        let minIndex
        list.forEach((el,index) => {
            if(el < min){
                min = el;
                minIndex = index
            }
        })
        newList.push(list[minIndex])
        list.splice(minIndex,1)
    }
    return newList
}

