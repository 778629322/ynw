> 30 Seconds of Code

# Array

### pipeAsync

> 依次调用数组中的(同步或异步)函数

```js
const sum = pipeAsync(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
);
(async () => {
  console.log(await sum(5)); // 15 (after one second)
})();
```

### bifurcateBy

> 根据函数返回的布尔值对函数进行分组

```js
bifurcateBy(["beep", "boop", "foo", "bar"], x => x[0] === "b");
// [ ['beep', 'boop', 'bar'], ['foo'] ]
```

### chunk

> 将数组进行分组

```js
chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]
```

### countBy

> 统计

```js
countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
```

### deepFlatten

> 递归展开数组

```js
deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
```

### difference

> 两个数组中的非交叉元素

```js
difference([1, 2, 3], [1, 2, 4]); // [3]
```
