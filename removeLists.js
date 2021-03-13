function removeList() {

    if (confirmRemove(this)) {
        if (localStorage.length === 1) {
            localStorage.clear();
            location.reload();
        }
        document.querySelectorAll(".not-active")[0].classList.replace("not-active", "active");
        localStorage.removeItem(this.parentElement.innerText.trim());
        document.querySelectorAll(".active")[0].classList.replace("active", "not-active");
        updateIndex();
        location.reload();
    }
}

function updateIndex() {
    let array = updateIndexAux();
    for (let i = 0; i < array.length; i++) {
        //aqui sei que o index removido foi o i.
        if (array[i].id !== i) {
            for (let j = i; j < array.length; j++) {
                let temp = localStorage.getItem(array[j].name);
                let json = JSON.parse(temp);
                if (json.id > 0) {
                    json.id--;
                }
                let jsonMake = JSON.stringify(json);
                localStorage.setItem(array[j].name, jsonMake);
            }
            break;
        }
    }
}

function updateIndexAux() {
    let allIDs = [];
    if (localStorage.length === 0) {
        return [];
    }
    for (let i = 0; i < localStorage.length; i++) {
        let json = localStorage.getItem(localStorage.key(i));
        allIDs[i] = JSON.parse(json)

    }
    return allIDs.sort((a, b) => a.id - b.id);
}


function confirmRemove(event) {
    let current = event.parentElement.textContent.trim();
    let answer = window.confirm("Removing " + current + " from your lists.")
    if (answer) {
        return 1
    }
    return 0;
}