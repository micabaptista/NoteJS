let createList = () => {

    const text = getText();

    if (text !== null) {

        let newItem = {
            id: getCount(),
            name: text,
            data: []
        };
        let json = JSON.stringify(newItem);
        localStorage.setItem(text, json);
        updateNavItems();
    }
}

function getText() {
    let text = prompt("New list:");
    if (text === null || text === "") {
        alert("Sorry, but the given name is not valid.\n Please try again please");
        return null;
    }
    let arrayLocalStorage = getArrayLocalStorage();
    for (let i = 0; i < localStorage.length; i++) {
        if (text === arrayLocalStorage[i].name) {
            alert("Sorry, but the given name already exist.\n Please try again please");
            return null;
        }
    }
    return text;
}

function getCount() {
    let allIDs = getArrayLocalStorage();
    if (localStorage.length === 0) {
        return 0;
    }
    return allIDs[allIDs.length - 1].id + 1;
}
