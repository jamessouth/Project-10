

const $divsShown = $('main > div.shown');
const $divsHidden = $('main > div.hidden');
const $overlay = $('.overlay');
const $modalCloseButtons = $('button.close');
const $modalNavButtons = $('.hidden button:not(.close)');




$divsShown.on('click', function(){
	let $modal = $(this).next(`[data-num=${$(this).data('num')}]`);
	
	
	
	$overlay.show();
	
	$modal.css('display', 'flex');
	$(this).blur();
});


$modalCloseButtons.on('click', function(){
	$overlay.hide();
	$(this).parent('.hidden').hide();
	
});


$modalNavButtons.on('click', function(){
	
	//loop around if first or last
	if($(this).hasClass('left')){
		
		console.log($(this).parent('.hidden').prev().prev('.hidden'));
		
		
	} else {
		
		console.log($(this).parent('.hidden').next().next('.hidden'));
		
	}
	
	
	
});


















