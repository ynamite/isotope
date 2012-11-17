( function( window, $, undefined ) {

'use strict';

function LayoutMode( isotope ) {
  this.isotope = isotope;
}

// get this.cols and this.columnWidth
LayoutMode.prototype.getCols = function() {
  var options = this.isotope.options[ this.name ];
  var containerWidth = this.isotope.element.width();
  // i.e. options.masonry && options.masonry.columnWidth
  this.columnWidth = options && options.columnWidth ||
    // or use the size of the first item, i.e. outerWidth
    this.$filteredAtoms[ 'outer' + capitalize(size) ](true) ||
    // if there's no items, use size of container
    containerWidth;

  // how many columns fit in this container
  this.cols = Math.floor( containerWidth / this.columnWidth );
  // at least one
  this.cols = Math.max( this.cols, 1 );
};

// get this.rows and this.rowHeight
LayoutMode.prototype.getRows = function() {
  var options = this.isotope.options[ this.name ];
  var containerHeight = this.isotope.element.height();
  // i.e. options.masonry && options.masonry.columnWidth
  this.rowHeight = options && options.rowHeight ||
    // or use the size of the first item, i.e. outerWidth
    this.isotope.$filteredAtoms['outerHeight'](true) ||
    // if there's no items, use size of container
    containerHeight;

  // how many columns fit in this container
  this.rows = Math.floor( containerHeight / this.rowHeight );
  // at least one
  this.rows = Math.max( this.rows, 1 );
};

LayoutMode.prototype.colsChanged = function() {
  var previousCols = this.cols;
  // update rows
  this.getCols( isRows );
  // return if updated cols is not equal to previous
  return ( this.cols !== previousCols );
};

LayoutMode.prototype.rowsChanged = function() {
  var previousRows = this.rows;
  // update rows
  this.getRows();
  // return if updated rows is not equal to previous
  return ( this.rows !== previousRows );
};


})( window, jQuery );
