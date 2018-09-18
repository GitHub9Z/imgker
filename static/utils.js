// Utils工具类

class UtilStorage {
  /* 获取n位随机数 */
  rndNum (n) {
    var rnd = ''
    for (var i = 0; i < n; i++) {
      rnd += Math.floor(Math.random() * 10)
    }
    return rnd
  }
}
module.exports = new UtilStorage()
