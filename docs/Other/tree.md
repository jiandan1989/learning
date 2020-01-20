## Mac 如何使用 Tree 生成项目目录 {docsify-ignore}

### 前言

> 无论是在包开发或者是实际项目开发中, 大都需要有一定的文档记录说明, 且在阅读别人源码进行分析记录时也要有一个大致的文件目录描述, 而这些项目目录是如何快速生成呢, 如下所示目录结构

```md
├── build
├── config
├── docs
│   └── static
│       ├── css
│       └── js
├── src
│   ├── assets
│   ├── components
│   ├── store
│   │   └── modules
│   └── views
│       ├── book
│       └── movie
└── static
```



- 开始

> 在 Mac 电脑上可以安装 `tree` 来快速生成

> [Tree](http://mama.indstate.edu/users/ice/tree/)是一个递归目录列表程序，该程序生成深度缩进的文件列表

```bash
brew install tree
```

> 在安装成功之后, 可以先检测一下是否安装成功, 使用 `tree --version`查看版本后如果显示出版本信息等内容, 表示已经安装成功, 那么就可以继续尝试下其他的命令

### 操作命令

```bash
# 查看版本
tree --version

# 查看帮助
tree --help

##########  文件选项  ############

# 打印文件名及文件大小, 以字节为单位
tree -s

# 打印文件大小及名称, 显示更易于阅读的格式, 自动转化为K,M等单位
tree -h
```

