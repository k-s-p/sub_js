const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];
const products = [
    {name:"オリジナルブレンド200g", price: 500},
    {name:"オリジナルブレンド500g", price: 900},
    {name:"スペシャルブレンド200g", price: 700},
    {name:"スペシャルブレンド500g", price: 1200},
]

function add() {
    const productid = priceElement.value - 1;
    const number = numberElement.value;
    if(productid < 0 || number === ''){
        return 
    }
    let purchase = {
      price: parseInt(products[productid].price),
      number: parseInt(number),
      name: products[productid].name,
    };
  
    let newPurchase = true; //--1
  
    purchases.forEach((item) => {  //--2
      if(item.price === purchase.price) {
        newPurchase = false;
      }
    })
  
    if(purchases.length < 1 || newPurchase) { //--3
      purchases.push(purchase);
    } else {
      for(let i = 0; i < purchases.length; i++) {
        if(purchases[i].price === purchase.price) {
          purchases[i].number += purchase.number;
        }
      }
    }
  
    window.alert(`${display()}\n小計${subtotal()}円`);
    priceElement.value = "";
    numberElement.value = "";
}

function display() {
    return purchases.map(purchase => {
      return `${purchase.name} ${purchase.price}円:${purchase.number}点`
    }).join("\n");
  };
  
  function subtotal() {
    return purchases.reduce((prev, purchase) => {
      return prev + purchase.price * purchase.number 
    }, 0);
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);

  window.alert(`${display()}\n小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`);
  purchases = [];
  priceElement.value= "";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 1000){
   return 500;
  } else {
   return 250;
  }
}