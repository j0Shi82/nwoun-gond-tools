import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  /* faEdit, */faHashtag, faInfoCircle, faHeartCirclePlus, faGavel, faCoffee,
} from '@fortawesome/free-solid-svg-icons';

// const branded = [
//   {
//     type: 'talk',
//     id: 'blogLink',
//     textLocaleKey: 'menu.blog',
//     external: true,
//     link: 'https://blog.nwo-uncensored.com',
//     icon: faWordpress,
//   },
//   // {
//   //   type: 'talk',
//   //   id: 'forumLink',
//   //   textLocaleKey: 'menu.forum',
//   //   external: true,
//   //   link: 'https://forum.nwo-uncensored.com',
//   //   icon: faEdit,
//   // },
//   {
//     type: 'talk',
//     id: 'discordLink',
//     textLocaleKey: 'menu.discord',
//     external: true,
//     link: 'https://discord.gg/SJrtYnY',
//     icon: faDiscord,
//   }
// ]

export default [
  {
    type: 'talk',
    id: 'repoLink',
    textLocaleKey: 'menu.repo',
    external: true,
    link: 'https://github.com/j0Shi82/nwoun-gond-tools',
    icon: faGithub,
  },
  {
    type: 'talk',
    id: 'buyLink',
    textLocaleKey: 'menu.buy',
    external: false,
    link: 'support',
    icon: faHeartCirclePlus,
  },
  {
    type: 'page',
    id: 'infohubLink',
    textLocaleKey: 'menu.infohub',
    external: false,
    link: 'infohub',
    icon: faInfoCircle,
  },
  {
    type: 'page',
    id: 'trackerLink',
    textLocaleKey: 'menu.tracker',
    external: false,
    link: 'devtracker',
    icon: faHashtag,
  },
  {
    type: 'page',
    id: 'auctionLink',
    textLocaleKey: 'menu.auction',
    external: false,
    link: 'auction',
    icon: faGavel,
  },
  // {
  //   type: 'page',
  //   id: 'aboutLink',
  //   textLocaleKey: 'menu.about',
  //   external: false,
  //   link: 'about',
  //   icon: faQuestionCircle,
  // },
];
