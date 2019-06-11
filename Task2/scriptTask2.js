function Purchase(name, price, quantity) {
	this.name = name;
	this.price = Math.round(price * 100) / 100;
	this.quantity = quantity;

	this.getCost = function() {
		return (Math.round((this.price * this.quantity) * 100) / 100);
	}

	this.toString = function() {
		return (this.name + ';' + this.price + ';' + this.quantity + ';' + this.getCost());
	}
}

function DiscountPurchase(name, price, quantity, discount) {
	Purchase.apply(this, arguments);
	this.discount = discount;

	this.getCost = function() {
		return (Math.round((this.price * this.quantity * (1 - this.discount / 100)) * 100) / 100);
	}

	var parentToString = this.toString;
	this.toString = function() {
		var result = parentToString.call(this);
		var data = result.split(';');
		data[4] = data[3];
		data[3] = this.discount;
		var result = "";
		for (var i = 0; i < data.length; i++) {
			if(i!=data.length-1){
				result += data[i].join(';');
			}
			else{
				result += data[i];
			}
		}
		return result;
	}
}

var purchases = [
	new Purchase("tea", 2.38, 5),
	new Purchase("cofe", 8.89, 2),
	new Purchase("cake", 24.11, 1),
	new Purchase("sugar", 1.55, 3)
];
purchases[4] = new DiscountPurchase("cheese", 24.59, 1, 10);
purchases[5] = new DiscountPurchase("bread", 1.79, 3, 15);
purchases[6] = new DiscountPurchase("oil", 2.99, 5, 20);

function showPurchases(purch) {
	for (var i = 0; i < purch.length; i++) {
		document.write("<p>" + purch[i] + "</p>");
	}
}

showPurchases(purchases);

function makeSumm(purch) {
	var totalCost = 0;
	return function(purch) {
		if (typeof purch == "undefined") {
			return totalCost;
        } 
        else {
			return totalCost += purch.getCost();
		}
	}
}

var makeS = makeSumm();

for (var i = 0; i < purchases.length; i++) {
	makeS(purchases[i]);
}

document.writeln("<h2>Итого: " + makeS() + "</h2>");