<template>
  <section class="more_bears">
    <h3>More Bears</h3>
    <div v-for="bear in bears" :key="bear.name" class="bear">
      <img :src="bear.image" :alt="'Image of ' + bear.name" style="width:200px; height:auto;">
      <p><b>{{ bear.name }}</b> ({{ bear.binomial }})</p>
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
    const baseUrl = 'https://en.wikipedia.org/w/api.php';
    const title = 'List_of_ursids';

    const checkImage = async (url: string): Promise<string> => {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        return res.ok ? url : 'media/placeholder.jpg';
      } catch {
        return 'media/placeholder.jpg';
      }
    };

    const fetchImageUrl = async (fileName: string): Promise<string> => {
      try {
        const params = new URLSearchParams({
          action: 'query',
          titles: 'File:' + fileName,
          prop: 'imageinfo',
          iiprop: 'url',
          format: 'json',
          origin: '*',
        });
        const res = await fetch(`${baseUrl}?${params.toString()}`);
        const data = await res.json();
        const page = Object.values(data.query.pages)[0] as any;
        const imageUrl = page.imageinfo?.[0]?.url;
        return imageUrl ? await checkImage(imageUrl) : 'media/placeholder.jpg';
      } catch {
        return 'media/placeholder.jpg';
      }
    };

    const extractBears = async (wikitext: string) => {
      const speciesTables = wikitext.split('{{Species table/end}}');
      const result: Bear[] = [];

      for (const table of speciesTables) {
        const rows = table.split('{{Species table/row');
        for (const row of rows) {
          const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
          const binomialMatch = row.match(/\|binomial=(.*?)\n/);
          const imageMatch = row.match(/\|image=(.*?)\n/);
          if (nameMatch && binomialMatch && imageMatch) {
            const fileName = imageMatch[1].trim().replace('File:', '');
            const imageUrl = await fetchImageUrl(fileName);
            result.push({ name: nameMatch[1], binomial: binomialMatch[1], image: imageUrl, range: 'TODO extract correct range' });
          }
        }
      }

      bears.value = result;
    };

    const fetchBears = async () => {
      try {
        const params = new URLSearchParams({
          action: 'parse',
          page: title,
          prop: 'wikitext',
          section: '3',
          format: 'json',
          origin: '*',
        });
        const res = await fetch(`${baseUrl}?${params.toString()}`);
        const data = await res.json();
        await extractBears(data.parse.wikitext['*']);
      } catch (err) {
        console.error('Error fetching bears:', err);
      }
    };

    onMounted(() => {
      fetchBears();
    });

    return { bears };
  }
};
</script>
