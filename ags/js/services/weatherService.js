// @ts-nocheck
import options from "../options.js";
import { isNetwork, isInstalled} from "../util/functions/systemUtils.js";
import { fileExists } from "../util/functions/fileUtils.js";
import { initialConfig } from "../util/functions/variableUtils.js";
class WeatherService extends Service {
  static {
    Service.register(
      this,
      {},
      {
        weather_data: ["jsobject"],
        city_data: ["array", "rw"],
        city: ["string", "rw"],
        key: ["string", "rw"],
        lang: ["string", "rw"],
        code: ["string", "rw"],
        url: ["string"],
        update: ["string"],
        status: ["boolean"],
      }
    );
  }

  _city_data = [];
  _weather_data = {};
  _url = "";
  _update = "";
  _status = false;
  _city = "";
  _key = "";
  _lang = "";
  _code = "";
  get city() {
    return this._city;
  }
  get weather_data() {
    return this._weather_data;
  }
  get city_data() {
    return this._city_data;
  }
  get update() {
    return this._update;
  }
  get status() {
    return this._status;
  }
  set area(city) {
    const encodedCity = encodeURIComponent(city);
    const command = `curl -s 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this._key}&q=${encodedCity}&language=${this._lang}'`;
    Utils.execAsync(["bash", "-c", `${command}`]).then((result) => {
      const city_json = JSON.parse(result)
      const city_list = city_json.map(item => ({
        code: item.Key,
        name: item.LocalizedName,
        country: item.Country.ID,
        administrativeArea: item.AdministrativeArea.LocalizedName
    }));
    this.updateProperty("city_data", city_list);
    }).catch(err => print(err));
  }
  set city ([name, code]) {
    this.updateProperty("city", name);
    this.updateProperty("code", code);
    this.updateProperty("city_data", []);
  }
  set request (name) {
    const data = JSON.parse(Utils.readFile(options.paths.settings));
    data.city = name;
    data.cityCode = this._code;
    data.apiKey = this._key;
    data.language = this._lang;
    const jsonData = JSON.stringify(data);
    print (jsonData);
    Utils.writeFile(jsonData, options.paths.settings).catch(err => print(err));
    this._newWeather();
  }
  constructor() {
    super();
    this._city = initialConfig.city;
    this._key = initialConfig.apiKey;
    this._lang = initialConfig.language;
    this._code = initialConfig.cityCode;
    Utils.interval(3600000, this._newWeather.bind(this));
    // this._oldWeather();
  }
  _newWeather() {
    this.updateProperty("status", false)
    if (!isInstalled("curl")) return;
    if (!isNetwork("Weather service")) {
      this._oldWeather();
      return;
    };
    const command = `curl -s 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this._code}?apikey=${this._key}&language=${this._lang}&details=true&metric=true'`;
    Utils.execAsync(["bash", "-c", `${command}`]).then((result) => {
      const weather_json = JSON.parse(result);
      if (weather_json.DailyForecasts !== undefined){
        this.updateProperty("weather_data", weather_json);
        this.updateProperty("status", true);
        Utils.ensureDirectory(options.paths.weather);
        Utils.writeFile(result, `${options.paths.weather}/weather.json`).catch(err => print(err));
        const hours = new Date().getHours().toString().padStart(2, "0");
        const minutes = new Date().getMinutes().toString().padStart(2, "0");
        this.updateProperty("update", `${hours}:${minutes}`);
      };
    }).catch(err => print(err));
  }
  _oldWeather() {
    const jsonPath = `${options.paths.weather}weather.json`
    if (!fileExists(jsonPath)) return;
    Utils.readFileAsync(jsonPath).then((result) => {
      const weather_json = JSON.parse(result);
      this.updateProperty("weather_data", weather_json);
      this.updateProperty("update", "--.--");
      this.updateProperty("status", true);
    });
  }
}
export default new WeatherService();
