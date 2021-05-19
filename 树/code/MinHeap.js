// function MinHeap(size){
//   var heap = new Array(size);    // 数组
//   var curr_size = 0;             // 当前堆的大小
//   var max_size = size;           // 堆最大容量
  
//   // 从给定的分支节点开始往下调整
//   var shif_down = function(start, m){
//     // 从start这个位置开始,向下下滑调整
//     var parent_index = start;                       // start就是当前这个局部的父节点
//     var min_child_index = parent_index*2 + 1;       // 一定有左孩子,先让min_child_index等于左孩子的索引

//     while(min_child_index <= m){
//         // min_child_index+1 是左孩子的索引, 左孩子大于右孩子
//         if(min_child_index < m && heap[min_child_index] > heap[min_child_index+1]){
//             min_child_index = min_child_index+1;  // min_child_index永远指向值小的那个孩子
//         }

//         // 父节点的值小于等于两个孩子的最小值
//         if(heap[parent_index] <= heap[min_child_index]){
//             break;   // 循环结束,不需要再调整了
//         }else{
//             // 父节点和子节点的值互换
//             var tmp = heap[parent_index];
//             heap[parent_index] = heap[min_child_index];
//             heap[min_child_index] = tmp;
//             parent_index = min_child_index;
//             min_child_index = 2*min_child_index + 1;
//         }
//     }

// };

// // 传入一个数组,然后调整为最小堆
// this.init = function(arr){
//     max_size = arr.length;
//     curr_size = max_size;
//     heap = new Array(arr.length);
//     // 填充heap, 目前还不是一个堆
//     for(var i =0; i<curr_size;i++){
//         heap[i] = arr[i];
//     }

//     var curr_pos = Math.floor((curr_size-2)/2);      // 这是堆的最后一个分支节点
//     while(curr_pos >= 0){
//         shif_down(curr_pos, curr_size-1);            // 局部自上向下下滑调整
//         curr_pos -= 1;                               // 调整下一个分支节点
//     }
// };

// var shif_up = function(start){
//   var child_index = start;         // 当前节点是叶节点
//   var parent_index = Math.floor((child_index-1)/2);   // 找到父节点


//   while(child_index > 0){
//       // 父节点更小,就不用调整了
//       if(heap[parent_index] <= heap[child_index]){
//           break;
//       }else{
//           // 父节点和子节点的值互换
//           var tmp = heap[child_index];
//           heap[child_index] = heap[parent_index];
//           heap[parent_index] = tmp;
//           child_index = parent_index;
//           parent_index = Math.floor((parent_index-1)/2);
//       }
//   }
// };

// this.insert = function(item){
//   // 插入一个新的元素
//   // 堆满了,不能再放元素
//   if(curr_size == max_size){
//       return false;
//   }

//   heap[curr_size] = item;
//   shif_up(curr_size);
//   curr_size++;
//   return true;
// };

// this.remove_min = function(){
//   if(curr_size <= 0){
//       return null;
//   }
//   var min_value = heap[0];
//   heap[0] = heap[curr_size-1];
//   curr_size--;
//   shif_down(0, curr_size-1);
//   return min_value;
// };
//   this.size = function(){
//     return curr_size;
//   };

//   this.print = function(){
//     console.log(heap);
//   };

//   this.get_min = function(){
//     if(curr_size > 0){
//         return heap[0];
//     }
//     return null;
//   }
//   this.print = function() {
//     console.log(heap);
//   }
// };

function MinHeap(size){
  var heap = new Array(size);    // 数组
  var curr_size = 0;             // 当前堆的大小
  var max_size = size;           // 堆最大容量
  
  // 从给定的分支节点开始往下调整
  var shif_down = function(start){
    let m = curr_size - 1;
    // 从start这个位置开始,向下下滑调整
    var parent_index = start;                       // start就是当前这个局部的父节点
    var min_child_index = parent_index*2 + 1;       // 一定有左孩子,先让min_child_index等于左孩子的索引

    while(min_child_index <= m){
      // min_child_index+1 是左孩子的索引, 左孩子大于右孩子
      if(min_child_index < m && heap[min_child_index] > heap[min_child_index+1]){
        min_child_index = min_child_index+1;  // min_child_index永远指向值小的那个孩子
      }

      // 父节点的值小于等于两个孩子的最小值
      if(heap[parent_index] <= heap[min_child_index]){
        break;   // 循环结束,不需要再调整了
      }else{
        // 父节点和子节点的值互换
        var tmp = heap[parent_index];
        heap[parent_index] = heap[min_child_index];
        heap[min_child_index] = tmp;
        parent_index = min_child_index;
        min_child_index = 2*min_child_index + 1;
      }
    }

  };

  this.init = function(arr) {
    max_size = arr.length;
    curr_size = max_size;
    heap = new Array(arr.length);
    // 填充heap, 目前还不是一个堆
    for(var i =0; i<curr_size;i++){
        heap[i] = arr[i];
    }
    let curr_pos = Math.floor((max_size-2)/2);

    while(curr_pos >= 0) {
      shif_down(curr_pos);
      curr_pos--;
    }
  }

  function shif_up(index) {
    let curr_index = index;
    while(curr_index > 0) {
      // 父节点索引n，子节点索引i，则n=(i-1)/2的向下取整
      let parent_index = Math.floor((curr_index-1)/2);
  
      // 如果当前节点比父节点小 互换
      if(heap[curr_index] < heap[parent_index]) {
        let temp = heap[curr_index];
        heap[curr_index] = heap[parent_index];
        heap[parent_index] = temp;
        curr_index = parent_index;
      } else {
        break;
      }
    }
  }
  this.insert = function(data) {
    // 如果堆满了 不能再插入元素
    if(curr_size >= max_size) {
      return false;
    }
    // 数组末尾插入元素
    heap[curr_size] = data;
    shif_up(curr_size)
    curr_size += 1;
  }

  this.remove_min = function() {
    const min_data = heap[0];
    curr_size -= 1;
    heap[0] = heap[curr_size];
    heap[curr_size] = null;
    shif_down(0);
    return min_data;
  }
  this.size = function(){
    return curr_size;
  };

  this.print = function(){
    console.log(heap);
  };

  this.get_min = function(){
    if(curr_size > 0){
        return heap[0];
    }
    return null;
  }
  this.print = function() {
    console.log(heap);
  }
};


// var arr = [53, 17, 78, 9, 45, 65, 87, 23];
// var min_heap = new MinHeap(arr.length);
// // min_heap.init(arr)
// for(let i = 0; i < arr.length; i++) {
//   min_heap.insert(arr[i]);
// }


// var sort_arr = []
// for(var i =0;i<arr.length;i++){
//     sort_arr.push(min_heap.remove_min());
// }

// console.log(sort_arr);

var arr = [53, 17, 78, 9, 45, 65, 87, 23];
var k = 3;
var min_heap = new MinHeap(k);
for(let i = 0; i < 3; i++) {
  min_heap.insert(arr[i])
}

for(let i = 3; i < arr.length; i++) {
  if(arr[i] > min_heap.get_min()) {
    min_heap.remove_min();
    min_heap.insert(arr[i]);
  }
}
min_heap.print();
