export const initCommentForm = () => {
    const form = document.querySelector('.comment-form');
    const nameField = document.querySelector('#name');
    const commentField = document.querySelector('#comment');
    const list = document.querySelector('.comment-container');

    form.onsubmit = (e) => {
        e.preventDefault();

        const nameValue = nameField.value.trim();
        const commentValue = commentField.value.trim();

        if (!nameValue || !commentValue) {
            alert("Bitte fülle beide Felder aus.");
            return;
        }

        const listItem = document.createElement('li');
        const namePara = document.createElement('p');
        const commentPara = document.createElement('p');

        namePara.textContent = nameValue;
        commentPara.textContent = commentValue;

        listItem.appendChild(namePara);
        listItem.appendChild(commentPara);
        list.appendChild(listItem);

        nameField.value = '';
        commentField.value = '';
    };
};
