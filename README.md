# Medium.com Link Crawler

The crawler goes through medium.com homepage and collects all the links within medium.com, goes through each link and recursively fetches more links.

By default settings, it goes 2 levels deep for link fetching and 5 concurrent requests. To edit these defaults, go to: `/crawl.js` and update the constants `RECURSIVE_FETCH_LIMIT` and `CONCURRENT_REQUEST_LIMIT`.

---

To setup the project on your machine, follow these steps:

- clone the repository : `git clone https://github.com/skyshader/medium-links-collector.git`
- run `npm i` inside project directory
- run `npm start` to run the project

Simple as that!
