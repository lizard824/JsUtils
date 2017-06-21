//數組去重
Array.prototype.myUnique = function unique() {
	var obj = {};
	for(var i = 0; i < this.length; i++) {
		var cur = this[i];
		if(obj[cur] == cur) {
			this[i] = this[this.length - 1];
			this.length--;
			i--;
			continue;
		}
		obj[cur] = cur;
	}
	obj = null;
	return this;
}

//數組的最大值
//1 排序
var ary = [12, 23, 34, 24, 35, 14, 25, 36];
ary.sort(
	function(a, b) {
		return a - b;
	});

var min = ary[0];
var max = ary[ary.length - 1];

//2.假设法 假设当前数组中的第一个值是最大值(最小值) 然后拿这个值和后面的项逐一进行比较
var max = ary[0],
	min = ary[0];
for(var i = 0; i < ary.length; i++) {
	var cur = ary[i];
	cur > max ? max = cur : null;
	cur < min ? min = cur : null;
}
//3 Math方法 必须一个一个传 Math又是一个function,所以可以用apply方法

var max = Math.max.apply(null, ary);
var min = Math.min.apply(null, ary);
console.log(max);

//4 字符串拼接 用eval变成js表达式

var nax = eval("Math.max(" + ary.toString() + ")");

//数组的平均数

function avgFn() {
	var ary = [];
	for(var i = 0; i < arguments.length; i++) {
		ary[ary.length] = arguments[i];
	}

	ary.sort(function(a, b) {
		return a - b;
	});
	ary.shift(); //移除首位
	ary.pop(); //移除末尾
	return eval(ary.join("+")) / ary.length.toFixed(2);
}

//类数组转化  try catch转化不兼容ie问题
var utils = {
	listToArray: function(likeAry) {
		var ary = [];
		try {
			ary = Array.prototype.slice.call(likeAry);
			ary = [].slice.call(likeAry);
		} catch(e) {
			for(i = 0; i < likeAry.length; i++) {
				ary[ary.length] = likeAry[i];
			}
		}
		return ary;
	}
	//JSON 字符串 转JSON对象	
	jsonParse: function(str) {
		var val = null;
		try {
			val = JSON.Parse(str);
		} catch(e) {
			eval("(" + str + ")");
		}
		return val;
	}
}