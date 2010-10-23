(function( $ ){

  $.fn.infiDrag = function() {
  
	$this = $(this);

	//this.each(function(content) {
	 	// max = Math.max( max, $(this).height() );
		var constrain = $('<div>', { class : 'infi_draggable_constrain' }),
			draggable = $('<div>', { class : 'infi_draggable_container' });
			
		$(this).replaceWith(
			constrain.html(
				draggable.html(this)));
	//});

	return this;
  };
})( jQuery );