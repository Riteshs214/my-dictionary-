const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
  try {
    resultDiv.innerHTML = "Fetching Data";
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    const definition = data[0].meanings[0].definitions[0];

    console.log(data);
    resultDiv.innerHTML = `
  <h2><strong>Word :</strong> ${data[0].word}</h2>
  <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
  <p><strong>Defination :</strong> ${
    definition.definition === undefined ? "Not Found " : definition.definition
  }</p>
  <p><strong>Example :</strong> ${
    definition.example === undefined ? "Not Found " : definition.example
  }</p>
  <p><strong>Antonyms :</strong></p>
  `;
    // featching antonyms
    if (definition.antonyms.length === 0) {
      resultDiv.innerHTML += `<span>Not Found</span>`;
    } else {
      for (let i = 0; i < definition.antonyms.length; i++) {
        resultDiv.innerHTML += `<li>${definition.antonyms[i]}</li>`;
      }
    }

    //   readmore btn
    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
  } catch (error) {
    resultDiv.innerHTML = `<p>Sorry, the word could not be found</p>`;
  }
};
