// 百度地图API功能
var map = new BMap.Map("allmap");
map.centerAndZoom(new BMap.Point(center.latitude, center.longitude), 13);	// 初始化地图,设置中心点坐标(市民中心)和地图级别。
map.addControl(new BMap.NavigationControl());  // 添加鱼骨控件
map.addControl(new BMap.NavigationControl({ type: BMAP_NAVIGATION_CONTROL_SMALL }));  // 添加迷你控件
map.enableScrollWheelZoom();	// 激活滚动缩放控件   

// 生成学校列表
var str = '';
for(var i = 0; i < areaList.length; i++) {
	str += '<option value=' + i + '>' + areaList[i].schoolName + '</option>'
}
$('.school-list').append(str);

// 生成学区
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
		
		//鼠标滑过多边形功能
		map.removeOverlay(plyHover);
		plyHover = new BMap.Polygon(areaList[i].areaPoint, plyStyleHover);
		map.addOverlay(plyHover);
		
		//鼠标滑过文本标注功能
		map.removeOverlay(txtHover);
		txtHover = new BMap.Label('学校编号：' + areaList[i].schoolNo + '<br />学校名称：' + areaList[i].schoolName + '<br />招生电话：' + areaList[i].schoolTel, txtLocal, txtStyle);
		map.addOverlay(txtHover);
	});
	ply.addEventListener("mouseout", function(e) {
		map.removeOverlay(plyHover); 	//移除鼠标滑过多边形
		map.removeOverlay(txtHover); 	//移除鼠标滑过多边形
	});
}

// 点击标注点显示学区
$('body').on('click', '.BMap_Marker.BMap_noprint', function() {
	var index = $(this).index();
	if (index <= areaList.length) {
		areaShow(index);
	}
});

// 点击切换显示学区
$('body').on('change', '.school-list', function() {
	var index = parseInt($(this).val());
	if(index === 999) {
		map.closeInfoWindow();
		$('path[stroke-linejoin=round]').attr('fill', 'none');
	} else {
		areaShow(index);
	}
});

// 搜索学区
$('#searchTxt').keyup(function(e){
	if (e.keyCode === 13) {
		var val = $(this).val();
		bSearch(val);
	}
});
$('#searchBtn').click(function(){
	var val = $('#searchTxt').val();
	bSearch(val);
});
$('#searchClear').click(function(){
	console.log(map)
	
});
function bSearch(txt) {
	var local = new BMap.LocalSearch(map, {
		renderOptions:{map: map}
	});
	local.search(txt);
}

// 我的位置
$('#searchLocal').click(function() {
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r) {
		if(this.getStatus() == BMAP_STATUS_SUCCESS) {
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
		} else {
			console.log('failed' + this.getStatus());
		}
	}, {
		enableHighAccuracy: true
	})
});

// 学区边界
function areaShow(index) {
	infoWindow = new BMap.InfoWindow('<p style="color: #f00">' + areaList[index].schoolName + '</p>' + areaList[index].schoolArea, infoStyle); // 创建信息窗口对象 
	map.openInfoWindow(infoWindow, new BMap.Point(areaList[index].markPoint[0], areaList[index].markPoint[1])); //开启信息窗口
	$('path[stroke-linejoin=round]:eq(' + index + ')').attr('fill', '#fbfba7').siblings('path[stroke-linejoin=round]').attr('fill', 'none');
}