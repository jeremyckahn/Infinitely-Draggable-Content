/*
Infinitely Draggable Content Area Plugin
v. 0.1
By Jeremy Kahn, jeremyckahn@gmail.com

Project link: http://github.com/jeremyckahn/Infinitely-Draggable-Content

Dependencies:  jQuery 1.4.2 or above, jQuery UI 1.8 (Draggable) or above

Description: This plugin takes some content and makes it draggable to infinite bounds within a constrained area.
It works much like the draggable map in Google Maps.

Instructions: Simply call '$().infidrag()' on whatever element you want to make draggable.  Define the bounds
with options 'height' and 'width.'  Here's an example:

$('#content').infiDrag({
	height: 400,
	width: 600
});

Tested on IE 7 and 8, Firefox, Chrome and Safari.

*/

(function( $ ){

  $.fn.infiDrag = function(options) {
	
	function pxToInt(str){
		return parseInt(str.replace(/px/gi, ''), 10);
	}
  
	var self = $(this),
		constrain = $('<div>', { 'class' : 'infi_draggable_constrain' }),
		dragHandle = $('<div>', { 'class' : 'infi_draggable_container' }),
		contentProps = {
			height: options.height,
			width: options.width
		};
		

	$(constrain).add(dragHandle)
		.css({
			height: contentProps.height,
			width: contentProps.width,
			position: 'absolute'
		});
		
	$(constrain).css({
		overflow: 'hidden',
		background: self.css('background')
	});
	
	self.css({
		left: '0',
		top: '0',
		position: 'absolute',
		// More IE7 fixes
		'min-height': contentProps.height,
		'min-width': contentProps.width
	});
	
	$(dragHandle).css({
			left: '0',
			top: '0',
			// Magical hack that makes IE6 and 7 work
			background: 'url(.)'
		});
	
	self.wrap(constrain)
		.wrap(dragHandle);
		
	// Now that constrain and dragHandle are in the DOM, update their references to reflect it
	dragHandle = self.parent();
	constrain = dragHandle.parent();
		
	
	dragHandle
		.draggable({
			// stop() contains all the magic that makes the infinitely-draggable thing actually work
			stop: function(){
				self.css({
					left: pxToInt(self.css('left')) + pxToInt($(dragHandle).css('left')),
					top: pxToInt(self.css('top')) + pxToInt($(dragHandle).css('top'))
				});
				
				$(dragHandle).css({
					left : 0,
					top: 0
				});
			}
		})
		// Give the cursor the 'move' graphic on hover
		.hover(function(){
			$(this).css({ cursor: 'move' });
		}, function(){
			$(this).css({ cursor: 'pointer' });
		});
		
	return this;
  };
})( jQuery );