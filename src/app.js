const extensions = require('./lib/extends')
const PowerArray = require('./lib/powerful')

function ArrayExtends() {
    Array.prototype.powerful ||
    Object.defineProperty(Array.prototype, 'powerful', {
        value: function powerful() {
            return PowerArray(this, extensions)
        }
    })
    return ArrayExtends
}

Object.assign(ArrayExtends, {
    ArrayExtends() {
        PowerArray(Array.prototype, extensions)
    },

    powerful(array) {
        if (!array || !Array.isArray(array)) {
            array = []
        }
        return PowerArray(array, extensions)
    }
})

module.exports = ArrayExtends
