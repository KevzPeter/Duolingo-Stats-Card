import css from 'styled-jsx/css';

export const allStyles = css.global`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: 500;
}
.card{
  display: grid;
  grid-template-columns: 3fr 1fr;
  border: 1.5px solid #21212120;
  padding: 10px 20px 10px 10px;
  border-radius: 10px;
  // background: linear-gradient(
  //   45deg,
  //   #4776E6,
  //   #5B68C7,
  //   #7155B3,
  //   #8E54E9
  // );
  // background-size: 200% 200%;
  // animation: gradient-animation 4s ease infinite;
}
.content{
  display: grid;
}
.stats{
  display: flex;
  flex-direction: column;
  font-size: 25px;
  font-weight: bold;
}
.stats #xp{
  // color: #58CC02;
  margin-left: 5px;
}
.stats #streak{
  display: flex;
  align-items: center;
}
.courses{
  display: flex;
  gap: 40px;
  padding: 10px 10px 0 10px;
}
.language{
  display: flex;
  flex-direction: column;
  font-size: 10px;
  align-items: center;
}
.language #crown-count{
  font-weight: bold;
}
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
`;