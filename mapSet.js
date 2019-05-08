var plyHover, txtHover;
//定义多边形样式
var plyStyle = {
	strokeColor: "red",
	strokeWeight: 2,
	strokeOpacity: 1,
	strokeStyle: 'dashed',
	fillColor: ''
}
//定义多边形样式-鼠标滑过
var plyStyleHover = {
	strokeColor: "red",
	strokeWeight: 2,
	strokeOpacity: 1,
	strokeStyle: 'dashed',
	fillColor: '#fbfba7'
}
//定义文本标注样式
var txtStyle = {
	color: "red",
	fontSize: "12px",
	height: "20px",
	lineHeight: "20px",
	fontFamily: "微软雅黑"
}
//定义文本标注偏移量
var txtOffset = new BMap.Size(15, -30);
//定义信息窗口
var infoStyle = {
	width: 400, // 信息窗口宽度
	height: 200, // 信息窗口高度
	//offset: new BMap.Size(-2, -10), // 信息窗口位置
	title: "招生范围详细："
}