/**
 * cellsByColumn layout mode for Isotope
 */

( function( window, $, undefined ) {

'use strict';

var CellsByColumnLayout = $.Isotope.createLayoutMode('cellsByColumn');

CellsByColumnLayout.prototype.reset = function() {
  this.index = 0;
  // get columnWidth
  this.getCols();
  // get rowHeight
  this.getRows();
};

CellsByColumnLayout.prototype.layout = function( $elems ) {
  var _this = this;
  $elems.each( function() {
    var $this = $(this);
    var col = Math.floor( _this.index / _this.rows );
    var row = _this.index % _this.rows;
    var x = ( col + 0.5 ) * _this.columnWidth - $this.outerWidth(true) / 2;
    var y = ( row + 0.5 ) * _this.rowHeight - $this.outerHeight(true) / 2;
    _this.isotope._pushPosition( $this, x, y );
    _this.index ++;
  });
};

CellsByColumnLayout.prototype.getContainerSize = function() {
  var itemsCount = this.isotope.$filteredAtoms.length;
  return { width : Math.ceil( itemsCount / this.rows ) * this.columnWidth };
};

CellsByColumnLayout.prototype.resizeChanged = function() {
  return this.rowsChanged();
};

})( window, jQuery );
