// Define ANSI escape codes for colored console output
export const COLOR: { [key: string]: string } = {
  BLUE: '\x1b[34m',         // log
  CYAN: '\x1b[36m',         // info
  YELLOW: '\x1b[33m',       // warn
  ORANGE: '\x1b[38;5;208m', // debug
  RED: '\x1b[31m',          // error
  GREEN: '\x1b[38;5;22m',   // success (darker green)
  RESET: '\x1b[0m',         // reset
};


export const originalLog: typeof console.log = console.log;
export const originalInfo: typeof console.info = console.info;
export const originalDebug: typeof console.debug = console.debug;
export const originalWarn: typeof console.warn = console.warn;
export const originalError: typeof console.error = console.error;

// Add a 'success' method to the global console object
declare global {
  interface Console {
    success: (...args: any[]) => void;
  }
}


const formatLog = (type: string, message: string): string => {
  // Define the number of dashes in the arrow for each log type
  const dashCount: { [key: string]: number } = {
    log: 6, info: 5, success: 2, debug: 4, warn: 5, error: 4,
  };
  const dashes: string = '-'.repeat(dashCount[type]);
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  return `${timestamp} [${type.toUpperCase()}] ${dashes}> ${message}`;
}


// Prevent infinite loop when logging
const isLogging: Set<string> = new Set<string>();

export const setupCustomLogging = (useColors: boolean): void => {
  const applyColor = (color: string, message: string): string => useColors ? `${color}${message}${COLOR.RESET}` : message;

  console.log = (...args: any[]): void => {
    if (isLogging.has('log')) return;
    isLogging.add('log');
    originalLog(applyColor(COLOR.BLUE, formatLog('log', args.join(' '))));
    isLogging.delete('log');
  };

  console.info = (...args: any[]): void => {
    if (isLogging.has('info')) return;
    isLogging.add('info');
    originalInfo(applyColor(COLOR.CYAN, formatLog('info', args.join(' '))));
    isLogging.delete('info');
  };

  console.debug = (...args: any[]): void => {
    if (isLogging.has('debug')) return;
    isLogging.add('debug');
    originalDebug(applyColor(COLOR.ORANGE, formatLog('debug', args.join(' '))));
    isLogging.delete('debug');
  };

  console.warn = (...args: any[]): void => {
    if (isLogging.has('warn')) return;
    isLogging.add('warn');
    originalWarn(applyColor(COLOR.YELLOW, formatLog('warn', args.join(' '))));
    isLogging.delete('warn');
  };

  console.error = (...args: any[]): void => {
    if (isLogging.has('error')) return;
    isLogging.add('error');
    originalError(applyColor(COLOR.RED, formatLog('error', args.join(' '))));
    isLogging.delete('error');
  };

  console.success = (...args: any[]): void => {
    if (isLogging.has('success')) return;
    isLogging.add('success');
    originalLog(applyColor(COLOR.GREEN, formatLog('success', args.join(' '))));
    isLogging.delete('success');
  };
};