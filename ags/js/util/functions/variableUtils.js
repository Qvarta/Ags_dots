import GLib from "gi://GLib";
import { getUpTime} from "./systemUtils.js";
import options from "../../options.js";

export const scss = `${App.configDir}/style.scss`;
export const css = `/tmp/my-style.css`;
export const initialConfig = JSON.parse(Utils.readFile(options.paths.settings));

const divide = ([total, free]) => free / total;

export const ramval = Variable(0, {
  poll: [
    2000,
    "free",
    (out) =>
      Math.round(
        divide(
          out
            .split("\n")
            .find((line) => line.includes("Mem:"))
            .split(/\s+/)
            .splice(1, 2)
        ) * 100
      ).toString() + "%",
  ],
});
export const cpuval = Variable(0, {
  poll: [
    2000,
    "top -b -n 1",
    (out) =>
      Math.round(
        divide([
          100,
          out
            .split("\n")
            .find((line) => line.includes("Cpu(s)"))
            .split(/\s+/)[1]
            .replace(",", "."),
        ]) * 100
      ).toString() + "%",
  ],
});
export const upTime = Variable(0, {
  poll: [60000, () => getUpTime()],
});
export const time = Variable(GLib.DateTime.new_now_local(), {
  poll: [5000, () => GLib.DateTime.new_now_local()],
});

export const user = {
  name: GLib.get_user_name(),
  data: GLib.get_user_data_dir(),
  config: GLib.get_user_config_dir(),
  home: GLib.get_home_dir(),
};
export const distro = {
  id: GLib.get_os_info("ID"),
  logo: GLib.get_os_info("LOGO"),
};
