/**
 * Plugin Name: SMK Accordion jQuery Plugin v1.4
 * Author:      ZeroWP Team
 * Author URL:  http://zerowp.com/
 * License:     MIT
 */
;(function ( $ ) {

	$.fn.smk_Accordion = function( options ) {
		
		if (this.length > 1){
			this.each(function() { 
				$(this).smk_Accordion(options);
			});
			return this;
		}

		// To avoid scope issues, use 'plugin' instead of 'this'
		// to reference this class from internal events and functions.
		var plugin = this;

		this.isInteger =  function(value) {
			return typeof value === 'number' && 
				isFinite(value) && 
				Math.floor(value) === value;
		};

		this.isArray = function(arg) {
			return Object.prototype.toString.call(arg) === '[object Array]';
		};

		this.isObject = function isObject(arg) {
			return Object.prototype.toString.call(arg) === '[object Object]';
		};

		// Defaults
		var settings = $.extend({
			closeAble:  false, // Allow self close.
			closeOther: true, // Close other sections.
			slideSpeed: 150, // Animation Speed.
			activeIndex: 1  // The section open on first init.
		}, options );

		// Assign to plugin options data-* attributes if they exists
		$.each(settings, function(option, value) {
			var data_attr = option.replace(/([A-Z])/g, '-$1').toLowerCase().toString(), //`optionsName` becomes `option-name`
			new_val       =  plugin.data( data_attr );

			if( new_val || false === new_val ){
				settings[ option ] = new_val;
			}
		});

		if( settings.activeIndex === false || settings.closeOther === false ){
			settings.closeAble = true;
		}

		// "Constructor"
		var init = function() {

			if( options === 'refresh' ){
				plugin.unbind();
				plugin.destroy();
			}

			plugin.createStructure();
			plugin.clickHead();
		}

		// Toggle a single section by index
		this.toggleSection = function(mode, section, speed){
			if( section instanceof jQuery || plugin.isArray( section ) ){
				var this_section = section;
			}
			else if( plugin.isInteger( section ) ){
				var this_section = plugin.children().eq(section - 1);
			}

			$.each(this_section, function(index, sect) {
				if( plugin.isInteger( sect ) ){
					var acc_content = $( plugin.children().eq(sect - 1) ).children().eq(1);
				}
				else{
					var acc_content = $(sect).children().eq(1);
				}

				speed = ( speed >= 0 ) ? speed : settings.slideSpeed;

				if( speed > 0 ){
					( 'open' === mode ) ? acc_content.slideDown( speed ) : acc_content.slideUp( speed );
				}
				else{
					( 'open' === mode ) ? acc_content.show( speed ) : acc_content.hide( speed );
				}

				( 'open' === mode ) ? $(sect).addClass('acc_active') : $(sect).removeClass('acc_active');
			});
		}

		// Open a single section by index
		this.openSection = function(section, speed){
			plugin.toggleSection( 'open', section, speed );
		}

		// Close a single section by index
		this.closeSection = function(section, speed){
			plugin.toggleSection( 'close', section, speed );
		}

		// Close all sections
		this.closeAllSections = function(current_accortdion_sections, speed){
			plugin.closeSection( current_accortdion_sections, speed );
		}

		this.destroy = function(){

			//Add classes to accordion head and content for each section
			$.each( plugin.children(), function(index, elem){
				var _t = $(elem),
				childs = _t.children();

				//Create sections if they were not created already
				_t.removeClass('acc_section');

				//Add the necesary css clases
				$(childs[0]).removeClass('acc_head');
				$(childs[1]).removeClass('acc_content');
			});
			
			//Hide inactive
			plugin.children('.acc_section').not('.acc_active').children('.acc_content').show();

		}

		// Add .smk_accordion class
		this.createStructure = function() {

			//Add Main CSS Class
			plugin.addClass('smk_accordion');

			//Add classes to accordion head and content for each section
			$.each( plugin.children(), function(index, elem){
				var _t = $(elem),
				childs = _t.children();

				//Create sections if they were not created already
				_t.addClass('acc_section');

				//Make sure the section content exists. If not, then append an empty div. 
				if( childs.length < 2 ){
					_t.append('<div class="acc_content"></div>');
				}

				//Add the necesary css clases
				$(childs[0]).addClass('acc_head');
				$(childs[1]).addClass('acc_content');
			});
			
			//Hide inactive
			plugin.children('.acc_section').not('.acc_active').children('.acc_content').hide();

			//Active index
			if( plugin.isArray( settings.activeIndex ) ){
				plugin.openSection( settings.activeIndex, 0 );
			}
			else if(settings.activeIndex > 1){
				plugin.openSection( settings.activeIndex, 0 );
			}
			else if( false !== settings.activeIndex ){
				plugin.openSection( 1, 0 );
			}

		}

		// Action when the user click accordion head
		this.clickHead = function() {

			plugin.on('click', '.acc_head', function(){
				
				var s_parent = $(this).parent(); 
				
				// Close other sections when this section is opened
				if( s_parent.hasClass('acc_active') === false && settings.closeOther ){
					plugin.closeSection( plugin.children() );
				}

				// Allow to close itself
				if( s_parent.hasClass('acc_active') ){
					if( false !== settings.closeAble || plugin.children().length === 1 ){
						plugin.closeSection( s_parent );
					}
				}

				// Default behavior
				else{
					plugin.openSection( s_parent );
				}

			});

		}

		//"Constructor" init
		init();
		return this;

	};

	// Allow to create accordions only with `.smk_accordion` class
	jQuery(document).ready(function($){
		$(".smk_accordion").smk_Accordion();
	});

}( jQuery ));