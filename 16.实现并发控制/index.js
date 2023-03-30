// 定义一个函数 controlConcurrency，它接收一个参数 limit 表示同时运行的最大请求数量
function controlConcurrency(limit) {
  // 定义一个变量 running，表示当前正在运行的请求数量，初始化为 0
  let running = 0;
  // 定义一个数组 queue，表示排队等待运行的请求，初始化为空数组
  const queue = [];

  // 定义一个内部函数 run，用于启动请求执行的函数
  function run() {
    // 如果同时运行的请求数量小于 limit 并且排队等待的请求数量大于 0
    if (running < limit && queue.length > 0) {
      // 从队列中获取第一个请求的函数
      const promiseFn = queue.shift();
      // 增加正在运行的请求数量
      running++;
      // 执行请求的函数，并在完成后更新正在运行的请求数量，并继续运行请求执行的函数
      promiseFn().finally(() => {
        running--;
        run();
      });
    }
  }

  // 返回一个函数，该函数接收一个请求数组 requests
  return function(requests) {
    // 定义一个数组 results，表示请求结果的数组
    const results = [];

    // 遍历请求数组 requests，为每个请求创建一个 promise 对象，并将其添加到 results 数组中
    requests.forEach((request) => {
      results.push(
        new Promise((resolve) => {
          // 将请求的执行函数封装为一个 promise 函数，并将其添加到队列中等待运行
          queue.push(() => request().then(resolve));
          // 启动请求执行的函数
          run();
        })
      );
    });

    // 返回一个 promise 对象，该对象在所有请求都完成后被解决，解决值为所有请求的结果数组
    return Promise.all(results);
  };
}
