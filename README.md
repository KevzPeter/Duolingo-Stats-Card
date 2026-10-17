<a username="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/KevzPeter/Duolingo-Stats-Card">
    <img src="https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter" alt="Logo">
  </a>

  <h3 align="center">Duolingo Stats Card</h3>

  <p align="center">
    🦉 A real-time, customizable Duolingo widget that you can embed on your website or markdown files ✨
    <br />
    <br />
    <a href="https://duolingo-stats-card.vercel.app/">✨ View Demo</a>
    ·
    <a href="https://github.com/KevzPeter/duolingo-stats-card/issues">🐛 Report Bug</a>
    ·
    <a href="https://github.com/KevzPeter/duolingo-stats-card/issues">💁🏽 Request Feature</a>
  </p>
</div>

<br />

## 🚀 How to add to your page

<br/>

Add the following line to your Github README.md page / website / any markdown file and replace {your-duolingo-username} ⤵️

```html
<img src="https://duolingo-stats-card.vercel.app/api?username={your-duolingo-username}" alt="Duolingo Stats" />
```

Or even this way ⤵️

```mark
![Duolingo Stats](https://duolingo-stats-card.vercel.app/api?username={your-duolingo-username})
```

For example, if your Duolingo username is "John_Smith", add the following line:

```mark
![Duolingo Stats](https://duolingo-stats-card.vercel.app/api?username=John_Smith)
```

Your streak, total XP, current league, and top-three finishes appear beside the avatar
in a 2×2 layout. The joined date sits beneath the avatar.

Want weekly XP, Duolingo scores, hearts, and gems? Deploy your own instance using
the setup below. In the card builder, choose your theme and animation, toggle the
stats you want, then copy the Markdown or HTML.

## 🎨 Themes

Want to spice up the look and feel of your stats card?
You can choose your favorite among 16 different themes!

Simply add the _theme_ parameter to the url like so:

```html
<img src="https://duolingo-stats-card.vercel.app/api?username={your-duolingo-username}&theme={your-theme}" alt="Duolingo Stats" />
```

> [!NOTE]
> If you don't specify a theme, it would be rendered like how it's displayed at the top of this doc!

|                                           |                                                          |                                           |
| :---------------------------------------: | :------------------------------------------------------: | :---------------------------------------: |
|          `light` ![light][light]          |                   `dark` ![dark][dark]                   | `github-dark` ![github-dark][github-dark] |
|       `monokai` ![monokai][monokai]       |          `tokyonight` ![tokyonight][tokyonight]          |     `nightowl` ![nightowl][nightowl]      |
|       `onedark` ![onedark][onedark]       | `shades-of-purple` ![shades-of-purple][shades-of-purple] |       `dracula` ![dracula][dracula]       |
|       `cobalt2` ![cobalt2][cobalt2]       |                    `sky` ![sky][sky]                     |          `beach` ![beach][beach]          |
| `purple-gang` ![purple-gang][purple-gang] |                   `mint` ![mint][mint]                   |          `leafy` ![leafy][leafy]          |

| `jolly` ![jolly][jolly]

[light]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=light
[dark]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=dark
[github-dark]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=github-dark
[monokai]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=monokai
[tokyonight]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=tokyonight
[nightowl]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=nightowl
[onedark]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=onedark
[shades-of-purple]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=shades-of-purple
[dracula]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=dracula
[cobalt2]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=cobalt2
[sky]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=sky
[beach]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=beach
[purple-gang]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=purple-gang
[mint]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=mint
[leafy]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=leafy
[jolly]: https://duolingo-stats-card.vercel.app/api?username=Kevin_Peter&theme=jolly

<!-- BUILT WITH -->

## 🔧 Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Duolingo][Duolingo]][Duolingo-url]

<!--DEPLOYMENT-->

## 🚀 Deploy using Vercel

1. Fork this repository and import your fork into [Vercel](https://vercel.com/).
2. Add these server-only environment variables:
   - `DUOLINGO_JWT`: your Duolingo JWT.
   - `DUOLINGO_USERNAME`: the username belonging to that JWT.
   - `DUOLINGO_TIMEZONE`: optional time zone, such as `America/Los_Angeles`; defaults to `UTC`.
3. Deploy, open your card builder, customize the card, and copy its Markdown. Use your own deployment's URL for owner stats.

### 🔑 Get your Duolingo JWT

Sign in to [Duolingo](https://www.duolingo.com/). Open browser developer tools →
Application (or Storage) → Cookies → `https://www.duolingo.com`, then copy
`jwt_token` into your `DUOLINGO_JWT` setting. Replace it and redeploy when it expires.

> [!IMPORTANT]
> Configuring your token makes all supported owner stats publicly readable, even if hidden on the card.
> Keep the token secret: never commit it or use a `NEXT_PUBLIC_` variable. Token renewal is manual.

### 💻 Run locally

Use Node.js 22+ and pnpm 10.30.3. For owner stats, copy `.env.example` to `.env.local`
and fill in your variables before starting the server. Keep `.env.local` out of commits.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3000](http://localhost:3000). Restart the server after changing environment variables.

<!-- CONTRIBUTING -->

## 🙌🏼 Contributing

If you wanna add your custom theme or suggest enhancements, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Duolingo]: https://img.shields.io/badge/Duolingo-%234DC730.svg?style=for-the-badge&logo=Duolingo&logoColor=white
[Duolingo-url]: https://duolingo.com/
