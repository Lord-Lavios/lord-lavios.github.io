'use strict';

$(document).ready(function () {
	(function () {
		var interval = void 0;
		var $elem = {
			$window: $(window),
			$outerH: $(".outer-head"),
			$head: $(" .outer-head header"),
			$bin: $("#binary"),
			$foot: $("footer"),
			$project: $(".projects"),
			$htmlBody: $("html, body")
		};

		var events = {
			init: function init() {
				events.hoverEvents.init();
				events.clickEvents.init();
				events.activeEvents.init();
			},

			hoverEvents: {
				init: function init() {
					events.hoverEvents.hoverBinary();
				},
				hoverBinary: function hoverBinary() {
					$('.binaryContainer').on('mouseenter', '#binary', function () {
						console.log('HYJUYHDSJSDFSDF');
						var times = $(this).height() / $(this).parent('.project-second-inline-card').height() - 1;
						$(this).css("top", '-' + times * $(this).parent('.project-second-inline-card').height());
					});
					$('.binaryContainer').on('mouseleave', '#binary', function () {
						$(this).css('top', '0px');
					});
				}
			},
			clickEvents: {
				init: function init(arg) {
					//if(arg === 1) {
					//interval = setInterval(events.activeEvents.setMarginOfContent, 50);
					//} else {
					events.clickEvents.stack();
					events.clickEvents.seeMore();
					events.clickEvents.back();
					events.clickEvents.projectShow();
					events.clickEvents.moreProjects();
					//}	
				},
				moreProjects: function moreProjects() {
					$('._button').click(function () {
						$(this).remove();
						$("._hide").removeClass('_hide');
					});
				},
				stack: function stack() {
					$elem.$head.find(".links:eq(1)").click(function () {
						$elem.$window.css('display', 'initial');
						$('.container').removeClass('_hide');
						setTimeout(function () {
							if ($(document).width() <= 1200) {
								$elem.$htmlBody.animate({
									scrollTop: $('.skills').offset().top + 60
								}, 3000);
							} else {
								$elem.$htmlBody.animate({
									scrollTop: $('.skills').offset().top - 690
								}, 3000);
							}
						}, 100);
					});
				},
				seeMore: function seeMore() {
					$elem.$project.find(".see-more").click(function () {
						$('.binary-content').css('display', 'block');
						$elem.$htmlBody.css('overflow', 'hidden');
						events.clickEvents.init(1);
						setTimeout(function () {
							$('.binary-content').css('top', '0px');
						}, 5);
					});
				},
				back: function back() {
					$('.back').click(function () {
						var _this = this;

						$elem.$htmlBody.css('overflow-y', 'scroll');
						$(this).parent('div').parent('div').css('top', '2000px');
						setTimeout(function () {
							$(_this).parent('div').parent('div').css('display', 'none');
						}, 650);
					});
				},
				projectShow: function projectShow() {
					$elem.$head.find(".links:eq(0)").click(function () {
						$('.container').removeClass('_hide');
						setTimeout(function () {
							$elem.$htmlBody.animate({
								scrollTop: $('.projects').offset().top
							}, 500);
						}, 200);
					});
				}
			},
			activeEvents: {
				init: function init() {
					events.activeEvents.scrollWindow();
					events.activeEvents.makeCardsWithSecondBelow();
					setInterval(events.activeEvents.replaceImages, 1000);
				},
				replaceImages: function replaceImages() {
					console.log('this');
					if ($(document).width() <= 1250) {
						if ($('#binary').length === 1) {
							$('#binary').remove();
							$(".binaryContainer").append('<img src=smallScreenBinary.png></img>');
						}
					} else {
						if ($('#binary').length === 0) {
							$(".binaryContainer").find('img').remove();
							$(".binaryContainer").append('<img id=binary src=binary2.png></img>');
						}
					}
				},
				makeCardsWithSecondBelow: function makeCardsWithSecondBelow() {
					var eventCheck = 0;
					setInterval(function () {
						if ($elem.$window.width() <= 1220 && eventCheck !== 1) {
							$("._silver").map(function () {
								eventCheck = 1;
								if ($(this).find('.project-second-inline-card').parent('.project-half').length === 0) {
									var firstCard = $(this).find('.project-second-inline-card');
									$(this).find('.project-second-inline-card').remove();
									$(this).append(firstCard);
								}
							});
						} else if ($elem.$window.width() > 1220 && eventCheck !== 2) {
							$("._silver").map(function () {
								eventCheck = 2;
								if ($(this).find('.project-second-inline-card').parent('.project-half').length === 0) {
									var secondCard = $(this).find('.project-second-inline-card');
									$(this).find('.project-second-inline-card').remove();
									$(this).prepend(secondCard);
								}
							});
						}
					}, 300);
				},
				scrollWindow: function scrollWindow() {
					$elem.$window.scroll(function () {
						var projectOffset = $elem.$project.offset().top;
						var winScroll = $(this).scrollTop();
						var posProject = projectOffset - winScroll;
						if ($(document).width() > 500) {
							console.log('THIS WORKED');
							events.helperEvents.parallax(winScroll, posProject, projectOffset, true);
						}
					});
				},
				setMarginOfContent: function setMarginOfContent() {
					if ($('.binary-content').css('top') !== '2000px') {
						if ($(document).width() > 1000) {
							$('.horizontal-line').css('width', ($('.buttons').width() - 278) / 2);
							$('.mid-content').css('margin-bottom', $('.binary-content .content-card:nth-child(3)').height() + 50);
							$('.vertical-line-2 .vertical-line ').css('height', $('.binary-content .content-card:nth-child(3)').height() + 186);
						} else {
							$('.mid-content').css('margin-bottom', '0px');
							$('.horizontal-line').css('width', ($('.buttons').width() - 320) / 2);
						}
					} else {
						console.log('clearted');
						clearInterval(interval);
					}
				}
			},
			helperEvents: {
				parallax: function parallax(winScroll, posProject, projectOffset, width) {
					header();
					function header() {
						if (posProject < -2800 && $elem.$outerH.css('absolute') !== 'absolute') {
							console.log('worked 1');
							$elem.$outerH.css('position', 'absolute');
						}
						if (winScroll < 1200 && $elem.$outerH.css('position') !== 'fixed') {
							console.log('worked 2');
							$elem.$outerH.css('position', 'fixed');
						}
						$elem.$head.css('opacity', posProject / projectOffset);
						if (width !== false) {
							$elem.$head.css('top', posProject / 2);
						}
					}
				}
			}
		};
		events.init();
	})();
});
//# sourceMappingURL=data:application/json;base64,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QUFNLE9BQU4sQ0FBYyxHQUFkLENBQWtCLFVBQWxCLE1BQWtDLE9BQXpELEVBQWtFO0FBQ2pFLGVBQVEsR0FBUixDQUFZLFVBQVo7QUFDQSxhQUFNLE9BQU4sQ0FBYyxHQUFkLENBQWtCLFVBQWxCLEVBQThCLE9BQTlCO0FBQ0E7QUFDRCxZQUFNLEtBQU4sQ0FBWSxHQUFaLENBQWdCLFNBQWhCLEVBQTJCLGFBQVcsYUFBdEM7QUFDQSxVQUFHLFVBQVUsS0FBYixFQUFvQjtBQUNuQixhQUFNLEtBQU4sQ0FBWSxHQUFaLENBQWdCLEtBQWhCLEVBQXVCLGFBQVcsQ0FBbEM7QUFDQTtBQUNEO0FBQ0Q7QUFqQlk7QUE5SkEsR0FBZjtBQWtMQSxTQUFPLElBQVA7QUFDQSxFQS9MRDtBQWdNQSxDQWpNRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSAge1xyXG5cdChmdW5jdGlvbigpIHtcclxuXHRcdGxldCBpbnRlcnZhbDtcclxuXHRcdGNvbnN0ICRlbGVtID0ge1xyXG5cdFx0XHQkd2luZG93OiAkKHdpbmRvdyksXHJcblx0XHRcdCRvdXRlckg6ICQoXCIub3V0ZXItaGVhZFwiKSxcclxuXHRcdFx0JGhlYWQ6ICQoXCIgLm91dGVyLWhlYWQgaGVhZGVyXCIpLFxyXG5cdFx0XHQkYmluOiAkKFwiI2JpbmFyeVwiKSxcclxuXHRcdFx0JGZvb3Q6ICQoXCJmb290ZXJcIiksXHJcblx0XHRcdCRwcm9qZWN0OiAkKFwiLnByb2plY3RzXCIpLFxyXG5cdFx0XHQkaHRtbEJvZHk6ICQoXCJodG1sLCBib2R5XCIpXHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgZXZlbnRzID0ge1xyXG5cdFx0XHRpbml0KCkge1xyXG5cdFx0XHRcdGV2ZW50cy5ob3ZlckV2ZW50cy5pbml0KCk7XHJcblx0XHRcdFx0ZXZlbnRzLmNsaWNrRXZlbnRzLmluaXQoKTtcclxuXHRcdFx0XHRldmVudHMuYWN0aXZlRXZlbnRzLmluaXQoKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0aG92ZXJFdmVudHM6IHtcclxuXHRcdFx0XHRpbml0KCkge1xyXG5cdFx0XHRcdFx0ZXZlbnRzLmhvdmVyRXZlbnRzLmhvdmVyQmluYXJ5KClcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGhvdmVyQmluYXJ5KCkge1xyXG5cdFx0XHRcdFx0JCgnLmJpbmFyeUNvbnRhaW5lcicpLm9uKCdtb3VzZWVudGVyJywgJyNiaW5hcnknLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ0hZSlVZSERTSlNERlNERicpO1xyXG5cdFx0XHRcdFx0XHRsZXQgdGltZXMgPSAoJCh0aGlzKS5oZWlnaHQoKS8kKHRoaXMpLnBhcmVudCgnLnByb2plY3Qtc2Vjb25kLWlubGluZS1jYXJkJykuaGVpZ2h0KCkpIC0gMTtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5jc3MoXCJ0b3BcIiwgJy0nICsgdGltZXMgKiAkKHRoaXMpLnBhcmVudCgnLnByb2plY3Qtc2Vjb25kLWlubGluZS1jYXJkJykuaGVpZ2h0KCkpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHQkKCcuYmluYXJ5Q29udGFpbmVyJykub24oJ21vdXNlbGVhdmUnLCAnI2JpbmFyeScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmNzcygndG9wJywgJzBweCcpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdFx0Y2xpY2tFdmVudHM6IHtcclxuXHRcdFx0XHRpbml0KGFyZykge1xyXG5cdFx0XHRcdFx0Ly9pZihhcmcgPT09IDEpIHtcclxuXHRcdFx0XHRcdFx0Ly9pbnRlcnZhbCA9IHNldEludGVydmFsKGV2ZW50cy5hY3RpdmVFdmVudHMuc2V0TWFyZ2luT2ZDb250ZW50LCA1MCk7XHJcblx0XHRcdFx0XHQvL30gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGV2ZW50cy5jbGlja0V2ZW50cy5zdGFjaygpO1xyXG5cdFx0XHRcdFx0XHRldmVudHMuY2xpY2tFdmVudHMuc2VlTW9yZSgpO1xyXG5cdFx0XHRcdFx0XHRldmVudHMuY2xpY2tFdmVudHMuYmFjaygpO1xyXG5cdFx0XHRcdFx0XHRldmVudHMuY2xpY2tFdmVudHMucHJvamVjdFNob3coKTtcclxuXHRcdFx0XHRcdFx0ZXZlbnRzLmNsaWNrRXZlbnRzLm1vcmVQcm9qZWN0cygpO1xyXG5cdFx0XHRcdFx0Ly99XHRcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG1vcmVQcm9qZWN0cygpIHtcclxuXHRcdFx0XHRcdCQoJy5fYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdCQoXCIuX2hpZGVcIikucmVtb3ZlQ2xhc3MoJ19oaWRlJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN0YWNrKCkge1xyXG5cdFx0XHRcdFx0JGVsZW0uJGhlYWQuZmluZChcIi5saW5rczplcSgxKVwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0JGVsZW0uJHdpbmRvdy5jc3MoJ2Rpc3BsYXknLCAnaW5pdGlhbCcpO1xyXG5cdFx0XHRcdFx0XHQkKCcuY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ19oaWRlJyk7XHJcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYoJChkb2N1bWVudCkud2lkdGgoKSA8PSAxMjAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQkZWxlbS4kaHRtbEJvZHkuYW5pbWF0ZSh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHNjcm9sbFRvcDogJCgnLnNraWxscycpLm9mZnNldCgpLnRvcCArIDYwXHJcblx0XHRcdFx0XHRcdFx0XHR9LCAzMDAwKTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0JGVsZW0uJGh0bWxCb2R5LmFuaW1hdGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzY3JvbGxUb3A6ICQoJy5za2lsbHMnKS5vZmZzZXQoKS50b3AgLSA2OTBcclxuXHRcdFx0XHRcdFx0XHRcdH0sIDMwMDApO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSwgMTAwKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c2VlTW9yZSgpIHtcclxuXHRcdFx0XHRcdCRlbGVtLiRwcm9qZWN0LmZpbmQoXCIuc2VlLW1vcmVcIikuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdCQoJy5iaW5hcnktY29udGVudCcpLmNzcygnZGlzcGxheScsJ2Jsb2NrJyk7XHJcblx0XHRcdFx0XHRcdCRlbGVtLiRodG1sQm9keS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cdFx0XHRcdFx0XHRldmVudHMuY2xpY2tFdmVudHMuaW5pdCgxKTtcclxuXHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0JCgnLmJpbmFyeS1jb250ZW50JykuY3NzKCd0b3AnLCcwcHgnKTtcclxuXHRcdFx0XHRcdFx0fSwgNSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGJhY2soKSB7XHJcblx0XHRcdFx0XHQkKCcuYmFjaycpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkZWxlbS4kaHRtbEJvZHkuY3NzKCdvdmVyZmxvdy15JywgJ3Njcm9sbCcpO1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudCgnZGl2JykucGFyZW50KCdkaXYnKS5jc3MoJ3RvcCcsICcyMDAwcHgnKTtcclxuXHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoJ2RpdicpLnBhcmVudCgnZGl2JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHRcdFx0XHRcdFx0fSwgNjUwKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cHJvamVjdFNob3coKSB7XHJcblx0XHRcdFx0XHQkZWxlbS4kaGVhZC5maW5kKFwiLmxpbmtzOmVxKDApXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkKCcuY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ19oaWRlJyk7XHJcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0JGVsZW0uJGh0bWxCb2R5LmFuaW1hdGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0c2Nyb2xsVG9wOiAkKCcucHJvamVjdHMnKS5vZmZzZXQoKS50b3BcclxuXHRcdFx0XHRcdFx0XHR9LCA1MDApO1xyXG5cdFx0XHRcdFx0XHR9LCAyMDApO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRhY3RpdmVFdmVudHM6IHtcclxuXHRcdFx0XHRpbml0KCkge1xyXG5cdFx0XHRcdFx0ZXZlbnRzLmFjdGl2ZUV2ZW50cy5zY3JvbGxXaW5kb3coKTtcclxuXHRcdFx0XHRcdGV2ZW50cy5hY3RpdmVFdmVudHMubWFrZUNhcmRzV2l0aFNlY29uZEJlbG93KCk7XHJcblx0XHRcdFx0XHRzZXRJbnRlcnZhbChldmVudHMuYWN0aXZlRXZlbnRzLnJlcGxhY2VJbWFnZXMsIDEwMDApO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cmVwbGFjZUltYWdlcygpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCd0aGlzJyk7XHJcblx0XHRcdFx0XHRpZigkKGRvY3VtZW50KS53aWR0aCgpIDw9IDEyNTApIHtcclxuXHRcdFx0XHRcdFx0aWYoJCgnI2JpbmFyeScpLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNiaW5hcnknKS5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0XHQkKFwiLmJpbmFyeUNvbnRhaW5lclwiKS5hcHBlbmQoJzxpbWcgc3JjPXNtYWxsU2NyZWVuQmluYXJ5LnBuZz48L2ltZz4nKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWYoJCgnI2JpbmFyeScpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdCQoXCIuYmluYXJ5Q29udGFpbmVyXCIpLmZpbmQoJ2ltZycpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdCQoXCIuYmluYXJ5Q29udGFpbmVyXCIpLmFwcGVuZCgnPGltZyBpZD1iaW5hcnkgc3JjPWJpbmFyeTIucG5nPjwvaW1nPicpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRtYWtlQ2FyZHNXaXRoU2Vjb25kQmVsb3coKSB7XHJcblx0XHRcdFx0XHRsZXQgZXZlbnRDaGVjayA9IDA7XHJcblx0XHRcdFx0XHRzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0aWYoJGVsZW0uJHdpbmRvdy53aWR0aCgpIDw9IDEyMjAgJiYgZXZlbnRDaGVjayAhPT0gMSkge1xyXG5cdFx0XHRcdFx0XHRcdCQoXCIuX3NpbHZlclwiKS5tYXAoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRldmVudENoZWNrID0gMTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmKCQodGhpcykuZmluZCgnLnByb2plY3Qtc2Vjb25kLWlubGluZS1jYXJkJykucGFyZW50KCcucHJvamVjdC1oYWxmJykubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxldCBmaXJzdENhcmQgPSAkKHRoaXMpLmZpbmQoJy5wcm9qZWN0LXNlY29uZC1pbmxpbmUtY2FyZCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJy5wcm9qZWN0LXNlY29uZC1pbmxpbmUtY2FyZCcpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpLmFwcGVuZChmaXJzdENhcmQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYoJGVsZW0uJHdpbmRvdy53aWR0aCgpID4gMTIyMCAmJiBldmVudENoZWNrICE9PSAyKSB7XHJcblx0XHRcdFx0XHRcdFx0JChcIi5fc2lsdmVyXCIpLm1hcChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGV2ZW50Q2hlY2sgPSAyO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYoJCh0aGlzKS5maW5kKCcucHJvamVjdC1zZWNvbmQtaW5saW5lLWNhcmQnKS5wYXJlbnQoJy5wcm9qZWN0LWhhbGYnKS5sZW5ndGggPT09IDApIHsgXHJcblx0XHRcdFx0XHRcdFx0XHRcdGxldCBzZWNvbmRDYXJkID0gJCh0aGlzKS5maW5kKCcucHJvamVjdC1zZWNvbmQtaW5saW5lLWNhcmQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS5maW5kKCcucHJvamVjdC1zZWNvbmQtaW5saW5lLWNhcmQnKS5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS5wcmVwZW5kKHNlY29uZENhcmQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9IFxyXG5cdFx0XHRcdFx0fSwgMzAwKTtcdFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c2Nyb2xsV2luZG93KCkge1xyXG5cdFx0XHRcdFx0JGVsZW0uJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdGxldCBwcm9qZWN0T2Zmc2V0ID0gJGVsZW0uJHByb2plY3Qub2Zmc2V0KCkudG9wO1xyXG5cdFx0XHRcdFx0XHRsZXQgd2luU2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuXHRcdFx0XHRcdFx0bGV0IHBvc1Byb2plY3QgPSBwcm9qZWN0T2Zmc2V0IC0gd2luU2Nyb2xsO1xyXG5cdFx0XHRcdFx0XHRpZigkKGRvY3VtZW50KS53aWR0aCgpID4gNTAwKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1RISVMgV09SS0VEJyk7XHJcblx0XHRcdFx0XHRcdFx0ZXZlbnRzLmhlbHBlckV2ZW50cy5wYXJhbGxheCh3aW5TY3JvbGwsIHBvc1Byb2plY3QsIHByb2plY3RPZmZzZXQsIHRydWUpIFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHNldE1hcmdpbk9mQ29udGVudCgpIHtcclxuXHRcdFx0XHRcdGlmKCQoJy5iaW5hcnktY29udGVudCcpLmNzcygndG9wJykgIT09ICcyMDAwcHgnKSB7XHJcblx0XHRcdFx0XHRcdGlmKCQoZG9jdW1lbnQpLndpZHRoKCkgPiAxMDAwKSB7XHJcblx0XHRcdFx0XHRcdFx0JCgnLmhvcml6b250YWwtbGluZScpLmNzcygnd2lkdGgnLCAoJCgnLmJ1dHRvbnMnKS53aWR0aCgpIC0gMjc4KS8yKTtcclxuXHRcdFx0XHRcdFx0XHQkKCcubWlkLWNvbnRlbnQnKS5jc3MoJ21hcmdpbi1ib3R0b20nLCAkKCcuYmluYXJ5LWNvbnRlbnQgLmNvbnRlbnQtY2FyZDpudGgtY2hpbGQoMyknKS5oZWlnaHQoKSArIDUwKTtcclxuXHRcdFx0XHRcdFx0XHQkKCcudmVydGljYWwtbGluZS0yIC52ZXJ0aWNhbC1saW5lICcpLmNzcygnaGVpZ2h0JywgJCgnLmJpbmFyeS1jb250ZW50IC5jb250ZW50LWNhcmQ6bnRoLWNoaWxkKDMpJykuaGVpZ2h0KCkgKyAxODYpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdCQoJy5taWQtY29udGVudCcpLmNzcygnbWFyZ2luLWJvdHRvbScsICcwcHgnKTtcclxuXHRcdFx0XHRcdFx0XHQkKCcuaG9yaXpvbnRhbC1saW5lJykuY3NzKCd3aWR0aCcsICgkKCcuYnV0dG9ucycpLndpZHRoKCkgLSAzMjApLzIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ2NsZWFydGVkJyk7XHJcblx0XHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0aGVscGVyRXZlbnRzOiB7XHJcblx0XHRcdFx0cGFyYWxsYXgod2luU2Nyb2xsLCBwb3NQcm9qZWN0LCBwcm9qZWN0T2Zmc2V0LCB3aWR0aCkge1xyXG5cdFx0XHRcdFx0aGVhZGVyKCk7XHJcblx0XHRcdFx0XHRmdW5jdGlvbiBoZWFkZXIoKSB7XHJcblx0XHRcdFx0XHRcdGlmKHBvc1Byb2plY3QgPCAtIDI4MDAgJiYgJGVsZW0uJG91dGVySC5jc3MoJ2Fic29sdXRlJykgIT09ICdhYnNvbHV0ZScpIHtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnd29ya2VkIDEnKTtcclxuXHRcdFx0XHRcdFx0XHQkZWxlbS4kb3V0ZXJILmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZih3aW5TY3JvbGwgPCAxMjAwICYmICRlbGVtLiRvdXRlckguY3NzKCdwb3NpdGlvbicpICE9PSAnZml4ZWQnKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ3dvcmtlZCAyJyk7XHJcblx0XHRcdFx0XHRcdFx0JGVsZW0uJG91dGVySC5jc3MoJ3Bvc2l0aW9uJywgJ2ZpeGVkJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0JGVsZW0uJGhlYWQuY3NzKCdvcGFjaXR5JywgcG9zUHJvamVjdC9wcm9qZWN0T2Zmc2V0KTtcclxuXHRcdFx0XHRcdFx0aWYod2lkdGggIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdFx0JGVsZW0uJGhlYWQuY3NzKCd0b3AnLCBwb3NQcm9qZWN0LzIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRldmVudHMuaW5pdCgpO1xyXG5cdH0pKCk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
