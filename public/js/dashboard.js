const newListButton = async (event) => {
    event.preventDefault();

    window.location.href = '/new';
};

document
    .querySelector('#new-list-btn')
    .addEventListener('click', newListButton);

//handle interaction with email modal
const emailCloseButton = async (event) => {
    event.preventDefault();
    let modal = document.querySelector('#email-modal');
    modal.classList.add('hidden');
};

document
    .querySelector('#close-modal')
    .addEventListener('click', emailCloseButton);

const emailButton = async (event) => {
    event.preventDefault();

    let modal = document.querySelector('#email-modal');
    let modalListName = document.querySelector('#email-list-name');
    let modalSendBtn = document.querySelector('#send-email');

    let id = event.target.dataset.id;
    let listname = event.target.dataset.listName;

    //console.log(event.target.dataset.listName);
    modalListName.innerHTML=listname;
    modal.classList.remove('hidden');
    modalSendBtn.dataset.id=id;
};

let emailBtns = document.querySelectorAll('.email-btn');

emailBtns.forEach(function (button) {
    button.addEventListener('click', emailButton);
});

//handle interaction with sending email
const emailFormHandler = async (event) => {
    event.preventDefault();

    let shareEmailAdd = document.querySelector('#share-email-address').value.trim();
    let emailMsg = document.querySelector('#email-message').value.trim();
    let emailListName = document.querySelector('#email-list-name').textContent;
    let emailListId = document.querySelector('#send-email').dataset.id;

    // console.log(emailListName);
    
    // console.log(shareEmailAdd);
    // console.log(emailMsg);

    if (shareEmailAdd&&emailListId) {
        const response = await fetch('/api/email', {
            method: 'POST',
            body: JSON.stringify({ shareEmailAdd, emailMsg, emailListId, emailListName}),
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