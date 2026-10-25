const KEY = "9aeb0e6dee04f5fe4e717daae82363d2";
const HOST = "www.convertlime.com";

const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((response) => response.text());
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs → ${response.status}`);
