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

var purchases = [
	new Purchase("tea", 2.38, 5),
	new Purchase("cofe", 8.89, 2),
	new Purchase("cake", 24.11, 1),
	new Purchase("sugar", 1.55, 3)
];

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