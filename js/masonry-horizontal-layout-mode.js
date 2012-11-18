/**
 * masonryHorizontal layout mode for Isotope
 */

( function( window, $, undefined ) {

'use strict';

var MasonryHorizontalLayoutMode = $.Isotope.createLayoutMode('masonryHorizontal');

MasonryHorizontalLayoutMode.prototype.reset = function() {
  this.getRows();
  var i = this.rows;
  this.rowXs = [];
  while (i--) {
    this.rowXs.push( 0 );
  }
};

MasonryHorizontalLayoutMode.prototype.layout = function( $elems ) {
  var _this = this;
  $elems.each(function(){
    var $this  = $(this),
        //how many rows does this brick span
        rowSpan = Math.ceil( $this.outerHeight(true) / _this.rowHeight );
    rowSpan = Math.min( rowSpan, _this.rows );
    var setX;
    if ( rowSpan === 1 ) {
      // if brick spans only one column, just like singleMode
      setX = _this.rowXs;
    } else {
      // brick spans more than one row
      // how many different places could this brick fit horizontally
      var groupCount = _this.rows + 1 - rowSpan,
          groupX = [],
          groupRowX, i;

      // for each group potential horizontal position
      for ( i=0; i < groupCount; i++ ) {
        // make an array of colY values for that one group
        groupRowX = _this.rowXs.slice( i, i+rowSpan );
        // and get the max value of the array
        groupX[i] = Math.max.apply( Math, groupRowX );
      }
      setX = groupX;
    }

    _this.placeBrick( $this, setX );
  });
},

MasonryHorizontalLayoutMode.prototype.placeBrick = function( $brick, setX ) {
  // get the minimum Y value from the columns
  var minimumX  = Math.min.apply( Math, setX ),
      smallRow  = 0;
  // Find index of smallest row, the first from the top
  for (var i=0, len = setX.length; i < len; i++) {
    if ( setX[i] === minimumX ) {
      smallRow = i;
      break;
    }
  }

  // position the brick
  var x = minimumX,
      y = this.rowHeight * smallRow;
  this.isotope._pushPosition( $brick, x, y );

  // apply setHeight to necessary columns
  var setWidth = minimumX + $brick.outerWidth(true),
      setSpan = this.rows + 1 - len;
  for ( i=0; i < setSpan; i++ ) {
    this.rowXs[ smallRow + i ] = setWidth;
  }
};

MasonryHorizontalLayoutMode.prototype.getContainerSize = function() {
  var containerWidth = Math.max.apply( Math, this.rowXs );
  return { width: containerWidth };
};

MasonryHorizontalLayoutMode.prototype.resizeChanged = function() {
  return this.rowsChanged();
};

})( window, jQuery );
