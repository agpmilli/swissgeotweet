function Zoom(args) {
  $.extend(this, {
    $buttons:   $(".zoom-button"),
    $info:      $("#zoom-info"),
    scale:      { max: 50, currentShift: 0 },
    $container: args.$container,
    datamap:    args.datamap
  });

  this.init();
}

Zoom.prototype.init = function() {
  var paths = this.datamap.svg.selectAll("path"),
      subunits = this.datamap.svg.selectAll(".datamaps-subunit");

  // preserve stroke thickness
  paths.style("vector-effect", "non-scaling-stroke");

  // disable click on drag end
  subunits.call(
    d3.behavior.drag().on("dragend", function() {
      d3.event.sourceEvent.stopPropagation();
    })
  );

  this.scale.set = this._getScalesArray();
  this.d3Zoom = d3.behavior.zoom().scaleExtent([ 1, this.scale.max ]);

  this._displayPercentage(1);
  this.listen();
};

Zoom.prototype.listen = function() {
  this.$buttons.off("click").on("click", this._handleClick.bind(this));

  this.datamap.svg
    .call(this.d3Zoom.on("zoom", this._handleScroll.bind(this)))
    .on("dblclick.zoom", null); // disable zoom on double-click
};

Zoom.prototype.reset = function() {
  this._shift("reset");
};

Zoom.prototype._handleScroll = function() {
  var translate = d3.event.translate,
      scale = d3.event.scale,
      limited = this._bound(translate, scale);

  this.scrolled = true;

  this._update(limited.translate, limited.scale);
};

Zoom.prototype._handleClick = function(event) {
  var direction = $(event.target).data("zoom");

  this._shift(direction);
};

Zoom.prototype._shift = function(direction) {
  var center = [ this.$container.width() / 2, this.$container.height() / 2 ],
      translate = this.d3Zoom.translate(), translate0 = [], l = [],
      view = {
        x: translate[0],
        y: translate[1],
        k: this.d3Zoom.scale()
      }, bounded;

  translate0 = [
    (center[0] - view.x) / view.k,
    (center[1] - view.y) / view.k
  ];

    if (direction == "reset") {
    view.k = 1;
    this.scrolled = true;
  } else {
    view.k = this._getNextScale(direction);
  }

l = [ translate0[0] * view.k + view.x, translate0[1] * view.k + view.y ];

  view.x += center[0] - l[0];
  view.y += center[1] - l[1];

  bounded = this._bound([ view.x, view.y ], view.k);

  this._animate(bounded.translate, bounded.scale);
};

Zoom.prototype._bound = function(translate, scale) {
  var width = this.$container.width(),
      height = this.$container.height();

  translate[0] = Math.min(
    (width / height)  * (scale - 1),
    Math.max( width * (1 - scale), translate[0] )
  );

  translate[1] = Math.min(0, Math.max(height * (1 - scale), translate[1]));

  return { translate: translate, scale: scale };
};

Zoom.prototype._update = function(translate, scale) {
  this.d3Zoom
    .translate(translate)
    .scale(scale);

  this.datamap.svg.selectAll("g")
    .attr("transform", "translate(" + translate + ")scale(" + scale + ")");

  this._displayPercentage(scale);
};

Zoom.prototype._animate = function(translate, scale) {
  var _this = this,
      d3Zoom = this.d3Zoom;

  d3.transition().duration(350).tween("zoom", function() {
    var iTranslate = d3.interpolate(d3Zoom.translate(), translate),
        iScale = d3.interpolate(d3Zoom.scale(), scale);

        return function(t) {
      _this._update(iTranslate(t), iScale(t));
    };
  });
};

Zoom.prototype._displayPercentage = function(scale) {
  var value;

  value = Math.round(Math.log(scale) / Math.log(this.scale.max) * 100);
  this.$info.text(value + "%");
};

Zoom.prototype._getScalesArray = function() {
  var array = [],
      scaleMaxLog = Math.log(this.scale.max);

  for (var i = 0; i <= 10; i++) {
    array.push(Math.pow(Math.E, 0.1 * i * scaleMaxLog));
  }

  return array;
};

