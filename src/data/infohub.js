import pweLogo from 'assets/media/images/arclogo.png';
import pcLogo from 'assets/media/images/Windows_logo_-_2012_derivative.svg.png';
import xboxLogo from 'assets/media/images/Xbox_one_logo.svg.png';
import ps4Logo from 'assets/media/images/ps4-logos-scee-blue.png';
import redditLogo from 'assets/media/images/reddit_icon.png';
import twitchLogo from 'assets/media/icons/TwitchGlitchPurple.svg';
import rainerLogo from 'assets/media/icons/rainer_64.png';
import faSearch from 'assets/media/fontawesome/search.svg';
import faComment from 'assets/media/fontawesome/comment.svg';
import faBookMedical from 'assets/media/fontawesome/book-medical.svg';
import faNewspaper from 'assets/media/fontawesome/newspaper.svg';
import faVideo from 'assets/media/fontawesome/video.svg';

const logos = {
  pwe: pweLogo,
  arcgamesforum: pweLogo,
  nwreddit: redditLogo,
  arcgamespc: pcLogo,
  arcgamesxbox: xboxLogo,
  arcgamesps4: ps4Logo,
  mop: 'https://massivelyop.com/wp-content/uploads/2015/03/150mo.png',
  mmobomb: 'https://www.mmobomb.com/favicon/safari-pinned-tab.svg',
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
  nwthoughts: 'https://neverwinterthoughts.blogspot.com/favicon.ico',
  youtube: 'https://www.youtube.com/favicon.ico',
  razer: 'https://hybrismedianonprods1.blob.core.windows.net/sys-master-phoenix-images-container/h6c/h6b/9559620911134/razer-ths-logo.svg',
  cloakalliance: 'https://s3.amazonaws.com/files.enjin.com/452103/site_logo/avatar.png',
  screenrant: 'https://screenrant.com/public/build/images/favicon-96x96.6841d3db.png',
  igc: 'https://i1.wp.com/invisioncommunity.co.uk/wp-content/uploads/2020/01/cropped-igc-site-icon-1.png',
  gamepur: 'https://www.gamepur.com/wp-content/uploads/2020/01/cropped-gamepur_favicon-1-150x150.png',
  gamerant: 'https://gamerant.com/public/build/images/favicon-48x48.dd8046e7.png',
  anjicat: 'https://anjicatsneverwinternotes.files.wordpress.com/2022/06/wp-1656609241894.jpg',
  mmohaven: 'https://mmohaven.com/wp-content/uploads/elementor/thumbs/cropped-icon-p8u9nqrhnas4ztgpd3i1o7dh5tiyrln731nyz811o0.png',
  pcgamesn: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/avatars/user-6.png',
  twitch: twitchLogo,
  nwhub: rainerLogo,
  mmogg: 'https://mmorpg.gg/wp-content/uploads/2021/09/cropped-MMORPG-Dragon-Logo-32x32.png',
  mmotips: 'https://www.mmorpgtips.com/wp-content/uploads/2020/01/cropped-online-logo-creator-for-gaming-featuring-a-samurai-panda-2755r-1-32x32.png',
};

const sections = [
  {
    type: 'filter',
    icon: faSearch,
    id: 'filter',
  },
  {
    type: 'articles',
    icon: pweLogo,
    id: 'official',
  },
  {
    type: 'articles',
    icon: faNewspaper,
    id: 'news',
  },
  {
    type: 'articles',
    icon: faBookMedical,
    id: 'guides',
  },
  {
    type: 'articles',
    icon: faComment,
    id: 'discussion',
  },
  {
    type: 'articles',
    icon: faVideo,
    id: 'media',
  },
];

export { logos, sections };
