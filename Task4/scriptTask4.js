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

function DiscountPurchase(name, price, quantity, discount) {
	Purchase.apply(this, arguments);
	this.discount = discount;

	this.parentGetCost = Purchase.prototype.getCost;
	this.getCost = function() {
		var cost = this.parentGetCost();
		return (Math.round((cost * (1 - this.discount / 100)) * 100) / 100);
	}

	this.parentToString = Purchase.prototype.toString;
	this.toString = function() {
		var result = this.parentToString();
		var data = result.split(';');
		data[4] = data[3];
		data[3] = this.discount;
		return (data.join(';'));
	}
}

function FixedDiscountPurchase(name, price, quantity, fixedDiscount) {
	Purchase.apply(this, arguments);
	this.fixedDiscount = fixedDiscount;
}

FixedDiscountPurchase.prototype = Object.create(Purchase.prototype);
FixedDiscountPurchase.prototype.constructor = FixedDiscountPurchase;

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

//1. Создать исходный массив из нескольких покупок (9+) различных классов.
var purchases = [
    new Purchase("tea", 2.38, 5),
	new Purchase("cofe", 8.89, 2),
    new Purchase("cake", 24.11, 1),
    new DiscountPurchase("cheese", 24.59, 1, 10),
    new DiscountPurchase("bread", 1.79, 3, 15),
    new DiscountPurchase("oil", 2.99, 5, 20),
	new FixedDiscountPurchase("orange", 3.56, 6, 5),
	new FixedDiscountPurchase("tomato", 4.10, 5, 10),
	new FixedDiscountPurchase("potatoes", 1.20, 20, 15)
];

//2. Вывести исходные покупки, но при этом цикл вывода заменить на метод массива forEach().
function Show(value) {
	document.write("<p>" + value + "</p>");
}
document.write("<p>" + "Исходные покупки" + "</p>");
purchases.forEach(Show);

//3. C использованием метода массива filter() отфильтровать покупки, получив новый массив с покупками, 
//   в который скопируются только те, у которых итоговая стоимость больше 20. Вывести получившиеся покупки.
document.write("<br/>");
document.write("<p>" + "Используем метод массива filter() для получения нового массива с покупками, у которых итоговая стоимость больше 20"+ "</p>");

function CheckCost(value) {
	if (value.getCost() > 20) {
		return value;
	}
}
var arrayPurchases1 = purchases.filter(CheckCost);
arrayPurchases1.forEach(Show);

//4. С помощью метода массива map() получить новый массив покупок из исходного, при этом покупки без скидок (базового класса), 
//   должны замениться покупками со скидкой в процентах, где процент скидки численно равен удвоенному количеству товара. 
//   Остальные покупки должны остаться без изменений. Вывести покупки.
document.write("<br/>");
document.write("<p>" + "С помощью метода массива map() получить новый массив покупок из исходного, при этом покупки без скидок (базового класса),"+ 
                        "должны замениться покупками со скидкой в процентах, где процент скидки численно равен удвоенному количеству товара."+
                        "Остальные покупки должны остаться без изменений"+ "</p>");

function ChangeBasePurchase(value) {
	if (value.discount == undefined) {
		return new DiscountPurchase(value.name, value.price, value.quantity, value.quantity * 2);
    } 
    else {
		return value;
	}
}
var arrayPurchases2 = purchases.map(ChangeBasePurchase);
arrayPurchases2.forEach(Show);

//5. С помощью методов массива every()/some() проверить, все ли/есть ли покупки с итоговой стоимостью, больше 50. 
//  Вывести ответы (да/нет, true/false…)
document.write("<br/>");
document.write("<p>" + "С помощью методов массива every()/some() проверить, все ли/есть ли покупки с итоговой стоимостью, больше 50."+ 
                        "Вывести ответы (да/нет, true/false…)"+ "</p>");

function isPriceMoreThan_50(value) {
	return (value.getCost() > 50);
}
document.write("<p>" + "Все ли покупки с итоговой стоимостью, более 50? - " + purchases.every(isPriceMoreThan_50) + "</p>");
document.write("<p>" + "Есть ли покупки со стоимостью, более 50? - " + purchases.some(isPriceMoreThan_50) + "</p>");

//6. Найти покупку с максимальной стоимостью с помощью метода массива reduce(). Вывести её.
document.write("<br/>");
document.write("<p>" + "Найти покупку с максимальной стоимостью с помощью метода массива reduce()"+ "</p>");

var maxPurchase = purchases.reduce(function(prev, curr) {
	if (prev.getCost() > curr.getCost()) {
		return prev;
    } 
    else {
		return curr;
	}
});
document.write("<p>"+"Покупка с максимальной стоимостью: " + maxPurchase + "</p>");

//7. Получить с помощью метода массива reduceRight() новую покупку без скидок со следующими характеристиками:
//      – название товара – самое длинное из названий всех покупок исходного массива;
//      – цена – самая высокая цена из всех покупок исходного массива;
//      – количество – минимальное количество товара во всех покупках исходного массива.
//   Вывести получившуюся покупку.

document.write("<br/>");
document.write("<p>"+"Покупка с самым длинным из названий, самой высокой ценой и минимальным количеством из всех покупок: "+"</p>");

var maxName = purchases[purchases.length - 1].name;
var maxPrice = purchases[purchases.length - 1].price;
var minQuantity = purchases[purchases.length - 1].quantity;

purchases.reduceRight(function(prev, curr) {
	if (curr.name.length > maxName.length) {
		maxName = curr.name;
	}

	if (curr.price > maxPrice) {
		maxPrice = curr.price;
	}

	if (curr.quantity < minQuantity) {
        minQuantity = curr.quantity;
	}
	return curr;
});

var newPurchase = new Purchase(maxName, maxPrice, minQuantity);
document.write("<p>" + newPurchase + "</p>");