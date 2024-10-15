// @ts-nocheck
import {isNetwork} from "../util/functions/systemUtils.js";
import { getUpdates,getPackageInfo } from "../util/functions/updatesUtils.js";
class UpadesService extends Service {
  static {
    Service.register(
      this,
      {},
      {
        updates: ["jsobject", "rw"],
        name: ["string", "rw"],
        size: ["string", "rw"],
        description: ["string", "rw"],
      }
    );
  }
  _name = "searching...";
  _size = "";
  _description = "";
  _updates= [];

  set reset(emptyString) {
    this._description = emptyString;
    this.changed("description");
  }
  set info (package_name) {
    getPackageInfo(package_name).then((result) => {
      const { name, size, description } = JSON.parse(result);
      this.updateProperty("name", name);
      this.updateProperty("size", size);
      this.updateProperty("description", description);
    }).catch(console.error);
  }
  get updates() {
    return this._updates;
  }
  get name() {
    return this._name;
  }
  get size() {
    return this._size;
  }
  get description() {
    return this._description;
  }
  constructor() {
    super();
    this._getUpdates();
  }
  _getUpdates() {
    Utils.timeout(5000, () => {
      if (!isNetwork("Update Service")) return;
      getUpdates().then((json) => {
        this._updates = JSON.parse(json);
        this.changed("updates");
      }).catch((error) => {console.error(error)});
    })
  }
  _update() {
    Utils.execAsync(["sh", "-c", "kitty -e sudo dnf update"]).catch((error) => console.error(error));
  }
}

export default new UpadesService();
