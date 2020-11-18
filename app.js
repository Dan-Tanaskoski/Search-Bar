//// Object of values manually added for search value

const people = [
  { name: "John" },
  { name: "Jonathan" },
  { name: "Oj" },
  { name: "Oleg Johnson" },
  { name: "Brock" },
  { name: "Rock" },
  { name: "Lock" },
  { name: "Sock" },
  { name: "Nathan" }
];

// DOM Selections

const searchInput = document.getElementById("search");
const list = document.getElementById("list");

/// Set List

function setList(group) {
  clearList();
  for (const person of group) {
    const item = document.createElement("li");
    const text = document.createTextNode(person.name);
    item.appendChild(text);
    list.appendChild(item);
  }
  if (group.length === 0) {
    showNoResults();
  }
}

// Clear list and set values to empty

function clearList() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

// Option for no results found

function showNoResults() {
  const item = document.createElement("li");
  const text = document.createTextNode("No results found!");
  item.appendChild(text);
  list.appendChild(item);
}

// Relevance to output items which are similar &&, || contain the same input value

function getRelevance(value, searchTerm) {
  if (value === searchTerm) {
    return 2;
  } else if (value.startsWith(searchTerm)) {
    return 1;
  } else if (value.includes(searchTerm)) {
    return 0;
  } else {
    return -1;
  }
}

// Event Listener in order to make the search bar active

searchInput.addEventListener("input", e => {
  let value = e.target.value;
  if (value && value.trim().length > 0) {
    value = value.trim().toLowerCase();
    setList(
      people
        .filter(person => {
          return person.name.includes(value);
        })
        .sort((A, B) => {
          return getRelevance(B.name, value) - getRelevance(A.name, value);
        })
    );
  } else {
    clearList();
  }
});
