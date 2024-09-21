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
