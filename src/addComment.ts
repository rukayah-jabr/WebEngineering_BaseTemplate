class AddComment extends HTMLElement {
  private showHideBtn: HTMLButtonElement | null = null;
  private commentWrapper: HTMLDivElement | null = null;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    if (shadow == null) {
      return;
    }

    shadow.innerHTML = `
      <style>
        .comment-form {
          margin-bottom: 3rem;
          background-color: #def;
          padding: 1rem;
          border-radius: 8px;
          font-family: 'Open Sans Condensed', sans-serif;
        }
        .comment-form h3 { font-size: 2rem; margin-bottom: 1rem; }
        .flex-pair { display: flex; margin-bottom: 1rem; }
        label { flex: 2; text-align: right; margin-right: 1rem; font-size: 1.6rem; }
        input[type="text"] { flex: 6; font-size: 1.6rem; padding: 0.5rem; }
        input[type="submit"] {
          display: block; margin: 1rem auto; background: #333;
          color: white; border: none; padding: 0.5rem 2rem; font-size: 1.6rem; cursor: pointer;
        }
        .comment-container li { list-style: none; display: flex; margin-top: 1rem; }
        .comment-container li p:first-child { flex: 1; font-weight: bold; }
        .comment-container li p:last-child { flex: 5; }
      </style>

      <button class="show-hide">Show comments</button>

      <div class="comment-wrapper" style="display:none;">
        <form class="comment-form">
          <h3>Add comment</h3>
          <div class="flex-pair">
            <label for="name">Your name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name">
          </div>
          <div class="flex-pair">
            <label for="comment">Your comment:</label>
            <input type="text" id="comment" name="comment" placeholder="Enter your comment">
          </div>
          <input type="submit" value="Submit comment">
        </form>

        <h3>Comments</h3>
        <ul class="comment-container">
          <li>
            <p><strong>Bob Fossil</strong></p>
            <p>Oh I am so glad you taught me all about the big brown angry guys...</p>
          </li>
        </ul>
      </div>
    `;
  }

  connectedCallback(): void {
    this.initCommentToggle();
    this.initCommentForm();
  }

  private initCommentToggle(): void {
    const shadow = this.shadowRoot;
    if (shadow == null) {
      return;
    }

    const showHideBtn = shadow.querySelector<HTMLButtonElement>('.show-hide');
    const commentWrapper =
      shadow.querySelector<HTMLDivElement>('.comment-wrapper');

    if (showHideBtn == null || commentWrapper == null) return;

    this.showHideBtn = showHideBtn;
    this.commentWrapper = commentWrapper;

    showHideBtn.addEventListener('click', () => {
      const isHidden = commentWrapper.style.display === 'none';
      commentWrapper.style.display = isHidden ? 'block' : 'none';
      showHideBtn.textContent = isHidden ? 'Hide comments' : 'Show comments';
    });
  }

  private initCommentForm(): void {
    const shadow = this.shadowRoot;
    if (shadow == null) return;

    const form = shadow.querySelector<HTMLFormElement>('.comment-form');
    const nameField = shadow.querySelector<HTMLInputElement>('#name');
    const commentField = shadow.querySelector<HTMLInputElement>('#comment');
    const list = shadow.querySelector<HTMLUListElement>('.comment-container');

    if (
      form == null ||
      nameField == null ||
      commentField == null ||
      list == null
    ) {
      return;
    }

    form.addEventListener('submit', (event: SubmitEvent) => {
      event.preventDefault();

      const nameValue = nameField.value.trim();
      const commentValue = commentField.value.trim();

      if (nameValue.length === 0 || commentValue.length === 0) {
        window.alert('Bitte fülle beide Felder aus.');
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
  }
}

customElements.define('add-comment', AddComment);
