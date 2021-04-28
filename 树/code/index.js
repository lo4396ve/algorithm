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

function TreeNode(data) {
  this.data = data;
  this.leftChild = null;    // 左孩子
  this.rightChild = null;   // 右孩子
  this.parentNode = null;   // 父节点
}

function Tree() {
  var root = null;   // 根节点
  this.getRoot = function() {
    return root;
  }
  this.init_tree = function(string) {
    let stack = new Stack();
    let new_node = null;  // 记录每次遇到字母创建的节点
    let k = 0;  // k初始值设为0，k=1代表左子节点，k=2代表右子节点
    for(let i = 0; i < string.length; i++) {
      let item = string[i];
      if(item == '(') {
        stack.push(new_node);
        k = 1;
      }
      else if(item == ',') {
        k = 2;
      } else if(item == ')') {
        stack.pop();
      } else {
        // 遇到字母
        new_node = new TreeNode(item);
        if(!root) {
          // 如果跟节点不存在 说明是第一个字母
          root = new_node;
        }
        if(k == 1) {
          // 左子节点
          father = stack.top(); // 栈顶一定是该子节点的父节点
          father.leftChild = new_node;
          new_node.parentNode = father;
        } 
        else if (k == 2) {
          // 右子节点
          father = stack.top(); // 栈顶一定是该子节点的父节点
          father.rightChild = new_node;
          new_node.parentNode = father;
        }
      }
    }
  }
  // 前序遍历
  this.pre_order = function(node){
    if(node==null){
        return;
    }
    console.log(node.data);
    this.pre_order(node.leftChild);
    this.pre_order(node.rightChild);
  }
  // 中序遍历
  this.in_order = function(node){
    if(node==null){
        return;
    }
    this.in_order(node.leftChild);
    console.log(node.data);
    this.in_order(node.rightChild);
  }

  // 后序遍历
  this.post_order = function(node){
    if(node==null){
        return;
    }
    this.post_order(node.leftChild);
    this.post_order(node.rightChild);
    console.log(node.data);
  }

  // 层序遍历
  this.layer_order = function(node) {
    if(!node) return;
    let queue = new Queue();
    queue.enqueue(node);
    while(!queue.isEmpty()) {
      let curNode = queue.dequeue();
      console.log(curNode.data);
      if(curNode.leftChild) {
        queue.enqueue(curNode.leftChild);
      }
      if(curNode.rightChild) {
        queue.enqueue(curNode.rightChild);
      }
    }
  }
  // 按层打印树
  this.layer_print = function(node) {
    if(!node) return;
    let queue = new Queue();
    queue.enqueue(node);
    while(!queue.isEmpty()) {
      let size = queue.size();
      let arr = [];
      for(let i = 0; i < size; i++) {
        let curNode = queue.dequeue();
        if(curNode.leftChild) {
          queue.enqueue(curNode.leftChild)
        }
        if(curNode.rightChild) {
          queue.enqueue(curNode.rightChild)
        }
        arr.push(curNode.data)
      }
      console.log(arr.join(' '))
    }
  }
  // 递归计算节点数量
  function node_count(node) {
    if(!node) {return 0;}
    let leftChildCount = node_count(node.leftChild);
    let rightChildCount = node_count(node.rightChild);
    return leftChildCount + rightChildCount + 1;
  }
  this.size = function() {
    return node_count(root);
  }

  // 递归计算树的高度
  function tree_height(node) {
    if(!node) {return 0;}
    let leftChildHeight = tree_height(node.leftChild);
    let rightChildHeight = tree_height(node.rightChild);
    return Math.max(leftChildHeight, rightChildHeight) + 1;
  }
  this.height = function() {
    return tree_height(root);
  }

  // 查找节点
  function find_node(node, data) {
    if(!node) {
      return null;
    }
    if(node.data == data) {
      return node;
    }
    let left = find_node(node.leftChild, data);
    if(left) {return left}
    let right = find_node(node.rightChild, data);
    if(right) {return right}
  }
  this.find = function(data) {
    return find_node(root, data);
  }
}

function mirror(node) {
  if(!node) return;

  let left = mirror(node.leftChild);
  let right = mirror(node.rightChild);
  node.leftChild = right;
  node.rightChild = left;
  return node;
}

// 判断子树
function sub(nodeA, nodeB) {
  // debugger;
  if(!nodeA) return false;
  if(nodeA.data == nodeB.data) {
    return rec(nodeA, nodeB);
  }
  let leftResult = sub(nodeA.leftChild, nodeB);
  let rightResult = sub(nodeA.rightChild, nodeB);
  return leftResult || rightResult;
}
function rec(nodeA, nodeB) {
  debugger;
  // 如果B树遍历结束 说明在A树中找到了与B完全一样的子树 返回true
  if(!nodeB) {
    return true;
  }
  if(!nodeA && nodeB) {
    return false;
  }
  
  if(nodeA.data != nodeB.data) {
    return false;
  }
  
  let leftResult = rec(nodeA.leftChild, nodeB.leftChild);
  let rightResult = rec(nodeA.rightChild, nodeB.rightChild);
  return leftResult && rightResult;
}

