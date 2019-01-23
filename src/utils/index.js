import router from '../router'
// 路由跳转
function jump (url, params) {
router.push({
    path: url,
    query: params
})
//	router.go(-1)
}
// 表格时间格式化
function tableToTime (row, column, cellValue, index) {
  let date, Y, M, D
  if (cellValue) {
    date = new Date(cellValue)
    Y = date.getFullYear() + '-'
    M =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-'
    D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return Y + M + D
  }
}
//返回上一级
function routerBack(el, pageName, pageType) {
	el.$router.push({
		path: pageName
	})
};
//成功跳转
function saveSuccess(obj, str, src, arr) {
	obj.$message({
		type: 'success',
		message: str,
		duration: 500
	});
	window.setTimeout(function() {
		if(arr) {
			obj.globalFun.routerBack(obj, src, arr);
		} else if(src) {
			obj.globalFun.routerBack(obj, src);
		} else {
			obj.globalFun.routerBack(obj);
		}

	}, 700);
};
//全角转半角
function toCDB(str) {
  var tmp = "";
  for(var i=0;i<str.length;i++){
      if (str.charCodeAt(i) == 12288){
          tmp += String.fromCharCode(str.charCodeAt(i)-12256);
          continue;
      }
      if(str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375){
          tmp += String.fromCharCode(str.charCodeAt(i)-65248);
      }
      else{
          tmp += String.fromCharCode(str.charCodeAt(i));
      }
  }
  return tmp;
}

export default {
  jump,
  tableToTime,
  saveSuccess,
  routerBack,
  tableToTime,
  toCDB
}

