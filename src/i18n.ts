import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

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
        sync_button: 'Sync AARAM Calendar (.ics)',
        documents_title: 'Official Calendars & Documents',
        documents_subtitle:
          'Access the official interactive and PDF calendars from regional and national associations.',
        download_pdf: 'View / Download',
        aaram_title: 'AARAM - Associação de Atletismo da R.A.M.',
        fpa_title: 'FPA - Federação Portuguesa de Atletismo',
        cal_aaram: 'Calendário AARAM',
        cal_madeira_correr: 'Calendário Madeira a Correr',
        cal_trail: 'Calendário Trail Madeira',
        cal_nacional: 'Calendário Nacional (FPA)',
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
      docs: {
        title: 'Brand & Identity Documentation',
        guidelines: 'Guidelines',
        typography: {
          title: 'Typography',
          typefaces: 'Typefaces',
          font_sizes: 'Font Sizes',
          font_weights: 'Font Weights',
        },
        theming: {
          title: 'Theming',
          colors: 'Colors',
          icons: 'Icons',
          spinner: 'Spinner',
        },
        components: {
          title: 'Components',
          flags: 'Flags',
          text_standards: {
            title: 'Text Standards',
            title_item: 'Title',
            modal_title: 'Modal Title',
            section: 'Section',
            text: 'Text',
            label: 'Label',
          },
          indicators: {
            title: 'Indicators',
            ribbon: 'Ribbon',
            banner: 'Banner',
          },
          links: {
            title: 'Links',
            link: 'Link',
            back_link: 'Back Link',
          },
          buttons: {
            title: 'Buttons',
            button: 'Button',
            action: 'Action',
          },
          navbar: 'Navbar',
          resizable_container: 'Resizable Container',
          search_bar: 'Search Bar',
          form_inputs: {
            title: 'Form Inputs',
            text_input: 'Text Input',
            text_area: 'Text Area',
            generate_input: 'Generate Input',
          },
          form_controls: {
            title: 'Form Controls',
            select: 'Select',
            radio: 'Radio',
            switch: 'Switch',
            checkbox: 'Checkbox',
            slider: 'Slider',
          },
          collapse: {
            title: 'Collapse',
            collapsible: 'Collapsible',
            hideable: 'Hideable',
            drop_down: 'Drop Down',
            content:
              'Hidden content that expands when the header is clicked. This component is now interactable!',
          },
          containers: {
            title: 'Containers',
            page_container: 'Page Container',
            container_shadow: 'Container Shadow',
            container_inset: 'Container Inset',
            drawer: 'Drawer',
            modal: 'Modal',
            modal_title_preview: 'Confirm Action',
            modal_desc_preview: 'Are you sure you want to proceed?',
            modal_cancel: 'Cancel',
            modal_confirm: 'Confirm',
          },
          cards: {
            title: 'Cards',
            card: 'Card',
            list_card: 'List Card',
            events_panel: 'Events Panel',
          },
          toggle: 'Toggle',
          toast: 'Toast',
          graphs: {
            title: 'Graphs',
            bar_graph: 'Bar Graph',
            progress_bar: 'Progress Bar',
            line_graph: 'Line Graph',
            conic_graph: 'Conic Graph',
            radar_chart: 'Radar Chart',
          },
        },
        writing_posts: {
          title: 'Writing Posts',
          intro:
            'Guidelines for creating news and sports updates using Markdown files.',
          template: 'Markdown Template',
          dos: 'Dos',
          donts: "Don'ts",
          guidelines: {
            filename: 'Filename: Use the format YYYY-MM-DD-title-slug.md.',
            folder:
              'Location: Place the file in the correct subfolder under src/content/.',
            frontmatter:
              'Metadata: Ensure title, date, image, and description are provided.',
            bilingual:
              'Language: Always provide content in both Portuguese and English.',
          },
          dos_list: {
            images: 'Use high-quality images and verify URLs.',
            hashtags: 'Include official hashtags: #CDInfante #Madeira.',
            clear_text:
              'Keep descriptions under 150 characters for best display.',
          },
          donts_list: {
            formatting: 'Avoid complex HTML; stick to standard Markdown.',
            huge_files:
              'Do not upload massive images (> 2MB) directly to the repo.',
            broken_links: 'Check all links before submitting.',
          },
        },
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
        sync_button: 'Sincronizar Calendário AARAM (.ics)',
        documents_title: 'Calendários e Documentos Oficiais',
        documents_subtitle:
          'Aceda aos calendários oficiais interativos e em PDF das associações regionais e nacionais.',
        download_pdf: 'Ver / Descarregar',
        aaram_title: 'AARAM - Associação de Atletismo da R.A.M.',
        fpa_title: 'FPA - Federação Portuguesa de Atletismo',
        cal_aaram: 'Calendário AARAM',
        cal_madeira_correr: 'Calendário Madeira a Correr',
        cal_trail: 'Calendário Trail Madeira',
        cal_nacional: 'Calendário Nacional (FPA)',
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
      docs: {
        title: 'Documentação de Marca e Identidade',
        guidelines: 'Diretrizes',
        typography: {
          title: 'Tipografia',
          typefaces: 'Tipos de Letra',
          font_sizes: 'Tamanhos de Letra',
          font_weights: 'Pesos de Letra',
        },
        theming: {
          title: 'Temas',
          colors: 'Cores',
          icons: 'Ícones',
          spinner: 'Spinner',
        },
        components: {
          title: 'Componentes',
          flags: 'Bandeiras',
          text_standards: {
            title: 'Padrões de Texto',
            title_item: 'Título',
            modal_title: 'Título de Modal',
            section: 'Secção',
            text: 'Texto',
            label: 'Etiqueta',
          },
          indicators: {
            title: 'Indicadores',
            ribbon: 'Fita',
            banner: 'Banner',
          },
          links: {
            title: 'Links',
            link: 'Link',
            back_link: 'Link de Voltar',
          },
          buttons: {
            title: 'Botões',
            button: 'Botão',
            action: 'Ação',
          },
          navbar: 'Barra de Navegação',
          resizable_container: 'Contentor Redimensionável',
          search_bar: 'Barra de Pesquisa',
          form_inputs: {
            title: 'Entradas de Formulário',
            text_input: 'Entrada de Texto',
            text_area: 'Área de Texto',
            generate_input: 'Gerar Entrada',
          },
          form_controls: {
            title: 'Controlos de Formulário',
            select: 'Seleção',
            radio: 'Rádio',
            switch: 'Interruptor',
            checkbox: 'Caixa de Seleção',
            slider: 'Deslizador',
          },
          collapse: {
            title: 'Colapso',
            collapsible: 'Colapsável',
            hideable: 'Ocultável',
            drop_down: 'Menu Suspenso',
            content:
              'Conteúdo que se expande quando o cabeçalho é clicado. Este componente é agora interativo!',
          },
          containers: {
            title: 'Contentores',
            page_container: 'Contentor de Página',
            container_shadow: 'Sombra de Contentor',
            container_inset: 'Contentor Inserido',
            drawer: 'Gaveta',
            modal: 'Modal',
            modal_title_preview: 'Confirmar Ação',
            modal_desc_preview: 'Tem a certeza que deseja continuar?',
            modal_cancel: 'Cancelar',
            modal_confirm: 'Confirmar',
          },
          cards: {
            title: 'Cartões',
            card: 'Cartão',
            list_card: 'Cartão de Lista',
            events_panel: 'Painel de Eventos',
          },
          toggle: 'Alternador',
          toast: 'Notificação (Toast)',
          graphs: {
            title: 'Gráficos',
            bar_graph: 'Gráfico de Barras',
            progress_bar: 'Barra de Progresso',
            line_graph: 'Gráfico de Linhas',
            conic_graph: 'Gráfico Cónico',
            radar_chart: 'Gráfico de Radar',
          },
        },
        writing_posts: {
          title: 'Escrever Publicações',
          intro:
            'Diretrizes para criar notícias e atualizações desportivas usando ficheiros Markdown.',
          template: 'Modelo Markdown',
          dos: 'O que fazer',
          donts: 'O que não fazer',
          guidelines: {
            filename:
              'Nome do Ficheiro: Usa o formato AAAA-MM-DD-slug-do-titulo.md.',
            folder:
              'Localização: Coloca o ficheiro na pasta correta em src/content/.',
            frontmatter:
              'Metadados: Garante que o título, data, imagem e descrição estão presentes.',
            bilingual:
              'Idioma: Fornece sempre o conteúdo em Português e Inglês.',
          },
          dos_list: {
            images: 'Usa imagens de alta qualidade e verifica os URLs.',
            hashtags: 'Inclui as hashtags oficiais: #CDInfante #Madeira.',
            clear_text:
              'Mantém as descrições abaixo de 150 caracteres para uma melhor visualização.',
          },
          donts_list: {
            formatting: 'Evita HTML complexo; usa Markdown padrão.',
            huge_files:
              'Não envies imagens gigantes (> 2MB) diretamente para o repositório.',
            broken_links: 'Verifica todos os links antes de submeter.',
          },
        },
      },
    },
  },
}

/**
 * Internationalization Setup
 *
 * Default: pt-PT
 * Fallback: en-GB
 * Persistence: localStorage ('i18nextLng')
 *
 * @author Harry Vasanth (harryvasanth.com)
 */
i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('i18nextLng') || 'pt-PT',
  fallbackLng: 'en-GB',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
