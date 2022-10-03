export default {
  en: {
    support: '/support',
    devtracker: '/devtracker',
    infohub: {
      matcher: /(^\/$)|(^\/articles\/([0-9-a-zA-Z]+))/,
      routes: [
        '/',
        '/articles/:url',
      ],
    },
    auction: '/auction',
  },
};
