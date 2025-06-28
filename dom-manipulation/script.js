// Initial quotes array
const quotes = [
    { text: "Talk is cheap. Show me the code.", category: "Tech" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Humor" },
    { text: "Stay positive.", category: "Motivational" },
    { text: "Eat. Sleep. Code. Repeat.", category: "Tech" }
]


// show random quote func

function showRandomQuote(){
    // pick random index within the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // reference quoteDisplay container
    let display = document.getElementById('quoteDisplay');

    // clear previous content 
    display.innerHTML = '';

    // create elements for quote text and category
    const quoteText = document.createElement('p');
    quoteText.innerHTML = `"${randomQuote.text}"`;

    const quoteCategory = document.createElement('p');
    quoteCategory.innerHTML = `Category: ${randomQuote.category}`;


    // append the created elements to the container
    display.appendChild(quoteText);
    display.appendChild(quoteCategory);
}

// listen  to the newQuote button and show the quotes
const showBtn = document.getElementById('newQuote');
showBtn.addEventListener('click', showRandomQuote)