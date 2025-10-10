// Show/hide comments toggle
export const initCommentToggle = (): void => {
  try {
    const showHideBtn = document.querySelector('.show-hide');
    const commentWrapper = document.querySelector('.comment-wrapper');

    if (!showHideBtn || !commentWrapper) return;

    commentWrapper.style.display = 'none';

    // fix the toggle problem
    showHideBtn.addEventListener('click', () => {
      const isHidden = commentWrapper.style.display === 'none';
      showHideBtn.textContent = isHidden ? 'Hide comments' : 'Show comments';
      commentWrapper.style.display = isHidden ? 'block' : 'none';
    });
  } catch (err) {
    console.error('Comment toggle error:', err);
  }
};
