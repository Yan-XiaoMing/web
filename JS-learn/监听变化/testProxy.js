const createProxy = data => {
    if (typeof data === 'object' && data.toString() === '[object Object]') {
        for (let k in data) {
            if (typeof data[k] === 'object') {
                defineObjectReactive(data, k, data[k])
            }
            else {
                defineBasicReactive(data, k, data[k])
            }
        }
    }
}

function defineObjectReactive(obj, key, value) {
    createProxy(value)
    obj[key] = new Proxy(value, {
        set(target, property, val, receiver) {
            if (property !== 'length') {
                console.log('Set %s to %o', property, val)
            }
            return Reflect.set(target, property, val, receiver)
        }
    })
}

function defineBasicReactive(obj, key, value) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: false,
        get() {
            return value
        },
        set(newValue) {
            if (value === newValue) {
                return
            }
            console.log(`发现 ${key} 属性 ${value} -> ${newValue}`)
            value = newValue
        }
    })
}

let data = {
    name: 'Jiang',
    userInfo: {
        gender: 0,
        movies: []
    },
    list: []
}
createProxy(data)