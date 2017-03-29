## Tofu-cli
> Tofu 框架配套命令行构建工具。

### 文档适用版本

**>=0.1.3**

### 安装与更新

`npm i -g tofu-cli@latest`
或者 `cnpm i -g tofu-cli@latest`
或者 `yarn global add tofu-cli@latest`

### 使用

1. 初始化项目

`tofu init [-g|--git <git-repo>]`

	- git : 指定git仓库，会在完成项目初始化后进行git的初始化。

2. 运行开发服务

`tofu server [-p|--port <port>]`

	- port : 指定服务运行端口。

3. 打包项目

`tofu build [--zip | --to <dist>]`

	- zip : 打包后压缩
	- to : 压缩后移动文件到指定目录

4. 更新 Tofu

`tofu update [--npm|--cnpm|--yarn]`

	- npm : 使用npm更新
	- cnpm : 使用cnpm更新
	- yar  : 使用yarn更新