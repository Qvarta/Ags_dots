// @ts-nocheck

import { Service, Utils} from "../import.js";
import {isNetwork, get_updates, get_package_info} from "../util/helpers.js";

class CheckUpadesService extends Service {
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
    get_package_info(package_name).then((result) => {
      const { name, size, description } = JSON.parse(result);
      this._name = name;
      this._size = size;
      this._description = description;

      this.changed("name");
      this.changed("size");
      this.changed("description");

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
    Utils.interval(7200000, this._getUpdates.bind(this));
  }
  _getUpdates() {
    Utils.timeout(5000, () => {
      if (!isNetwork("updates")) return;
      get_updates().then((json) => {
        this._updates = JSON.parse(json);
        this.changed("updates");
      }).catch((error) => {console.error(error)});
    })
  }
}

export default new CheckUpadesService();
