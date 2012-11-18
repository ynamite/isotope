/**
 * masonryHorizontal layout mode for Isotope
 */

( function( window, $, undefined ) {

'use strict';

var FitColumnsLayout = $.Isotope.createLayoutMode('fitColumns');

FitColumnsLayout.prototype.reset = function() {
  this.x = 0;
  this.y = 0;
  this.maxX = 0;
};

FitColumnsLayout.prototype.layout = function( $elems ) {
  var _this = this;
  var containerHeight = this.isotope.element.height();
  $elems.each( function() {
    var $this = $(this),
        atomW = $this.outerWidth(true),
        atomH = $this.outerHeight(true);

    // if this element cannot fit in the current column
    if ( _this.y !== 0 && atomH + _this.y > containerHeight ) {
      // start a new column
      _this.x = _this.maxX;
      _this.y = 0;
    }

    // position the atom
    _this.isotope._pushPosition( $this, _this.x, _this.y );

    _this.maxX = Math.max( _this.x + atomW, _this.maxX );
    _this.y += atomH;

  });
};

FitColumnsLayout.prototype.getContainerSize = function () {
  return { width: this.maxX };
};

})( window, jQuery );
