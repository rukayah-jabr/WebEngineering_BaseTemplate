export const initCommentForm = (): void => {
    try {
        const form = document.querySelector('.comment-form') as HTMLFormElement | null;
        const nameField = document.querySelector('#name') as HTMLInputElement | null;
        const commentField = document.querySelector('#comment') as HTMLTextAreaElement | null;
        const list = document.querySelector('.comment-container') as HTMLUListElement | null;

        if (!form || !nameField || !commentField || !list) return;

        form.addEventListener('submit', (e: SubmitEvent) => {
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
        });

    } catch (err) {
        console.error("Comment form error:", err);
        alert("Could not submit your comment, please try again.");
    }
}
