

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
let $hidUsers = $divsHidden.find('p.user');
let $hidEmails = $divsHidden.find('p.email');
let $hidCities = $divsHidden.find('p.city');
let $hidPhones = $divsHidden.find('p.phone');
let $hidAddys = $divsHidden.find('p.addy');
let $hidBdays = $divsHidden.find('p.bday');


function abbrev(match){
	return match[0];
}
function caps(match){
	return match[0].toUpperCase() + match.substring(1);
}




$.getJSON('https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,login,dob,cell,picture&noinfo').done(function(json){
	
	// console.log(json.results);
	
	$.each(json.results, function(i,v){
		
		let name = `${v.name.first.trim().replace(/([A-zÀ-ÿğŞı]+|\w+[A-zÀ-ÿğŞı]*)\w*$/gi, caps).replace(/jean-/, 'Jean-').replace(/anne-/, 'Anne-')} ${v.name.last.trim().replace(/([A-zÀ-ÿğŞı]+|\w+[A-zÀ-ÿğŞı]*)\w*$/gi, caps).replace(/cdonal/, 'cDonal').replace(/toole/, "'Toole").replace(/brien/, "'Brien").replace(/donoghue/, "'Donoghue").replace(/mahony/, "'Mahony").replace(/(\w)\1{2}/g, '$1$1').replace(/jean-/, 'Jean-').replace(/^mccoy/i, 'McCoy').replace(/^mck\w+/i, 'McKinney')}`;
		
		// console.log(v.location.city);
		let city = v.location.city.trim().replace(/Lousville/i, 'Louisville').replace(/Bueblo/i, 'Pueblo').replace(/mcallen/i, 'McAllen').replace(/flowermound/i, 'Flower Mound').replace(/mckinney/i, 'McKinney').replace(/rochmond/i, 'Richmond');
		
		// console.log(city);
		
		// if(v.location.city === 'rochmond'){
			// $shownCities[0].textContent = city;
		// }
		
		// if(v.location.city.includes('winston')){
			// $shownCities[1].textContent = city;
		// }
		
		
		
		
		$shownPics[i].src = v.picture.large;
		$shownNames[i].textContent = name;
		$shownEmails[i].textContent = v.email;
		$shownCities[i].textContent = city;
		
		$hidPics[i].src = v.picture.large;
		$hidNames[i].textContent = name;
		$hidUsers[i].textContent = v.login.username;
		$hidEmails[i].textContent = v.email;
		$hidCities[i].textContent = city;
		$hidPhones[i].textContent = v.cell;
		$hidAddys[i].textContent = `${v.location.street} ${v.location.city}, ${v.location.state} ${v.location.postcode}`;
		$hidBdays[i].textContent = v.dob;
		
		if($shownEmails[i].offsetWidth > 221){
			$shownEmails[i].textContent = $shownEmails[i].textContent.replace(/^\w+/i, abbrev);
		}
		
		
		
		
		
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
	let topDist = window.scrollY + 20;
	// console.log(topDist);
	
	$overlay.show();
	
	$modal.css({'display': 'flex', 'top': topDist});
	$(this).blur();
});


$modalCloseButtons.on('click', function(){
	$overlay.hide();
	$(this).parent('.hidden').hide();
	
});


$modalNavButtons.on('click', function(){
	
	let index = $modalDivs.index($(this).parent());
	let topDist = window.scrollY + 20;
	// console.log(topDist);
	
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
	$modalDivs[index].style.top = `${topDist}px`;
	
	
	$(this).parent('.hidden').hide();
	
});


















