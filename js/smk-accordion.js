
/**
 * SMK Accordion jQuery Plugin
 * ----------------------------------------------------
 * Author: Smartik
 * Author URL: http://smartik.ws/
 * Copyright: (c) Smartik.
 * License: MIT
 */
;(function ( $ ) {

	$.fn.smk_Accordion = function( options ) {

		// Defaults
		var settings = $.extend({
			// These are the defaults.
			animation: true,
			showIcon: true,
			closeAble: false,
			slideSpeed: 200
		}, options );

		// Cache current instance
		// To avoid scope issues, use 'plugin' instead of 'this'
		// to reference this class from internal events and functions.
		var plugin = this;

		//"Constructor"
		var init = function() {
			plugin.createStructure();
			plugin.clickHead();
		}

		// Add .smk_accordion class
		this.createStructure = function() {

			//Add Class
			plugin.addClass('smk_accordion');
			if( true === settings.showIcon ){
				plugin.addClass('acc_with_icon');
			}

			//Append icon
			if( true === settings.showIcon ){
				plugin.find('.acc_head').prepend('<div class="acc_icon_expand"></div>');
			}

			plugin.find('.accordion_in .acc_content').not('.acc_active .acc_content').hide();

		}

		// Action when the user click accordion head
		this.clickHead = function() {

			plugin.on('click', '.acc_head', function(){
				
				var s_parent = $(this).parent();
				
				if( s_parent.hasClass('acc_active') == false ){
					plugin.find('.acc_content').slideUp(settings.slideSpeed);
					plugin.find('.accordion_in').removeClass('acc_active');
				}

				if( s_parent.hasClass('acc_active') ){
					if( false !== settings.closeAble){
						s_parent.children('.acc_content').slideUp(settings.slideSpeed);
						s_parent.removeClass('acc_active');
					}
				}
				else{
					$(this).next('.acc_content').slideDown(settings.slideSpeed);
					s_parent.addClass('acc_active');
				}

			});

		}

		//"Constructor" init
		init();
		return this;

	};


}( jQuery ));
