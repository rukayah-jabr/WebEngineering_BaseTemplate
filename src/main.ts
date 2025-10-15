import { initSearchHighlighter } from './searchHighlighter';
import { initCommentToggle } from './initCommentToggle';
import { initCommentForm } from './initCommentForm';
import { bearFetcher } from './bearFetcher';
import '../style.css';

initSearchHighlighter();
initCommentToggle();
initCommentForm();
void bearFetcher();

// const huskyTest = 4;
