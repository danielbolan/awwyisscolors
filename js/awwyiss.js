var palettes = [];
var parse = function(data) {
  palettes = data.map(function(palette) {
    var colors = [];
    for (var i=0; i<5; i++) {
      colors.push({
        color: '#'+(palette.colors[i]||'FFFFFF'),
        width: ((palette.colorWidths[i]||0)*100)+'%'
      });
    }
    return colors;
  });
  console.log(palettes.length + ' palettes retrieved.');
  setInterval(change,5000);
  change();
};

var settings = {
  url: 'https://www.colourlovers.com/api/palettes/top',
  dataType: 'jsonp',
  data: {
    showPaletteWidths: 1,
    numResults: 100,
    hueOption: getTheme()
  },
  crossDomain: true,
  jsonp: 'jsonCallback',
  jsonpCallback: 'parse'
};
$.ajax(settings);

function getTheme() {
  var ret;
  var matches = window.location.href.match(/[\?&]theme=([^&#]*)/);
  if (matches === null){
    ret = 'all'
  }
  else{
    if (matches[1] === 'random') {
      var themes = ['red','orange','yellow','green','aqua','blue','violet','fuchsia'];
      ret = themes[Math.random()*themes.length|0];
    } else {
      ret = matches[1];
    }
  }
  console.log('Fetching ' + ret + ' palettes...');
  return ret;
}

function change() {
  if (palettes.length === 0) return;
  bars = $('.bar');
  var colors = palettes[0];
  palettes.push(palettes.shift());
  bars.each(function(i) {
    $(this).css('background-color',colors[i].color);
    $(this).css('width',colors[i].width);
  });
}
