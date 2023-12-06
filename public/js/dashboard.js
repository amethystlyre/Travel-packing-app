const newListButton = async (event) => {
    event.preventDefault();

    window.location.href = '/new';
};

document
    .querySelector('#new-list-btn')
    .addEventListener('click', newListButton);

const updateListButton = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        let id = event.target.dataset.id;

        window.location.href = `/update/${id}`;
    }
};

document
    .querySelector('.update-list')
    .addEventListener('click', updateListButton);
