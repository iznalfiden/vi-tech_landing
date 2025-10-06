/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://your-domain.com',
    generateRobotsTxt: true,
    // для простых двух локалей: EN (root) и RU (/ru)
    alternateRefs: [
      { href: 'https://your-domain.com', hrefLang: 'en' },
      { href: 'https://your-domain.com/ru', hrefLang: 'ru' },
    ],
    transform: async (config, path) => {
      // зеркалим для /ru:
      const isRu = path.startsWith('/ru');
      const enLoc = isRu ? path.replace(/^\/ru/, '') || '/' : path;
      const ruLoc = isRu ? path : (path === '/' ? '/ru' : `/ru${path}`);
  
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        alternateRefs: [
          { href: `${config.siteUrl}${enLoc}`, hrefLang: 'en' },
          { href: `${config.siteUrl}${ruLoc}`, hrefLang: 'ru' },
          { href: `${config.siteUrl}${enLoc}`, hrefLang: 'x-default' },
        ],
      };
    },
  };