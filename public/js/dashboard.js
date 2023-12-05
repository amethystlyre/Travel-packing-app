const newListButton = async (event) => {
    event.preventDefault();

    window.location.href = "/new";
    

};

document
    .querySelector('#new-list-btn')
    .addEventListener('click', newListButton);