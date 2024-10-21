// @ts-nocheck
import { fileExists } from "../util/functions/fileUtils.js";
import { isInstalled, isNetwork, isProcessRunning} from "../util/functions/systemUtils.js";
import { initialConfig } from "../util/functions/variableUtils.js";
import options from "../options.js";
class Radio extends Service {
  static {
    Service.register(
      this,
      {},
      {
        station: ["string", "rw"],
        url: ["string", "rw"],
        enabled: ["bool", "rw"],
        stations: ["array", "rw"],
      }
    );
  }
  _stations = [];
  _station = "No Station";
  _url = "";
  _jsonPath = options.paths.radio;
  _enabled = false;
  get enabled() {
    return this._enabled;
  }
  get station() {
    return this._station;
  }
  get stations() {
    return this._stations;
  }
  set station([name, url]) {
    if (!isNetwork()) {
      console.error('Network is not available');
      return;
    }
    this._station = name;
    this.changed("station");
    this._url = url;
    this.changed("url");
  }
  constructor() {
    super();
    this._enabled = isProcessRunning("vlc");
    this._jsonPath = initialConfig.radioJSON;
    this.enableService();
  }
  enableService() {
    if (!isInstalled("vlc") || !fileExists(this._jsonPath)) return;
    Utils.readFileAsync(this._jsonPath).then((result) => {
      const stations_json = JSON.parse(result);
      this.updateProperty("stations", stations_json);
    });
  }
  toggleService() {
    if (this._enabled) {
      Utils.exec("pkill vlc");
      this._enabled = false;
      this.changed("enabled");
    }else{
     this.playStation();
    };
  }
  playStation() {
    if(isProcessRunning("vlc")) Utils.exec("pkill vlc");
    if (this._url === "") return;
    Utils.execAsync(['bash', '-c', `cvlc ${this._url} &`]);
    this._enabled = true;
    this.changed("enabled");
  }
}

export default new Radio();
