var versionLabel = 100;

(function() {
  loadOptions();
  setHandlers();
})();

function setHandlers() {
  var $apiKey = $('#apiKey');
  $apiKey.on('change', function() {
    $apiKey[0].value = $apiKey[0].value.replace(/\W/g, "");
  });

  var $gps = $('#gps');
  $gps.on('change', function() {
    var $latlonSettings = $('#latlon-settings');
    if ($gps[0].checked) {
      $latlonSettings.css('display', 'none');
    }
  });

  var $latlon = $('#latlon');
  $latlon.on('change', function() {
    var $latlonSettings = $('#latlon-settings');
    if ($latlon[0].checked) {
      $latlonSettings.css('display', '');
    }
  });

  var $latitude = $('#latitude');
  $latitude.on('change', function() {
    $latitude[0].value = $latitude[0].value.replace(/[^0-9.+-]/g, "");
  });

  var $longitude = $('#longitude');
  $longitude.on('change', function() {
    $longitude[0].value = $longitude[0].value.replace(/[^0-9.+-]/g, "");
  });

  var $reloadDefaultColors = $('#reloadDefaultColors');
  $reloadDefaultColors.on('click', function() {
    console.log('Reload Default Colors');

    localStorage.colorBackground = '0x000000';
    localStorage.colorText = '0xFFFFFF';
    localStorage.colorHourHand = '0xFFFFFF';
    localStorage.colorMinuteHand = '0x55AAFF';
    localStorage.colorMinuteHandNoBT = '0xFF5500';
    localStorage.colorHourMarkers = '0xFFFFFF';
    localStorage.colorMinorMarkers = '0xFFFFFF';
    location.reload();
  });

  var $submitButton = $('#submitButton');
  $submitButton.on('click', submit);

  var $submitButton2 = $('#submitButton2');
  $submitButton2.on('click', submit);
}

function submit() {
  console.log('Submit');

  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
}

function loadOptions() {
  var callerVersion = parseInt(getQueryParam('version', 0));
  var storageVersion = localStorage.versionLabel;

  var platform = getQueryParam('platform', 'chalk');
  if (platform == 'aplite') {
    $colorSettings = $('#colorSettings');
    $colorSettings.css('display', 'none');
  }

  var $apiKey = $('#apiKey');
  if (localStorage.apiKey) {
    $apiKey[0].value = localStorage.apiKey;
  }

  var $gps = $('#gps');
  var $latlon = $('#latlon');
  var $latitude = $('#latitude');
  var $longitude = $('#longitude');
  var $latlonSettings = $('#latlon-settings');
  if (localStorage.useLatLon) {
    if (localStorage.useLatLon === 'true') {
      $gps[0].checked = false;
      $latlon[0].checked = true;
    } else {
      $gps[0].checked = true;
      $latlon[0].checked = false;
    }
  }
  if ($gps[0].checked) {
    $latlonSettings.css('display', 'none');
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
    //$frequencySlider[0].value = localStorage.frequency;
  }

  var $displayLocation = $('#displayLocation');
  if (localStorage.displayLocation) {
    $displayLocation[0].checked = localStorage.displayLocation === 'true';
  }

  var $displayHourMarkers = $('#displayHourMarkers');
  if (localStorage.displayHourMarkers) {
    $displayHourMarkers[0].checked = localStorage.displayHourMarkers === 'true';
  }

  var $displayMinorMarkers = $('#displayMinorMarkers');
  if (localStorage.displayMinorMarkers) {
    $displayMinorMarkers[0].checked = localStorage.displayMinorMarkers === 'true';
  }

  var $displayObservationTime = $('#displayObservationTime');
  if (localStorage.displayObservationTime) {
    $displayObservationTime[0].checked = localStorage.displayObservationTime === 'true';
  }

  var $displayUpdateTime = $('#displayUpdateTime');
  if (localStorage.displayUpdateTime) {
    $displayUpdateTime[0].checked = localStorage.displayUpdateTime === 'true';
  }

  var $colorBackground = $('#colorBackground');
  if (localStorage.colorBackground) {
    $colorBackground[0].value = localStorage.colorBackground;
  }

  var $colorText = $('#colorText');
  if (localStorage.colorText) {
    $colorText[0].value = localStorage.colorText;
  }

  var $colorHourHand = $('#colorHourHand');
  if (localStorage.colorHourHand) {
    $colorHourHand[0].value = localStorage.colorHourHand;
  }

  var $colorMinuteHand = $('#colorMinuteHand');
  if (localStorage.colorMinuteHand) {
    $colorMinuteHand[0].value = localStorage.colorMinuteHand;
  }

  var $colorMinuteHandNoBT = $('#colorMinuteHandNoBT');
  if (localStorage.colorMinuteHandNoBT) {
    $colorMinuteHandNoBT[0].value = localStorage.colorMinuteHandNoBT;
  }

  var $colorHourMarkers = $('#colorHourMarkers');
  if (localStorage.colorHourMarkers) {
    $colorHourMarkers[0].value = localStorage.colorHourMarkers;
  }

  var $colorMinorMarkers = $('#colorMinorMarkers');
  if (localStorage.colorMinorMarkers) {
    $colorMinorMarkers[0].value = localStorage.colorMinorMarkers;
  }
}

