/**
 * First Paint（FP）
 *
 * 从开始加载到浏览器首次绘制像素到屏幕上的时间，
 * 也就是页面在屏幕上首次发生视觉变化的时间。
 * 但此变化可能是简单的背景色更新或不引人注意的内容，
 * 它并不表示页面内容完整性，
 * 可能会报告没有任何可见的内容被绘制的时间。
 */
function getFirstPaint(){
    let firstPaints = {}
    if(typeof performance.getEntriesByType === 'function'){
        let performanceEntries = performance.getEntriesByType('paint') || []
        performanceEntries.forEach((entry)=>{
          if(entry.name === 'first-paint'){
              firstPaints.firstPaints = entry.startTime
          }
          else if(entry.name === 'first-contentful-paint'){
              firstPaints.firstContentfulPaint = entry.startTime
          }
        })
    }else{
        if(chrome && chrome.loadTimes){
            let loadTimes = window.chrome.loadTimes()
            let {firstPaintTime,startLoadTime} = loadTimes
            firstPaints.firstPaint = (firstPaintTime - startLoadTime) * 1000
        }
        else if(performance.timing && typeof performance.timing.msFirstPaint === 'number'){// IE8+ 浏览器
            let {msFirstPaint, navigationStart} = performance.timing;
            firstPaints.firstPaint = msFirstPaint - navigationStart;
        }
    }
    return firstPaints
}