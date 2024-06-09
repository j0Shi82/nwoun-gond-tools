const axios = require("axios");
const fs = require("fs");
const path = require("path");

const instance = axios.create({
    timeout: 5000,
});

instance
    .get("https://api.uncnso.red/v1/articles/discussiontags")
    .then((response) => {
        const urls = [
            ...[
                "https://www.gond.tools",
                "https://www.gond.tools/#/devtracker",
                // 'https://www.gond.tools/#/auction',
                // 'https://www.gond.tools/#/support',
            ],
            //   ...response.data.map((tag) => `https://www.gond.tools/#/articles/${tag.term.replace(/[^0-9a-zA-Z\s]/g, '').replace(/\s/g, '-').toLowerCase()}`),
        ];
        fs.writeFileSync(
            path.resolve("public", "sitemap.txt"),
            urls.join("\r\n"),
        );
    })
    .catch((e) => {
        console.log(e);
    })
    .finally(() => {});
// filter((tag) => parseInt(tag.id, 10) === parseInt(tags[0], 10))[0].term.replace(/[^0-9a-zA-Z\s]/g, '').replace(/\s/g, '-').toLowerCase()
