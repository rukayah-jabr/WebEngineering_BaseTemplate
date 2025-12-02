<template>
  <Header />
  <Nav />
  <main>
    <article>
      <h2>The trouble with Bears</h2>
      <p><strong>By Evan Wild</strong></p>
      <!-- Restlicher Artikel-Inhalt -->
      <Comments />
      <Bears />
    </article>
    <aside class="secondary">
      <h3>Related</h3>
      <ul>
        <li><a href="#">The trouble with Bees</a></li>
        <li><a href="#">The trouble with Otters</a></li>
      </ul>
    </aside>
  </main>
  <Footer />
</template>

<script lang="ts">
import Header from './components/Header.vue';
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
import Comments from './components/Comments.vue';
import Bears from './components/Bears.vue';

export default {
  components: { Header, Nav, Footer, Comments, Bears },
};
</script>

<!-- <style src="./app.css"></style> -->
