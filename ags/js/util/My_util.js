import { GLib, Gio, GdkPixbuf, Utils, Gdk , Variable } from "../import.js";

const divide = ([total, free]) => free / total
export const ramval = Variable(0, {
  poll: [2000, 'free', out => Math.round(divide(out.split('\n').find(line => line.includes('Mem:')).split(/\s+/).splice(1, 2))*100).toString() + "%"],
})
export const cpuval = Variable(0, {
  poll: [2000, 'top -b -n 1', out => Math.round(divide([100, out.split('\n').find(line => line.includes('Cpu(s)')).split(/\s+/)[1].replace(',', '.')])*100).toString() + "%"],
})
export const user_config = GLib.get_user_config_dir();
export const user_home = GLib.get_home_dir();
export const user_name = GLib.get_user_name();
export const time = Variable(GLib.DateTime.new_now_local(), {
  poll: [5000, () => GLib.DateTime.new_now_local()],
});

export function getTimezone() {
  const datetime = GLib.DateTime.new_now_local();
  const timezone = datetime.get_timezone();
  return `${timezone.get_identifier()}`;
}
/**
 * Checks if the network is available.
 *
 * @return {boolean} true if network is available, false otherwise
 */
export function isNetwork(text) {
  const networkMonitor = Gio.NetworkMonitor.get_default();
  if (!networkMonitor.network_available) {
    Utils.notify(`Error receiving ${text}`, "Network is not available", "network-wireless-offline-symbolic");
    return false;
  };
  return true;
};
/**
 * Checks if a program is installed on the system.
 *
 * @param {string} programName - The name of the program to check.
 * @return {boolean} True if the program is installed, false otherwise.
 */
export function checkProgramInstalled(programName) {
    const result = GLib.spawn_command_line_sync(`bash -c "which ${programName}"`);
    const decoder = new TextDecoder('utf-8');
    const output = decoder.decode(result[1]).trim();
    if (output == '') {
      Utils.notify({summary:programName, body:`Not installed.`, iconName:"dialog-error-symbolic"});
      return false;
    } 
    return true;
}
/**
 * Executes a program asynchronously.
 *
 * @param {string} programName - The name of the program to execute.
 * @return {void} This function does not return anything.
 */
export function exec_async(programName) {
    GLib.spawn_command_line_async(`bash -c ${programName}`);
}
/**
 * Executes a program synchronously and returns its output.
 *
 * @param {string} programName - The name of the program to execute.
 * @param {boolean} [needsQuotes=false] - Whether the program name needs to be enclosed in quotes.
 * @return {string} The output of the program.
 */
export function exec_sync(programName, needsQuotes = false) {
    const command = needsQuotes ? `bash -c "${programName}"` : `bash -c ${programName}`;
    const result = GLib.spawn_command_line_sync(command);
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(result[1]).trim();
}
/**
 * Lists the files in a directory.
 *
 * @param {string} path - The path to the directory to list.
 * @return {array} An array of file names in the directory.
 */
export function list_dir(path) {
    const dir = GLib.Dir.open(path, 0);
    const list = [];
    while (true) {
      const name = dir.read_name();
      if (name === null) {break;}
      list.push(name);
    }
    dir.close();
    return list;
}
/**
 * Creates a symbolic link to a file.
 *
 * @param {string} filePath - The path to the file to link to.
 * @param {string} linkPath - The path where the symbolic link will be created.
 * @return {void} This function does not return anything.
 */
export function symlink(filePath, linkPath) {
  const file_link = Gio.File.new_for_path(linkPath);
  if (file_link.query_exists(null)) {
    file_link.delete(null);
  }
  const link = file_link.make_symbolic_link(filePath, null);
  if (!link) {
      console.log("Не удалось создать ссылку");
  };
}
/**
 * Checks if a directory is empty.
 *
 * @param {string} path - The path of the directory to check.
 * @return {boolean} True if the directory is empty, false otherwise.
 */
