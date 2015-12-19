(function() {
  loadOptions();
  setHandlers();
})();

function setHandlers() {
  var $apiKey = $('#apiKey');
  $apiKey.on('change', function() {
    $apiKey[0].value = $apiKey[0].value.replace(/\W/g, "");
  });

  var $latitude = $('#latitude');
  $latitude.on('change', function() {
    $latitude[0].value = $latitude[0].value.replace(/[^0-9.+-]/g, "");
  });

  var $longitude = $('#longitude');
  $longitude.on('change', function() {
    $longitude[0].value = $longitude[0].value.replace(/[^0-9.+-]/g, "");
  });

  var $submitButton = $('#submitButton');
  $submitButton.on('click', function() {
    console.log('Submit');

    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  var $apiKey = $('#apiKey');
  if (localStorage.apiKey) {
    $apiKey[0].value = localStorage.apiKey;
  }

  var $gps = $('#gps');
  if (localStorage.gps) {
    $gps[0].value = localStorage.gps;
  }

  var $latlon = $('#latlon');
  if (localStorage.latlon) {
    $latlon[0].value = localStorage.latlon;
  }

  var $latitude = $('#latitude');
  if (localStorage.latitude) {
    $latitude[0].value = localStorage.latitude;
  }

  var $longitude = $('#longitude');
  if (localStorage.longitude) {
    $longitude[0].value = localStorage.longitude;
  }

  var $frequency = $('#frequency');
  if (localStorage.frequency) {
    $frequency[0].value = localStorage.frequency;
  }

  var $showMoonPhase = $('#showMoonPhase');
  if (localStorage.showMoonPhase) {
    $showMoonPhase[0].checked = localStorage.showMoonPhase === 'true';
  }

  var $showLocation = $('#showLocation');
  if (localStorage.showLocation) {
    $showLocation[0].checked = localStorage.showLocation === 'true';
  }

  var $showUpdateTime = $('#showUpdateTime');
  if (localStorage.showUpdateTime) {
    $showUpdateTime[0].checked = localStorage.showUpdateTime === 'true';
  }

  var $colorBackground = $('#colorBackground');
  if (localStorage.colorBackground) {
    $colorBackground[0].value = localStorage.colorBackground;
  }

  var $colorHourHand = $('#colorHourHand');
  if (localStorage.colorHourHand) {
    $colorHourHand[0].value = localStorage.colorHourHand;
  }

  var $colorMinuteHand = $('#colorMinuteHand');
  if (localStorage.colorMinuteHand) {
    $colorMinuteHand[0].value = localStorage.colorMinuteHand;
  }
}

function getAndStoreConfigData() {
  var $apiKey = $('#apiKey');
  var $gps = $('#gps');
  var $latlon = $('#latlon');
  var $latitude = $('#latitude');
  var $longitude = $('#longitude');
  var $frequency = $('#frequency');
  var $showMoonPhase = $('#showMoonPhase');
  var $showLocation = $('#showLocation');
  var $showUpdateTime = $('#showUpdateTime');
  var $colorBackground = $('#colorBackground');
  var $colorHourHand = $('#colorHourHand');
  var $colorMinuteHand = $('#colorMinuteHand');

  var options = {
    apiKey: $apiKey.val().replace(/\W/g, ""),
    useLatLon: $latlon[0].checked,
    latitude: $latitude.val(),
    longitude: $longitude.val(),
    frequency: $frequency.val(),
    showMoonPhase: $showMoonPhase[0].checked,
    showLocation: $showLocation[0].checked,
    showUpdateTime: $showUpdateTime[0].checked,
    colorBackground: $colorBackground.val(),
    colorHourHand: $colorHourHand.val(),
    colorMinuteHand: $colorMinuteHand.val()
  };

  localStorage.apiKey = options.apiKey;
  localStorage.useLatLon = options.useLatLon;
  localStorage.latitude = options.latitude;
  localStorage.longitude = options.longitude;
  localStorage.frequency = options.frequency;
  localStorage.showMoonPhase = options.showMoonPhase;
  localStorage.showLocation = options.showLocation;
  localStorage.showUpdateTime = options.showUpdateTime;
  localStorage.colorBackground = options.colorBackground;
  localStorage.colorHourHand = options.colorHourHand;
  localStorage.colorMinuteHand = options.colorMinuteHand;

  console.log('Got options: ' + JSON.stringify(options));
  return options;
}

function getQueryParam(variable, defaultValue) {
  var query = location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}
