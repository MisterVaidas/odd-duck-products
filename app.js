'use strict'

const totalRounds = 25;
let currentRound = 0;

function Product(name, filePath) {
    this.name = name;
    this.filePath = filePath;
    this.timesShown = 0;
    this.timesClicked = 0;
}

let products = [];
products.push(new Product('bag', 'images/bag.jpg'));
products.push(new Product('banana', 'images/banana.jpg'));
products.push(new Product('bathroom', 'images/bathroom.jpg'));
products.push(new Product('boots', 'images/boots.jpg'));
products.push(new Product('breakfast', 'images/breakfast.jpg'));
products.push(new Product('bubblegum', 'images/bubblegum.jpg'));
products.push(new Product('chair', 'images/chair.jpg'));
products.push(new Product('cthulhu', 'images/cthulhu.jpg'));
products.push(new Product('dog-duck', 'images/dog-duck.jpg'));
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

let previousProducts = [];

function generateThreeProducts() {
    let uniqueProducts = [];

    while (uniqueProducts.length < 3) {
        let randomIndex = Math.floor(Math.random() * products.length);
        let candidateProduct = products[randomIndex];

        if (!previousProducts.includes(candidateProduct) && !uniqueProducts.includes(candidateProduct)) {
            uniqueProducts.push(candidateProduct);
            candidateProduct.timesShown++;
        }
    }
    previousProducts = [...uniqueProducts];
    localStorage.setItem('products', JSON.stringify(products)); // This line updates products in local storage
    return uniqueProducts;
}


const resultsButton = document.createElement('button');
resultsButton.id = 'results-button';
resultsButton.textContent = 'View Results';
resultsButton.style.display = 'none';
resultsButton.addEventListener('click', function() {
    displayResults();
});
document.body.appendChild(resultsButton);

function displayProducts() {
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    let imgContainer = document.createElement('div');
    imgContainer.className = 'image-container'; 
    container.appendChild(imgContainer);

    if(currentRound >= totalRounds) {
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
        img.classList.add('product-image');


        img.addEventListener('click', function() {
            product.timesClicked++;
            currentRound++;
            displayProducts();
        });

        imgContainer.appendChild(img);
    }
}

resultsButton.addEventListener('click', function() {
    displayResults();
    setTimeout(displayCharts, 0); // display charts
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

    let resultsSection = document.getElementById('table-container');
    resultsSection.appendChild(resultsTable);

    resultsButton.style.display = 'none';
}

function displayCharts() {
    let productNames = products.map(product => product.name);
    let ProductVotes = products.map(product => product.timesClicked);
    let productViews = products.map(product => product.timesShown);

    let votesContext = document.getElementById('votesChart').getContext('2d');
    let viewsContext = document.getElementById('viewsChart').getContext('2d');

    window.votesChart = new Chart (votesContext, {
        type: 'pie',
        data: {
            labels: productNames,
            datasets: [{
                data: ProductVotes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(80, 100, 210, 0.2)',
                    'rgba(95, 185, 225, 0.2)',
                    'rgba(135, 105, 244, 0.2)',
                    'rgba(156, 136, 247, 0.2)',
                    'rgba(200, 85, 156, 0.2)',
                    'rgba(169, 168, 78, 0.2)',
                    'rgba(82, 112, 219, 0.2)',
                    'rgba(110, 82, 149, 0.2)',
                    'rgba(214, 151, 98, 0.2)',
                    'rgba(248, 147, 85. 0.2)',
                    'rgba(125, 155, 147, 0.2)',
                    'rgba(74, 85, 99, 0.2)',
                    'rgba(74, 108, 205, 0.2)',
                    'rgba(201, 133, 86, 0.2)',
                ],

                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 129, 102, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(201, 203, 207, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(231,233,237, 1)',
                    'rgba(210, 214, 222, 1)',
                    'rgba(110, 122, 139, 1)',
                    'rgba(244, 245, 246, 1)',
                    'rgba(96, 92, 168, 1)',
                    'rgba(240, 195, 15, 1)',

                ],

                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });

    window.viewsChart = new Chart (viewsContext, {
        type: 'pie',
        data: {
            labels: productNames,
            datasets: [{
                data: productViews,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(80, 100, 210, 0.2)',
                    'rgba(95, 185, 225, 0.2)',
                    'rgba(135, 105, 244, 0.2)',
                    'rgba(156, 136, 247, 0.2)',
                    'rgba(200, 85, 156, 0.2)',
                    'rgba(169, 168, 78, 0.2)',
                    'rgba(82, 112, 219, 0.2)',
                    'rgba(110, 82, 149, 0.2)',
                    'rgba(214, 151, 98, 0.2)',
                    'rgba(248, 147, 85. 0.2)',
                    'rgba(125, 155, 147, 0.2)',
                    'rgba(74, 85, 99, 0.2)',
                    'rgba(74, 108, 205, 0.2)',
                    'rgba(201, 133, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 129, 102, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(201, 203, 207, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(231,233,237, 1)',
                    'rgba(210, 214, 222, 1)',
                    'rgba(110, 122, 139, 1)',
                    'rgba(244, 245, 246, 1)',
                    'rgba(96, 92, 168, 1)',
                    'rgba(240, 195, 15, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
    let resultsSection = document.getElementById('chart-container');
    resultsSection.appendChild(document.getElementById('votesChart'));
    resultsSection.appendChild(document.getElementById('viewsChart'));

    document.getElementById('charts').style.display = 'block';
}
