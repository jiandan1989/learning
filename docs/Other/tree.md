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

[更多查看](http://mama.indstate.edu/users/ice/tree/tree.1.html)

```vim
# 查看版本
tree --version

# 查看帮助
tree --help

##########  清单选项  ############
tree -a     # 打印除了包含 . 的隐藏文件或者文件夹之外的所有文件夹和文件
tree -d     # 只打印显示出文件夹
tree -D     # 显示出文件夹或文件 及最后修改时间
tree -f     # 基于当前目录下的全路径
tree -P     # 后跟正则, 只显示能够匹配到的文件夹或者文件
tree -I     # 后跟正则, 不显示无法匹配的文件夹或文件

##########  文件选项  ############

# 打印文件名及文件大小, 以字节为单位
tree -s

# 打印文件大小及名称, 显示更易于阅读的格式, 自动转化为K,M等单位
tree -h

##########  排序选项  ############
tree -t     # 按照最后一次的更新时间进行排序显示

tree -U     # 不进行排序, 按照文件显示的原有顺序显示
tree -r     # 按照倒序排序


# 输出文件, 将打印显示出来的目录输出到一个指定的文件内
tree > tree.md
```

