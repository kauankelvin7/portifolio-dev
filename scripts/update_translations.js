const fs = require('fs');
const path = require('path');

const locales = ['pt', 'en', 'es', 'fr', 'zh'];

const newKeys = {
  pt: {
    hero: {
      cta_primary: 'VER PROJETOS',
      cta_secondary: 'BAIXAR CV'
    }
  },
  en: {
    hero: {
      cta_primary: 'VIEW PROJECTS',
      cta_secondary: 'DOWNLOAD CV'
    }
  },
  es: {
    hero: {
      cta_primary: 'VER PROYECTOS',
      cta_secondary: 'DESCARGAR CV'
    }
  },
  fr: {
    hero: {
      cta_primary: 'VOIR PROJETS',
      cta_secondary: 'TÉLÉCHARGER CV'
    }
  },
  zh: {
    hero: {
      cta_primary: '查看项目',
      cta_secondary: '下载简历'
    }
  }
};

locales.forEach(loc => {
  const filePath = path.join(__dirname, `../messages/${loc}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.Hero) data.Hero = {};
  data.Hero.cta_primary = newKeys[loc].hero.cta_primary;
  data.Hero.cta_secondary = newKeys[loc].hero.cta_secondary;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${loc}.json`);
});
