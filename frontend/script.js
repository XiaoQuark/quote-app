const quoteP = document.querySelector("#quote");
const authorP = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#new-quote");

async function displayQuote() {
	const response = await fetch("http://127.0.0.1:3000/");
	const quote = await response.json();

	quoteP.innerText = quote.quote;
	authorP.innerText = quote.author;
}

window.addEventListener("load", () => {
	displayQuote();
	newQuoteBtn.addEventListener("click", displayQuote);
});
