import { Country } from '@/lib/definitions';

export const countries: Country[] = [
  {
    name: 'Argentina',
    cities: [
      { name: 'Buenos Aires', zipCode: 'C1000', state: 'Buenos Aires' },
      { name: 'Córdoba', zipCode: 'X5000', state: 'Córdoba' },
      { name: 'Villa Carlos Paz', zipCode: 'X5152', state: 'Córdoba' },
      { name: 'Rosario', zipCode: 'S2000', state: 'Santa Fe' },
      { name: 'Corrientes', zipCode: 'W3400', state: 'Corrientes' },
      { name: 'San Martin de los Andes', zipCode: 'Q8370', state: 'Neuquén' },
    ],
    states: ['Buenos Aires', 'Córdoba', 'Corrientes', 'Neuquén', 'Santa Fe'],
  },
  {
    name: 'Brazil',
    cities: [
      { name: 'São Paulo', zipCode: '01000-000', state: 'São Paulo' },
      { name: 'Rio de Janeiro', zipCode: '20000-000', state: 'Rio de Janeiro' },
      { name: 'Brasília', zipCode: '70000-000', state: 'Distrito Federal' },
      { name: 'Florianópolis', zipCode: '88000-000', state: 'Santa Catarina' },
    ],
    states: [
      'São Paulo',
      'Rio de Janeiro',
      'Distrito Federal',
      'Santa Catarina',
    ],
  },
  {
    name: 'Mexico',
    cities: [
      { name: 'Mexico City', zipCode: '01000', state: 'Mexico City' },
      { name: 'Guadalajara', zipCode: '44100', state: 'Jalisco' },
      { name: 'Monterrey', zipCode: '64000', state: 'Nuevo León' },
    ],
    states: ['Mexico City', 'Jalisco', 'Nuevo León'],
  },
  {
    name: 'United States',
    cities: [
      { name: 'New York', zipCode: '10001', state: 'New York' },
      { name: 'Los Angeles', zipCode: '90001', state: 'California' },
      { name: 'Chicago', zipCode: '60601', state: 'Illinois' },
    ],
    states: ['New York', 'California', 'Illinois'],
  },
  {
    name: 'Poland',
    cities: [
      { name: 'Warsaw', zipCode: '00-001', state: 'Masovian' },
      { name: 'Kraków', zipCode: '30-001', state: 'Lesser Poland' },
      { name: 'Łódź', zipCode: '90-001', state: 'Łódź' },
    ],
    states: ['Masovian', 'Lesser Poland', 'Łódź'],
  },
  {
    name: 'Ukraine',
    cities: [
      { name: 'Kyiv', zipCode: '01001', state: 'Kyiv Oblast' },
      { name: 'Kharkiv', zipCode: '61000', state: 'Kharkiv Oblast' },
      { name: 'Odesa', zipCode: '65000', state: 'Odesa Oblast' },
    ],
    states: ['Kyiv Oblast', 'Kharkiv Oblast', 'Odesa Oblast'],
  },
  {
    name: 'Georgia',
    cities: [
      { name: 'Tbilisi', zipCode: '0100', state: 'Tbilisi' },
      { name: 'Batumi', zipCode: '6000', state: 'Adjara' },
      { name: 'Kutaisi', zipCode: '4600', state: 'Imereti' },
    ],
    states: ['Tbilisi', 'Adjara', 'Imereti'],
  },
];
