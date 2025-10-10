// Search highlighter
export const initSearchHighlighter = (): void => {
    try {
        const form = document.querySelector('.search') as HTMLFormElement;
        if (!form) return;

        form.addEventListener('submit', (e: SubmitEvent) => {
            e.preventDefault();

            document.querySelectorAll('.highlight').forEach((el) => {
                const element = el as HTMLElement;
                const parent = element.parentNode;
                if (parent) {
                    parent.replaceChild(document.createTextNode(element.textContent || ""), element);
                    (parent as HTMLElement).normalize();
                }

            });

            const target = e.target as HTMLFormElement;
            const input = target.elements.namedItem("q") as HTMLInputElement | null;
            const searchKey = input?.value.trim();
            if (!searchKey) return;

            const regex = new RegExp('(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');

            const walk = (node: Node): void => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const nodeValue = node.nodeValue;
                    if (!nodeValue) return;

                    const match = nodeValue.match(regex);
                    if (match) {
                        const span = document.createElement('span');
                        span.innerHTML = nodeValue.replace(regex, '<mark class="highlight">$1</mark>');
                        if ("replaceWith" in node) {
                            (node as ChildNode).replaceWith(...span.childNodes);
                        }
                    }
                }
                else if (
                    node.nodeType === Node.ELEMENT_NODE &&
                    !(node instanceof HTMLScriptElement) &&
                    !(node instanceof HTMLStyleElement) &&
                    !(node instanceof HTMLFormElement)
                ) {
                    node.childNodes.forEach((child) => walk(child));
                }
            };

            walk(document.body);
        });

    } catch (err) {
        console.error("Search highlighter error:", err);
        alert("Something went wrong with the search highlighter.");
    }


}
