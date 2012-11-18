/**
 * straightAcross layout mode for Isotope
 */

( function( window, $, undefined ) {

'use strict';

var StraightAcrossLayout = $.Isotope.createLayoutMode('straightAcross');

StraightAcrossLayout.prototype.reset = function() {
  this.x = 0;
};

StraightAcrossLayout.prototype.layout = function( $elems ) {
  var _this = this;
  $elems.each( function( i ){
    var $this = $(this);
    _this.isotope._pushPosition( $this, _this.x, 0 );
    _this.x += $this.outerWidth(true);
  });
};

StraightAcrossLayout.prototype.getContainerSize = function() {
  return { width: this.x };
};

})( window, jQuery );
