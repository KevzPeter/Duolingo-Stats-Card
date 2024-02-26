<a id="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/KevzPeter/Duolingo-Stats-Card">
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883" alt="Logo">
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
<br />

## ⭐ How to add to your page ⭐
<br/>

Add the following line to your Github README.md page / website / any markdown support file and replace {your-duolingo-id} ⤵️

```html
<img src="https://duolingo-stats-card.vercel.app/api?id={your-duolingo-id}" alt="Duolingo Stats"/>
```
 
Or even this way ⤵️

```mark
![Duolingo Stats](https://duolingo-stats-card.vercel.app/api?id={your-duolingo-id})`
```

For example, if your Duolingo id is "23141883", add the following line:

```mark
![Duolingo Stats](https://duolingo-stats-card.vercel.app/api?id=23141883)
```
<br/>

### 💡 Wait! How do I get my Duolingo id ?

1. Login at [duolingo.com](duolingo.com)
2. Go to Developer Tools in your browser (hit F12 key)
3. Go to Application tab ➡️ Local Storage ➡️ duolingo.com
4. The number that you see here 👇🏽 repeated multiple times is your Duolingo profile id

   <img src="media/devtools.png" alt="Devtools" height="200" width="697">

<br />

  >  The card displays your top 3 languages based on the number of **crowns** you've unlocked. If you'd like to sort it based on the **XP** you've gained, add "sort" parameter like so:
  > ```mark
  > ![Duolingo Stats](https://duolingo-stats-card.vercel.app/api?id=23141883&sort=xp)
  > ```

## 🎨 THEMES 🎨

Want to spice up the look and feel of your stats card?
You can choose your favorite among 15 different themes!

Simply add the *theme* parameter to the url like so:

```html
<img src="https://duolingo-stats-card.vercel.app/api?id={your-duolingo-id}&theme={your-theme}" alt="Duolingo Stats"/>
```

| | | |
| :--: | :--: | :--: |
| `light` ![light][light] | `dark` ![dark][dark] | `github-dark` ![github-dark][github-dark] |
| `monokai` ![monokai][monokai] | `tokyonight` ![tokyonight][tokyonight] | `nightowl` ![nightowl][nightowl] |
| `onedark` ![onedark][onedark] | `shades-of-purple` ![shades-of-purple][shades-of-purple] | `dracula` ![dracula][dracula] |
| `cobalt2` ![cobalt2][cobalt2] | `sky` ![sky][sky] | `beach` ![beach][beach] |
| `purple-gang` ![purple-gang][purple-gang] | `mint` ![mint][mint] | `leafy` ![leafy][leafy] |

[light]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=light
[dark]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=dark
[github-dark]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=github-dark
[monokai]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=monokai
[tokyonight]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=tokyonight
[nightowl]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=nightowl
[onedark]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=onedark
[shades-of-purple]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=shades-of-purple
[dracula]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=dracula
[cobalt2]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=cobalt2
[sky]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=sky
[beach]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=beach
[purple-gang]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=purple-gang
[mint]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=mint
[leafy]: https://duolingo-stats-card.vercel.app/api?id=23141883&theme=leafy


<!-- BUILT WITH -->
## 🔧 Built With 🔧

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Duolingo][Duolingo]][Duolingo-url]
* [![Docker][Docker]][Docker-url]

<!--DEPLOYMENT-->
## 🐋 Deploy using Docker 🐋
- Using docker compose
  * Run `docker compose -f docker-compose.production.yml up -d`
  * Go to http://localhost:3000 to use the app

<!-- CONTRIBUTING -->
## 🙌🏼 Contributing 🙌🏼

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
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
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
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
