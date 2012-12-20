/**
 * straightDown layout mode for Isotope
 */

( function( window, $, undefined ) {

'use strict';

var StraightDownLayoutMode = $.Isotope.createLayoutMode('straightDown');

StraightDownLayoutMode.prototype.reset = function() {
  this.y = 0;
};

StraightDownLayoutMode.prototype.layout = function( $elems ) {
  var _this = this;
  $elems.each( function( i ){
    var $this = $(this);
    _this.isotope._pushPosition( $this, 0, _this.y );
    _this.y += $this.outerHeight(true);
  });
};

StraightDownLayoutMode.prototype.getContainerSize = function() {
  return { height: this.y };
};

})( window, jQuery );
