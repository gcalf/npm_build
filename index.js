#!/usr/bin/env node
const fs = require("fs");
const archiver = require("archiver");
const exec = require("child_process");
const path = require("path");
const axios = require("axios");
var request = require("request");
const apkFile = process.cwd() + "/" + path.basename(process.cwd()) + ".apk";
const zippath = process.cwd() + "/" + path.basename(process.cwd()) + ".zip";
fs.unlink(apkFile, (e) => {});
fs.unlink(zippath, (e) => {});
const output = fs.createWriteStream(zippath);
const archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});
const ApiHost = require(process.cwd() + "/manifest.json").buildhost;
output.on("close", function () {
  console.log(archive.pointer() + " total bytes");
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
            fs.unlink(apkFile, (e) => {});
            let stream = fs.createWriteStream(apkFile);
            request(ApiHost + "/downapk?p=" + data.msg)
              .pipe(stream)
              .on("close", function (err) {
                console.log("文件" + apkFile + "下载完毕");
                exec.exec(
                  "adb install -r " + apkFile,
                  (error, stdout, stderr) => {
                    if (error) {
                      console.error(`exec error: ${error}`);
                      return;
                    }
                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                  }
                );
              });
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
output.on("end", function () {
  console.log("Data has been drained");
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on("warning", function (err) {
  if (err.code === "ENOENT") {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on("error", function (err) {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);
// archive.file("package.json", { name: "package.json" });
// archive.file("jsconfig.json", { name: "jsconfig.json" });
// archive.file("babel.config.js", { name: "babel.config.js" });
archive.file("icon.png", { name: "icon.png" });
archive.file("app.sign", { name: "app.sign" });
archive.file("manifest.json", { name: "manifest.json" });

// append files from a sub-directory and naming it `new-subdir` within the archive
// archive.directory("public", true);
// archive.directory("src", true);
archive.directory("dist", "www");
archive.finalize();
// fs.unlink
