import path from 'path';
import fs from 'fs';

export const getDocuments = (directory: string) => {
  const directoryPath = path.join(process.cwd(), `documents/${directory}`);
  const fileNames = fs.readdirSync(directoryPath);

  return fileNames.map((fileName) => fileName.replace('.md', ''));
};

export const getDocumentContent = (fileName: string) => {
  const filePath = path.join(process.cwd(), `documents/${fileName}.md`);
  const file = fs.readFileSync(filePath);

  return file.toString();
};
