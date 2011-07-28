(function ($) {
	$.fn.trunc = function (options) {
		var defaults = {
			textLength : 160,
			minTail : 60,
			allowExpand : true,
			moreText : "Read More",
			lessText : "Read Less",
			ellipseText : "..."
		};
		
		options = $.extend(defaults, options);
		return this.each(function () {
			var $this, bodyText,
				splitLoc,
				textToShow,
				textToHide,
				$ellipseSpan,
				$hiddenSpan,
				$moreLink,
				isExpandet;
			
			$this = $(this);
			bodyText = $this.html();
			if (bodyText.length > (options.textLength + options.minTail)) {
				splitLoc = bodyText.indexOf(". ", options.textLength); 

				if (splitLoc !== -1) {
				
					textToShow = bodyText.substring(0, splitLoc);
					textToHide = bodyText.substring(splitLoc, bodyText.length);
					
					$ellipseSpan = $("<span></span").addClass("ellipseText").html(options.ellipseText);
					if (options.allowExpand) {
						isExpandet = false;
						$hiddenSpan = $("<span></span>").addClass("hiddenText").html(textToHide).hide(); 
						$moreLink = $("<a href='#'></a>").addClass("readMore")
							.html(options.moreText).bind({
								click : function (e) {
									e.preventDefault();
									if (!isExpandet) {
										isExpandet = true;
										$ellipseSpan.hide();
										$hiddenSpan.show("fast").css("display", "inline");
										$moreLink.html(options.lessText);
										$this.trigger("expanding.trunc");
									} else {
										isExpandet = false;
										$hiddenSpan.hide("fast");
										$ellipseSpan.show();
										$moreLink.html(options.moreText);
										$this.trigger("collapsing.trunc");
									}
								}
							});
						$this.html(textToShow).append($ellipseSpan, $hiddenSpan);
						$this.after($moreLink);
					} else {
						$this.html(textToShow).append($ellipseSpan);
					}
				}
			}
		});
	};
}(jQuery));