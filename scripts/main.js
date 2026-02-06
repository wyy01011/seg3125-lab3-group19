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

	var radioSelected = s1.querySelectorAll("input[type=radio]:checked"); //Get all checkbox elements that were checked on and add it into an array.
	var selectedRestrictions = [];
	radioSelected.forEach(radio => {
		if (radio.value === "Yes") {
			selectedRestrictions.push(radio.name);
		}
	});
	//var checked = [...checkedBoxes].map(checkbox => checkbox.value); //Get the value (name) of each checked box and add it into an array.
	var optionArray = [];
	if (selectedRestrictions.length === 0) { //If all the radio buttons are set to no restriction/preference, display all products.
		optionArray = products;   
	} else {
		optionArray = restrictListProducts(products, selectedRestrictions); //Pass the array with reduced products and all selected restrictions to update the display.
	}
	displayProducts = optionArray;

	//Sort code learned from https://www.w3schools.com/js/js_array_sort.asp tutorial website.
	optionArray.sort((a, b) => a.price - b.price); //Sort the product list by price. Sorted from low to high price.

	for (i = 0; i < optionArray.length; i++) { //For each product to display, create a checkbox element for it to display on the products tab.

		var productName = optionArray[i].name; //Get the product's name.
		var productPrice = optionArray[i].price; //Get the product's price.
		var productImg = optionArray[i].imageName; //Get the product's image file name.

		var item = document.createElement("card"); //Create an HTML card element for the product to be displayed with an image.
		item.className = "card";

		const container = document.createElement("div"); //Create an HTML container to hold the rest of the card contents.
		container.className = "container";

		//Create a number element to add in HTML DOM to update product quantities. Number input type learned from https://www.w3schools.com/tags/att_input_type_number.asp.
		var numberCounter = document.createElement("input");
		numberCounter.type = "number";
		numberCounter.name = "quantity";
		//Users can add 0 - 99 of each product to the shopping cart.
		numberCounter.min = 0; 
		numberCounter.max = 99;
		numberCounter.value = 0; //Product quantity starts at 0.
		numberCounter.addEventListener("blur", function () { //Add an event listener to the number input. If a user enters a negative number manually, provide an error message.
			if (this.value < 0) {
				this.value = 0;
				alert("Quantity cannot be negative.");
			}
		});

		var label = document.createElement('label') //Create a label for the checkbox, and also add in HTML DOM.
		var productLabel = productName + ": $" + productPrice + " "; //Create the text value for a product's caption.
		var image = document.createElement("img"); //Create an image HTML element.
		image.src = productImg //Set the source of the product image to the image's file name.
		label.appendChild(document.createTextNode(productLabel)); //Product display now shows the product's caption of name and price.

		const button = document.createElement("button"); //Create a button element.
		button.textContent = "🛒 Add to Cart";
		button.onclick = function () {addSingleItem(this);}; //Assign a function to the specific add to cart button.

		item.innerHTML += "<br>";
		item.appendChild(image); //Add the image to the product's display.
		container.appendChild(label); //Add the caption to the product's display.
		container.appendChild(numberCounter);
		container.appendChild(button);

		item.appendChild(container);
		s2.appendChild(item) //Add the product to the product display officially.
	}
}

function addSingleItem(button) {

}

/**
 * Filters the current list of products by a further categorization based on type. (Produce, Protein, etc.)
 *
 * @param category The category to be displayed.
 */
function productCategoryFilter(category) {
    const productCards = document.querySelectorAll("#displayProduct .card"); //Get all card HTML elements from the product display element.
	var existingProducts = 0;
    productCards.forEach(card => { //Loop through each card in the product display element.
        const productName = card.querySelector("label").textContent.split(":")[0].trim(); //Extract the product name from the label.
        const product = products.find(p => p.name === productName); //Search the products list and return the product object that matches the name of the current card element.

        if (!product){ //If the product does not exist in the store, exit this function.
			return;
		} 

        if (category === "All" || product.storeCategory === category) { //If the product's category was the one selected, or it is the 'All' category, keep it displayed.
            card.style.display = "block";   
			existingProducts++; //Add one to existingProducts variable.
        } else { //Otherwise, set the display to be hidden.
            card.style.display = "none";   
        }
    });
	if (existingProducts === 0) { //If no products are displayed, alert the user.
        alert("No products exist for this category.");
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

