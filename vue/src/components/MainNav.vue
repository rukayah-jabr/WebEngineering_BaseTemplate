<template>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Our team</a></li>
      <li><a href="#">Projects</a></li>
      <li><a href="#">Blog</a></li>
    </ul>

    <form class="search" @submit.prevent="highlightSearch">
      <label for="search" class="visually-hidden">Search Query</label>
      <input
        id="search"
        v-model="query"
        type="search"
        placeholder="Search query"
      />
      <input type="submit" value="Go!" />
    </form>
  </nav>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const query = ref('');

    const highlightSearch = () => {
      document.querySelectorAll('.highlight').forEach((el) => {
        const parent = el.parentNode;
        if (!parent) return;
        parent.replaceChild(document.createTextNode(el.textContent ?? ''), el);
        (parent as HTMLElement).normalize();
      });

      if (!query.value) return;
      const regex = new RegExp(
        `(${query.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
        'gi'
      );

      const walk = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const nodeValue = node.nodeValue;
          if (!nodeValue) return;
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
    };

    return { query, highlightSearch };
  },
};
</script>
