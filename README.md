# Portfolio

Source for my personal portfolio site: [sofiane-mallem.netlify.app](https://sofiane-mallem.netlify.app/).

Plain HTML, CSS and JavaScript, using Bootstrap 3's stylesheet for the grid. There is no build step. The projects are rendered from a data array into a carousel (two at a time, one on mobile) with a detail modal per project, and the contact form sends through EmailJS.

## Run it locally

Open `index.html` in a browser, or serve the folder with `python3 -m http.server`.

## Contact form

The form uses EmailJS. Set `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID` and `EMAILJS_TEMPLATE_ID` at the top of `js/main.js`. They are public by design, so restrict the account in the EmailJS dashboard (allowed origins, rate limits).

## Adding a project or demo video

Projects live in `js/projects.js`. Add an entry to the `PROJECTS` array. Set `video` to an unlisted YouTube link or to a small `.mp4` in this repo (e.g. `videos/lad-demo.mp4`) to show a demo in that project's modal. GitHub issue-attachment links only play on github.com, so don't use them here.

## Resume

The "Download resume" button links to `img/Sofiane-Mallem-CV.pdf`. Replace that file to update it.

## Contact

[LinkedIn](https://www.linkedin.com/in/sofiane-mallem-b87302170/) or sofiane.mallem.07@gmail.com