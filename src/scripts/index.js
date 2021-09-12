/* quote carousel */
const quote = document.querySelector('#quote');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const circles = [...document.querySelector('#carousel-circles').children];

// TODO: pull 3 quotes from local storage 
let quotes = [
    'Yesterday is history. Tomorrow is a mystery, but today is a gift! That is why it is called the present.',
    'One often meets his destiny on the road he takes to avoid it.',
    'If you only do what you can do, you will never be more than you are now.'
];

let selectedQuote = 0;

quote.textContent = quotes[selectedQuote];

next.addEventListener('click', () => {

    // display next quote
    if (selectedQuote == quotes.length - 1) {
        previousQuote = selectedQuote;
        selectedQuote = 0;
    } else {
        previousQuote = selectedQuote;
        selectedQuote++;
    }

    quote.textContent = quotes[selectedQuote];

    // change active circle
    circles[previousQuote].classList.remove('active');
    circles[selectedQuote].classList.add('active');

});

prev.addEventListener('click', () => {

    // display previous quote
    if (selectedQuote == 0) {
        nextQuote = selectedQuote;
        selectedQuote = quotes.length - 1
    } else {
        nextQuote = selectedQuote;
        selectedQuote--;
    }
    
    quote.textContent = quotes[selectedQuote];

    // change active circle
    circles[nextQuote].classList.remove('active');
    circles[selectedQuote].classList.add('active');

});

circles.forEach(button => {
    
    button.addEventListener('click', () => {

        circles[selectedQuote].classList.remove('active');
    
        // change selectedQuote
        selectedQuote = circles.indexOf(button)
        quote.textContent = quotes[selectedQuote]
    
        // change active circle
        circles[selectedQuote].classList.add('active');

    });

});
    

/* sidebar */
const menu = document.querySelector('#menu');
const sidebar = document.querySelector('#sidebar');

menu.addEventListener('click', () => {

    sidebar.classList.toggle("hidden");

});
