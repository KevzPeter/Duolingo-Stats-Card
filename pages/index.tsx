import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.scss'
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { THEME_NAMES } from '../utils/config';

const Home: NextPage = () => {
  let [loading, setLoading] = useState(false);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };
  const router = useRouter();
  const themes = THEME_NAMES;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let id = e.target.id.value;
    let theme = e.target.theme.value;

    if (id) {
      let href = `/api?id=${id}`
      if (theme)
        href += `&theme=${theme}`
      router.push(href)
        .then(() => setLoading(false))
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
    else setLoading(false);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>🦉 Duolingo Stats Card</title>
        <meta name="description" content="Duolingo stats card for your Github readme page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <form className={styles.form} onSubmit={e => handleSubmit(e)}>
          <label htmlFor="id">🧑🏽 User ID</label>
          <input id="id" name="id" type="text"></input>
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
  )
}

export default Home
