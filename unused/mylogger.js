const { Deta } = require("deta");

// const deta = Deta("d0bVbPizELWY_QP4s5c3U7rTJwrbsJ9Nj3YaH5XCVBpay");
const deta = Deta("d0Lbib97u791_EiJfH4C4wipRDVaBWxG34qECkBA37Xbx");

const drive = deta.Drive("simple_drive");

class Logger {
  constructor() {
    this.logarr = [];
  }

  log(...args) {
    const arr = [];
    for (let arg of args) {
      if (typeof arg == "object") {
        arg = JSON.stringify(arg);
      }

      arr.push(arg);
    }

    this.logarr.push(arr);
  }

  releaseLog() {
    let str = "";
    // str+=logarr.join('\n')
    for (let log of this.logarr) {
      for (let part of log) {
        str += part + "   ";
      }
      str += "\n";
    }
    drive.put("log1.txt", { data: str });
  }
}

module.exports = { Logger };
