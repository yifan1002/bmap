// 百度地图API功能
var map = new BMap.Map("allmap");
map.centerAndZoom(new BMap.Point(center.latitude, center.longitude), 13);
map.enableScrollWheelZoom();

// 生成学校列表
var str = '';
for(var i = 0; i < areaList.length; i++) {
	str += '<option value=' + i + '>' + areaList[i].schoolName + '</option>'
}
$('.school-list').append(str);

//生成学区
for(i = 0; i < areaList.length; i++) {
	addMarker(i);
}
function addMarker(i) {
	var point = new BMap.Point(areaList[i].markPoint[0], areaList[i].markPoint[1]), //设置标注点坐标
		txtLocal = {position: point,offset: txtOffset},			 //设置文本标注位置
		ply = new BMap.Polygon(areaList[i].areaPoint, plyStyle), //创建多边形
		marker = new BMap.Marker(point), 						 //创建图标标注
		txt = new BMap.Label(areaList[i].schoolName, txtLocal, txtStyle); //创建文本标注
	map.addOverlay(ply); 	//增加多边形
	map.addOverlay(txt); 	//增加文本标注
	map.addOverlay(marker); //增加标注
	ply.addEventListener("mousemove", function(e) {
		$('path[stroke-linejoin=round]:eq(' + i + ')').siblings('path[stroke-linejoin=round]').attr('fill', 'none');
		map.removeOverlay(plyHover); 	//移除鼠标滑过多边形
		plyHover = new BMap.Polygon(areaList[i].areaPoint, plyStyleHover); //创建鼠标滑过多边形
		map.addOverlay(plyHover); 		//增加鼠标滑过多边形
	});
	ply.addEventListener("mouseout", function(e) {
		map.removeOverlay(plyHover); 	//移除鼠标滑过多边形
	});
}

// 点击标注点显示学区
$('body').on('click', '.BMap_Marker.BMap_noprint', function() {
	var index = $(this).index();
	areaShow(index);
});

// 搜索切换显示学区
$('body').on('change', '.school-list', function() {
	var index = parseInt($(this).val());
	if(index === 999) {
		map.closeInfoWindow();
		$('path[stroke-linejoin=round]').attr('fill', 'none');
	} else {
		areaShow(index);
	}
});

// 学区边界
function areaShow(index) {
	infoWindow = new BMap.InfoWindow('<p style="color: #f00">' + areaList[index].schoolName + '</p>' + areaList[index].schoolArea, infoStyle); // 创建信息窗口对象 
	map.openInfoWindow(infoWindow, new BMap.Point(areaList[index].markPoint[0], areaList[index].markPoint[1])); //开启信息窗口
	$('path[stroke-linejoin=round]:eq(' + index + ')').attr('fill', '#fbfba7').siblings('path[stroke-linejoin=round]').attr('fill', 'none');
}