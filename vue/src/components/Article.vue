<template>
  <article>
    <h2>The trouble with Bears</h2>
    <p><strong>By Evan Wild</strong></p>

    <p>
      Tall, lumbering, angry, dangerous. The real live bears of this world are
      proud, independent creatures, self-serving and always on the hunt for food.
    </p>

    <h3>Types of bear</h3>
    <table>
      <caption>Comparison of wild and urban bear characteristics</caption>
      <thead>
        <tr>
          <th scope="col">Bear Type</th>
          <th scope="col">Coat</th>
          <th scope="col">Adult size</th>
          <th scope="col">Habitat</th>
          <th scope="col">Lifespan</th>
          <th scope="col">Diet</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Wild</td>
          <td>Brown or black</td>
          <td>1.4 to 2.8 meters</td>
          <td>Woods and forests</td>
          <td>25 to 28 years</td>
          <td>Fish, meat, plants</td>
        </tr>
        <tr>
          <td>Urban</td>
          <td>North Face</td>
          <td>18 to 22</td>
          <td>Condos and coffee shops</td>
          <td>20 to 32 years</td>
          <td>Starbucks, sushi</td>
        </tr>
      </tbody>
    </table>

    <h3>Habitats and Eating habits</h3>
    <p>
      Wild bears eat a variety of meat, fish, fruit, nuts, and other naturally
      growing ingredients...
    </p>
    <img src="/media/wild-bear.jpg" alt="Wild bear in forest" />

    <p>
      Urban (gentrified) bears on the other hand have largely abandoned the old
      ways...
    </p>
    <img src="/media/urban-bear.jpg" alt="Urban bear near buildings" />

    <h3>Mating rituals</h3>
    <p>Bears are romantic creatures by nature...</p>

    <audio controls>
      <source src="/media/bear.mp3" type="audio/mp3" />
      <source src="/media/bear.ogg" type="audio/ogg" />
      <p>Your browser doesn't support HTML5 audio.</p>
    </audio>

    <details>
      <summary>Transcript</summary>
      <p class="transcript">Transcript: This is an audio about bears.</p>
    </details>

    <aside>
      <h3>About the author</h3>
      <p>Evan Wild is an unemployed plumber from Doncaster...</p>
    </aside>

    <!-- Platzhalter-Komponenten -->
    <Comments />
    <Bears />
  </article>
</template>

<script lang="ts">
import Comments from './Comments.vue';
import Bears from './Bears.vue';

export default {
  components: { Comments, Bears },
};
</script>

<style scoped>
img, audio {
  display: block;
  margin: 0 auto;
}
audio {
  width: 500px;
}
table {
  width: 100%;
  background-color: #dde;
  border-collapse: collapse;
  margin-bottom: 2rem;
}
th, td {
  padding: 10px;
  text-align: center;
}
th[scope="col"] {
  border-bottom: 1px solid black;
}
tbody tr:nth-child(odd) {
  background-color: #dde;
}
.transcript {
  font-style: italic;
}
</style>
