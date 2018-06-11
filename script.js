window.onload = function () {
	alert("Aplikacja korzysta z localStorage, czyli informacje wpisane w formularz pozostają na Twoim komputerze a wszystkie wprowadzone zmiany są widoczne po ponownym otwarciu/odświeżeniu strony w tej samej przeglądarce. Informacje te nie są w żaden sposób wykorzystywane przez włąsciciela strony. Na dole strony jest widoczna data i czas ostatniej modyfikacji formularza.")
};
const form = document.querySelector('#formData');
const credentials = form.querySelectorAll('input[name]:not([name="invoice"])');
const invoice = form.querySelectorAll('input[name="invoice"]');
const credentialsLng = credentials.length;
const invoiceLength = form.invoice.length;

// callback function - changing any item in the credentials form calls changeData function
credentials.forEach(function (elem) {
	elem.addEventListener("change", changeData);
});
// callback function - changing any item in the invoice form calls the changeInvoice function
invoice.forEach(function (elem) {
	elem.addEventListener("change", changeInvoice);
});
// changing any item in the form calls the changeInvoice function
form.addEventListener("change", lastSave);

// 3 functions push new values into web browser
function changeData() {
	let arrInCre = [];
	for (i = 0; i < credentialsLng; i++) {
		let c = credentials[i].value;
		arrInCre.push(c);
	};
	localStorage.setItem('formularzDane', JSON.stringify(arrInCre));
}

function changeInvoice() {
	let arrInInv = [];
	for (i = 0; i < invoiceLength; i++) {
		var z = form.invoice[i].checked;
		arrInInv.push(z);
	};
	localStorage.setItem('stanFaktury', JSON.stringify(arrInInv));
}

function lastSave() {
	let date = new Date();
	let d = date.toLocaleString();
	document.querySelector("#lastSave").innerHTML = d;
	localStorage.setItem('ostatniaZmiana', d);
}

// function displays the last used values in form
(function () {
	let arrOutCredential = JSON.parse(localStorage.getItem('formularzDane'));
	if (arrOutCredential !== null) {
		for (i = 0; i < credentialsLng; i++) {
			credentials[i].value = arrOutCredential[i];
		}
	}
	let arrOutInvoice = JSON.parse(localStorage.getItem('stanFaktury'));
	if (arrOutInvoice !== null) {
		for (i = 0; i < invoiceLength; i++) {
			form.invoice[i].checked = arrOutInvoice[i];
		}
	}
	if (localStorage.ostataniaZm !== null) {
		let lastDate = localStorage.getItem('ostatniaZmiana');
		document.querySelector("#lastSave").innerHTML = lastDate;
	}
})();