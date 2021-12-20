import { catchError, finalize } from "rxjs";
import { tap } from "rxjs/operators";

export const LogLevel = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  ERROR: 3,
};

let logLevel = LogLevel.TRACE;

export function setLogLevel(level) {
  logLevel = level;
}

const shouldLog = (level) => {
  return level >= logLevel;
};

export const debug = (level, message) => (source) =>
  source.pipe(
    tap((val) => (shouldLog(level) ? console.log(message, val) : null)),
    finalize(() =>
      shouldLog(level) ? console.warn(`${message} completed`) : null
    ),
    catchError((err) => {
      shouldLog(level) ? console.error("caught error", err) : null;
      throw new Error(err);
    })
  );
