let executeCount = 0;
const targetFn = async nums => {
  executeCount++;
  return nums.map(num => 2 * num + 1);
};

const batcher = (fn) => {
  let queue = []; // 任务队列
  let isProcessing = false; // 是否正在处理中

  return (nums) => {
    return new Promise((resolve) => {
      queue.push({
        nums,
        resolve,
      });

      // 如果当前不在处理中，则执行任务队列中的任务
      if (!isProcessing) {
        isProcessing = true;
        setTimeout(async () => {
          const numsList = queue.map((task) => task.nums);
          const results = await fn(numsList.flat());
          queue.forEach((task, index) => {
            const { nums, resolve } = task;
            const startIndex = index * nums.length;
            const endIndex = startIndex + nums.length;
            const result = results.slice(startIndex, endIndex);
            resolve(result);
          });
          queue = [];
          isProcessing = false;
        }, 0);
      }
    });
  };
};
const batchedFn = batcher(targetFn);

const main = async () => {
  const [result1, result2, result3] = await Promise.all([
    batchedFn([1, 2, 3]),
    batchedFn([4, 5]),
    batchedFn([6, 7]),
  ]);
  
  console.log(result1, result2, result3) 
  console.log(executeCount)  // 预期为 1
}

main()