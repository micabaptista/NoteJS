let add = document.querySelector("#add-new input[type=button]");
add.addEventListener("click", funcAdd);

function funcAdd() {

    let ul = document.getElementById("list");
    let textInput = document.querySelector("#add-new input[type=text]").value;

    let li = document.createElement("li");
    let label = document.createElement("label");
    let input = document.createElement("input");

    input.setAttribute("type", "checkbox");
    label.appendChild(input);
    label.appendChild(document.createTextNode(textInput));
    li.appendChild(label);
    ul.appendChild(li);
}

let remove = document.querySelector("#remove-all input[type=button]");
remove.addEventListener("click", removeFunc);

function removeFunc() {

    let ul = document.getElementById("list");
    let listLi = ul.getElementsByTagName("li");

    for (let i = 0; i < listLi.length; i++) {
        let label = listLi[i].getElementsByTagName("label")[0];
        let checkbox = label.getElementsByTagName("input")[0];
        if (checkbox.checked === true) {
            listLi[i].remove();
            i--;
        }
    }

}
