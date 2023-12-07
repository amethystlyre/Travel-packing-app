var itemsList = [];
var categoriesList=[];
var bagsList = [];

const items = async () => {
    const response = await fetch(`/api/items`, {
        method: 'GET',
    });
    if (response.ok) {
        let data = await response.json();
        console.log(data);
        for (let item of data) {
            itemsList.push(item.name);
        }
    } else {
        alert('Failed to get details');
    }
};

const categories = async () => {
    const response = await fetch(`/api/categories`, {
        method: 'GET',
    });
    if (response.ok) {
        let data = await response.json();
        console.log(data);
        for (let category of data) {
            categoriesList.push(category.name);
        }
    } else {
        alert('Failed to get details');
    }
};

const bags = async () => {
    const response = await fetch(`/api/baggages`, {
        method: 'GET',
    });
    if (response.ok) {
        let data = await response.json();
        console.log(data);
        for (let bag of data) {
            bagsList.push(bag.name);
        }
    } else {
        alert('Failed to get details');
    }
};

items();
categories();
bags();

//Code copied from https://www.w3schools.com/howto/howto_js_autocomplete.asp
const autocomplete = (inp, arr) => {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener('input', function (e) {
        var a,
            b,
            i,
            val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement('DIV');
        a.setAttribute('id', this.id + 'autocomplete-list');
        a.setAttribute('class', 'autocomplete-items');
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (
                arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
            ) {
                /*create a DIV element for each matching element:*/
                b = document.createElement('DIV');
                /*make the matching letters bold:*/
                b.innerHTML =
                    '<strong>' + arr[i].substr(0, val.length) + '</strong>';
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener('click', function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName('input')[0].value;
                    /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener('keydown', function (e) {
        var x = document.getElementById(this.id + 'autocomplete-list');
        if (x) x = x.getElementsByTagName('div');
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) {
            //up
            /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add('autocomplete-active');
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove('autocomplete-active');
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
        var x = document.getElementsByClassName('autocomplete-items');
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener('click', function (e) {
        closeAllLists(e.target);
    });
};

autocomplete(document.getElementById('add-items'), itemsList);
autocomplete(document.getElementById('add-items-cat'), categoriesList);
autocomplete(document.getElementById('add-items-bag'), bagsList);

const addUnlistedItem = async (event) => {
    event.preventDefault();

    let packListId = document.querySelector('#add-items-to-list').dataset.id;
    let itemName = document.querySelector('#add-items').value.trim();
    let categoryName = document.querySelector('#add-items-cat').value.trim();
    let bagName = document.querySelector('#add-items-bag').value.trim();
    let catData;

    if(!categoriesList.includes(categoryName)){
        const newCategory = {
            name: categoryName,
        };

        const response = await fetch(`/api/categories/`, {
            method: 'POST',
            body: JSON.stringify(newCategory),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            catData= await response.json();
            console.log(catData);

        } else {
            //alert('Failed to create list');
            console.log(response.status);
        }

    }
    
    const newItem = {
        name: itemName,
    };

    if (categoryName){
        newItem.category=categoryName;
    }
    console.log(newItem);

    if (itemName) {
        const response = await fetch(`/api/items/${packListId}`, {
            method: 'POST',
            body: JSON.stringify(newItem),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create list');
            console.log(response.status);
        }
    }
};

document
    .querySelector('#add-items-to-list')
    .addEventListener('submit', addUnlistedItem);

const addItemFromDB = async (event) => {
    event.preventDefault();

    if (event.target.matches('button')) {
        let packListId = document.querySelector('#suggested-item-list').dataset
            .id;
        let clickedItemId = event.target.dataset.id;

        console.log(packListId);
        console.log(clickedItemId);

        if (packListId && clickedItemId) {
            const response = await fetch(
                `/api/items/${packListId}?itemId=${clickedItemId}`,
                {
                    method: 'POST',
                    body: JSON.stringify(),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to create list');
                console.log(response.status);
            }
        }
    }
};

document
    .querySelector('#suggested-item-list')
    .addEventListener('click', addItemFromDB);
