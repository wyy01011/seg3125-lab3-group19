//Array of grocery store products. All products include a name, one or many categories, the current amount added to cart, their price, their store category and their image file name.
var products = [
	{
		name: "Lettuce",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		diabetic: true,
		lactoseIntolerant: true,
		price: 5.99,
		storeCategory: "Produce",
		imageName: "lettuce.jpg"
	},
	{
		name: "Eggs",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		diabetic: true,
		lactoseIntolerant: true,
		price: 4.99,
		storeCategory: "Protein",
		imageName: "eggs.jpg"
	},
	{
		name: "Salmon",
		vegetarian: false,
		glutenFree: true,
		organic: true,
		diabetic: true,
		lactoseIntolerant:true,
		price: 19.99,
		storeCategory: "Protein",
		imageName: "salmon.jpg"
	},
	{
		name: "Cheesecake",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		diabetic: false,
		lactoseIntolerant: false,
		price: 20,
		storeCategory: "Bakery",
		imageName: "cheesecake.jpg"
	},
	{
		name: "Apples",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		diabetic: true,
		lactoseIntolerant: true,
		price: 5.99,
		storeCategory: "Produce",
		imageName: "apple.jpg"
	},
	{
		name: "Wheat Bread Loaf",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		diabetic: false,
		lactoseIntolerant: false,
		price: 3.99,
		storeCategory: "Bakery",
		imageName: "bread.jpg"
	},
	{
		name: "Canned Beans",
		vegetarian: true,
		glutenFree: true,
		organic:  false,
		diabetic: true,
		lactoseIntolerant: true,
		price: 3.49,
		storeCategory: "Snacks",
		imageName: "beans.jpg"
	},
	{
		name: "Milk",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		diabetic: false,
		lactoseIntolerant: false,
		price: 7.99,
		storeCategory: "Dairy",
		imageName: "milk.jpg"
	},
	{
		name: "Banana Chocolate Chip Muffins",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		diabetic: false,
		lactoseIntolerant: false,
		price: 9.99,
		storeCategory: "Bakery",
		imageName: "muffins.jpg"
	},
	{
		name: "Lays Classic Potato Chips",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		diabetic: false,
		lactoseIntolerant:true,
		price: 5,
		storeCategory: "Snacks",
		imageName: "chips.jpg"
	},
	{
		name: "Cream Cheese",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		diabetic: true,
		lactoseIntolerant: false,
		price: 11.99,
		storeCategory: "Dairy",
		imageName: "creamcheese.jpg"
	}

];
	
/**
 * Check the products list for restrictions. Choose to include or exclude based on user preferences.
 * Product prices are listed and sorted from low to high prices.
 * 
 * @param prods List of products to sort from.
 * @param restriction The current restrictions/preferences the user has selected.
 * @return List of product names that are allowed to be displayed.
 */
function restrictListProducts(prods, restriction) {
	if (!Array.isArray(restriction) || restriction.length === 0, restriction.includes('All')){ //If the restrictions parameter is not an array, or it contains 0 elements, or it contains the 'All' choice, return all products.
		return prods;
	}
	let product_names = []; //Products list to display starts empty.
	for (let i=0; i<prods.length; i+=1) { //Loop through each product in the list.
		for (let j = 0; j<restriction.length; j+=1){ //Loop through all restrictions in the list.
			if ((restriction[j] == "Vegetarian") && (prods[i].vegetarian == true) && !product_names.includes(prods[i])){ //If the restriction is for vegetarian products and the product fits, and it is not added yet, add it to the display.
				product_names.push(prods[i]);
			}
			else if ((restriction[j] == "GlutenFree") && (prods[i].glutenFree == true) && !product_names.includes(prods[i])){ //If the restriction is for gluten free products and the product fits, and it is not added yet, add it to the display.
				product_names.push(prods[i]);
			}
			else if ((restriction[j] == "Organic") && (prods[i].organic == true) && !product_names.includes(prods[i])){ //If the restriction is for organic products and the product fits, and it is not added yet, add it to the display.
				product_names.push(prods[i]);
			}
			else if ((restriction[j] == "DiabeticFriendly") && (prods[i].diabetic == true) && !product_names.includes(prods[i])){ //If the restriction is for diabetic friendly products and the product fits, and it is not added yet, add it to the display.
				product_names.push(prods[i]);
			}
			else if ((restriction[j] == "LactoseFree") && (prods[i].lactoseIntolerant == true) && !product_names.includes(prods[i])){ //If the restriction is for lactose free products and the product fits, and it is not added yet, add it to the display.
				product_names.push(prods[i]);
			}
			else if (restriction[j] == "All" && !product_names.includes(prods[i])){ //If the restriction is for all products, and it is not added yet, add it to the display.
				product_names.push(prods[i]);
			}
		}

	}
	return product_names;
}

/**
 * Calculates the total price of items in the shopping cart.
 *
 * @param chosenProducts List of products to calculate from.
 * @param quantities List of quantities for each product added to cart.
 * @return Total price of the shopping cart.
 */
function getTotalPrice(chosenProducts, quantities) {
	totalPrice = 0; //Total price starts at 0.
	for (let i=0; i<chosenProducts.length; i+=1) { //Loop through each product in the list.
		if (chosenProducts.indexOf(displayProducts[i].name) > -1){  //If the current product is actually in the store list, do the following.
			totalPrice += displayProducts[i].price * quantities[i]; //Add the product's price to the total.
		}
	}
	return totalPrice; //Return the total price.
}
