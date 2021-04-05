# 队列
## 1、概念
队列，又称为伫列（queue），计算机科学中的一种抽象资料型别，是先进先出（FIFO, First-In-First-Out）的线性表。在具体应用中通常用链表或者数组来实现。队列只允许在后端（称为rear）进行插入操作，在前端（称为front）进行删除操作。


比如浏览器消息队列就是一个队列结构。

## 2、实现队列
### 2.1 定义队列类
```
function Queue(){
    var items = [];   // 利用数组存储数据
};
```
### 2.2 方法扩展

* enqueue 从队列尾部添加一个元素（新来一个排队的人，文明礼貌，站在了队伍末尾）
* dequeue 从队列头部删除一个元素（排队伍最前面的人刚办理完登机手续，离开了队伍）
* head 返回头部的元素，注意，不是删除（只是看一下，谁排在最前面）
* size 返回队列大小（数一数有多少人在排队）
* clear 清空队列（航班取消，大家都散了吧）
* isEmpty 判断队列是否为空 （看看是不是有人在排队）
* tail 返回队列尾节点

```
function Queue(){
    var items = [];   // 存储数据

    // 向队列尾部添加一个元素
    this.enqueue = function(item){
        items.push(item);
    };

    // 移除队列头部的元素
    this.dequeue = function(){
        return items.shift();
    };

    // 返回队列头部的元素
    this.head = function(){
        return items[0];
    }

    // 返回队列大小
    this.size = function(){
        return items.length;
    }

    // clear
    this.clear = function(){
        items = [];
    }

    // isEmpty 判断是否为空队列
    this.isEmpty = function(){
        return items.length == 0;
    }
};
```

## 3、算法题
### 3.1 约瑟夫环
题目：有一个数组a,长度为n存放1,2,3...n;要求每隔两个数删掉一个数，到末尾时循环至开头继续进行，求最后一个被删掉的数。

思路：
1. 先把数组所有的元素放到队列
2. 遍历队列，变量index代表索引
3. 如果index%3 == 0,就说明这个元素是需要删除的元素，如果不等于0，就不是需要被删除的元素，则把它移动到队列的尾部

```
function del_ring(arr_list){
    // 把数组里的元素都放入到队列中
    var queue = new Queue();
    for(var i=0;i< arr_list.length;i++){
        queue.enqueue(arr_list[i]);
    }

    var index = 0;
    while(queue.size() != 1){
        // 弹出一个元素,判断是否需要删除
        var item = queue.dequeue();
        index += 1;
        // 每隔两个就要删除掉一个,那么不是被删除的元素就放回到队列尾部
        if(index %3 != 0){
            queue.enqueue(item);
        }
    }

    return queue.head();
};
console.log(del_ring([1,2,3,4,5,6,7,8,9,10]));
```

### 3.2 斐波那契数列
斐波那契数列由0和1开始，之后的斐波那契数就是由之前的两数相加而得出，即f(n) = f(n-1)+f(n-2);其中n>=2特别指出：0不是第一项，而是第零项。
要求计算出斐波那契数列中第n个元素的值。

思路：
计算斐波那契最常见的是利用递归，不过使用队列一样可以处理。
1. 先将两个1 添加到队列中，然后开始循环，用index计数，循环终止的条件是index >= n -2;
2. 使用dequeue方法从队列头部删除一个元素，该元素为del_item
3. 使用head方法获得队列头部的元素，该元素为 head_item
4. next_item = del_item + head_item,将next_item放入队列
5. 循环结束队列里面有两个元素，先用dequeue 删除头部元素，剩下的那个元素就是想要的结果
  
```
function fibonacci(n){
    queue = new Queue();
    var index = 0;
    // 先放入斐波那契序列的前两个数值
    queue.enqueue(1);
    queue.enqueue(1);
    while(index < n-2){
        // 出队列一个元素
        var del_item = queue.dequeue();
        // 取队列头部元素
        var head_item = queue.head();
        var next_item = del_item + head_item;
        // 将计算结果放入队列
        queue.enqueue(next_item);
        index += 1;
    }

    queue.dequeue();
    return queue.head();
};

console.log(fibonacci(8));
```

### 3.3 两个队列实现一个栈
根据特性，队列先进先出而栈后进后出。关键时候pop方法，要想获取最后存放的数据，就要想办法把队列末尾的元素取出来，办法只有一个，就是挨个删除队列中的所有元素，获取最后删除的元素就是想要的结果。前面的元素也不能都丢弃，每次删除一个元素判断如果不是最后一个就放到另一个队列。
整个思路就是准备两个队列，一个用来存放数据，一个用来倒腾数据，每次pop完之后，之前空队列现在变成有数据的，之前有数据的变成空的。

* 实现push方法时每次把数据存入不是空的队列中；
* 实现pop方法每次要倒腾数据

在具体的实现中，额外定义两个变量，data_queue和empty_queue，data_queue始终指向那个不为空的队列，empty_queue始终指向那个为空的队列。
```
function QueueStack(){
    var queue_1 = new Queue();
    var queue_2 = new Queue();
    var data_queue = null;      // 放数据的队列
    var empty_queue = null;     // 空队列,备份使用

    // 确认哪个队列放数据,哪个队列做备份空队列
    var init_queue = function(){
        // 都为空,默认返回queue_1
        if(queue_1.isEmpty() && queue_2.isEmpty()){
            data_queue = queue_1;
            empty_queue = queue_2;
        }else if(queue_1.isEmpty()){
            data_queue = queue_2;
            empty_queue = queue_1;
        }else{
            data_queue = queue_1;
            empty_queue = queue_2;
        }
    };


    // push方法
    this.push = function (item) {
        init_queue();
        data_queue.enqueue(item);
    };

    // top方法
    this.top = function(){
        init_queue();
        return data_queue.tail();
    }

    /**
     * pop方法要弹出栈顶元素,这个栈顶元素,其实就是queue的队尾元素
     * 但是队尾元素是不能删除的,我们可以把data_queue里的元素(除了队尾元素)都移除放入到empty_queue中
     * 最后移除data_queue的队尾元素并返回
     * data_queue 和 empty_queue 交换了身份
     */
    this.pop = function(){
        init_queue();
        while(data_queue.size()>1){
            empty_queue.enqueue(data_queue.dequeue());
        }
        return data_queue.dequeue();
    };
};


var q_stack = new QueueStack();
q_stack.push(1);
q_stack.push(2);
q_stack.push(4);
console.log(q_stack.top());   // 栈顶是 4
console.log(q_stack.pop());   // 移除 4
console.log(q_stack.top());   // 栈顶变成 2
console.log(q_stack.pop());   // 移除 2
console.log(q_stack.pop());   // 移除 2
```


