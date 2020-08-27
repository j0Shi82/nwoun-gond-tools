import pweLogo from 'assets/media/images/arclogo.png';
import pcLogo from 'assets/media/images/Windows_logo_-_2012_derivative.svg.png';
import xboxLogo from 'assets/media/images/Xbox_one_logo.svg.png';
import ps4Logo from 'assets/media/images/ps4-logos-scee-blue.png';
import redditLogo from 'assets/media/images/reddit_icon.png';
import faSearch from 'assets/media/fontawesome/search.svg';
import faComment from 'assets/media/fontawesome/comment.svg';
import faBookMedical from 'assets/media/fontawesome/book-medical.svg';
import faNewspaper from 'assets/media/fontawesome/newspaper.svg';

const logos = {
  pwe: pweLogo,
  arcgamesforum: pweLogo,
  nwreddit: redditLogo,
  pc: pcLogo,
  xbox: xboxLogo,
  ps4: ps4Logo,
  mop: 'https://massivelyop.com/wp-content/uploads/2015/03/150mo.png',
  mmobomb: 'https://www.anook.com/uploads/profiles/big/50f9aa07f1be6.png',
  bleedingcool: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAZlBMVEUAAAD///8BAQH8/PwDAwNISEgaGhpOTk4MDAxtbW2np6eZmZmhoaGBgYHm5ub4+PjNzc0/Pz+Ojo7V1dXd3d2tra0yMjJ0dHR8fHxUVFQ6OjrExMS0tLRcXFzv7+8fHx8TExMnJyc2lRAPAAAAt0lEQVQYlSWQRxbDIAxER2C6cQP3mCT3v2QE0Urva1RGEAItBLrun1kXQh9Vx6gV1UAckpYlXaiam0Y5qp5u/aJQJe7m8lRoBh4K3BdzptEnWln/0AXMl6NyLSQ3JuvKYHfcw2NLnrS5geP4xugbok0PB/YAC0M0qLf66BJwJgY78QK+NN4Kn2KAk+TgjNGZJiBKBbzaYJPI10tkik8/lTE/3r+rTXsu/WGttmKbq+/mumtfEEL8AHXkCOJ2NNrTAAAAAElFTkSuQmCC',
  mmorpg: 'https://imgur.com/73lKT87.png',
  destructoid: 'https://www.destructoid.com/sites/_default/img/top-nav/destructoid-logo.png',
  mp1st: 'https://mp1st.com/wp-content/themes/Phoenix/images/favicon.ico?v=20171015',
  xboxhub: 'https://www.thexboxhub.com/wp-content/uploads/2014/07/new-txh-logo-500-360x360.png',
  flickmyth: 'https://www.flickeringmyth.com/wp-content/themes/news-pro/images/favicon.ico',
  hcgamer: 'https://hardcoregamer.com/wp-content/themes/hardcore-gamer-theme/favicon.png',
  nerdstash: 'https://tnsmedialibrary.s3-accelerate.amazonaws.com/2015/02/favicon.ico',
  mmominds: 'https://nw.mmominds.com/favicon.ico',
  occarticle: 'https://www.overclockersclub.com/favicon.ico',
  occguide: 'https://www.overclockersclub.com/favicon.ico',
  jannew: 'https://jannenw.info/favicon.ico',
  nwthoughts: 'http://neverwinterthoughts.blogspot.com/favicon.ico',
};

const sections = [
  {
    type: 'filter',
    icon: faSearch,
    id: 'filter',
    count: 20,
  },
  {
    type: 'news',
    icon: pweLogo,
    id: 'news',
    count: 10,
  },
  {
    type: 'cat',
    icon: faNewspaper,
    id: 'mmonews',
    count: 14,
  },
  {
    type: 'cat',
    icon: faBookMedical,
    id: 'guides',
    count: 10,
  },
  {
    type: 'cat',
    icon: faComment,
    id: 'discussions',
    count: 30,
  },
];

export { logos, sections };
