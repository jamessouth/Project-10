

const $divsShown = $('main > div.shown');
// const $divsHidden = $('main > div.hidden');
const $overlay = $('.overlay');
const $modalCloseButtons = $('button.close');
const $modalNavButtons = $('.hidden button:not(.close)');
const $searchbox = $('input.search');
let $modalDivs = $('div.shown.visible').next('.hidden');




$.getJSON('https://randomuser.me/api/?results=12&nat=us,gb&inc=name,location,email,login,dob,cell,picture&noinfo').done(function(json){
	
	// console.log(json.results);
	
	$.each(json.results, function(i,v){
		
		console.log(v);
		
		
		
		
	});
	
});










$searchbox.on('input', function(){
	
	
	$.each($divsShown.find('h3'), function(i,v){
		let name = v.textContent.toLowerCase();
		
		
		if (!name.includes($searchbox.val().toLowerCase())){
			$(this).parent().parent('div.shown').hide().removeClass('visible');
		} else {
			$(this).parent().parent('div.shown').show().addClass('visible');
		}
		
		
	});
	$modalDivs = $('div.shown.visible').next('.hidden');
	
});


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
	
	let index = $modalDivs.index($(this).parent());
	
	if($(this).hasClass('left')){
		
		index -= 1;
		if(index < 0){
			index = $modalDivs.length - 1;
		}
		
		
	} else {
		
		index += 1;
		if(index > $modalDivs.length - 1){
			index = 0;
		}
		
		
	}
	
	$modalDivs[index].style.display = 'flex';
	
	
	
	$(this).parent('.hidden').hide();
	
});


















