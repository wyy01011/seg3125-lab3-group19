var displayProducts = []; //Variable to hold product names being displayed.

/**
 * Call this function when any tab is clicked. Hides the past active tab and reveals the new active one. Adapted from https://www.w3schools.com/howto/howto_js_tabs.asp.
 *
 * @param evt Event parameter.
 * @param tabName The new tab to view.
 */
function openInfo(evt, tabName) {

	//Get all elements with class="tabcontent" and hide them.
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	//Get all elements with class="tablinks" and remove the class "active".
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	//Show the current tab, and add an "active" class to the button that opened the tab.
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

}

/**
 * Generates a checkbox list from a list of products. Every product is labelled with a name and price and includes an image.
 *
 * @param s1 The category selection HTML element.
 * @param s2 The product display HTML element.
 */
function populateListProductChoices(slct1, slct2) {
	var s1 = document.getElementById(slct1); //Variable to hold the checkbox element.
	var s2 = document.getElementById(slct2); //Variable to hold the display element.

	//s2 represents the <div> in the Products tab, which shows the product list. Set it as empty first.
	s2.innerHTML = "";

	//var optionArray = restrictListProducts(products, s1.value); Original code for options array. A new one is made below to account for the new checkbox element being used for category selection.
	
	//Checkbox HTML code learned from https://www.w3schools.com/tags/att_input_type_checkbox.asp tutorial website.

	var checkedBoxes = s1.querySelectorAll("input[type=checkbox]:checked"); //Get all checkbox elements that were checked on and add it into an array.
	var checked = [...checkedBoxes].map(checkbox => checkbox.value); //Get the value (name) of each checked box and add it into an array.
	var optionArray = restrictListProducts(products, checked); //Pass the array with reduced products and all selected restrictions to update the display.
	displayProducts = optionArray;

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>

	//Sort code learned from https://www.w3schools.com/js/js_array_sort.asp tutorial website.
	optionArray.sort((a, b) => a.price - b.price); //Sort the product list by price. Sorted from low to high price.

	for (i = 0; i < optionArray.length; i++) { //For each product to display, create a checkbox element for it to display on the products tab.

		var productName = optionArray[i].name; //Get the product's name.
		var productPrice = optionArray[i].price; //Get the product's price.
		var productImg = optionArray[i].imageName; //Get the product's image file name.

		var item = document.createElement("span"); //Create an HTML element for the product to be displayed.
		item.className = "product-item";

		//Create the checkbox and add in HTML DOM. Checkbox code is commented out as the custom quantity feature is added.
		//var checkbox = document.createElement("input");
		//checkbox.type = "checkbox";
		//checkbox.name = "product";
		//checkbox.value = productName;

		//Create a number element to add in HTML DOM to update product quantities. Number input type learned from https://www.w3schools.com/tags/att_input_type_number.asp.
		var numberCounter = document.createElement("input");
		numberCounter.type = "number";
		numberCounter.name = "quantity";
		//Users can add 0 - 99 of each product to the shopping cart.
		numberCounter.min = 0; 
		numberCounter.max = 99;
		numberCounter.value = 0; //Product quantity starts at 0.

		var label = document.createElement('label') //Create a label for the checkbox, and also add in HTML DOM.
		var productLabel = productName + ": $" + productPrice //Create the text value for a product's caption.
		var image = document.createElement("img"); //Create an image HTML element.
		image.src = productImg //Set the source of the product image to the image's file name.
		label.appendChild(document.createTextNode(productLabel)); //Product display now shows the product's caption of name and price.

		item.appendChild(image); //Add the image to the product's display.
		//item.appendChild(checkbox); //Add the checkbox to the product's display. Removed for the quantity update.
		item.innerHTML += "<br>";
		item.appendChild(numberCounter);
		item.appendChild(label); //Add the caption to the product's display.

		s2.appendChild(item) //Add the product to the product display officially.
	}
}

/**
 * Function called when add items to cart is clicked. Build an HTML paragraph to contain the list of selected items and total price.
 */
function selectedItems() {

	var ele = document.getElementsByName("quantity");
	var chosenProducts = []; //List to hold the names of each product.
	var productQuantities = []; //List to hold the quantities of each product.

	var c = document.getElementById('displayCart');
	c.innerHTML = "";

	//Build a list of the selected product.
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) {
		if (Number(ele[i].value) > 0) {
			para.appendChild(document.createTextNode(displayProducts[i].name + ". Qty: " + Number(ele[i].value))); //Show the item in the cart with the quantity added.
			para.appendChild(document.createElement("br"));
			chosenProducts[i] = (displayProducts[i].name); //Add the product's name to the list.
			productQuantities[i] = Number(ele[i].value); //Add the product's quantity to the list.
		}
	}

	//Add the paragraph and it's total price.
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts, productQuantities)));

}

//Variables for the slide and size values.
const slider = document.getElementById("sizeSlider");
const size = document.getElementById("fontSizeValue");

//Slide function to change the size of the site when the slide is moved.
slider.oninput = function () {
	document.body.style.fontSize = this.value + "px";
	size.textContent = this.value + "px";
};