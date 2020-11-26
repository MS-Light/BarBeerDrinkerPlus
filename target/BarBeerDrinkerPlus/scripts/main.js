(function() {
	/**
	 * Variables
	 */
	var user_id = '1111';
	var user_fullname = 'John';
	
	console.log(user_id);
	
	function init() {
		validateSession();
		document.querySelector('#login-form-btn').addEventListener('click',
				onSessionInvalid);
		document.querySelector('#register-form-btn').addEventListener('click',
				showRegisterForm);
		document.querySelector('#register-btn').addEventListener('click',
				register);
		document.querySelector('#login-btn').addEventListener('click', login);
		validateSession();
		
		document.querySelector('#bar-btn').addEventListener('click',
				loadBars);
		document.querySelector('#beer-btn').addEventListener('click',
				loadBeers);
		document.querySelector('#drinker-btn').addEventListener('click',
				loadDrinkers);
		document.querySelector('#bartender-btn').addEventListener('click',
				loadBartender);
		document.querySelector('#manufacturer-btn').addEventListener('click',
				loadManufacturer);
		document.querySelector('#insert-btn').addEventListener('click',
				loadInsert);
//		document.querySelector('#bar-beer-btn').addEventListener('click',
//				searchBestSellBar);
	}
	function validateSession() {
		onSessionInvalid();
		// The request parameters
		var url = './login';
		var req = JSON.stringify({});

		// display loading message
		showLoadingMessage('Validating session...');

		// make AJAX call
		ajax('GET', url, req,
		// session is still valid
		function(res) {
			var result = JSON.parse(res);
			if (result.status === 'OK') {
				onSessionValid(result);
			}
		}, function() {
			console.log('login error')
		});
	}

	function showLoadingMessage(msg) {
		var itemList = document.querySelector('#item-list');
		itemList.innerHTML = '<p class="notice"><i class="fa fa-spinner fa-spin"></i> '
				+ msg + '</p>';
	}

	function onSessionValid(result) {
		user_id = result.user_id;
		user_fullname = result.name;

		var loginForm = document.querySelector('#login-form');
		var registerForm = document.querySelector('#register-form');
		var itemNav = document.querySelector('#item-nav');
		var itemList = document.querySelector('#item-list');
		var avatar = document.querySelector('#avatar');
		var welcomeMsg = document.querySelector('#welcome-msg');
		var logoutBtn = document.querySelector('#logout-link');

		welcomeMsg.innerHTML = 'Welcome, ' + user_fullname;

		showElement(itemNav);
		showElement(itemList);
		showElement(avatar);
		showElement(welcomeMsg);
		showElement(logoutBtn, 'inline-block');
		hideElement(loginForm);
		hideElement(registerForm);
	}

	function loadBeers() {
		hideElement(document.querySelector('#insert-form'));
		console.log('loadBeers');
		activeBtn('beer-btn');
		var itemList = document.querySelector('#item-list');
		itemList.innerHTML ='<div id="bar-form"><label for="beername"> Beer Name: </label><input id="beer_beer_input" name="beer" type="text"><button id="beer-beer-btn">Search Bar</button><button id="beer-beer-consumer">Search Consumers</button><button id="beer-beer-time">Time Distribution</button></div>';
		document.querySelector('#beer-beer-btn').addEventListener('click',searchBestSellBar);
		document.querySelector('#beer-beer-consumer').addEventListener('click',searchBiggestConsumers);
		document.querySelector('#beer-beer-time').addEventListener('click',searchTimeDistributions);
	}
	
	function loadDrinkers() {
		hideElement(document.querySelector('#insert-form'));
		console.log('loadDrinkers');
		activeBtn('drinker-btn');
		var itemList = document.querySelector('#item-list');
//		itemList.innerHTML = "<input type='text' name='Drinker' value='' >";
//		var Drinker = document.getElementById('Drinker');
//		
//		var btn = document.createElement("BUTTON");
//		btn.innerHTML = "Search";
//		btn.addEventListener('click', function() {
//		    searchDrinkers(Drinker.value);
//		}, false);
//		itemList.appendChild(btn);
		
		itemList.innerHTML ='<div id="drinker-form"><label for="username">User Name: </label><input id="drinker_username" name="username" type="text"><button id="search-btn">Search</button></div><button id="drinker-graph-btn">Graph Orders the most</button></div><button id="drinker-spend-btn">Drinker Spending per Day / Month</button></div>';
		document.querySelector('#search-btn').addEventListener('click',searchDrinkers);
		document.querySelector('#drinker-graph-btn').addEventListener('click',graphDrinkers);
		document.querySelector('#drinker-spend-btn').addEventListener('click',graphDrinkerSpend);
	}
	
	function loadBars() {
		hideElement(document.querySelector('#insert-form'));
		console.log('loadbars');
		activeBtn('bar-btn');
		var itemList = document.querySelector('#item-list');
		itemList.innerHTML ='<div id="bar-form"><label for="barname"> Bar Name: </label><input id="bar_beer_input" name="beer" type="text"><button id="bar-largest-spender">Largest spenders</button><button id="bar-popular-beer">Most popular beer</button><button id="bar-manufacture">Most sells manufacturers</button></div><button id="bar-busy-time">Most Busiest time</button></div><button id="bar-distribution-sales">Distribution Sales</button></div>';
		document.querySelector('#bar-largest-spender').addEventListener('click',searchBar1);
		document.querySelector('#bar-popular-beer').addEventListener('click',searchBar2);
		document.querySelector('#bar-manufacture').addEventListener('click',searchBar3);
		document.querySelector('#bar-busy-time').addEventListener('click',graphBarBusy);
		document.querySelector('#bar-distribution-sales').addEventListener('click',graphDistributionSales);

	}
	function searchBar1(){searchBar('getlargestspender');}
	function searchBar2(){searchBar('getpopularbeers');}
	function searchBar3(){searchBar('getbestmanufacturers');}
	
	function loadBartender(){
		hideElement(document.querySelector('#insert-form'));
		console.log('loadbartender');
		activeBtn('bartender-btn');
		var itemList = document.querySelector('#item-list');
		itemList.innerHTML ='<div id="bartender-form"><label for="bartendername"> Bartender Name: </label><input id="bartender_name_input" name="bartender" type="text"><label for="barname"> Bar Name: </label><input id="bartender_bar_input" name="bar" type="text"><button id="bartender-shift-btn">Bartender Shifts</button><button id="bartender-beer-sold">Most Sold beers</button>';
		document.querySelector('#bartender-shift-btn').addEventListener('click',searchBartenderShift);
		document.querySelector('#bartender-beer-sold').addEventListener('click',searchBartenderSold);
	}
	function loadManufacturer(){
		hideElement(document.querySelector('#insert-form'));
		console.log('loadmanufacturer');
		activeBtn('manufacturer-btn');
		var itemList = document.querySelector('#item-list');
		itemList.innerHTML ='<div id="manufacturer-form"><label for="manufacturername"> Manufacturer Name: </label><input id="manufacturer_name_input" name="manufacturer" type="text"><button id="manufacturer-region">Highest Sell</button><button id="manufacturer-Beer">Beers are liked the most</button>';
		document.querySelector('#manufacturer-region').addEventListener('click',searchManufacturerRegion);
		document.querySelector('#manufacturer-Beer').addEventListener('click',searchManufacturerBeer);
	}
	function searchBar(input){
		// request parameters
		var barname = document.querySelector('#bar_beer_input').value;
		var url = './'+input+'?bar='+barname;
		var data = null;

		// display loading message
		showLoadingMessage('Loading Beers...');

		// make AJAX call
		ajax('GET', url, data,
				// successful callback
				function(res) {
					var items = JSON.parse(res);
					if (!items || items.length === 0) {
						showWarningMessage('No Bars. Make sure you have Bars on the list.xx');
					} else {
						showLoadingMessage('Loading items...');
						listItems(items);
					}
				},
				// failed callback
				function() {
					showErrorMessage('Cannot load Beers.');
				});
	}
	
	
	function $create(tag, options) {
		var element = document.createElement(tag);
		for ( var key in options) {
			if (options.hasOwnProperty(key)) {
				element[key] = options[key];
			}
		}
		return element;
	}
	function searchBartenderShift(){
		var bartender = document.querySelector('#bartender_name_input').value;
		var bar = document.querySelector('#bartender_bar_input').value;
		var url = './getbartendershifts?bartender='+bartender+'&bar='+bar;
		var data = null;
		showLoadingMessage('Loading Bartender...');
		ajax('GET', url, data,
				function(res) {
					var items = JSON.parse(res);
					if (!items || items.length === 0) {
						showWarningMessage('No such Bartender.');
					} else {
						showLoadingMessage('Loading Bartender...');
						listBartenderShift(items);
					}
				},
				// failed callback
				function() {
					showErrorMessage('Cannot load Drinker.');
				});
	}
	
	function searchBartenderSold(){
		var bartender = document.querySelector('#bartender_name_input').value;
		var bar = document.querySelector('#bartender_bar_input').value;
		var url = './getbartendersold?bartender='+bartender+'&bar='+bar;
		var data = null;
		showLoadingMessage('Loading Bartender...');
		ajax('GET', url, data,
				function(res) {
					var items = JSON.parse(res);
					if (!items || items.length === 0) {
						showWarningMessage('No such Bartender.');
					} else {
						showLoadingMessage('Loading Bartender...');
						listItems(items);
					}
				},
				// failed callback
				function() {
					showErrorMessage('Cannot load Drinker.');
				});
	}
	function searchBestSellBar(){
		var beername = document.querySelector('#beer_beer_input').value;
		var url = './getbestsellbar?beer='+beername;
		var data = null;
		showLoadingMessage('Loading Bars...');
		ajax('GET', url, data,
				function(res) {
					var items = JSON.parse(res);
					if (!items || items.length === 0) {
						showWarningMessage('No Bars.');
					} else {
						showLoadingMessage('Loading items...');
						listBestSellBar(items, beername);
					}
				},
				// failed callback
				function() {
					showErrorMessage('Cannot load Drinker.');
				});
	}
	function searchBiggestConsumers(){
		var beername = document.querySelector('#beer_beer_input').value;
		var url = './getbiggestconsumer?beer='+beername
		var data = null;
		showLoadingMessage('Loading Consumers...');
		ajax('GET', url, data,
				function(res) {
					var items = JSON.parse(res);
					if (!items || items.length === 0) {
						showWarningMessage('No such beer.');
					} else {
						showLoadingMessage('Loading Biggest Consumers...');
						listItems(items);
					}
				},
				// failed callback
				function() {
					showErrorMessage('Cannot load beer.');
				});
	}
	function searchTimeDistributions(){
		var beername = document.querySelector('#beer_beer_input').value;
		var url = './getbeertimedistribution?beer='+beername;
		var title = "Time Distribution of When "+beername+" Sells the Most";
		graph(url,title,"Date","Quantity");
	}
	function searchDrinkers(){
		// display loading message
//		showLoadingMessage('Loading Drinkers...');
		var userid = document.querySelector('#drinker_username').value;
		
		var url = './getdrinker?username='+userid;
		var data = null;

		ajax('GET', url, data,
		function(res) {
			var items = JSON.parse(res);
			if (!items || items.length === 0) {
				showWarningMessage('No Drinker.');
			} else {
				showLoadingMessage('Loading items...');
				listDrinker(items);
			}
		},
		// failed callback
		function() {
			showErrorMessage('Cannot load Drinker.');
		});
	}

	
	function searchManufacturerRegion(){
		var manufacturer = document.querySelector('#manufacturer_name_input').value;
		var url = './gethighestregion?manufacturer='+manufacturer;
		var data = null;
		ajax('GET', url, data,
		function(res) {
			var items = JSON.parse(res);
			if (!items || items.length === 0) {
				showWarningMessage('No Sells.');
			} else {
				showLoadingMessage('Loading items...');
				listItems(items);
			}
		},
		// failed callback
		function() {
			showErrorMessage('Cannot load Drinker.');
		});
	}
	
	function searchManufacturerBeer(){
		var manufacturer = document.querySelector('#manufacturer_name_input').value;
		var url = './getmostlikes?manufacturer='+manufacturer;
		var data = null;
		ajax('GET', url, data,
		function(res) {
			var items = JSON.parse(res);
			if (!items || items.length === 0) {
				showWarningMessage('No Likes.');
			} else {
				showLoadingMessage('Loading items...');
				listItems(items);
			}
		},
		// failed callback
		function() {
			showErrorMessage('Cannot load Drinker.');
		});
	}
	
	// -------------------------------------
	// Create item list
	// -------------------------------------
	/**
	 * List recommendation items base on the data received
	 * 
	 * @param items -
	 *            An array of item JSON objects
	 */
	function listItems(items) {
		var itemList = document.querySelector('#item-list');
		itemList.innerHTML = ''; // clear current results
		for (var i = 0; i < items.length; i++) {
			addItem(itemList, items[i]);
		}
	}
	function listBestSellBar(items,beer){
		var itemList = document.querySelector('#item-list');
		itemList.innerHTML = ''; // clear current results
		var li = $create('li', {
			id : 'item-protocal',
			className : 'drinker'
		});
		// section
		var section0 = $create('div');
		var title = $create('a', {
			className : 'drinker-title-big',
		});
		title.innerHTML = 'Top Five bars where '+beer+' sells the most:';
		section0.appendChild(title);
		li.appendChild(section0);
		itemList.appendChild(li);
		for (var i = 0; i < items.length; i++) {
			addBestSellBars(itemList, items[i]);
		}
	}
	function listBartenderShift(items){
		var itemList = document.querySelector('#item-list');
		//itemList.innerHTML = ''; // clear current results
		itemList.innerHTML = '';
		var li = $create('li', {
			id : 'item-protocal',
			className : 'drinker'
		});
		
		var section4 = $create('div');
		var keyword4 = $create('p', {
			className : 'drinker-title'
		});
		keyword4.innerHTML = 'Date';
		section4.appendChild(keyword4);
		li.appendChild(section4);
		
		var section5 = $create('div');
		var keyword5 = $create('p', {
			className : 'drinker-itemtype'
		});
		keyword5.innerHTML = 'Day';
		section5.appendChild(keyword5);
		li.appendChild(section5);
		
		var section7 = $create('div');
		var keyword7 = $create('p', {
			className : 'drinker-item'
		});
		keyword7.innerHTML = 'Start';
		section7.appendChild(keyword7)
		li.appendChild(section7);
		
		var section3 = $create('div');
		var keyword3 = $create('p', {
			className : 'drinker-item'
		});
		keyword3.innerHTML = 'End';
		section3.appendChild(keyword3);
		li.appendChild(section3);
		
		itemList.appendChild(li);
		for (var i = 0; i < items.length; i++) {
			addBartenderShifts(itemList, items[i]);
		}
	}
	function listDrinker(items) {
		var itemList = document.querySelector('#item-list');
		//itemList.innerHTML = ''; // clear current results
		itemList.innerHTML = '';
		var li = $create('li', {
			id : 'item-protocal',
			className : 'drinker'
		});
		// section
		var section0 = $create('div');
		var title = $create('a', {
			className : 'drinker-title',
		});
		title.innerHTML = 'bar';
		section0.appendChild(title);
		li.appendChild(section0);
		
		var section = $create('div');
		var keyword = $create('p', {
			className : 'drinker-item'
		});
		keyword.innerHTML = 'item';
		section.appendChild(keyword)
		li.appendChild(section);
		
		var section7 = $create('div');
		var keyword7 = $create('p', {
			className : 'drinker-item'
		});
		keyword7.innerHTML = 'Quantity';
		section7.appendChild(keyword7)
		li.appendChild(section7);
		
		var section3 = $create('div');
		var keyword3 = $create('p', {
			className : 'drinker-item'
		});
		keyword3.innerHTML = 'price';
		section3.appendChild(keyword3);
		li.appendChild(section3);
		
		var section4 = $create('div');
		var keyword4 = $create('p', {
			className : 'drinker-item'
		});
		keyword4.innerHTML = 'type';
		section4.appendChild(keyword4);
		li.appendChild(section4);
		
		var section5 = $create('div');
		var keyword5 = $create('p', {
			className : 'drinker-item'
		});
		keyword5.innerHTML = 'Total Price';
		section5.appendChild(keyword5);
		li.appendChild(section5);
		
		var section2 = $create('div');
		var keyword2 = $create('p', {
			className : 'drinker-item'
		});
		keyword2.innerHTML = 'date';
		section2.appendChild(keyword2);
		li.appendChild(section2);
		
		var section6 = $create('div');
		var keyword6 = $create('p', {
			className : 'drinker-itemtype'
		});
		keyword6.innerHTML = 'time';
		section6.appendChild(keyword6);
		li.appendChild(section6);
		
		
		itemList.appendChild(li);
		for (var i = 0; i < items.length; i++) {
			addDrinker(itemList, items[i]);
		}
	}
//	function addDrinker2(itemList, item){
//		var transform = {'<>':'div', 'text':'${item}  quantity: ${quantity}  price: ${price}'};
//		let html = json2html.transform(item,transform);
//		itemList.appendChild(html);
//	}
	function addBartenderShifts(itemList, item){
		// create the <li> tag and specify the id and class attributes
		var li = $create('li', {
			className : 'drinker'
		});
		// section
		var section2 = $create('div');
		var keyword2 = $create('p', {
			className : 'drinker-title'
		});
		keyword2.innerHTML = item.date;
		section2.appendChild(keyword2);
		li.appendChild(section2);
		
		var section4 = $create('div');
		var totalprice = $create('p', {
			className : 'drinker-itemtype'
		});
		totalprice.innerHTML = item.day;
		section4.appendChild(totalprice);
		li.appendChild(section4);
		
		var section7 = $create('div');
		var keyword7 = $create('p', {
			className : 'drinker-item'
		});
		keyword7.innerHTML = item.start;
		section7.appendChild(keyword7);
		li.appendChild(section7);
		
		var section3 = $create('div');
		var keyword3 = $create('p', {
			className : 'drinker-item'
		});
		keyword3.innerHTML = item.end;
		section3.appendChild(keyword3);
		li.appendChild(section3);
		
		
		itemList.appendChild(li);
	}
	function addDrinker(itemList, item){
		var item_id = item.Transactions_id;
		// create the <li> tag and specify the id and class attributes
		var li = $create('li', {
			id : 'item-' + item_id,
			className : 'drinker'
		});
		// section
		var section0 = $create('div');

		// title
		var title = $create('a', {
			className : 'drinker-title',
		});
		title.innerHTML = item.Bill[0].bar;
		section0.appendChild(title);
		li.appendChild(section0);
		
		var section = $create('div');

		for (var i = 0; i < item.Bill.length; i++){
			// keyword
			var billdetail = item.Bill[i];
			addInnerItem(section, billdetail);
		}
		li.appendChild(section);
		
		var section7 = $create('div');
		for (var i = 0; i < item.Bill.length; i++){
			// keyword
			var billdetail = item.Bill[i];
			addInnerQuantity(section7, billdetail);
		}
		li.appendChild(section7);
		
		var section3 = $create('div');
		for (var i = 0; i < item.Bill.length; i++){
			// keyword
			var billdetail = item.Bill[i];
			addInnerPrice(section3, billdetail);
		}
		li.appendChild(section3);
		
		var section2 = $create('div');
		
		for (var i = 0; i < item.Bill.length; i++){
			var billdetail = item.Bill[i];
			addInnerItemtype(section2, billdetail);
//			addDrinker2(section, billdetail);
		}
		li.appendChild(section2);
		
		var section4 = $create('div');
		var totalprice = $create('p', {
			className : 'drinker-item'
		});
		totalprice.innerHTML = billdetail.totalPrice;
		section4.appendChild(totalprice);
		li.appendChild(section4);
		
		var section5 = $create('div');
		var key5 = $create('p', {
			className : 'drinker-item'
		});
		key5.innerHTML = billdetail.date;
		section5.appendChild(key5);
		li.appendChild(section5);
		
		var section6 = $create('div');
		var time = $create('p', {
			className : 'drinker-itemtype'
		});
		time.innerHTML = billdetail.time;
		section6.appendChild(time);
		li.appendChild(section6);
		
		itemList.appendChild(li);
	}
	
	function addInnerQuantity(section, billdetail){
		var keyword = $create('p', {
			className : 'drinker-item'
		});
		keyword.innerHTML = billdetail.quantity;
		section.appendChild(keyword);
	}
	function addInnerItem(section,billdetail){
		var keyword = $create('p', {
			className : 'drinker-item'
		});
		keyword.innerHTML = billdetail.item;
		section.appendChild(keyword);
	}
	function addInnerItemtype(section, billdetail){
		var keyword2 = $create('p', {
			className : 'drinker-item'
		});
		keyword2.innerHTML = billdetail.type;
		section.appendChild(keyword2);
	}
	function addInnerPrice(section,billdetail){
		var keyword = $create('p', {
			className : 'drinker-item'
		});
		keyword.innerHTML = billdetail.price;
		section.appendChild(keyword);
	}
	
	function addItem(itemList, item) {
		var item_id = item.name;

		// create the <li> tag and specify the id and class attributes
		var li = $create('li', {
			id : 'item-' + item_id,
			className : 'beer'
		});

		// section
		var section = $create('div');

		// title
		var title = $create('a', {
			className : 'beer-name',
		});
		title.innerHTML = item.name;
		section.appendChild(title);

		// keyword
		var keyword = $create('p', {
			className : 'beer-manf'
		});
		keyword.innerHTML = item.manf;
		section.appendChild(keyword);

		li.appendChild(section);
		itemList.appendChild(li);
	}
	function addBestSellBars(itemList, item) {
		// create the <li> tag and specify the id and class attributes
		var li = $create('li', {
			className : 'beer'
		});

		// section
		var section = $create('div');

		// title
		var title = $create('a', {
			className : 'beer-name',
		});
		title.innerHTML = item.bar;
		section.appendChild(title);
		li.appendChild(section);
		itemList.appendChild(li);
	}


	function activeBtn(btnId) {
		var btns = document.querySelectorAll('.main-nav-btn');

		// deactivate all navigation buttons
		for (var i = 0; i < btns.length; i++) {
			btns[i].className = btns[i].className.replace(/\bactive\b/, '');
		}

		// active the one that has id = btnId
		var btn = document.querySelector('#' + btnId);
		btn.className += ' active';
	}

	function showLoadingMessage(msg) {
		var itemList = document.querySelector('#item-list');
		itemList.innerHTML = '<p class="notice"><i class="fa fa-spinner fa-spin"></i> '
				+ msg + '</p>';
	}

	function showWarningMessage(msg) {
		var itemList = document.querySelector('#item-list');
		itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-triangle"></i> '
				+ msg + '</p>';
	}

	function showErrorMessage(msg) {
		var itemList = document.querySelector('#item-list');
		itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-circle"></i> '
				+ msg + '</p>';
	}


	// only show login form, hide the rest
	function onSessionInvalid() {
		var loginForm = document.querySelector('#login-form');
		var registerForm = document.querySelector('#register-form');
		var itemNav = document.querySelector('#item-nav');
		var itemList = document.querySelector('#item-list');
		var avatar = document.querySelector('#avatar');
		var welcomeMsg = document.querySelector('#welcome-msg');
		var logoutBtn = document.querySelector('#logout-link');

		hideElement(itemNav);
		hideElement(itemList);
		hideElement(avatar);
		hideElement(logoutBtn);
		hideElement(welcomeMsg);
		hideElement(registerForm);
		hideElement(document.querySelector('#insert-form'));

		clearLoginError();
		showElement(loginForm);
	}



	function showRegisterForm() {
		var loginForm = document.querySelector('#login-form');
		var registerForm = document.querySelector('#register-form');
		var itemNav = document.querySelector('#item-nav');
		var itemList = document.querySelector('#item-list');
		var avatar = document.querySelector('#avatar');
		var welcomeMsg = document.querySelector('#welcome-msg');
		var logoutBtn = document.querySelector('#logout-link');

		hideElement(itemNav);
		hideElement(itemList);
		hideElement(avatar);
		hideElement(logoutBtn);
		hideElement(welcomeMsg);
		hideElement(loginForm);

		clearRegisterResult();
		showElement(registerForm);
	}
	
	function register() {
		var username = document.querySelector('#register-username').value;
		var password = document.querySelector('#register-password').value;
		var firstName = document.querySelector('#register-first-name').value;
		var lastName = document.querySelector('#register-last-name').value;

		if (username === "" || password == "" || firstName === ""
				|| lastName === "") {
			showRegisterResult('Please fill in all fields');
			return;
		}

		if (username.match(/^[a-z0-9_]+$/) === null) {
			showRegisterResult('Invalid username');
			return;
		}
		password = md5(username + md5(password));

		// The request parameters
		var url = './register';
		var req = JSON.stringify({
			user_id : username,
			password : password,
			first_name : firstName,
			last_name : lastName,
		});

		ajax('POST', url, req,
		// successful callback
		function(res) {
			var result = JSON.parse(res);
			// successfully logged in
			if (result.status === 'OK') {
				showRegisterResult('Succesfully registered');
			} else {
				showRegisterResult('User already existed');
			}
		},
		// error
		function() {
			showRegisterResult('Failed to register');
		}, true);
	}
	
	function login() {
		var username = document.querySelector('#username').value;
		var password = document.querySelector('#password').value;
		password = md5(username + md5(password));

		// The request parameters
		var url = './login';
		var req = JSON.stringify({
			user_id : username,
			password : password,
		});

		ajax('POST', url, req,
		// successful callback
		function(res) {
			var result = JSON.parse(res);
			// successfully logged in
			if (result.status === 'OK') {
				console.log('login successfully!')
			}
		},
		// error
		function() {
			showLoginError();
		});
	}

	function showLoginError() {
		document.querySelector('#login-error').innerHTML = 'Invalid username or password';
	}

	function showRegisterResult(registerMessage) {
		document.querySelector('#register-result').innerHTML = registerMessage;
	}
	function showModifyResult(modifyMessage) {
		document.querySelector('#modify-result').innerHTML = modifyMessage;
	}


	function clearRegisterResult() {
		document.querySelector('#register-result').innerHTML = '';
	}

	function hideElement(element) {
		element.style.display = 'none';
	}
	function clearLoginError() {
		document.querySelector('#login-error').innerHTML = '';
	}
	function showElement(element, style) {
		var displayStyle = style ? style : 'block';
		element.style.display = displayStyle;
	}
	
	function ajax(method, url, data, successCallback, errorCallback) {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);


		xhr.onload = function() {
			if (xhr.status === 200) {
				successCallback(xhr.responseText);
			} else {
				errorCallback();
			}
		};

		xhr.onerror = function() {
			console.error("The request couldn't be completed.");
			errorCallback();
		};

		if (data === null) {
			xhr.send();
		} else {
			xhr.setRequestHeader("Content-Type",
					"application/json;charset=utf-8");
			xhr.send(data);
		}
	}
	function graphDrinkers(){
		let username =  document.querySelector('#drinker_username').value;
		let url = "./getdrinkerordermost?username="+username;
		let title = "Beers "+username+" orders the most";
		graph(url,title,"Beer name","Count");
	}
	function graphDrinkerSpend(){
		let username =  document.querySelector('#drinker_username').value;
		let url = "./getdrinkerspendingday?username="+username;
		let title = "Beers "+username+" Buy per Days";
		graph(url,title,"Day","Spent");
		url = "./getdrinkerspendingmonth?username="+username;
		title = "Beers "+username+" Buy per Month";
		graph(url,title,"Months","Spent");
	}
	
	function graphBarBusy(){
		let bar = document.querySelector('#bar_beer_input').value;
		let url = "./getbusiestperiods?bar="+bar;
		let title = "Busy time period of "+bar;
		graph(url,title,"Time (Hour)","Sells in total");
	}
	
	function graphDistributionSales(){
		let bar = document.querySelector('#bar_beer_input').value;
		let url = "./getdistributionsales?bar="+bar;
		let title = "Distribution Sales period of "+bar;
		graph(url,title,"Date","Sales");
	}
	
	function graph(url,title,axisx,axisy){
		var itemList = document.querySelector('#item-list');
		var ct = $create('div',{
			id: "chartContainer"+url,
			style: "height: 370px; max-width: 920px; margin: 0px auto;"
		});
		itemList.appendChild(ct);
		var dataPoints = [];

		var chart = new CanvasJS.Chart("chartContainer"+url, {
			animationEnabled: true,
			theme: "light2",
			title: {
				text: title
			},
			axisX: {
				title: axisx,
				titleFontSize: 24,
				includeZero: true
			},
			axisY: {
				title: axisy,
				titleFontSize: 24,
				includeZero: true
			},
			data: [{
				type: "column",
				dataPoints: dataPoints
			}]
		});

		function addData(data) {
			for (var i = 0; i < data.length; i++) {
				dataPoints.push({
					label: data[i].name,
					y: parseInt(data[i].manf)
				});
			}
			chart.render();

		}

		$.getJSON(url, addData);
	}
	function graphDate(url,title,axisx,axisy){
		var itemList = document.querySelector('#item-list');
		var ct = $create('div',{
			id: "chartContainer"+url,
			style: "height: 370px; max-width: 920px; margin: 0px auto;"
		});
		itemList.appendChild(ct);
		var dataPoints = [];

		var chart = new CanvasJS.Chart("chartContainer"+url, {
			animationEnabled: true,
			theme: "light2",
			title: {
				text: title
			},
			axisX: {
				title: axisx,
				titleFontSize: 24,
				includeZero: true
			},
			axisY: {
				title: axisy,
				titleFontSize: 24,
				includeZero: true
			},
			data: [{
				type: "column",
				dataPoints: dataPoints
			}]
		});

		function addData(data) {
			for (var i = 0; i < data.length; i++) {
				dataPoints.push({
					label: Date.parse(data[i].name),
					y: parseInt(data[i].manf)
				});
			}
			chart.render();

		}

		$.getJSON(url, addData);
	}
		
//		var chart = new CanvasJS.Chart("chartContainer", {
//			theme:"light2",
//			animationEnabled: true,
//			title:{
//				text: "Game of Thrones Viewers of the First Airing on HBO"
//			},
//			axisY :{
//				includeZero: false,
//				title: "Number of Viewers",
//				suffix: "mn"
//			},
//			toolTip: {
//				shared: "true"
//			},
//			legend:{
//				cursor:"pointer",
//				itemclick : toggleDataSeries
//			},
//			data: [{
//				type: "spline",
//				visible: false,
//				showInLegend: true,
//				yValueFormatString: "##.00mn",
//				name: "Season 1",
//				dataPoints: [
//					{ label: "Ep. 1", y: 2.22 },
//					{ label: "Ep. 2", y: 2.20 },
//					{ label: "Ep. 3", y: 2.44 },
//					{ label: "Ep. 4", y: 2.45 },
//					{ label: "Ep. 5", y: 2.58 },
//					{ label: "Ep. 6", y: 2.44 },
//					{ label: "Ep. 7", y: 2.40 },
//					{ label: "Ep. 8", y: 2.72 },
//					{ label: "Ep. 9", y: 2.66 },
//					{ label: "Ep. 10", y: 3.04 }
//				]
//			},
//			{
//				type: "spline", 
//				showInLegend: true,
//				visible: false,
//				yValueFormatString: "##.00mn",
//				name: "Season 2",
//				dataPoints: [
//					{ label: "Ep. 1", y: 3.86 },
//					{ label: "Ep. 2", y: 3.76 },
//					{ label: "Ep. 3", y: 3.77 },
//					{ label: "Ep. 4", y: 3.65 },
//					{ label: "Ep. 5", y: 3.90 },
//					{ label: "Ep. 6", y: 3.88 },
//					{ label: "Ep. 7", y: 3.69 },
//					{ label: "Ep. 8", y: 3.86 },
//					{ label: "Ep. 9", y: 3.38 },
//					{ label: "Ep. 10", y: 4.20 }
//				]
//			},
//			{
//				type: "spline",
//				visible: false,
//				showInLegend: true,
//				yValueFormatString: "##.00mn",
//				name: "Season 3",
//				dataPoints: [
//					{ label: "Ep. 1", y: 4.37 },
//					{ label: "Ep. 2", y: 4.27 },
//					{ label: "Ep. 3", y: 4.72 },
//					{ label: "Ep. 4", y: 4.87 },
//					{ label: "Ep. 5", y: 5.35 },
//					{ label: "Ep. 6", y: 5.50 },
//					{ label: "Ep. 7", y: 4.84 },
//					{ label: "Ep. 8", y: 4.13 },
//					{ label: "Ep. 9", y: 5.22 },
//					{ label: "Ep. 10", y: 5.39 }
//				]
//			},
//			{
//				type: "spline", 
//				showInLegend: true,
//				yValueFormatString: "##.00mn",
//				name: "Season 4",
//				dataPoints: [
//					{ label: "Ep. 1", y: 6.64 },
//					{ label: "Ep. 2", y: 6.31 },
//					{ label: "Ep. 3", y: 6.59 },
//					{ label: "Ep. 4", y: 6.95 },
//					{ label: "Ep. 5", y: 7.16 },
//					{ label: "Ep. 6", y: 6.40 },
//					{ label: "Ep. 7", y: 7.20 },
//					{ label: "Ep. 8", y: 7.17 },
//					{ label: "Ep. 9", y: 6.95 },
//					{ label: "Ep. 10", y: 7.09 }
//				]
//			},
//			{
//				type: "spline", 
//				showInLegend: true,
//				yValueFormatString: "##.00mn",
//				name: "Season 5",
//				dataPoints: [
//					{ label: "Ep. 1", y: 8 },
//					{ label: "Ep. 2", y: 6.81 },
//					{ label: "Ep. 3", y: 6.71 },
//					{ label: "Ep. 4", y: 6.82 },
//					{ label: "Ep. 5", y: 6.56 },
//					{ label: "Ep. 6", y: 6.24 },
//					{ label: "Ep. 7", y: 5.40 },
//					{ label: "Ep. 8", y: 7.01 },
//					{ label: "Ep. 9", y: 7.14 },
//					{ label: "Ep. 10", y: 8.11 }
//				]
//			},
//			{
//				type: "spline", 
//				showInLegend: true,
//				yValueFormatString: "##.00mn",
//				name: "Season 6",
//				dataPoints: [
//					{ label: "Ep. 1", y: 7.94 },
//					{ label: "Ep. 2", y: 7.29 },
//					{ label: "Ep. 3", y: 7.28 },
//					{ label: "Ep. 4", y: 7.82 },
//					{ label: "Ep. 5", y: 7.89 },
//					{ label: "Ep. 6", y: 6.71 },
//					{ label: "Ep. 7", y: 7.80 },
//					{ label: "Ep. 8", y: 7.60 },
//					{ label: "Ep. 9", y: 7.66 },
//					{ label: "Ep. 10", y: 8.89 }
//				]
//			},
//			{
//				type: "spline", 
//				showInLegend: true,
//				yValueFormatString: "##.00mn",
//				name: "Season 7",
//				dataPoints: [
//					{ label: "Ep. 1", y: 10.11 },
//					{ label: "Ep. 2", y: 9.27 },
//					{ label: "Ep. 3", y: 9.25 },
//					{ label: "Ep. 4", y: 10.17 },
//					{ label: "Ep. 5", y: 10.72 },
//					{ label: "Ep. 6", y: 10.24 },
//					{ label: "Ep. 7", y: 12.07 }
//				]
//			}]
//		});
//		chart.render();
//
//		function toggleDataSeries(e) {
//			if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
//				e.dataSeries.visible = false;
//			} else {
//				e.dataSeries.visible = true;
//			}
//			chart.render();
//		}
		
		
	function loadInsert(){
		showElement(document.querySelector('#insert-form'));
		activeBtn('insert-btn');
		var itemList = document.querySelector('#item-list');
		itemList.innerHTML ='';
//		<div id="insert-drinker">
//	        <label for="name">Drinker: *</label>
//	        <input id="insert-input-drinker" name="drinker" type="text">
//	    </div>
//		<div id="insert-state">
//			<label for="state">State: *</label>
//			<input id="insert-input-state" name="state" type="text">
//		</div>
//		
//		<div id="insert-manf">
//		        <label for="manf">Manufacturer: *</label>
//		        <input id="insert-input-manf" name="manf" type="text">
//		</div>
//		<div id="insert-beer">
//		        <label for="beer">Beer: *</label>
//		        <input id="insert-input-beer" name="beer" type="text">
//		</div>
//		<div id="insert-bar">
//		        <label for="bar">Bar: *</label>
//		        <input id="insert-input-bar" name="bar" type="text">
//		</div>
//		<div id="insert-date">
//		        <label for="date">Date: *</label>
//		        <input id="insert-input-date" name="date" type="text">
//		</div>
//		<div id="insert-itemid">
//		        <label for="itemid">Item_id: *</label>
//		        <input id="insert-input-itemid" name="itemid" type="text">
//		</div>
//		<div id="insert-day">
//		        <label for="day">Day: *</label>
//		        <input id="insert-input-day" name="day" type="text">
//		</div>
//		<div id="insert-phone">
//		        <label for="phone">Phone: *</label>
//		        <input id="insert-input-phone" name="phone" type="text">
//		</div>
//		<div id="insert-startquantity">
//		        <label for="startquantity">Startquantity: *</label>
//		        <input id="insert-input-startquantity" name="Startquantity" type="text">
//		</div>
//		<div id="insert-endquantity">
//		        <label for="endquantity">Endquantity: *</label>
//		        <input id="insert-input-endquantity" name="Endquantity" type="text">
//		</div>
//		<div id="insert-start">
//		        <label for="start">Start: *</label>
//		        <input id="insert-input-start" name="Start" type="text">
//		</div>
//		<div id="insert-end">
//		        <label for="end">End: *</label>
//		        <input id="insert-input-end" name="End" type="text">
//		</div>
//		<div id="insert-itemprice">
//		        <label for="itemprice">Item_price: *</label>
//		        <input id="insert-input-itemprice" name="Itemprice" type="text">
//		</div>
//		<div id="insert-taxprice">
//		        <label for="taxprice">Tax_price: *</label>
//		        <input id="insert-input-taxprice" name="Taxprice" type="text">
//		</div>
//		<div id="insert-tip">
//		        <label for="tip">Tip: *</label>
//		        <input id="insert-input-tip" name="Tip" type="text">
//		</div>
//		<div id="insert-totalprice">
//		        <label for="totalprice">Total_price: *</label>
//		        <input id="insert-input-totalprice" name="Totalprice" type="text">
//		</div>
//		<div id="insert-item">
//		        <label for="item">Item: *</label>
//		        <input id="insert-input-item" name="Item" type="text">
//		</div>
//		<div id="insert-type">
//		        <label for="type">Type: *</label>
//		        <input id="insert-input-type" name="Type" type="text">
//		</div>
//		<div id="insert-price">
//		        <label for="price">Price: *</label>
//		        <input id="insert-input-price" name="Price" type="text">
//		</div>
//		
//		
//		
//		
//		
//		
//		<div id="update-drinker">
//	        <label for="name">Replace Drinker: *</label>
//	        <input id="update-input-drinker" name="drinker" type="text">
//	    </div>
//		<div id="update-state">
//			<label for="state">Replace State: *</label>
//			<input id="update-input-state" name="state" type="text">
//		</div>
//		
//		<div id="update-manf">
//		        <label for="manf">Replace Manufacturer: *</label>
//		        <input id="update-input-manf" name="manf" type="text">
//		</div>
//		<div id="update-beer">
//		        <label for="beer">Replace Beer: *</label>
//		        <input id="update-input-beer" name="beer" type="text">
//		</div>
//		<div id="update-bar">
//		        <label for="bar">Replace Bar: *</label>
//		        <input id="update-input-bar" name="bar" type="text">
//		</div>
//		<div id="update-date">
//		        <label for="date">Replace Date: *</label>
//		        <input id="update-input-date" name="date" type="text">
//		</div>
//		<div id="update-itemid">
//		        <label for="itemid">Replace Item_id: *</label>
//		        <input id="update-input-itemid" name="itemid" type="text">
//		</div>
//		<div id="update-day">
//		        <label for="day">Replace Day: *</label>
//		        <input id="update-input-day" name="day" type="text">
//		</div>
//		<div id="update-phone">
//		        <label for="phone">Replace Phone: *</label>
//		        <input id="update-input-phone" name="phone" type="text">
//		</div>
//		<div id="update-startquantity">
//		        <label for="startquantity">Replace Startquantity: *</label>
//		        <input id="update-input-startquantity" name="Startquantity" type="text">
//		</div>
//		<div id="update-endquantity">
//		        <label for="endquantity">Replace Endquantity: *</label>
//		        <input id="update-input-endquantity" name="Endquantity" type="text">
//		</div>
//		<div id="update-start">
//		        <label for="start">Replace Start: *</label>
//		        <input id="update-input-start" name="Start" type="text">
//		</div>
//		<div id="update-end">
//		        <label for="end">Replace End: *</label>
//		        <input id="update-input-end" name="End" type="text">
//		</div>
//		<div id="update-itemprice">
//		        <label for="itemprice">Replace Item_price: *</label>
//		        <input id="update-input-itemprice" name="Itemprice" type="text">
//		</div>
//		<div id="update-taxprice">
//		        <label for="taxprice">Replace Tax_price: *</label>
//		        <input id="update-input-taxprice" name="Taxprice" type="text">
//		</div>
//		<div id="update-tip">
//		        <label for="tip">Replace Tip: *</label>
//		        <input id="update-input-tip" name="Tip" type="text">
//		</div>
//		<div id="update-totalprice">
//		        <label for="totalprice">Replace Total_price: *</label>
//		        <input id="update-input-totalprice" name="Totalprice" type="text">
//		</div>
//		<div id="update-item">
//		        <label for="item">Replace Item: *</label>
//		        <input id="update-input-item" name="Item" type="text">
//		</div>
//		<div id="update-type">
//		        <label for="type">Replace Type: *</label>
//		        <input id="update-input-type" name="Type" type="text">
//		</div>
//		<div id="update-price">
//		        <label for="price">Replace Price: *</label>
//		        <input id="update-input-price" name="Price" type="text">
//		</div>
//		
//		
//		
//		
//		
//        
//        
//        
//        <div id="insert-btn-group">
//			<button id="insert-drinker-btn">Insert Drinker</button>
//			<button id="insert-state-btn">Insert State</button>
//			<button id="insert-manf-btn">Insert Manufacturer</button>
//			<button id="insert-beer-btn">Insert Beer</button>
//			<button id="insert-bar-btn">Insert Bar</button>
//			<button id="insert-date-btn">Insert Date</button>
//			<button id="insert-itemid-btn">Insert Item_id</button>
//			<button id="insert-day-btn">Insert Day</button>
//			<button id="insert-phone-btn">Insert Phone</button>
//			<button id="insert-startquantity-btn">Insert Startquantity</button>
//			<button id="insert-endquantity-btn">Insert Endquantity</button>
//			<button id="insert-start-btn">Insert Start</button>
//			<button id="insert-end-btn">Insert End</button>
//			<button id="insert-itemprice-btn">Insert Item_price</button>
//			<button id="insert-taxprice-btn">Insert Tax_price</button>
//			<button id="insert-tip-btn">Insert Tip</button>
//			<button id="insert-totalprice-btn">Insert Total_price</button>
//			<button id="insert-item-btn">Insert Item</button>
//			<button id="insert-type-btn">Insert Type</button>
//			<button id="insert-price-btn">Insert Price</button>
//	     </div>
//	        
//	        
//	     <div id="insert-progress">
//	        <button id="insert-btn">Insert</button>
//	        <button id="delete-btn">Delete</button>
//	        <button id="update-btn">Update</button>
//	        <p id="modify-result"></p>
//         </div>;`
		
		
		
		
		hideElement(document.querySelector('#insert-state'));
        hideElement(document.querySelector('#insert-drinker'));
        hideElement(document.querySelector('#insert-manf'));
        hideElement(document.querySelector('#insert-beer'));
        hideElement(document.querySelector('#insert-bar'));
        hideElement(document.querySelector('#insert-date'));
        hideElement(document.querySelector('#insert-itemid'));
        hideElement(document.querySelector('#insert-day'));
        hideElement(document.querySelector('#insert-phone'));
        hideElement(document.querySelector('#insert-startquantity'));
        hideElement(document.querySelector('#insert-endquantity'));
        hideElement(document.querySelector('#insert-start'));
        hideElement(document.querySelector('#insert-end'));
        hideElement(document.querySelector('#insert-itemprice'));
        hideElement(document.querySelector('#insert-taxprice'));
        hideElement(document.querySelector('#insert-tip'));
        hideElement(document.querySelector('#insert-totalprice'));
        hideElement(document.querySelector('#insert-item'));
        hideElement(document.querySelector('#insert-type'));
        hideElement(document.querySelector('#insert-price'));
		hideElement(document.querySelector('#insert-progress'));
		
		
		
		hideElement(document.querySelector('#update-state'));
        hideElement(document.querySelector('#update-drinker'));
        hideElement(document.querySelector('#update-manf'));
        hideElement(document.querySelector('#update-beer'));
        hideElement(document.querySelector('#update-bar'));
        hideElement(document.querySelector('#update-date'));
        hideElement(document.querySelector('#update-itemid'));
        hideElement(document.querySelector('#update-day'));
        hideElement(document.querySelector('#update-phone'));
        hideElement(document.querySelector('#update-startquantity'));
        hideElement(document.querySelector('#update-endquantity'));
        hideElement(document.querySelector('#update-start'));
        hideElement(document.querySelector('#update-end'));
        hideElement(document.querySelector('#update-itemprice'));
        hideElement(document.querySelector('#update-taxprice'));
        hideElement(document.querySelector('#update-tip'));
        hideElement(document.querySelector('#update-totalprice'));
        hideElement(document.querySelector('#update-item'));
        hideElement(document.querySelector('#update-type'));
        hideElement(document.querySelector('#update-price'));
        showElement(document.querySelector('#insert-btn-group'));
		
		document.querySelector('#insert-drinker-btn').addEventListener('click',insertDrinker);
		document.querySelector('#insert-bar-btn').addEventListener('click',insertBar);
//		document.querySelector('#insert-drinker-btn').addEventListener('click',function (){DrinkerHelper('PUT')});
	}
	
	function insertDrinker(){
		hideElement(document.querySelector('#insert-btn-group'));
		showElement(document.querySelector('#insert-drinker'));
		showElement(document.querySelector('#insert-phone'));
		showElement(document.querySelector('#insert-state'));
		showElement(document.querySelector('#update-drinker'));
		showElement(document.querySelector('#update-phone'));
		showElement(document.querySelector('#update-state'));
		showElement(document.querySelector('#insert-progress'));
		showModifyResult("");
        document.querySelector('#insert-bttn').addEventListener('click',function (){DrinkerHelper('PUT')});
        document.querySelector('#update-btn').addEventListener('click',function (){DrinkerHelper('POST')});
        document.querySelector('#delete-btn').addEventListener('click',function (){DrinkerHelper('DELETE')});
        document.querySelector('#back-btn').addEventListener('click',loadInsert);
	}
	function insertBar(){
		hideElement(document.querySelector('#insert-btn-group'));
		showElement(document.querySelector('#insert-bar'));
		showElement(document.querySelector('#insert-state'));
		showElement(document.querySelector('#update-bar'));
		showElement(document.querySelector('#update-state'));
		showElement(document.querySelector('#insert-progress'));
		showModifyResult("");
        document.querySelector('#insert-bttn').addEventListener('click',function (){BarHelper('PUT')});
        document.querySelector('#update-btn').addEventListener('click',function (){BarHelper('POST')});
        document.querySelector('#delete-btn').addEventListener('click',function (){BarHelper('DELETE')});
        document.querySelector('#back-btn').addEventListener('click',loadInsert);
	}
	
	function DrinkerHelper(method){
		let drinker = document.querySelector('#insert-input-drinker').value;
		let phone = document.querySelector('#insert-input-phone').value;
		let state = document.querySelector('#insert-input-state').value;
		var sql;
		if (method == 'PUT'){
			sql = 'Drinker (name,phone,state) VALUES("'+drinker+'","'+phone+'","'+state+'");';
			goInsert(sql);
		}else if (method == 'POST'){
			let RPdrinker = document.querySelector('#update-input-drinker').value;
			let RPphone = document.querySelector('#update-input-phone').value;
			let RPstate = document.querySelector('#update-input-state').value;
			sql = 'Drinker SET name = "'+drinker+'",phone = "'+phone+'",state = "'+state+'" WHERE name = "'+RPdrinker+'" and phone = "'+RPphone+'" and state = "'+RPstate+'";';
			goModify(method, sql);
		}else if (method == 'DELETE'){
			sql = 'Drinker WHERE name = "'+drinker+'" and phone = "'+phone+'" and state = "'+state+'";';
			goModify(method, sql);
		}	
	}
	function BarHelper(method){
		let bar = document.querySelector('#insert-input-bar').value;
		let state = document.querySelector('#insert-input-state').value;
		var sql;
		if (method == 'PUT'){
			sql = 'Bar (name,state) VALUES("'+bar+'","'+state+'");';
			goInsert(sql);
		}else if (method == 'POST'){
			let RPbar = document.querySelector('#update-input-bar').value;
			let RPstate = document.querySelector('#update-input-state').value;
			sql = 'Bar SET name = "'+bar+'",state = "'+state+'" WHERE name = "'+RPbar+'" and state = "'+RPstate+'";';
			goModify(method, sql);
		}else if (method == 'DELETE'){
			sql = 'Bar WHERE name = "'+bar+'" and state = "'+state+'";';
			goModify(method, sql);
		}	
	}
	
	
	
	
	
	
	
	
	
	function goInsert(sql){
		showModifyResult('Sent Insert Request');
		var url = './insert';
		var req = JSON.stringify({
			query: sql
		});

		ajax("POST", url, req,
		// successful callback
		function(res) {
			var result = JSON.parse(res);
			// successfully logged in
			if (result.result === 'SUCCESS') {
				showModifyResult('Succesfully Modifyed');
			} else {
				showModifyResult('Some Error Existed');
			}
		},
		// error
		function() {
			showModifyResult('Failed to Modify');
		}, true);
	}
	function goModify(method,sql){
		showModifyResult('Sent Modify Request');
		var url = './modify';
		var req = JSON.stringify({
			query: sql
		});

		ajax(method, url, req,
		// successful callback
		function(res) {
			var result = JSON.parse(res);
			// successfully logged in
			if (result.result === 'SUCCESS') {
				showModifyResult('Succesfully Modifyed');
			} else {
				showModifyResult('Some Error Existed');
			}
		},
		// error
		function() {
			showModifyResult('Failed to Modify');
		}, true);
	}

	init();
})();
