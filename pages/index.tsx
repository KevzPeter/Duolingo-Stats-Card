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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const usernameInput = form.elements.namedItem('username') as HTMLInputElement | null;
    const themeInput = form.elements.namedItem('theme') as HTMLSelectElement | null;

    const username = usernameInput?.value.trim() ?? '';
    const theme = themeInput?.value ?? 'default';

    if (username) {
      let href = `/api?username=${encodeURIComponent(username)}`;
      if (theme !== 'default') href += `&theme=${encodeURIComponent(theme)}`;
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
