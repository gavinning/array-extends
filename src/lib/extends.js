const is = require('./is')
const PowerArray = require('./powerful')

const extensions = module.exports = {

    toMap(args) {
        if (is.string(args)) {
            const map = {}
            const key = args
            this.map(item => {
                map[item[key]] = item
            })
            return map
        }
        if (is.array(args)) {
            const map = {}
            args.map((key, index) => {
                map[key] = this[index]
            })
            return map
        }
        return args
    },

    async asyncMap(fn) {
        const ret = []
        const length = this.length
        for (let i = 0; i < length; i++) {
            ret.push(await fn(this[i], i, this))
        }
        return ret
    },

    async asyncFind(fn) {
        const length = this.length
        for(let i = 0; i < length; i++){
            if (await fn(this[i], i, this)) {
                return this[i]
            }
        }
        return null
    },

    async asyncFilter(fn) {
        const arr = []
        const length = this.length
        for(let i=0; i<length; i++){
            let res = await fn(this[i], i, this)
            !res || arr.push(this[i])
        }
        return arr
    },

    async asyncSome(fn) {
        const map = await this.asyncMap(fn)
        return map.some(item => item === true)
    },

    async asyncEvery(fn) {
        const map = await this.asyncMap(fn)
        return map.every(item => item === true)
    },

    clone() {
        if (this.slice().powerful) {
            return this.slice().powerful()
        }
        return PowerArray(this.slice(), module.exports)
    },

    // this改变
    remove(val) {
        if (!val) {
            return this
        }
        if(typeof val === 'function'){
            let el = this.find(val)
            return this.remove(el)
        }
        let index = this.indexOf(val)
        index < 0 || this.splice(index,1)
        return this
    },

    // this不变
    removed() {
        const arr = this.clone()
        return arr.remove(...arguments)
    },

    unique() {
        return PowerArray(Array.from(new Set(this)), module.exports)
    },

    max(fn) {
        if (!fn || !is.function(fn)) {
            return Math.max.apply(Math, this)
        }

        let arr = this.clone()
        let top = arr.shift()

        while (arr.length > 0) {
            const b = arr.shift()
            fn(top, b) ? top : top = b
        }

        return top
    },

    sorted(fn = '>') {
        switch (fn) {
            case '>':
                fn = (a, b) => a > b
                break

            case '>=':
                fn = (a, b) => a >= b
                break

            case '<':
                fn = (a, b) => a < b
                break

            case '<=':
                fn = (a, b) => a <= b
                break

            default:
                break;
        }

        if (typeof fn != 'function') {
            fn = (a, b) => a < b
        }

        let ret = []
        let arr = this.clone()

        if (arr.length < 2) {
            return this
        }

        while (arr.length > 0) {
            let val = arr.max(fn)
            arr.remove(val)
            ret.push(val)
        }

        return ret
    }
}
