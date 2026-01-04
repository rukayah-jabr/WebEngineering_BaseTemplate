const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

const WIKI_API = "https://en.wikipedia.org/w/api.php";
const PAGE = "List_of_ursids";


async function checkImage(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok ? url : "media/placeholder.jpg";
  } catch {
    return "media/placeholder.jpg";
  }
}

async function fetchImageUrl(fileName) {
  try {
    const params = new URLSearchParams({
      action: "query",
      titles: "File:" + fileName,
      prop: "imageinfo",
      iiprop: "url",
      format: "json",
      origin: "*"
    });

    const res = await fetch(`${WIKI_API}?${params}`);
    const data = await res.json();

    const page = Object.values(data.query.pages)[0];
    const imageUrl = page?.imageinfo?.[0]?.url;

    //return imageUrl ? await checkImage(imageUrl) : "media/placeholder.jpg";
    return imageUrl || "media/placeholder.jpg";
} catch {
    return "media/placeholder.jpg";
  }
}

async function extractBears(wikitext) {
  const speciesTables = wikitext.split("{{Species table/end}}");
  const result = [];

  for (const table of speciesTables) {
    const rows = table.split("{{Species table/row");

    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)\n/);

      if (!nameMatch || !binomialMatch || !imageMatch) continue;

      const fileName = imageMatch[1].trim().replace("File:", "");
      const imageUrl = await fetchImageUrl(fileName);

      result.push({
        name: nameMatch[1],
        binomial: binomialMatch[1],
        image: imageUrl,
        range: rangeMatch ? rangeMatch[1] : "Unknown"
      });
    }
  }

  return result;
}

// API route

app.get("/api/bears", async (req, res) => {
  try {
    const params = new URLSearchParams({
      action: "parse",
      page: PAGE,
      prop: "wikitext",
      section: "3",
      format: "json",
      origin: "*"
    });

    const wikiRes = await fetch(`${WIKI_API}?${params}`);
    const data = await wikiRes.json();

    const bears = await extractBears(data.parse.wikitext["*"]);
    res.json(bears);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bears" });
  }
});

app.listen(4000, () =>
  console.log("Backend running at http://localhost:4000")
);
