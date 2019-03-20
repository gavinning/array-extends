const assert = require('assert')
const ArrayExtends = require('../src/app')

describe('ArrayExtends test', () => {

    ArrayExtends.ArrayExtends()

    async function double(item) {
        return item * 2
    }

    it('test powerful array:: asyncMap', async() => {
        const arr = [1, 2, 3]
        const ret = await arr.asyncMap(async(item) => {
            return await double(item)
        })
        assert.deepEqual([2,4,6], ret)
    })
})
