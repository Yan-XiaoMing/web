export function getRandomNumber(n) {  
    var arr = new Array(n); //用于存放随机数
    var randomNumber = ''; //存放随机数
    for (let i = 0; i < arr.length; i++)  
        arr[i] = parseInt(Math.random() * 10);  
    var flag = 0;  
    for (let i = 0; i < arr.length - 1; i++) {   
        for (let j = i + 1; j < arr.length; j++) {     
            if (arr[i] === arr[j]) {
                flag = 1;
                break;
            }   
        }   
        if (flag) break;  
    }  
    for (var i = 0; i < arr.length; i++) {   
        randomNumber += arr[i];  
    }  
    return randomNumber; 
}