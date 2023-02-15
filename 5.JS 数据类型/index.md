Q1: JS 中有哪些数据类型

A: JS 中有两种数据类型，基本数据类型与对象类型
其中基本数据类型有7种：
* string
* number
* boolean
* undefined
* null
* symbol
* bigint

Q2: JS 中如何做类型判断

A: 有 4 种方式
1. typeof。这种方式在判断 7 种基本类型中的 null 时会返回 "object", 在判断数组时会返回 "object", 在判断函数时会返回 "function"。typeof 并不能准确的判断出变量的类型
2. instanceof。通过原型链的方式判断对象类型返回布尔值。这种方式不能判断基本类型。并且这种方式并不是100%可信
3. Object.prototype.toString.call 
4. 另外一些特定的 API，比如 Array.isArray(), Number.isNumber() 等等

Q3: 数据类型比较规则

双等号 x == y
1. x 与 y 是否类型相同，如果相同则进行值比较
2. null == undefined。true
3. string == number，将 string 转 number，继续判断
4. boolean == any，将 boolean 转 number，继续判断 x, y 类型是否相同，如果不同重复上述
5. object == string ｜ number ｜ symbol，将 object 转基本类型，继续判断 x，y 类型是否相同，如果不同重复上述

