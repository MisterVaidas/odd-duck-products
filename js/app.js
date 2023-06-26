'use strict'

let totalRounds = 25;
let curretRound = 0;

function Product(name, filePath) {
    this.name = name;
    this.filePath = filePath;
    this.timesShown = 0;
    this.timesClicked = 0;
}

let products = [];
products.push(new Product('bag', '../images/bag.jpg'));
products.push(new Product('banana', '../images/banana.jpg'));
products.push(new Product('bathroom', '../images/bathroom.jpg'));
products.push(new Product('boots', '../images/boots.jpg'));
products.push(new Product('breakfast', '../images/breakfast.jpg'));
products.push(new Product('bubblegum', '../images/bubblegum.jpg'));
products.push(new Product('chair', '../images/chair.jpg'));
products.push(new Product('cthulhu', '../images/cthulhu.jpg'));
products.push(new Product('dog-duck', '../images/dog-duck.jpg'));
products.push(new Product('dragon', '../images/dragon.jpg'));
products.push(new Product('pen', '../images/pen.jpg'));
products.push(new Product('pet-sweep', '../images/pet-sweep.jpg'));
products.push(new Product('scissors', '../images/scissors.jpg'));
products.push(new Product('shark', '../images/shark.jpg'));
products.push(new Product('sweep', '../images/sweep.png'));
products.push(new Product('tauntaun', '../images/tauntaun.jpg'));
products.push(new Product('unicorn', '../images/unicorn.jpg'));
products.push(new Product('water-can', '../images/water-can.jpg'));
products.push(new Product('wine-glass', '../images/wine-glass.jpg'));

function generateThreeProducts() {
    let indices = new Set();

    while (indices.size < 3) {
        let index  =Math.floor(Math.random() * products.length);
        indices.add(index);
    }

    let selectProducts = Array.from(indices).map(index => products[index]);
    selectProducts.forEach(product => product.timesShown++);
    return selectProducts;
}

let resultsButton = document.createElement('button');
resultsButton.id = 'results-button';
resultsButton.textContent = 'View Results';
resultsButton.style.display = 'none';
resultsButton.addEventListener('click', function() {
    displayResults();
});
document.body.appendChild(resultsButton);

function displayProducts() {
    let container = document.getElementById('product-container');
    container.innerHTML = '';

    if(curretRound >= totalRounds) {
        container.innerHTML = 'Thank you for voting!';
        resultsButton.style.display = 'inline';
        return;
    }


    let products = generateThreeProducts();
    for(let product of products) {
        let img = document.createElement('img');
        img.src = product.filePath;
        img.alt = product.name;
        img.title = product.name;

        img.addEventListener('click', function() {
            product.timesClicked++;
            curretRound++;
            displayProducts();
        });

        container.appendChild(img);
    }
}

resultsButton.addEventListener('click', function() {
    displayResults();
    document.getElementById('product-container').innerHTML = 'Here are your voting results!';
    resultsButton.style.display = 'none';
});

displayProducts();

function displayResults() {
    let resultsTable = document.getElementById('results-table');

    if (!resultsTable) {  
        resultsTable = document.createElement('table');
        resultsTable.id = 'results-table';
    }

    
    resultsTable.innerHTML = '';

    // create table header
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');

    let headerNames = ['Product', 'Votes', 'Views'];
    for(let headerName of headerNames) {
        let th = document.createElement('th');
        th.textContent = headerName;
        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    resultsTable.appendChild(thead);

    // create table body
    let tbody = document.createElement('tbody');

    for (let product of products) {
        let resultRow = document.createElement('tr');
        
        let nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        resultRow.appendChild(nameCell);

        let votesCell = document.createElement('td');
        votesCell.textContent = product.timesClicked;
        resultRow.appendChild(votesCell);

        let viewsCell = document.createElement('td');
        viewsCell.textContent = product.timesShown;
        resultRow.appendChild(viewsCell);

        tbody.appendChild(resultRow);
    }

    resultsTable.appendChild(tbody);

    let resultsSection = document.getElementById('results-section');
    resultsSection.appendChild(resultsTable);

    resultsButton.style.display = 'none';
}
