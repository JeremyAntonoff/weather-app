$(document).ready(function() {
	var location = $("#location");
	var condition = $("#condition");
	var temp = $("#temp");


	//get location
	getCord();

	function weather(lat, longi) {
		$.ajax({
			url: "https://api.wunderground.com/api/576aa22e2f9685db/conditions/q/" + lat + "," + longi + ".json",
			dataType: "jsonp",
			success: function(weather) {
				location.append(weather.current_observation.display_location.city + ", " + weather.current_observation.display_location.state_name);
				var icon = "'" + weather.current_observation.icon_url + "'"
				condition.append('<img src =' + icon + '>' + weather.current_observation.weather);
				temp.append(weather.current_observation.temp_f + "F");
				//set background
				backGround(weather);
				//far/cel button function
				click(weather);
			}
		})
	}

	function backGround(weather) {
		if (weather.current_observation.weather.indexOf("Cloud") > 0) {
			$("body").addClass("cloudy");
		} else if (weather.current_observation.weather.indexOf("Clear") >= 0) {
			$("body").addClass("clear");
		} else if (weather.current_observation.weather.indexOf("Rain") > 0) {
			$("body").addClass("rain");
		} else if (weather.current_observation.weather.indexOf("Snow") > 0) {
			$("body").addClass("snow");
		} else if (weather.current_observation.weather.indexOf("Over") >= 0) {
			$("body").addClass("cloudy");
		}
	}

	function getCord(lat,longi) {
		var cordArray;
		navigator.geolocation.getCurrentPosition(function(location) {
  		lat = location.coords.latitude
  		longi = location.coords.longitude;
			return weather(lat,longi)
		});
	}


function click(weather) {
	var convert = $("#convert")
	var ifFar = true
	convert.on("click", function() {
		if (ifFar) {
			temp.text("Temperature: " + weather.current_observation.temp_c + "C");
			ifFar = false;
		} else {
			temp.text("Temperature: " + weather.current_observation.temp_f + "F")
			ifFar = true;
		}
	})
}

});



