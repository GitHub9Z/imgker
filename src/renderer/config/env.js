// 配置模块

// 全局上下文Context定义在index.html内
const Env = (Context.Deploy.buildType == 'dev') ? require('./env_dev.js') : require('./env_prod.js')

module.exports = Env
