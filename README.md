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

## 🎨 Themes

Want to spice up the look and feel of your stats card?
You can choose your favorite among 15 different themes!

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

### Getting your Duolingo ID

1. Login at [duolingo.com](duolingo.com)
2. Go to Developer Tools in your browser (hit F12 key)
3. Go to Application tab ➡️ Local Storage ➡️ duolingo.com
4. The number that you see here 👇🏽 repeated multiple times is your Duolingo profile id

   <img src="media/devtools.png" alt="Devtools" height="200" width="697">

<br />

<!-- BUILT WITH -->

## 🔧 Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Duolingo][Duolingo]][Duolingo-url]
- [![Docker][Docker]][Docker-url]

<!--DEPLOYMENT-->

## 🐋 Deploy using Docker

- Using docker compose
  - Run `docker compose -f docker-compose.production.yml up -d`
  - Go to http://localhost:3000 to use the app

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

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://docker.com/
[Duolingo]: https://img.shields.io/badge/Duolingo-%234DC730.svg?style=for-the-badge&logo=Duolingo&logoColor=white
[Duolingo-url]: https://duolingo.com/
