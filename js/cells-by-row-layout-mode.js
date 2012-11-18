/**
 * cellsByRow layout mode for Isotope
 */

( function( window, $, undefined ) {

'use strict';

var cellsByRowLayoutMode = $.Isotope.createLayoutMode('cellsByRow');

cellsByRowLayoutMode.prototype.reset = function() {
  this.index = 0;
  this.getCols();
  this.getRows();
};

cellsByRowLayoutMode.prototype.layout = function( $elems ) {
  var _this = this;
  $elems.each( function() {
    var $this = $(this);
    var col = _this.index % _this.cols;
    var row = Math.floor( _this.index / _this.cols );
    // center item in cell
    var x = ( col + 0.5 ) * _this.columnWidth - $this.outerWidth(true) / 2;
    var y = ( row + 0.5 ) * _this.rowHeight - $this.outerHeight(true) / 2;
    _this.isotope._pushPosition( $this, x, y );
    _this.index++;
  });
};

cellsByRowLayoutMode.prototype.getContainerSize = function() {
  var itemsCount = this.isotope.$filteredAtoms.length;
  return { height: Math.ceil( itemsCount / this.cols ) * this.rowHeight };
};

cellsByRowLayoutMode.prototype.resizeChanged = function() {
  return this.colsChanged();
};

})( window, jQuery );
