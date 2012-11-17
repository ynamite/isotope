( function( window, $, undefined ) {

'use strict';

function LayoutMode() {}

// publicize LayoutMode
$.Isotope.LayoutMode = LayoutMode;

// get this.cols and this.columnWidth
LayoutMode.prototype.getCols = function() {
  var containerWidth = this.isotope.element.width();
  // i.e. options.masonry && options.masonry.columnWidth
  this.columnWidth = this.options.columnWidth ||
    // or use the size of the first item, i.e. outerWidth
    this.$filteredAtoms.outerWidth(true) ||
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
  this.rowHeight = this.options.rowHeight ||
    // or use the size of the first item, i.e. outerWidth
    this.isotope.$filteredAtoms.outerHeight(true) ||
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
  this.getCols();
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

// -------------------------- Isotope.createLayoutMode -------------------------- //

// layout mode constructor creator
$.Isotope.createLayoutMode = function( name ) {
  // create constructor
  var Mode = function( isotope ) {
    // apply name, for getting options
    this.name = name;
    this.isotope = isotope;
    this.options = isotope.options[ this.name ] || {};
  };

  // inherit LayoutMode methods
  Mode.prototype = new LayoutMode();

  $.Isotope.layoutModes[ name ] = Mode;

  return Mode;
};

})( window, jQuery );
