<template>
  <Header />
  <Nav />
  <main>
    <Article />
    <aside class="secondary">
      <h3>Related</h3>
      <ul>
        <li><a href="#">The trouble with Bees</a></li>
        <li><a href="#">The trouble with Otters</a></li>
        <li><a href="#">The trouble with Penguins</a></li>
        <li><a href="#">The trouble with Octopi</a></li>
        <li><a href="#">The trouble with Lemurs</a></li>
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
import Article from './components/Article.vue';


export default {
  components: { Header, Nav, Footer, Comments, Article, Bears },
};
</script>

<!-- <style src="./app.css"></style> -->
