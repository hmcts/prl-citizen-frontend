// eslint-disable-next-line no-undef
const path = require('path');
const fs = require('fs');

global.logCallingFunction = () => {
  const errorObj = new Error();
  const frame = errorObj.stack.split('\n')[2];
  const lineNumber = frame.split(':').reverse()[1];
  let functionName = frame.split(' ')[5];
  // const atFile = frame.split(' ')[6];

  if (functionName.includes('/')) {
    functionName = functionName.split('/').reverse()[0];
  }
  functionName += `: ${lineNumber}`;
  console.log(`==> ${frame}`);
};


class TestLogger {
  constructor() {
    this.outPath = path.resolve(__dirname, '../../../../../output');
    this.testLogsDir = `${this.outPath}/testLogs`;

    if (fs.existsSync(this.testLogsDir)) {
      const filesInDir = fs.readdirSync(this.testLogsDir);
      filesInDir.forEach(f => {
        fs.rmSync(`${this.testLogsDir}/${f}`);
      });
    } else {
      try {
        fs.mkdirSync(this.testLogsDir);
      } catch (stepErr) {
        console.log(stepErr);
      }
    }

    // this.logFile = `${this.testLogsDir}/noname.logs`;
    // fs.appendFileSync(this.logFile, ` ==> ${this.testFilePath}`);
    this.testFilePath = '';
  }

  setupTestLogFile(mochaTest) {
    if (this.testFilePath === mochaTest.file) {
      return;
    }
    this.testFilePath = mochaTest.file;
    let testFile = mochaTest.file.split('/');
    testFile = testFile[testFile.length - 1];
    testFile = testFile.replace('.js', '');
    this.logFile = `${this.testLogsDir}/${testFile}.logs`;

    fs.appendFileSync(this.logFile, ` ==> ${this.testFilePath}`);
  }

  getDate() {
    const d = new Date();
    const magicNum = 10;
    const hh = d.getHours() < magicNum ? `0${d.getHours()}` : d.getHours();
    const mm = d.getMinutes() < magicNum ? `0${d.getMinutes()}` : d.getMinutes();
    const ss = d.getSeconds() < magicNum ? `0${d.getSeconds()}` : d.getSeconds();

    return `[${hh}:${mm}:${ss}]`;
  }

  AddEmptyLines(count) {
    for (let i = 0; i < count; i++) {
      fs.appendFileSync(this.logFile, '\n');
    }
  }

  AddMessage(message) {
    fs.appendFileSync(this.logFile, '\n');
    fs.appendFileSync(this.logFile, this.getDate() + message);
    console.log(this.getDate() + message);
    const I = actor();
    I.addMochawesomeContext(this.getDate() + message);
  }


  AddJson(json) {
    const jsonIndent = 2;
    fs.appendFileSync(this.logFile, '\n');
    fs.appendFileSync(this.logFile, this.getDate() + JSON.stringify(json, null, jsonIndent));
    console.log(this.getDate() + JSON.stringify(json, null, jsonIndent));
    const I = actor();
    I.addMochawesomeContext(this.getDate() + JSON.stringify(json, null, jsonIndent));
  }
}

const testLogger = new TestLogger();

module.exports = testLogger;

global.logCallingFunction = () => {
  const errorObj = new Error();
  const frame = errorObj.stack.split('\n')[2];
  const lineNumber = frame.split(':').reverse()[1];
  let functionName = frame.split(' ')[5];
  // const atFile = frame.split(' ')[6];

  if (functionName.includes('/')) {
    functionName = functionName.split('/').reverse()[0];
  }
  functionName += `: ${lineNumber}`;
  console.log(`==> ${frame}`);
  testLogger.AddMessage(`==> ${frame}`);
  const I = actor();
  I.addMochawesomeContext(`==> ${frame}`);
};
