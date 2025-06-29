// Initial quotes array

let quotes = [
    { text: "Talk is cheap. Show me the code.", category: "Tech" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Humor" },
    { text: "Stay positive.", category: "Motivational" },
    { text: "Eat. Sleep. Code. Repeat.", category: "Tech" }
]

// Try to get saved quotes JSON string
const savedQuotesJSON = localStorage.getItem('quotes');

// If found, parse and use it; otherwise, keep default
if (savedQuotesJSON){
    quotes = JSON.parse(savedQuotesJSON);
}

/* // Optional: Load last displayed quote from Session Storage
const lastquoteJSON = sessionStorage.getItem('lastQuote');
if (lastquoteJSON) {
    const lastQuote = JSON.parse(lastquoteJSON);

        // Display lastQuote in the quoteDisplay div
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = ''; // Clear previous content

        const quoteText = document.createElement('p');
        quoteText.textContent = `"${lastQuote.text}"`;

        const quoteCategory = document.createElement('p');
        quoteCategory.textContent = `Category: ${lastQuote.category}`;

        quoteDisplay.appendChild(quoteText);
        quoteDisplay.appendChild(quoteCategory);
}  */


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

    // save the quote in session storage
    sessionStorage.setItem('lastquote', JSON.stringify(randomQuote))
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

        // save the updated quotes array to the local storage
        localStorage.setItem('quotes', JSON.stringify(quotes));

        // Optional: Show the new quote immediately
        // showRandomQuote();

    
        // clear the input fields 
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


// ===============================SECTION 3 - Export & Import========================================

// Function to export quotes to a JSON file
function exportQuotes() {
    // convert quotes arry to JSON string
    const quotesJSON = JSON.stringify(quotes, null, 2)

    // create a new blob object from the json string
    const blob = new Blob([quotesJSON], {type: 'application/json'});

    // generate a temporary url for the blob
    const url = URL.createObjectURL(blob)

    // create a temporary link
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json' //name of the download file

    // append the link, simulate click, then remove it
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    //revoke the temporary url to free memory
    URL.revokeObjectURL(url); 

}

 // attach event listener to the export button 
    exportBtn = document.getElementById('exportQuotes');
    exportBtn.addEventListener('click', exportQuotes)


    // Function to import quotes from a selected JSON file

function importFromJsonFile(event){
    const fileReader = new FileReader();

    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}