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
        subtitle: 'A sports association promoting athletics and youth sports, focusing on running and handball.',
        cta: 'Join Us',
      },
      about: {
        title: 'About Us',
        content: 'Clube Desportivo Infante Dom Henrique is a sports association promoting athletics and youth sports, focusing on road running, trail running, vertical km, skyrunning, track & field, and a junior handball team. We encourage sports practice and the development of young talents in our region.',
        subtitle: 'Founded to foster sports among youth and adults, our club promotes values such as teamwork, resilience, and respect for sport. We regularly compete in regional and national events, excelling in running and handball.',
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
        subtitle: 'Uma associação dedicada à promoção do atletismo e do desporto juvenil.',
        cta: 'Junta-te a nós',
      },
      about: {
        title: 'Sobre Nós',
        content: 'O Clube Desportivo Infante Dom Henrique é uma associação dedicada à promoção do atletismo e do desporto juvenil, com destaque para corrida de estrada, trail running, km vertical, skyrunning, atletismo de pista e uma equipa júnior de andebol. Incentivamos a prática desportiva e o desenvolvimento de jovens talentos na região.',
        subtitle: 'Fundado para fomentar a prática desportiva entre jovens e adultos, o clube promove valores como espírito de equipa, superação e respeito pelo desporto. Participamos regularmente em competições regionais e nacionais, destacando-nos nas modalidades de corrida e andebol.',
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
