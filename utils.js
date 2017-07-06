//數組去重
Array.prototype.myUnique = function unique() {
	var obj = {};
	for (var i = 0; i < this.length; i++) {
		var cur = this[i];
		if (obj[cur] == cur) {
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
for (var i = 0; i < ary.length; i++) {
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
	for (var i = 0; i < arguments.length; i++) {
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
//单例模式
var utils = (function() {
	var flag = "getComputedStyle" in window;
	return {
		listToArray: listToArray,
		jsonParse: jsonParse,
		getCss: getCss,
		win: win,
		children: children,
		prev: prev,
		next: next,
		sibling: sibling,
		firstchild: firstchild,
		lastChild: lastChild,
		setCss: setCss,
		css:css
	}

	function listToArray(likeAry) {

		if (flag) {
			return Array.prototype.slice.call(likeAry);
		}
		var ary = [];
		for (i = 0; i < likeAry.length; i++) {
			ary[ary.length] = likeAry[i];
		}
		return ary;
	},
	//JSON 字符串 转JSON对象	
	function jsonParse(str) {
		var val = null;
		try {
			val = JSON.Parse(str);
		} catch (e) {
			eval("(" + str + ")");
		}
		return val;
	},
	//getCss:获取当前元素所有经过浏览器计算过的样式中的attr对应的值
	//curEle:[object]当前要操作的元素对象
	//attr:[string] 我们要获取的样式属性的名称
	function getCss(curEle, attr) {
		var val = null,
			reg = null;
		try {
			window.getComputedStyle(curEle, null)[attr];
		} catch (e) {
			val = curEle.currentStyle[attr];
		}
		reg = /^(-?\d+(\.\d+)?)(px|pt|em|rem)?$/;
		return reg.test(val) ? parseFloat(val) : val;
	},
	//win:获取或者设置了关于浏览器的黑子模型的信息
	function win(attr, value) {
		//不传value的话默认是获取样式值
		if (typeof value === "undefined") {
			return document.documentElement[attr] || document.body[attr];
		}
		document.documentElement[attr] = value;
		document.body[attr] = value;
	},
	//获取所有元素子节点或者 TAGNAME下的
	function children(curEle, tagName) {
		var nodeList = curEle.childNodes;
		var ary = [];
		if (!flag) {
			for (var i = 0; i < nodeList.length; i++) {
				var currentNode = nodeList[i];
				currentNode.nodeType === 1 ? ary[ary.length] = currentNode : null;
			}
			nodeList = null;
		} else {
			ary = [].prototype.slice.call(curEle.children); //类数组转换
		}
		if (typeof(tagName) === "string") {
			for (var k = 0; k < ary.length; k++) {
				var curEleNode = ary[k];
				if (curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
					ary.splice(k, 1);
					k--;
				}
			}
		}

		return ary;
	},
	//获取当前元素的哥哥节点,判断是否为元素节点,不是的话给予当前的继续找上面的哥哥节点,一直找哥哥节点,
	function prev(curEle) {
		try {
			return curEle.previousElementSibling;
		} catch (e) {
			var pre = curEle.previousSibling;
			whilep(pre && pre.nodeType !== 1) {
				pre = pre.previousSibling;
			}
			return pre;
		}
	},
	function next(curEle) {
		try {
			return curEle.nextElementSibling;
		} catch (e) {
			var next = curEle.nextSibling;
			whilep(next && next.nodeType !== 1) {
				next = next.previousSibling;
			}
			return next;
		}
	},
	//获取相邻的
	function sibling(curEle) {
		var pre = this.prev(curEle);
		var next = this.next(curEle);
		var ary = [];
		pre ? ary.push(pre) : null;
		next ? ary.push(next) : null;
		return ary;
	},
	//firstchild
	function firstchild(curEle) {
		var chs = this.children(curEle);
		return chs.length > 0 ? chs[0] : null;
	},
	function lastChild(curEle) {
		var chs = this.children(curEle);
		return chs.length > 0 ? chs[chs.length - 1] : null;
	},
	function setCss(curEle, attr, value) {

		var reg = /^(width|height|bottom|top|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
		if (reg.test(attr)) {
			//判断是否是一个有效数字
			if (!isNaN(value)) {
				value += "px";

			}

		}
		curEle["style"][attr] = value;
	},
	//css:此方法实现了获取,单独设置,批量设置元素的样式
	function css(curEle, options) {
			var argTwo = arguments[1];
			if (typeof argTwo === "string"){
				var argThree = arguments[2];
				if(!argThree){
					return this.getCss(curEle,argTwo);
					return this.getCss.apply(this,arguments);
				}
				// this.setCss(curEle,argTwo,argThree);
				this.setCss.apply(this, arguments);
				return;
			}
	}



})();


//等同于Jquery的offset方法, 实现页面中任意一个元素,距离body的便宜(包含左偏移和上偏移),不管当前元素的父级参照物是谁
function offset(curEle) {
	var totalLef = null,
		totalTop = null,
		par = curEle.offsetParent;
	totalLef += curEle.offsetLeft;
	totalTop += curEle.offsetTop;
	//只要没有找到BODY,我们就吧父级参照物的边框和偏移量进行累加
	while (par) {
		//累加父级参照物的边框
		totalLef += par.clientLeft;
		totalTop += par.clientTop;
		//父级参照物本身的偏移
		totalLef += par.offsetLeft;
		totalTop += par.offsetTop;

		par = par.offsetParent;

	}
	return {
		left: totalLef,
		top: totalTop
	};
}

//回到顶部的效果
function() {
	window.onscroll = null;
	var duration = 500,
		interval = 10,
		target = document.documentElement.scrollTop;
	var step = traget / duration * interval;
	var timer = window.setInterval(function() {
		var curTop = document.documentElement.scrollTop;
		if (curTop === 0) {
			window.clearInterval(timer);
			window.onscroll = computed;
			return;
		}
		curTop -= step;
		document.documentElement.scrollTop = curTop;
	}, 10);
}
//window.onscroll不管怎么操作 就会触发
window.onscroll = function computed() {

	var curTop = document.documentElement.scrollTop || document.body.scrollTop;
	var curHeight = document.documentElement.clientHeight;
	goLink.style.display = curTop > curHeight ? "block" : "none"

}