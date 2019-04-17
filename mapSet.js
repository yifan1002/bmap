//定义多边形样式
var shapeStyle = {
	strokeColor: "red",
	strokeWeight: 2,
	strokeOpacity: 0.8,
	strokeStyle: 'dashed',
	fillColor: ''
}
//定义文本标注样式
var textStyle = {
	color: "red",
	fontSize: "12px",
	height: "20px",
	lineHeight: "20px",
	fontFamily: "微软雅黑"
}
//定义文本标注偏移量
var textOffset = new BMap.Size(15, -30);
//定义信息窗口
var infoStyle = {
	width: 400, // 信息窗口宽度
	height: 200, // 信息窗口高度
	//offset: new BMap.Size(-2, -10), // 信息窗口位置
	title: "招生范围详细："
}