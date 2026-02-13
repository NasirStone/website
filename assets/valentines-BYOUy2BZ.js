import{u as p,j as e,P as u,M as a,a as y,T as s,G as g,r as f}from"./index-Cq3MVD5_.js";const v="images/valentines/bikestop.webp",b=["images/valentines/bear.webp","images/valentines/yeehaw.webp","images/valentines/art.webp","images/valentines/wine.webp"],w=["Happy Valentine's Day!","I love you so much, and even though we're apart, I had to figure out the strangest way to show my appreication for you","And I love going through photos of you :)"];function x({isLight:i}){const o=f.useMemo(()=>Array.from({length:16}).map((t,r)=>{const n=Math.round(Math.random()*1e3)/10,l=Math.round(Math.random()*1e3)/10,d=10+Math.round(Math.random()*18),m=Math.round(Math.random()*1200)/100,h=10+Math.round(Math.random()*60)/10,c=-8+Math.round(Math.random()*16);return{i:r,left:n,top:l,size:d,delay:m,dur:h,drift:c}}),[]);return e.jsx("div",{"aria-hidden":"true",style:{position:"absolute",inset:0},children:o.map(t=>e.jsx("div",{className:"vHeart",style:{left:`${t.left}%`,top:`${t.top}%`,fontSize:`${t.size}px`,animationDelay:`${t.delay}s`,animationDuration:`${t.dur}s`,transform:`translate(${t.drift}px, 0)`,color:i?"rgba(18,10,12,0.20)":"rgba(255,255,255,0.16)"},children:"♥"},t.i))})}function I(){const i=p(),o=typeof window<"u"&&getComputedStyle(document.documentElement).getPropertyValue("--page-bg").toLowerCase().includes("#f"),t=`
    .valWrap { position: relative; width: 100%; }

    .valHeader {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 0.85rem;
    }

    .valTitle {
      font-family: ${a};
      font-size: 0.92rem;
      opacity: 0.92;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .valSub {
      font-family: ${a};
      font-size: 0.85rem;
      opacity: 0.78;
      text-align: right;
      white-space: nowrap;
    }

    .valGrid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 1rem;
      align-items: start;
    }

    .valHero {
      border: 3px solid var(--panel-border);
      background: var(--panel-bg);
      overflow: hidden;
      border-radius: 0;
      aspect-ratio: 16 / 9;
    }

    .valHero img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .noteBox {
      border: 3px solid var(--panel-border);
      background: var(--panel-bg);
      border-radius: 0;
      padding: 1rem;
    }

    .noteLine {
      font-family: ${a};
      font-size: 0.92rem;
      line-height: 1.6;
      opacity: 0.9;
    }

    .noteLine + .noteLine { margin-top: 0.55rem; }

    .tinyLabel {
      font-family: ${a};
      font-size: 0.78rem;
      opacity: 0.72;
      margin-bottom: 0.55rem;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }

    .vHeart {
      position: absolute;
      animation-name: floatUp;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      user-select: none;
      pointer-events: none;
    }

    @keyframes floatUp {
      0% { transform: translateY(10px); opacity: 0; }
      10% { opacity: 1; }
      60% { opacity: 0.8; }
      100% { transform: translateY(-140px); opacity: 0; }
    }

    .valDivider {
      height: 0;
      border-top: 2px solid var(--shell-border);
      opacity: 0.6;
      margin: 1.15rem 0;
    }

    .valTwoCol {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      align-items: start;
    }

    .valCard {
      border: 3px solid var(--panel-border);
      background: var(--panel-bg);
      border-radius: 0;
      padding: 1rem;
    }

    .valCardTitle {
      font-family: ${a};
      font-size: 0.86rem;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      opacity: 0.85;
      margin-bottom: 0.55rem;
    }

    .valCardBody {
      font-size: 1rem;
      line-height: 1.65;
      opacity: 0.92;
    }

    .asciiHeart {
      font-family: ${a};
      white-space: pre;
      font-size: 0.95rem;
      line-height: 1.15;
      opacity: 0.9;
    }

    @media (max-width: 900px) {
      .valGrid { grid-template-columns: 1fr; }
      .valSub { display: none; }
      .valTwoCol { grid-template-columns: 1fr; }
    }
  `;return e.jsx(u,{title:"Valentines",onBack:()=>i("/"),maxWidth:"1200px",children:e.jsxs("div",{className:"valWrap",children:[e.jsx("style",{children:t}),e.jsx(x,{isLight:o}),e.jsx("div",{className:"valHeader",children:e.jsx("div",{className:"valTitle",children:"Happy Valentines Day, my love!"})}),e.jsxs("div",{className:"valGrid",children:[e.jsx("div",{children:e.jsx("div",{className:"valHero",children:e.jsx("img",{src:y(v),alt:"Valentines hero",loading:"eager",decoding:"async",fetchPriority:"high"})})}),e.jsx("div",{children:e.jsxs("div",{className:"noteBox",children:[w.map((r,n)=>e.jsx("div",{className:"noteLine",children:r},n)),e.jsx("div",{className:"valDivider"}),e.jsx("div",{className:"asciiHeart",children:`  .:::.   .:::.
 :::::::.::::::
 ::::::::::::::
 '::::::::::::'
   '::::::::'
     '::::'
       ':'`})]})})]}),e.jsx("div",{className:"valDivider"}),e.jsx(s,{title:"Some of my favorite memories",header:e.jsx("span",{style:{fontFamily:a}}),style:{borderRadius:0,border:"3px solid var(--panel-border)"},children:e.jsxs("div",{style:{display:"grid",gap:"0.8rem"},children:[e.jsxs("div",{children:["1. I loved going to Build-A-Bear with you this past semester because it brought so much childlike wonder in your eyes, and seeing that was so beautiful. Although I do think the process of stuffing the husk of the bear was interesting, I had so much fun doing it with you. There are so many great photos we took from that time, but this one is my favorite becasue of your big smile, and the unmistakeable light in your eyes",e.jsx("br",{}),e.jsx("br",{}),"2. I think you look so absolutely gorgeous in this photo. I like this time because it was the start of the semester, and I think we were in a very good place then. Not that we are not in a good place now, but think about it: The truck was working perfectly, we were going on a cool new date, and we got Fork & Stix! At last, at least it wasn't on our anniversary ;)",e.jsx("br",{}),e.jsx("br",{}),"3. This photo is simply amazing. The way the leaves hit the sun and form a heart in front of you is just so beautiful. The symmetry of it all! And you! Simply stunning. Always, of course. I love how you never complain when I ask to take your photo. There are millions of moments that I want to capture of you at any time. I wonder why I don't have 1,000,000 photos of you yet...",e.jsx("br",{}),e.jsx("br",{}),`4. Last, but certiantly not least, is one of my all time favorites. The first photo of us! I remember so much and so little from that night, but I remember when that photo was taken and thinking to myself "this is crazy. I was with a beautiful girl (and I think she likes me)." To think that we have done so much in the almost two years we have been together is crazy. Sometimes I wish I could go back in time and be there with you again, but every time I think of you I'm reminded how I felt in that moment.`]}),e.jsx("div",{})]})}),e.jsx("div",{className:"valDivider"}),e.jsx(g,{images:b,columns:2,aspect:"1 / 1"}),e.jsx(s,{title:"Some things I want you to know",style:{borderRadius:0,border:"3px solid var(--panel-border)"},children:e.jsxs("ul",{style:{margin:0,paddingLeft:"1.15rem",lineHeight:1.65},children:[e.jsx("li",{children:"Your letter is coming, and will be printed out for you to read when I see you in person."}),e.jsx("li",{children:"I love you so much, more than you will ever know or comprehend."}),e.jsx("li",{children:"When I see you next, it is going dooooooown."}),e.jsx("li",{children:"I love you! (I did I say that already?)"})]})})]})})}export{I as default};
