import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  Mountain,
  Target,
  ArrowUpRight,
  Footprints,
  CircleDot,
  ShieldCheck,
  LayoutGrid,
} from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';

export const Sports = () => {
  const { t } = useTranslation();

  return (
    <section id="sports" className="py-32 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-red font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              {t('nav.sports')}
            </span>
            <h2 className="text-5xl md:text-7xl font-[900] text-brand-navy dark:text-white mb-6 tracking-tight">
              {t('sports.title')}
            </h2>
            <p className="text-xl text-brand-navy/60 dark:text-slate-400 font-medium">
              {t('sports.subtitle')}
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-12 h-1 bg-brand-red rounded-full" />
            <div className="w-4 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
            <div className="w-4 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BentoCard
            title={t('sports.road_running')}
            icon={Activity}
            imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/517777586_1243954357521566_3621410186097974538_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_ohc=7L6w1coJ96YQ7kNvwEVHyWx&_nc_oc=AdpLoS71-Vx8kqInZgPDev31MSmBoYc2dh8N8VoM8HqSVyBvw0fC5JylXh7PPwwcks-XLm1gMpcXnm8fGaRnoClB&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=cWPYyWSwyhmO3Ve4bMqgYQ&_nc_ss=7a32e&oh=00_Afy1I0TSntTMDdVoQiPSWyhQ9pZ7A8ciNgJlU7EDlRg-zA&oe=69C4E17A"
            delay={0.1}
            className="md:col-span-2"
            slug="road-running"
          />
          <BentoCard
            title={t('sports.trail_running')}
            icon={Mountain}
            imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/485159335_1155820153001654_1938730724457588876_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=P9_FnaLitFYQ7kNvwHlu41B&_nc_oc=Adp-Er0ZvuwVBzAKaUT8SIYj0GijxH4NGg5lvb-PrjLdQAFcl8GyHP_pqs1no78d3VO-rjyS00J1IIhSOvovVX0-&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=r-2Tt8FZ2wCTXM4X683ULQ&_nc_ss=7a32e&oh=00_Afy_1RuLvHsLcfKshGp3uGF1rpE3u7Hgqv-vgOI0mnhPdw&oe=69C4E3AB"
            delay={0.2}
            slug="trail-running"
          />
          <BentoCard
            title={t('sports.vertical_km')}
            icon={Target}
            imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/515670604_1236248098292192_510837140913093732_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=ERYxzvi401kQ7kNvwGM_2Bl&_nc_oc=AdojSDSmT6NYyVgo_s7wFYvNATj8inBwQ9JaG_EOZqkCLJHqC2hHd-lf4wq3JkK-ZGewXC9sKYSZPzgnP6yngewW&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=iyiP7QsuMzM3ifvmo4yZgQ&_nc_ss=7a32e&oh=00_Afx_zjTLETNt-7_8Ui8AqiDZ8hsne0aT-QdSH03WL-wDqQ&oe=69C4D20B"
            delay={0.3}
            slug="vertical-km"
          />
          <BentoCard
            title={t('sports.skyrunning')}
            icon={ArrowUpRight}
            imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/510277858_1230731038843898_1160586756874725884_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=osLbrT2WYiQQ7kNvwGdugV_&_nc_oc=AdrR4Zgu6Z39yazK8fn90AgCbDaZm_j4fkd8oka_NecDB_Y-bABfo2rAT35oWTDIMLmW1c618Wngv4XdwivATKC6&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=OYE2Y_lhBM1JepwoxX7hoQ&_nc_ss=7a32e&oh=00_AfxFExCt3JewNI48lUiueF16z4MUPIXkPoiD-XxENXhZQw&oe=69C4D9E1"
            delay={0.4}
            slug="skyrunning"
          />
          <BentoCard
            title={t('sports.track_field')}
            icon={Footprints}
            imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/649290213_1439487161301617_5655099727395803523_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=eACygkDOTs0Q7kNvwFWjhMo&_nc_oc=AdpT-TJG4dcm2IM5vq-NpYvDKoCBm-gXn-7DDzfe2CIRw_WJbHASTBj4S648xGZ1HP4h1-ABiyHdfF8eRcsNsHWE&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=JgKuhD5JM0_XABj8ZLNKCw&_nc_ss=7a32e&oh=00_Afz823wvgXEumZTikjsntonhAW-KDC78Y91yMHuPHOlOsw&oe=69C4D5EC"
            delay={0.5}
            slug="track-field"
          />
          <BentoCard
            title={t('sports.handball')}
            icon={CircleDot}
            imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/518312337_1247530197163982_3412159863800210848_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=P0ZNf1iZLmsQ7kNvwEH3V3h&_nc_oc=Adrg-UbPIRXcVfohDjcg4RXVq3yZ1ROBlS-2GtIrtCgBwzbfyLNua36NaWGgf87cgKTQBWrqMVHBOCTrC1gCsz61&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=pNOZlqjyp9xfOdE8ibhIsQ&_nc_ss=7a32e&oh=00_AfwZIPqzhGQFtoaCdMBXEZQxDUnOnDtT2oghbaFYa9ZavQ&oe=69C4D3D0"
            delay={0.6}
            slug="handball"
          />
          <BentoCard
            title={t('sports.judo')}
            icon={ShieldCheck}
            imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/555491580_1308130501103951_8891449616780622006_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=xpgmdzP878QQ7kNvwGqRCtl&_nc_oc=AdpZXSWk7KiCW8K_3r5nPpQIUwNVXwZIEA8mZ6KAyQV79FxhlN2w0wYfUaRJw7J8JbV9zi6pPdFlJ6jpppzd3hzM&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=RlJQhi2lOGz7RGJbsYe7qg&_nc_ss=7a32e&oh=00_Afw8Nv5rABDDlnu75o-3dZasO6hSls7UNaRKrSBQbVSfxQ&oe=69C4E034"
            delay={0.7}
            slug="judo"
          />
          <BentoCard
            title={t('sports.others')}
            icon={LayoutGrid}
            imageUrl="https://scontent.ffnc2-1.fna.fbcdn.net/v/t39.30808-6/572767655_26047934641463017_5848341432944158172_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=dd6889&_nc_ohc=_AgdUcaYWRoQ7kNvwELEV_Z&_nc_oc=AdrvwZI45m4GNhVeb1Pgg3PF8FVt46rCgENEjXMqS0Tb5mQcqNxHPZGvfEJpoAKfMlypWqDo7rUiLHE2001kIrBK&_nc_zt=23&_nc_ht=scontent.ffnc2-1.fna&_nc_gid=J5eFvov7gQZz-A6jxQaV4w&_nc_ss=7a32e&oh=00_AfwqIsPfe09WMZVKlINXL8GG-SAq8vumGmNFqFd-n_d5gw&oe=69C70EC7"
            delay={0.8}
            className="md:col-span-2"
            slug="others"
          />
        </div>
      </div>
    </section>
  );
};