function getAndStoreConfigData() {
  var $apiKey = $('#apiKey');
  var $gps = $('#gps');
  var $latlon = $('#latlon');
  var $latitude = $('#latitude');
  var $longitude = $('#longitude');
  var $frequency = $('#frequency');
  var $displayLocation = $('#displayLocation');
  var $displayHourMarkers = $('#displayHourMarkers');
  var $displayMinorMarkers = $('#displayMinorMarkers');
  var $displayObservationTime = $('#displayObservationTime');
  var $displayUpdateTime = $('#displayUpdateTime');
  var $colorBackground = $('#colorBackground');
  var $colorText = $('#colorText');
  var $colorHourHand = $('#colorHourHand');
  var $colorMinuteHand = $('#colorMinuteHand');
  var $colorMinuteHandNoBT = $('#colorMinuteHandNoBT');
  var $colorHourMarkers = $('#colorHourMarkers');
  var $colorMinorMarkers = $('#colorMinorMarkers');

  var options;
  options = {
    apiKey: $apiKey.val().replace(/\W/g, ""),
    useLatLon: $latlon[0].checked,
    latitude: $latitude.val(),
    longitude: $longitude.val(),
    frequency: $frequency.val(),
    displayLocation: $displayLocation[0].checked,
    displayHourMarkers: $displayHourMarkers[0].checked,
    displayMinorMarkers: $displayMinorMarkers[0].checked,
    displayObservationTime: $displayObservationTime[0].checked,
    displayUpdateTime: $displayUpdateTime[0].checked,
    colorBackground: $colorBackground.val(),
    colorText: $colorText.val(),
    colorHourHand: $colorHourHand.val(),
    colorMinuteHand: $colorMinuteHand.val(),
    colorMinuteHandNoBT: $colorMinuteHandNoBT.val(),
    colorHourMarkers: $colorHourMarkers.val(),
    colorMinorMarkers: $colorMinorMarkers.val()
  };

  localStorage.versionLabel = versionLabel;
  localStorage.apiKey = options.apiKey;
  localStorage.useLatLon = options.useLatLon;
  localStorage.latitude = options.latitude;
  localStorage.longitude = options.longitude;
  localStorage.frequency = options.frequency;
  localStorage.displayLocation = options.displayLocation;
  localStorage.displayHourMarkers = options.displayHourMarkers;
  localStorage.displayMinorMarkers = options.displayMinorMarkers;
  localStorage.displayObservationTime = options.displayObservationTime;
  localStorage.displayUpdateTime = options.displayUpdateTime;
  localStorage.colorBackground = options.colorBackground;
  localStorage.colorText = options.colorText;
  localStorage.colorHourHand = options.colorHourHand;
  localStorage.colorMinuteHand = options.colorMinuteHand;
  localStorage.colorMinuteHandNoBT = options.colorMinuteHandNoBT;
  localStorage.colorHourMarkers = options.colorHourMarkers;
  localStorage.colorMinorMarkers = options.colorMinorMarkers;

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
