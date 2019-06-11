function Purchase(name, price, quantity) {
	this.name = name;
	this.price = Math.round(price * 100) / 100;
	this.quantity = quantity;
}

Purchase.prototype.getCost = function() {
	return (Math.round((this.price * this.quantity) * 100) / 100);
}

Purchase.prototype.toString = function() {
	return (this.name + ';' + this.price + ';' + this.quantity + ';' + this.getCost());
}

function FixedDiscountPurchase(name, price, quantity, fixedDiscount) {
	Purchase.apply(this, arguments);
	this.fixedDiscount = fixedDiscount;
}

FixedDiscountPurchase.prototype.getCost = function() {
	var cost = Purchase.prototype.getCost.apply(this, arguments);
	if (cost >= 20) {
		return (Math.round((cost - (cost*(this.fixedDiscount/100)))* 100) / 100);
    } 
    else {
		return cost;
	}
}

FixedDiscountPurchase.prototype.toString = function() {
	var result = Purchase.prototype.toString.apply(this, arguments);
	var data = result.split(';');
	data[4] = data[3];
	data[3] = this.fixedDiscount;
	return (data.join(';'));
}

var purchases = [
	new Purchase("tea", 2.38, 5),
	new Purchase("cofe", 8.89, 2),
	new Purchase("cake", 24.11, 1),
	new Purchase("sugar", 1.55, 3)
];
purchases[4] = new FixedDiscountPurchase("cheese", 24.59, 1, 10);
purchases[5] = new FixedDiscountPurchase("bread", 1.79, 3, 15);
purchases[6] = new FixedDiscountPurchase("oil", 2.99, 5, 20);

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