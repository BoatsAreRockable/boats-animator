import { app } from "electron";
import * as fs from "fs";

const USER_DATA_PATH = app.getPath("userData");
const LOG_FILE_PATH = app.isPackaged
  ? `${USER_DATA_PATH}/boats-animator.log`
  : `${USER_DATA_PATH}/boats-animator-development.log`;

export enum ProcessName {
  MAIN = "MAIN",
  RENDERER = "RENDERER",
}

enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

class Logger {
  private stream: fs.WriteStream | undefined;

  clear() {
    if (fs.existsSync(LOG_FILE_PATH)) {
      this.info("logger.clear", "Log file cleared", false);

      fs.unlinkSync(LOG_FILE_PATH);
    }
  }

  initialize() {
    this.stream = fs.createWriteStream(LOG_FILE_PATH, {
      // a = Open file for appending
      flags: "a",
    });
    this.info("logger.open", "Log file opened");
  }

  info = (
    loggingCode: string,
    message?: string | Record<string, string>,
    writeToFile: boolean = true
  ) => this.log(LogLevel.INFO, loggingCode, message, writeToFile);

  warn = (
    loggingCode: string,
    message?: string | Record<string, string>,
    writeToFile: boolean = true
  ) => this.log(LogLevel.WARN, loggingCode, message, writeToFile);

  error = (
    loggingCode: string,
    message?: string | Record<string, string>,
    writeToFile: boolean = true
  ) => this.log(LogLevel.ERROR, loggingCode, message, writeToFile);

  log(
    logLevel: LogLevel,
    loggingCode: string,
    message?: string | Record<string, string>,
    writeToFile: boolean = true,
    processName: ProcessName = ProcessName.MAIN
  ) {
    const logLine = this.buildLogLine(
      processName,
      logLevel,
      loggingCode,
      message
    );
    console.log(logLine);

    if (this.stream) {
      this.stream.write(`${logLine}\n`);
    } else if (writeToFile) {
      throw "Logger must be initialized first!";
    }
  }

  private buildLogLine(
    processName: ProcessName,
    logLevel: LogLevel,
    loggingCode: string,
    message?: string | Record<string, string>
  ) {
    const logDate = new Date().toISOString();
    return JSON.stringify([
      logDate,
      processName,
      logLevel,
      loggingCode,
      message,
    ]).slice(1, -1);
  }
}

export default new Logger();
