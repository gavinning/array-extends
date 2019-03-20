const assert = require('assert')
const ArrayExtends = require('../../src/app')()

describe('Powerful Array test', () => {
    const nums = [1, 2, 3].powerful()
    const person = ['alice', 29, 'alice@qq.com'].powerful()
    const people = [
        {id: 1, name: 'tom'},
        {id: 2, name: 'alice'},
        {id: 3, name: 'jack'},
    ].powerful()

    function sleep() {
        return new Promise((res, rej) => {
            setTimeout(res, 36)
        })
    }

    async function double(item) {
        return item * 2
    }

    async function equal(a, b) {
        return a === b
    }

    // powerful无效时 无clone方法
    it('test powerful', () => {
        const arr = nums.clone()
        assert.notEqual(arr, nums)
        assert.deepEqual(arr, nums)
    })

    // 第二种加强方法验证powerful是否有效
    it('test powerful', () => {
        const arr = ArrayExtends.powerful([1, 2, 3])
        const tmp = arr.clone()
        assert(tmp.clone)
        assert(tmp.powerful)
        assert.notEqual(arr, tmp)
        assert.deepEqual(arr, tmp)
        assert.notEqual(arr, nums)
        assert.deepEqual(arr, nums)
    })

    it('test clone', () => {
        const arr = nums
        const copy = nums.clone()
        assert.equal(arr, nums)
        assert.notEqual(copy, nums)
    })

    it('test toMap', () => {
        const arr = people.clone()
        const map = arr.toMap('name')
        assert.equal(map.tom.name, 'tom')
        assert.equal(map.jack.name, 'jack')
        assert.equal(map.alice.name, 'alice')
    })

    it('test toMap', () => {
        const arr = person.clone()
        const map = arr.toMap(['name', 'age', 'email'])
        assert.equal(map.name, arr[0])
        assert.equal(map.age, arr[1])
        assert.equal(map.email, arr[2])
    })

    it('test asyncMap', async() => {
        const arr = nums.clone()
        const ret = await arr.asyncMap(async(item) => {
            await sleep()
            return item * 2
        })
        assert.deepEqual([2,4,6], ret)
    })

    it('test asyncMap', async() => {
        const arr = nums.clone()
        const ret = await arr.asyncMap(async(item) => {
            await sleep()
            return await double(item)
        })
        assert.deepEqual([2,4,6], ret)
    })

    it('test asyncFind', async() => {
        const arr = people.clone()
        const alice = await arr.asyncFind(async(item) => {
            await sleep()
            return item.name === 'alice'
        })
        assert.equal(2, alice.id)
        assert.equal('alice', alice.name)

        const alice2 = arr.find(item => item.name === 'alice')
        assert.equal(alice, alice2)
    })

    it('test asyncFind', async() => {
        const arr = people.clone()
        const alice = await arr.asyncFind(async(item) => {
            await sleep()
            return await equal(item.name, 'alice')
        })
        assert.equal(2, alice.id)
        assert.equal('alice', alice.name)

        const alice2 = arr.find(item => item.name === 'alice')
        assert.equal(alice, alice2)
    })

    it('test asyncFilter', async() => {
        const arr = people.clone()
        const ret = await arr.asyncFilter(async(item) => {
            await sleep()
            return await equal(item.name, 'alice')
        })
        const alice = ret[0]
        assert.equal(2, alice.id)
        assert.equal('alice', alice.name)

        const ret2 = arr.filter(item => item.name === 'alice')
        assert.deepEqual(ret, ret2)
    })

    it('test asyncSome', async() => {
        const arr = people.clone()
        const ret = await arr.asyncSome(async(item) => {
            await sleep()
            return await equal(item.name, 'alice')
        })
        const res = arr.some(item => item.name === 'alice')
        assert.equal(res, ret)
    })

    it('test asyncEvery', async() => {
        const arr = people.clone()
        const ret = await arr.asyncEvery(async(item) => {
            await sleep()
            return item.id > 0
        })
        const res = arr.every(item => item.id > 0)
        assert.equal(res, ret)
    })

    it('test asyncEvery', async() => {
        const arr = people.clone()
        const ret = await arr.asyncEvery(async(item) => {
            await sleep()
            return item.id > 1
        })
        const res = arr.every(item => item.id > 1)
        assert.equal(res, ret)
    })

    it('test remove', () => {
        const arr = nums.clone()
        const ret = arr.clone().remove(2)
        assert.equal(2, ret.length)
        assert.equal(1, ret[0])
        assert.equal(3, ret[1])
    })

    it('test remove', () => {
        const arr = people.clone()
        const ret = arr.remove(item => item.name === 'alice')
        assert.equal(2, ret.length)
        assert.equal('tom', ret[0].name)
        assert.equal('jack', ret[1].name)

        assert.equal(arr, ret)
        assert.deepEqual(arr, ret)
    })

    it('test removed', () => {
        const arr = people.clone()
        const ret = arr.removed(item => item.name === 'alice')
        assert.equal(2, ret.length)
        assert.equal('tom', ret[0].name)
        assert.equal('jack', ret[1].name)

        assert.notEqual(arr, ret)
    })

    it('test unqiue', () => {
        const arr = nums.clone()
        const ret = [1,2,3,4,5,3,4,5,6].powerful().unique()

        assert.equal(6, ret.length)

        ret.remove(4).remove(5).remove(6)
        assert.deepEqual(arr, ret)
    })

    it('test max', () => {
        const arr = nums.clone()
        const top = arr.max()
        assert.equal(3, top)
    })

    it('test max', () => {
        const arr = people.clone()
        const max = arr.max((a, b) => a.id > b.id)
        const min = arr.max((a, b) => a.id < b.id)
        assert.equal('jack', max.name)
        assert.equal('tom', min.name)
    })

    it('test sorted', () => {
        const arr = nums.clone()
        const r1 = arr.sorted()
        const r2 = arr.sorted('>')
        const r3 = arr.sorted('<')

        assert.equal(1, arr[0])
        assert.equal(3, r1[0])
        assert.equal(3, r2[0])
        assert.equal(1, r3[0])

        assert.notEqual(arr, r1)
        assert.notEqual(arr, r2)
        assert.notEqual(arr, r3)
    })

    it('test sorted', () => {
        const arr = people.clone()
        const r1 = arr.sorted((a, b) => a.id > b.id)
        const r2 = arr.sorted((a, b) => a.id < b.id)

        assert.equal('tom', arr[0].name)
        assert.equal('jack', r1[0].name)
        assert.equal('tom', r2[0].name)
    })
})

