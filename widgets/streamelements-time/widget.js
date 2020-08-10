var datetimeFormat;
var output = document.getElementById("output");
var c;

window.addEventListener('onWidgetLoad', function (obj) {
  const fieldData = obj["detail"]["fieldData"];
  const datetimeFormat = fieldData['datetimeFormat'];
  const timezone = fieldData['timezone'];

  setInterval(c = function() {
    output.innerText = moment().tz(timezone).format(datetimeFormat || '');
  }, 1000);

  c();
}, 1000);
