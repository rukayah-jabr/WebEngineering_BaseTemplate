
const baseUrl = "https://en.wikipedia.org/w/api.php";
const title = "List_of_ursids";

//images
const checkImage = async (url) => {
    try {
        const res = await fetch(url, { method: "HEAD" });
        return res.ok ? url : "media/placeholder.jpg";
    } catch {
        return "media/placeholder.jpg";
    }
};

const fetchImageUrl = async (fileName) => {
    try {
        const imageParams = {
            action: "query",
            titles: "File:" + fileName,
            prop: "imageinfo",
            iiprop: "url",
            format: "json",
            origin: "*",
        };

        const url = baseUrl + "?" + new URLSearchParams(imageParams).toString();
        const res = await fetch(url);
        const data = await res.json();
        const page = Object.values(data.query.pages)[0];
        const imageUrl = page.imageinfo?.[0]?.url;
        return imageUrl ? await checkImage(imageUrl) : "media/placeholder.jpg";
    } catch (err) {
        console.error("Error fetching image:", err);
        return "media/placeholder.jpg";
    }
};


const extractBears = async (wikitext) => {
    const speciesTables = wikitext.split('{{Species table/end}}');
    const bears = [];

    for (const table of speciesTables) {
        const rows = table.split('{{Species table/row');
        for (const row of rows) {
            const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);

            const binomialMatch = row.match(/\|binomial=(.*?)\n/);
            const imageMatch = row.match(/\|image=(.*?)\n/);

            if (nameMatch && binomialMatch && imageMatch) {
                const fileName = imageMatch[1].trim().replace('File:', '');
                const imageUrl = await fetchImageUrl(fileName);

                bears.push({
                    name: nameMatch[1],
                    binomial: binomialMatch[1],
                    image: imageUrl,
                    range: "TODO extract correct range"
                });
            }
        }
    }

    const moreBears = document.querySelector('.more_bears');
    if (!moreBears) return;

    moreBears.innerHTML = "";
    bears.forEach((bear) => {
        moreBears.innerHTML += `
        <div class="bear">
          <img src="${bear.image}" alt="Image of ${bear.name}" style="width:200px; height:auto;">
          <p><b>${bear.name}</b> (${bear.binomial})</p>
          <p>Range: ${bear.range}</p>
        </div>
      `;
    });
};

export const bearFetcher = async () => {
    try {
        const params = {
            action: "parse",
            page: title,
            prop: "wikitext",
            section: 3,
            format: "json",
            origin: "*"
        };

        const url = baseUrl + "?" + new URLSearchParams(params).toString();
        const res = await fetch(url);
        const data = await res.json();
        await extractBears(data.parse.wikitext["*"]);

    } catch (err) {
        console.error("Error fetching bears:", err);
    }

};
