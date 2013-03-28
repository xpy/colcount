jQuery.fn.columnCount = function(){
  var items = [];
	var id = 0;
	var elWidth, $el;

	var refresh = function refresh(){
		for( var i in items ) {
			$el = items[i].el;
			elWidth = $el.width();
			var nProportion = Math.ceil( elWidth / items[i].division );
			if( nProportion !== items[i].preProportion ) {
				items[i].preProportion = nProportion;
				$el.attr( 'data-cols', nProportion );
			}
		}
	};

	var remove = function remove( item ){
		var newItems = [];
		for( var i in items ) {
			if( !items[i].el.is( item ) ) {
				newItems.push( items[i] );
			}
		}

		items = newItems;
	};

	$( window ).off( 'resize', refresh ).on( 'resize', refresh );

	return function( division, item ){
		if( typeof division == 'string' ) {
			switch( division ) {
				case 'refresh':
					refresh();
					break;
				case 'remove':
					remove( item );
					break;
			}
		} else {
			this.each( function( index, el ){
				items.push( {'id': id++, 'el': $( el ), 'preProportion': 0, 'division': division} );
			} );
			refresh();
		}
	}

}();
