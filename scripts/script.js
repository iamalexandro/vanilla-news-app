let data;
let articles = [];
let firstClick = true;
let heightIncrement;
let allowsClicks;
let clicks = 0;
let apiSections = {
	business:
		'http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=95d89889601244a6a5754469720098b6',
	entertainment:
		'http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=95d89889601244a6a5754469720098b6',
	economics:
		'http://newsapi.org/v2/everything?domains=wsj.com&apiKey=95d89889601244a6a5754469720098b6',
	technology:
		'http://newsapi.org/v2/everything?q=apple&from=2021-02-22&to=2021-02-22&sortBy=popularity&apiKey=95d89889601244a6a5754469720098b6',
	innovation:
		'http://newsapi.org/v2/everything?q=tesla&from=2021-01-23&sortBy=publishedAt&apiKey=95d89889601244a6a5754469720098b6',
};
window.onload = connection(apiSections.entertainment);

// api consume
function connection(apiUrl) {
	axios({
		method: 'GET',
		url: apiUrl,
	})
		.then(res => {
			data = res.data.articles;
			this.articles = data.map(article => {
				articles.push({
					img: article.urlToImage,
					url: article.url,
					title: article.title,
					description: article.description,
				});
			});
			allowsClicks = articles.length / 4 - 1;
			fillNews();
			articles = [];
		})
		.catch(err => console.log(err));
}

//html data
function fillNews() {
	urls = document.getElementsByClassName('news__card-link');
	images = document.getElementsByClassName('news__card-img');
	titles = document.getElementsByClassName('news__card-title');
	descriptions = document.getElementsByClassName('news__card-description');

	// create article cards
	for (var i = 0; i < articles.length; i++) {
		var card = `
    <div class="news__card">
      <a href="#" class="news__card-link" target="_blank">
        <div
          class="news__card-img"
          style="background-size: cover;"
          >
        </div>
      </a>
      <div class="">
          <p class="news__card-title util__truncate">
              Facebook to add gift cards, jobs and donation tools to its COVID-19 Community Help hub...
          </p>
      </div>
      <div class="">
          <p class="news__card-description util__truncate util__truncate-6">
              Facebook is expanding its Community Help hub to better serve local communities...
          </p>
      </div>
    </div>
    `;
		var newDiv = document.createElement('news__card');
		newDiv.innerHTML = card;
		document.getElementsByClassName('news__cards')[0].appendChild(newDiv);
	}

	// fill data into cards
	for (var j = 0; j < articles.length; j++) {
		urls[j].href = articles[j].url;
		images[j].style.backgroundImage = `url(${articles[j].img})`;
		titles[j].innerHTML = articles[j].title;
		descriptions[j].innerHTML = articles[j].description;
	}
}

//close welcome alert
function closeWelcome() {
	document.getElementById('welcome-alert').classList.add('welcome--hidden');
}

function showMore() {
	cardsContainer = document.getElementsByClassName('news__cards')[0];
	let elementStyle = window.getComputedStyle(cardsContainer);
	let elementHeight = elementStyle.getPropertyValue('height');
	if (firstClick) {
		this.heightIncrement = parseInt(elementHeight);
	}
	firstClick = false;
	let newHeight = parseInt(elementHeight);
	newHeight += this.heightIncrement + 120;

	if (clicks < allowsClicks) {
		cardsContainer.style.height = `${newHeight}px`;
		clicks++;
	} else {
		alert('I dont have more news for you');
	}
}

// change section
document.getElementById('select-sections').addEventListener('change', () => {
	val = document.getElementById('select-sections').value;
	tit = document.getElementById('dinamicTitle');
	switch (val) {
		case 'business':
			connection(apiSections.business);
			tit.innerHTML = 'Business';
			break;
		case 'entertainment':
			connection(apiSections.entertainment);
			tit.innerHTML = 'Entertainment';
			break;
		case 'economics':
			connection(apiSections.economics);
			tit.innerHTML = 'Economics';
			break;
		case 'technology':
			connection(apiSections.technology);
			tit.innerHTML = 'Technology';
			break;
		case 'innovation':
			connection(apiSections.innovation);
			tit.innerHTML = 'Innovation';
			break;
	}
});

