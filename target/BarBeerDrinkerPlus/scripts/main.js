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
		document.querySelector('#search-btn').addEventListener('click',
				searchDrinkers);
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
		
		loadBeers();
	}

	function loadBars() {
		console.log('loadBars');
		activeBtn('bar-btn');

		showLoadingMessage('Loading Bars...');
	}
	
	function loadBeers() {
		console.log('loadBeers');
		activeBtn('beer-btn');
		// request parameters
		var url = './getbeer';
		var data = null;

		// display loading message
		showLoadingMessage('Loading Beers...');

		// make AJAX call
		ajax('GET', url, data,
				// successful callback
				function(res) {
					var items = JSON.parse(res);
					if (!items || items.length === 0) {
						showWarningMessage('No Beers. Make sure you have Beers on the list.');
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

	function loadDrinkers() {
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
		
		itemList.innerHTML ='<div id="drinker-form"><label for="username">UserName:</label><input id="drinker_username" name="username" type="text"><button id="search-btn">Search</button></div>';
		document.querySelector('#search-btn').addEventListener('click',searchDrinkers);
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
	
	function searchDrinkers(){
		// display loading message
//		showLoadingMessage('Loading Drinkers...');
		var userid = document.querySelector('#drinker_username').value;
		
		var url = './getdrinker?username='+userid;
		var data = null

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
		
		var section2 = $create('div');
		var keyword2 = $create('p', {
			className : 'drinker-itemtype'
		});
		keyword2.innerHTML = 'type';
		section2.appendChild(keyword2);
		li.appendChild(section2);
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
		
		var section2 = $create('div');
		
		for (var i = 0; i < item.Bill.length; i++){
			var billdetail = item.Bill[i];
			addInnerItemtype(section2, billdetail);
//			addDrinker2(section, billdetail);
		}
		li.appendChild(section2);
		itemList.appendChild(li);
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
			className : 'drinker-itemtype'
		});
		keyword2.innerHTML = billdetail.type;
		section.appendChild(keyword2);
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

	init();
})();