Zoom.prototype._getNextScale = function(direction) {
  var scaleSet = this.scale.set,
      currentScale = this.d3Zoom.scale(),
      lastShift = scaleSet.length - 1,
      shift, temp = [];

  if (this.scrolled) {

    for (shift = 0; shift <= lastShift; shift++) {
      temp.push(Math.abs(scaleSet[shift] - currentScale));
    }

    shift = temp.indexOf(Math.min.apply(null, temp));

    if (currentScale >= scaleSet[shift] && shift < lastShift) {
      shift++;
    }

    if (direction == "out" && shift > 0) {
      shift--;
    }

    this.scrolled = false;

  } else {

    shift = this.scale.currentShift;

    if (direction == "out") {
      shift > 0 && shift--;
    } else {
      shift < lastShift && shift++;
    }
  }

  this.scale.currentShift = shift;

  return scaleSet[shift];
};

function Datamap() {
    this.$container = $("#container");
    this.instance = new Datamaps({
        element: document.getElementById('bubbles'),
        geographyConfig: {
            dataUrl: 'https://raw.githubusercontent.com/markmarkoh/datamaps/master/src/js/data/che.topo.json',
            popupOnHover: false,
            highlightOnHover: false
        },
        bubblesConfig: {
            borderWidth: 2,
            borderOpacity: 1,
            borderColor: '#FFFFFF',
            popupOnHover: true, // True to show the popup while hovering
            radius: 10,
            fillOpacity: 0.75,
            animate: true,
            highlightOnHover: true,
            highlightFillColor: '#FC8D59',
            highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
            highlightBorderWidth: 2,
            highlightBorderOpacity: 1,
            highlightFillOpacity: 0.85,
            exitDelay: 100, // Milliseconds
            key: JSON.stringify
        },
        scope: 'che',
        fills: {
            CHE: 'red',
            defaultFill: 'rgba(30,100,255,0.5)'
        },
        height:800,
        width:2500,
        setProjection: function(element) {
            var projection = d3.geo.mercator()
                .center([8, 47])
                .scale(10000)
                .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
            var path = d3.geo.path().projection(projection);
            return {path: path, projection: projection};
        },
        element: this.$container.get(0),
        projection: 'mercator',
        done: this._handleMapReady.bind(this)
    });
    
    var bubbleShow = [];
    
    this.instance.bubbles(bubbleShow, {
      popupTemplate: function(geo, data) {
        return '<div class="hoverinfo"><strong>' + data.name + '</strong> : ' + data.significance + '</div>';
      }
    });
    
}

Datamap.prototype._handleMapReady = function(datamap) {
    this.zoom = new Zoom({
    $container: this.$container,
    datamap: datamap
  });
}


var dataSet = new Array();
var bubbleDay = new Array();
d3.csv("twex_event_final_events_10000.csv", function(csvdata1) {

    globalcsvdata1 = csvdata1;
    for (var i=0;i<csvdata1.length;i++){
        dataSet_row = [globalcsvdata1[i].name,  globalcsvdata1[i].keywords, globalcsvdata1[i]["# of tweets"], globalcsvdata1[i]["# of people"],  globalcsvdata1[i].longitude, globalcsvdata1[i].latitude, globalcsvdata1[i].date, globalcsvdata1[i].tweetids];
        dataSet.push(dataSet_row);
    }
    
});
 
$(document).ready(function() {
    table = $('#table').DataTable( {
        data: bubbleDay,
        columns: [
            { title: "Name" },
            { title: "Keywords" },
            { title: "Number of tweets" },
            { title: "Number of people concerned" }
        ]
    } );
} );

$("#datepicker").datepicker({
    dateFormat: "yy-mm-dd",
    onSelect: function(dateText) {
        bubbleDay = [];
        bubbleShow = [];
        
        for (var i=0; i<dataSet.length;i++){
            if(dataSet[i][6]==dateText){
                bubbleDay.push(dataSet[i]);
            }
        }
        for (var i=0; i<bubbleDay.length;i++){
            var bubble = {
                name: bubbleDay[i][0],
                radius: Math.min(bubbleDay[i][3], 20),
                country: 'CHE',
                fillKey: 'CHE',
                significance: bubbleDay[i][1],
                latitude: bubbleDay[i][5],
                longitude: bubbleDay[i][4]
            };
            bubbleShow.push(bubble);
        }
        x.instance.bubbles(bubbleShow, {
            popupTemplate: function(geo, data) {
                return '<div class="hoverinfo"><strong>' + data.name + '</strong> : ' + data.significance + '</div>';
            }
        });
        
        table.destroy()
        
        table = $('#table').DataTable( {
        data: bubbleDay,
        columns: [
            { title: "Name" },
            { title: "Keywords" },
            { title: "Number of tweets" },
            { title: "Number of people concerned" },

        ]
    } );
    }
});



var x = new Datamap();

$('#datepicker').datepicker("setDate", new Date() );