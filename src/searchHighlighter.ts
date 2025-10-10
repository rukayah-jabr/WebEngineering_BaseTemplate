// Search highlighter
export const initSearchHighlighter = (): void => {
  try {
    const form = document.querySelector<HTMLFormElement>('.search');
    if (form === null) return;

    form.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault();

      // Highlight zurücksetzen
      document.querySelectorAll<HTMLElement>('.highlight').forEach((el) => {
        const parent = el.parentNode;
        if (parent === null) return;

        parent.replaceChild(document.createTextNode(el.textContent ?? ''), el);
        (parent as HTMLElement).normalize();
      });

      // Suchbegriff holen
      const target = e.target as HTMLFormElement;
      const input = target.elements.namedItem('q') as HTMLInputElement | null;
      const searchKey = input?.value.trim();
      if (searchKey === undefined || searchKey === '') return;

      const regex = new RegExp(
        '(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')',
        'gi'
      );

      // DOM walk
      const walk = (node: Node): void => {
        if (node.nodeType === Node.TEXT_NODE) {
          const nodeValue = node.nodeValue;
          if (nodeValue === null || nodeValue === '') return;

          if (regex.test(nodeValue)) {
            const span = document.createElement('span');
            span.innerHTML = nodeValue.replace(
              regex,
              '<mark class="highlight">$1</mark>'
            );
            (node as ChildNode).replaceWith(...span.childNodes);
          }
        } else if (
          node.nodeType === Node.ELEMENT_NODE &&
          !(node instanceof HTMLScriptElement) &&
          !(node instanceof HTMLStyleElement) &&
          !(node instanceof HTMLFormElement)
        ) {
          node.childNodes.forEach(walk);
        }
      };

      walk(document.body);
    });
  } catch (err) {
    console.error('Search highlighter error:', err);
    alert('Something went wrong with the search highlighter.');
  }
};
