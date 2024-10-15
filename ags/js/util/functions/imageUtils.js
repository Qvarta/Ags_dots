import Gdk from "gi://Gdk?version=3.0";
import GdkPixbuf from "gi://GdkPixbuf";
import Gio from "gi://Gio";

export function getImageSize(path) {
    try {
      const file = Gio.File.new_for_path(path);
      const pixbuf = GdkPixbuf.Pixbuf.new_from_file(file.get_path());
      const { width, height } = pixbuf;
      return({ width, height});
    } catch (error) {
      console.error(error);
    }
}
export function cacheImage(img_path, cash_path, width, height) {
  try{
    const pixbuf = GdkPixbuf.Pixbuf.new_from_file_at_scale(
      img_path,
      width,
      height,
      false
    );
    const outputStream = Gio.File.new_for_path(cash_path).replace(
      null,
      false,
      Gio.FileCreateFlags.NONE,
      null
    );
    pixbuf.save_to_streamv(outputStream, "png", null, null, null);
    outputStream.close(null);
  } catch (error) {
    return;
  }
}
export function getScreenResolution() {
  const screen = Gdk.Screen.get_default();
  return { width: screen.get_width(), height: screen.get_height() };
}
