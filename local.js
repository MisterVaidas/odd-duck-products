'use strict'

if (typeof products === 'undefined') {
let products = JSON.parse(localStorage.getItem('products')) || [];

if (!products.length) {
    products.push(new Product('bag', 'images/bag.jpg'));
    products.push(new Product('banana', 'images/banana.jpg'));
    products.push(new Product('bathroom', 'images/bathroom.jpg'));
    products.push(new Product('boots', 'images/boots.jpg'));
    products.push(new Product('breakfast', 'images/breakfast.jpg'));
    products.push(new Product('bubblegum', 'images/bubblegum.jpg'));
    products.push(new Product('chair', 'images/chair.jpg'));
    products.push(new Product('cthulhu', 'images/cthulhu.jpg'));
    products.push(new Product('dog', 'images/dog.jpg'));
    products.push(new Product('dragon', 'images/dragon.jpg'));
    products.push(new Product('pen', 'images/pen.jpg'));
    products.push(new Product('pet-sweep', 'images/pet-sweep.jpg'));
    products.push(new Product('scissors', 'images/scissors.jpg'));
    products.push(new Product('shark', 'images/shark.jpg'));
    products.push(new Product('sweep', 'images/sweep.png'));
    products.push(new Product('tauntaun', 'images/tauntaun.jpg'));
    products.push(new Product('unicorn', 'images/unicorn.jpg'));
    products.push(new Product('water-can', 'images/water-can.jpg'));
    products.push(new Product('wine-glass', 'images/wine-glass.jpg'));

}

img.addEventListener('click', function() {
    product.timesClicked++;
    currentRound++;
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
});

localStorage.clear();

}

