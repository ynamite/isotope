/**
 * fitRows layout mode for Isotope
 */

( function( window, $, undefined ) {

'use strict';

var FitRowsLayoutMode = $.Isotope.createLayoutMode('fitRows');

FitRowsLayoutMode.prototype.reset = function() {
  this.x = 0;
  this.y = 0;
  this.height = 0;
};

FitRowsLayoutMode.prototype.layout = function( $elems ) {
  var instance = this;
  var containerWidth = this.isotope.element.width();

  $elems.each( function() {
    var $this = $(this);
    var atomW = $this.outerWidth(true);
    var atomH = $this.outerHeight(true);

    if ( instance.x !== 0 && atomW + instance.x > containerWidth ) {
      // if this element cannot fit in the current row
      instance.x = 0;
      instance.y = instance.height;
    }

    // position the atom
    instance.isotope._pushPosition( $this, instance.x, instance.y );

    instance.height = Math.max( instance.y + atomH, instance.height );
    instance.x += atomW;

  });
};

FitRowsLayoutMode.prototype.getContainerSize = function () {
  return { height: this.height };
};

})( window, jQuery );
