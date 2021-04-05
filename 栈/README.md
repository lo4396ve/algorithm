# 栈
## 1、概念
堆栈（英语：stack）又称为栈或堆叠，是计算机科学中的一种抽象资料类型，只允许在有序的线性资料集合的一端（称为堆栈顶端，英语：top）进行加入数据（英语：push）和移除数据（英语：pop）的运算。因而按照后进先出（LIFO, Last In First Out）的原理运作。

栈的使用场景非常多，比如浏览器历史记录就是个页面栈，每次跳转新地址就会把跳转的地址压入栈，返回就是弹出栈。还有一些软件的撤销恢复功能也是用栈实现的。

## 2、实现栈
### 2.1 定义栈类
```
function Stack() {
    var items = [];  // 使用数组存储数据
};
```
### 2.2 方法扩展
* push 添加一个元素到栈顶（向桶里放入一个羽毛球）
* pop 弹出栈顶元素（从桶里拿出一个羽毛球）
* top 返回栈顶元素，注意，不是弹出（看一眼桶里最顶端的羽毛球，但是不拿）
* isEmpty 判断栈是否为空（看看羽毛球是不是都用完了）
* size 返回栈里元素的个数（数一下桶里还有多少羽毛球）
* clear 清空栈（把桶里的羽毛球都倒出来扔掉）

```
function Stack() {
    var items = [];  // 使用数组存储数据

    // push方法向栈里压入一个元素
    this.push = function(item){
        items.push(item);
    };

    // pop方法把栈顶的元素弹出
    this.pop = function(){
        return items.pop();
    };

    // top 方法返回栈顶元素
    this.top = function(){
        return items[items.length - 1];
    };

    // isEmpty返回栈是否为空
    this.isEmpty = function(){
        return items.length == 0;
    };

    // size方法返回栈的大小
    this.size = function(){
        return items.length;
    };

    // clear 清空栈
    this.clear = function(){
        items = []
    }
}
```

## 3、算法题
### 3.1 校验括号的合法性
题目：给定一个字符串如a(b(cd))e,判断括号的合法性。

思路：
要判断是否合法，就要判断左括号和右括号是否成对出现，必须先出现左括号，每次出现一个右括号必须要有一个左括号与之对应。从栈的角度去解决这个问题：
1. 首先遍历字符串
2. 每次遇到左括号就把压入栈
3. 每次遇到右括号，判断栈内是否存为空，如果为空则不合法，如果不为空栈顶的左括号就是与之对应的右括号，把栈顶的元素出栈
4. 结束循环如果栈是空的说明是合法的，否则不合法

```
function checkBrackets(string) {
    var stack = new Stack();
    for(var i=0; i<string.length; i++ ){
        var item = string[i];
        if(item == "("){
            // 将左括号压入栈
            stack.push(item);
        }else if (item==")"){
            // 如果为空,就说明没有左括号与之抵消
            if(stack.isEmpty()){
                return false;
            }else{
                // 将栈顶的元素弹出
                stack.pop();
            }
        }

    }
    return stack.size() == 0;
}
checkBrackets("a(b)c"); // true
checkBrackets("a(b))"); // false
```

### 3.2 计算逆波兰表达式
计算逆波兰表达式是栈的一个非常经典的应用场景。
逆波兰表达式又叫做后缀表达式。逆波兰表示法是波兰逻辑学家J・卢卡西维兹(J・ Lukasiewicz)于1929年首先提出的一种表达式的表示方法 [1]  。后来,人们就把用这种表示法写出的表达式称作“逆波兰表达式”。逆波兰表达式把运算量写在前面,把算符写在后面。

逆波兰表达式是一种十分有用的表达式，它将复杂表达式转换为可以依靠简单的操作得到计算结果的表达式。例如(a+b)*(c+d)转换为ab+cd+*。

示例：
```
["4", "13", "5", "/", "+"] 等价于(4 + (13 / 5)) = 6
["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"] 等价于((10 * (6 / ((9 + 3) * -11))) + 17) + 5
```

运算方式:
1. 遍历表达式
2. 如果当前字符为变量或者为数字，则压栈
3. 如果是运算符，则将栈顶两个元素弹出作相应运算，结果再入栈，最后当表达式扫描完后，栈里的就是结果。

```
// 假设只考虑加减乘除四种运算符号
function calc_exp(exp){
    var stack = new Stack();
    for(var i = 0; i < exp.length;i++){
        var item = exp[i];

        if(["+", "-", "*", "/"].indexOf(item) >= 0){
            // 从栈顶弹出两个元素
            var value_1 = stack.pop();
            var value_2 = stack.pop();
            // 拼成表达式
            var exp_str = value_2 + item + value_1;
            // 计算并取整
            var res = parseInt(eval(exp_str));
            // 将计算结果压如栈
            stack.push(res.toString());
        }else{
            stack.push(item);
        }
    }
    // 最终栈里还有一个元素,且正是表达式的计算结果
    return stack.pop();
};
let  exp = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"];
console.log(calc_exp(exp));
```


### 3.3 两个栈实现一个队列
不熟悉队列的可以看完队列章节再看这个题

* enqueue方法，两个栈分别命名为stack_1,stack_2,面对这两个栈，只能选一个栈用来存储数据，假设选stack_1来存储数据。
* dequeue方法，队列的头，在stack_1的底部，栈是先进后出，目前取不到，可不还有stack_2么，把stack_1里的元素都倒入到stack_2中，这样，队列的头就变成了stack_2的栈顶，这样不就可以执行stack_2.pop()来删除了么。执行完pop后，需要把stack_2里的元素再倒回到stack_1么，不需要，现在队列的头正好是stack_2的栈顶，恰好可以操作，队列的dequeue方法借助栈的pop方法完成，队列的head方法借助栈的top方法完成。如果stack_2是空的，把stack_1里的元素都倒入到stack_2就可以了，这样，如果stack_1也是空的，说明队列就是空的，返回null就可以了。
enqueue始终都操作stack_1，dequeue和head方法始终都操作stack_2。

```
function StackQueue(){
    var stack_1 = new Stack();
    var stack_2 = new Stack();

    // 总是把数据放入到stack_1中
    this.enqueue = function(item){
        stack_1.push(item);
    };

    // 获得队列的头
    this.head = function(){
        // 两个栈都是空的
        if(stack_2.isEmpty() && stack_1.isEmpty()){
            return null;
        }

        // 如果stack_2 是空的,那么stack_1一定不为空,把stack_1中的元素倒入stack_2
        if(stack_2.isEmpty()){
            while(!stack_1.isEmpty()){
                stack_2.push(stack_1.pop());
            }
        }
        return stack_2.top();
    };

    // 出队列
    this.dequeue = function(){
        // 两个栈都是空的
        if(stack_2.isEmpty() && stack_1.isEmpty()){
            return null;
        }

        // 如果stack_2 是空的,那么stack_1一定不为空,把stack_1中的元素倒入stack_2
        if(stack_2.isEmpty()){
            while(!stack_1.isEmpty()){
                stack_2.push(stack_1.pop());
            }
        }
        return stack_2.pop();
    };

};


var sq = new StackQueue();
sq.enqueue(1);
sq.enqueue(4);
sq.enqueue(8);
console.log(sq.head());
sq.dequeue();
sq.enqueue(9);
console.log(sq.head());
sq.dequeue();
console.log(sq.head());
console.log(sq.dequeue());
console.log(sq.dequeue());
```
