// @ts-nocheck

import { Utils, Service } from "../import.js";
import options from "../options.js";
import { isNetwork, isInstalled, isFile } from "../util/helpers.js";
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
  get key() {
    return this._key;
  }
  get lang() {
    return this._lang;
  }
  get city() {
    return this._city;
  }
  set area([key, city, lang]) {
    const encodedCity = encodeURIComponent(city);
    const command = `curl -s 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${encodedCity}&language=${lang}'`;
    Utils.execAsync(["bash", "-c", `${command}`]).then((result) => {
      const city_json = JSON.parse(result)
      const city_list = city_json.map(item => ({
        code: item.Key,
        name: item.LocalizedName,
        country: item.Country.ID,
        administrativeArea: item.AdministrativeArea.LocalizedName
    }));
    this.updateProperty("city_data", city_list);
    // console.log(city_list);
    }).catch(err => print(err));
  }
  set city ([name, code]) {
    this.updateProperty("city", name);
    this.updateProperty("code", code);
    this.updateProperty("city_data", []);
  }
  set request ([name, key, lang]) {
    const data = {
      code: this._code,
      name: name,
      key: key,
      lang: lang
    };
    const jsonData = JSON.stringify(data);
    Utils.ensureDirectory(options.paths.request);
    Utils.writeFile(jsonData, `${options.paths.request}/request.json`).catch(err => print(err));

    this.updateProperty("city", data.name);
    this.updateProperty("code", data.code);
    this.updateProperty("key", data.key);
    this.updateProperty("lang", data.lang);
    this._newWeather();
  }
  constructor() {
    super();
    this._readArea();
    Utils.timeout(2000, () => {
      // Utils.interval(3600000, this._newWeather.bind(this));
      this._oldWeather();
    });
  }
  _readArea() {
    const area = `${options.paths.request}/request.json`;
    if (isFile(area)){
      const data = JSON.parse(Utils.readFile(area));
      this.updateProperty("city", data.name);
      this.updateProperty("code", data.code);
      this.updateProperty("key", data.key);
      this.updateProperty("lang", data.lang);
      return true;
    }
    return false;
  }
  _newWeather() {
    this.updateProperty("status", false)
    if (!isInstalled("curl")) return;
    if (!isNetwork("weather")) {
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
      };
      const hours = new Date().getHours().toString().padStart(2, "0");
      const minutes = new Date().getMinutes().toString().padStart(2, "0");
      this.updateProperty("update", `${hours}:${minutes}`);
    }).catch(err => print(err));
  }
  _oldWeather() {
    const jsonPath = `${options.paths.weather}weather.json`
    if (!isFile(jsonPath)) return;
    Utils.notify({
      summary: "Error receiving weather",
      body: `Used old weather data from ${jsonPath}`,
      iconName: "gis-weather-symbolic",
    }).catch((error) => {console.error(error)});
    Utils.readFileAsync(jsonPath).then((result) => {
      const weather_json = JSON.parse(result);
      this.updateProperty("weather_data", weather_json);
      this.updateProperty("update", "--.--");
      this.updateProperty("status", true);
    });
  }
}
export default new WeatherService();
