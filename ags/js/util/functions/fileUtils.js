import GLib from "gi://GLib";
import Gio from "gi://Gio";

export function isDirectoryEmpty(directoryPath) {
  const directory = GLib.Dir.open(directoryPath, 0);
  const hasFiles = !!directory.read_name();
  directory.close();
  return !hasFiles;
}
export function fileExists(filePath) {
  const file = Gio.File.new_for_path(filePath);
  return file.query_exists(null);
}
export function delFile(path, file) {
  GLib.unlink(`${path}/${file}`);
}
export function runAsync(programName) {
  GLib.spawn_command_line_async(`bash -c ${programName}`);
}
export function run(programName, needsQuotes = false) {
  const command = needsQuotes
    ? `bash -c "${programName}"`
    : `bash -c ${programName}`;
  const result = GLib.spawn_command_line_sync(command);
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(result[1]).trim();
}
export function copyFile(source, destination) {
  return new Promise((resolve, reject) => {
    let sourceFile = Gio.File.new_for_path(source);
    let destinationFile = Gio.File.new_for_path(destination);
    sourceFile.copy(destinationFile,Gio.FileCopyFlags.OVERWRITE,null,
      (file, result) => {if (result) {
          resolve(`Файл ${source} скопирован в ${destination}`);
        } else {
          reject(`Ошибка копирования файла: ${file}`);
        }
      }
    );
  });
}
export function listFiles(directoryPath) {
  const dir = GLib.Dir.open(directoryPath, 0);
  const fileList = [];
  let fileName;
  while ((fileName = dir.read_name()) !== null) {
    fileList.push(fileName);
  }
  dir.close();
  return fileList;
}
export function createSymbolicLink(sourcePath, linkPath) {
  const linkFile = Gio.File.new_for_path(linkPath);
  if (linkFile.query_exists(null)) {
    linkFile.delete(null);
  }
  const success = linkFile.make_symbolic_link(sourcePath, null);
  if (!success) {
    console.error(`Failed to create symbolic link: ${linkPath}`); 
  }
}