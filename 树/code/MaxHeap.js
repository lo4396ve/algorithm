function MaxHeap(size) {
  var heap = new Array(size);    // 数组
  var curr_size = 0;             // 当前堆的大小
  var max_size = size;           // 堆最大容量

  function shif_down(start, m) {
    // 从当前节点往下调整
    let parent_index = start;
    let min_child_index = parent_index*2 + 1;

    while(min_child_index <= m) {
      // 寻找两个孩子节点最大的那个
      if(min_child_index < m) {
        if(heap[min_child_index] < heap[min_child_index + 1]) {
          min_child_index += 1;
        }
      }
      if(heap[parent_index] >= heap[min_child_index]) {
        break;
      } else {
        var tmp = heap[parent_index];
        heap[parent_index] = heap[min_child_index];
        heap[min_child_index] = tmp;
        parent_index = min_child_index;
        min_child_index = 2*min_child_index + 1;
      }
    }
  }
  this.init = function(arr) {
    max_size = arr.length;
    curr_size = max_size;
    heap = new Array(arr.length);
    // 填充heap, 目前还不是一个堆
    for(var i =0; i<curr_size;i++){
        heap[i] = arr[i];
    }

    var curr_pos = Math.floor((curr_size-2)/2);      // 这是堆的最后一个分支节点
    while(curr_pos >= 0){
        shif_down(curr_pos, curr_size-1);            // 局部自上向下下滑调整
        curr_pos -= 1;                               // 调整下一个分支节点
    }
  }
  var shif_up = function(start) {
    var child_index = start;         // 当前节点是叶节点
    var parent_index = Math.floor((child_index-1)/2);   // 找到父节点

    while(child_index > 0) {
      if(heap[parent_index] >= heap[child_index]) {
        break;
      } else {
        // 父节点和子节点的值互换
        var tmp = heap[child_index];
        heap[child_index] = heap[parent_index];
        heap[parent_index] = tmp;
        child_index = parent_index;
        parent_index = Math.floor((parent_index-1)/2);
      }
    }
  }
  this.insert = function(item) {
    // 堆满了,不能再放元素
    if(curr_size == max_size){
      return false;
    }

    heap[curr_size] = item;
    shif_up(curr_size);
    curr_size++;
    return true;
  }

  this.remove_max = function() {
    if(curr_size <= 0){
      return null;
    }
    var max_value = heap[0];
    heap[0] = heap[curr_size-1];
    // heap[curr_size-1] = null;
    curr_size--;
    shif_down(0, curr_size-1);
    return max_value;
  }
  this.size = function(){
    return curr_size;
  };

  this.get_max = function(){
      if(curr_size > 0){
          return heap[0];
      }
      return null;
  }
  this.print = function() {
    console.log(heap);
  }
}

var arr = [53, 17, 78, 9, 45, 65, 87, 23];
var max_heap = new MaxHeap(8);
for(let i = 0; i < arr.length; i++) {
  max_heap.insert(arr[i]);
}
// max_heap.init(arr)
// max_heap.insert(100);
let sort_arr = [];
for(let i = 0; i < arr.length; i++) {
  // let max = max_heap.remove_max();
  // console.log(max);
  sort_arr.push(max_heap.remove_max())
}
console.log(sort_arr);
// max_heap.print();
