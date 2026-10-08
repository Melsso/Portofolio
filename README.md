# Portfolio

Source for my personal portfolio site: [sofiane-mallem.netlify.app](https://sofiane-mallem.netlify.app/).

Plain HTML, CSS and a little jQuery, built on Bootstrap 3. The project cards are rendered from a data array into a two-at-a-time carousel, and the contact form sends through EmailJS.

## Run it locally

```bash
npm install
SERVICEID=... TEMPLATEID=... APIKEY=... npm run build   # bundles js/main.js into dist/bundle.js
```

Then open `index.html` in a browser. The three EmailJS values are injected at build time by webpack.

## Adding a project or demo video

Projects live in `js/projects.js`. Add an entry to the `PROJECTS` array. Set `video` to a YouTube, Vimeo, Loom, `.mp4`/`.webm` or GitHub-hosted video URL to show a demo in that project's modal.

## Resume

The "Download resume" button links to `img/Sofiane-Mallem-CV.pdf`. Replace that file to update it.

## Contact

[LinkedIn](https://www.linkedin.com/in/sofiane-mallem-b87302170/) or sofiane.mallem.07@gmail.com