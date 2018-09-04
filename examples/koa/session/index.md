- koa 中不提供 `session`的操作

- 如果`session`数据量很小, 直接存在内存中
- 如果 `session`数据量很大, 则需要存储介质存放`session`数据

---

### 数据库存储方案

- 将 `session`存放在 `MySQL`数据库中
- 需要用到中间件
  - `koa-session-minimal` 适用于 `koa2`的 `session`中间件, 提供存储介质的读写接口
  - `koa-mysql-session` 为 `koa-session-minimal`中间价提供`MySQL`数据库的`session`数据读写操作
  - 将 `sessionId` 和对于的数据存在数据库中
- 将数据库的存储的 `sessionId` 存在页面的 `cookie`中
- 根据 `cookie` 的 `sessionId` 去获取对应的 `session`信息
