let lists = document.querySelector("nav ul");
for (let i = 0; i < lists.getElementsByClassName("not-active").length; i++) {
    lists.getElementsByClassName("not-active")[i].addEventListener("click", changeList);
    lists.getElementsByClassName("active")[0].addEventListener("click", changeList);
    // apagar a posteriori
    localStorage.setItem(lists.getElementsByClassName("not-active")[i].textContent, null)
    localStorage.setItem(lists.getElementsByClassName("active")[0].textContent, null)
}

function changeList() {
    const previousList = document.querySelector(".active").textContent;

    document.querySelector("nav ul .active").classList.replace("active", "not-active");
    event.target.classList.replace("not-active", "active");

    saveLastItems(previousList);

    updateNewItems();

}

let saveLastItems = (previousList) => {

    if (typeof (Storage) !== "undefined") {

        let list = document.querySelectorAll("#list li");
        let data = {
            item: []
        };

        for (let i = 0; i < list.length; i++) {
            let checkbox = document.querySelectorAll("#list li label input[type=checkbox]")[i];
            let name = document.querySelectorAll("#list label")[i].textContent.trim();

            data.item[i] = {
                value: checkbox.checked,
                name: name
            }
        }
        let json = JSON.stringify(data);

        localStorage.setItem(previousList, json);
    } else {
        alert("Sorry! No Web Storage support..")
    }
}

let updateNewItems = () => {
    let current = document.querySelector(".active").textContent.trim();

    let data = JSON.parse(localStorage.getItem(current));


    let txt = "";
    txt += "<ul id='list'>"
    for (let i = 0; i < obj.item.length; i++) {
        txt += "<li><label><input type='checkbox'>" + data.item[i] + "</label></li>";
    }
    txt += "</ul>"

    document.getElementById("#list").replaceWith(txt);

}


let createList = () => {
    let ul = document.querySelector("nav ul");

    let addNew = document.getElementById("new-list");
    let li = document.createElement("li");
    li.className = "not-active";
    li.addEventListener("click", changeList);

    const text = getText();
    localStorage.setItem(text, null)

    ul.removeChild(addNew);
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
    ul.appendChild(addNew);
}

function getText() {
    let text = prompt("New list:");
    if (text === null || text === "") {
        alert("Sorry, but the given name is not valid.\n Please try again please");
    }
    return text;
}
