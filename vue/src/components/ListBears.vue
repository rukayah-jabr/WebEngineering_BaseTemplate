<template>
  <section class="more_bears">
    <h3>More Bears</h3>
    <div v-for="bear in bears" :key="bear.name" class="bear">
      <img
        :src="bear.image"
        :alt="'Image of ' + bear.name"
        style="width: 200px; height: auto"
      />
      <p>
        <b>{{ bear.name }}</b> ({{ bear.binomial }})
      </p>
      <p>Range: {{ bear.range }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

export default {
  setup() {
    const bears = ref<Bear[]>([]);
    

    const fetchBears = async () => { 
      try { 
        const res = await fetch("http://localhost:4000/api/bears"); 
       
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          bears.value = data;
        } else {
          console.error("Unexpected response:", data);
        }
      } catch (err) {
        console.error("Error fetching bears:", err);
      }
    };

    onMounted(fetchBears); 

    return { bears };
  },
};
</script>
