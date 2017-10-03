

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

// https://gist.github.com/mshafrir/2646763
states_hash = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'American Samoa': 'AS',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'District Of Columbia': 'DC',
    'Federated States Of Micronesia': 'FM',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Guam': 'GU',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Marshall Islands': 'MH',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Northern Mariana Islands': 'MP',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Palau': 'PW',
    'Pennsylvania': 'PA',
    'Puerto Rico': 'PR',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virgin Islands': 'VI',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
}




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
		
		
		let state;
		// console.log(v.location.state);
		for(let st in states_hash){
			if(v.location.state.toLowerCase() === st.toLowerCase()){
				state = states_hash[st];
				break;
			}
		}
		
		
		
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
		$hidAddys[i].textContent = `${v.location.street}, ${v.location.city}, ${state} ${v.location.postcode}`;
		$hidBdays[i].textContent = v.dob;
		
		if($shownEmails[i].offsetWidth > 221){
			$shownEmails[i].textContent = $shownEmails[i].textContent.replace(/^\w+/i, abbrev);
		}
		
		$hidPhones[i].textContent = $hidPhones[i].textContent.replace('-', ' ');
		
		
		
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


















