var table = []

//Helper
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

jQuery.ajax({
	url: "https://spreadsheets.google.com/feeds/list/1fO2uVSHnug26LZYDEU2lUcCSgIOHMEQA93FuggnEoeI/465951791/public/basic?alt=json-in-script",
	jsonp: "callback",
	dataType: "jsonp",
	success: function( response ) {
		var tmp;
		var tmpUrl;
		var players = [];
		for(var i = 0; i < response.feed.entry.length; ++i)
		{
				tmp = response.feed.entry[i].content.$t.split(',');
				tmpUrl = '';
				if(tmp[3]) {
					tmpUrl = tmp[3].split(':');
					tmpUrl.shift();
					tmpUrl = tmpUrl.join(':').trim();
				}
				players.push({
					'name': tmp[0].split(':')[1].trim(),
					'level': parseInt(tmp[1].split(':')[1].trim(), 10),
					'since': tmp[2].split(':')[1].trim(),
					'url':  tmpUrl
				});
		}

		table = shuffle(players);
		init();
		animate();
	}
});

var is_mobile = $.browser.mobile
var camera, scene, renderer;
var controls;

var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [] };

function init() {

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = is_mobile ? 4000 : 3000;

	scene = new THREE.Scene();

	console.log( table );
	// table

	for ( var i = 0; i < table.length; ++i ) {

		var element = document.createElement( 'div' );
		element.className = 'element';
		element.style.backgroundColor = 'rgba(0,131,209,' + ( Math.random() * 0.25 + 0.5 ) + ')';
		element.style.width =  100 + table[i].name.length * 28 + 'px';

		var number = document.createElement( 'div' );
		number.className = 'number';
		number.textContent = 'L' + table[i].level;
		element.appendChild( number );

		var symbol = document.createElement( 'div' );
		symbol.className = 'symbol';
		symbol.textContent = table[i].name;
		element.appendChild( symbol );

		var details = document.createElement( 'a' );
		details.className = 'details';
		details.href = table[i].url;
		details.target = '_blank';
		details.textContent = 'Google +';
		if (table[i].url) element.appendChild( details );

		var object = new THREE.CSS3DObject( element );
		object.position.x = Math.random() * 4000 - 2000;
		object.position.y = Math.random() * 4000 - 2000;
		object.position.z = Math.random() * 4000 - 2000;
		scene.add( object );

		objects.push( object );
	}

	// grid
  var divider_x = is_mobile ? 4 : 5;
  var divider_y = is_mobile ? 6 : 5;
	for ( var i = 0; i < objects.length; i ++ ) {

		var object = new THREE.Object3D();

		object.position.x = ( ( i % divider_x ) * 500 ) - divider_x * 180;
		object.position.y = ( - ( Math.floor( i / divider_x ) % divider_y ) * 400 ) + 800;
		object.position.z = ( Math.floor( i / (divider_x * divider_y) ) ) * 100 - 250 - Math.random() * 200;

		targets.grid.push( object );

	}

	//

	renderer = new THREE.CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute';
	document.getElementById( 'container' ).appendChild( renderer.domElement );
	if(!is_mobile) {
		controls = new THREE.TrackballControls( camera, renderer.domElement );
		controls.rotateSpeed = 0.5;
		controls.minDistance = 600;
		controls.maxDistance = 6000;
		controls.addEventListener( 'change', render );
	}
	transform( targets.grid, 5000 );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function transform( targets, duration ) {

	TWEEN.removeAll();

	for ( var i = 0; i < objects.length; i ++ ) {

		var object = objects[ i ];
		var target = targets[ i ];

		new TWEEN.Tween( object.position )
			.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();

		new TWEEN.Tween( object.rotation )
			.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();

	}

	new TWEEN.Tween( this )
		.to( {}, duration * 2 )
		.onUpdate( render )
		.start();

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	render();

}

function animate() {

	requestAnimationFrame( animate );

	TWEEN.update();

	controls.update();

}

function render() {

	renderer.render( scene, camera );

}
