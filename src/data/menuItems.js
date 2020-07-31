import { faWordpress, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faEdit, faHashtag } from '@fortawesome/free-solid-svg-icons';

export default [
  {
    type: 'talk',
    id: 'blogLink',
    textLocaleKey: 'menu.blog',
    external: true,
    link: 'https://blog.nwo-uncensored.com',
    icon: faWordpress,
  },
  {
    type: 'talk',
    id: 'forumLink',
    textLocaleKey: 'menu.forum',
    external: true,
    link: 'https://forum.nwo-uncensored.com',
    icon: faEdit,
  },
  {
    type: 'talk',
    id: 'discordLink',
    textLocaleKey: 'menu.discord',
    external: true,
    link: 'https://discord.gg/SJrtYnY',
    icon: faDiscord,
  },
  {
    type: 'page',
    id: 'trackerLink',
    textLocaleKey: 'menu.tracker',
    external: false,
    link: 'devtracker',
    icon: faHashtag,
  },
];
