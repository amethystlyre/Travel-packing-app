// Update list
const updateListHandler = async (event) => {
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


    let updatedPackList = {
        name: listName,
        destinations: listDestination,
        transports: selectedTransport,
        climates: listClimate,
        luggages:selectedBags,
    };

    if(listDateFrom !=''){
        updatedPackList.date_from=listDateFrom;
    }

    if(listDateTo !=''){
        updatedPackList.date_to=listDateTo;
    }

    if (listName) {
        const response = await fetch(`/api/packLists`, {
            method: 'PUT',
            body: JSON.stringify(updatedPackList),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log(response);
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update list');
            console.log(response.status);
        }
    }
};

document
    .querySelector('#update-list-form')
    .addEventListener('submit', updateListHandler);