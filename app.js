

const $divsShown = $('main > div.shown');
const $divsHidden = $('main > div.hidden');
const $overlay = $('.overlay');
const $modalCloseButtons = $('button.close');
const $modalNavButtons = $('.hidden button:not(.close)');
const $searchbox = $('input.search');
let $modalDivs = $('div.shown.visible').next('.hidden');

let $shownPics = $divsShown.children('img');
let $shownNames = $divsShown.find('h3');
let $shownEmails = $divsShown.find('p.email');
let $shownCities = $divsShown.find('p.city');

let $hidPics = $divsHidden.children('img');
let $hidNames = $divsHidden.find('h3');
let $hidUsers = $divsHidden.find('p:first-of-type');
let $hidEmails = $divsHidden.find('p.email');
let $hidCities = $divsHidden.find('p.city');
let $hidPhones = $divsHidden.find('p.phone');
let $hidAddys = $divsHidden.find('p.addy');
let $hidBdays = $divsHidden.find('p.bday');



$.getJSON('https://randomuser.me/api/?results=12&nat=us,gb&inc=name,location,email,login,dob,cell,picture&noinfo').done(function(json){
	
	// console.log(json.results);
	
	$.each(json.results, function(i,v){
		
		console.log(v);
		
		$shownPics[i].src = v.picture.large;
		$shownNames[i].textContent = `${v.name.first} ${v.name.last}`;
		$shownEmails[i].textContent = v.email;
		$shownCities[i].textContent = v.location.city;
		
		$hidPics[i].src = v.picture.large;
		$hidNames[i].textContent = `${v.name.first} ${v.name.last}`;
		$hidUsers[i].textContent = v.login.username;
		$hidEmails[i].textContent = v.email;
		$hidCities[i].textContent = v.location.city;
		$hidPhones[i].textContent = v.cell;
		$hidAddys[i].textContent = `${v.location.street} ${v.location.city}, ${v.location.state} ${v.location.postcode}`;
		$hidBdays[i].textContent = v.dob;
		
		
		
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


















