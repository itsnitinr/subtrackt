import { Subscription } from '@/types/subscription';

export const subscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg',
    price: 9.99,
    interval: 'monthly',
    startDate: new Date('2024-01-01'),
    endDate: null,
  },
  {
    id: '2',
    name: 'Spotify',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg',
    price: 9.99,
    interval: 'monthly',
    startDate: new Date('2024-02-12'),
    endDate: new Date('2024-12-31'),
  },
  {
    id: '3',
    name: 'ChatGPT',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    price: 20,
    interval: 'monthly',
    startDate: new Date('2024-01-20'),
    endDate: null,
  },
  {
    id: '4',
    name: 'Amazon Prime',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/e/e3/Amazon_Prime_Logo.svg',
    price: 139,
    interval: 'yearly',
    startDate: new Date('2023-11-15'),
    endDate: null,
  },
  {
    id: '6',
    name: 'Adobe CC',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg',
    price: 20.99,
    interval: 'monthly',
    startDate: new Date('2024-02-24'),
    endDate: null,
  },
  {
    id: '7',
    name: 'Xbox Game Pass',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/3a/Xbox_app_logo.svg',
    price: 16.99,
    interval: 'monthly',
    startDate: new Date('2024-01-30'),
    endDate: new Date('2024-10-10'),
  },
  {
    id: '8',
    name: 'Playstation Plus',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/e/e1/PlayStationPlus_%28No_Trademark%29.svg',
    price: 24.99,
    interval: 'quarterly',
    startDate: new Date('2024-01-21'),
    endDate: new Date('2024-10-10'),
  },
];

export interface Service {
  name: string;
  image: string;
}

export const commonServices: Service[] = [
  {
    name: 'Netflix',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg',
  },
  {
    name: 'Spotify',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg',
  },
  {
    name: 'ChatGPT',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
  },
  {
    name: 'Amazon Prime',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/e/e3/Amazon_Prime_Logo.svg',
  },
  {
    name: 'Disney+',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
  },
  {
    name: 'YouTube Premium',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/d/dd/YouTube_Premium_logo.svg',
  },
  {
    name: 'Apple TV+',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg',
  },
  {
    name: 'HBO Max',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg',
  },
  {
    name: 'Adobe Creative Cloud',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg',
  },
  {
    name: 'Xbox Game Pass',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/3a/Xbox_app_logo.svg',
  },
  {
    name: 'PlayStation Plus',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/e/e1/PlayStationPlus_%28No_Trademark%29.svg',
  },
  {
    name: 'Nintendo Switch Online',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/5/5d/Nintendo_Switch_Logo.svg',
  },
  {
    name: 'Google One',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg',
  },
  {
    name: 'Dropbox',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg',
  },
  {
    name: 'Twitch',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/2/26/Twitch_logo.svg',
  },
  {
    name: 'LinkedIn Premium',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
  },
  {
    name: 'Canva Pro',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg',
  },
  {
    name: 'Notion',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
  },
  {
    name: 'Evernote',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Evernote.svg',
  },
];

interface GroupedServices {
  group: string;
  services: Service[];
}

export const groupedServices: GroupedServices[] = [
  {
    group: 'Entertainment',
    services: [
      {
        name: 'Netflix',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg',
      },
      {
        name: 'YouTube Premium',
        image: 'https://svgl.app/library/youtube.svg',
      },
      {
        name: 'Prime Video',
        image: 'https://svgl.app/library/prime-video.svg',
      },
      {
        name: 'Hotstar',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/b/b6/Disney%2B_Hotstar_2024.svg',
      },
      {
        name: 'JioCinema',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/1/14/Jiocinema.png',
      },
    ],
  },
  {
    group: 'Music',
    services: [
      {
        name: 'Spotify',
        image: 'https://svgl.app/library/spotify.svg',
      },
      {
        name: 'Apple Music',
        image: 'https://svgl.app/library/apple-music-icon.svg',
      },
      {
        name: 'YouTube Music',
        image: 'https://svgl.app/library/youtube_music.svg',
      },
    ],
  },
  {
    group: 'AI Services',
    services: [
      {
        name: 'ChatGPT',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
      },
      {
        name: 'OpenAI',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
      },
      {
        name: 'Claude',
        image: 'https://svgl.app/library/claude-ai.svg',
      },
      {
        name: 'Gemini',
        image: 'https://svgl.app/library/bard.svg',
      },
    ],
  },
  {
    group: 'Cloud Services',
    services: [
      {
        name: 'Google Cloud',
        image: 'https://svgl.app/library/google.svg',
      },
      {
        name: 'AWS',
        image: 'https://svgl.app/library/aws.svg',
      },
      {
        name: 'Azure',
        image: 'https://svgl.app/library/azure.svg',
      },
      {
        name: 'Digital Ocean',
        image: 'https://svgl.app/library/digitalocean.svg',
      },
      {
        name: 'Vercel',
        image: 'https://svgl.app/library/vercel.svg',
      },
    ],
  },
  {
    group: 'Software',
    services: [
      {
        name: 'Adobe',
        image: 'https://svgl.app/library/adobe.svg',
      },
      {
        name: 'Figma',
        image: 'https://svgl.app/library/figma.svg',
      },
      {
        name: 'Zoom',
        image: 'https://svgl.app/library/zoom.svg',
      },
      {
        name: 'Slack',
        image: 'https://svgl.app/library/slack.svg',
      },
      {
        name: 'Notion',
        image: 'https://svgl.app/library/notion.svg',
      },
      {
        name: 'Linear',
        image: 'https://svgl.app/library/linear.svg',
      },
    ],
  },
];
