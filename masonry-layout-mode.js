( function( window, $, undefined ) {

'use strict';

var MasonryLayoutMode = $.Isotope.createLayoutMode('masonry');

MasonryLayoutMode.prototype.reset = function() {
  this.getCols();

  var i = this.cols;
  this.colYs = [];
  while (i--) {
    this.colYs.push( 0 );
  }
};

MasonryLayoutMode.prototype.layout = function( $elems ) {
  var instance = this;
  $elems.each(function(){
    var $this  = $(this),
        //how many columns does this brick span
        colSpan = Math.ceil( $this.outerWidth(true) / instance.columnWidth );
    colSpan = Math.min( colSpan, instance.cols );
    var setY;
    if ( colSpan === 1 ) {
      // if brick spans only one column, just like singleMode
      setY = instance.colYs;
    } else {
      // brick spans more than one column
      // how many different places could this brick fit horizontally
      var groupCount = instance.cols + 1 - colSpan,
          groupY = [],
          groupColY,
          i;

      // for each group potential horizontal position
      for ( i=0; i < groupCount; i++ ) {
        // make an array of colY values for that one group
        groupColY = instance.colYs.slice( i, i+colSpan );
        // and get the max value of the array
        groupY[i] = Math.max.apply( Math, groupColY );
      }

      setY = groupY;
    }

    instance.placeBrick( $this, setY );
  });
};

// worker method that places brick in the columnSet
//   with the the minY
MasonryLayoutMode.prototype.placeBrick = function( $brick, setY ) {
  // get the minimum Y value from the columns
  var minimumY = Math.min.apply( Math, setY ),
      shortCol = 0;

  // Find index of short column, the first from the left
  for (var i=0, len = setY.length; i < len; i++) {
    if ( setY[i] === minimumY ) {
      shortCol = i;
      break;
    }
  }

  // position the brick
  var x = this.columnWidth * shortCol,
      y = minimumY;
  this.isotope._pushPosition( $brick, x, y );

  // apply setHeight to necessary columns
  var setHeight = minimumY + $brick.outerHeight(true),
      setSpan = this.cols + 1 - len;
  for ( i=0; i < setSpan; i++ ) {
    this.colYs[ shortCol + i ] = setHeight;
  }

};

MasonryLayoutMode.prototype.getContainerSize = function() {
  var containerHeight = Math.max.apply( Math, this.colYs );
  return { height: containerHeight };
};

MasonryLayoutMode.prototype.resizeChanged = function() {
  return this.colsChanged();
};

})( window, jQuery );
