// create new list
const createListHandler = async (event) => {
    event.preventDefault();

    let listName = document.querySelector('#name').value.trim();
    let listDateFrom = document.querySelector('#dateFrom').value;
    let listDateTo = document.querySelector('#dateTo').value;
    let listDestination = document.querySelector('#destination').value.trim();
    let listTransport = document.querySelectorAll(
        'input[name="vehicle"]:checked'
    );
    let selectedTransport = Array.from(listTransport)
        .map((x) => x.value)
        .toString();
    let listBags = document.querySelectorAll('input[name="bag"]:checked');
    let selectedBags = Array.from(listBags).map((x) => x.value);
    let listClimate = document.querySelector('#climate').value.trim();


    let newPackList = {
        name: listName,
        date_from: listDateFrom,
        date_to: listDateTo,
        destinations: listDestination,
        transports: selectedTransport,
        climates: listClimate,
    };

    if (listName) {
        const response = await fetch(`/api/packLists`, {
            method: 'POST',
            body: JSON.stringify(newPackList),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log(response);
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create list');
            console.log(response.status);
        }
    }
};

document
    .querySelector('#create-new-list-form')
    .addEventListener('submit', createListHandler);