// 判断对称树
function isSymmetric(root) {
  if(!root) return true;
  return symmetric(root.leftChild, root.rightChild);
}
function symmetric(node_1, node_2) {
  if (node_1 && node_2 && node_1.data != node_2.data) {
    return false;
  }
  if(node_1 && !node_2) {
    return false;
  }
  if(!node_1 && node_2) {
    return false;
  }
  if(!node_1 && !node_2) {
    return true;
  }

  let leftResult = symmetric(node_1.leftChild, node_2.rightChild);
  let rightResult = symmetric(node_1.rightChild, node_2.leftChild);
  return leftResult && rightResult;
}

function pre_order_iter(node) {
  let stack = new Stack();
  let cur_node = node;
  while(cur_node) {
    console.log(cur_node.data);
    if(cur_node.rightChild) {
      stack.push(cur_node.rightChild);
    }
    if(cur_node.leftChild) {
      cur_node = cur_node.leftChild;
    } else {
      if(!stack.isEmpty()) {
        cur_node = stack.pop();
      } else {
        cur_node = null;
      }
    }
  }
}
function in_order_iter1(node) {
  const stack = new Stack();
  let cur_node = node;
  while(true) {
    while(cur_node) {
      stack.push(cur_node);
      cur_node = cur_node.leftChild;
    }
    
    cur_node = stack.pop();
    console.log(cur_node.data);
    cur_node = cur_node.rightChild;
    if(stack.isEmpty() && !cur_node) {
      break;
    }
  }
}
function in_order_iter2(node) {
  const stack = new Stack();
  let cur_node = node;
  stack.push(cur_node);
  let t = stack.top();
  let size = stack.size();
  while(!stack.isEmpty()) {
    while(stack.top() && cur_node) {
      stack.push(cur_node.leftChild);
      cur_node = cur_node.leftChild;
    }
    let pop = stack.pop();
    if(!stack.isEmpty()) {
      cur_node = stack.pop();
      console.log(cur_node.data);
      stack.push(cur_node.rightChild);
      cur_node = cur_node.rightChild;
    }
  }
}
function in_order_iter3(node) {
  const stack = new Stack();
  let cur_node = node;
  // stack.push(node);
  while(cur_node || !stack.isEmpty()) {
    let size = stack.size();
    let top = stack.top();
    // debugger;
    if(cur_node) {
      stack.push(cur_node);
      cur_node = cur_node.leftChild;
    } else {
      cur_node = stack.pop();
      console.log(cur_node.data);
      // console.log(cur_node.data);
      cur_node = cur_node.rightChild;
    }
  }
}
var Tag = function(node, state){
  this.node = node;
  this.state = state;    // 0表示左边已经遍历结束,1表示右边已经遍历结束
};
function post_order_iter(node){
  var stack = new Stack();
  var curr_node = node;
  while(true){
      while(curr_node){
          var tag = new Tag(curr_node, 0);
          stack.push(tag);
          curr_node = curr_node.leftChild;
      }

      var pop_item = stack.pop();
      if(pop_item.node.rightChild && pop_item.state==0){
          pop_item.state = 1;
          stack.push(pop_item);
          curr_node = pop_item.node.rightChild;
      }else{
          console.log(pop_item.node.data);
      }
      if(!curr_node && stack.isEmpty()){
          break;
      }
  }
};

function lowest_common_ancestor(node, target1, target2) {
  if(!node) {
    return null;
  }
  if(node.data == target1.data || node.data == target2.data) {
    return node;
  }
  let leftResult = lowest_common_ancestor(node.leftChild, target1, target2);
  let rightResult = lowest_common_ancestor(node.rightChild, target1, target2);
  if(leftResult && rightResult) {
    console.log(node.data)
    return;
  }
  if(leftResult) {
    return leftResult
  }
  if(rightResult) {
    return rightResult
  }
}
// function fn2(node, target1, target2) {

//   if(!node) {
//     return null;
//   }
//   if(node.data == target1.data || node.data == target2.data) {
//     return node;
//   }

//   let leftResult = fn2(node.leftChild, target1, target2);
//   let rightResult = fn2(node.rightChild, target1, target2);

//   if(!leftResult || !rightResult) {
//     console.log('target 不存在');
//     return;
//   } else {
//     if(leftResult == rightResult) {
//       console.log(leftResult.data);
//     } else {
//       fn()
//     }
//   }  
// }

// let tree = new Tree();
// tree.init_tree("A(B(D,E(G)),C(F))");
// let root = tree.getRoot();
// in_order(root);
// layer_order(root);
// console.log(tree.find("E"))
// tree.layer_print(root);
// mirror(root);
// tree.layer_print(root)

// let treeA = new Tree();
// treeA.init_tree("A(B(D,E),C(F))");
// let treeB = new Tree();
// treeB.init_tree("B(D,E)");
// console.log(sub(treeA.getRoot(), treeB.getRoot()));

let tree = new Tree();
// tree.init_tree("A(B(C(E,F),D(F,E)),B(D(E,F),C(E,F)))");
tree.init_tree("A(B(D,E(G)),C(,F))");
let root = tree.getRoot();
// console.log(isSymmetric(root));
fn(root, tree.find("D"), tree.find("G"));


