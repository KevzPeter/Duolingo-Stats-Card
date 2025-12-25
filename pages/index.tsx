import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from "react";
import { THEME_NAMES } from '../utils/config';
import { Analytics } from '@vercel/analytics/next';
import themes from '../utils/themes.json';

const Home: NextPage = () => {
  const [username, setUsername] = useState('Kevin_Peter');
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [imageUrl, setImageUrl] = useState('');
  const [markdownCode, setMarkdownCode] = useState('');
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const themeNames = ['default', ...THEME_NAMES];

  const renderPreviewContent = () => {
    if (!username) {
      return (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>🦉</div>
          <p>Enter your username above to see your stats card!</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading your stats...</p>
        </div>
      );
    }

    return (
      <img
        src={imageUrl}
        alt="Duolingo Stats"
        className={styles.statsImage}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setImageError(true);
        }}
        style={{ display: imageError ? 'none' : 'block' }}
      />
    );
  };

  useEffect(() => {
    if (!username) {
      setImageUrl('');
      setMarkdownCode('');
      return;
    }

    setIsLoading(true);
    setImageError(false);

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    let url = `${baseUrl}/api?username=${encodeURIComponent(username)}`;
    if (selectedTheme !== 'default') {
      url += `&theme=${encodeURIComponent(selectedTheme)}`;
    }
    setImageUrl(url);
    setMarkdownCode(`![Duolingo Stats](${url})`);

    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [username, selectedTheme]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <Head>
          <title>🦉 Duolingo Stats Card</title>
          <meta name="description" content="Duolingo stats card for your Github readme page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.mainContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              <span className={styles.titleEmoji}>✨</span>Duolingo Stats Card<span className={styles.titleEmoji}>✨</span>
            </h1>
            <p className={styles.subtitle}>
              A real-time, customizable Duolingo widget that you can embed on your website or markdown files
            </p>
          </div>

          <div className={styles.contentGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>👤</span>
                  <h2 className={styles.cardTitleUsername}>Username</h2>
                </div>
                <input
                  className={styles.usernameInput}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your Duolingo username"
                />
                <div className={styles.hint}>
                  💡 Find your username at duolingo.com/profile
                </div>
              </div>

              {/* Theme Card */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>🎨</span>
                  <h2 className={styles.cardTitle}>Choose Your Style</h2>
                </div>
                <button
                  className={styles.themeSelector}
                  onClick={() => setShowThemes(!showThemes)}
                >
                  <span className={styles.currentTheme}>
                    {selectedTheme === 'default' ? 'Default Theme' : selectedTheme}
                  </span>
                  <span className={styles.dropdownArrow}>{showThemes ? '▲' : '▼'}</span>
                </button>
                {showThemes && (
                  <div className={styles.themeDropdown}>
                    {themeNames.map((themeName) => {
                      const themeColors = themes[themeName as keyof typeof themes];
                      const backgroundColor = themeColors?.background || '#ffffff';
                      const isSelected = selectedTheme === themeName;

                      return (
                        <button
                          key={themeName}
                          className={`${styles.themeOption} ${isSelected ? styles.themeOptionSelected : ''}`}
                          onClick={() => {
                            setSelectedTheme(themeName);
                            setShowThemes(false);
                          }}
                        >
                          <div
                            className={styles.themeColorPreview}
                            style={{ background: backgroundColor }}
                          />
                          <span className={styles.themeName}>
                            {themeName === 'default' ? 'Default' : themeName}
                          </span>
                          {isSelected && <span className={styles.selectedCheck}>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div className={`${styles.card} ${styles.previewCard}`}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>💫 Preview</h2>
                </div>
                <div className={styles.previewArea}>
                  {renderPreviewContent()}
                  {imageError && (
                    <div className={styles.errorState}>
                      <div className={styles.errorIcon}>⚠️</div>
                      <p>Could not load stats for this username</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Code Section */}
              <div className={`${styles.card} ${styles.codeCard}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>📝</span>
                  <h3 className={styles.cardTitle}>Markdown Code</h3>
                </div>
                <div className={styles.codeBox}>
                  <code className={styles.codeText}>{markdownCode}</code>
                  <button
                    className={`${styles.copyButton} ${copiedMarkdown ? styles.copied : ''}`}
                    onClick={() => handleCopy(markdownCode)}
                    disabled={!markdownCode}
                  >
                    {copiedMarkdown ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Analytics />
    </>
  )
}

export default Home
