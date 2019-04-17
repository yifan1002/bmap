# bmap

## 开发流程
1. [百度地图开发平台申请AK](http://lbsyun.baidu.com/apiconsole/key)
2. [百度地图拾取坐标点](http://api.map.baidu.com/lbsapi/getpoint/index.html)
3. 生成mapInfo.js数据
4. 设置mapSet.js展示效果

## mapIonfo.js参数说明
### center：需要显示地图的中心点
> latitude：纬度
> longitude：经度

### areaList: 学区范围设置
> markPoint: 图片标注、文本标注、信息窗口的定位点
> schoolName: 学校名称
> schoolArea: 学区范围文字说明
> areaPoint: 学区地图标注点，点越多定位越准
