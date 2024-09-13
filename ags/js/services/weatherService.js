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
        url: ["string"],
        update: ["string"],
        status: ["boolean"],
      }
    );
  }

  _weather_data = {};
  _url = "";
  _update = "";
  _status = false;

  get weather_data() {
    return this._weather_data;
  }

  get update() {
    return this._update;
  }

  get status() {
    return this._status;
  }

  constructor() {
    super();
    Utils.timeout(2000, () => {
      // Utils.interval(3600000, this._getWeather.bind(this));
      this._fileWeather();
    });
  }
  _getWeather() {
    if (!isInstalled("curl")) return;
    if (!isNetwork("weather data")) {
      this._fileWeather();
      return;
    };
    const api_key = options.accuwearther.api_key;
    const city = options.accuwearther.city;
    const language = options.accuwearther.language;
    const command = `curl -s 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city}?apikey=${api_key}&language=${language}&details=true&metric=true'`;

    Utils.execAsync(["bash", "-c", `${command}`]).then((result) => {
      Utils.writeFile(result, options.paths.weather).catch(err => print(err))
      const weather_json = JSON.parse(result);
      this.updateProperty("weather_data", weather_json);
      const hours = new Date().getHours().toString().padStart(2, "0");
      const minutes = new Date().getMinutes().toString().padStart(2, "0");
      this.updateProperty("update", `${hours}:${minutes}`);
      this.updateProperty("status", true);
    });
  }
  _fileWeather() {
    const jsonPath = isFile(options.paths.weather) ? options.paths.weather : options.paths.test_json;
    Utils.notify({
      summary: "Error receiving weather data",
      body: `Used old weather data from ${jsonPath}`,
      iconName: "gis-weather-symbolic",
    }).catch((error) => {console.error(error)});
    Utils.readFileAsync(jsonPath).then((result) => {
      const weather_json = JSON.parse(result);
      this.updateProperty("weather_data", weather_json);
      const hours = new Date().getHours().toString().padStart(2, "0");
      const minutes = new Date().getMinutes().toString().padStart(2, "0");
      this.updateProperty("update", `${hours}:${minutes}`);
      this.updateProperty("status", true);
    });
  }
}
export default new WeatherService();
