import GLib from "gi://GLib";
import Gio from "gi://Gio";

export function getUpTime() {
  const uptimeStr = Utils.exec("uptime");
  return uptimeStr.split(",")[0].split("up")[1];
}
export function getTimezone() {
  const datetime = GLib.DateTime.new_now_local();
  const timezone = datetime.get_timezone();
  return `${timezone.get_identifier()}`;
}
export function getLocalTime(timestamp, format) {
  return GLib.DateTime.new_from_unix_local(timestamp).format(format);
}
export function isNetwork(text) {
  const networkMonitor = Gio.NetworkMonitor.get_default();
  if (!networkMonitor.network_available) {
    console.warn(`Network is not available. Disable module: ${text}`);
    return false;
  }
  return true;
}
export function isVPN() {
  if (Utils.exec(`bash -c "ps aux | grep wireguard | grep -v grep"`)) {
    return true;
  }
  return false;
}
export function vpnToggle (){
}
export function isInstalled(programName) {
  const result = GLib.spawn_command_line_sync(`bash -c "which ${programName}"`);
  const decoder = new TextDecoder("utf-8");
  const output = decoder.decode(result[1]).trim();
  if (output == "") {
    Utils.notify({
      summary: programName,
      body: `Not installed.`,
      iconName: "dialog-error-symbolic",
    });
    return false;
  }
  return true;
}
export function getGtkTheme() {
  const theme = Utils.exec(`bash -c "gsettings get org.gnome.desktop.interface gtk-theme"`);
  return theme.trim().split('\'')[1];
}
export function isProcessRunning(processName) {
  if (Utils.exec(`bash -c "ps aux | grep ${processName} | grep -v grep"`)) {
    return true;
  }
  return false;
}

