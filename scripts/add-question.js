import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import process from 'process';

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取命令行参数
function getNumberArg() {
  const args = process.argv.slice(2);
  const numberArg = args.find((arg) => arg.startsWith('--number='));
  if (!numberArg) {
    console.error('Error: --number argument is required');
    process.exit(1);
  }
  return numberArg.split('=')[1];
}

// 获取目录路径
function getDirectories(number) {
  const sourceDir = path.resolve(__dirname, '../source');
  const questionsDir = path.resolve(__dirname, '../questions');

  const sourceSubDirs = fs
    .readdirSync(sourceDir)
    .filter((dir) => dir.startsWith(number));
  if (sourceSubDirs.length === 0) {
    console.error(`Error: No directory found for number ${number}`);
    process.exit(1);
  }

  const sourceSubDir = sourceSubDirs[0];
  const difficulty = sourceSubDir.split('-')[1];
  const title = sourceSubDir
    .split('-')
    .slice(2)
    .join(' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
  const targetDir = path.join(questionsDir, difficulty, sourceSubDir);

  return { sourceDir, sourceSubDir, targetDir, title };
}

// 创建目标目录
function createTargetDirectory(targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 查找 README 文件
function findReadmeFile(sourceDir, sourceSubDir) {
  const readmeFiles = ['README.zh-CN.md', 'README.md'];
  for (const file of readmeFiles) {
    const filePath = path.join(sourceDir, sourceSubDir, file);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  console.error('Error: No README file found');
  process.exit(1);
}

// 读取 README 文件内容
function getChallengeContent(readmeFile) {
  const readmeContent = fs.readFileSync(readmeFile, 'utf-8');
  const headerEndIndex = readmeContent.indexOf('<!--info-header-end-->');
  const footerStartIndex = readmeContent.indexOf('<!--info-footer-start-->');
  if (headerEndIndex === -1 || footerStartIndex === -1) {
    console.error('Error: README file does not contain required markers');
    process.exit(1);
  }
  return readmeContent
    .slice(headerEndIndex + '<!--info-header-end-->'.length, footerStartIndex)
    .trim();
}

// 创建新的 README 文件内容
function createReadmeContent(title, challengeContent) {
  return `
---
title: ${title}
---

## 挑战

${challengeContent}

## 解答
`.trimStart();
}

// 写入文件
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}

// 读取文件内容
function readFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf-8').trim();
}

// 创建新的 TypeScript 文件内容
function createTsContent(testCasesContent, templateContent) {
  return `
// ============= Test Cases =============
${testCasesContent}
// ============= Your Code Here =============
${templateContent}
`.trimStart();
}

// 主函数
function main() {
  const number = getNumberArg();
  const { sourceDir, sourceSubDir, targetDir, title } = getDirectories(number);

  createTargetDirectory(targetDir);

  const readmeFile = findReadmeFile(sourceDir, sourceSubDir);
  const challengeContent = getChallengeContent(readmeFile);
  const newReadmeContent = createReadmeContent(title, challengeContent);
  writeFile(path.join(targetDir, 'README.md'), newReadmeContent);

  const testCasesContent = readFileContent(
    path.join(sourceDir, sourceSubDir, 'test-cases.ts')
  );
  const templateContent = readFileContent(
    path.join(sourceDir, sourceSubDir, 'template.ts')
  );
  const newTsContent = createTsContent(testCasesContent, templateContent);
  writeFile(path.join(targetDir, 'index.ts'), newTsContent);

  console.log(`Question ${number} has been added to ${targetDir}`);
}

main();
