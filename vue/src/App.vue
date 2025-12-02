<template>
  <AppHeader />
  <MainNav />
  <main>
    <BlogArticle />
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
  <AppFooter />
</template>

<script lang="ts">
import AppHeader from './components/AppHeader.vue';
import MainNav from './components/MainNav.vue';
import AppFooter from './components/AppFooter.vue';
import BlogArticle from './components/BlogArticle.vue';

export default {
  components: {
    AppHeader,
    MainNav,
    AppFooter,
    BlogArticle,
  },
};
</script>

<!-- <style src="./app.css"></style> -->
