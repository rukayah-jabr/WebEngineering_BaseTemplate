export const initCommentForm = (): void => {
  try {
    const form = document.querySelector<HTMLFormElement>('.comment-form');
    const nameField = document.querySelector<HTMLInputElement>('#name');
    const commentField =
      document.querySelector<HTMLTextAreaElement>('#comment');
    const list = document.querySelector<HTMLUListElement>('.comment-container');

    if (
      form === null ||
      nameField === null ||
      commentField === null ||
      list === null
    ) {
      return;
    }

    form.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault();

      const nameValue = nameField.value.trim();
      const commentValue = commentField.value.trim();

      if (nameValue === '' || commentValue === '') {
        alert('Bitte fülle beide Felder aus.');
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
    console.error('Comment form error:', err);
    alert('Could not submit your comment, please try again.');
  }
};
