let models = {
	// API_KEY:"CWB-2EF6C203-2256-404D-AD80-5E9DE0982C6A",
	base_url: "https://opendata.cwb.gov.tw/api",
	Auth:"?Authorization=CWB-2EF6C203-2256-404D-AD80-5E9DE0982C6A",
	county:null,
	ForecastDatabyCounty:null,
	getForecastDatabyCounty:function(resolve){
		api = "/v1/rest/datastore/F-C0032-001";
		web_url = models.base_url + api + models.Auth + "&locationName=" + models.county;
		// console.log(web_url);
		fetch(web_url).then((response)=>{
			return response.json();
		}).then((data)=>{
			models.ForecastDatabyCounty = data;
			resolve(true);
		});
	},
};

let views = {
	renderData:function(){
		views.renderForecast.LeftBlock();
		views.renderForecast.MiddleBlock();
		views.renderForecast.RightBlock();
	},
	renderForecast:{
		LeftBlock:function(){
			// today data block
			let cityName = document.querySelector("#L_city");
			let timeRange = document.querySelector("#L_TimeRange");
			let date = document.querySelector("#L_date");
			let time = document.querySelector("#L_time");
			let weatherPic = document.querySelector("#L_WeatherPic");
			let temperature = document.querySelector("#L_temperature");
			let ranning = document.querySelector("#L_ranning");
			let comfort = document.querySelector("#L_comfort");

			//城市名
			cityName.innerText = models.ForecastDatabyCounty.records.location[0].locationName;
			//今天白天 or 今晚明晨
			let timeRange_start_hour =  parseInt(models.ForecastDatabyCounty.records.location[0].weatherElement[0].time[0].startTime.split(" ")[1].split(":")[0]);
			if(timeRange_start_hour == 0){
				timeRange.innerText = "今晚明晨";
			}else if (timeRange_start_hour == 6) {
        timeRange.innerText = "今日白天";
      }
      else{
				timeRange.innerText = "今日晚上";
			}
			//日期
			date.innerText = models.ForecastDatabyCounty.records.location[0].weatherElement[0].time[0].startTime.split(" ")[0].substr(5,10).replace("-","/");
			//時間
			let time_start = models.ForecastDatabyCounty.records.location[0].weatherElement[0].time[0].startTime.split(" ")[1].substr(0,5);
			let time_end = models.ForecastDatabyCounty.records.location[0].weatherElement[0].time[0].endTime.split(" ")[1].substr(0,5);
			time.innerText = time_start +"~" + time_end;
      //圖片
      let picNumber = models.ForecastDatabyCounty.records.location[0].weatherElement[0].time[0].parameter.parameterValue;
      //day or night
      let dayNight = "";
      if(time_start <18){
        dayNight = "day";
      }else{
        dayNight = "night";
      }
      weatherPic.src = "img/" + dayNight + "/" + picNumber.toString() + ".svg";
			//溫度
			let minTemp = models.ForecastDatabyCounty.records.location[0].weatherElement[2].time[0].parameter.parameterName;
			let maxTemp = models.ForecastDatabyCounty.records.location[0].weatherElement[4].time[0].parameter.parameterName;
			temperature.innerText = minTemp +"° - " + maxTemp + "°";
			//降雨機率
			let ranningRatio = models.ForecastDatabyCounty.records.location[0].weatherElement[1].time[0].parameter.parameterName;
			ranning.innerText = ranningRatio + "%";

			//舒適度
			let comfortIndex = models.ForecastDatabyCounty.records.location[0].weatherElement[3].time[0].parameter.parameterName;
			comfort.innerText = comfortIndex;
			//
			//
		},
		MiddleBlock:function(){
			// middle data block
			let timeRange = document.querySelector("#M_TimeRange");
			let weatherPic = document.querySelector("#M_WeatherPic");
			let temperature = document.querySelector("#M_temperature");
			let ranning = document.querySelector("#M_ranning");
			let comfort = document.querySelector("#M_comfort");

			//今天白天 or 今晚明晨
			let timeRange_start_hour =  parseInt(models.ForecastDatabyCounty.records.location[0].weatherElement[0].time[1].startTime.split(" ")[1].split(":")[0]);
			if(timeRange_start_hour == 18){
				timeRange.innerText = "今晚明晨";
			}else{
				timeRange.innerText = "明日白天";
			}
			//圖片
      let picNumber = models.ForecastDatabyCounty.records.location[0].weatherElement[0].time[1].parameter.parameterValue;
      //day or night
      //時間
			let time_start = models.ForecastDatabyCounty.records.location[0].weatherElement[0].time[1].startTime.split(" ")[1].substr(0,5);
      let dayNight = "";
      if(time_start <18){
        dayNight = "day";
      }else{
        dayNight = "night";
      }
      weatherPic.src = "img/" + dayNight + "/" + picNumber.toString() + ".svg";
      //溫度
			let minTemp = models.ForecastDatabyCounty.records.location[0].weatherElement[2].time[1].parameter.parameterName;
			let maxTemp = models.ForecastDatabyCounty.records.location[0].weatherElement[4].time[1].parameter.parameterName;
			temperature.innerText = minTemp +"° - " + maxTemp + "°";
			//降雨機率
			let ranningRatio = models.ForecastDatabyCounty.records.location[0].weatherElement[1].time[1].parameter.parameterName;
			ranning.innerText = ranningRatio + "%";
			//舒適度
			let comfortIndex = models.ForecastDatabyCounty.records.location[0].weatherElement[3].time[1].parameter.parameterName;
			comfort.innerText = comfortIndex;
			//
			//
		},
		RightBlock:function(){
			// middle data block
			let timeRange = document.querySelector("#R_TimeRange");
			let weatherPic = document.querySelector("#R_WeatherPic");
			let temperature = document.querySelector("#R_temperature");
			let ranning = document.querySelector("#R_ranning");
			let comfort = document.querySelector("#R_comfort");

			//今天白天 or 今晚明晨
			let timeRange_start_hour =  parseInt(models.ForecastDatabyCounty.records.location[0].weatherElement[0].time[2].startTime.split(" ")[1].split(":")[0]);
			if(timeRange_start_hour == 6){
				timeRange.innerText = "明日白天";
			}else{
				timeRange.innerText = "明日晚上";
			}
      //圖片
      let picNumber = models.ForecastDatabyCounty.records.location[0].weatherElement[0].time[2].parameter.parameterValue;
      //day or night
      //時間
			let time_start = models.ForecastDatabyCounty.records.location[0].weatherElement[0].time[2].startTime.split(" ")[1].substr(0,5);
      let dayNight = "";
      if(time_start <18){
        dayNight = "day";
      }else{
        dayNight = "night";
      }
      weatherPic.src = "img/" + dayNight + "/" + picNumber.toString() + ".svg";
			//溫度
			let minTemp = models.ForecastDatabyCounty.records.location[0].weatherElement[2].time[2].parameter.parameterName;
			let maxTemp = models.ForecastDatabyCounty.records.location[0].weatherElement[4].time[2].parameter.parameterName;
			temperature.innerText = minTemp +"° - " + maxTemp + "°";
			//降雨機率
			let ranningRatio = models.ForecastDatabyCounty.records.location[0].weatherElement[1].time[2].parameter.parameterName;
			ranning.innerText = ranningRatio + "%";
			//舒適度
			let comfortIndex = models.ForecastDatabyCounty.records.location[0].weatherElement[3].time[2].parameter.parameterName;
			comfort.innerText = comfortIndex;
		},
	},

};

let controllers ={
	CountySelection:function(resolve){
		let countySelect = document.querySelector("select");
    //city selected
		countySelect.addEventListener("change",()=>{
			models.county = countySelect.value;
			// console.log(models.county);
			let p = new Promise(models.getForecastDatabyCounty);
			p.then(()=>{
				// console.log(models.ForecastDatabyCounty);
				views.renderData();
			})
		});
	},
	defaultCounty:function(resolve){
		let countySelect = document.querySelector("select");
    //city selected
		models.county = countySelect.value;
		// console.log(models.county);
		let p = new Promise(models.getForecastDatabyCounty);
		p.then(()=>{
			views.renderData();
		})

	},
	init:function(){
		// let p = new Promise(controllers.CountySelection);
		// p.then(()=>{
		// 	views.renderData();
		// })
		controllers.defaultCounty();
		controllers.CountySelection();
	},
};

controllers.init();