export function is_empty(path) {
  const dir = GLib.Dir.open(path, 0);
  if (!dir.read_name()) {
    dir.close();
    return true;
  }
  dir.close();
  return false;
}
/**
 * Cashes an image by resizing it and saving it to a specified location.
 *
 * @param {string} img_path - The path to the original image.
 * @param {string} img_file - The name of the original image file.
 * @param {string} cash_path - The path where the cashed image will be saved.
 * @param {number} width - The desired width of the cashed image.
 * @param {number} height - The desired height of the cashed image.
 * @return {void} This function does not return anything.
 */
export function cash_image(img_path, img_file, cash_path, width, height) {
  // Сделать из нее  субпроцесс
  const pixbuf = GdkPixbuf.Pixbuf.new_from_file_at_scale(`${img_path}/${img_file}`,width,height,false);
  if (!pixbuf) {
    console.log("Не удалось загрузить изображение"); 
    return;
  };
  const outputStream = Gio.File.new_for_path(`${cash_path}/${img_file}`).replace(null, false, Gio.FileCreateFlags.NONE, null);
  pixbuf.save_to_streamv(outputStream, "jpeg", null, null, null);
  outputStream.close(null);
}
/**
 * Deletes a file.
 *
 * @param {string} path - The directory path of the file to delete.
 * @param {string} file - The name of the file to delete.
 * @return {void} This function does not return anything.
 */
export function del_file(path, file) {
  GLib.unlink(`${path}/${file}`);
}
/**
 * Returns the local time formatted according to the specified format.
 *
 * @param {number} timestamp - The Unix timestamp representing the local time.
 * @param {string} format - The format string for the desired time format.
 * @return {string} The formatted local time.
 */
export function get_local_time(timestamp, format) {
  return GLib.DateTime.new_from_unix_local(timestamp).format(format);
}
/**
 * Retrieves a list of available software updates.
 *
 * @return {Promise<string>} A promise that resolves with a JSON string containing an array of objects, each representing a package with its name, architecture, version, and repository.
 */
export function get_updates() {
  return new Promise((resolve, reject) => {
    const [success, stdout, stderr, exitStatus] = GLib.spawn_command_line_sync(`bash -c "dnf -q check-update"`);
    const decoder = new TextDecoder('utf-8');

    if (success) {
      const output = decoder.decode(stdout);
      const lines = output.trim().split("\n");
      const packages = [];

      lines.forEach((line) => {
        const parts = line.trim().split(/\s+/);
        const packageName = parts[0].split(".")[0];
        const packageArch = parts[0].split(".")[1];
        const packageVersion = parts[1];
        const packageRepository = parts[2];

        if (packageName !== "") {
          packages.push({
            name: packageName,
            arch: packageArch,
            version: packageVersion,
            repository: packageRepository,
          });
        };
      });

      resolve(JSON.stringify(packages, null, 2));
    } else {
      reject(decoder.decode(stderr));
    }
  });
}
/**
 * Retrieves detailed information about a package.
 *
 * @param {string} package_name - The name of the package to retrieve information about.
 * @return {Promise<string>} A promise that resolves with a JSON string containing an object with package information.
 */
export function get_package_info(package_name) {
  return new Promise((resolve, reject) => {
    const [success, stdout, stderr, exitStatus] = GLib.spawn_command_line_sync(`bash -c "dnf -q info --upgrades ${package_name}"`);
    const decoder = new TextDecoder('utf-8');

    if (success) {
      const text = decoder.decode(stdout);

      const packages = text.split(/\n\n/)[0];

      const lines = packages.split('\n').slice(1);

      const package_name = lines[0].split(': ')[1];
      const version = lines[1].split(': ')[1];
      const size = lines[4].split(': ')[1];
      let descr = lines[10].split(': ')[1];
      for (let i = 11; i < lines.length; i++) {
        descr += lines[i].trim() + ' ';
      }

      descr = descr.replace(/[\n\t:]/g, '').trim();

      const result = {
        name: package_name,
        version: version,
        size: size,
        description: descr
      };
    
      resolve(JSON.stringify(result, null, 2));
    } else {
      reject(decoder.decode(stderr));
    }
  });
}
/**
 * Retrieves the current screen resolution.
 *
 * @return {Object} An object containing the width and height of the screen.
 */
export function get_screen_resolution() {
  const screen = Gdk.Screen.get_default();
  return {"width":screen.get_width(), "height":screen.get_height()};
}