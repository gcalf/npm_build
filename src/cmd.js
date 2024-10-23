#!/usr/bin/env node
const fs = require("fs");
const archiver = require("archiver");
const exec = require("child_process");
const path = require("path");
const axios = require("axios");
var request = require("request");
const apkFile = process.cwd() + "/" + path.basename(process.cwd()) + ".apk";
const zippath = process.cwd() + "/" + path.basename(process.cwd()) + ".zip";
const ApiHost = require(process.cwd() + "/manifest.json").buildhost;

const gclafCmd = {
  //打包apk
  buildApk() {
    fs.unlink(zippath, (e) => {});
    const output = fs.createWriteStream(zippath);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });
    output.on("close", function () {
      axios
        .post(
          ApiHost + "/buildApp",
          {
            file: fs.createReadStream(zippath),
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            responseType: "stream",
            timeout: 1800000,
          }
        )
        .then((r) => {
          r.data.on("data", async (msg) => {
            // console.log(msg.toString());
            const data = JSON.parse(msg.toString().substring(5));
            switch (data.type) {
              case "log":
                console.log("log", data.msg);
                break;
              case "error":
                console.error("err", data.msg);
                break;
              case "apkdata":
                gclafCmd.downApk(data.msg);
                break;
              default:
                console.error("未知类型" + data.msg);
            }
          });
          r.data.on("end", () => {
            fs.unlink(zippath, (e) => {});
            console.log("结束数据");
          });
          r.data.on("error", (err) => {
            console.log("报错了", err);
          });
        });
    });
    archive.on("warning", function (err) {
      if (err.code === "ENOENT") {
        // log warning
      } else {
        // throw error
        throw err;
      }
    });
    archive.on("error", function (err) {
      console.error("报错了", err);
      throw err;
    });
    archive.pipe(output);
    archive.file("icon.png", { name: "icon.png" });
    archive.file("app.sign", { name: "app.sign" });
    archive.file("manifest.json", { name: "manifest.json" });
    archive.directory("dist", "www");
    archive.finalize();
  },
  //安装AKP
  installApk() {
    exec.exec("adb install -r " + apkFile, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  },
  //下载apk
  downApk(filePath) {
    fs.unlink(apkFile, (e) => {});
    let stream = fs.createWriteStream(apkFile);
    request(ApiHost + "/downapk?p=" + filePath)
      .pipe(stream)
      .on("close", function (err) {
        console.log("文件" + apkFile + "下载完毕");
      });
  },
};
switch (process.argv[2]) {
  case "build":
    return gclafCmd.buildApk();
  case "install":
    return gclafCmd.installApk();
  default:
    console.error("不支持的命令");
}
