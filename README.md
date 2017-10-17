# Maple World Maker

## PROBLEMS

* 拖拽过程中, 全局坐标和画布坐标的转化 ( 依靠 `getBoundingClientRect` 方法, 相对于视口做转化 );
* 拖拽功能的封装;

## DEVELOPMENT LOG

`2017-09-19`

现阶段游戏功能大致完成，地图编辑器功能只是一个起步阶段，还余下绝大多数的功能。目前开发计划是整个项目分几个模块，同时分几个阶段开发，如下

项目模块包括:

* MapleWorldCommon 公共模块, 即在多个项目中都可能会调用到的模块, 如 tiles 依据参数绘制图像
* MapleWorldGame 即 MapleWorld项目, 主要是游戏模块;
* MapleWorldMaker 地图编辑器, 实现地图的编辑导出功能;
* MapleWorldBuilder 类似于马里奥制造

项目阶段如下:

1. 第一阶段是MapleWorldGame, MapleWorldMaker两个模块开发完成;
2. 第二阶段是MapleWorldBuilder 整合前两个模块, 同时开发后台功能.
