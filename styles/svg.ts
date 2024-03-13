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
  color: white;
  border: 1.5px solid #21212120;
  padding: 10px 20px 10px 10px;
  gap: 10px;
  border-radius: 10px;
  background: linear-gradient(
    45deg,
    #4776E6,
    #5B68C7,
    #7155B3,
    #8E54E9
  );
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;
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
.stats #streak, .stats #xp{
  display: flex;
  align-items: center;
}
.courses{
  display: flex;
  gap: 40px;
  padding: 10px 10px 0 10px;
  justify-content: center;
}
.language{
  display: flex;
  flex-direction: column;
  font-size: 10px;
  align-items: center;
}
.language #crown-count, .language #xp-count{
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
.crown{
  height:13px;
  width:17px;
  position: relative;
  z-index: 0;
}
.xp{
  height:20px;
  width:20px;
  position: relative;
  z-index: 0;
}
.crown:after {
	content:'';
  top:4px;
  left: 0;
	transform:translateX(100%);
	width:80%;
	height:9px;
	position: absolute;
	z-index:1;
	animation: slide 1.5s infinite ease-in-out;
	 
  /* 
  CSS Gradient - complete browser support from http://www.colorzilla.com/gradient-editor/ 
  */
  background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(128,186,232,0) 99%, rgba(125,185,232,0) 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(255,255,255,0)), color-stop(50%,rgba(255,255,255,0.8)), color-stop(99%,rgba(128,186,232,0)), color-stop(100%,rgba(125,185,232,0))); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* IE10+ */
	background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#007db9e8',GradientType=1 ); /* IE6-9 */
}

/* animation */

@keyframes slide {
	0% {transform:translateX(0%); opacity: 0;}
  50% { opacity: 100%;}
	100% {transform:translateX(20%); opacity: 0;}
}
`;