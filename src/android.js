window._calf_ = {
  handles: {},
  _index: 0,
  call: function (act, args, success, error) {
    const cid = "js_call_handel_id" + window._calf_._index++;
    window._calf_.handles[cid] = window._calf_.buildCallHandleFunc(
      success,
      error
    );
    gclaf.jsExec(
      JSON.stringify({
        act: act,
        callbackid: cid,
        args: args,
      })
    );
  },
  buildCallHandleFunc(success, error) {
    return function (data) {
      console.log("callback data ->" + JSON.stringify(data), data, "-----");
      if (data.code == 200) {
        success(data.data);
      } else {
        error(data.msg);
      }
      if (!data.isKeepAlive) {
        delete window._calf_.handles[data.js_call_handel_id];
      }
    };
  },
};
window.g = {
  getDevice() {
    return new Promise((success, error) => {
      window._calf_.call("device", {}, success, error);
    });
  },
  showStatusBar() {
    return new Promise((success, error) => {
      window._calf_.call("show_status_bar", {}, success, error);
    });
  },
  hideStatusBar() {
    return new Promise((success, error) => {
      window._calf_.call("hide_status_bar", {}, success, error);
    });
  },
  restartApp() {
    return new Promise((success, error) => {
      window._calf_.call("restartApp", {}, success, error);
    });
  },
  toast(msg, position = "center") {
    return new Promise((success, error) => {
      window._calf_.call("toast", { msg: msg, pos: position }, success, error);
    });
  },
  getStore() {
    return new Promise((success, error) => {
      window._calf_.call("getStore", {}, success, error);
    });
  },
  setStore(key, val) {
    return new Promise((success, error) => {
      window._calf_.call("setStore", { key: key, val: val }, success, error);
    });
  },
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
  dbQuery(sql, args) {
    return new Promise((success, error) => {
      window._calf_.call("dbQuery", { sql: sql, args: args }, success, error);
    });
  },
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
  deepLink(success) {
    window._calf_.call("deepLink", {}, success, null);
  },
  getClipboard() {
    return new Promise((success, error) => {
      window._calf_.call("getClipboard", {}, success, error);
    });
  },
  clearClipboard() {
    return new Promise((success, error) => {
      window._calf_.call("clearClipboard", {}, success, error);
    });
  },
  setClipboard(msg) {
    return new Promise((success, error) => {
      window._calf_.call("setClipboard", { msg: msg }, success, error);
    });
  },
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
  adReward() {
    return new Promise((success, error) => {
      window._calf_.call("ad_reward", {}, success, error);
    });
  },
  adPage() {
    return new Promise((success, error) => {
      window._calf_.call("ad_page", {}, success, error);
    });
  },
  async isProxy() {
    return await new Promise((success, error) => {
      window._calf_.call("isProxy", {}, success, error);
    });
  },
  getLocation() {
    return new Promise((success, error) => {
      window._calf_.call("location", {}, success, error);
    });
  },
  getLocationLast() {
    return new Promise((success, error) => {
      window._calf_.call("location_last", {}, success, error);
    });
  },
  registerLocationListener(success, error) {
    window._calf_.call("location_listener", {}, success, error);
  },
};
