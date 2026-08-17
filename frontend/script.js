const quoteP = document.getElementById("quote");
const authorP = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const createQuoteForm = document.getElementById("create-quote-form");
const quoteInput = document.getElementById("quote-input");
const authorInput = document.getElementById("author-input");
const formFeedback = document.getElementById("form-feedback");

const URL = "http://localhost:3000/";

async function displayQuote() {
	const response = await fetch(URL);
	const quote = await response.json();

	quoteP.innerText = quote.quote;
	authorP.innerText = quote.author;
}

async function postNewQuote(event) {
	event.preventDefault();

	const quote = quoteInput.value.trim();
	const author = authorInput.value.trim();

	if (quote === "" || author === "") {
		formFeedback.textContent = "Quote and author cannot be empty.";
		return;
	}

	try {
		const response = await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				quote: quote,
				author: author,
			}),
		});

		if (response.ok) {
			formFeedback.textContent = "New quote created";
		} else {
			const message = await response.text();
			formFeedback.textContent = message;
		}
	} catch (error) {
		formFeedback.textContent =
			"There was an error connecting to the server. Try again";
	}
}

window.addEventListener("load", () => {
	displayQuote();
	newQuoteBtn.addEventListener("click", displayQuote);

	createQuoteForm.addEventListener("submit", postNewQuote);
});
