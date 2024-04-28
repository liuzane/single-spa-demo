// Bases
import fs from 'node:fs';
import path from 'node:path';

// Plugins
import { parse } from 'dotenv';
import { expand } from 'dotenv-expand';

// check if the OS is windows
const isWindows = typeof process !== 'undefined' && process.platform === 'win32';

// normalizes the given path
function normalizePath(id) {
  return path.posix.normalize(isWindows ? id.split(path.sep).join(path.posix.sep) : id);
}

function tryStatSync (file) {
  try {
    // The "throwIfNoEntry" is a performance optimization for cases where the file does not exist
    return fs.statSync(file, { throwIfNoEntry: false });
  } catch {
    // Ignore errors
  }
}

export function getEnvFilesForMode(mode, envDir) {
  return [
    /** default file */ `.env`,
    /** local file */ `.env.local`,
    /** mode file */ `.env.${mode}`,
    /** mode local file */ `.env.${mode}.local`
  ].map(file => normalizePath(path.join(envDir, file)));
}

export function loadEnv(mode, envDir) {
  if (mode === 'local') {
    throw new Error(
      `"local" cannot be used as a mode name because it conflicts with ` + `the .local postfix for .env files.`
    );
  }
  const envFiles = getEnvFilesForMode(mode, envDir);

  const parsed = Object.fromEntries(
    envFiles.flatMap(filePath => {
      if (!tryStatSync(filePath)?.isFile()) return [];
      return Object.entries(parse(fs.readFileSync(filePath)));
    })
  );

  // let environment variables use each other. make a copy of `process.env` so that `dotenv-expand`
  // doesn't re-assign the expanded values to the global `process.env`.
  const processEnv = { ...process.env };
  expand({ parsed, processEnv });

  return { ...parsed };
}
