import { Subscription } from '@/types/subscription';

export const subscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg',
    price: 499,
    interval: 'monthly',
    startDate: new Date('2024-01-01'),
    endDate: null,
  },
  {
    id: '2',
    name: 'Spotify',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg',
    price: 199,
    interval: 'quarterly',
    startDate: new Date('2024-02-12'),
    endDate: new Date('2024-12-31'),
  },
  {
    id: '3',
    name: 'ChatGPT',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    price: 99,
    interval: 'monthly',
    startDate: new Date('2024-01-20'),
    endDate: null,
  },
  {
    id: '4',
    name: 'Amazon Prime',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/e/e3/Amazon_Prime_Logo.svg',
    price: 1499,
    interval: 'yearly',
    startDate: new Date('2023-11-15'),
    endDate: null,
  },
  {
    id: '5',
    name: 'Disney+',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
    price: 799,
    interval: 'monthly',
    startDate: new Date('2024-03-14'),
    endDate: new Date('2025-03-01'),
  },
  {
    id: '6',
    name: 'Adobe Creative Cloud',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg',
    price: 5299,
    interval: 'monthly',
    startDate: new Date('2024-02-24'),
    endDate: null,
  },
  {
    id: '7',
    name: 'Xbox Game Pass',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/3a/Xbox_app_logo.svg',
    price: 1499,
    interval: 'quarterly',
    startDate: new Date('2024-01-30'),
    endDate: new Date('2024-10-10'),
  },
];
