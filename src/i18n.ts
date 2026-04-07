import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'en-GB': {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        sports: 'Sports',
        calendar: 'Calendar & Events',
        contact: 'Contact',
      },
      hero: {
        location: 'Funchal, Madeira',
        club_name: 'Clube Desportivo',
        club_suffix: 'Infante Dom Henrique',
        title: 'Clube Desportivo Infante Dom Henrique',
        subtitle:
          'A sports association promoting athletics and youth sports, focusing on running and handball.',
        cta: 'Join Us',
      },
      about: {
        title: 'About Us',
        content:
          'Clube Desportivo Infante Dom Henrique is a sports association promoting athletics and youth sports, focusing on road running, trail running, vertical km, skyrunning, track & field, and handball. We encourage sports practice and the development of young talents in our region.',
        subtitle:
          'Founded to foster sports among youth and adults, our club promotes values such as teamwork, resilience, and respect for sport. We regularly compete in regional and national events, excelling in running and handball.',
        years_count: '40+',
        years_label: 'Years of Excellence',
        members_count: '100+',
        members_label: 'Active Members',
        since: 'Since 1980',
        promotion: 'Promoting Excellence in Madeira Sports',
      },
      sports: {
        title: 'Our Sports',
        subtitle:
          'Discover the diverse sports disciplines we offer and support at our club.',
        learn_more: 'Learn more',
        road_running: 'Road Running',
        trail_running: 'Trail Running',
        vertical_km: 'Vertical KM',
        skyrunning_kv: 'Skyrunning & Vertical KM',
        track_field: 'Track & Field',
        handball: 'Handball',
        judo: 'Judo',
        other_competitions: 'Other Competitions',
        others: 'General Activities',
        no_posts: 'No updates available at the moment.',
        check_back_soon: 'Check back soon for new news and events.',
        gallery: 'Gallery',
        past_posts: 'Latest Updates',
        read_article: 'Read Article',
        share: 'Share',
        link_copied: 'Link copied to clipboard!',
      },
      calendar: {
        title: 'Calendar & Events',
        subtitle:
          'Stay up to date with our upcoming competitions, training sessions, and club events.',
        documents_title: 'Official Calendars & Documents',
        documents_subtitle:
          'Download the official PDF calendars for each sport discipline.',
        download_pdf: 'Download PDF',
      },
      common: {
        back_home: 'Back to Home',
      },
      contact: {
        title: 'Contact Us',
        address_label: 'Address',
        phone_label: 'Phone',
        phone_value: '+351 291 783 775',
        address:
          'Colégio Infante D. Henrique\nCaminho do Monte n.º 180,\nMonte, 9050-288\nFunchal, Portugal',
        form: {
          name: 'Name',
          email: 'Email',
          message: 'Message',
          send: 'Send Message',
        },
      },
      footer: {
        rights: 'All rights reserved.',
      },
    },
  },
  'pt-PT': {
    translation: {
      nav: {
        home: 'Início',
        about: 'Sobre Nós',
        sports: 'Modalidades',
        calendar: 'Calendário e Eventos',
        contact: 'Contactos',
      },
      hero: {
        location: 'Funchal, Madeira',
        club_name: 'Clube Desportivo',
        club_suffix: 'Infante Dom Henrique',
        title: 'Clube Desportivo Infante Dom Henrique',
        subtitle:
          'Uma associação dedicada à promoção do atletismo e do desporto juvenil.',
        cta: 'Junta-te a nós',
      },
      about: {
        title: 'Sobre Nós',
        content:
          'O Clube Desportivo Infante Dom Henrique é uma associação dedicada à promoção do atletismo e do desporto juvenil, com destaque para corrida de estrada, trail running, km vertical, skyrunning, atletismo de pista e andebol. Incentivamos a prática desportiva e o desenvolvimento de jovens talentos na região.',
        subtitle:
          'Fundado para fomentar a prática desportiva entre jovens e adultos, o clube promove valores como espírito de equipa, superação e respeito pelo desporto. Participamos regularmente em competições regionais e nacionais, destacando-nos nas modalidades de corrida e andebol.',
        years_count: '40+',
        years_label: 'Anos de Excelência',
        members_count: '100+',
        members_label: 'Membros Ativos',
        since: 'Desde 1980',
        promotion: 'Promovendo a Excelência no Desporto da Madeira',
      },
      sports: {
        title: 'Modalidades',
        subtitle:
          'Descubra as diversas disciplinas desportivas que oferecemos e apoiamos no nosso clube.',
        learn_more: 'Saber mais',
        road_running: 'Corrida de Estrada',
        trail_running: 'Trail Running',
        vertical_km: 'KM Vertical',
        skyrunning_kv: 'Skyrunning & KM Vertical',
        track_field: 'Atletismo de Pista',
        handball: 'Andebol',
        judo: 'Judo',
        other_competitions: 'Outras Competições',
        others: 'Outras Atividades',
        no_posts: 'Nenhuma atualização disponível no momento.',
        check_back_soon: 'Verifique brevemente para novas notícias e eventos.',
        gallery: 'Galeria',
        past_posts: 'Últimas Novidades',
        read_article: 'Ler Artigo',
        share: 'Partilhar',
        link_copied: 'Link copiado!',
      },
      calendar: {
        title: 'Calendário e Eventos',
        subtitle:
          'Mantenha-se atualizado com as nossas próximas competições, treinos e eventos do clube.',
        documents_title: 'Calendários e Documentos Oficiais',
        documents_subtitle:
          'Descarregue os calendários oficiais em PDF para cada disciplina desportiva.',
        download_pdf: 'Descarregar PDF',
      },
      common: {
        back_home: 'Voltar ao Início',
      },
      contact: {
        title: 'Contactos',
        address_label: 'Endereço',
        phone_label: 'Telefone',
        phone_value: '+351 291 783 775',
        address:
          'Colégio Infante D. Henrique\nCaminho do Monte n.º 180,\nMonte, 9050-288\nFunchal, Portugal',
        form: {
          name: 'Nome',
          email: 'E-mail',
          message: 'Mensagem',
          send: 'Enviar Mensagem',
        },
      },
      footer: {
        rights: 'Todos os direitos reservados.',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('i18nextLng') || 'pt-PT',
  fallbackLng: 'en-GB',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
