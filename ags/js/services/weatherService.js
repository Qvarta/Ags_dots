import { Utils, Service } from "../import.js";
import options from "../options.js";
import { isNetwork, checkProgramInstalled } from "../util/My_util.js";
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
      Utils.interval(3600000, this._getWeather.bind(this)); //uncomment this line to use accuweather.com
      // this._testWeather(); //comment this line to use accuweather.com
    });
  }
  /* Not working */
  // _getWeather() {
  //   const api_key = options.accuwearther.api_key;
  //   const city = options.accuwearther.city;
  //   const language = options.accuwearther.language;
  //   this._url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city}?apikey=${api_key}&language=${language}&details=true&metric=true`;
  //   Utils.timeout(4000, () => {
  //     if (!isNetwork("weather data")) return;
  //     // Utils.readFileAsync(options.paths.test_json)
  //     Utils.fetch(this._url)
  //       .then((result) => {
  //         const weather_json = JSON.parse(result);
  //         this.updateProperty("weather_data", weather_json);
  //         const hours = new Date().getHours().toString().padStart(2, "0");
  //         const minutes = new Date().getMinutes().toString().padStart(2, "0");
  //         this.updateProperty("update", `${hours}:${minutes}`);
  //         this.updateProperty("status", true)
  //       })
  //       .catch((error) => console.log(error));
  //   });
  // }
  _getWeather() {
    if (!checkProgramInstalled("curl")) return;
    const api_key = options.accuwearther.api_key;
    const city = options.accuwearther.city;
    const language = options.accuwearther.language;
    const command = `curl -s 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city}?apikey=${api_key}&language=${language}&details=true&metric=true'`;

    if (!isNetwork("weather data")) return;
    Utils.execAsync(["bash", "-c", `${command}`]).then((result) => {
      const weather_json = JSON.parse(result);
      this.updateProperty("weather_data", weather_json);
      const hours = new Date().getHours().toString().padStart(2, "0");
      const minutes = new Date().getMinutes().toString().padStart(2, "0");
      this.updateProperty("update", `${hours}:${minutes}`);
      this.updateProperty("status", true);
    });
  }
  _testWeather() {
    Utils.notify({
      summary: "Used test JSON",
      body: `For use accuweather.com uncomment the line in weatherService.js. Change city, language and api_key in options.js`,
      iconName: "dialog-information-symbolic",
    }).catch((error) => {console.error(error)});
    Utils.readFileAsync(options.paths.test_json).then((result) => {
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
