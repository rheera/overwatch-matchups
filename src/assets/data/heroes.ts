// Have a scale -2 to +2. 0 is neutral, -2 is very weak against, +2 is versy strong against

export const heroes = [
  {
    name: 'D.Va',
    role: 'Tank',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#ed93c7',
    matchup: [
      { enemy: 'D.Va', strength: 0 },
      { enemy: 'Doomfist', strength: 1 },
      { enemy: 'Junkerqueen', strength: 0 },
      { enemy: 'Orisa', strength: 2 },
      { enemy: 'Reinhardt', strength: 2 },
      { enemy: 'Roadhog', strength: 2 },
      { enemy: 'Sigma', strength: 2 },
      { enemy: 'Winston', strength: 2 },
      { enemy: 'Wrecking Ball', strength: 2 },
      { enemy: 'Zarya', strength: 2 },
      { enemy: 'Ashe', strength: 2 },
      { enemy: 'Bastion', strength: 2 },
      { enemy: 'Cassidy', strength: 2 },
      { enemy: 'Echo', strength: 2 },
      { enemy: 'Genji', strength: 2 },
      { enemy: 'Hanzo', strength: 2 },
      { enemy: 'Junkrat', strength: 2 },
      { enemy: 'Mei', strength: 2 },
      { enemy: 'Pharah', strength: 2 },
      { enemy: 'Reaper', strength: 2 },
      { enemy: 'Sojourn', strength: 2 },
      { enemy: 'Soldier: 76', strength: 2 },
      { enemy: 'Sombra', strength: 2 },
      { enemy: 'Symmetra', strength: 2 },
      { enemy: 'Torbjörn', strength: 2 },
      { enemy: 'Tracer', strength: 2 },
      { enemy: 'Widowmaker', strength: 2 },
      { enemy: 'Ana', strength: 2 },
      { enemy: 'Baptiste', strength: 2 },
      { enemy: 'Brigitte', strength: 2 },
      { enemy: 'Lúcio', strength: 2 },
      { enemy: 'Mercy', strength: 2 },
      { enemy: 'Moira', strength: 2 },
      { enemy: 'Zenyatta', strength: 2 },
      { enemy: 'Kiriko', strength: 2 }
    ]
  },
  {
    name: 'Doomfist',
    role: 'Tank',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#815049'
  },
  {
    name: 'Junkerqueen',
    role: 'Tank',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#815049'
  },
  {
    name: 'Orisa',
    role: 'Tank',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#468c43'
  },
  {
    name: 'Reinhardt',
    role: 'Tank',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#929da3'
  },
  {
    name: 'Roadhog',
    role: 'Tank',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#b68c52'
  },
  {
    name: 'Sigma',
    role: 'Tank',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#ed93c7'
  },
  {
    name: 'Winston',
    role: 'Tank',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#a2a6bf'
  },
  {
    name: 'Wrecking Ball',
    role: 'Tank',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#ed93c7'
  },
  {
    name: 'Zarya',
    role: 'Tank',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#e77eb6'
  },
  {
    name: 'Ashe',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#ed93c7'
  },
  {
    name: 'Bastion',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#7c8f7b'
  },
  {
    name: 'Cassidy',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#ae595c'
  },
  {
    name: 'Echo',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#ed93c7'
  },
  {
    name: 'Genji',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#97ef43'
  },
  {
    name: 'Hanzo',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#b9b48a'
  },
  {
    name: 'Junkrat',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#ecbd53'
  },
  {
    name: 'Mei',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#6faced'
  },
  {
    name: 'Pharah',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#3e7dca'
  },
  {
    name: 'Reaper',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#7d3e51'
  },
  {
    name: 'Sojourn',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#ed93c7'
  },
  {
    name: 'Soldier: 76',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#697794'
  },
  {
    name: 'Sombra',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#7359ba'
  },
  {
    name: 'Symmetra',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#8ebccc'
  },
  {
    name: 'Torbjörn',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#c0726e'
  },
  {
    name: 'Tracer',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#d79342'
  },
  {
    name: 'Widowmaker',
    role: 'Damage',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#9e6aa8'
  },
  {
    name: 'Ana',
    role: 'Support',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#718ab3'
  },
  {
    name: 'Baptiste',
    role: 'Support',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#ed93c7'
  },
  {
    name: 'Brigitte',
    role: 'Support',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#ed93c7'
  },
  {
    name: 'Lúcio',
    role: 'Support',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#85c952'
  },
  {
    name: 'Mercy',
    role: 'Support',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#ebe8bb'
  },
  {
    name: 'Moira',
    role: 'Support',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#803c51'
  },
  {
    name: 'Zenyatta',
    role: 'Support',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#ede582'
  },
  {
    name: 'Kiriko',
    role: 'Support',
    img: require('@/assets/images/headshots/dva.png'),
    color: '#ed93c7'
  }
]
