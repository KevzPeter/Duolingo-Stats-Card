<a id="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/KevzPeter/Duolingo-Stats-Card">
    <img src="public/svg/Duo_PencilBoarding.svg" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">Duolingo Stats Card</h3>

  <p align="center">
    🦉 Duolingo Stats Card that you can embed in README files ✨
    <br />
    <a href="https://duolingo-stats-card.vercel.app/">✨ View Demo</a>
    ·
    <a href="https://github.com/KevzPeter/duolingo-stats-card/issues">🐛 Report Bug</a>
    ·
    <a href="https://github.com/KevzPeter/duolingo-stats-card/issues">💁🏽 Request Feature</a>
  </p>
</div>

<div align="center">
<img src="https://duolingo-stats-card.vercel.app/api?id=23141883" />
</div>

## ⭐ Add to your README page ⭐
<br/>

Add the following line to your Github README.md page and replace {your-duolingo-id} ⤵️

`<img src="https://duolingo-stats-card.vercel.app/api?id={your-duolingo-id}" alt="Duolingo Stats"/>`
 
 Or even this way ⤵️

`![Duolingo Stats](https://duolingo-stats-card.vercel.app/api?id={your-duolingo-id})`

For example, if your Duolingo id is "23141883", add the following line:

`![Duolingo Stats](https://duolingo-stats-card.vercel.app/api?id=23141883)`
<br/>

## 🎨 THEMES 🎨

Want to spice up the look and feel of your badge showcase?
You can choose your favorite among 15 different themes!

- light (default)
- dark
- github-dark
- monokai
- tokyonight
- nightowl
- onedark
- shades-of-purple
- dracula
- cobalt2
- sky
- beach
- purple-gang
- mint
- leafy

Simply add the *theme* parameter to the url like so:

`<img src="https://duolingo-stats-card.vercel.app/api?id={your-duoling-id}&theme={your-theme}" alt="Duolingo Stats"/>`

<div style="display:grid; grid-template-columns: 1fr 1fr 1fr; justify-items: center;">
  <div style="text-align: center;">
    <h4>light</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=light" title="light" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>dark</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=dark" title="dark" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>github-dark</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=github-dark" title="Github Dark" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>monokai</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=monokai" title="monokai" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>tokyonight</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=tokyonight" title="tokyonight" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>nightowl</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=nightowl" title="nightowl" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>onedark</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=onedark" title="onedark" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>shades-of-purple</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=shades-of-purple" title="shades-of-purple" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>dracula</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=dracula" title="dracula" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>cobalt2</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=cobalt2" title="cobalt2" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>sky</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=sky" title="sky" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>beach</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=beach" title="beach" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>purple-gang</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=purple-gang" title="purple-gang" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>mint</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=mint" title="mint" alt="Duolingo Stats"/>
  </div>
  <div style="text-align: center;">
    <h4>leafy</h4>
    <img src="https://duolingo-stats-card.vercel.app/api?id=23141883&theme=leafy" title="leafy" alt="Duolingo Stats"/>
  </div>
</div>

<br/>

<!-- BUILT WITH -->
## 🔧 Built With 🔧
<br/>

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]

<!-- SET UP -->
## 🏗️ Set Up your own Server 🏗️

* Make sure you have Node.js installed
* Clone the repository
* Run *npm i* in the root directory
* Run *npm run dev* to make sure everything's working fine
* Replace BASEURL in *utils/config.ts* to the deployment url of your choice 
* Deploy to Vercel with the same deployment url
* Head over to https://{your-vercel-deployment-url}/api?id={your-duoling-id} to view the results
* Oh, and make sure to update the links in your README file as well :P

<br/>

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
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
