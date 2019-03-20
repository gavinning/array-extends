ArrayExtends
---
强化js原生数组

### Install
```sh
npm i array-extends --save
```

### Powerful
强化后数组将会拥有以下方法
```js
asyncMap
asyncFind
asyncFilter
asyncSome
asyncEvery

clone
remove
removed
unique
max
sorted
topMap
```

### Usage
```js
const ArrayExtends = require('array-extends')
```

**Example 1** 
```js
// 执行主函数会赋予数组原型链 powerful 函数
// Array.prototype.powerfull
// 后续所有原生数组实例皆可访问该方法进行强化
// 注意：该方式会修改数组原型链，在数组原型链添加 powerfull 方法
ArrayExtends()

// 获得强化数组
const arr = [1, 2, 3].powerful()
// 克隆一个强化数组，注意使用slice克隆后的结果非强化数组
const tmp = arr.clone()

async function double(item) {
    return item * 2
}

await tmp.asyncMap(async(item) => {
    return await double(item)
})
```

**Example 2**  
如果不想修改原生数组原型链，可以使用下面这种方法
```js
// 一样可以获得强化数组，不修改原型链的情况下
const arr = ArrayExtends.powerful([1, 2, 3])
// 克隆一个强化数组
const tmp = arr.clone()

async function double(item) {
    return item * 2
}

await tmp.asyncMap(async(item) => {
    return await double(item)
})
```

**Example 3** 
强化整个原生数组原型链的方法
```js
ArrayExtends.ArrayExtends()
```
<br />
<br />  

> npm test

<br />  
<br />  
