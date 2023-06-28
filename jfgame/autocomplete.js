function runAutoComplete() {
  import Autocomplete from "https://cdn.jsdelivr.net/gh/lekoala/bootstrap5-autocomplete@master/autocomplete.js";
  const elements = document.getElementsByClassName("country-input");

  const opts = {
    onSelectItem: console.log,
  };

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    new Autocomplete(element, opts);
  }
}

runAutoComplete();