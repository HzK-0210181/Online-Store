// YOUR NAME HERE
let Name = "Hamza KHIAR"
const MAX_QTY = 9;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";
let total = 0;
let init = function () {
	createShop();
}
window.addEventListener("load", init);
function createShop() {
	let shop = document.getElementById("boutique");
	for (let i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
	};

	return shop
};

/*
* create the div.produit elment corresponding to the given product
* The created element receives the id "index-product" where index is replaced by param's value
* @param product (product object) = the product for which the element is created
* @param index (int) = the index of the product in catalog, used to set the id of the created element
*/
function createProduct(product, index) {
	let block = document.createElement("div");
	block.className = "produit";
	block.id = index + "-" + productIdKey;
	block.appendChild(createBlock("h4", product.name));

	block.appendChild(createFigureBlock(product));
	block.appendChild(createBlock("div", product.description, "description"));
	// build and add the div.price part of 'block'
	block.appendChild(createBlock("div", product.price, "prix"));
	// build and add control div block to product element
	block.appendChild(createOrderControlBlock(index));
	return block;
};

/* return a new element of tag 'tag' with content 'content' and class 'cssClass'
 * @param tag (string) = the type of the created element (example : "p")
 * @param content (string) = the html wontent of the created element (example : "bla bla")
 * @param cssClass (string) (optional) = the value of the 'class' attribute for the created element
 */
function createBlock(tag, content, cssClass) {
	let element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className = cssClass;
	};
	element.innerHTML = content;
	return element;
};

function createOrderControlBlock(index) {
	let control = document.createElement("div");
	control.className = "controle";
	let input = document.createElement("input");
	input.id = index + '-' + inputIdKey;
	input.type = "number";
	input.step = "1";
	input.value = "0";
	input.min = "0";
	input.max = MAX_QTY.toString();

	control.appendChild(input);

	let button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-" + orderIdKey;
	control.appendChild(button);
	button.addEventListener("click", () => { addToCart(index, catalog[index]) });
	input.addEventListener("change", () => {
		if (input.value != 0)
			button.classList.add("not-empty");
		else 
			button.classList.remove("not-empty");
	});
	return control;
}

/*
* create and return the figure block for this product
* see the static version of the project to know what the <figure> should be
* @param product (product object) = the product for which the figure block is created
*
* TODO : write the correct code
*/
function createFigureBlock(product) {
	let pics = `<img src="${product.image}"/>`;
	return createBlock("figure", pics);
};


function addToCart(index, product) {
	let inputs = document.getElementById(`${index}-qte`);
	var quantity = inputs.value;
	let cart = document.getElementsByClassName("achats")[0];
	if (quantity != 0) {
		if (!document.getElementById(`${index}-achat`)) {
			var merchandise = document.createElement("div");
			merchandise.classList.add("achat");
			let price = product.price;
			product.className = "achat"
			merchandise.id = `${index}-achat`
			merchandise.appendChild(createFigureBlock(product))
			merchandise.appendChild(createBlock("h4", product.description, "description"))
			merchandise.appendChild(createBlock("div", quantity, "quantite"))
			merchandise.appendChild(createBlock("div", product.price, "prix"))
			var controle=merchandise.appendChild(createBlock("div",'<button id="retirer"></button>',"controle"));
			controle.addEventListener("click",() => removeFromCart())
			document.getElementById("montant").innerText=+parseInt(product.price*inputs.value);
			cart.appendChild(merchandise);
			return cart
		} else {
			var newQuantity = parseInt(inputs.value);
			var cartValue=parseInt(document.querySelector(`[id="${index}-achat"]>.quantite`).innerText);
			cartValue+=newQuantity;
			let cartTotal = parseInt(document.getElementById("montant").innerText);
			cartTotal=(parseInt(product.price)*cartValue)
			document.getElementById("montant").innerText=+cartTotal;
			document.querySelector(`[id="${index}-achat"]>.quantite`).innerText=+ cartValue;
		};
	} else {
		return null;
	};
	function removeFromCart() {
		cart.removeChild(merchandise);
		document.getElementById("montant").innerText=+0
		
	}
	return cart
};