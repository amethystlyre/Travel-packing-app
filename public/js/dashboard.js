const newListButton = async (event) => {
    event.preventDefault();

    window.location.href = '/new';
};

document
    .querySelector('#new-list-btn')
    .addEventListener('click', newListButton);

//handle interaction with email modal
const emailModalCloseButton = async (event) => {
    event.preventDefault();
    let modal = document.querySelector('#email-modal');
    modal.classList.add('hidden');
};

document
    .querySelector('#close-email-modal')
    .addEventListener('click', emailModalCloseButton);

const emailButton = async (event) => {
    event.preventDefault();

    const modal = document.querySelector('#email-modal');
    const modalListName = document.querySelector('#email-list-name');
    const modalSendBtn = document.querySelector('#send-email');

    const id = event.target.dataset.id;
    const listname = event.target.dataset.listName;

    //console.log(event.target.dataset.listName);
    modalListName.innerHTML = listname;
    modal.classList.remove('hidden');
    modalSendBtn.dataset.id = id;
};

let emailBtns = document.querySelectorAll('.email-btn');

emailBtns.forEach(function (button) {
    button.addEventListener('click', emailButton);
});

//handle interaction with sending email
const emailFormHandler = async (event) => {
    event.preventDefault();

    let shareEmailAdd = document
        .querySelector('#share-email-address')
        .value.trim();
    let emailMsg = document.querySelector('#email-message').value.trim();
    let emailListName = document.querySelector('#email-list-name').textContent;
    let emailListId = document.querySelector('#send-email').dataset.id;

    // console.log(emailListName);

    // console.log(shareEmailAdd);
    // console.log(emailMsg);

    if (shareEmailAdd && emailListId) {
        const response = await fetch('/api/email', {
            method: 'POST',
            body: JSON.stringify({
                shareEmailAdd,
                emailMsg,
                emailListId,
                emailListName,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Email has been sent');
            document.location.replace('/dashboard');
        } else {
            alert('Failed to send email');
        }
    }
};

document
    .querySelector('#email-form')
    .addEventListener('submit', emailFormHandler);

//handle interaction with delete modal
const deleteButton = async (event) => {
    event.preventDefault();

    const modal = document.querySelector('#delete-modal');
    const modalListName = document.querySelector('#delete-list-name');
    const modalDeleteBtn = document.querySelector('#delete-packlist');

    let id = event.target.dataset.id;
    let listname = event.target.dataset.listName;

    //console.log(event.target.dataset.listName);
    modalListName.innerHTML = listname;
    modal.classList.remove('hidden');
    modalDeleteBtn.dataset.id = id;
};

let deleteBtns = document.querySelectorAll('.delete-btn');

deleteBtns.forEach(function (button) {
    button.addEventListener('click', deleteButton);
});

const deleteModalCloseButton = async (event) => {
    event.preventDefault();
    let modal = document.querySelector('#delete-modal');
    modal.classList.add('hidden');
};

document
    .querySelector('#close-del-modal')
    .addEventListener('click', deleteModalCloseButton);

document
    .querySelector('#cancel-delete')
    .addEventListener('click', deleteModalCloseButton);


//handle delete confirmation
const delConfirmationHandler = async (event) => {
    event.preventDefault();

    let delListId = document.querySelector('#delete-packlist').dataset.id;

    if (delListId) {
        const response = await fetch(`/api/packLists/${delListId}`, {
            method: 'DELETE',
            body: JSON.stringify(),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Packing list deleted.');
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete packing list.');
        }
    }
};

document
    .querySelector('#delete-packlist')
    .addEventListener('click', delConfirmationHandler);
