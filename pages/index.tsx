import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.scss'
import { CSSProperties } from "react";
import { THEME_NAMES } from '../utils/config';
import { Analytics } from '@vercel/analytics/next';

const Home: NextPage = () => {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };
  const router = useRouter();
  const themes = THEME_NAMES;
  themes.unshift("default")

  const handleSubmit = (e) => {
    e.preventDefault();

    let username = e.target.username.value;
    let theme = e.target.theme.value;
    let stats = e.target.stats.value;

    if (username) {
      let href = `/api?username=${username}`
      if (theme !== 'default')
        href += `&theme=${theme}`
      if (stats === 'xp')
        href += `&sort=xp`
      router.push(href);
    }
  }
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>🦉 Duolingo Stats Card</title>
          <meta name="description" content="Duolingo stats card for your Github readme page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.container}>
          <form className={styles.form} onSubmit={e => handleSubmit(e)}>
            <label htmlFor="username">🧑🏽 Username</label>
            <input id="username" name="username" type="text"></input>
            <label htmlFor="theme">🎨 Theme</label>
            <select name='theme'>
              {themes.map((theme, index) => {
                return <option key={index} value={theme}>{theme}</option>
              })}
            </select>
            <label htmlFor="stats">⚙️ Stats</label>
            <select name='stats'>
              <option value="xp">XP</option>
              <option value="crowns">Crowns</option>
            </select>
            <button className={styles.btn} type="submit">Submit</button>
          </form>
          <p>Check out the <a href="https://github.com/KevzPeter/Duolingo-Stats-Card">Github Page</a> for more info!</p>
        </main>
      </div>
      <Analytics />
    </>
  )
}

export default Home
