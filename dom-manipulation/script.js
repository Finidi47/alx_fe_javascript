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

// ===============================SECTION 2========================================

function createAddQuoteForm(){
    const formContainer = document.createElement('div');
    formContainer.id = 'addQuoteFormContainer';

    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category'

    const formBtn = document.createElement('button');
    formBtn.innerHTML = 'Add Quote';

    // listen to the Add quote button. Get the inputs and validate them
    formBtn.addEventListener('click', () => {
        const newQuoteText = quoteInput.value.trim();
        const newQuoteCategory = categoryInput.value.trim();

        if (newQuoteText === '' || newQuoteCategory === ''){
            alert('please fill in both fields');
            return;
        }

        // Create new quote object from the inputs
        const newQuoteObject = {
            text: newQuoteText,
            category: newQuoteCategory
        };

        // Add the new object to the main array
        quotes.push(newQuoteObject);

        // clear th input fields 
        quoteInput.value = '';
        categoryInput.value = '';

        // provide feedback when form is submitted
        alert('Quote added successfully');
    })

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(formBtn);

    document.body.appendChild(formContainer);
}



const addBtn = document.getElementById('addNewQuote');
addBtn.addEventListener('click', createAddQuoteForm);