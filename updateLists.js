function updateLocalStorage() {
    if (document.querySelector(".active") !== null) {
        let listName = document.querySelector(".active").textContent.trim()
        let nav;
        if (listName !== null || listName !== "") {

            if (typeof (Storage) !== "undefined" || localStorage.length > 0) {

                let list = document.querySelectorAll("#list li");
                let data = [];

                for (let i = 0; i < list.length; i++) {
                    let checkbox = document.querySelectorAll("#list li label input[type=checkbox]")[i];
                    let name = document.querySelectorAll("#list label")[i].textContent.trim();
                    data[i] = {
                        value: checkbox.checked,
                        name: name
                    }
                }

                let json1 = localStorage.getItem(listName);
                let nav1 = JSON.parse(json1);

                let currentId = nav1.id === null ? 0 : nav1.id;
                nav = {
                    id: currentId,
                    name: nav1.name,
                    data: data
                };
                let json = JSON.stringify(nav);
                localStorage.setItem(listName, json);

            } else {
                alert("Sorry! No Web Storage support..")
            }
        }
    }
}

let updateItems = () => {
    let current = document.querySelector(".active div").textContent.trim();
    let json = localStorage.getItem(current);
    let data;
    if (json) {
        data = JSON.parse(json).data;
    } else {
        let array = getArrayLocalStorage();
        let json = localStorage.getItem(array[0].name);
        data = JSON.parse(json).data;
    }

    let ul = document.getElementById("list");
    ul.innerText = ''
    for (let i = 0; i < data.length; i++) {
        if (data[i] !== null) {
            let li = document.createElement("li");
            let label = document.createElement("label");
            let input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            data[i].value ? input.checked = true : input;
            label.appendChild(input);
            label.appendChild(document.createTextNode(data[i].name));
            li.appendChild(label);
            ul.appendChild(li);
        }
    }
}

function getArrayLocalStorage() {
    let allIDs = [];
    if (localStorage.length === 0) {
        return [];
    }
    for (let i = 0; i < localStorage.length; i++) {
        for (let j = 0; j < localStorage.length; j++) {
            let json = localStorage.getItem(localStorage.key(j));
            let nav = JSON.parse(json);
            if (nav.id === i) {
                allIDs[i] = nav;
            }
        }
    }
    return allIDs
}


function changeList() {

    document.querySelector("nav ul .active").classList.replace("active", "not-active");
    this.classList.replace("not-active", "active");

    updateItems();

}

function updateNavItems() {

    let ul = document.querySelector("nav ul");
    let allNav = document.querySelectorAll("nav ul li");
    let addNew = document.getElementById("new-list");
    addNew.remove();

    for (let i = 0; i < allNav.length; i++) {
        allNav[i].remove();
    }
    for (let i = 0; i < localStorage.length; i++) {
        let arrayLocalStorage = getArrayLocalStorage();
        if (arrayLocalStorage[i] !== null) {
            let li = document.createElement("li");
            if (i !== 0) {
                li.className = "not-active";
            } else {
                li.className = "active";
            }
            let div = document.createElement("div");
            let input = document.createElement("input");
            input.className = "remove-list";
            input.setAttribute("type", "button");
            input.setAttribute("value", "X");
            li.addEventListener("click", changeList);
            input.addEventListener("click", removeList)
            div.appendChild(input);
            div.appendChild(document.createTextNode(arrayLocalStorage[i].name));
            li.appendChild(div);
            ul.appendChild(li);
        }
    }
    ul.appendChild(addNew);

}

function updateData() {
    updateNavItems();
    updateItems();
}

document.getElementById("list").addEventListener('change', updateLocalStorage)
document.getElementById("list").addEventListener('DOMSubtreeModified', updateLocalStorage)

window.onload = updateData;
window.addEventListener('storage', updateData);