//validate contact form
function validateEmptys() {
	let firstName = document.getElementById('contact__firstName');
	let lastName = document.getElementById('contact__lastName');
	let email = document.getElementById('contact__email');
	let phone = document.getElementById('contact__phone');
	let comment = document.getElementById('contact__comment');
	let checkbox = document.getElementById('sendNews');
	// first name
	if (firstName.value.trim() == '') {
		firstName.style.border = '2px solid red';
	} else {
		firstName.style.border = '2px solid green';
	}
	//last name
	if (lastName.value.trim() == '') {
		lastName.style.border = '2px solid red';
	} else {
		lastName.style.border = '2px solid green';
	}
	//email
	if (email.value.trim() == '') {
		email.style.border = '2px solid red';
	} else {
		email.style.border = '2px solid green';
	}
	// phone
	if (phone.value.trim() == '') {
		phone.style.border = '2px solid red';
	} else {
		phone.style.border = '2px solid green';
	}
	if (comment.value.trim() == '' && comment.value.length <= 200) {
		comment.style.border = '2px solid red';
	} else {
		comment.style.border = '2px solid green';
	}
	if (!checkbox.checked) {
		checkbox.style.border = '2px solid red';
		fields.checkbox = false;
	} else {
		checkbox.style.border = '2px solid green';
		fields.checkbox = true;
	}
}

//validate form
const form = document.getElementById('contact__form');
const inputs = document.querySelectorAll('#contact__form input');
const textareas = document.querySelectorAll('#contact__form textarea');
const expressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/,
	comment: /^[a-zA-Z0-9_.+-@ !"'=()]{1,300}$/,
};

var fields = {
	firstName: false,
	lastName: false,
	email: false,
	phone: false,
	comment: false,
	checkbox: false,
};

const validateForm = e => {
	switch (e.target.name) {
		case 'firstName':
			validateField(expressions.name, e.target, 'firstName');
			break;
		case 'lastName':
			validateField(expressions.name, e.target, 'lastName');
			break;
		case 'email':
			validateField(expressions.email, e.target, 'email');
			break;
		case 'phone':
			validateField(expressions.phone, e.target, 'phone');
			break;
		case 'comment':
			validateField(expressions.comment, e.target, 'comment');
			break;
	}
};

const validateField = (expresion, input, field) => {
	if (expresion.test(input.value)) {
		document.getElementById(`contact__${field}`).style.border =
			'2px solid green';
		fields[field] = true;
	} else {
		document.getElementById(`contact__${field}`).style.border = '2px solid red';
		fields[field] = false;
	}
};

inputs.forEach(input => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
});

textareas.forEach(input => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
});

const checkbox = document.getElementById('sendNews');
checkbox.addEventListener('change', () => {
	if (checkbox.checked) {
		document.getElementById('asterisk').style.visibility = 'hidden';
		fields.checkbox = true;
	} else {
		document.getElementById('asterisk').style.visibility = 'visible';
		fields.checkbox = false;
	}
});
function submit() {
	validateEmptys();
	if (
		fields.firstName &&
		fields.lastName &&
		fields.email &&
		fields.phone &&
		fields.comment &&
		fields.checkbox
	) {
		document
			.getElementById('errorMsg')
			.classList.add('contact__error-msg--hidden');
		document.getElementById('modal').classList.remove('modal--hidden');
		document.getElementById('modal-box').classList.remove('modal__box--hidden');
		fillModal();
		document.body.style.overflow = 'hidden';
	} else {
		document
			.getElementById('errorMsg')
			.classList.remove('contact__error-msg--hidden');
	}
}

function fillModal() {
	const firstName = document.getElementById('contact__firstName').value;
	const lastName = document.getElementById('contact__lastName').value;
	const email = document.getElementById('contact__email').value;
	const phone = document.getElementById('contact__phone').value;
	const comment = document.getElementById('contact__comment').value;
	document.getElementById('modalName').innerText = firstName;
	document.getElementById('modalLastName').innerText = lastName;
	document.getElementById('modalEmail').innerText = email;
	document.getElementById('modalPhone').innerText = phone;
	document.getElementById('modalComment').innerText = comment;
}

function closeModal() {
	document.getElementById('modal').classList.add('modal--hidden');
	document.getElementById('modal-box').classList.add('modal__box--hidden');
	document.body.style.overflow = 'scroll';
}

function resetForm() {
	form.reset();

	inputs.forEach(input => {
		input.style.border = '1px solid #D3DBE7';
	});

	textareas.forEach(input => {
		input.style.border = '1px solid #D3DBE7';
	});

	document.getElementById('asterisk').style.visibility = 'visible';
}

function done() {
	closeModal();
	resetForm();
}
