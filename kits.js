/* 
  我们将来在开发的时候，肯定会有很多重复使用的代码
  这些代码我们应该封装起来，以提高工作效率

  怎么封装呢？
    通常我们喜欢把方法封装到对象身上
*/
var kits = {};

kits.dispatchZero = function (num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

// 把方法都放到对象的身上
kits.formatDate = function () {
  var date = new Date();
  // 把年月日时分秒获取
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = this.dispatchZero(month);
  var day = date.getDate();
  day = this.dispatchZero(day);
  var hour = date.getHours();
  hour = this.dispatchZero(hour);
  var minute = this.dispatchZero(date.getMinutes());
  var second = this.dispatchZero(date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

kits.randomInt = function(n,m){
  return Math.floor(Math.random() * (m-n+1) + n);
}

// 常见的给id的方式1
// 当前时间戳 + 大的随机数
kits.getId = function(){
  // 返回一个不容易重复的id
  let date = new Date();
  let time = date.getTime();// 得到的是从1970年1月1日到现在为止的毫秒总数
  // 然后在得到一个足够大的随机数，把毫秒和随机数相连，作为新的id
  let r = this.randomInt(100000,999999);
  // 把两个数字连起来
  let id = time + '' + r;
  return id;
}



//本地存储

// 将一个数组(arr)以指定的键(key)存储到localStorage里面

kits.saveLocalDataArray = function (key, arr) {
  let a = []
  arr.forEach(function (e) {
    let id = kits.getId()
    b = { content: e, id: id }
    a.push(b)
  })
  localStorage.setItem(key, JSON.stringify(a))
  a = a || []
  return a
}

// 从localStorage里面根据指定的键获取一个数组
kits.getLocalDataArray = function (key) {
  var data = localStorage.getItem(key);
  var arr = JSON.parse(data);
  if (!arr) {
    arr = [];
  }
  return arr;
}

// 向localStorage里面指定键(key)的数组数据追加一个数据对象（data）
kits.appendDataIntoArray = function (key, data) {
  let id = kits.getId()
  let b = { content: data, id: id }
  let arr = localStorage.getItem(key)
  arr = JSON.parse(arr)
  arr.push(b)
  localStorage.setItem(key, JSON.stringify(arr))
  arr = arr || []
  return arr
}

// 根据对应的id从localStorage中指定键(key)的数组中删除一条数据参数
kits.deleteLocalDataById = function (key, id) {
  let arr = localStorage.getItem(key)
  arr = JSON.parse(arr)
  arr.forEach(function (e, i) {
    let m = e.id
    if (m == id) {
      arr.splice(i, 1)
    }
    localStorage.setItem('shuju', JSON.stringify(arr))
  })
  arr = arr || []
  return arr
}

// 根据id修改localStorage里面的指定键(key)的数组数据参数
kits.modifyLocalDataById = function (key, id, data) {
  let arr = localStorage.getItem(key)
  arr = JSON.parse(arr)
  arr.forEach(function (e) {
    let m = e.id
    if (m == id) {
      e.content = data
    }
    localStorage.setItem('shuju', JSON.stringify(arr))
  })
  arr = arr || []
  return arr
}