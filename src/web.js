window.g = {
  //获取设备信息
  getDevice() {
    return new Promise((success, error) => {
      window._calf_.call("device", {}, success, error);
    });
  },
  //显示状态栏
  showStatusBar() {
    return new Promise((success, error) => {
      window._calf_.call("show_status_bar", {}, success, error);
    });
  },
  //隐藏状态栏
  hideStatusBar() {
    return new Promise((success, error) => {
      window._calf_.call("hide_status_bar", {}, success, error);
    });
  },
  //重启应用
  restartApp() {
    return new Promise((success, error) => {
      window._calf_.call("restartApp", {}, success, error);
    });
  },
  //显示toast
  toast(msg, position = "center") {
    return new Promise((success, error) => {
      window._calf_.call("toast", { msg: msg, pos: position }, success, error);
    });
  },
  //获取存储
  getStore() {
    return new Promise((success, error) => {
      window._calf_.call("getStore", {}, success, error);
    });
  },
  //设置存储
  setStore(key, val) {
    return new Promise((success, error) => {
      window._calf_.call("setStore", { key: key, val: val }, success, error);
    });
  },
  //打开数据
  dbOpen(ver, initsql) {
    return new Promise((success, error) => {
      window._calf_.call(
        "openDB",
        { ver: ver, initSql: initsql },
        success,
        error
      );
    });
  },
  //查询数据
  dbQuery(sql, args) {
    return new Promise((success, error) => {
      window._calf_.call("dbQuery", { sql: sql, args: args }, success, error);
    });
  },
  //删除数据
  dbDelete(table, where, args) {
    return new Promise((success, error) => {
      window._calf_.call(
        "dbDelete",
        { table: table, where: where, args: args },
        success,
        error
      );
    });
  },
  //更新数据
  dbUpdate(table, vals, where, args) {
    return new Promise((success, error) => {
      window._calf_.call(
        "dbUpdate",
        { table: table, where: where, args: args, vals: vals },
        success,
        error
      );
    });
  },
  //插入数据
  dbInsert(table, vals) {
    return new Promise((success, error) => {
      window._calf_.call(
        "dbInsert",
        { table: table, vals: vals },
        success,
        error
      );
    });
  },
  //deeplink
  deepLink(success) {
    window._calf_.call("deepLink", {}, success, null);
  },
  //获取粘贴板内容
  getClipboard() {
    return new Promise((success, error) => {
      window._calf_.call("getClipboard", {}, success, error);
    });
  },
  //清除粘贴板
  clearClipboard() {
    return new Promise((success, error) => {
      window._calf_.call("clearClipboard", {}, success, error);
    });
  },
  //设置粘贴板
  setClipboard(msg) {
    return new Promise((success, error) => {
      window._calf_.call("setClipboard", { msg: msg }, success, error);
    });
  },
  //三方登录
  login(provider) {
    if (provider == "weibo") {
      return new Promise((success, error) => {
        window._calf_.call("weibo_login", { msg: msg }, success, error);
      });
    } else if (provider == "wechat") {
      return new Promise((success, error) => {
        window._calf_.call("wechat_login", { msg: msg }, success, error);
      });
    } else {
      return new Promise((success, error) => {
        error("不支持的登录方式");
      });
    }
  },
  //三方支付
  pay(provider, data) {
    if (provider == "alipay") {
      return new Promise((success, error) => {
        window._calf_.call("alipay", { data: data }, success, error);
      });
    } else if (provider == "wechat") {
      return new Promise((success, error) => {
        window._calf_.call("wechat_pay", { data: data }, success, error);
      });
    } else {
      return new Promise((success, error) => {
        error("不支持的支付方式方式");
      });
    }
  },
  //分享
  share(provider, data) {
    if (provider == "weibo") {
      return new Promise((success, error) => {
        window._calf_.call("weibo_share", { data: data }, success, error);
      });
    } else if (provider == "wechat") {
      return new Promise((success, error) => {
        window._calf_.call("wechat_share", { data: data }, success, error);
      });
    } else {
      return new Promise((success, error) => {
        error("不支持的分享方式");
      });
    }
  },
};
