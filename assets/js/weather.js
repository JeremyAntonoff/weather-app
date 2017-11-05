$(document).ready(function() {
  const location = $('#location');
  const condition = $('#condition');
  const temp = $('#temp');

  //get location
  getCord();
  function weather(lat, longi) {
    $.ajax({
      url: `https://api.wunderground.com/api/576aa22e2f9685db/conditions/q/${lat},${longi}.json`,
      dataType: 'jsonp'
    })
      .then(appendWeather)
      .catch(appendError);
  }

  function appendWeather({ current_observation }) {
    const icon = `'${current_observation.icon_url}'`;
    location.append(
      `${current_observation.display_location.city},&nbsp;${current_observation
        .display_location.state_name}`
    );
    condition.append(`<img src = ${icon}>${current_observation.weather}`);
    temp.append(`${current_observation.temp_f}&nbsp;F`);
    backGround(current_observation);
    switchTemp(current_observation);
  }

  function appendError() {
    temp
      .html(`Something went wrong! Please try again later.`)
      .css('color', '#7d0900');
  }

  function backGround(current) {
    if (current.weather.indexOf('Cloud') > 0) {
      $('body').addClass('cloudy');
    } else if (current.weather.indexOf('Clear') >= 0) {
      $('body').addClass('clear');
    } else if (current.weather.indexOf('Rain') > 0) {
      $('body').addClass('rain');
    } else if (current.weather.indexOf('Snow') > 0) {
      $('body').addClass('snow');
    } else if (current.weather.indexOf('Over') >= 0) {
      $('body').addClass('cloudy');
    }
  }

  function getCord(lat, longi) {
    let cordArray;
    navigator.geolocation.getCurrentPosition(location => {
      lat = location.coords.latitude;
      longi = location.coords.longitude;
      return weather(lat, longi);
    });
  }

  function switchTemp(current) {
    const convert = $('#convert');
    let ifFar = true;
    convert.on('click', () => {
      if (ifFar) {
        temp.text(`Temperature: ${current.temp_c} C`);
        ifFar = false;
      } else {
        temp.text(`Temperature: ${current.temp_f} F`);
        ifFar = true;
      }
    });
  }
});
