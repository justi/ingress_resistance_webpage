//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

//Google Map Skin - Get more at http://snazzymaps.com/
var myOptions = {
    zoom: 11,
    center: new google.maps.LatLng(52.4005286, 16.9016658),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false,
    styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 17
        }]
    }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 17
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 29
        }, {
            "weight": 0.2
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 30
        }]
    }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 30
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 21
        }]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#0481FE",
        }, {
            "lightness": 1
        }, {
            "weight": 1
        }]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [{
            "saturation": 36
        }, {
            "color": "#000000"
        }, {
            "lightness": 80
        }]
    }, {
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 19
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 17
        }, {
            "weight": 1.2
        }]
    }]
};

var map = new google.maps.Map(document.getElementById('map'), myOptions);

var players = {
  'sputnix':  [ "Jeżyce, Poznań Zachód", 52.40286, 16.9016658, "https://plus.google.com/108350777758799125867" ],
  'skidzior': [ "Łazarz", 52.3943313, 16.8998215, "https://plus.google.com/s/skidzior" ],
  'KrisThina': [ "Rataje", 52.388438, 16.9857886, "https://plus.google.com/115911002059899096875" ],
  'yano':  [ "Piątkowo", 52.4634498, 16.9205516, "https://plus.google.com/1/117586564682480190971" ],
  'Rednave': [ "Cały Poznań", 52.3034662, 17.0278719, "https://plus.google.com/102220143813987229886" ],
  'barthard': [ "Stare Miasto", 52.408508, 16.933574, "https://plus.google.com/u/1/109042297545888403089" ]
};

var image = './img/marker-32.png';

function bindInfoWindow(marker, map, infoWindow) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map, marker);
  });
}

for (var key in players) {
  var data = players[key];
  var place = data[0];
  var lat = data[1];
  var lng = data[2];
  var plusgoogle = data[3];
  var text = key + " , miejsce działań: " + place;

  var infowindow = new google.maps.InfoWindow({
      content: '<div class="infowindow"><b>' + key + '</b></br>Miejsce działań: ' + place + '</br><a href="' + plusgoogle + '">Profil +</a></div>'
  });

  var marker = new google.maps.Marker({
      position: new google.maps.LatLng (lat, lng),
      map: map,
      icon: image,
      title: text,
  });

  bindInfoWindow(marker, map, infowindow)
}




