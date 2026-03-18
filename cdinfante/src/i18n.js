import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        sports: 'Sports',
        contact: 'Contact',
      },
      hero: {
        title: 'Clube Desportivo Infante Dom Henrique',
        subtitle: 'Promoting excellence in athletics and youth sports since 1980.',
        cta: 'Join Us',
      },
      about: {
        title: 'About Us',
        content: 'Founded to foster sports among youth and adults, our club promotes values such as teamwork, resilience, and respect for sport. We regularly compete in regional and national events, excelling in running and handball.',
        years_label: 'Years of Excellence',
        members_label: 'Active Members',
      },
      sports: {
        title: 'Our Sports',
        subtitle: 'Discover the diverse sports disciplines we offer and support at our club.',
        learn_more: 'Learn more',
        road_running: 'Road Running',
        trail_running: 'Trail Running',
        vertical_km: 'Vertical KM',
        skyrunning: 'Skyrunning',
        track_field: 'Track & Field',
        handball: 'Junior Handball',
      },
      contact: {
        title: 'Contact Us',
        address_label: 'Address',
        phone_label: 'Phone',
        address: 'Colégio Infante D. Henrique, Caminho do Monte n.º 180, Monte, 9050-288 Funchal, Portugal',
        form: {
          name: 'Name',
          email: 'Email',
          message: 'Message',
          send: 'Send Message',
        }
      },
      footer: {
        rights: 'All rights reserved.',
      }
    }
  },
  pt: {
    translation: {
      nav: {
        home: 'Início',
        about: 'Sobre Nós',
        sports: 'Modalidades',
        contact: 'Contactos',
      },
      hero: {
        title: 'Clube Desportivo Infante Dom Henrique',
        subtitle: 'Promovendo a excelência no atletismo e desporto juvenil desde 1980.',
        cta: 'Junta-te a nós',
      },
      about: {
        title: 'Sobre Nós',
        content: 'Fundado para fomentar a prática desportiva entre jovens e adultos, o clube promove valores como espírito de equipa, superação e respeito pelo desporto. Participamos regularmente em competições regionais e nacionais, destacando-nos nas modalidades de corrida e andebol.',
        years_label: 'Anos de Excelência',
        members_label: 'Membros Ativos',
      },
      sports: {
        title: 'Modalidades',
        subtitle: 'Descubra as diversas disciplinas desportivas que oferecemos e apoiamos no nosso clube.',
        learn_more: 'Saber mais',
        road_running: 'Corrida de Estrada',
        trail_running: 'Trail Running',
        vertical_km: 'KM Vertical',
        skyrunning: 'Skyrunning',
        track_field: 'Atletismo de Pista',
        handball: 'Andebol Júnior',
      },
      contact: {
        title: 'Contactos',
        address_label: 'Endereço',
        phone_label: 'Telefone',
        address: 'Colégio Infante D. Henrique, Caminho do Monte n.º 180, Monte, 9050-288 Funchal, Portugal',
        form: {
          name: 'Nome',
          email: 'E-mail',
          message: 'Mensagem',
          send: 'Enviar Mensagem',
        }
      },
      footer: {
        rights: 'Todos os direitos reservados.',
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
