# Federico Garaffi Photography — v1

## Run it
Open `index.html` in a browser. For the smoothest local testing, run a tiny local server in this folder, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Replace the demo photos
In `index.html`, replace each `https://images.unsplash.com/...` image URL with your own file path, for example:

```html
<img src="photos/red-building.jpg" alt="Red building in Turin" />
```

Create a `photos` folder beside `index.html` and drop your exported JPG/WebP files there.

## Before publishing
- Replace `hello@example.com` with your email.
- Replace the `#` links for Unsplash and Instagram.
- Replace the temporary About text if desired.
- Export web images around 2000–2600px on the long edge and use WebP/AVIF where possible.

## Libraries
- GSAP + ScrollTrigger for animation.
- Lenis for smooth scrolling.
