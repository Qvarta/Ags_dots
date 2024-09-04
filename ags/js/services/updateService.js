import { Service, Utils} from "../import.js";
import {isNetwork, get_updates} from "../util/My_util.js";

class CheckUpadesService extends Service {
  static {
    Service.register(
      this,
      {},
      {
        updates: ["jsobject", "rw"],
      }
    );
  }

  _updates= [];
  get updates() {
    return this._updates;
  }

  get isUpdate() {
    return this._isUpdate;
  }

  constructor() {
    super();
    Utils.interval(7200000, this._getUpdates.bind(this));
  }
  _getUpdates() {
    Utils.timeout(6000, () => {
      if (!isNetwork("updates")) return;
      get_updates().then((json) => {
        this._updates = JSON.parse(json);
        this.changed("updates");
      }).catch((error) => {console.error(error)});
    })
  }
}

export default new CheckUpadesService();
