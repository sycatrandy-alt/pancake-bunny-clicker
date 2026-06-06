// ====== PANCAKE BUNNY CLICKER ======
const SAVE_KEY = 'pancakeBunnyClicker_v6';
const LAST_SEEN_KEY = SAVE_KEY + '_lastSeen';

const flavorLines = [
  "The bunny is happy.",
  "Pancake wobbles ominously.",
  "Click harder, mortal.",
  "The bunny wants more. Always more.",
  "Yum.",
  "Carrots taste like victory.",
  "Good click. Decent. Acceptable.",
  "The bunny smiles. You should not.",
  "Maple syrup time.",
  "You are strong. The bunny is stronger.",
  "Mars is calling collect.",
  "The Moon waits. The Moon is patient. You will not be.",
  "Sparkly!",
  "Hop hop hop.",
  "DNA hums softly. Or screams. Hard to tell.",
  "Buddy wags. Buddy knows things.",
  "The bunny has filed your taxes incorrectly.",
  "An alien cat is watching. Always.",
  "🥞🥞🥞",
  "The carrots have begun whispering.",
  "Why are you still clicking? Hmm. Fair.",
  "Plot twist: the bunny is the player.",
  "Quietly judging your APM.",
  "+1 to your permanent record.",
  "The Rocket Pad coughs.",
  "Star bits glimmer with mild disappointment.",
  "Buddy found a sock. Buddy is keeping it.",
  "Pancake levitates for 0.4 seconds.",
];

// ====== UPGRADES ======
// tier: 'earth' | 'moon' | 'mars' | 'cosmic'
const clickUpgrades = [
  // --- EARTH ---
  { id: 'cu1', tier: 'earth', icon: '🥕', name: 'Strong Paws',  desc: '+1 per click',     baseCost: 15,        growth: 1.22, power: 1,     max: 50, requires: [] },
  { id: 'cu_e1', tier: 'earth', icon: '🦷', name: 'Sharp Teeth', desc: '+2 per click',     baseCost: 60,        growth: 1.23, power: 2,     max: 50, requires: [] },
  { id: 'cu2', tier: 'earth', icon: '🧤', name: 'Better Paws',  desc: '+3 per click',     baseCost: 200,       growth: 1.27, power: 3,     max: 50, requires: [] },
  { id: 'cu_e2', tier: 'earth', icon: '🥒', name: 'Cucumber Diet', desc: '+5 per click', baseCost: 480,       growth: 1.26, power: 5,     max: 50, requires: [] },
  { id: 'cu7', tier: 'earth', icon: '🥊', name: 'Bunny Boxer',  desc: '+6 per click',     baseCost: 900,       growth: 1.28, power: 6,     max: 45, requires: [] },
  { id: 'cu_e3', tier: 'earth', icon: '🦴', name: 'Lucky Bone', desc: '+8 per click',     baseCost: 1700,      growth: 1.28, power: 8,     max: 45, requires: [] },
  { id: 'cu3', tier: 'earth', icon: '💪', name: 'Big Bunny',    desc: '+10 per click',    baseCost: 3000,      growth: 1.30, power: 10,    max: 40, requires: [] },
  { id: 'cu_e4', tier: 'earth', icon: '🌳', name: 'Hop Tree',   desc: '+15 per click',    baseCost: 8000,      growth: 1.30, power: 15,    max: 40, requires: [] },
  { id: 'cu_e5', tier: 'earth', icon: '🎯', name: 'Aim Training', desc: '+22 per click',  baseCost: 22000,     growth: 1.31, power: 22,    max: 35, requires: [] },
  { id: 'cu4', tier: 'earth', icon: '🥞', name: 'Power Bunny',  desc: '+35 per click',    baseCost: 45000,     growth: 1.33, power: 35,    max: 30, requires: [] },
  { id: 'cu8', tier: 'earth', icon: '⚒️', name: 'Iron Grip',    desc: '+90 per click',    baseCost: 180000,    growth: 1.35, power: 90,    max: 30, requires: ['basicRocketry'] },
  // --- MOON ---
  { id: 'cu5',   tier: 'moon', icon: '🌙', name: 'Moon Bunny',    desc: '+200 per click',    baseCost: 500000,    growth: 1.36, power: 200,   max: 25, requires: ['reachedMoon'] },
  { id: 'cu_m1', tier: 'moon', icon: '🦘', name: 'Lunar Hop',     desc: '+325 per click',    baseCost: 1500000,   growth: 1.37, power: 325,   max: 25, requires: ['reachedMoon'] },
  { id: 'cu9',   tier: 'moon', icon: '🌑', name: 'Crater Punch',  desc: '+500 per click',    baseCost: 4500000,   growth: 1.38, power: 500,   max: 25, requires: ['reachedMoon'] },
  { id: 'cu_m2', tier: 'moon', icon: '🌊', name: 'Tidal Smash',   desc: '+800 per click',    baseCost: 10000000,  growth: 1.39, power: 800,   max: 22, requires: ['reachedMoon'] },
  { id: 'cu_m3', tier: 'moon', icon: '☄️', name: 'Comet Strike',  desc: '+1,400 per click',  baseCost: 18000000,  growth: 1.40, power: 1400,  max: 22, requires: ['advancedRocketry'] },
  // --- MARS ---
  { id: 'cu6',   tier: 'mars', icon: '🔴', name: 'Mars Bunny',    desc: '+2,200 per click',  baseCost: 25000000,  growth: 1.40, power: 2200,  max: 20, requires: ['reachedMars'] },
  { id: 'cu_r1', tier: 'mars', icon: '💨', name: 'Dust Devil',    desc: '+4,500 per click',  baseCost: 60000000,  growth: 1.41, power: 4500,  max: 20, requires: ['reachedMars'] },
  { id: 'cu10',  tier: 'mars', icon: '🌋', name: 'Red Storm',     desc: '+7,000 per click',  baseCost: 120000000, growth: 1.42, power: 7000,  max: 20, requires: ['reachedMars'] },
  { id: 'cu_r2', tier: 'mars', icon: '⚡', name: 'Magma Fist',    desc: '+15,000 per click', baseCost: 300000000, growth: 1.43, power: 15000, max: 18, requires: ['reachedMars'] },
  { id: 'cu_r3', tier: 'mars', icon: '🛡️', name: 'Iron Knuckle',  desc: '+30,000 per click', baseCost: 700000000, growth: 1.44, power: 30000, max: 18, requires: ['terraforming'] },
  // --- GLACIO ---
  { id: 'cu_g1', tier: 'glacio', icon: '❄️', name: 'Frost Punch',    desc: '+80,000 per click',  baseCost: 9e10,  growth: 1.42, power: 80000,    max: 25, requires: ['reachedGlacio'] },
  { id: 'cu_g2', tier: 'glacio', icon: '🧊', name: 'Ice Spear',      desc: '+250,000 per click', baseCost: 6e11,  growth: 1.44, power: 250000,   max: 22, requires: ['reachedGlacio'] },
  { id: 'cu_g3', tier: 'glacio', icon: '🥶', name: 'Cryo Smash',     desc: '+800,000 per click', baseCost: 4e12,  growth: 1.46, power: 800000,   max: 20, requires: ['reachedGlacio'] },
  // --- COSMIC ---
  { id: 'cu11', tier: 'cosmic', icon: '⭐', name: 'Star Slam',     desc: '+10,000 per click', baseCost: 1500000000,  growth: 1.45, power: 10000,  max: 15, requires: ['quantumComputing'] },
  { id: 'cu12', tier: 'cosmic', icon: '🌌', name: 'Galaxy Punch',  desc: '+40,000 per click', baseCost: 25000000000, growth: 1.50, power: 40000,  max: 12, requires: ['quantumComputing'] },
  // --- INVINCIBLE DIMENSION ---
  { id: 'cu_i1', tier: 'invincible', icon: '🥊', name: 'Viltrum Strength', desc: '+150,000 per click',   baseCost: 5e10,  growth: 1.45, power: 150000,    max: 30, requires: ['dimension_invincible'] },
  { id: 'cu_i2', tier: 'invincible', icon: '🔥', name: 'Heat Vision',      desc: '+500,000 per click',   baseCost: 4e11,  growth: 1.48, power: 500000,    max: 30, requires: ['dimension_invincible'] },
  { id: 'cu_i3', tier: 'invincible', icon: '🛫', name: 'Flight Punch',     desc: '+2,000,000 per click', baseCost: 3e12,  growth: 1.50, power: 2000000,   max: 25, requires: ['dimension_invincible'] },
  // --- PRESTIGE-LOCKED ---
  { id: 'cu_p1', tier: 'prestige', icon: '⭐', name: 'Ascended Strike',  desc: '+1M per click. Prestige-tier.',     baseCost: 5e9,  growth: 1.44, power: 1000000,   max: 40, requires: ['prestigeLv1'] },
  { id: 'cu_p2', tier: 'prestige', icon: '🌟', name: 'Astral Punch',     desc: '+5M per click. Prestige Lv 2+.',    baseCost: 8e10, growth: 1.46, power: 5000000,   max: 35, requires: ['prestigeLv2'] },
  { id: 'cu_p3', tier: 'prestige', icon: '💫', name: 'Empyrean Slam',    desc: '+25M per click. Prestige Lv 3+.',   baseCost: 1e12, growth: 1.48, power: 25000000,  max: 30, requires: ['prestigeLv3'] },
  { id: 'cu_p4', tier: 'prestige', icon: '✨', name: 'Halo Crash',       desc: '+150M per click. Prestige Lv 5+.',  baseCost: 2e13, growth: 1.50, power: 150000000, max: 25, requires: ['prestigeLv5'] },
  { id: 'cu_p5', tier: 'prestige', icon: '👼', name: 'Apotheosis',       desc: '+1B per click. Prestige Lv 7+.',    baseCost: 5e14, growth: 1.52, power: 1e9,       max: 20, requires: ['prestigeLv7'] },
  { id: 'cu_i4', tier: 'invincible', icon: '💨', name: 'Hypersonic Strike',desc: '+8,000,000 per click', baseCost: 2e13,  growth: 1.52, power: 8000000,   max: 25, requires: ['viltrumiteBiology'] },
  { id: 'cu_i5', tier: 'invincible', icon: '🌋', name: 'World Breaker',    desc: '+40,000,000 per click',baseCost: 2e14,  growth: 1.55, power: 40000000,  max: 20, requires: ['viltrumiteBiology'] },
];

const autoUpgrades = [
  // --- EARTH ---
  { id: 'au_e0', tier: 'earth', icon: '🐜', img: 'helper_ant.png', name: 'Ant Colony',  desc: '+0.05/sec', baseCost: 25,        growth: 1.20, power: 0.05, max: 80, requires: [] },
  { id: 'au1', tier: 'earth', icon: '🐭', img: 'helper_mouse.png',   name: 'Mouse',        desc: '+0.2/sec',  baseCost: 80,        growth: 1.22, power: 0.2,  max: 75, requires: [] },
  { id: 'au_e1', tier: 'earth', icon: '🐌', img: 'helper_snail.png', name: 'Snail',        desc: '+0.35/sec', baseCost: 180,       growth: 1.23, power: 0.35, max: 65, requires: [] },
  { id: 'au7', tier: 'earth', icon: '🐿️', img: 'helper_squirrel.png', name: 'Squirrel',         desc: '+0.6/sec',  baseCost: 350,       growth: 1.24, power: 0.6,  max: 60, requires: [] },
  { id: 'au2', tier: 'earth', icon: '🐹', img: 'helper_hamster.png', name: 'Hamster',      desc: '+1/sec',    baseCost: 1000,      growth: 1.27, power: 1,    max: 60, requires: [] },
  { id: 'au_e2', tier: 'earth', icon: '🦔', img: 'helper_hedgehog.png', name: 'Hedgehog',     desc: '+2/sec',    baseCost: 2800,      growth: 1.27, power: 2,    max: 55, requires: [] },
  { id: 'au_e3', tier: 'earth', icon: '🐢', img: 'helper_tortoise.png', name: 'Tortoise',     desc: '+4/sec',    baseCost: 7500,      growth: 1.28, power: 4,    max: 55, requires: [] },
  { id: 'au3', tier: 'earth', icon: '🐰', img: 'helper_bunny.png',   name: 'Bunny Friend', desc: '+6/sec',    baseCost: 15000,     growth: 1.30, power: 6,    max: 50, requires: [] },
  { id: 'au_e4', tier: 'earth', icon: '🐦', img: 'helper_sparrow.png', name: 'Sparrow',      desc: '+10/sec',   baseCost: 32000,     growth: 1.31, power: 10,   max: 50, requires: [] },
  { id: 'au_e5', tier: 'earth', icon: '🦡', img: 'helper_badger.png', name: 'Badger',       desc: '+18/sec',   baseCost: 75000,     growth: 1.32, power: 18,   max: 45, requires: ['basicRocketry'] },
  { id: 'au8', tier: 'earth', icon: '🦫', img: 'helper_beaver.png', name: 'Beaver',           desc: '+15/sec',   baseCost: 60000,     growth: 1.32, power: 15,   max: 45, requires: ['basicRocketry'] },
  { id: 'au4', tier: 'earth', icon: '🦊', img: 'helper_fox.png',     name: 'Fox',          desc: '+28/sec',   baseCost: 220000,    growth: 1.33, power: 28,   max: 40, requires: [] },
  // --- MOON ---
  { id: 'au5',   tier: 'moon', icon: '🦝', img: 'helper_raccoon.png', name: 'Raccoon',    desc: '+100/sec',    baseCost: 2000000,   growth: 1.36, power: 100,    max: 30, requires: ['reachedMoon'] },
  { id: 'au_m1', tier: 'moon', icon: '🦀', name: 'Moon Crab',         desc: '+200/sec',    baseCost: 5500000,   growth: 1.37, power: 200,    max: 28, requires: ['reachedMoon'] },
  { id: 'au_m2', tier: 'moon', icon: '🐀', name: 'Crater Mole',       desc: '+280/sec',    baseCost: 9500000,   growth: 1.37, power: 280,    max: 28, requires: ['reachedMoon'] },
  { id: 'au9',   tier: 'moon', icon: '🦉', name: 'Moon Owl',          desc: '+400/sec',    baseCost: 15000000,  growth: 1.38, power: 400,    max: 28, requires: ['reachedMoon'] },
  { id: 'au_m3', tier: 'moon', icon: '✨', name: 'Stardust Sprite',   desc: '+700/sec',    baseCost: 32000000,  growth: 1.39, power: 700,    max: 25, requires: ['advancedRocketry'] },
  { id: 'au_m4', tier: 'moon', icon: '🛸', name: 'Lunar Drone',       desc: '+1,100/sec',  baseCost: 75000000,  growth: 1.40, power: 1100,   max: 25, requires: ['advancedRocketry'] },
  // --- MARS ---
  { id: 'au6',   tier: 'mars', icon: '🦅', img: 'helper_eagle.png', name: 'Eagle',        desc: '+1,800/sec',  baseCost: 60000000,   growth: 1.40, power: 1800,   max: 25, requires: ['reachedMars'] },
  { id: 'au_r1', tier: 'mars', icon: '🕷️', name: 'Sand Spider',      desc: '+2,500/sec',  baseCost: 110000000,  growth: 1.41, power: 2500,   max: 25, requires: ['reachedMars'] },
  { id: 'au_r2', tier: 'mars', icon: '🦂', name: 'Dune Scorpion',    desc: '+3,500/sec',  baseCost: 170000000,  growth: 1.41, power: 3500,   max: 25, requires: ['reachedMars'] },
  { id: 'au10',  tier: 'mars', icon: '🦜', name: 'Mars Crow',        desc: '+5,000/sec',  baseCost: 250000000,  growth: 1.42, power: 5000,   max: 22, requires: ['reachedMars'] },
  { id: 'au_r3', tier: 'mars', icon: '🌑', name: 'Phobos Pet',       desc: '+8,000/sec',  baseCost: 450000000,  growth: 1.43, power: 8000,   max: 22, requires: ['terraforming'] },
  { id: 'au_r4', tier: 'mars', icon: '🛰️', name: 'Deimos Drone',     desc: '+14,000/sec', baseCost: 900000000,  growth: 1.44, power: 14000,  max: 20, requires: ['terraforming'] },
  // --- GLACIO ---
  { id: 'au_g1', tier: 'glacio', icon: '🐧', name: 'Penguin',        desc: '+100,000/sec',  baseCost: 1e11,  growth: 1.42, power: 100000,  max: 30, requires: ['reachedGlacio'] },
  { id: 'au_g2', tier: 'glacio', icon: '🐻‍❄️', name: 'Polar Bear',    desc: '+350,000/sec',  baseCost: 7e11,  growth: 1.44, power: 350000,  max: 25, requires: ['reachedGlacio'] },
  { id: 'au_g3', tier: 'glacio', icon: '🦭', name: 'Seal Pup',       desc: '+1,200,000/sec',baseCost: 5e12,  growth: 1.46, power: 1200000, max: 22, requires: ['reachedGlacio'] },
  // --- COSMIC ---
  { id: 'au11', tier: 'cosmic', icon: '🔥', name: 'Phoenix',          desc: '+12,000/sec', baseCost: 3000000000,  growth: 1.45, power: 12000, max: 18, requires: ['quantumComputing'] },
  { id: 'au12', tier: 'cosmic', icon: '🐉', name: 'Dragon',           desc: '+50,000/sec', baseCost: 40000000000, growth: 1.50, power: 50000, max: 15, requires: ['quantumComputing'] },
  // --- INVINCIBLE DIMENSION ---
  { id: 'au_i1', tier: 'invincible', icon: '🪖', name: 'GDA Trooper',     desc: '+180,000/sec',    baseCost: 6e10,  growth: 1.45, power: 180000,    max: 35, requires: ['dimension_invincible'] },
  { id: 'au_i2', tier: 'invincible', icon: '🛡️', name: 'Guardian',        desc: '+700,000/sec',    baseCost: 5e11,  growth: 1.48, power: 700000,    max: 30, requires: ['dimension_invincible'] },
  { id: 'au_i3', tier: 'invincible', icon: '🤖', name: 'Reanimen Bot',    desc: '+3,000,000/sec',  baseCost: 4e12,  growth: 1.50, power: 3000000,   max: 25, requires: ['dimension_invincible'] },
  { id: 'au_i4', tier: 'invincible', icon: '🦁', name: 'Battle Beast Cub',desc: '+12,000,000/sec', baseCost: 3e13,  growth: 1.52, power: 12000000,  max: 25, requires: ['scourgeVirus'] },
  { id: 'au_i5', tier: 'invincible', icon: '👽', name: 'Allen the Alien', desc: '+60,000,000/sec', baseCost: 3e14,  growth: 1.55, power: 60000000,  max: 20, requires: ['scourgeVirus'] },
  // --- PRESTIGE-LOCKED ---
  { id: 'au_p1', tier: 'prestige', icon: '⭐', name: 'Star Sprite',   desc: '+800K/sec. Prestige-tier.',  baseCost: 6e9,  growth: 1.44, power: 800000,    max: 45, requires: ['prestigeLv1'] },
  { id: 'au_p2', tier: 'prestige', icon: '🌟', name: 'Astral Owl',    desc: '+4M/sec. Prestige Lv 2+.',   baseCost: 1e11, growth: 1.46, power: 4000000,   max: 40, requires: ['prestigeLv2'] },
  { id: 'au_p3', tier: 'prestige', icon: '💫', name: 'Comet Cat',     desc: '+20M/sec. Prestige Lv 3+.',  baseCost: 1.5e12,growth: 1.48, power: 20000000,  max: 35, requires: ['prestigeLv3'] },
  { id: 'au_p4', tier: 'prestige', icon: '✨', name: 'Angel Bunny',   desc: '+120M/sec. Prestige Lv 5+.', baseCost: 3e13, growth: 1.50, power: 120000000, max: 30, requires: ['prestigeLv5'] },
  { id: 'au_p5', tier: 'prestige', icon: '👼', name: 'Seraphim',      desc: '+800M/sec. Prestige Lv 7+.', baseCost: 7e14, growth: 1.52, power: 8e8,       max: 25, requires: ['prestigeLv7'] },
];

const upgradeTiers = [
  { id: 'earth',     name: '🌍 Earth' },
  { id: 'moon',      name: '🌙 Moon' },
  { id: 'mars',      name: '🔴 Mars' },
  { id: 'glacio',    name: '🧊 Glacio' },
  { id: 'cosmic',    name: '🌌 Cosmic' },
  { id: 'invincible',name: '🌀 Invincible' },
  { id: 'prestige',  name: '⭐ Prestige' },
];

// ====== CRAFTING ======
// category: 'core' | 'industry' | 'science' | 'defense' | 'rockets' | 'farming' | 'pets'
const recipes = [
  // --- CORE ---
  {
    id: 'rocketStation', icon: '🚀', name: 'Rocket Pad', category: 'core',
    desc: 'Click to make research. Build rockets here.',
    cost: { carrots: 4000 }, oneTime: true, requires: [],
    onCraft: () => { state.crafted.rocketStation = true; toast('🚀 Rocket Pad built!', true); },
  },

  // --- INDUSTRY ---
  {
    id: 'woodenSpoon', icon: '🥄', name: 'Wooden Spoon', category: 'industry',
    desc: '+5% click power each.',
    cost: { carrots: 1200 }, oneTime: false, maxOwned: 5,
    requires: [],
  },
  {
    id: 'storageBasket', icon: '🧺', name: 'Storage Basket', category: 'industry',
    desc: '+3% global multiplier each.',
    cost: { carrots: 3500 }, oneTime: false, maxOwned: 8,
    requires: [],
  },
  {
    id: 'sunflower', icon: '🌻', name: 'Sunflower', category: 'industry',
    desc: '+2% global multiplier each.',
    cost: { carrots: 2200 }, oneTime: false, maxOwned: 10,
    requires: [],
  },
  {
    id: 'scrapKit', icon: '🔩', name: 'Scrap Box', category: 'industry',
    desc: 'Makes +0.05 scrap/sec.',
    cost: { carrots: 7000 }, oneTime: false, maxOwned: 15,
    requires: ['rocketStation'],
  },
  {
    id: 'fuelRefinery', icon: '⛽', name: 'Fuel Tank', category: 'industry',
    desc: 'Makes +0.05 fuel/sec.',
    cost: { carrots: 10000, scrap: 20 }, oneTime: false, maxOwned: 15,
    requires: ['rocketStation', 'basicRocketry'],
  },
  {
    id: 'solarPanel', icon: '☀️', name: 'Sun Panel', category: 'industry',
    desc: '+2% to everything each.',
    cost: { carrots: 35000, scrap: 40 }, oneTime: false, maxOwned: 10,
    requires: ['basicRocketry'],
  },
  {
    id: 'ironForge', icon: '⛓️', name: 'Iron Maker', category: 'industry',
    desc: 'Makes +0.04 iron/sec.',
    cost: { carrots: 60000, scrap: 80 }, oneTime: false, maxOwned: 15,
    requires: ['reachedMoon'],
  },
  {
    id: 'helium3Refinery', icon: '🧪', name: 'Helium-3 Refinery', category: 'industry',
    desc: 'Boosts fuel production +75% each.',
    cost: { carrots: 220000, iron: 30, scrap: 100 }, oneTime: false, maxOwned: 5,
    requires: ['reachedMoon'],
  },
  {
    id: 'moondustForge', icon: '🌙', name: 'Moondust Forge', category: 'industry',
    desc: '+8% global multiplier each.',
    cost: { carrots: 350000, moondust: 3 }, oneTime: false, maxOwned: 8,
    requires: ['reachedMoon'],
  },
  {
    id: 'quantumCore', icon: '🌀', name: 'Power Core', category: 'industry',
    desc: '+3% to everything each.',
    cost: { carrots: 800000, iron: 50, fuel: 100 }, oneTime: false, maxOwned: 8,
    requires: ['quantumComputing'],
  },

  // --- SCIENCE ---
  {
    id: 'labBench', icon: '🔬', name: 'Small Lab', category: 'science',
    desc: 'Makes +0.15 research/sec.',
    cost: { carrots: 15000, scrap: 15 }, oneTime: false, maxOwned: 10,
    requires: ['basicRocketry'],
  },
  {
    id: 'dnaSequencer', icon: '🧬', name: 'DNA Sequencer', category: 'science',
    desc: 'Click for DNA Strands. Opens the DNA Lab.',
    cost: { carrots: 40000, fuel: 5 }, oneTime: true,
    requires: ['basicRocketry'],
    onCraft: () => { state.crafted.dnaSequencer = true; toast('🧬 DNA Sequencer online!', true); },
  },
  {
    id: 'particleCollider', icon: '⚛️', name: 'Big Lab', category: 'science',
    desc: 'Makes +1 research/sec.',
    cost: { carrots: 600000, iron: 80, fuel: 120 }, oneTime: false, maxOwned: 5,
    requires: ['advancedRocketry'],
  },
  {
    id: 'particleAccelerator', icon: '🧮', name: 'Particle Accelerator', category: 'science',
    desc: 'A massive calculator-based collider. Smash particles to gather Quarks and build the 100 parts.',
    cost: { carrots: 200000, scrap: 50 }, oneTime: true,
    requires: ['basicRocketry'],
    onCraft: () => { state.crafted.particleAccelerator = true; toast('🧮 Particle Accelerator online! Calculator humming.', true); },
  },

  // --- DEFENSE ---
  {
    id: 'catGuard', icon: '🐱', img: 'cat_guard.png', name: 'Guard Cat', category: 'defense',
    desc: 'Each guard kills raiders faster and reduces alien theft. Up to 70 can be hired.',
    cost: { carrots: 3500 }, oneTime: false, maxOwned: 70, requires: ['rocketStation'],
  },
  {
    id: 'laserTurret', icon: '🔫', name: 'Laser Gun', category: 'defense',
    desc: 'Guard Cat kills aliens in 1.5s instead of 4s.',
    cost: { carrots: 200000, iron: 30, fuel: 50 }, oneTime: true,
    requires: ['catGuard', 'advancedRocketry'],
    onCraft: () => { state.crafted.laserTurret = true; toast('🔫 Laser Turret online!', true); },
  },
  {
    id: 'marsShield', icon: '🛡️', name: 'Mars Shield', category: 'defense',
    desc: 'Aliens steal 50% less AND raid 50% less often.',
    cost: { carrots: 500000, iron: 100 }, oneTime: true,
    requires: ['reachedMars'],
    onCraft: () => { state.crafted.marsShield = true; toast('🛡️ Mars Shield online!', true); },
  },

  // --- ROCKETS ---
  {
    id: 'rocketMk1', icon: '🛰️', name: 'Small Rocket', category: 'rockets',
    desc: 'Needed to fly to the Moon.',
    cost: { carrots: 20000, scrap: 60, fuel: 30 }, oneTime: true,
    requires: ['rocketStation', 'basicRocketry', 'moonTrajectory'],
    onCraft: () => { state.crafted.rocketMk1 = true; toast('🛰️ Small Rocket built!', true); },
  },
  {
    id: 'rocketMk2', icon: '🚀', name: 'Big Rocket', category: 'rockets',
    desc: 'Needed to fly to Mars.',
    cost: { carrots: 250000, scrap: 500, fuel: 250, iron: 60 }, oneTime: true,
    requires: ['advancedRocketry', 'marsTrajectory'],
    onCraft: () => { state.crafted.rocketMk2 = true; toast('🚀 Big Rocket built!', true); },
  },
  {
    id: 'rocketMk3', icon: '🧊', name: 'Frost Rocket Mk.3', category: 'rockets',
    desc: 'Cold-rated rocket required to fly to Glacio.',
    cost: { carrots: 2000000, scrap: 1500, fuel: 800, iron: 300, atoms: 25 }, oneTime: true,
    requires: ['belowZeroProtection', 'reachedMars'],
    onCraft: () => { state.crafted.rocketMk3 = true; toast('🧊 Frost Rocket Mk.3 assembled!', true); },
  },
  {
    id: 'atomFarm', icon: '☢️', name: 'Atom Farm', category: 'science',
    desc: 'Generates ☢️ Atoms over time. Only buildable after visiting the Quantum Realm.',
    cost: { carrots: 500000, iron: 80, research: 1500 }, oneTime: false, maxOwned: 8,
    requires: ['quantumVisited'],
  },
  {
    id: 'glacioObservatory', icon: '🌌', name: 'Glacio Observatory', category: 'farming',
    desc: 'Frozen telescope. +25% global multiplier each.',
    cost: { carrots: 8000000, iron: 1500, atoms: 10 }, oneTime: false, maxOwned: 5,
    requires: ['reachedGlacio'],
  },
  {
    id: 'iceGarden', icon: '❄️', name: 'Ice Garden', category: 'farming',
    desc: 'Grows frost carrots. +900 carrots/sec each.',
    cost: { carrots: 12000000, iron: 800, atoms: 5 }, oneTime: false, maxOwned: 15,
    requires: ['reachedGlacio'],
  },

  // --- FARMING ---
  {
    id: 'carrotPatch', icon: '🌱', name: 'Carrot Patch', category: 'farming',
    desc: 'A tiny patch. +5 carrots/sec each.',
    cost: { carrots: 800 }, oneTime: false, maxOwned: 10,
    requires: [],
  },
  {
    id: 'wateringCan', icon: '🪣', name: 'Watering Can', category: 'farming',
    desc: 'Carrot Patches & Farms produce +20% each.',
    cost: { carrots: 4500 }, oneTime: false, maxOwned: 5,
    requires: [],
  },
  {
    id: 'carrotFarm', icon: '🥕', name: 'Carrot Farm', category: 'farming',
    desc: 'Earth farm. +20 carrots/sec each.',
    cost: { carrots: 5000 }, oneTime: false, maxOwned: 25,
    requires: ['carrotFarming'],
  },
  {
    id: 'beeHive', icon: '🐝', name: 'Bee Hive', category: 'farming',
    desc: 'Pollinates. All farms +15% each.',
    cost: { carrots: 18000 }, oneTime: false, maxOwned: 5,
    requires: ['carrotFarming'],
  },
  {
    id: 'greenhouse', icon: '🪴', name: 'Moon Farm', category: 'farming',
    desc: '+90 carrots/sec each.',
    cost: { carrots: 60000, moondust: 5 }, oneTime: false, maxOwned: 10,
    requires: ['reachedMoon'],
  },
  {
    id: 'craterDome', icon: '⛺', name: 'Crater Dome', category: 'farming',
    desc: 'A pressurized dome. Moon Farms produce +30% each.',
    cost: { carrots: 250000, moondust: 8 }, oneTime: false, maxOwned: 5,
    requires: ['reachedMoon'],
  },
  {
    id: 'lunarObservatory', icon: '🔭', name: 'Lunar Observatory', category: 'science',
    desc: '+3 research/sec each.',
    cost: { carrots: 280000, iron: 40, moondust: 4 }, oneTime: false, maxOwned: 5,
    requires: ['reachedMoon'],
  },
  {
    id: 'marsGarden', icon: '🌱', name: 'Mars Garden', category: 'farming',
    desc: 'Grows red carrots. +50 carrots/sec each.',
    cost: { carrots: 100000, iron: 20 }, oneTime: false, maxOwned: 25,
    requires: ['reachedMars'],
  },
  {
    id: 'polarCapHarvester', icon: '❄️', name: 'Polar Cap Harvester', category: 'farming',
    desc: 'Extracts polar ice. All Mars farms +35% each.',
    cost: { carrots: 600000, iron: 80 }, oneTime: false, maxOwned: 5,
    requires: ['reachedMars'],
  },
  {
    id: 'redIronMine', icon: '⛏️', name: 'Red Iron Mine', category: 'industry',
    desc: 'Triple iron production each.',
    cost: { carrots: 900000, iron: 100, fuel: 50 }, oneTime: false, maxOwned: 5,
    requires: ['reachedMars'],
  },
  {
    id: 'dustCollector', icon: '🌪️', name: 'Dust Collector', category: 'industry',
    desc: '+12% global multiplier each.',
    cost: { carrots: 1200000, iron: 150 }, oneTime: false, maxOwned: 6,
    requires: ['reachedMars'],
  },
  {
    id: 'phobosOutpost', icon: '🛰️', name: 'Phobos Outpost', category: 'science',
    desc: '+10 research/sec each.',
    cost: { carrots: 1800000, iron: 200, fuel: 120 }, oneTime: false, maxOwned: 4,
    requires: ['reachedMars'],
  },
  {
    id: 'redObelisk', icon: '🗿', name: 'Red Obelisk', category: 'farming',
    desc: 'A monument to red. +15% click power each.',
    cost: { carrots: 2500000, iron: 300 }, oneTime: false, maxOwned: 4,
    requires: ['terraforming'],
  },
  {
    id: 'terraformer', icon: '🌍', name: 'Mars Booster', category: 'farming',
    desc: 'Mars Garden +25% each.',
    cost: { carrots: 1500000, iron: 200 }, oneTime: false, maxOwned: 5,
    requires: ['terraforming'],
  },

  // --- MID-GAME NEW RECIPES (lunar/martian flavor) ---
  {
    id: 'lunarConservatory', icon: '🎼', name: 'Lunar Conservatory', category: 'farming',
    desc: 'Moon farms +60% each, plays nice music.',
    cost: { carrots: 6000000, moondust: 12 }, oneTime: false, maxOwned: 4,
    requires: ['reachedMoon'],
  },
  {
    id: 'redSpice', icon: '🌶️', name: 'Red Spice Refinery', category: 'industry',
    desc: 'Click power +35% each.',
    cost: { carrots: 10000000, iron: 150 }, oneTime: false, maxOwned: 6,
    requires: ['reachedMars'],
  },
  {
    id: 'omniwave', icon: '📶', name: 'Omniwave Tower', category: 'science',
    desc: '+12 research/sec each.',
    cost: { carrots: 25000000, iron: 350, fuel: 200 }, oneTime: false, maxOwned: 5,
    requires: ['quantumComputing'],
  },

  // --- PRESTIGE-LOCKED RECIPES ---
  {
    id: 'ascensionShrine', icon: '⭐', name: 'Ascension Shrine', category: 'science',
    desc: '+200% global multiplier. Permanent. Unlocked at Prestige Lv 1.',
    cost: { carrots: 1e10, iron: 2000, research: 5000 }, oneTime: true,
    requires: ['prestigeLv1'],
    onCraft: () => { state.crafted.ascensionShrine = true; toast('⭐ Ascension Shrine consecrated!', true); },
  },
  {
    id: 'astralAviary', icon: '🌟', name: 'Astral Aviary', category: 'farming',
    desc: 'Helpers +100% each. Prestige Lv 2+.',
    cost: { carrots: 1e11, iron: 6000 }, oneTime: false, maxOwned: 4,
    requires: ['prestigeLv2'],
  },
  {
    id: 'haloEngine', icon: '✨', name: 'Halo Engine', category: 'industry',
    desc: '+50% click power AND +50% global per copy. Prestige Lv 3+.',
    cost: { carrots: 5e12, iron: 20000, fuel: 5000 }, oneTime: false, maxOwned: 5,
    requires: ['prestigeLv3'],
  },

  // --- PETS ---
  // --- INVINCIBLE DIMENSION CRAFTING ---
  {
    id: 'earthDefenseHQ', icon: '🏛️', name: 'Earth Defense HQ', category: 'invincible',
    desc: '+50% global multiplier. The HQ behind the defense of Earth.',
    cost: { carrots: 5e10, iron: 500, fuel: 200 }, oneTime: true,
    requires: ['dimension_invincible'],
    onCraft: () => { state.crafted.earthDefenseHQ = true; toast('🏛️ Earth Defense HQ established!', true); },
  },
  {
    id: 'guardiansTower', icon: '🗼', name: 'Guardians Tower', category: 'invincible',
    desc: '+75% global multiplier. Headquarters of the Guardians of the Globe.',
    cost: { carrots: 5e11, iron: 2000, fuel: 800 }, oneTime: true,
    requires: ['dimension_invincible'],
    onCraft: () => { state.crafted.guardiansTower = true; toast('🗼 Guardians Tower built!', true); },
  },
  {
    id: 'gdaOutpost', icon: '🪖', name: 'GDA Outpost', category: 'invincible',
    desc: '+2 research/sec each.',
    cost: { carrots: 8e10, iron: 800, fuel: 400 }, oneTime: false, maxOwned: 8,
    requires: ['dimension_invincible'],
  },
  {
    id: 'maulerVat', icon: '🧪', name: 'Mauler Clone Vat', category: 'invincible',
    desc: '+25% to all resource generation (scrap/fuel/iron/research) each.',
    cost: { carrots: 2e11, iron: 1500, research: 800 }, oneTime: false, maxOwned: 5,
    requires: ['dimension_invincible'],
  },
  {
    id: 'cecilBunker', icon: '🕳️', name: "Cecil's Bunker", category: 'invincible',
    desc: 'Aliens steal 80% less and raid 40% less often.',
    cost: { carrots: 3e11, iron: 1200, scrap: 800 }, oneTime: true,
    requires: ['dimension_invincible'],
    onCraft: () => { state.crafted.cecilBunker = true; toast('🕳️ Cecil\'s Bunker online.', true); },
  },
  {
    id: 'reanimenLab', icon: '⚙️', name: 'Reanimen Lab', category: 'invincible',
    desc: '+40% auto helper output each.',
    cost: { carrots: 4e11, iron: 2000, fuel: 1000 }, oneTime: false, maxOwned: 5,
    requires: ['dimension_invincible'],
  },
  {
    id: 'roboCatLab', icon: '🤖', img: 'cat_guard.png', name: 'Robo Cat Lab', category: 'invincible',
    desc: 'One-time. Every Guard Cat upgrades to a Robo Cat (×3 effectiveness + slow-burn DMG to Omni-Man).',
    cost: { carrots: 1e12, iron: 5000, scrap: 3000, research: 5000 }, oneTime: true,
    requires: ['dimension_invincible'],
    onCraft: () => { state.crafted.roboCatLab = true; toast('🤖 Robo Cat Lab online — your guards are upgraded!', true); },
  },
  {
    id: 'powerplexBattery', icon: '🔋', name: 'Powerplex Battery', category: 'invincible',
    desc: '+15% global multiplier each.',
    cost: { carrots: 1.5e12, iron: 3000, fuel: 1500 }, oneTime: false, maxOwned: 8,
    requires: ['dimension_invincible'],
  },
  {
    id: 'viltrumiteEmbassy', icon: '🏯', name: 'Viltrumite Embassy', category: 'invincible',
    desc: '+50% click power each.',
    cost: { carrots: 2e12, iron: 4000, research: 3000 }, oneTime: false, maxOwned: 5,
    requires: ['viltrumiteBiology'],
  },
  {
    id: 'dimLensMk2', icon: '🔮', name: 'Dimension Lens Mk II', category: 'invincible',
    desc: '+5 quarks per accelerator click each.',
    cost: { carrots: 2.5e12, iron: 5000, research: 4000 }, oneTime: false, maxOwned: 6,
    requires: ['dimension_invincible'],
  },
  {
    id: 'robotProductionLine', icon: '🏭', name: 'Robot Production Line', category: 'invincible',
    desc: 'Reanimen Bots produce +50% more each.',
    cost: { carrots: 4e12, iron: 8000, fuel: 3000 }, oneTime: false, maxOwned: 5,
    requires: ['scourgeVirus'],
  },
  {
    id: 'atomEveReactor', icon: '⚛️', name: 'Atom Eve Reactor', category: 'invincible',
    desc: '+200% auto helper output, one-time.',
    cost: { carrots: 8e12, iron: 12000, research: 8000 }, oneTime: true,
    requires: ['scourgeVirus'],
    onCraft: () => { state.crafted.atomEveReactor = true; toast('⚛️ Atom Eve Reactor humming.', true); },
  },
  {
    id: 'blackSamsonGarage', icon: '🔧', name: 'Black Samson Garage', category: 'invincible',
    desc: 'Robo Cats fire faster and damage Omni-Man more.',
    cost: { carrots: 1.5e13, iron: 20000, scrap: 15000 }, oneTime: true,
    requires: ['roboCatLab', 'transDimensionalTactics'],
    onCraft: () => { state.crafted.blackSamsonGarage = true; toast('🔧 Black Samson Garage online.', true); },
  },
  {
    id: 'invincibleSuit', icon: '🦸', name: 'Invincible Suit', category: 'invincible',
    desc: '+500% click power, one-time. The blue & yellow suit.',
    cost: { carrots: 3e13, iron: 25000, research: 15000 }, oneTime: true,
    requires: ['killingSucks'],
    onCraft: () => { state.crafted.invincibleSuit = true; toast('🦸 Suit equipped. Yellow and blue.', true); },
  },
  {
    id: 'pinnacleGym', icon: '💪', name: 'Pinnacle Training Gym', category: 'invincible',
    desc: 'Each Mastery rank gives +25% extra effect (compounds with the base ★ bonus).',
    cost: { carrots: 5e13, iron: 40000, research: 25000 }, oneTime: true,
    requires: ['invincibleTraining'],
    onCraft: () => { state.crafted.pinnacleGym = true; toast('💪 Pinnacle Gym opened. Mastery feels different now.', true); },
  },
  {
    id: 'buddyHouse', icon: '🐶', img: 'npc_buddy.png', name: 'Adopt Buddy', category: 'pets',
    desc: 'A friendly dog. Earns carrots and runs missions.',
    cost: { carrots: 80000 }, oneTime: true,
    requires: ['dnaSequencer'],
    onCraft: () => {
      state.crafted.buddyHouse = true;
      state.buddy.unlocked = true;
      toast('🐶 Buddy joined the team!', true);
    },
  },
  {
    id: 'nametag', icon: '🏷️', name: 'Bunny Nametag', category: 'pets',
    desc: 'Consumable. Lets you name (or rename) your bunny once per tag.',
    cost: { carrots: 10000 }, oneTime: false, maxOwned: 999,
    requires: [],
    onCraft: () => {
      // Consumable: don't actually track ownership, just trigger the rename flow.
      state.crafted.nametag = 0;
      promptBunnyName();
    },
  },
];

// ====== BUNNY SKINS ======
// Auto-unlocked when their condition is met. Active skin persists across rebirth.
const skins = [
  { id: 'default',    name: 'Pancake Bunny',  desc: 'The original.',                                src: 'bunny.png',           condition: () => true },
  { id: 'cartoon',    name: 'Cartoon Bunny',  desc: 'Unlocked by building the Particle Accelerator.', src: 'bunny_cartoon.png',   condition: () => !!state.crafted.particleAccelerator },
  { id: 'invincible', name: 'Invincible Bunny', desc: 'Unlocked by crossing into the Invincible Dimension.', src: 'bunny_invincible.png', condition: () => state.dimensionsVisited && state.dimensionsVisited.invincible },
  { id: 'butterDawg', name: 'Butter Dawg',  desc: 'Unlocked by entering the Quantum Realm.',          src: 'bunny_butterdawg.png', condition: () => state.dimensionsVisited && state.dimensionsVisited.quantum },
  { id: 'spaceBunny', name: 'Space Bunny',  desc: 'Unlocked by reaching the frost planet Glacio.',     src: 'bunny_space.png',     condition: () => !!state.reachedGlacio },
];
function checkSkinUnlocks() {
  let unlockedAny = false;
  for (const s of skins) {
    if (!state.unlockedSkins[s.id] && s.condition()) {
      state.unlockedSkins[s.id] = true;
      toast(`🐰 Skin unlocked: ${s.name}`, true);
      unlockedAny = true;
    }
  }
  return unlockedAny;
}
function setActiveSkin(id) {
  if (!state.unlockedSkins[id]) return;
  state.activeSkin = id;
  applyActiveSkin();
  renderSkinPicker();
  save();
}
function applyActiveSkin() {
  const skin = skins.find(s => s.id === state.activeSkin) || skins[0];
  const img = document.getElementById('bunny');
  if (img && img.getAttribute('src') !== skin.src) img.setAttribute('src', skin.src);
}

const craftCategories = [
  { id: 'invincible', name: '🌀 Invincible' },
  { id: 'core',     name: 'Core' },
  { id: 'industry', name: '🏭 Industry' },
  { id: 'science',  name: '🔬 Science' },
  { id: 'defense',  name: '🛡️ Defense' },
  { id: 'rockets',  name: '🚀 Rockets' },
  { id: 'farming',  name: '🌱 Farming' },
  { id: 'pets',     name: '🐶 Pets' },
];

// ====== RESEARCH ======
// tier: 0..4. effects applied via getResearchBonus() / calc functions.
const researchNodes = [
  // --- Tier 0 (Earth foundations) ---
  { id: 'basicRocketry', tier: 0, icon: '📘', name: 'Rocket Basics',
    desc: 'Unlocks Fuel Tank, DNA Sequencer, Small Lab, Sun Panel.',
    cost: 60, requires: ['rocketStation'] },
  { id: 'carrotFarming', tier: 0, icon: '🥕', name: 'Farm Basics',
    desc: 'Unlocks Carrot Farm. +20% click power.',
    cost: 45, requires: ['rocketStation'] },
  { id: 'efficientWorkers', tier: 0, icon: '🧰', name: 'Better Helpers',
    desc: 'All auto helpers +25%.',
    cost: 140, requires: ['basicRocketry'] },
  { id: 'sharpClaws', tier: 0, icon: '🐾', name: 'Sharp Claws',
    desc: '+30% click power.',
    cost: 90, requires: ['rocketStation'] },
  { id: 'bigEars', tier: 0, icon: '👂', name: 'Big Ears',
    desc: '+20% auto helpers.',
    cost: 110, requires: ['rocketStation'] },
  { id: 'frenzyTraining', tier: 0, icon: '🥞', name: 'Frenzy Training',
    desc: 'Pancake Frenzy lasts 50% longer and is twice as likely.',
    cost: 200, requires: ['basicRocketry'] },

  // --- Tier 1 (Moon prep) ---
  { id: 'moonTrajectory', tier: 1, icon: '🌙', name: 'Moon Path',
    desc: 'Unlocks the Small Rocket.',
    cost: 200, requires: ['basicRocketry'] },
  { id: 'lightweightAlloys', tier: 1, icon: '🪶', name: 'Light Metal',
    desc: 'Rocket Pad clicks add +2 build progress.',
    cost: 260, requires: ['basicRocketry'] },

  // --- Tier 2 (Moon) ---
  { id: 'advancedRocketry', tier: 2, icon: '📕', name: 'Better Rockets',
    desc: 'Unlocks Iron Maker, Big Lab, Laser Gun, Big Rocket.',
    cost: 700, requires: ['reachedMoon'] },
  { id: 'moonMining', tier: 2, icon: '⛏️', name: 'Moon Mining',
    desc: 'Scrap, fuel and iron +50%.',
    cost: 600, requires: ['reachedMoon'] },
  { id: 'cryoFuel', tier: 2, icon: '❄️', name: 'Cold Fuel',
    desc: 'Fuel +100%.',
    cost: 900, requires: ['advancedRocketry'] },
  { id: 'lunarGeology', tier: 2, icon: '🪨', name: 'Lunar Geology',
    desc: 'Moondust drops doubled on Moon landing. All Moon farms +25%.',
    cost: 800, requires: ['reachedMoon'] },
  { id: 'lowGravityTraining', tier: 2, icon: '🏋️', name: 'Low-Gravity Training',
    desc: '+40% click power.',
    cost: 850, requires: ['reachedMoon'] },

  // --- Tier 3 (Mars prep) ---
  { id: 'marsTrajectory', tier: 3, icon: '🔴', name: 'Mars Path',
    desc: 'Needed for the Big Rocket.',
    cost: 1500, requires: ['advancedRocketry'] },
  { id: 'geneticAlgorithms', tier: 3, icon: '🧪', name: 'DNA Boost',
    desc: 'Sequencer gives +1 extra strand per click.',
    cost: 1200, requires: ['dnaSequencer', 'advancedRocketry'] },

  // --- Tier 4 (Mars and beyond) ---
  { id: 'terraforming', tier: 4, icon: '🌍', name: 'Mars Plants',
    desc: 'Mars Garden +100%. Unlocks Mars Booster.',
    cost: 3000, requires: ['reachedMars'] },
  { id: 'quantumComputing', tier: 4, icon: '🌀', name: 'Super Brain',
    desc: '+25% to everything. Unlocks Power Core.',
    cost: 5000, requires: ['reachedMars'] },
  { id: 'starCharting', tier: 4, icon: '🌠', name: 'Star Maps',
    desc: 'Prestige gives +50% more Star Bits.',
    cost: 4000, requires: ['reachedMars'] },
  { id: 'quantumTravel', tier: 4, icon: '⚛️', name: 'Quantum Travel',
    desc: 'Shrink to a sub-atomic universe. Unlocks the Quantum Realm and the Atom Farm recipe.',
    cost: 6000, requires: ['quantumComputing'] },
  { id: 'belowZeroProtection', tier: 4, icon: '🥶', name: 'Below Zero Protection',
    desc: 'Engineer a cold-rated rocket. Required for Rocket Mk.3 (Glacio launch).',
    cost: 8000, requires: ['quantumTravel'] },
  { id: 'areology', tier: 4, icon: '📜', name: 'Areology',
    desc: 'All Mars buildings & farms +30%.',
    cost: 3500, requires: ['reachedMars'] },
  { id: 'martianMagnetism', tier: 4, icon: '🧲', name: 'Martian Magnetism',
    desc: '+40% auto helpers.',
    cost: 3800, requires: ['reachedMars'] },
  { id: 'phobosSurvey', tier: 4, icon: '🛰️', name: 'Phobos Survey',
    desc: 'Phobos Outpost & Red Iron Mine produce double.',
    cost: 4500, requires: ['reachedMars'] },

  // --- Tier 5 (Dimensional, gated by completing the Particle Accelerator) ---
  { id: 'dimensionalTravel', tier: 5, icon: '🌀', name: 'Dimensional Travel',
    desc: 'Tear a hole between realities. Unlocks travel to the Invincible dimension. Requires all 100 accelerator parts.',
    cost: 50000, requires: ['quantumComputing', 'allAccelPartsBuilt'] },

  // --- Tier 6 (Invincible Dimension research) ---
  { id: 'viltrumiteBiology', tier: 6, icon: '🧬', name: 'Viltrumite Biology',
    desc: 'Click power ×2 globally. Unlocks Hypersonic Strike, World Breaker, Viltrumite Embassy.',
    cost: 80000, requires: ['dimension_invincible'] },
  { id: 'scourgeVirus', tier: 6, icon: '☣️', name: 'Scourge Virus',
    desc: 'Auto helpers ×2 globally. Unlocks Battle Beast Cub, Allen, Robot Production Line.',
    cost: 80000, requires: ['dimension_invincible'] },
  { id: 'transDimensionalTactics', tier: 6, icon: '🗺️', name: 'Trans-Dimensional Tactics',
    desc: 'Quarks per click ×2. Unlocks Black Samson Garage. Helps fight Omni-Man.',
    cost: 100000, requires: ['dimension_invincible'] },
  { id: 'killingSucks', tier: 6, icon: '💔', name: '"Killing Sucks"',
    desc: 'Omni-Man steals 50% less and his HP scales 30% slower. Unlocks Invincible Suit.',
    cost: 150000, requires: ['dimension_invincible'] },
  { id: 'invincibleTraining', tier: 6, icon: '🥋', name: 'Invincible Training',
    desc: 'Unlocks Pinnacle Gym and the Invincible-tier DNA Powers (Glory ⭐ powers).',
    cost: 200000, requires: ['viltrumiteBiology', 'scourgeVirus'] },
];

// ====== ACHIEVEMENTS ======
const achievements = [
  { id: 'a1',  icon: '👆', name: 'First Click',    desc: 'Click the bunny once',         check: s => s.totalClicks >= 1 },
  { id: 'a2',  icon: '💯', name: '100 Clicks',     desc: 'Click 100 times',              check: s => s.totalClicks >= 100 },
  { id: 'a3',  icon: '🔥', name: '1000 Clicks',    desc: 'Click 1,000 times',            check: s => s.totalClicks >= 1000 },
  { id: 'a4',  icon: '🥕', name: 'Carrot Saver',   desc: 'Earn 500 carrots',             check: s => s.totalCarrots >= 500 },
  { id: 'a5',  icon: '🥕', name: 'Carrot Stack',   desc: 'Earn 50,000 carrots',          check: s => s.totalCarrots >= 50000 },
  { id: 'a6',  icon: '🥕', name: 'Carrot Boss',    desc: 'Earn 5,000,000 lifetime',      check: s => s.lifetimeCarrots >= 5e6 },
  { id: 'a7',  icon: '🐰', name: 'Auto Helper',    desc: 'Reach 10 carrots/sec',         check: s => s.perSec >= 10 },
  { id: 'a8',  icon: '🌀', name: 'Auto Master',    desc: 'Reach 100 carrots/sec',        check: s => s.perSec >= 100 },
  { id: 'a9',  icon: '🚀', name: 'Builder',        desc: 'Build the Rocket Pad',         check: s => s.crafted.rocketStation },
  { id: 'a10', icon: '🔬', name: 'Scientist',      desc: 'Finish Rocket Basics',         check: s => s.researched.basicRocketry },
  { id: 'a11', icon: '🌙', name: 'Moon Visit',     desc: 'Reach the Moon',               check: s => s.reachedMoon },
  { id: 'a12', icon: '👽', name: 'First Splat',    desc: 'Beat one alien cat',           check: s => s.raidsDefeated >= 1 },
  { id: 'a13', icon: '🛡️', name: 'Cat Stopper',   desc: 'Beat 25 alien cats',           check: s => s.raidsDefeated >= 25 },
  { id: 'a14', icon: '🔴', name: 'Mars Visit',     desc: 'Reach Mars',                   check: s => s.reachedMars },
  { id: 'a15', icon: '✨', name: 'Reborn',         desc: 'Prestige once',                check: s => s.prestigeCount >= 1 },
  { id: 'a16', icon: '🌟', name: 'Star Saver',     desc: 'Hold 25 Star Bits',            check: s => s.starFragments >= 25 },
  { id: 'a17', icon: '🧬', name: 'Geneticist',     desc: 'Unlock any DNA Power',         check: s => Object.keys(s.powers).length >= 1 },
  { id: 'a18', icon: '🧠', name: 'Mad Scientist',  desc: 'Unlock 5 DNA Powers',          check: s => Object.keys(s.powers).length >= 5 },
  { id: 'a19', icon: '🐶', name: 'Dog Lover',      desc: 'Adopt Buddy',                  check: s => s.buddy.unlocked },
  { id: 'a20', icon: '🏆', name: 'Buddy Master',   desc: 'Train Buddy to Lv 10',         check: s => s.buddy.level >= 10 },
  { id: 'a21', icon: '🧮', name: 'Calculator Crew', desc: 'Build the Particle Accelerator', check: s => !!s.crafted.particleAccelerator },
  { id: 'a22', icon: '⚛️', name: 'Quark Counter',  desc: 'Build any 5 accelerator parts', check: s => Object.keys(s.accelParts || {}).length >= 5 },
  { id: 'a23', icon: '🔧', name: 'Tier 1 Done',    desc: 'Build all 25 Tier-1 parts',     check: s => Object.keys(s.accelParts || {}).length >= 25 },
  { id: 'a24', icon: '🟣', name: 'Antimatter',     desc: 'Capture your first antimatter', check: s => (s.antimatter || 0) >= 1 },
  { id: 'a25', icon: '❄️', name: 'Cryo Master',    desc: 'Build all 25 Tier-2 parts',     check: s => Object.keys(s.accelParts || {}).length >= 50 },
  { id: 'a26', icon: '🕳️', name: 'Singularity',   desc: 'Capture your first singularity',check: s => (s.singularity || 0) >= 1 },
  { id: 'a27', icon: '⚡', name: 'Beam Master',    desc: 'Build all 25 Tier-3 parts',     check: s => Object.keys(s.accelParts || {}).length >= 75 },
  { id: 'a28', icon: '🌀', name: 'Reality Hacker', desc: 'Build all 100 accelerator parts', check: s => Object.keys(s.accelParts || {}).length >= 100 },
  { id: 'a29', icon: '🔮', name: 'Researcher',     desc: 'Unlock Dimensional Travel research', check: s => !!s.researched.dimensionalTravel },
  { id: 'a30', icon: '🌌', name: 'Crossed Over',   desc: 'Enter the Invincible Dimension',   check: s => s.dimension === 'invincible' },
  { id: 'a31', icon: '🔥', name: 'On Fire',        desc: 'Reach a click streak of 50',       check: s => (s.clickStreak || 0) >= 50 },
  { id: 'a32', icon: '⚡', name: 'Combo King',     desc: 'Reach the streak cap (100)',       check: s => (s.clickStreak || 0) >= 100 },
  { id: 'a33', icon: '🐾', name: 'Pack Leader',    desc: 'Own 10 helpers (Pack tier)',       check: s => { let n = 0; for (const u of autoUpgrades) n += (s.upgrades[u.id]||0); return n >= 10; } },
  { id: 'a34', icon: '👑', name: 'Empire Builder', desc: 'Own 200 helpers (Empire tier)',    check: s => { let n = 0; for (const u of autoUpgrades) n += (s.upgrades[u.id]||0); return n >= 200; } },
  { id: 'a35', icon: '⭐', name: 'Mastery I',      desc: 'Reach Mastery ★1 on any upgrade',  check: s => Object.values(s.upgrades||{}).some(n => n >= 25) },
  { id: 'a36', icon: '🌟', name: 'Mastery III',    desc: 'Reach Mastery ★3 on any upgrade',  check: s => Object.values(s.upgrades||{}).some(n => n >= 75) },
  { id: 'a37', icon: '💫', name: 'Mastery V',      desc: 'Reach Mastery ★5 on any upgrade',  check: s => Object.values(s.upgrades||{}).some(n => n >= 125) },
  { id: 'a38', icon: '🦾', name: 'Iron Wrist',     desc: 'Sustain 300 clicks per minute',    check: s => getCPM() >= 300 },
  { id: 'a39', icon: '🌐', name: 'Hive Mind',      desc: 'Own 50 helpers (Hive tier)',       check: s => { let n = 0; for (const u of autoUpgrades) n += (s.upgrades[u.id]||0); return n >= 50; } },
  { id: 'a40', icon: '👑', name: 'Legion',         desc: 'Own 100 helpers (Legion tier)',    check: s => { let n = 0; for (const u of autoUpgrades) n += (s.upgrades[u.id]||0); return n >= 100; } },
  { id: 'a47', icon: '⚛️', name: 'Sub-Atomic',     desc: 'Enter the Quantum Realm',           check: s => s.dimensionsVisited && s.dimensionsVisited.quantum },
  { id: 'a48', icon: '🐶', name: 'Butter Dawg',    desc: 'Unlock the Butter Dawg skin',       check: s => s.unlockedSkins && s.unlockedSkins.butterDawg },
  { id: 'a49', icon: '🧊', name: 'Frostbite',      desc: 'Reach Glacio',                      check: s => !!s.reachedGlacio },
  { id: 'a50', icon: '🚀', name: 'Space Bunny',    desc: 'Unlock the Space Bunny skin',       check: s => s.unlockedSkins && s.unlockedSkins.spaceBunny },
  // Prestige achievements
  { id: 'a51', icon: '⭐', name: 'Ascended',       desc: 'Reach Prestige Level 1',            check: s => (s.prestigeLevel || 0) >= 1 },
  { id: 'a52', icon: '🌟', name: 'Twice Ascended', desc: 'Reach Prestige Level 3',            check: s => (s.prestigeLevel || 0) >= 3 },
  { id: 'a53', icon: '✨', name: 'Halo Bearer',    desc: 'Reach Prestige Level 5',            check: s => (s.prestigeLevel || 0) >= 5 },
  { id: 'a54', icon: '👼', name: 'Apotheosis',     desc: 'Reach Prestige Level 10',           check: s => (s.prestigeLevel || 0) >= 10 },
  { id: 'a55', icon: '⭐', name: 'Reborn × 10',    desc: 'Rebirth 10 times (lifetime)',       check: s => (s.prestigeCount || 0) + ((s.prestigesTotal || 0) * 100) >= 10 || s.prestigeCount >= 10 },
  // Phase 4 — Invincible DLC
  { id: 'a41', icon: '🐱', name: 'Cat Army',       desc: 'Hire 70 Guard Cats',                check: s => (s.crafted.catGuard || 0) >= 70 },
  { id: 'a42', icon: '🤖', name: 'Robo Force',     desc: 'Build the Robo Cat Lab',            check: s => !!s.crafted.roboCatLab },
  { id: 'a43', icon: '💀', name: 'Omni-Slayer',    desc: 'Defeat Omni-Man once',              check: s => (s.omniManDefeated || 0) >= 1 },
  { id: 'a44', icon: '🏆', name: 'Omni-Veteran',   desc: 'Defeat Omni-Man 10 times',          check: s => (s.omniManDefeated || 0) >= 10 },
  { id: 'a45', icon: '⭐', name: 'Glorious',       desc: 'Hold 5 Glory',                      check: s => (s.strands && s.strands.glory || 0) >= 5 },
  { id: 'a46', icon: '🦸', name: 'Invincible',     desc: 'Build the Invincible Suit',         check: s => !!s.crafted.invincibleSuit },
];

// ====== DNA POWERS ======
const dnaPowers = [
  { id: 'strong', icon: '💪', name: 'Strong', desc: '+25% click power',          cost: { red: 5 } },
  { id: 'quick',  icon: '⚡', name: 'Quick',  desc: '+25% auto carrots',          cost: { red: 5 } },
  { id: 'lucky',  icon: '🍀', name: 'Lucky',  desc: '5% chance for x5 click',     cost: { red: 8, blue: 3 } },
  { id: 'wise',   icon: '📚', name: 'Wise',   desc: 'Station +1 extra research',  cost: { red: 10, blue: 4 } },
  { id: 'sharp',  icon: '🧬', name: 'Sharp',  desc: 'Sequencer +1 strand/click',  cost: { blue: 5 } },
  { id: 'tough',  icon: '🛡️', name: 'Tough', desc: 'Aliens steal 40% less',      cost: { blue: 10 } },
  { id: 'brave',  icon: '⚔️', name: 'Brave', desc: 'Raid splat reward x3',        cost: { blue: 12, green: 3 } },
  { id: 'hardy',  icon: '🪖', name: 'Hardy',  desc: 'Raids happen 30% less often', cost: { blue: 15, green: 4 } },
  { id: 'fast',   icon: '🚀', name: 'Fast',   desc: '2x station research',         cost: { green: 8 } },
  { id: 'smart',  icon: '🧠', name: 'Smart',  desc: '+20% global multiplier',      cost: { green: 15, yellow: 2 } },
  { id: 'calm',   icon: '🌙', name: 'Calm',   desc: 'Rebirth gives +50% bits',     cost: { green: 20, yellow: 5 } },
  { id: 'glow',   icon: '✨', name: 'Glow',   desc: 'Upgrade costs -15%',          cost: { yellow: 10 } },
  { id: 'mighty', icon: '🦾', name: 'Mighty', desc: '+50 flat to per-click',       cost: { yellow: 15, green: 10 } },
  { id: 'eternal',icon: '♾️', name: 'Eternal',desc: 'Auto Veteran bonus +50% per rebirth (×1.15 instead of ×1.10)', cost: { yellow: 25 } },
  // Mars-tier — requires the ultra-rare Mars DNA strand (1% drop, Mars only)
  { id: 'marsLord', icon: '🟥', name: 'Mars Lord',  desc: '+100% click power',         cost: { mars: 2 } },
  { id: 'redGiant', icon: '☄️', name: 'Red Giant',  desc: '+100% global multiplier',   cost: { mars: 3, yellow: 5 } },
  { id: 'cosmic',   icon: '🌌', name: 'Cosmic',     desc: 'Sequencer +2 strands/click', cost: { mars: 2, green: 10 } },
  // Invincible-tier — requires Glory ✨ from Omni-Man defeats
  { id: 'punchOut', icon: '🥊', name: 'Punch Out',  desc: '+300% click power',                          cost: { glory: 3 } },
  { id: 'supersonic',icon: '💨', name: 'Supersonic',desc: '+200% auto helpers',                          cost: { glory: 4 } },
  { id: 'reincarnation',icon: '🔄', name: 'Reincarnation', desc: 'Rebirth gives ×2 Star Bits',           cost: { glory: 5, yellow: 5 } },
  { id: 'invulnerable',icon: '🛡️', name: 'Invulnerable', desc: 'Aliens cannot steal carrots',            cost: { glory: 6 } },
  { id: 'beyondMortal',icon: '🌟', name: 'Beyond Mortal', desc: '+500% to global multiplier',            cost: { glory: 10, mars: 2 } },
];

// ====== BUDDY MISSIONS ======
const buddyMissions = [
  { id: 'walk',   icon: '🚶', name: 'Walk',   durationSec: 30,    reward: { carrots: 1000 } },
  { id: 'fetch',  icon: '🎾', name: 'Fetch',  durationSec: 90,    reward: { carrots: 5000 } },
  { id: 'hunt',   icon: '🦴', name: 'Hunt',   durationSec: 240,   reward: { carrots: 25000,    redChance: 1.0, blueChance: 0.3 } },
  { id: 'scout',  icon: '🔭', name: 'Scout',  durationSec: 600,   reward: { carrots: 120000,   blueChance: 1.0, greenChance: 0.25 } },
  { id: 'patrol', icon: '🗺️', name: 'Patrol', durationSec: 1200,  reward: { carrots: 350000,   blueChance: 1.0, greenChance: 0.6, yellowChance: 0.05 } },
  { id: 'quest',  icon: '🏆', name: 'Quest',  durationSec: 1800,  reward: { carrots: 1000000,  greenChance: 1.0, yellowChance: 0.30 } },
  { id: 'legend', icon: '🐉', name: 'Legend', durationSec: 5400,  reward: { carrots: 5000000,  greenChance: 1.0, yellowChance: 0.80 } },
  { id: 'myth',   icon: '🦄', name: 'Myth',   durationSec: 10800, reward: { carrots: 25000000, yellowChance: 1.0, greenChance: 1.0 } },
];

// ====== STATE ======
const defaultState = () => ({
  carrots: 0,
  totalCarrots: 0,
  lifetimeCarrots: 0,
  totalClicks: 0,
  clickStreak: 0,
  bestStreak: 0,
  lastClickAt: 0,
  upgrades: {},
  achievements: {},
  perSec: 0,
  scrap: 0, fuel: 0, research: 0, iron: 0, moondust: 0,
  crafted: {}, researched: {},
  rocketProgress: 0, rocketProgressMax: 150,
  reachedMoon: false, reachedMars: false,
  raiders: [], nextRaidAt: 0,
  raidsDefeated: 0, raidsFailed: 0, carrotsStolen: 0,
  starFragments: 0, prestigeCount: 0,
  // ===== PRESTIGE (different from Rebirth) =====
  // prestigeLevel is the meta-progression number; it grows by spending Rebirths.
  // Each level grants a permanent +50% global multiplier and unlocks new content.
  prestigeLevel: 0,
  prestigesTotal: 0,        // lifetime count, never resets
  strands: { red: 0, blue: 0, green: 0, yellow: 0, mars: 0, glory: 0 },
  powers: {},
  buddy: { unlocked: false, level: 1, mission: null, missionEndsAt: 0, notifiedComplete: false },
  golden: null,        // { x, y, expiresAt }
  nextGoldenAt: 0,
  frenzyUntil: 0,
  goldenClaimed: 0,
  // ===== Particle Accelerator =====
  quarks: 0,
  antimatter: 0,
  singularity: 0,
  accelClicks: 0,
  accelParts: {},      // { partId: true }
  // ===== Dimension =====
  dimension: 'normal',    // 'normal' | 'invincible' | 'quantum'
  dimensionsVisited: {},  // { dimensionId: true }
  // ===== Atoms (Quantum Realm material) =====
  atoms: 0,
  // ===== Glacio (frost planet past Mars) =====
  reachedGlacio: false,
  // ===== Cosmetic =====
  bunnyName: '',
  activeSkin: 'default',          // 'default' | 'cartoon' | 'invincible'
  unlockedSkins: { default: true },
  // ===== Omni-Man (Invincible-dimension boss) =====
  omniMan: null,       // { hp, maxHp, x, y, lastTickAt }
  nextOmniManAt: 0,    // ms timestamp
  omniManDefeated: 0,
});
let state = defaultState();

function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    state = mergeState(JSON.parse(raw));
  } catch (e) { console.warn('Save load failed:', e); }
}
function mergeState(parsed) {
  const fresh = defaultState();
  for (const k of Object.keys(fresh)) {
    if (parsed[k] !== undefined) fresh[k] = parsed[k];
  }
  fresh.upgrades = parsed.upgrades || {};
  fresh.achievements = parsed.achievements || {};
  fresh.crafted = parsed.crafted || {};
  fresh.researched = parsed.researched || {};
  fresh.powers = parsed.powers || {};
  const isPlainObject = v => v && typeof v === 'object' && !Array.isArray(v);
  fresh.accelParts = isPlainObject(parsed.accelParts) ? parsed.accelParts : {};
  fresh.dimensionsVisited = isPlainObject(parsed.dimensionsVisited) ? parsed.dimensionsVisited : {};
  fresh.unlockedSkins = Object.assign({ default: true }, isPlainObject(parsed.unlockedSkins) ? parsed.unlockedSkins : {});
  if (typeof parsed.activeSkin === 'string') fresh.activeSkin = parsed.activeSkin;
  if (['invincible','normal','quantum'].includes(parsed.dimension)) fresh.dimension = parsed.dimension;
  fresh.strands = Object.assign({ red: 0, blue: 0, green: 0, yellow: 0, mars: 0, glory: 0 }, parsed.strands || {});
  fresh.buddy = Object.assign({ unlocked: false, level: 1, mission: null, missionEndsAt: 0, notifiedComplete: false }, parsed.buddy || {});
  fresh.raiders = [];
  // Migrate pre-v6 saves to current spec
  if (!fresh.rocketProgressMax || fresh.rocketProgressMax < 150) fresh.rocketProgressMax = 150;
  // Clear any past-due raid timer so player gets a grace period after long breaks
  fresh.nextRaidAt = 0;
  // Numeric safety against corrupted saves
  for (const k of ['carrots','totalCarrots','lifetimeCarrots','scrap','fuel','iron','research','moondust','starFragments','prestigeCount','rocketProgress','raidsDefeated','raidsFailed','carrotsStolen','totalClicks','goldenClaimed','nextGoldenAt','frenzyUntil','clickStreak','bestStreak','lastClickAt','nextRaidAt','quarks','antimatter','singularity','accelClicks','nextOmniManAt','omniManDefeated','atoms','prestigeLevel','prestigesTotal']) {
    if (typeof fresh[k] !== 'number' || !isFinite(fresh[k]) || fresh[k] < 0) fresh[k] = 0;
  }
  if (typeof fresh.buddy.level !== 'number' || fresh.buddy.level < 1) fresh.buddy.level = 1;
  // catGuard was historically a boolean — migrate to count
  if (fresh.crafted && fresh.crafted.catGuard === true) fresh.crafted.catGuard = 1;
  // If Omni-Man was active at save time, reset his tick timestamp so the first
  // post-reload tick doesn't drain hours of carrots in one frame.
  if (fresh.omniMan && typeof fresh.omniMan === 'object') {
    fresh.omniMan.lastTickAt = Date.now();
  } else {
    fresh.omniMan = null;
  }
  // Drop a stale golden carrot that's already expired (avoids ghost on reload)
  if (fresh.golden && (typeof fresh.golden.expiresAt !== 'number' || fresh.golden.expiresAt < Date.now())) {
    fresh.golden = null;
  }
  return fresh;
}
function save() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    localStorage.setItem(LAST_SEEN_KEY, Date.now().toString());
  } catch (e) { console.warn('Save failed:', e); }
}

// ====== AUDIO ======
const audioState = {
  enabled: localStorage.getItem('bunny_sound') !== '0',
  volume: parseFloat(localStorage.getItem('bunny_volume') || '0.5'),
  pool: [], poolIndex: 0,
};
function initAudio() {
  for (let i = 0; i < 8; i++) {
    const a = new Audio('click.mp3');
    a.preload = 'auto';
    audioState.pool.push(a);
  }
}
function playClick(rateJitter = true) {
  if (!audioState.enabled) return;
  const a = audioState.pool[audioState.poolIndex];
  audioState.poolIndex = (audioState.poolIndex + 1) % audioState.pool.length;
  try {
    a.volume = audioState.volume;
    a.playbackRate = rateJitter ? (0.92 + Math.random() * 0.16) : 1.0;
    a.currentTime = 0;
    a.play().catch(() => {});
  } catch (e) {}
}

// ====== POWER CALCS ======
function hasPower(id) { return !!state.powers[id]; }
function hasResearch(id) { return !!state.researched[id]; }

function getGlobalMultiplier() {
  let m = 1;
  if (state.reachedMoon) m *= 1.30;
  if (state.reachedMars) m *= 1.60;
  m *= (1 + Math.log10(1 + state.prestigeCount) * 0.12);
  m *= (1 + state.starFragments * 0.025);
  m *= getPrestigeBonus();  // Prestige level meta-bonus (+50% per level, ×10 at lv 10)
  if (state.crafted.ascensionShrine) m *= 3.0;
  m *= (1 + (state.crafted.haloEngine || 0) * 0.50);
  if (hasPower('smart')) m *= 1.20;
  if (hasPower('redGiant')) m *= 2.00;
  if (hasPower('beyondMortal')) m *= 6.00;
  m *= (1 + getAccelBonus().globalMult);
  // Invincible-dimension buildings
  if (state.crafted.earthDefenseHQ) m *= 1.50;
  if (state.crafted.guardiansTower) m *= 1.75;
  m *= (1 + (state.crafted.powerplexBattery || 0) * 0.15);
  if (hasResearch('quantumComputing')) m *= 1.25;
  // Solar Panel +1% each, Quantum Core +3% each
  m *= (1 + (state.crafted.solarPanel || 0) * 0.02);
  m *= (1 + (state.crafted.quantumCore || 0) * 0.03);
  // Early-game knick-knacks
  m *= (1 + (state.crafted.storageBasket || 0) * 0.03);
  m *= (1 + (state.crafted.sunflower || 0) * 0.02);
  // Moon + Mars buildings
  m *= (1 + (state.crafted.moondustForge || 0) * 0.08);
  m *= (1 + (state.crafted.dustCollector || 0) * 0.12);
  // Glacio
  if (state.reachedGlacio) m *= 1.90;
  m *= (1 + (state.crafted.glacioObservatory || 0) * 0.25);
  return m;
}
// Mastery: every 25 owned of a single upgrade unlocks a permanent +50% multiplier
// on that one upgrade's contribution. Lv 25 = ×1.5, Lv 50 = ×2.0, Lv 75 = ×2.5...
function getMasteryMult(owned) {
  // Pinnacle Gym adds an extra +25% per tier
  const perTier = state.crafted.pinnacleGym ? 0.75 : 0.50;
  return 1 + Math.floor(owned / 25) * perTier;
}
function getMasteryTier(owned) { return Math.floor(owned / 25); }
function getMasteryWatch() {
  // Return the 3 owned upgrades closest to their next mastery rank
  const list = [];
  for (const u of [...clickUpgrades, ...autoUpgrades]) {
    const owned = state.upgrades[u.id] || 0;
    if (owned === 0) continue;
    const next = (Math.floor(owned / 25) + 1) * 25;
    const toGo = next - owned;
    list.push({ u, owned, next, toGo, tier: getMasteryTier(owned) });
  }
  list.sort((a, b) => a.toGo - b.toGo);
  return list.slice(0, 3);
}

function getPerClick() {
  let base = 1;
  for (const u of clickUpgrades) {
    const owned = state.upgrades[u.id] || 0;
    base += owned * u.power * getMasteryMult(owned);
  }
  if (hasPower('mighty')) base += 50;
  let mult = getGlobalMultiplier();
  if (hasPower('strong')) mult *= 1.25;
  if (hasPower('marsLord')) mult *= 2.00;
  if (hasPower('punchOut')) mult *= 4.00;
  mult *= (1 + getAccelBonus().clickMult);
  if (hasResearch('carrotFarming')) mult *= 1.20;
  if (hasResearch('sharpClaws')) mult *= 1.30;
  if (hasResearch('lowGravityTraining')) mult *= 1.40;
  mult *= (1 + (state.crafted.woodenSpoon || 0) * 0.05);
  mult *= (1 + (state.crafted.redObelisk || 0) * 0.15);
  if (hasResearch('viltrumiteBiology')) mult *= 2.00;
  if (state.crafted.invincibleSuit) mult *= 6.00;
  mult *= (1 + (state.crafted.viltrumiteEmbassy || 0) * 0.50);
  mult *= (1 + (state.crafted.redSpice || 0) * 0.35);
  mult *= (1 + (state.crafted.haloEngine || 0) * 0.50);
  if (Date.now() < state.frenzyUntil) mult *= 2;   // Pancake Frenzy
  return Math.floor(base * mult);
}
function isFrenzy() { return Date.now() < state.frenzyUntil; }
function getAutoOwnedTotal() {
  let n = 0;
  for (const u of autoUpgrades) n += (state.upgrades[u.id] || 0);
  return n;
}
// Long-term auto buffs:
//  - Pack Synergy: every owned auto helper boosts ALL auto helper output by +1%.
//  - Veteran Crew: each prestige multiplies auto helper output by ×1.10 (compound).
// Tiered milestone synergy: each milestone hit adds its bonus permanently while
// you stay at/above that helper count. Replaces the old flat +1% per helper.
const HELPER_SYNERGY_TIERS = [
  { at: 10,  bonus: 0.10, name: 'Pack'      },
  { at: 25,  bonus: 0.15, name: 'Swarm'     },
  { at: 50,  bonus: 0.25, name: 'Hive'      },
  { at: 100, bonus: 0.50, name: 'Legion'    },
  { at: 200, bonus: 1.00, name: 'Empire'    },
  { at: 400, bonus: 2.00, name: 'Galactic'  },
];
function getHelperSynergyBonus() {
  const n = getAutoOwnedTotal();
  let bonus = 0;
  for (const t of HELPER_SYNERGY_TIERS) if (n >= t.at) bonus += t.bonus;
  return bonus;
}
function getAutoBuffMultiplier() {
  const synergy = 1 + getHelperSynergyBonus();
  const veteranBase = hasPower('eternal') ? 1.15 : 1.10;
  const veteran = Math.pow(veteranBase, state.prestigeCount);
  return synergy * veteran;
}

// Per-source /sec breakdown — used by the stats panel
function getPerSecBreakdown() {
  const out = { helpers: 0, farms: 0, buddy: 0 };
  for (const u of autoUpgrades) {
    const owned = state.upgrades[u.id] || 0;
    out.helpers += owned * u.power * getMasteryMult(owned);
  }
  out.helpers *= getAutoBuffMultiplier();
  out.farms += (state.crafted.carrotPatch || 0) * 5;
  out.farms += (state.crafted.carrotFarm  || 0) * 20;
  out.farms += (state.crafted.greenhouse  || 0) * 90 * (hasResearch('lunarGeology') ? 1.25 : 1);
  let marsGardenPerUnit = 50;
  if (hasResearch('terraforming')) marsGardenPerUnit *= 2;
  marsGardenPerUnit *= (1 + (state.crafted.terraformer || 0) * 0.25);
  out.farms += (state.crafted.marsGarden || 0) * marsGardenPerUnit;
  out.farms += (state.crafted.iceGarden || 0) * 900;
  // Farm boosters apply to all farm output
  out.farms *= (1 + (state.crafted.wateringCan || 0) * 0.20);
  out.farms *= (1 + (state.crafted.beeHive || 0) * 0.15);
  out.farms *= (1 + (state.crafted.craterDome || 0) * 0.30);
  out.farms *= (1 + (state.crafted.lunarConservatory || 0) * 0.60);
  out.farms *= (1 + (state.crafted.polarCapHarvester || 0) * 0.35);
  out.buddy = state.buddy.unlocked ? state.buddy.level * 25 : 0;
  let mult = getGlobalMultiplier();
  if (hasPower('quick')) mult *= 1.25;
  if (hasResearch('efficientWorkers')) mult *= 1.25;
  mult *= (1 + getAccelBonus().autoMult);
  out.mult = mult;
  out.totalRaw = out.helpers + out.farms + out.buddy;
  out.total = out.totalRaw * mult;
  return out;
}

function getPerSec() {
  let helperBase = 0;
  for (const u of autoUpgrades) {
    const owned = state.upgrades[u.id] || 0;
    helperBase += owned * u.power * getMasteryMult(owned);
  }
  helperBase *= getAutoBuffMultiplier();
  helperBase *= (1 + getPrestigeHelperBonus());  // Prestige Lv 5+ doubles helpers

  let base = helperBase;
  // Farms (not buffed by auto-helper synergy)
  let farmTotal = 0;
  farmTotal += (state.crafted.carrotPatch || 0) * 5;
  farmTotal += (state.crafted.carrotFarm  || 0) * 20;
  farmTotal += (state.crafted.greenhouse  || 0) * 90 * (hasResearch('lunarGeology') ? 1.25 : 1);
  let marsGardenPerUnit = 50;
  if (hasResearch('terraforming')) marsGardenPerUnit *= 2;
  marsGardenPerUnit *= (1 + (state.crafted.terraformer || 0) * 0.25);
  farmTotal += (state.crafted.marsGarden || 0) * marsGardenPerUnit;
  farmTotal += (state.crafted.iceGarden || 0) * 900;
  farmTotal *= (1 + (state.crafted.wateringCan || 0) * 0.20);
  farmTotal *= (1 + (state.crafted.beeHive || 0) * 0.15);
  // Moon Crater Dome boosts Moon Farms portion (applied to total — close enough)
  farmTotal *= (1 + (state.crafted.craterDome || 0) * 0.30);
  farmTotal *= (1 + (state.crafted.lunarConservatory || 0) * 0.60);
  // Mars Polar Cap Harvester boosts all Mars farms
  farmTotal *= (1 + (state.crafted.polarCapHarvester || 0) * 0.35);
  base += farmTotal;
  base += (state.buddy.unlocked ? state.buddy.level * 25 : 0);
  let mult = getGlobalMultiplier();
  if (hasPower('quick')) mult *= 1.25;
  if (hasPower('supersonic')) mult *= 3.00;
  if (hasResearch('efficientWorkers')) mult *= 1.25;
  if (hasResearch('bigEars')) mult *= 1.20;
  if (hasResearch('martianMagnetism')) mult *= 1.40;
  if (hasResearch('scourgeVirus')) mult *= 2.00;
  if (state.crafted.atomEveReactor) mult *= 3.00;
  mult *= (1 + (state.crafted.astralAviary || 0) * 1.00);
  mult *= (1 + (state.crafted.reanimenLab || 0) * 0.40);
  // Robot Production Line boost scoped only to the Reanimen Bot helper output
  // (handled implicitly because the Bot is part of helperBase; we apply a flat boost here)
  mult *= (1 + (state.crafted.robotProductionLine || 0) * 0.10);
  mult *= (1 + getAccelBonus().autoMult);
  return base * mult;
}
function getResourceMult() {
  let m = 1;
  if (hasResearch('moonMining')) m *= 1.50;
  if (hasResearch('areology')) m *= 1.30;
  m *= (1 + (state.crafted.maulerVat || 0) * 0.25);
  return m;
}
function getScrapPerSec()    { return (state.crafted.scrapKit     || 0) * 0.05 * getResourceMult(); }
function getFuelPerSec()     {
  let m = getResourceMult();
  if (hasResearch('cryoFuel')) m *= 2;
  m *= (1 + (state.crafted.helium3Refinery || 0) * 0.75);
  return (state.crafted.fuelRefinery || 0) * 0.05 * m;
}
function getIronPerSec() {
  let m = getResourceMult();
  const mineBoost = (state.crafted.redIronMine || 0) * 2 * (hasResearch('phobosSurvey') ? 2 : 1);
  m *= (1 + mineBoost);
  return (state.crafted.ironForge || 0) * 0.04 * m;
}
function getAtomsPerSec() {
  // Atom Farms generate atoms over time
  return (state.crafted.atomFarm || 0) * 0.05 * getResourceMult();
}
function getResearchPerSec() {
  // Reduced passive research from 0.06 → 0.04 so research costs more grind, not idle
  let base = state.crafted.rocketStation ? 0.04 : 0;
  base += (state.crafted.labBench || 0) * 0.15;
  base += (state.crafted.particleCollider || 0) * 1;
  base += (state.crafted.gdaOutpost || 0) * 2;
  base += (state.crafted.lunarObservatory || 0) * 3;
  base += (state.crafted.omniwave || 0) * 12;
  base += (state.crafted.phobosOutpost || 0) * 10 * (hasResearch('phobosSurvey') ? 2 : 1);
  base *= (1 + (state.crafted.maulerVat || 0) * 0.25);
  return base;
}
function prestigeMaxBonus() { return state.prestigeCount * 5 + (state.prestigeLevel || 0) * 25; }
function getUpgradeMax(u) { return u.max + prestigeMaxBonus(); }
function getRecipeMax(r) { return r.maxOwned ? r.maxOwned + prestigeMaxBonus() : r.maxOwned; }

// ====== PRESTIGE (different from Rebirth) ======
// Cost in rebirths to ascend to the next prestige level. Triangular-ish growth.
function prestigeLevelCost(level) {
  // To reach lvl 1 needs 10 rebirths; lvl 2 needs 25 total; lvl 3 → 50; lvl 4 → 100; lvl 5 → 175 …
  if (level <= 0) return 10;
  const arr = [10, 25, 50, 100, 175, 280, 425, 625, 900, 1300, 1850, 2600];
  if (level - 1 < arr.length) return arr[level - 1];
  return arr[arr.length - 1] + (level - arr.length) * 800;
}
function canPrestige() {
  return state.prestigeCount >= prestigeLevelCost(state.prestigeLevel + 1 - 1);
}
// What state.prestigeLevel grants:
//   +50% global multiplier per level (applied in getGlobalMultiplier)
//   +25 to every upgrade/recipe max (applied in prestigeMaxBonus above)
//   At lv 1: unlock 'Ascended Bunny' skin (handled in skin condition below)
//   At lv 2: unlock prestige-tier upgrades (handled via 'prestigeLevel>=N' virtual requires)
//   At lv 3: +5% crit chance baseline
//   At lv 5: helpers ×2 baseline
//   At lv 10: everything ×10 baseline (it's earned by then)
function getPrestigeBonus() {
  const L = state.prestigeLevel || 0;
  let mult = 1 + L * 0.5;
  if (L >= 10) mult *= 10;
  return mult;
}
function getPrestigeCritBonus() { return (state.prestigeLevel || 0) >= 3 ? 0.05 : 0; }
function getPrestigeHelperBonus() { return (state.prestigeLevel || 0) >= 5 ? 1.0 : 0; }
function doPrestigeLevel() {
  if (!canPrestige()) {
    toast(`Need ${fmt(prestigeLevelCost(state.prestigeLevel + 1 - 1) - state.prestigeCount)} more Rebirths`);
    return;
  }
  const cost = prestigeLevelCost(state.prestigeLevel + 1 - 1);
  if (!confirm(`Ascend to Prestige ${state.prestigeLevel + 1}?\n\nSpends ${cost} Rebirths.\nYou KEEP: Star Bits, achievements, lifetime stats, this Prestige progress.\nYou LOSE: nothing else right now — the Rebirth count just rewinds.\n\nGrants permanently:\n• +50% global multiplier per Prestige level\n• +25 to every upgrade/recipe max per level\n• Special unlocks at levels 1, 2, 3, 5, and 10`)) return;
  state.prestigeCount -= cost;
  state.prestigeLevel = (state.prestigeLevel || 0) + 1;
  state.prestigesTotal = (state.prestigesTotal || 0) + 1;
  toast(`⭐ ASCENDED to Prestige ${state.prestigeLevel}! Power +${(getPrestigeBonus() - 1) * 100}%`, true);
  checkAchievements();
  render();
  save();
}

function getCostFor(u) {
  const owned = state.upgrades[u.id] || 0;
  let cost = u.baseCost * Math.pow(u.growth, owned);
  if (hasPower('glow')) cost *= 0.85;
  return Math.floor(cost);
}

// ====== PRESTIGE ======
function prestigeReward() {
  // Made ~2x harder: dividing by 4e6 instead of 1e6 means you need 4x the lifetime carrots
  let potential = Math.sqrt(Math.max(0, state.lifetimeCarrots) / 4e6);
  if (hasPower('calm')) potential *= 1.5;
  if (hasResearch('starCharting')) potential *= 1.5;
  potential = Math.floor(potential);
  return Math.max(0, potential - state.starFragments);
}
function doPrestige() {
  const reward = prestigeReward();
  if (reward < 1) { toast('Need more lifetime carrots to prestige.'); return; }
  if (!confirm(`Rebirth for ${reward} ✨ Star Bits?\n\nYou will lose EVERYTHING and start from scratch.\n\nKEEP: ✨ Star Bits, prestige count, achievements, lifetime stats.\nLOSE: everything else — carrots, all resources, every upgrade, every craft (including Rocket Pad, Guard Cat, DNA Sequencer, Buddy, Mars Shield), all research, all DNA Powers, Buddy entirely, Moon and Mars trips.\n\nEach Star Bit gives +2.5% to everything.\nEvery rebirth adds +5 to the max of every upgrade, recipe, and Buddy's max level.`)) return;
  state.starFragments += reward;
  state.prestigeCount += 1;
  state.carrots = 0;
  state.totalCarrots = 0;
  state.scrap = 0;
  state.fuel = 0;
  state.iron = 0;
  state.research = 0;
  state.moondust = 0;
  state.upgrades = {};
  state.crafted = {};
  state.researched = {};
  state.powers = {};
  state.rocketProgress = 0;
  state.reachedMoon = false;
  state.reachedMars = false;
  state.reachedGlacio = false;
  state.atoms = 0;
  state.raiders = [];
  state.nextRaidAt = 0;
  state.strands = { red: 0, blue: 0, green: 0, yellow: 0, mars: 0, glory: 0 };
  state.quarks = 0;
  state.antimatter = 0;
  state.singularity = 0;
  state.accelClicks = 0;
  state.accelParts = {};
  state.dimension = 'normal';
  state.omniMan = null;
  state.nextOmniManAt = 0;
  // Note: dimensionsVisited and bunnyName persist across prestige — permanent identity fields.
  // omniManDefeated is a lifetime stat, not reset.
  state.buddy = { unlocked: false, level: 1, mission: null, missionEndsAt: 0, notifiedComplete: false };
  state.golden = null;
  state.nextGoldenAt = 0;
  state.frenzyUntil = 0;
  const gel = document.getElementById('golden-carrot');
  if (gel) gel.remove();
  document.body.classList.remove('frenzy');
  $('raid-layer').innerHTML = '';
  $('raid-warning').classList.add('hidden');
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  toast(`✨ Reborn! +${reward} Star Bits (total ${state.starFragments})`, true);
  checkAchievements();
  updateBodyClasses();
  save();
  render();
}

// ====== UI ======
const $ = id => document.getElementById(id);

function fmt(n) {
  if (!isFinite(n)) return '∞';
  if (n < 0) return '0';
  if (n < 1000) return (n % 1 === 0 ? n.toString() : n.toFixed(1));
  const units = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];
  let i = 0;
  while (n >= 1000 && i < units.length - 1) { n /= 1000; i++; }
  return n.toFixed(2) + units[i];
}
function fmtTime(sec) {
  sec = Math.max(0, Math.ceil(sec));
  if (sec < 60) return sec + 's';
  const m = Math.floor(sec / 60), s = sec % 60;
  if (m < 60) return `${m}m ${s}s`;
  const h = Math.floor(m / 60), mm = m % 60;
  return `${h}h ${mm}m`;
}
function setText(id, val) {
  const el = $(id);
  if (el && el.textContent !== val) el.textContent = val;
}

function updateBodyClasses() {
  const inv = state.dimension === 'invincible';
  document.body.classList.toggle('invincible-mode', inv);
  // Highest planet wins for visual mode (Glacio > Mars > Moon > Earth).
  document.body.classList.toggle('glacio-mode', !inv && !!state.reachedGlacio);
  document.body.classList.toggle('mars-mode',   !inv && !state.reachedGlacio && !!state.reachedMars);
  document.body.classList.toggle('moon-mode',   !inv && !state.reachedGlacio && !state.reachedMars && !!state.reachedMoon);
}

function render() {
  state.perSec = getPerSec();
  setText('carrots', fmt(state.carrots));
  setText('perClick', fmt(getPerClick()));
  setText('perSec', fmt(state.perSec));
  setText('scrap', fmt(state.scrap));
  setText('fuel', fmt(state.fuel));
  setText('research', fmt(state.research));
  setText('iron', fmt(state.iron));
  setText('moondust', fmt(state.moondust));
  setText('starFragments', fmt(state.starFragments));
  const mult = getGlobalMultiplier();
  setText('mult', '×' + (mult >= 100 ? fmt(mult) : mult.toFixed(2)));
  $('pill-mult').classList.toggle('hidden', mult <= 1.0001);

  $('pill-scrap').classList.toggle('hidden', !state.crafted.rocketStation);
  $('pill-fuel').classList.toggle('hidden', !state.crafted.rocketStation);
  $('pill-research').classList.toggle('hidden', !state.crafted.rocketStation);
  $('pill-iron').classList.toggle('hidden', !state.reachedMoon);
  $('pill-moondust').classList.toggle('hidden', !state.reachedMoon);
  $('pill-stars').classList.toggle('hidden', state.starFragments === 0 && state.prestigeCount === 0);
  $('pill-prestige').classList.toggle('hidden', !(state.prestigeLevel > 0) && state.prestigeCount < 5);
  $('prestigeLevel').textContent = String(state.prestigeLevel || 0);
  const glory = (state.strands && state.strands.glory) || 0;
  $('pill-glory').classList.toggle('hidden', glory === 0 && state.omniManDefeated === 0);
  if (glory >= 0) $('glory').textContent = fmt(glory);

  $('station-area').classList.toggle('hidden', !state.crafted.rocketStation);
  $('tab-btn-research').classList.toggle('hidden', !state.crafted.rocketStation);
  $('sequencer-area').classList.toggle('hidden', !state.crafted.dnaSequencer);
  $('buddy-area').classList.toggle('hidden', !state.buddy.unlocked);

  const canBuildRocketMk1 = state.crafted.rocketStation && state.researched.moonTrajectory && !state.crafted.rocketMk1;
  $('rocket-progress-wrap').classList.toggle('hidden', !canBuildRocketMk1);
  if (canBuildRocketMk1) {
    const pct = Math.min(100, (state.rocketProgress / state.rocketProgressMax) * 100);
    $('rocket-progress-fill').style.width = pct + '%';
    setText('rocket-progress-text', `${Math.floor(state.rocketProgress)} / ${state.rocketProgressMax}`);
  }

  $('launch-btn').classList.toggle('hidden', !(state.crafted.rocketMk1 && !state.reachedMoon));
  $('launch-mars-btn').classList.toggle('hidden', !(state.crafted.rocketMk2 && !state.reachedMars));
  $('launch-glacio-btn').classList.toggle('hidden', !(state.crafted.rocketMk3 && !state.reachedGlacio));
  const qbtn = $('quantum-btn');
  qbtn.classList.toggle('hidden', !hasResearch('quantumTravel'));
  if (state.dimensionsVisited && state.dimensionsVisited.quantum) {
    if (qbtn.textContent !== '⚛️ Re-enter Quantum Realm ⚛️') qbtn.textContent = '⚛️ Re-enter Quantum Realm ⚛️';
  } else {
    if (qbtn.textContent !== '⚛️ Enter Quantum Realm ⚛️') qbtn.textContent = '⚛️ Enter Quantum Realm ⚛️';
  }
  $('pill-atoms').classList.toggle('hidden', state.atoms === 0 && !hasResearch('quantumTravel'));
  $('atoms').textContent = fmt(state.atoms);

  const showPrestige = state.reachedMoon && prestigeReward() >= 1;
  const pBtn = $('prestige-btn');
  pBtn.classList.toggle('hidden', !showPrestige);
  if (showPrestige) pBtn.textContent = `✨ Rebirth (+${fmt(prestigeReward())} ✨) ✨`;
  // Prestige (Ascend) button — appears once you have enough Rebirths
  const plBtn = $('prestige-level-btn');
  if (plBtn) {
    const need = prestigeLevelCost(state.prestigeLevel + 1 - 1);
    const showAscend = state.prestigeCount >= Math.floor(need * 0.6);  // start showing at 60% so you can see it coming
    plBtn.classList.toggle('hidden', !showAscend);
    if (showAscend) {
      const ready = state.prestigeCount >= need;
      plBtn.textContent = ready
        ? `⭐ ASCEND to Prestige ${state.prestigeLevel + 1} ⭐  (${need} ↪ ${state.prestigeCount})`
        : `⭐ Prestige ${state.prestigeLevel + 1}  (${state.prestigeCount} / ${need} Rebirths)`;
      plBtn.disabled = !ready;
      plBtn.style.opacity = ready ? 1 : 0.55;
      plBtn.style.cursor = ready ? 'pointer' : 'not-allowed';
    }
  }

  if (state.crafted.dnaSequencer) renderStrandMini();
  if (state.buddy.unlocked) renderBuddyInline();
  renderAccelerator();
  renderPartsModal();
  renderBunnyName();
  renderStreakChip();
  applyActiveSkin();
  // Dimension UI: button visible once researched and not yet crossed; banner once crossed.
  const canCross = hasResearch('dimensionalTravel') && state.dimension !== 'invincible';
  $('dimension-travel-btn').classList.toggle('hidden', !canCross);
  $('dimension-banner').classList.toggle('hidden', state.dimension !== 'invincible');

  updateBodyClasses();

  // Tab-aware heavy renders: only rebuild the list inside the visible tab.
  // This is the biggest perf win — previously every tick iterated 150+ entries
  // across 5 hidden tabs even though only one was visible.
  renderHelpers();  // helpers row is always visible — stays unconditional
  const activeTabBtn = document.querySelector('.tab.active');
  const activeTab = activeTabBtn ? activeTabBtn.dataset.tab : 'upgrades';
  if (activeTab === 'upgrades') renderUpgrades('tab-upgrades', clickUpgrades);
  else if (activeTab === 'auto') { renderUpgrades('tab-auto', autoUpgrades); renderAutoBuffBanner(); }
  else if (activeTab === 'craft') renderCraft();
  else if (activeTab === 'research') renderResearch();
  else if (activeTab === 'achievements') renderAchievements();
  else if (activeTab === 'settings') {
    renderStatsSummary();
    renderCheatPanel();
    renderSkinPicker();
  }

  // Live updates inside open modals (throttled to avoid DOM rebuild every tick)
  const now = Date.now();
  if (now - lastModalRender > 300) {
    if (!$('dna-modal').classList.contains('hidden')) renderDnaModal();
    if (!$('mission-modal').classList.contains('hidden')) renderMissionModal();
    lastModalRender = now;
  } else if (!$('mission-modal').classList.contains('hidden')) {
    // cheap progress-bar update without full rebuild
    updateMissionBarOnly();
  }
}
let lastModalRender = 0;
function updateMissionBarOnly() {
  if (!state.buddy.mission) return;
  const bar = $('mission-list').querySelector('.mission-card.active .mbar-fill');
  if (!bar) return;
  const m = buddyMissions.find(x => x.id === state.buddy.mission);
  if (!m) return;
  const remaining = Math.max(0, (state.buddy.missionEndsAt - Date.now()) / 1000);
  bar.style.width = (100 - (remaining / m.durationSec) * 100) + '%';
}

function renderStrandMini() {
  const el = $('strand-mini-counts');
  const s = state.strands;
  const html = `<span class="strand-pill red">🔴 ${s.red}</span>` +
               `<span class="strand-pill blue">🔵 ${s.blue}</span>` +
               `<span class="strand-pill green">🟢 ${s.green}</span>` +
               `<span class="strand-pill yellow">🟡 ${s.yellow}</span>` +
               ((s.mars > 0 || state.reachedMars) ? `<span class="strand-pill mars">🟥 ${s.mars}</span>` : '');
  if (el.innerHTML !== html) el.innerHTML = html;
}

function renderBuddyInline() {
  setText('buddy-level', String(state.buddy.level));
  const passive = state.buddy.level * 25;
  setText('buddy-passive', `+${fmt(passive)}/sec`);
  const buddyArea = $('buddy-area');
  let ready = false;
  if (state.buddy.mission) {
    const m = buddyMissions.find(x => x.id === state.buddy.mission);
    const remaining = (state.buddy.missionEndsAt - Date.now()) / 1000;
    ready = remaining <= 0;
    setText('buddy-status', ready
      ? '✨ Mission done! Click Buddy to collect! ✨'
      : `${m ? m.name : 'On mission'} · ${fmtTime(remaining)} left`);
  } else {
    setText('buddy-status', 'Hanging out, ready for a mission.');
  }
  buddyArea.classList.toggle('ready', ready);
}

function renderUpgrades(containerId, list) {
  const container = $(containerId);
  // Build tier sections once
  for (const t of upgradeTiers) {
    let section = container.querySelector(`[data-utier="${t.id}"]`);
    if (!section) {
      section = document.createElement('div');
      section.className = 'craft-section';
      section.dataset.utier = t.id;
      section.innerHTML = `<div class="section-header">${t.name}</div>`;
      container.appendChild(section);
    }
  }
  for (const u of list) {
    const section = container.querySelector(`[data-utier="${u.tier || 'earth'}"]`);
    if (!section) continue;
    let div = section.querySelector(`[data-uid="${u.id}"]`);
    if (!div) {
      div = document.createElement('div');
      div.dataset.uid = u.id;
      const iconHTML = u.img
        ? `<img class="icon-img" src="${u.img}" alt="">`
        : `<div class="icon">${u.icon}</div>`;
      div.innerHTML = `
        ${iconHTML}
        <div class="body">
          <div class="name">${u.name}</div>
          <div class="desc">${u.desc}</div>
          <div class="cost"></div>
        </div>
        <div class="owned"></div>
      `;
      div.addEventListener('click', () => buyUpgrade(u));
      section.appendChild(div);
    }
  }
  // Hide tiers with no visible upgrades (no reqs met AND no owned)
  for (const t of upgradeTiers) {
    const section = container.querySelector(`[data-utier="${t.id}"]`);
    if (!section) continue;
    const anyVisible = list.some(u => (u.tier || 'earth') === t.id &&
      (meetsRequires(u.requires || []) || (state.upgrades[u.id] || 0) > 0));
    section.style.display = anyVisible ? '' : 'none';
  }
  for (const u of list) {
    const owned = state.upgrades[u.id] || 0;
    const cost = getCostFor(u);
    const reqsMet = meetsRequires(u.requires || []);
    const maxVal = getUpgradeMax(u);
    const maxed = owned >= maxVal;
    const affordable = !maxed && state.carrots >= cost;
    const div = container.querySelector(`[data-uid="${u.id}"]`);
    let cls;
    if (!reqsMet) cls = 'upgrade locked';
    else if (maxed) cls = 'upgrade maxed';
    else if (!affordable) cls = 'upgrade locked';
    else cls = 'upgrade affordable';
    if (div.className !== cls) div.className = cls;
    const costTxt = !reqsMet
      ? '🔒 ' + (u.requires||[]).map(prettyName).join(', ')
      : maxed ? 'MAX' : '🥕 ' + fmt(cost);
    const costEl = div.querySelector('.cost');
    if (costEl.textContent !== costTxt) costEl.textContent = costTxt;
    const masteryTier = getMasteryTier(owned);
    const masteryTxt = masteryTier > 0 ? ` ★${masteryTier}` : '';
    const ownedTxt = `${owned}/${maxVal}${masteryTxt}`;
    const ownedEl = div.querySelector('.owned');
    if (ownedEl.textContent !== ownedTxt) ownedEl.textContent = ownedTxt;
    if (masteryTier > 0) ownedEl.title = `Mastery rank ${masteryTier} — this upgrade gives ×${getMasteryMult(owned).toFixed(1)} of its base power`;
  }
}

let _lastStatsRender = 0;
function renderStatsSummary() {
  const el = document.getElementById('stats-summary');
  if (!el) return;
  // Stats panel rebuilds a long HTML string with many fmt() calls — throttle to 500ms.
  const now = Date.now();
  if (now - _lastStatsRender < 500) return;
  _lastStatsRender = now;
  // ===== Global multiplier breakdown =====
  const m = getGlobalMultiplier();
  const ab = getAccelBonus();
  const breakdown = [];
  if (state.reachedMoon)            breakdown.push(['Moon bonus',      '×1.30']);
  if (state.reachedMars)            breakdown.push(['Mars bonus',      '×1.60']);
  if (state.prestigeCount > 0)      breakdown.push(['Rebirth log',     '×' + (1 + Math.log10(1 + state.prestigeCount) * 0.12).toFixed(3)]);
  if (state.starFragments > 0)      breakdown.push(['Star Bits',       '×' + (1 + state.starFragments * 0.025).toFixed(3)]);
  if (hasPower('smart'))            breakdown.push(['DNA · Smart',     '×1.20']);
  if (hasPower('redGiant'))         breakdown.push(['DNA · Red Giant', '×2.00']);
  if (hasResearch('quantumComputing')) breakdown.push(['Quantum Comp.','×1.25']);
  if (state.crafted.solarPanel)     breakdown.push(['Solar Panels',    '×' + (1 + (state.crafted.solarPanel || 0) * 0.02).toFixed(3)]);
  if (state.crafted.quantumCore)    breakdown.push(['Quantum Cores',   '×' + (1 + (state.crafted.quantumCore || 0) * 0.03).toFixed(3)]);
  if (ab.globalMult > 0)            breakdown.push(['Accel. parts',    '×' + (1 + ab.globalMult).toFixed(3)]);
  const breakdownHtml = breakdown.length
    ? breakdown.map(([k, v]) => `<div class="stat-row"><span>${k}</span><b>${v}</b></div>`).join('')
    : '<div class="stat-row" style="font-style:italic; color:#6a5a4e">No multipliers active yet.</div>';

  const html = `
    <h3>📊 Multiplier Breakdown</h3>
    ${breakdownHtml}
    <div class="stat-row" style="margin-top:4px; border-top:1px solid #4a3a5e; padding-top:6px"><span>= Global Multiplier</span><b>×${m >= 100 ? fmt(m) : m.toFixed(3)}</b></div>

    <h3 style="margin-top:12px">⚡ Output</h3>
    <div class="stat-row"><span>Per click (base)</span><b>${fmt(getPerClick())}</b></div>
    <div class="stat-row"><span>Active streak</span><b>${state.clickStreak} (+${Math.round(getStreakBonus() * 100)}%)</b></div>
    <div class="stat-row"><span>Best streak ever</span><b>${state.bestStreak || 0}</b></div>
    <div class="stat-row"><span>Clicks per minute (live)</span><b>${getCPM()}</b></div>
    <div class="stat-row"><span>Per second</span><b>${fmt(getPerSec())}</b></div>
    <div class="stat-row"><span>Click → Auto ratio</span><b>${getPerSec() > 0 ? (getPerClick() / getPerSec()).toFixed(2) : '∞'}</b></div>

    <h3 style="margin-top:12px">📡 Income Sources (/sec)</h3>
    ${(() => {
      const b = getPerSecBreakdown();
      const rows = [];
      if (b.helpers > 0) rows.push(['Helpers (× synergy)', fmt(b.helpers * b.mult), (b.helpers/b.totalRaw*100).toFixed(0)]);
      if (b.farms > 0)   rows.push(['Farms',               fmt(b.farms   * b.mult), (b.farms/b.totalRaw*100).toFixed(0)]);
      if (b.buddy > 0)   rows.push(['Buddy',               fmt(b.buddy   * b.mult), (b.buddy/b.totalRaw*100).toFixed(0)]);
      if (rows.length === 0) return `<div class="stat-row" style="font-style:italic; color:#6a5a4e">No passive income yet.</div>`;
      return rows.map(([k, v, pct]) => `<div class="stat-row"><span>${k}</span><b>${v} <span style="opacity:0.55; font-size:0.85em">(${pct}%)</span></b></div>`).join('');
    })()}

    <h3 style="margin-top:12px">⭐ Mastery Watch</h3>
    ${(() => {
      const w = getMasteryWatch();
      if (w.length === 0) return `<div class="stat-row" style="font-style:italic; color:#6a5a4e">No upgrades owned yet.</div>`;
      return w.map(m => `<div class="stat-row"><span>${m.u.icon} ${m.u.name} <span style="opacity:0.6">★${m.tier}</span></span><b>${m.owned} → ${m.next} (${m.toGo} to go)</b></div>`).join('');
    })()}

    <h3 style="margin-top:12px">🐾 Helper Synergy</h3>
    <div class="stat-row"><span>Helpers owned</span><b>${getAutoOwnedTotal()}</b></div>
    <div class="stat-row"><span>Synergy bonus</span><b>+${Math.round(getHelperSynergyBonus() * 100)}%</b></div>
    ${HELPER_SYNERGY_TIERS.map(t => {
      const got = getAutoOwnedTotal() >= t.at;
      return `<div class="stat-row" style="${got ? 'color:#80c870' : 'color:#6a5a4e'}"><span>${got ? '✓' : '○'} ${t.name} (${t.at})</span><b>+${Math.round(t.bonus * 100)}%</b></div>`;
    }).join('')}

    <h3 style="margin-top:12px">📜 Lifetime</h3>
    <div class="stat-row"><span>Lifetime carrots</span><b>${fmt(state.lifetimeCarrots)}</b></div>
    <div class="stat-row"><span>Total bunny clicks</span><b>${fmt(state.totalClicks)}</b></div>
    <div class="stat-row"><span>Accelerator clicks</span><b>${fmt(state.accelClicks || 0)}</b></div>
    <div class="stat-row"><span>Rebirths</span><b>${state.prestigeCount}</b></div>
    <div class="stat-row"><span>Star Bits held</span><b>${fmt(state.starFragments)}</b></div>

    <h3 style="margin-top:12px">👽 Combat</h3>
    <div class="stat-row"><span>Aliens defeated</span><b>${state.raidsDefeated}</b></div>
    <div class="stat-row"><span>Carrots stolen</span><b>${fmt(state.carrotsStolen)}</b></div>
    <div class="stat-row"><span>Golden carrots caught</span><b>${state.goldenClaimed || 0}</b></div>

    <h3 style="margin-top:12px">🧬 Progression</h3>
    <div class="stat-row"><span>DNA powers owned</span><b>${Object.keys(state.powers).length} / ${dnaPowers.length}</b></div>
    <div class="stat-row"><span>Accelerator parts</span><b>${partsBuiltCount()} / 100</b></div>
    <div class="stat-row"><span>Dimension</span><b>${state.dimension === 'invincible' ? '🌀 Invincible' : '🌍 Normal'}</b></div>
  `;
  if (el.dataset.last !== html) {
    el.innerHTML = html;
    el.dataset.last = html;
  }
}

function renderAutoBuffBanner() {
  const banner = $('auto-buff-banner');
  if (!banner) return;
  const owned = getAutoOwnedTotal();
  const synergy = getHelperSynergyBonus();
  const veteranBase = hasPower('eternal') ? 1.15 : 1.10;
  const veteran = Math.pow(veteranBase, state.prestigeCount) - 1;
  const total = (1 + synergy) * (1 + veteran) - 1;
  if (owned === 0 && state.prestigeCount === 0) {
    banner.classList.add('hidden');
    return;
  }
  // Show which tier the player just unlocked and how far to the next
  const unlocked = HELPER_SYNERGY_TIERS.filter(t => owned >= t.at);
  const next = HELPER_SYNERGY_TIERS.find(t => owned < t.at);
  const currentTier = unlocked.length ? unlocked[unlocked.length - 1].name : '—';
  const tierDots = HELPER_SYNERGY_TIERS.map(t => {
    const got = owned >= t.at;
    return `<span title="${t.name} · at ${t.at} helpers · +${Math.round(t.bonus * 100)}%" style="color:${got ? '#80c870' : '#5a5a6e'}">●</span>`;
  }).join('');
  banner.classList.remove('hidden');
  banner.innerHTML =
    `<b>🐾 Pack Buffs:</b> ` +
    `<span title="Milestone bonuses: 10/25/50/100/200/400 helpers">Synergy +${Math.round(synergy * 100)}% [${currentTier}]</span> · ` +
    `<span title="×${veteranBase.toFixed(2)} per prestige">Veteran +${Math.round(veteran * 100)}%</span> · ` +
    `<b>Total ×${(1 + total).toFixed(2)}</b> ` +
    `<span style="margin-left:6px; letter-spacing:2px">${tierDots}</span>` +
    (next ? `<div style="font-size:0.82em; margin-top:3px; opacity:0.75">Next tier: <b>${next.name}</b> at ${next.at} helpers (+${Math.round(next.bonus * 100)}%) — ${next.at - owned} to go</div>` : '');
}

function renderHelpers() {
  const row = $('helpers-row');
  for (const u of autoUpgrades) {
    if (!u.img) continue;
    let wrap = row.querySelector(`[data-uid="${u.id}"]`);
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'helper-chip';
      wrap.dataset.uid = u.id;
      wrap.innerHTML = `<img src="${u.img}" alt=""><span class="helper-count"></span>`;
      row.appendChild(wrap);
    }
    const owned = state.upgrades[u.id] || 0;
    const shouldShow = owned > 0;
    const isShown = wrap.style.display !== 'none';
    if (shouldShow !== isShown) wrap.style.display = shouldShow ? '' : 'none';
    if (shouldShow) {
      wrap.title = `${u.name} × ${owned}`;
      const c = wrap.querySelector('.helper-count');
      if (c.textContent !== String(owned)) c.textContent = String(owned);
    }
  }
}

function meetsRequires(reqs) {
  for (const r of reqs) {
    if (state.crafted[r]) continue;
    if (state.researched[r]) continue;
    if (state[r] === true) continue;
    // Virtual requirements (computed from world state, not stored as flags)
    if (r === 'allAccelPartsBuilt' && partsBuiltCount() >= 100) continue;
    if (r === 'dimension_invincible' && state.dimension === 'invincible') continue;
    if (r === 'reachedGlacio' && state.reachedGlacio) continue;
    if (r === 'quantumVisited' && state.dimensionsVisited && state.dimensionsVisited.quantum) continue;
    // Prestige-level gates: 'prestigeLv1', 'prestigeLv2', ... 'prestigeLv10'
    if (r.startsWith('prestigeLv')) {
      const need = parseInt(r.slice('prestigeLv'.length), 10);
      if (!isNaN(need) && (state.prestigeLevel || 0) >= need) continue;
    }
    return false;
  }
  return true;
}
function costString(cost) {
  const icons = { carrots: '🥕', scrap: '🔩', fuel: '⛽', research: '🔬', iron: '⛓️',
                  moondust: '🌙', starFragments: '✨',
                  quarks: '⚛️', antimatter: '🟣', singularity: '🕳️', atoms: '☢️',
                  red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡', mars: '🟥', glory: '⭐' };
  return Object.entries(cost).map(([k, v]) => `${icons[k] || ''} ${fmt(v)}`).join('  ');
}
function canAfford(cost) {
  for (const [k, v] of Object.entries(cost)) if ((state[k] || 0) < v) return false;
  return true;
}
function pay(cost) { for (const [k, v] of Object.entries(cost)) state[k] = (state[k] || 0) - v; }

function canAffordStrands(cost) {
  for (const [k, v] of Object.entries(cost)) if ((state.strands[k] || 0) < v) return false;
  return true;
}
function payStrands(cost) {
  for (const [k, v] of Object.entries(cost)) state.strands[k] = (state.strands[k] || 0) - v;
}

function renderCraft() {
  const container = $('tab-craft');
  // Build category sections once
  for (const cat of craftCategories) {
    let section = container.querySelector(`[data-cat="${cat.id}"]`);
    if (!section) {
      section = document.createElement('div');
      section.className = 'craft-section';
      section.dataset.cat = cat.id;
      section.innerHTML = `<div class="section-header">${cat.name}</div>`;
      container.appendChild(section);
    }
  }
  for (const r of recipes) {
    const section = container.querySelector(`[data-cat="${r.category || 'core'}"]`);
    if (!section) continue;
    let div = section.querySelector(`[data-rid="${r.id}"]`);
    if (!div) {
      div = document.createElement('div');
      div.dataset.rid = r.id;
      const iconHTML = r.img
        ? `<img class="icon-img" src="${r.img}" alt="">`
        : `<div class="icon">${r.icon}</div>`;
      div.innerHTML = `
        ${iconHTML}
        <div class="body">
          <div class="name">${r.name}</div>
          <div class="desc">${r.desc}</div>
          <div class="cost"></div>
        </div>
        <div class="owned"></div>
      `;
      div.addEventListener('click', () => craftRecipe(r));
      section.appendChild(div);
    }
  }
  // Hide empty sections (when every recipe in it is locked AND requirements unmet for all)
  for (const cat of craftCategories) {
    const section = container.querySelector(`[data-cat="${cat.id}"]`);
    if (!section) continue;
    const anyVisible = recipes.some(r => (r.category || 'core') === cat.id &&
      (meetsRequires(r.requires) || state.crafted[r.id]));
    section.style.display = anyVisible ? '' : 'none';
  }
  for (const r of recipes) {
    const owned = state.crafted[r.id] || 0;
    const built = r.oneTime ? !!owned : false;
    const recipeMax = getRecipeMax(r);
    const maxed = !r.oneTime && recipeMax && owned >= recipeMax;
    const reqsMet = meetsRequires(r.requires);
    const affordable = canAfford(r.cost);
    const div = container.querySelector(`[data-rid="${r.id}"]`);
    let cls = 'upgrade';
    if (built || maxed) cls += ' completed';
    else if (!reqsMet || !affordable) cls += ' locked';
    else cls += ' affordable';
    if (div.className !== cls) div.className = cls;
    const statusLine = built
      ? 'BUILT ✓'
      : maxed
        ? 'MAX BUILT'
        : !reqsMet
          ? '🔒 ' + r.requires.map(prettyName).join(', ')
          : costString(r.cost);
    const costEl = div.querySelector('.cost');
    if (costEl.textContent !== statusLine) costEl.textContent = statusLine;
    const ownedTxt = r.oneTime ? (built ? '✓' : '') : (owned + (recipeMax ? '/' + recipeMax : ''));
    const ownedEl = div.querySelector('.owned');
    if (ownedEl.textContent !== ownedTxt) ownedEl.textContent = ownedTxt;
  }
}

function renderResearch() {
  const container = $('tab-research');
  let lockNote = container.querySelector('#research-lock-note');
  if (!lockNote) {
    lockNote = document.createElement('div');
    lockNote.className = 'coming-soon';
    lockNote.id = 'research-lock-note';
    lockNote.textContent = 'Build the Rocket Pad first.';
    container.appendChild(lockNote);
  }
  const tierNames = ['Tier 0 · Earth', 'Tier 1 · Moon Prep', 'Tier 2 · Moon', 'Tier 3 · Mars Prep', 'Tier 4 · Mars', 'Tier 5 · Dimensional'];
  for (let t = 0; t < tierNames.length; t++) {
    let section = container.querySelector(`[data-tier="${t}"]`);
    if (!section) {
      section = document.createElement('div');
      section.className = 'craft-section';
      section.dataset.tier = t;
      section.innerHTML = `<div class="section-header">${tierNames[t]}</div>`;
      container.appendChild(section);
    }
  }
  for (const n of researchNodes) {
    const section = container.querySelector(`[data-tier="${n.tier || 0}"]`);
    if (!section) continue;
    let div = section.querySelector(`[data-rsid="${n.id}"]`);
    if (!div) {
      div = document.createElement('div');
      div.dataset.rsid = n.id;
      div.innerHTML = `
        <div class="icon">${n.icon}</div>
        <div class="body">
          <div class="name">${n.name}</div>
          <div class="desc">${n.desc}</div>
          <div class="cost"></div>
        </div>
        <div class="owned"></div>
      `;
      div.addEventListener('click', () => doResearch(n));
      section.appendChild(div);
    }
  }
  const stationBuilt = !!state.crafted.rocketStation;
  lockNote.style.display = stationBuilt ? 'none' : '';
  // Hide tier sections with no visible nodes
  for (let t = 0; t < tierNames.length; t++) {
    const section = container.querySelector(`[data-tier="${t}"]`);
    if (!section) continue;
    const anyVisible = stationBuilt && researchNodes.some(n => (n.tier || 0) === t &&
      (meetsRequires(n.requires) || hasResearch(n.id)));
    section.style.display = anyVisible ? '' : 'none';
  }
  for (const n of researchNodes) {
    const div = container.querySelector(`[data-rsid="${n.id}"]`);
    if (!div) continue;
    div.style.display = stationBuilt ? '' : 'none';
    const done = !!state.researched[n.id];
    const reqsMet = meetsRequires(n.requires);
    const affordable = state.research >= n.cost;
    let cls = 'upgrade';
    if (done) cls += ' completed';
    else if (!reqsMet || !affordable) cls += ' locked';
    else cls += ' affordable';
    if (div.className !== cls) div.className = cls;
    const statusLine = done
      ? 'DONE ✓'
      : !reqsMet
        ? '🔒 ' + n.requires.map(prettyName).join(', ')
        : `🔬 ${fmt(state.research)} / ${fmt(n.cost)}`;
    const costEl = div.querySelector('.cost');
    if (costEl.textContent !== statusLine) costEl.textContent = statusLine;
    const ownedTxt = done ? '✓' : '';
    const ownedEl = div.querySelector('.owned');
    if (ownedEl.textContent !== ownedTxt) ownedEl.textContent = ownedTxt;
  }
}

function prettyName(id) {
  const virtuals = {
    reachedMoon: 'Reach the Moon',
    reachedMars: 'Reach Mars',
    reachedGlacio: 'Reach Glacio',
    quantumVisited: 'Enter the Quantum Realm',
    allAccelPartsBuilt: 'Build all 100 accelerator parts',
    dimension_invincible: 'Cross into the Invincible Dimension',
  };
  if (virtuals[id]) return virtuals[id];
  if (id.startsWith('prestigeLv')) {
    const n = parseInt(id.slice('prestigeLv'.length), 10);
    if (!isNaN(n)) return `Reach Prestige Level ${n}`;
  }
  const r = recipes.find(x => x.id === id);
  if (r) return r.name;
  const n = researchNodes.find(x => x.id === id);
  if (n) return n.name;
  return id;
}

function renderAchievements() {
  const container = $('tab-achievements');
  let summary = container.querySelector('#ach-summary');
  if (!summary) {
    summary = document.createElement('div');
    summary.className = 'coming-soon';
    summary.id = 'ach-summary';
    container.appendChild(summary);
  }
  for (const a of achievements) {
    if (!container.querySelector(`[data-aid="${a.id}"]`)) {
      const div = document.createElement('div');
      div.dataset.aid = a.id;
      div.className = 'achievement locked';
      div.innerHTML = `
        <div class="icon">${a.icon}</div>
        <div>
          <div class="name">${a.name}</div>
          <div class="desc">${a.desc}</div>
        </div>
      `;
      container.appendChild(div);
    }
  }
  let count = 0;
  for (const a of achievements) if (state.achievements[a.id]) count++;
  const txt = `${count} / ${achievements.length} unlocked`;
  if (summary.textContent !== txt) summary.textContent = txt;
  for (const a of achievements) {
    const div = container.querySelector(`[data-aid="${a.id}"]`);
    const newClass = 'achievement ' + (state.achievements[a.id] ? 'unlocked' : 'locked');
    if (div.className !== newClass) div.className = newClass;
  }
}

function buyUpgrade(u) {
  if (!meetsRequires(u.requires || [])) { toast('Locked'); return; }
  const owned = state.upgrades[u.id] || 0;
  if (owned >= getUpgradeMax(u)) return;
  const cost = getCostFor(u);
  if (state.carrots < cost) { toast('Not enough carrots!'); return; }
  state.carrots -= cost;
  state.upgrades[u.id] = owned + 1;
  playClick(false);
  toast(`Bought ${u.name} (${owned + 1})`);
  checkAchievements();
  render();
  save();
}

function promptBunnyName() {
  const current = state.bunnyName || '';
  const next = prompt('Name your bunny (max 24 characters):', current);
  if (next === null) return;  // cancelled
  // Strip control chars, trim, cap length. Allow letters/numbers/punctuation/emoji.
  const cleaned = next.replace(/[\x00-\x1f\x7f]/g, '').trim().slice(0, 24);
  state.bunnyName = cleaned;
  if (cleaned) toast(`🏷️ Bunny renamed to "${cleaned}"`, true);
  else toast('🏷️ Bunny name cleared');
  renderBunnyName();
  save();
}
let _lastShownStreak = 0;
function renderStreakChip() {
  const chip = document.getElementById('streak-chip');
  if (!chip) return;
  const s = state.clickStreak;
  const visible = s >= 5;
  chip.classList.toggle('hidden', !visible);
  if (!visible) { _lastShownStreak = 0; return; }
  document.getElementById('streak-count').textContent = s;
  document.getElementById('streak-bonus').textContent = '+' + Math.round(getStreakBonus() * 100) + '%';
  // Tier color: 5-24 base, 25-49 tier-2, 50-99 tier-3, 100 tier-max
  chip.classList.toggle('tier-2',   s >= 25 && s < 50);
  chip.classList.toggle('tier-3',   s >= 50 && s < 100);
  chip.classList.toggle('tier-max', s >= 100);
  // Bump on each new click
  if (s !== _lastShownStreak) {
    chip.classList.remove('click-bump');
    void chip.offsetWidth;
    chip.classList.add('click-bump');
    _lastShownStreak = s;
  }
}

// ====== CHEAT MENU (sentinel-file gated) ======
// Activates only if 21467.ggnp is reachable. On file:// URLs this depends on
// the browser's CORS policy for local files; works reliably under any HTTP server.
let cheatsEnabled = false;
// Owner IPs that automatically get the debug menu — keyed off api.ipify.org lookup.
const CHEAT_IPS = ['71.210.15.78'];

function probeCheatFile() {
  // URL-param fallback for cases where the script-tag probe still blocks
  if (location.search.includes('21467ggnp') || location.hash.includes('21467ggnp')) {
    cheatsEnabled = true;
    renderCheatPanel();
    return;
  }
  // 1) Try the sentinel-file probe (works on local source-file copies)
  const probe = document.createElement('script');
  probe.src = '21467.ggnp?t=' + Date.now();
  probe.async = true;
  probe.onload  = () => { cheatsEnabled = true; renderCheatPanel(); probe.remove(); };
  probe.onerror = () => { probe.remove(); };
  document.head.appendChild(probe);
  // 2) Try the IP probe (works in the packaged .exe and on any device on the owner's network)
  probeCheatIP();
}
async function probeCheatIP() {
  try {
    const r = await fetch('https://api.ipify.org?format=text', { cache: 'no-store' });
    if (!r.ok) return;
    const ip = (await r.text()).trim();
    if (CHEAT_IPS.includes(ip)) {
      cheatsEnabled = true;
      renderCheatPanel();
    }
  } catch (e) { /* offline, blocked, or service down — fail silently */ }
}

const cheatResources = [
  { key: 'carrots',      icon: '🥕', name: 'Carrots',     storage: 'state' },
  { key: 'scrap',        icon: '🔩', name: 'Scrap',       storage: 'state' },
  { key: 'fuel',         icon: '⛽', name: 'Fuel',        storage: 'state' },
  { key: 'iron',         icon: '⛓️', name: 'Iron',        storage: 'state' },
  { key: 'research',     icon: '🔬', name: 'Research',    storage: 'state' },
  { key: 'moondust',     icon: '🌙', name: 'Moondust',    storage: 'state' },
  { key: 'starFragments',icon: '✨', name: 'Star Bits',   storage: 'state' },
  { key: 'quarks',       icon: '⚛️', name: 'Quarks',      storage: 'state' },
  { key: 'antimatter',   icon: '🟣', name: 'Antimatter',  storage: 'state' },
  { key: 'singularity',  icon: '🕳️', name: 'Singularity', storage: 'state' },
  { key: 'red',          icon: '🔴', name: 'Red Strand',  storage: 'strands' },
  { key: 'blue',         icon: '🔵', name: 'Blue Strand', storage: 'strands' },
  { key: 'green',        icon: '🟢', name: 'Green Strand',storage: 'strands' },
  { key: 'yellow',       icon: '🟡', name: 'Yellow Strand',storage: 'strands' },
  { key: 'mars',         icon: '🟥', name: 'Mars Strand', storage: 'strands' },
  { key: 'glory',        icon: '⭐', name: 'Glory',       storage: 'strands' },
];
function cheatAdd(res, amt) {
  if (!cheatsEnabled || !isFinite(amt)) return;
  if (res.storage === 'state') {
    state[res.key] = (state[res.key] || 0) + amt;
    if (res.key === 'carrots') {
      state.totalCarrots += amt;
      state.lifetimeCarrots += amt;
    }
  } else if (res.storage === 'strands') {
    state.strands[res.key] = (state.strands[res.key] || 0) + amt;
  }
  toast(`+${fmt(amt)} ${res.icon} ${res.name}`);
  checkAchievements();
  render();
  save();
}
function cheatAction(label, fn) {
  fn();
  toast(`🔧 ${label}`);
  checkAchievements();
  render();
  save();
}
function renderCheatPanel() {
  const panel = document.getElementById('cheat-panel');
  if (!panel) return;
  panel.classList.toggle('hidden', !cheatsEnabled);
  if (!cheatsEnabled) return;
  const settingsTab = document.getElementById('tab-settings');
  if (!settingsTab || settingsTab.classList.contains('hidden')) return;
  const grid = document.getElementById('cheat-grid');
  if (grid.dataset.built !== '1') {
    grid.dataset.built = '1';
    grid.innerHTML = cheatResources.map(r => `
      <div class="cheat-row">
        <span class="cheat-label">${r.icon} ${r.name}</span>
        <input type="number" class="cheat-input" data-cheat-key="${r.key}" data-cheat-storage="${r.storage}" placeholder="amount" min="0">
        <button class="cheat-add" data-cheat-key="${r.key}" data-cheat-storage="${r.storage}">Add</button>
      </div>
    `).join('');
    grid.querySelectorAll('.cheat-add').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.cheatKey;
        const storage = btn.dataset.cheatStorage;
        const res = cheatResources.find(r => r.key === key && r.storage === storage);
        const input = grid.querySelector(`.cheat-input[data-cheat-key="${key}"][data-cheat-storage="${storage}"]`);
        const amt = Math.floor(Number(input.value) || 0);
        if (amt > 0) cheatAdd(res, amt);
      });
    });
    const actions = document.getElementById('cheat-actions');
    actions.innerHTML = `
      <button class="cheat-action" data-action="unlockAll">Unlock all achievements</button>
      <button class="cheat-action" data-action="allParts">Build all 100 accelerator parts</button>
      <button class="cheat-action" data-action="maxUpgrades">Max every upgrade</button>
      <button class="cheat-action" data-action="reachMoon">Reach Moon</button>
      <button class="cheat-action" data-action="reachMars">Reach Mars</button>
      <button class="cheat-action" data-action="crossInvincible">Cross to Invincible Dimension</button>
      <button class="cheat-action" data-action="unlockAllSkins">Unlock all skins</button>
      <button class="cheat-action" data-action="omniManNow">Spawn Omni-Man now</button>
    `;
    actions.querySelectorAll('.cheat-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const a = btn.dataset.action;
        if (a === 'unlockAll')        cheatAction('Achievements unlocked',  () => { for (const ach of achievements) state.achievements[ach.id] = true; });
        else if (a === 'allParts')    cheatAction('All accelerator parts',  () => { for (const p of accelParts) state.accelParts[p.id] = true; });
        else if (a === 'maxUpgrades') cheatAction('All upgrades maxed',     () => { for (const u of [...clickUpgrades, ...autoUpgrades]) state.upgrades[u.id] = getUpgradeMax(u); });
        else if (a === 'reachMoon')   cheatAction('Reached Moon',           () => { state.reachedMoon = true; });
        else if (a === 'reachMars')   cheatAction('Reached Mars',           () => { state.reachedMoon = true; state.reachedMars = true; });
        else if (a === 'crossInvincible') cheatAction('Crossed to Invincible', () => { state.dimension = 'invincible'; state.dimensionsVisited.invincible = true; updateBodyClasses(); });
        else if (a === 'unlockAllSkins')  cheatAction('All skins unlocked', () => { for (const s of skins) state.unlockedSkins[s.id] = true; });
        else if (a === 'omniManNow')      cheatAction('Omni-Man spawned',   () => { if (state.dimension !== 'invincible') { state.dimension = 'invincible'; state.dimensionsVisited.invincible = true; updateBodyClasses(); } state.nextOmniManAt = Date.now(); state.omniMan = null; });
      });
    });
  }
}

function renderSkinPicker() {
  const el = document.getElementById('skin-picker');
  if (!el) return;
  // Skip if the Settings tab isn't visible — no point rebuilding hidden DOM
  // AND no point destroying card elements the user might be trying to click.
  const settingsTab = document.getElementById('tab-settings');
  if (!settingsTab || settingsTab.classList.contains('hidden')) return;
  // Idempotent fingerprint so the picker only rebuilds when the data changes.
  const fingerprint = state.activeSkin + '|' + skins.map(s => (state.unlockedSkins[s.id] ? '1' : '0')).join('');
  if (el.dataset.last === fingerprint) return;
  el.dataset.last = fingerprint;
  el.innerHTML = '';
  for (const s of skins) {
    const unlocked = !!state.unlockedSkins[s.id];
    const active = state.activeSkin === s.id;
    const card = document.createElement('div');
    card.className = 'skin-card' + (active ? ' active' : '') + (unlocked ? '' : ' locked');
    card.innerHTML = `
      <img src="${s.src}" alt="${s.name}" draggable="false"${unlocked ? '' : ' style="filter:grayscale(1) brightness(0.4)"'}>
      <div class="skin-info">
        <div class="skin-name">${s.name}</div>
        <div class="skin-desc">${unlocked ? s.desc : '🔒 ' + s.desc}</div>
      </div>
      <div class="skin-status">${active ? '✓ ACTIVE' : (unlocked ? 'EQUIP' : 'LOCKED')}</div>
    `;
    if (unlocked && !active) card.addEventListener('click', () => setActiveSkin(s.id));
    el.appendChild(card);
  }
}

function renderBunnyName() {
  let el = document.getElementById('bunny-name-tag');
  const name = state.bunnyName;
  if (!name) { if (el) el.remove(); return; }
  if (!el) {
    el = document.createElement('div');
    el.id = 'bunny-name-tag';
    const wrap = $('bunny-wrap');
    wrap.parentNode.insertBefore(el, wrap);
  }
  el.textContent = '🏷️ ' + name;
}

function craftRecipe(r) {
  if (!meetsRequires(r.requires)) { toast('Locked'); return; }
  if (r.oneTime && state.crafted[r.id]) return;
  if (!r.oneTime && r.maxOwned && (state.crafted[r.id] || 0) >= getRecipeMax(r)) return;
  if (!canAfford(r.cost)) { toast('Not enough resources'); return; }
  pay(r.cost);
  if (r.oneTime) state.crafted[r.id] = true;
  else state.crafted[r.id] = (state.crafted[r.id] || 0) + 1;
  if (typeof r.onCraft === 'function') r.onCraft();
  else toast(`Built ${r.name}`);
  playClick(false);
  checkAchievements();
  render();
  save();
}

function doResearch(n) {
  if (state.researched[n.id]) return;
  if (!meetsRequires(n.requires)) return;
  if (state.research < n.cost) { toast('Need more research'); return; }
  state.research -= n.cost;
  state.researched[n.id] = true;
  toast(`🔬 Researched: ${n.name}`, true);
  playClick(false);
  checkAchievements();
  render();
  save();
}

// ====== CLICK BUNNY ======
// Streak: clicks within STREAK_WINDOW_MS extend; bonus = +1% per streak, capped.
const STREAK_WINDOW_MS = 1500;
const STREAK_CAP = 100;
const clickHistory = [];  // rolling timestamps for CPM (10-second window)
function getCPM() {
  // Drop stale entries on read so a stale call still gets a fresh figure
  const now = Date.now();
  while (clickHistory.length > 0 && now - clickHistory[0] > 10000) clickHistory.shift();
  return Math.round(clickHistory.length * 6);  // 10s → /min
}
function getStreakBonus() {
  // Decays in real time during render — clickStreak itself is reset by render tick if window elapsed.
  return Math.min(STREAK_CAP, state.clickStreak) * 0.01;
}
function clickBunny(e) {
  const now = Date.now();
  // Streak window check FIRST so the bonus applies to this click too
  if (now - state.lastClickAt > STREAK_WINDOW_MS) state.clickStreak = 1;
  else state.clickStreak = Math.min(STREAK_CAP, state.clickStreak + 1);
  if (state.clickStreak > (state.bestStreak || 0)) state.bestStreak = state.clickStreak;
  state.lastClickAt = now;
  // Rolling clicks-per-minute — store last 30 click timestamps for live CPM
  clickHistory.push(now);
  while (clickHistory.length > 0 && now - clickHistory[0] > 10000) clickHistory.shift();

  let gain = getPerClick() * (1 + getStreakBonus());
  let lucky = false;
  const luckyChance = (hasPower('lucky') ? 0.05 : 0) + getPrestigeCritBonus();
  if (luckyChance > 0 && Math.random() < luckyChance) { gain *= 5; lucky = true; }
  gain = Math.floor(gain);
  state.carrots += gain;
  state.totalCarrots += gain;
  state.lifetimeCarrots += gain;
  state.totalClicks += 1;

  const frenzyTag = isFrenzy() ? ' 🥞' : '';
  const streakTag = state.clickStreak >= 10 ? ` ×${state.clickStreak}` : '';
  spawnFloater($('bunny-wrap'), $('click-fx'), e, (lucky ? '✨ CRIT ' : '') + '+' + fmt(gain) + frenzyTag + streakTag, lucky ? 'crit' : '');
  playClick();
  if (Math.random() < 0.04) {
    $('flavor-text').textContent = flavorLines[Math.floor(Math.random() * flavorLines.length)];
  }
  // Tiny chance for spontaneous Pancake Frenzy (~1 in 700 clicks, ~6s; doubled by Frenzy Training)
  const frenzyChance  = hasResearch('frenzyTraining') ? 0.003 : 0.0015;
  const frenzyDuration = hasResearch('frenzyTraining') ? 9000 : 6000;
  if (!isFrenzy() && Math.random() < frenzyChance) triggerFrenzy(frenzyDuration);
  checkAchievements();
  render();
  if (state.totalClicks % 10 === 0) save();
}

function clickStation(e) {
  if (!state.crafted.rocketStation) return;
  let researchGain = hasPower('fast') ? 2 : 1;
  if (hasPower('wise')) researchGain += 1;
  state.research += researchGain;
  let text = `+${researchGain} 🔬`; let cls = 'research';
  const buildMk1 = state.researched.moonTrajectory && !state.crafted.rocketMk1;
  if (buildMk1) {
    const buildStep = hasResearch('lightweightAlloys') ? 2 : 1;
    state.rocketProgress = Math.min(state.rocketProgressMax, state.rocketProgress + buildStep);
    text += ` +${buildStep}🛠️`;
  }
  spawnFloater($('station-wrap'), $('station-fx'), e, text, cls);
  playClick();
  checkAchievements();
  render();
  save();
}

// ====== DNA SEQUENCER ======
function rollStrand() {
  // Mars-only: 1% chance for the ultra-rare Mars strand
  if (state.reachedMars && Math.random() < 0.01) return 'mars';
  const r = Math.random();
  if (r < 0.55) return 'red';
  if (r < 0.85) return 'blue';
  if (r < 0.97) return 'green';
  return 'yellow';
}
function clickSequencer(e) {
  if (!state.crafted.dnaSequencer) return;
  const grant = 1 + (hasPower('sharp') ? 1 : 0) + (hasPower('cosmic') ? 2 : 0) + (hasResearch('geneticAlgorithms') ? 1 : 0);
  const picks = [];
  for (let i = 0; i < grant; i++) {
    const k = rollStrand();
    state.strands[k] += 1;
    picks.push(k);
  }
  const icons = { red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡', mars: '🟥' };
  // Show rarest pick first
  const rarity = { red: 0, blue: 1, green: 2, yellow: 3, mars: 4 };
  picks.sort((a, b) => rarity[b] - rarity[a]);
  const k = picks[0];
  const txt = grant > 1 ? picks.map(p => icons[p]).join('') : `+1 ${icons[k]}`;
  spawnFloater($('sequencer-wrap'), $('sequencer-fx'), e, txt, 'strand-' + k);
  if (picks.includes('mars'))        toast('🟥 ULTRA-RARE Mars DNA strand!!', true);
  else if (picks.includes('yellow')) toast('🟡 Rare Yellow strand!', true);
  playClick();
  checkAchievements();
  render();
  save();
}

// ====== PARTICLE ACCELERATOR ======
// Tier 1 (Phase 1): Basic Components — 25 parts, all in this batch.
// Tiers 2-4 come in later phases. Costs scale gently; player click power
// folds into quark gain so the grind feels like ~15 min if you unlock it
// the moment it opens, and seconds if you grind it post-quantum-late-game.
const accelParts = [
  // ---- Tier 1: Basic Components (cheap, foundational) ----
  { id: 't1_01', tier: 1, icon: '🪙', name: 'Copper Wire',        desc: '+1% global multiplier',           cost: 5,     effects: { globalMult: 0.01 } },
  { id: 't1_02', tier: 1, icon: '🔩', name: 'Brass Bolt',         desc: '+1% click power',                 cost: 7,     effects: { clickMult: 0.01 } },
  { id: 't1_03', tier: 1, icon: '〽️', name: 'Resistor',           desc: '+1% global multiplier',           cost: 9,     effects: { globalMult: 0.01 } },
  { id: 't1_04', tier: 1, icon: '🔋', name: 'Capacitor',          desc: '+1 quark per accelerator click',  cost: 12,    effects: { quarksPerClick: 1 } },
  { id: 't1_05', tier: 1, icon: '➖', name: 'Diode',              desc: '+2% click power',                 cost: 16,    effects: { clickMult: 0.02 } },
  { id: 't1_06', tier: 1, icon: '🎚️', name: 'Toggle Switch',      desc: '+2% global multiplier',           cost: 20,    effects: { globalMult: 0.02 } },
  { id: 't1_07', tier: 1, icon: '🟢', name: 'LED Indicator',      desc: '+1% click power · LCD glows',     cost: 26,    effects: { clickMult: 0.01 } },
  { id: 't1_08', tier: 1, icon: '🔘', name: 'Push Button',        desc: '+1 quark per click',              cost: 32,    effects: { quarksPerClick: 1 } },
  { id: 't1_09', tier: 1, icon: '🧵', name: 'Power Cable',        desc: '+3% global multiplier',           cost: 42,    effects: { globalMult: 0.03 } },
  { id: 't1_10', tier: 1, icon: '📦', name: 'Junction Box',       desc: '+3% click power',                 cost: 55,    effects: { clickMult: 0.03 } },
  { id: 't1_11', tier: 1, icon: '🏗️', name: 'Steel Frame',         desc: '+3% global multiplier',           cost: 70,    effects: { globalMult: 0.03 } },
  { id: 't1_12', tier: 1, icon: '🥫', name: 'Aluminum Casing',    desc: '+1 quark per click',              cost: 90,    effects: { quarksPerClick: 1 } },
  { id: 't1_13', tier: 1, icon: '🌀', name: 'Cooling Fan',        desc: '+5% global multiplier',           cost: 115,   effects: { globalMult: 0.05 } },
  { id: 't1_14', tier: 1, icon: '🎛️', name: 'Voltage Regulator',  desc: '+5% click power',                 cost: 145,   effects: { clickMult: 0.05 } },
  { id: 't1_15', tier: 1, icon: '📟', name: 'Display Panel',      desc: '+5% global multiplier',           cost: 180,   effects: { globalMult: 0.05 } },
  { id: 't1_16', tier: 1, icon: '🎤', name: 'Control Knob',       desc: '+10% auto helpers',               cost: 225,   effects: { autoMult: 0.10 } },
  { id: 't1_17', tier: 1, icon: '📡', name: 'Signal Amplifier',   desc: '+8% click power',                 cost: 280,   effects: { clickMult: 0.08 } },
  { id: 't1_18', tier: 1, icon: '♨️', name: 'Heat Sink',          desc: '+8% global multiplier',           cost: 350,   effects: { globalMult: 0.08 } },
  { id: 't1_19', tier: 1, icon: '⚙️', name: 'Transformer',         desc: '+2 quarks per click',             cost: 440,   effects: { quarksPerClick: 2 } },
  { id: 't1_20', tier: 1, icon: '🔌', name: 'Power Supply',       desc: '+12% click power',                cost: 550,   effects: { clickMult: 0.12 } },
  { id: 't1_21', tier: 1, icon: '🧠', name: 'Logic Gate Array',   desc: '+10% global multiplier',          cost: 680,   effects: { globalMult: 0.10 } },
  { id: 't1_22', tier: 1, icon: '💾', name: 'Microprocessor',     desc: '+15% auto helpers',               cost: 850,   effects: { autoMult: 0.15 } },
  { id: 't1_23', tier: 1, icon: '🗃️', name: 'Memory Module',      desc: '+2 quarks/click · +5% global',     cost: 1050,  effects: { quarksPerClick: 2, globalMult: 0.05 } },
  { id: 't1_24', tier: 1, icon: '🟦', name: 'Circuit Board',      desc: '+18% click power',                cost: 1300,  effects: { clickMult: 0.18 } },
  { id: 't1_25', tier: 1, icon: '📦', name: 'Tier-1 Assembly',    desc: '+30% global multiplier · seals Tier 1', cost: 1700, effects: { globalMult: 0.30 } },

  // ---- Tier 2: Cryo Components — unlocks once all Tier-1 parts are built. Introduces 🟣 Antimatter mid-tier. ----
  { id: 't2_01', tier: 2, icon: '🧊', name: 'Liquid Nitrogen Tank', desc: '+15% global multiplier',         cost: { quarks: 5000 },                effects: { globalMult: 0.15 } },
  { id: 't2_02', tier: 2, icon: '🌡️', name: 'Cryostat',            desc: '+15% click power',               cost: { quarks: 6500 },                effects: { clickMult: 0.15 } },
  { id: 't2_03', tier: 2, icon: '🫗', name: 'Vacuum Pump',          desc: '+3 quarks per click',            cost: { quarks: 8500 },                effects: { quarksPerClick: 3 } },
  { id: 't2_04', tier: 2, icon: '🧪', name: 'Insulated Pipe',       desc: '+18% global multiplier',         cost: { quarks: 11000 },               effects: { globalMult: 0.18 } },
  { id: 't2_05', tier: 2, icon: '🧊', name: 'Thermal Shield',       desc: '+18% click power',               cost: { quarks: 14000 },               effects: { clickMult: 0.18 } },
  { id: 't2_06', tier: 2, icon: '🧴', name: 'Helium Coolant',       desc: '+20% global multiplier',         cost: { quarks: 18000, antimatter: 1 },effects: { globalMult: 0.20 } },
  { id: 't2_07', tier: 2, icon: '🔗', name: 'Superconductor Coil',  desc: '+20% click power',               cost: { quarks: 22000, antimatter: 1 },effects: { clickMult: 0.20 } },
  { id: 't2_08', tier: 2, icon: '🚰', name: 'Cryo Valve',           desc: '+20% auto helpers',              cost: { quarks: 28000, antimatter: 1 },effects: { autoMult: 0.20 } },
  { id: 't2_09', tier: 2, icon: '🍶', name: 'Magnetic Bottle',      desc: '+5 quarks per click',            cost: { quarks: 35000, antimatter: 2 },effects: { quarksPerClick: 5 } },
  { id: 't2_10', tier: 2, icon: '🪤', name: 'Ion Trap',             desc: '+25% global multiplier',         cost: { quarks: 45000, antimatter: 2 },effects: { globalMult: 0.25 } },
  { id: 't2_11', tier: 2, icon: '🌫️', name: 'Plasma Chamber',       desc: '+25% click power',               cost: { quarks: 56000, antimatter: 2 },effects: { clickMult: 0.25 } },
  { id: 't2_12', tier: 2, icon: '❄️', name: 'Refrigeration Unit',   desc: '+30% auto helpers',              cost: { quarks: 70000, antimatter: 3 },effects: { autoMult: 0.30 } },
  { id: 't2_13', tier: 2, icon: '📐', name: 'Vacuum Tube',          desc: '+30% global multiplier',         cost: { quarks: 88000, antimatter: 3 },effects: { globalMult: 0.30 } },
  { id: 't2_14', tier: 2, icon: '🌀', name: 'Cryogenic Pump',       desc: '+30% click power',               cost: { quarks: 110000, antimatter: 3 },effects: { clickMult: 0.30 } },
  { id: 't2_15', tier: 2, icon: '🔁', name: 'Liquid Helium Loop',   desc: '+35% global multiplier',         cost: { quarks: 135000, antimatter: 4 },effects: { globalMult: 0.35 } },
  { id: 't2_16', tier: 2, icon: '🌡️', name: 'Thermal Sensor',       desc: '+5 q/click · +10% global',        cost: { quarks: 165000, antimatter: 4 },effects: { quarksPerClick: 5, globalMult: 0.10 } },
  { id: 't2_17', tier: 2, icon: '🪜', name: 'Cold Trap',            desc: '+40% click power',               cost: { quarks: 200000, antimatter: 5 },effects: { clickMult: 0.40 } },
  { id: 't2_18', tier: 2, icon: '🧱', name: 'Cryomodule',           desc: '+40% global multiplier',         cost: { quarks: 245000, antimatter: 5 },effects: { globalMult: 0.40 } },
  { id: 't2_19', tier: 2, icon: '🪞', name: 'Magnetic Mirror',      desc: '+40% auto helpers',              cost: { quarks: 300000, antimatter: 6 },effects: { autoMult: 0.40 } },
  { id: 't2_20', tier: 2, icon: '🕸️', name: 'Penning Trap',         desc: '+50% click power',               cost: { quarks: 365000, antimatter: 7 },effects: { clickMult: 0.50 } },
  { id: 't2_21', tier: 2, icon: '🗼', name: 'Cooling Tower',        desc: '+50% global multiplier',         cost: { quarks: 445000, antimatter: 8 },effects: { globalMult: 0.50 } },
  { id: 't2_22', tier: 2, icon: '〰️', name: 'Quench Pipe',          desc: '+50% click power',               cost: { quarks: 540000, antimatter: 9 },effects: { clickMult: 0.50 } },
  { id: 't2_23', tier: 2, icon: '🛡️', name: 'Cryosurge Stabilizer', desc: '+10 quarks per click',           cost: { quarks: 660000, antimatter: 10 },effects: { quarksPerClick: 10 } },
  { id: 't2_24', tier: 2, icon: '🪫', name: 'Sub-Zero Cap Bank',    desc: '+75% global multiplier',         cost: { quarks: 800000, antimatter: 12 },effects: { globalMult: 0.75 } },
  { id: 't2_25', tier: 2, icon: '📦', name: 'Tier-2 Assembly',      desc: '+100% click · +100% global · seals Tier 2', cost: { quarks: 1000000, antimatter: 15 }, effects: { clickMult: 1.00, globalMult: 1.00 } },

  // ---- Tier 3: Beam Components — unlocks once all Tier-2 parts are built. Introduces 🕳️ Singularity mid-tier. ----
  { id: 't3_01', tier: 3, icon: '🧰', name: 'Beam Pipe Segment',    desc: '+50% global multiplier',         cost: { quarks: 1500000, antimatter: 5 },                 effects: { globalMult: 0.50 } },
  { id: 't3_02', tier: 3, icon: '📡', name: 'RF Cavity',            desc: '+50% click power',               cost: { quarks: 2000000, antimatter: 6 },                 effects: { clickMult: 0.50 } },
  { id: 't3_03', tier: 3, icon: '🧲', name: 'Quadrupole Magnet',    desc: '+50% auto helpers',              cost: { quarks: 2700000, antimatter: 7 },                 effects: { autoMult: 0.50 } },
  { id: 't3_04', tier: 3, icon: '🧲', name: 'Dipole Magnet',        desc: '+60% global multiplier',         cost: { quarks: 3500000, antimatter: 8 },                 effects: { globalMult: 0.60 } },
  { id: 't3_05', tier: 3, icon: '📍', name: 'Beam Position Monitor',desc: '+15 quarks per click',           cost: { quarks: 4500000, antimatter: 9 },                 effects: { quarksPerClick: 15 } },
  { id: 't3_06', tier: 3, icon: '🚧', name: 'Collimator',           desc: '+60% click power',               cost: { quarks: 5800000, antimatter: 10, singularity: 1 },effects: { clickMult: 0.60 } },
  { id: 't3_07', tier: 3, icon: '🥣', name: 'Faraday Cup',          desc: '+70% global multiplier',         cost: { quarks: 7200000, antimatter: 12, singularity: 1 },effects: { globalMult: 0.70 } },
  { id: 't3_08', tier: 3, icon: '🧱', name: 'Beam Dump Block',      desc: '+70% click power',               cost: { quarks: 8800000, antimatter: 13, singularity: 1 },effects: { clickMult: 0.70 } },
  { id: 't3_09', tier: 3, icon: '🌊', name: 'Wiggler',              desc: '+75% global multiplier',         cost: { quarks: 11000000, antimatter: 15, singularity: 2 },effects: { globalMult: 0.75 } },
  { id: 't3_10', tier: 3, icon: '〰️', name: 'Undulator',            desc: '+75% click power',               cost: { quarks: 13500000, antimatter: 17, singularity: 2 },effects: { clickMult: 0.75 } },
  { id: 't3_11', tier: 3, icon: '📻', name: 'Klystron',             desc: '+75% auto helpers',              cost: { quarks: 16500000, antimatter: 19, singularity: 2 },effects: { autoMult: 0.75 } },
  { id: 't3_12', tier: 3, icon: '🌀', name: 'Synchrotron Coil',     desc: '+80% global multiplier',         cost: { quarks: 20000000, antimatter: 22, singularity: 3 },effects: { globalMult: 0.80 } },
  { id: 't3_13', tier: 3, icon: '🛤️', name: 'Storage Ring Section', desc: '+85% click power',               cost: { quarks: 24000000, antimatter: 25, singularity: 3 },effects: { clickMult: 0.85 } },
  { id: 't3_14', tier: 3, icon: '🗜️', name: 'Bunch Compressor',     desc: '+20 quarks per click',           cost: { quarks: 29000000, antimatter: 28, singularity: 3 },effects: { quarksPerClick: 20 } },
  { id: 't3_15', tier: 3, icon: '🪈', name: 'Drift Tube',           desc: '+90% global multiplier',         cost: { quarks: 35000000, antimatter: 32, singularity: 4 },effects: { globalMult: 0.90 } },
  { id: 't3_16', tier: 3, icon: '🔆', name: 'Cathode Emitter',      desc: '+90% click power',               cost: { quarks: 42000000, antimatter: 36, singularity: 4 },effects: { clickMult: 0.90 } },
  { id: 't3_17', tier: 3, icon: '🟫', name: 'Anode Plate',          desc: '+100% global multiplier',        cost: { quarks: 50000000, antimatter: 40, singularity: 5 },effects: { globalMult: 1.00 } },
  { id: 't3_18', tier: 3, icon: '🔬', name: 'Particle Detector',    desc: '+100% click power',              cost: { quarks: 60000000, antimatter: 45, singularity: 5 },effects: { clickMult: 1.00 } },
  { id: 't3_19', tier: 3, icon: '🧲', name: 'Sextupole Magnet',     desc: '+100% auto helpers',             cost: { quarks: 72000000, antimatter: 50, singularity: 6 },effects: { autoMult: 1.00 } },
  { id: 't3_20', tier: 3, icon: '🧲', name: 'Octupole Magnet',      desc: '+125% global multiplier',        cost: { quarks: 86000000, antimatter: 55, singularity: 7 },effects: { globalMult: 1.25 } },
  { id: 't3_21', tier: 3, icon: '🛑', name: 'Beam Stop',            desc: '+125% click power',              cost: { quarks: 100000000, antimatter: 60, singularity: 8 },effects: { clickMult: 1.25 } },
  { id: 't3_22', tier: 3, icon: '🧊', name: 'Synchrotron Cooler',   desc: '+150% global multiplier',        cost: { quarks: 120000000, antimatter: 70, singularity: 10 },effects: { globalMult: 1.50 } },
  { id: 't3_23', tier: 3, icon: '🎯', name: 'Polarimeter',          desc: '+30 quarks per click',           cost: { quarks: 145000000, antimatter: 80, singularity: 12 },effects: { quarksPerClick: 30 } },
  { id: 't3_24', tier: 3, icon: '📊', name: 'Spectrometer',         desc: '+150% click power',              cost: { quarks: 175000000, antimatter: 95, singularity: 15 },effects: { clickMult: 1.50 } },
  { id: 't3_25', tier: 3, icon: '📦', name: 'Tier-3 Assembly',      desc: '+200% click · +200% global · seals Tier 3', cost: { quarks: 220000000, antimatter: 120, singularity: 20 }, effects: { clickMult: 2.00, globalMult: 2.00 } },

  // ---- Tier 4: Final Assembly — unlocks once all Tier-3 parts are built. Heavy costs across every resource. Completing this tier unlocks Dimensional Travel research. ----
  { id: 't4_01', tier: 4, icon: '🛢️', name: 'Beamline Vacuum Module', desc: '+200% global multiplier',     cost: { quarks: 300000000, antimatter: 25, singularity: 4 },   effects: { globalMult: 2.00 } },
  { id: 't4_02', tier: 4, icon: '🏺', name: 'Cryostat Vessel',         desc: '+200% click power',           cost: { quarks: 400000000, antimatter: 30, singularity: 5 },   effects: { clickMult: 2.00 } },
  { id: 't4_03', tier: 4, icon: '〰️', name: 'Linear Accelerator Tube', desc: '+50 quarks per click',        cost: { quarks: 520000000, antimatter: 35, singularity: 6 },   effects: { quarksPerClick: 50 } },
  { id: 't4_04', tier: 4, icon: '⭕', name: 'Booster Ring Section',    desc: '+250% global multiplier',     cost: { quarks: 680000000, antimatter: 40, singularity: 7 },   effects: { globalMult: 2.50 } },
  { id: 't4_05', tier: 4, icon: '🌀', name: 'Main Ring Section',       desc: '+250% click power',           cost: { quarks: 880000000, antimatter: 50, singularity: 8 },   effects: { clickMult: 2.50 } },
  { id: 't4_06', tier: 4, icon: '🌡️', name: 'Detector Calorimeter',    desc: '+150% auto helpers',          cost: { quarks: 1100000000, antimatter: 60, singularity: 9 },  effects: { autoMult: 1.50 } },
  { id: 't4_07', tier: 4, icon: '🥁', name: 'Muon Chamber',            desc: '+300% global multiplier',     cost: { quarks: 1400000000, antimatter: 70, singularity: 10 }, effects: { globalMult: 3.00 } },
  { id: 't4_08', tier: 4, icon: '📷', name: 'Pixel Detector',          desc: '+300% click power',           cost: { quarks: 1750000000, antimatter: 80, singularity: 12 }, effects: { clickMult: 3.00 } },
  { id: 't4_09', tier: 4, icon: '🎚️', name: 'Trigger Processor',       desc: '+200% auto helpers',          cost: { quarks: 2200000000, antimatter: 95, singularity: 14 }, effects: { autoMult: 2.00 } },
  { id: 't4_10', tier: 4, icon: '🗄️', name: 'Data Acquisition Rack',   desc: '+75 quarks per click',        cost: { quarks: 2700000000, antimatter: 110, singularity: 16 },effects: { quarksPerClick: 75 } },
  { id: 't4_11', tier: 4, icon: '🌬️', name: 'Helium Liquefier',        desc: '+400% global multiplier',     cost: { quarks: 3300000000, antimatter: 130, singularity: 18 },effects: { globalMult: 4.00 } },
  { id: 't4_12', tier: 4, icon: '🕒', name: 'Master Oscillator',       desc: '+400% click power',           cost: { quarks: 4000000000, antimatter: 150, singularity: 20 },effects: { clickMult: 4.00 } },
  { id: 't4_13', tier: 4, icon: '📶', name: 'Microwave Source',        desc: '+250% auto helpers',          cost: { quarks: 4900000000, antimatter: 175, singularity: 22 },effects: { autoMult: 2.50 } },
  { id: 't4_14', tier: 4, icon: '🖥️', name: 'Beam Steering Computer',  desc: '+500% global multiplier',     cost: { quarks: 6000000000, antimatter: 200, singularity: 25 },effects: { globalMult: 5.00 } },
  { id: 't4_15', tier: 4, icon: '🌈', name: 'Synchrotron Light Bay',   desc: '+500% click power',           cost: { quarks: 7300000000, antimatter: 230, singularity: 28 },effects: { clickMult: 5.00 } },
  { id: 't4_16', tier: 4, icon: '🛡️', name: 'Containment Chamber',     desc: '+100 quarks per click',       cost: { quarks: 8800000000, antimatter: 265, singularity: 32 },effects: { quarksPerClick: 100 } },
  { id: 't4_17', tier: 4, icon: '🧪', name: 'Antimatter Storage Cell', desc: '+750% global multiplier',     cost: { quarks: 11000000000, antimatter: 300, singularity: 36 },effects: { globalMult: 7.50 } },
  { id: 't4_18', tier: 4, icon: '🌑', name: 'Singularity Stabilizer',  desc: '+750% click power',           cost: { quarks: 13500000000, antimatter: 340, singularity: 42 },effects: { clickMult: 7.50 } },
  { id: 't4_19', tier: 4, icon: '🔭', name: 'Dimensional Lens',        desc: '+400% auto helpers',          cost: { quarks: 16500000000, antimatter: 385, singularity: 50 },effects: { autoMult: 4.00 } },
  { id: 't4_20', tier: 4, icon: '🪢', name: 'Quantum Entangler',       desc: '+1000% global multiplier',    cost: { quarks: 20000000000, antimatter: 435, singularity: 60 },effects: { globalMult: 10.00 } },
  { id: 't4_21', tier: 4, icon: '⚓', name: 'Reality Anchor',           desc: '+1000% click power',          cost: { quarks: 24000000000, antimatter: 495, singularity: 72 },effects: { clickMult: 10.00 } },
  { id: 't4_22', tier: 4, icon: '🪞', name: 'Phase Shifter',           desc: '+150 quarks per click',       cost: { quarks: 29000000000, antimatter: 560, singularity: 85 },effects: { quarksPerClick: 150 } },
  { id: 't4_23', tier: 4, icon: '💥', name: 'Resonance Cascade Core',  desc: '+1500% global multiplier',    cost: { quarks: 35000000000, antimatter: 640, singularity: 100 },effects: { globalMult: 15.00 } },
  { id: 't4_24', tier: 4, icon: '🎼', name: 'Hyperspace Tuner',        desc: '+1500% click power',          cost: { quarks: 42000000000, antimatter: 730, singularity: 120 },effects: { clickMult: 15.00 } },
  { id: 't4_25', tier: 4, icon: '🌀', name: 'ULTIMATE Assembly',       desc: 'COMPLETE the accelerator. +2500% click · +2500% global · unlocks Dimensional Travel research.', cost: { quarks: 50000000000, antimatter: 850, singularity: 150 }, effects: { clickMult: 25.00, globalMult: 25.00 } },
];
const PARTS_TARGET = 100;  // grand total across all tiers

// ====== GLOBAL COST INFLATION ======
// One-time at module load: bumps every cost up so the post-buff economy
// (Mastery, Helper Synergy tiers, Streak, buffed Buddy, Invincible DLC mults)
// doesn't trivialize every purchase. Tunable here.
const COST_INFLATION_BASE   = 3;     // multiplies all baseCost / recipe.cost / research.cost
const COST_INFLATION_GROWTH = 0.04;  // adds to every upgrade's per-level growth multiplier
const ACCEL_PART_DISCOUNT_BY_TIER = { 1: 0.10, 2: 0.05, 3: 0.03, 4: 0.02 };  // 90/95/97/98% off
(function inflateCosts() {
  for (const u of clickUpgrades) { u.baseCost = Math.ceil(u.baseCost * COST_INFLATION_BASE); u.growth += COST_INFLATION_GROWTH; }
  for (const u of autoUpgrades)  { u.baseCost = Math.ceil(u.baseCost * COST_INFLATION_BASE); u.growth += COST_INFLATION_GROWTH; }
  for (const r of recipes) {
    if (r.cost && typeof r.cost === 'object') {
      for (const k of Object.keys(r.cost)) r.cost[k] = Math.ceil(r.cost[k] * COST_INFLATION_BASE);
    }
  }
  for (const n of researchNodes) {
    if (typeof n.cost === 'number') n.cost = Math.ceil(n.cost * COST_INFLATION_BASE);
  }
  // Accelerator parts get a per-tier discount — higher tiers are dramatically cheaper
  for (const p of accelParts) {
    const d = ACCEL_PART_DISCOUNT_BY_TIER[p.tier] || 1;
    if (typeof p.cost === 'number') {
      p.cost = Math.max(1, Math.ceil(p.cost * d));
    } else if (p.cost && typeof p.cost === 'object') {
      for (const k of Object.keys(p.cost)) p.cost[k] = Math.max(1, Math.ceil(p.cost[k] * d));
    }
  }
})();

// Normalize a part cost into { quarks, antimatter, singularity } so the rest
// of the code doesn't care that Tier 1 uses a bare number.
function normalizeAccelCost(cost) {
  if (typeof cost === 'number') return { quarks: cost };
  return cost;
}
function canAffordAccelCost(cost) {
  const c = normalizeAccelCost(cost);
  return (state.quarks || 0)      >= (c.quarks      || 0)
      && (state.antimatter || 0)  >= (c.antimatter  || 0)
      && (state.singularity || 0) >= (c.singularity || 0);
}
function payAccelCost(cost) {
  const c = normalizeAccelCost(cost);
  state.quarks      -= (c.quarks      || 0);
  state.antimatter  -= (c.antimatter  || 0);
  state.singularity -= (c.singularity || 0);
}
function accelCostString(cost) {
  const c = normalizeAccelCost(cost);
  const parts = [];
  if (c.quarks)      parts.push(`${fmt(c.quarks)} ⚛️`);
  if (c.antimatter)  parts.push(`${fmt(c.antimatter)} 🟣`);
  if (c.singularity) parts.push(`${fmt(c.singularity)} 🕳️`);
  return parts.join('  ');
}
function tierBuiltCount(tier) {
  let n = 0;
  for (const p of accelParts) if (p.tier === tier && state.accelParts[p.id]) n++;
  return n;
}
function tierUnlocked(tier) {
  if (tier === 1) return true;
  if (tier === 2) return tierBuiltCount(1) >= 25;
  if (tier === 3) return tierBuiltCount(2) >= 25;
  if (tier === 4) return tierBuiltCount(3) >= 25;
  return false;
}

function getAccelBonus() {
  const out = { clickMult: 0, globalMult: 0, autoMult: 0, quarksPerClick: 0 };
  for (const p of accelParts) {
    if (!state.accelParts[p.id]) continue;
    for (const k of Object.keys(p.effects)) out[k] += p.effects[k];
  }
  return out;
}

function getQuarksPerClick() {
  if (!state.crafted.particleAccelerator) return 0;
  // 10 base + bonuses from parts you've built + Invincible-tier boosts.
  let q = 10 + getAccelBonus().quarksPerClick;
  q += (state.crafted.dimLensMk2 || 0) * 5;
  if (hasResearch('transDimensionalTactics')) q *= 2;
  return q;
}
// Passive quark generation — runs every tick once the accelerator is built.
// Gives "idle" progress so you don't have to click the calculator endlessly.
function getQuarksPerSec() {
  if (!state.crafted.particleAccelerator) return 0;
  // Base 5/sec + 1/sec per part already built + 2/sec per Dim Lens Mk II
  let qps = 5 + partsBuiltCount() * 1 + (state.crafted.dimLensMk2 || 0) * 2;
  if (hasResearch('transDimensionalTactics')) qps *= 2;
  return qps;
}

function clickAccelerator(e) {
  if (!state.crafted.particleAccelerator) return;
  const gain = getQuarksPerClick();
  state.quarks += gain;
  state.accelClicks += 1;
  const wrap = $('accelerator-wrap');
  const fx   = $('accelerator-fx');
  spawnFloater(wrap, fx, e, '+' + fmt(gain) + ' ⚛️', '');
  // Antimatter — 10% chance once Tier 1 is sealed (all 25 built)
  if (tierBuiltCount(1) >= 25 && Math.random() < 0.10) {
    state.antimatter += 1;
    spawnFloater(wrap, fx, null, '+1 🟣', 'crit');
    toast('🟣 Rare antimatter pulse!');
  }
  // Singularity — 4% chance once Tier 2 is sealed
  if (tierBuiltCount(2) >= 25 && Math.random() < 0.04) {
    state.singularity += 1;
    spawnFloater(wrap, fx, null, '+1 🕳️', 'crit');
    toast('🕳️ SINGULARITY captured!', true);
  }
  // Flash the LCD
  const lcd = wrap && wrap.querySelector('.calc-lcd');
  if (lcd) {
    lcd.classList.remove('calc-flash');
    void lcd.offsetWidth;
    lcd.classList.add('calc-flash');
  }
  playClick(false);
  checkAchievements();
  render();
}

function partsBuiltCount() {
  let n = 0;
  for (const p of accelParts) if (state.accelParts[p.id]) n++;
  return n;
}

function buyPart(p) {
  if (state.accelParts[p.id]) return;
  if (!tierUnlocked(p.tier)) { toast(`Tier ${p.tier} is locked — finish Tier ${p.tier - 1} first.`); return; }
  if (!canAffordAccelCost(p.cost)) { toast('Not enough resources.'); return; }
  payAccelCost(p.cost);
  state.accelParts[p.id] = true;
  toast(`🧮 Built: ${p.name}`, true);
  // Tier-complete celebration on the assembly part
  if (p.id === 't1_25') toast('🧰 Tier 1 sealed! Cryo Components (Tier 2) unlocked — and clicks now have a chance to spawn Antimatter 🟣.', true);
  if (p.id === 't2_25') toast('❄️ Tier 2 sealed! Beam Components (Tier 3) unlocked — and clicks now have a chance to spawn Singularity 🕳️.', true);
  if (p.id === 't3_25') toast('⚡ Tier 3 sealed! Final Assembly (Tier 4) unlocked — the last 25 parts await.', true);
  if (p.id === 't4_25') toast('🌀 ACCELERATOR COMPLETE! Research "Dimensional Travel" to cross into the Invincible Dimension.', true);
  playClick(false);
  checkAchievements();
  renderPartsModal();
  render();
  save();
}

function renderPartsModal() {
  if ($('parts-modal').classList.contains('hidden')) return;
  const built = partsBuiltCount();
  const wallet = [
    `<b>${fmt(state.quarks)}</b> ⚛️`,
    (state.antimatter > 0 || tierBuiltCount(1) >= 25) ? `<b>${fmt(state.antimatter)}</b> 🟣` : '',
    (state.singularity > 0 || tierBuiltCount(2) >= 25) ? `<b>${fmt(state.singularity)}</b> 🕳️` : '',
  ].filter(Boolean).join(' · ');
  $('parts-summary').innerHTML =
    `<div><b>${built}</b> / ${PARTS_TARGET} parts built</div>` +
    `<div style="margin-top:2px">${wallet}</div>` +
    `<div class="muted" style="margin-top:4px">+${getQuarksPerClick()} quarks per accelerator click</div>`;
  const list = $('parts-list');
  list.innerHTML = '';
  const tiers = [
    { id: 1, name: '🧰 Tier 1 · Basic Components' },
    { id: 2, name: '❄️ Tier 2 · Cryo Components' },
    { id: 3, name: '☀️ Tier 3 · Beam Components' },
    { id: 4, name: '🌌 Tier 4 · Final Assembly' },
  ];
  for (const tier of tiers) {
    const unlocked = tierUnlocked(tier.id);
    const dataExists = accelParts.some(p => p.tier === tier.id);
    const header = document.createElement('div');
    header.className = 'parts-tier-header' + (unlocked ? '' : ' locked');
    let label = tier.name;
    if (!dataExists) label += ' · coming in a future build';
    else if (!unlocked) label += ` · finish Tier ${tier.id - 1} to unlock`;
    else label += ` · ${tierBuiltCount(tier.id)} / 25`;
    header.textContent = label;
    list.appendChild(header);
    if (!unlocked || !dataExists) continue;
    for (const p of accelParts.filter(x => x.tier === tier.id)) {
      const owned = !!state.accelParts[p.id];
      const affordable = !owned && canAffordAccelCost(p.cost);
      const card = document.createElement('div');
      card.className = 'part-card ' + (owned ? 'built' : (affordable ? 'affordable' : 'unaffordable'));
      card.innerHTML = `
        <div class="picon">${p.icon}</div>
        <div class="body">
          <div class="pname">${p.name}</div>
          <div class="pdesc">${p.desc}</div>
          ${owned ? '' : `<div class="pcost">${accelCostString(p.cost)}</div>`}
        </div>
        <div class="pstatus">${owned ? 'BUILT ✓' : ''}</div>
      `;
      if (!owned) card.addEventListener('click', () => buyPart(p));
      list.appendChild(card);
    }
  }
}

function renderAccelerator() {
  const has = !!state.crafted.particleAccelerator;
  $('accelerator-area').classList.toggle('hidden', !has);
  $('pill-quarks').classList.toggle('hidden', !has && state.quarks === 0);
  $('pill-antimatter').classList.toggle('hidden', state.antimatter === 0 && tierBuiltCount(1) < 25);
  $('pill-singularity').classList.toggle('hidden', state.singularity === 0 && tierBuiltCount(2) < 25);
  $('quarks').textContent = fmt(state.quarks);
  $('antimatter').textContent = fmt(state.antimatter);
  $('singularity').textContent = fmt(state.singularity);
  if (!has) return;
  const lcd = $('calc-lcd-text');
  if (lcd) lcd.textContent = fmt(state.quarks);
  $('parts-built').textContent = partsBuiltCount();
  const pct = Math.min(100, (partsBuiltCount() / PARTS_TARGET) * 100);
  $('parts-progress-fill').style.width = pct + '%';
  $('accelerator-rate').textContent = `+${fmt(getQuarksPerClick())}/click · +${fmt(getQuarksPerSec())}/sec passive`;
}

function spawnFloater(wrap, fx, e, text, extraClass) {
  const rect = wrap.getBoundingClientRect();
  let x = rect.width / 2, y = rect.height / 2;
  if (e && typeof e.clientX === 'number') {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }
  const f = document.createElement('div');
  f.className = 'floater' + (extraClass ? ' ' + extraClass : '');
  f.textContent = text;
  f.style.left = x + 'px';
  f.style.top = y + 'px';
  fx.appendChild(f);
  setTimeout(() => f.remove(), 1000);
}

// ====== DNA MODAL ======
function openDnaModal() {
  if (!state.crafted.dnaSequencer) return;
  $('dna-modal').classList.remove('hidden');
  renderDnaModal();
}
function renderDnaModal() {
  const s = state.strands;
  const strandRow = $('strand-row');
  strandRow.innerHTML =
    `<span class="strand-pill red">🔴 Red &nbsp;${s.red}</span>` +
    `<span class="strand-pill blue">🔵 Blue &nbsp;${s.blue}</span>` +
    `<span class="strand-pill green">🟢 Green &nbsp;${s.green}</span>` +
    `<span class="strand-pill yellow">🟡 Yellow &nbsp;${s.yellow}</span>` +
    ((s.mars > 0 || state.reachedMars) ? `<span class="strand-pill mars">🟥 Mars &nbsp;${s.mars}</span>` : '') +
    (((s.glory || 0) > 0 || state.dimension === 'invincible') ? `<span class="strand-pill mars" style="background:linear-gradient(135deg,rgba(255,220,80,0.3),rgba(255,140,40,0.3));border-color:#ffc060;color:#ffe890">⭐ Glory &nbsp;${s.glory || 0}</span>` : '');

  const grid = $('dna-powers');
  grid.innerHTML = '';
  for (const p of dnaPowers) {
    const owned = !!state.powers[p.id];
    const affordable = !owned && canAffordStrands(p.cost);
    const div = document.createElement('div');
    div.className = 'power-card ' + (owned ? 'owned' : (affordable ? 'affordable' : 'locked'));
    div.innerHTML = `
      <div class="picon">${p.icon}</div>
      <div class="body" style="flex:1">
        <div class="pname">${p.name}</div>
        <div class="pdesc">${p.desc}</div>
        <div class="pcost">${owned ? '' : costString(p.cost)}</div>
      </div>
      <div class="pstatus">${owned ? 'ACTIVE ✓' : ''}</div>
    `;
    if (!owned) div.addEventListener('click', () => buyPower(p));
    grid.appendChild(div);
  }
}
function buyPower(p) {
  if (state.powers[p.id]) return;
  if (!canAffordStrands(p.cost)) { toast('Not enough strands'); return; }
  payStrands(p.cost);
  state.powers[p.id] = true;
  toast(`🧬 Unlocked: ${p.name}`, true);
  playClick(false);
  checkAchievements();
  renderDnaModal();
  render();
  save();
}

// ====== BUDDY ======
function trainCost() {
  return Math.floor(1000 * Math.pow(1.40, state.buddy.level - 1));
}
function getBuddyMax() { return 50 + state.prestigeCount * 10; }
function trainBuddy() {
  if (state.buddy.level >= getBuddyMax()) { toast('Buddy is at max level!'); return; }
  const cost = trainCost();
  if (state.carrots < cost) { toast('Not enough carrots to train'); return; }
  state.carrots -= cost;
  state.buddy.level += 1;
  toast(`🐶 Buddy trained! Now Lv ${state.buddy.level}`, true);
  playClick(false);
  checkAchievements();
  render();
  save();
}
function openMissionModal() {
  if (!state.buddy.unlocked) return;
  $('mission-modal').classList.remove('hidden');
  renderMissionModal();
}
function renderMissionModal() {
  const b = state.buddy;
  const passive = b.level * 5;
  const trainBtn = $('train-buddy-btn');
  const cost = trainCost();
  if (b.level >= getBuddyMax()) {
    trainBtn.textContent = 'Buddy is at Max Level';
    trainBtn.disabled = true;
  } else {
    trainBtn.textContent = `Train Buddy → Lv ${b.level + 1}  ·  🥕 ${fmt(cost)}`;
    trainBtn.disabled = state.carrots < cost;
  }
  $('buddy-summary').innerHTML =
    `<b>🐶 Buddy</b> · Level <b>${b.level}</b> / ${getBuddyMax()}<br>` +
    `Passive income: <b>+${passive}/sec</b> (boosted by global multiplier)<br>` +
    `Mission reward bonus: <b>+${Math.floor((b.level - 1) * 5)}%</b>`;

  const list = $('mission-list');
  list.innerHTML = '';
  for (const m of buddyMissions) {
    const isCurrent = b.mission === m.id;
    const isAnyMission = !!b.mission;
    const remaining = isCurrent ? Math.max(0, (b.missionEndsAt - Date.now()) / 1000) : 0;
    const ready = isCurrent && remaining <= 0;
    const div = document.createElement('div');
    let cls = 'mission-card';
    if (isCurrent) cls += ' active';
    else if (isAnyMission) cls += ' locked';
    else cls += ' available';
    div.className = cls;

    const bonus = 1 + (b.level - 1) * 0.05;
    const reward = m.reward;
    const rewardTxt = `🥕 ${fmt(Math.floor(reward.carrots * bonus))}` +
      (reward.redChance ? ` · 🔴 ${Math.round(reward.redChance * 100)}%` : '') +
      (reward.blueChance ? ` · 🔵 ${Math.round(reward.blueChance * 100)}%` : '') +
      (reward.greenChance ? ` · 🟢 ${Math.round(reward.greenChance * 100)}%` : '') +
      (reward.yellowChance ? ` · 🟡 ${Math.round(reward.yellowChance * 100)}%` : '');

    div.innerHTML = `
      <div class="row">
        <div class="micon">${m.icon}</div>
        <div style="flex:1">
          <div class="mname">${m.name}</div>
          <div class="mdesc">Takes ${fmtTime(m.durationSec)} · ${rewardTxt}</div>
        </div>
        <div style="text-align:right;color:#c0b8a8;font-size:0.85em">
          ${isCurrent ? (ready ? '<b style="color:#80ff80">READY</b>' : fmtTime(remaining) + ' left') : (isAnyMission ? 'locked' : 'Send →')}
        </div>
      </div>
      ${isCurrent ? `<div class="mbar"><div class="mbar-fill" style="width:${100 - (remaining / m.durationSec) * 100}%"></div></div>` : ''}
    `;
    if (ready) {
      div.style.cursor = 'pointer';
      div.addEventListener('click', () => claimMission());
    } else if (!isAnyMission) {
      div.addEventListener('click', () => startMission(m));
    }
    list.appendChild(div);
  }
}
function startMission(m) {
  if (state.buddy.mission) { toast('Buddy is already on a mission'); return; }
  state.buddy.mission = m.id;
  state.buddy.missionEndsAt = Date.now() + m.durationSec * 1000;
  state.buddy.notifiedComplete = false;
  toast(`🐶 Buddy is on ${m.name}!`);
  playClick(false);
  renderMissionModal();
  render();
  save();
}
function claimMission() {
  const id = state.buddy.mission;
  if (!id) return;
  if (Date.now() < state.buddy.missionEndsAt) return;
  const m = buddyMissions.find(x => x.id === id);
  if (!m) { state.buddy.mission = null; state.buddy.missionEndsAt = 0; return; }
  const bonus = 1 + (state.buddy.level - 1) * 0.05;
  const reward = m.reward;
  const carrots = Math.floor(reward.carrots * bonus);
  state.carrots += carrots;
  state.totalCarrots += carrots;
  state.lifetimeCarrots += carrots;
  let extras = `+${fmt(carrots)} 🥕`;
  for (const [k, chance] of [['red', reward.redChance], ['blue', reward.blueChance], ['green', reward.greenChance], ['yellow', reward.yellowChance]]) {
    if (chance && Math.random() < chance) {
      state.strands[k] += 1;
      extras += ` · +1 ${k}`;
    }
  }
  state.buddy.mission = null;
  state.buddy.missionEndsAt = 0;
  state.buddy.notifiedComplete = false;
  toast(`🐶 Buddy returned! ${extras}`, true);
  playClick(false);
  checkAchievements();
  renderMissionModal();
  render();
  save();
}

// ====== RAIDS ======
const RAID_DURATION_MS = 12000;
const RAID_MIN_INTERVAL_MS = 130000;
const RAID_MAX_INTERVAL_MS = 220000;
const MARS_RAID_MIN_INTERVAL_MS = 180000;
const MARS_RAID_MAX_INTERVAL_MS = 280000;
const RAID_GRACE_MS = 150000;
const GUARD_KILL_DELAY_MS = 4000;
const TURRET_KILL_DELAY_MS = 1500;

function scheduleNextRaid(graceFirst = false) {
  if (graceFirst) { state.nextRaidAt = Date.now() + RAID_GRACE_MS; return; }
  const onMars = !!state.reachedMars;
  let min = onMars ? MARS_RAID_MIN_INTERVAL_MS : RAID_MIN_INTERVAL_MS;
  let max = onMars ? MARS_RAID_MAX_INTERVAL_MS : RAID_MAX_INTERVAL_MS;
  if (state.crafted.marsShield) { min *= 1.5; max *= 1.5; }
  if (hasPower('hardy'))        { min *= 1.3; max *= 1.3; }
  state.nextRaidAt = Date.now() + min + Math.random() * (max - min);
}
function spawnRaid() {
  if (state.raiders.length >= 6) return;
  const area = $('clicker-area').getBoundingClientRect();
  if (area.width < 200 || area.height < 200) return;
  const count = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < count; i++) {
    const edge = Math.floor(Math.random() * 4);
    const margin = 80;
    let x, y;
    if (edge === 0)      { x = margin + Math.random() * Math.max(1, area.width - margin*2); y = margin; }
    else if (edge === 1) { x = area.width - margin; y = margin + Math.random() * Math.max(1, area.height - margin*2); }
    else if (edge === 2) { x = margin + Math.random() * Math.max(1, area.width - margin*2); y = area.height - margin; }
    else                 { x = margin; y = margin + Math.random() * Math.max(1, area.height - margin*2); }
    state.raiders.push({
      id: 'r' + Date.now() + '_' + i + '_' + Math.floor(Math.random()*10000),
      x, y,
      spawnAt: Date.now() + i * 200,
      stealsAt: Date.now() + RAID_DURATION_MS + i * 200,
    });
  }
  toast('👽 Alien cat raid! Click them!', true);
  $('raid-warning').classList.remove('hidden');
}
function renderRaiders() {
  const layer = $('raid-layer');
  const present = new Set(state.raiders.map(r => r.id));
  Array.from(layer.children).forEach(el => {
    if (!present.has(el.dataset.rid) && !el.classList.contains('dying')) el.remove();
  });
  for (const r of state.raiders) {
    let el = layer.querySelector(`[data-rid="${r.id}"]`);
    if (!el) {
      el = document.createElement('div');
      el.className = 'raider';
      el.dataset.rid = r.id;
      el.innerHTML = `
        <img src="alien_cat.png" alt="">
        <div class="raid-timer"><div class="raid-timer-fill"></div></div>
      `;
      el.style.left = r.x + 'px';
      el.style.top  = r.y + 'px';
      el.addEventListener('click', ev => { ev.stopPropagation(); defeatRaider(r.id, true); });
      layer.appendChild(el);
    }
    const fill = el.querySelector('.raid-timer-fill');
    const remaining = Math.max(0, r.stealsAt - Date.now());
    fill.style.width = ((remaining / RAID_DURATION_MS) * 100) + '%';
  }
  $('raid-warning').classList.toggle('hidden', state.raiders.length === 0);
}
function defeatRaider(id, byClick) {
  const idx = state.raiders.findIndex(r => r.id === id);
  if (idx === -1) return;
  state.raiders.splice(idx, 1);
  state.raidsDefeated += 1;
  const el = $('raid-layer').querySelector(`[data-rid="${id}"]`);
  if (el) {
    el.classList.add('dying');
    setTimeout(() => el.remove(), 400);
  }
  if (byClick) {
    let reward = Math.max(20, getPerClick() * 5);
    if (hasPower('brave')) reward *= 3;
    state.carrots += reward;
    state.totalCarrots += reward;
    state.lifetimeCarrots += reward;
    toast(`💥 Splat! +${fmt(reward)} 🥕`);
  } else {
    // Guard Cat / Laser Gun give a smaller carrot reward per kill
    let reward = Math.max(10, Math.floor(getPerClick() * (state.crafted.laserTurret ? 3 : 1.5)));
    if (hasPower('brave')) reward *= 3;
    state.carrots += reward;
    state.totalCarrots += reward;
    state.lifetimeCarrots += reward;
    toast(`${state.crafted.laserTurret ? '🔫 Laser Gun' : '🐱 Guard Cat'} got one! +${fmt(reward)} 🥕`);
  }
  playClick();
  checkAchievements();
  save();
}
function processRaids(now) {
  if (!state.reachedMoon) {
    state.nextRaidAt = 0;
    if (state.raiders.length) {
      state.raiders = [];
      $('raid-layer').innerHTML = '';
      $('raid-warning').classList.add('hidden');
    }
    return;
  }
  if (state.nextRaidAt === 0) scheduleNextRaid(true);
  if (now >= state.nextRaidAt && state.raiders.length === 0) {
    spawnRaid();
    scheduleNextRaid(false);
  }
  for (let i = state.raiders.length - 1; i >= 0; i--) {
    const r = state.raiders[i];
    if (now >= r.stealsAt) {
      let stealPct = state.reachedMars ? 0.05 + Math.random() * 0.04 : 0.04 + Math.random() * 0.04;
      if (state.crafted.marsShield)  stealPct *= 0.5;
      if (hasPower('tough'))         stealPct *= 0.6;
      if (state.crafted.cecilBunker) stealPct *= 0.2;
      // Guard count also slightly reduces steal (each guard absorbs a tiny share)
      const guards = state.crafted.catGuard || 0;
      stealPct *= Math.max(0.1, 1 - Math.log10(1 + guards) * 0.15);
      if (hasPower('invulnerable'))  stealPct = 0;
      const stolen = Math.floor(state.carrots * stealPct);
      state.carrots = Math.max(0, state.carrots - stolen);
      state.carrotsStolen += stolen;
      state.raidsFailed += 1;
      state.raiders.splice(i, 1);
      const el = $('raid-layer').querySelector(`[data-rid="${r.id}"]`);
      if (el) el.remove();
      if (stolen > 0) toast(`💸 An alien cat stole ${fmt(stolen)} 🥕!`, true);
      else if (state.crafted.marsShield || hasPower('tough')) toast('🛡️ Shield blocked a raid!');
      else toast('👽 An alien cat raided… but found nothing.');
      save();
      continue;
    }
    // New guard system: each catGuard count contributes proportionally to a faster kill.
    // 1 guard = base delay; 10 guards = ~50% faster; 70 guards = ~5× faster.
    // Robo Cats (roboCatLab built) multiply kill speed ×3.
    const guards = state.crafted.catGuard || 0;
    if (guards > 0) {
      let killDelay = state.crafted.laserTurret ? TURRET_KILL_DELAY_MS : GUARD_KILL_DELAY_MS;
      const guardSpeed = 1 + Math.log10(1 + guards) * 1.3;  // smooth scaling, ~5× at 70
      killDelay /= guardSpeed;
      if (state.crafted.roboCatLab) killDelay /= 3;
      if (state.crafted.blackSamsonGarage) killDelay /= 1.5;
      if (now - r.spawnAt >= killDelay) defeatRaider(r.id, false);
    }
  }
}

// ====== TICK ======
let lastTick = Date.now();
function tick() {
  const now = Date.now();
  const dt = Math.min(1, (now - lastTick) / 1000);
  lastTick = now;
  if (dt > 0) {
    const cps = getPerSec();
    if (cps > 0) {
      const gain = cps * dt;
      state.carrots += gain;
      state.totalCarrots += gain;
      state.lifetimeCarrots += gain;
    }
    state.scrap    += getScrapPerSec()   * dt;
    state.fuel     += getFuelPerSec()    * dt;
    state.research += getResearchPerSec()* dt;
    state.iron     += getIronPerSec()    * dt;
    state.quarks   += getQuarksPerSec()  * dt;
    state.atoms    += getAtomsPerSec()   * dt;
  }
  if (state.clickStreak > 0 && now - state.lastClickAt > STREAK_WINDOW_MS) state.clickStreak = 0;

  if (state.researched.moonTrajectory && !state.crafted.rocketMk1 &&
      state.rocketProgress >= state.rocketProgressMax) {
    const recipe = recipes.find(r => r.id === 'rocketMk1');
    if (canAfford(recipe.cost)) {
      pay(recipe.cost);
      state.crafted.rocketMk1 = true;
      state.rocketProgress = 0;
      toast('🛰️ Small Rocket ready!', true);
      save();
    }
  }

  // Mission-complete notification (once per mission)
  if (state.buddy.unlocked && state.buddy.mission && !state.buddy.notifiedComplete
      && now >= state.buddy.missionEndsAt) {
    state.buddy.notifiedComplete = true;
    const m = buddyMissions.find(x => x.id === state.buddy.mission);
    toast(`🐶 Buddy is back from ${m ? m.name : 'a mission'}! Click him to collect.`, true);
    save();
  }

  processRaids(now);
  renderRaiders();
  updateGuard();
  processGolden(now);
  renderGolden(now);
  processOmniMan(now);
  renderOmniMan();
  updateFrenzyClass();
  checkAchievements();
  render();
}

// ====== OMNI-MAN (Invincible-dimension boss) ======
const OMNIMAN_MIN_INTERVAL_MS = 5 * 60 * 1000;
const OMNIMAN_MAX_INTERVAL_MS = 15 * 60 * 1000;
const OMNIMAN_STEAL_PCT_PER_SEC = 0.01;
const ROBO_CAT_DPS_PER_GUARD = 800;  // base; multiplied by Black Samson Garage

function omniManHpScale() {
  // Scale with player's click power so the fight always takes ~80-150 clicks,
  // never trivial late-game. Also factors in prestige + omni-defeated history.
  const clickPower = Math.max(1, getPerClick());
  const baseClicks = 100 + (state.omniManDefeated || 0) * 10;  // each defeat makes him tougher
  let hp = clickPower * baseClicks * (1 + state.prestigeCount * 0.15);
  if (hasResearch('killingSucks')) hp *= 0.7;
  return Math.floor(Math.max(1000000, hp));
}
function scheduleNextOmniMan(firstGrace) {
  // After defeat or on entering Invincible dimension: grace then random window.
  const grace = firstGrace ? 3 * 60 * 1000 : 0;
  state.nextOmniManAt = Date.now() + grace + OMNIMAN_MIN_INTERVAL_MS +
    Math.random() * (OMNIMAN_MAX_INTERVAL_MS - OMNIMAN_MIN_INTERVAL_MS);
}
function spawnOmniMan() {
  if (state.omniMan) return;
  const hp = omniManHpScale();
  const area = $('clicker-area').getBoundingClientRect();
  state.omniMan = {
    hp, maxHp: hp,
    x: Math.max(80, Math.min(area.width - 80, area.width * 0.65)),
    y: Math.max(120, Math.min(area.height - 80, area.height * 0.35)),
    lastTickAt: Date.now(),
  };
  toast('🚨 OMNI-MAN HAS ARRIVED! Click to attack — he steals 1% of your carrots every second!', true);
}
function damageOmniMan(amount, fromClick) {
  if (!state.omniMan) return;
  state.omniMan.hp -= amount;
  if (state.omniMan.hp <= 0) {
    defeatOmniMan();
    return;
  }
  if (fromClick) {
    const el = document.getElementById('omni-man');
    if (el) {
      el.classList.remove('hit');
      void el.offsetWidth;
      el.classList.add('hit');
    }
  }
}
function defeatOmniMan() {
  const baseHp = state.omniMan ? state.omniMan.maxHp : 1;
  state.omniMan = null;
  state.omniManDefeated += 1;
  // Reward: massive carrots + resources + 1 Glory
  const carrotReward = Math.floor(baseHp * 0.5);
  state.carrots       += carrotReward;
  state.totalCarrots  += carrotReward;
  state.lifetimeCarrots += carrotReward;
  state.scrap         += 200;
  state.iron          += 100;
  state.strands.glory  = (state.strands.glory || 0) + 1;
  toast(`💀 OMNI-MAN DEFEATED! +${fmt(carrotReward)} 🥕, +1 ⭐ Glory!`, true);
  scheduleNextOmniMan(false);
  const el = document.getElementById('omni-man');
  if (el) el.remove();
  checkAchievements();
  save();
  render();
}
function processOmniMan(now) {
  // Only active in Invincible dimension
  if (state.dimension !== 'invincible') {
    if (state.omniMan) {
      state.omniMan = null;
      const el = document.getElementById('omni-man');
      if (el) el.remove();
    }
    return;
  }
  if (state.nextOmniManAt === 0) scheduleNextOmniMan(true);
  if (!state.omniMan && now >= state.nextOmniManAt) {
    spawnOmniMan();
  }
  if (state.omniMan) {
    const o = state.omniMan;
    // Cap dt at 1s — protects against background-tab throttling spikes or stale timestamps
    const dt = Math.min(1, (now - o.lastTickAt) / 1000);
    o.lastTickAt = now;
    // Carrot drain: 1% per second, halved by Killing Sucks
    let drainPct = OMNIMAN_STEAL_PCT_PER_SEC;
    if (hasResearch('killingSucks')) drainPct *= 0.5;
    if (hasPower('invulnerable'))    drainPct = 0;
    const stolen = state.carrots * (1 - Math.pow(1 - drainPct, dt));
    if (stolen > 0) {
      state.carrots = Math.max(0, state.carrots - stolen);
      state.carrotsStolen += stolen;
    }
    // Robo Cat DPS — passive damage while Omni-Man is alive
    if (state.crafted.roboCatLab) {
      let dps = ROBO_CAT_DPS_PER_GUARD * (state.crafted.catGuard || 0);
      if (state.crafted.blackSamsonGarage) dps *= 2;
      damageOmniMan(dps * dt, false);
    }
  }
}
function renderOmniMan() {
  let el = document.getElementById('omni-man');
  if (!state.omniMan) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('div');
    el.id = 'omni-man';
    el.innerHTML = `
      <div class="omni-body">
        <div class="omni-head">
          <div class="omni-eyes"></div>
          <div class="omni-mustache"></div>
        </div>
        <div class="omni-torso"></div>
      </div>
      <div class="omni-hp"><div class="omni-hp-fill"></div></div>
      <div class="omni-hp-text"></div>
    `;
    el.addEventListener('click', ev => {
      ev.stopPropagation();
      const dmg = getPerClick();
      // Append floater to the outer clicker-area so it survives the killing blow
      // when defeatOmniMan removes the Omni-Man wrapper.
      const area = $('clicker-area');
      spawnFloater(area, area, ev, '-' + fmt(dmg), 'crit');
      damageOmniMan(dmg, true);
    });
    $('clicker-area').appendChild(el);
  }
  const o = state.omniMan;
  el.style.left = o.x + 'px';
  el.style.top  = o.y + 'px';
  const pct = Math.max(0, o.hp / o.maxHp);
  el.querySelector('.omni-hp-fill').style.width = (pct * 100) + '%';
  el.querySelector('.omni-hp-text').textContent = `${fmt(Math.max(0, o.hp))} / ${fmt(o.maxHp)}`;
}

// ====== GOLDEN CARROT (random event) ======
const GOLDEN_LIFETIME_MS = 14000;
const GOLDEN_MIN_INTERVAL_MS = 120000;
const GOLDEN_MAX_INTERVAL_MS = 260000;

function scheduleNextGolden() {
  state.nextGoldenAt = Date.now() + GOLDEN_MIN_INTERVAL_MS +
    Math.random() * (GOLDEN_MAX_INTERVAL_MS - GOLDEN_MIN_INTERVAL_MS);
}
function processGolden(now) {
  // Don't bother until player has clicked at least 10 times
  if (state.totalClicks < 10) return;
  if (state.nextGoldenAt === 0) { scheduleNextGolden(); return; }
  if (state.golden) {
    if (now > state.golden.expiresAt) {
      const el = document.getElementById('golden-carrot');
      if (el) el.remove();
      state.golden = null;
      scheduleNextGolden();
    }
    return;
  }
  if (now >= state.nextGoldenAt) {
    const area = document.getElementById('clicker-area');
    if (!area) return;
    const r = area.getBoundingClientRect();
    if (r.width < 200 || r.height < 200) return;
    const margin = 70;
    state.golden = {
      x: margin + Math.random() * Math.max(1, r.width - margin * 2),
      y: margin + Math.random() * Math.max(1, r.height - margin * 2),
      expiresAt: now + GOLDEN_LIFETIME_MS,
    };
    toast('🟡 A Golden Carrot appeared! Click it fast!', true);
  }
}
function renderGolden(now) {
  let el = document.getElementById('golden-carrot');
  if (!state.golden) { if (el) el.remove(); return; }
  if (!el) {
    el = document.createElement('div');
    el.id = 'golden-carrot';
    el.textContent = '🥕✨';
    el.addEventListener('click', ev => { ev.stopPropagation(); claimGolden(); });
    document.getElementById('clicker-area').appendChild(el);
  }
  // Clamp against current area size in case the window was resized after spawn
  const r = document.getElementById('clicker-area').getBoundingClientRect();
  const margin = 50;
  const clampedX = Math.min(Math.max(state.golden.x, margin), Math.max(margin, r.width - margin));
  const clampedY = Math.min(Math.max(state.golden.y, margin), Math.max(margin, r.height - margin));
  el.style.left = clampedX + 'px';
  el.style.top  = clampedY + 'px';
  const pct = Math.max(0, (state.golden.expiresAt - now) / GOLDEN_LIFETIME_MS);
  el.style.opacity = (0.5 + pct * 0.5).toFixed(2);
}
function claimGolden() {
  if (!state.golden) return;
  // Reward = 90s of current carrots/sec, floored at 15× per-click for early game
  const reward = Math.max(getPerClick() * 15, Math.floor(getPerSec() * 90));
  state.carrots += reward;
  state.totalCarrots += reward;
  state.lifetimeCarrots += reward;
  state.goldenClaimed += 1;
  // 35% chance to also trigger Pancake Frenzy (10s of x2 clicks)
  if (Math.random() < 0.35) triggerFrenzy(10000);
  toast(`🟡 Golden! +${fmt(reward)} 🥕`, true);
  playClick(false);
  const el = document.getElementById('golden-carrot');
  if (el) el.remove();
  state.golden = null;
  scheduleNextGolden();
  checkAchievements();
  render();
  save();
}
function triggerFrenzy(ms) {
  const now = Date.now();
  state.frenzyUntil = Math.max(state.frenzyUntil, now) + ms;
  toast('🥞 PANCAKE FRENZY — clicks ×2!', true);
  // Class is kept in sync inside tick() via updateFrenzyClass() — no fragile setTimeout
}
function updateFrenzyClass() {
  const on = isFrenzy();
  document.body.classList.toggle('frenzy', on);
  const ind = document.getElementById('frenzy-indicator');
  if (on) {
    const left = Math.ceil((state.frenzyUntil - Date.now()) / 1000);
    if (!ind) {
      const el = document.createElement('div');
      el.id = 'frenzy-indicator';
      document.getElementById('clicker-area').appendChild(el);
    }
    const indEl = document.getElementById('frenzy-indicator');
    if (indEl) indEl.textContent = `🥞 FRENZY ×2 · ${left}s`;
  } else if (ind) {
    ind.remove();
  }
}

// ====== GUARD CAT (visible defender) ======
let guardEl = null;
function updateGuard() {
  if (!state.crafted.catGuard) {
    if (guardEl) { guardEl.remove(); guardEl = null; }
    return;
  }
  const area = $('clicker-area');
  if (!guardEl) {
    guardEl = document.createElement('div');
    guardEl.id = 'guard-cat';
    guardEl.innerHTML = '<img src="cat_guard.png" alt="Guard Cat" draggable="false">';
    area.appendChild(guardEl);
  }
  guardEl.classList.toggle('robo', !!state.crafted.roboCatLab);
  const target = state.raiders[0];
  if (target) {
    guardEl.style.left = target.x + 'px';
    guardEl.style.top = target.y + 'px';
    guardEl.classList.add('attacking');
  } else {
    const r = area.getBoundingClientRect();
    guardEl.style.left = '50px';
    guardEl.style.top = (r.height - 60) + 'px';
    guardEl.classList.remove('attacking');
  }
}

// ====== LAUNCH ======
function launchSeq(emoji, duration, onDone) {
  document.querySelectorAll('#launch-overlay').forEach(el => el.remove());
  const overlay = document.createElement('div');
  overlay.id = 'launch-overlay';
  overlay.textContent = emoji;
  document.body.appendChild(overlay);
  playClick(false);
  setTimeout(() => playClick(false), 300);
  setTimeout(() => playClick(false), 600);
  setTimeout(() => { overlay.remove(); onDone(); }, duration);
}
function crossDimension() {
  if (!hasResearch('dimensionalTravel')) return;
  if (state.dimension === 'invincible') return;
  // Commit the state change synchronously so a mid-animation prestige can't be
  // overwritten by a delayed setTimeout (real race that would surprise-flip
  // dimension after a fresh rebirth).
  state.dimension = 'invincible';
  state.dimensionsVisited.invincible = true;
  // Progression is preserved — reachedMoon/reachedMars stay true. Only the
  // visual planet overlay resets via updateBodyClasses().
  toast('🌀 You crossed into the Invincible Dimension. Earth looks different here.', true);
  checkAchievements();
  updateBodyClasses();
  render();
  save();
  // Pure-visual overlay; outlives even if the player navigates elsewhere mid-anim.
  const overlay = document.createElement('div');
  overlay.id = 'dimension-overlay';
  overlay.innerHTML = `🌀 TEARING REALITY 🌀<div class="sub">CROSSING TO THE INVINCIBLE DIMENSION</div>`;
  document.body.appendChild(overlay);
  playClick(false);
  setTimeout(() => playClick(false), 400);
  setTimeout(() => playClick(false), 800);
  setTimeout(() => overlay.remove(), 4600);
}

function launchMoon() {
  if (!state.crafted.rocketMk1 || state.reachedMoon) return;
  launchSeq('🚀', 4000, () => {
    state.reachedMoon = true;
    const moondustGain = hasResearch('lunarGeology') ? 100 : 50;
    state.moondust += moondustGain;
    toast(`🌙 You reached the Moon! +${moondustGain} Moondust. Everything +30%!`, true);
    checkAchievements();
    render(); save();
  });
}
function launchMars() {
  if (!state.crafted.rocketMk2 || state.reachedMars) return;
  launchSeq('🚀', 4500, () => {
    state.reachedMars = true;
    state.iron += 50;
    toast('🔴 You reached Mars! +50 Iron. Everything +60%! Build a Mars Garden!', true);
    checkAchievements();
    render(); save();
  });
}
function launchGlacio() {
  if (!state.crafted.rocketMk3 || state.reachedGlacio) return;
  launchSeq('🧊', 5000, () => {
    state.reachedGlacio = true;
    state.atoms += 30;
    toast('🧊 You reached Glacio! +30 ☢️ Atoms. Everything +90%! Build Ice Gardens.', true);
    checkAchievements();
    updateBodyClasses();
    render(); save();
  });
}
function crossToQuantum() {
  if (!hasResearch('quantumTravel')) return;
  // Mark visited; this is a one-time unlock that enables Atom Farms + Butter Dawg skin.
  if (!state.dimensionsVisited.quantum) {
    state.dimensionsVisited.quantum = true;
    toast('⚛️ You entered the Quantum Realm! Atom Farms unlocked.', true);
  } else {
    toast('⚛️ Quantum Realm re-entered. Atom production stable.');
  }
  // Visual: brief overlay
  const overlay = document.createElement('div');
  overlay.id = 'dimension-overlay';
  overlay.innerHTML = `⚛️ QUANTUM SHRINK ⚛️<div class="sub">ENTERING THE SUB-ATOMIC UNIVERSE</div>`;
  document.body.appendChild(overlay);
  playClick(false);
  setTimeout(() => overlay.remove(), 4600);
  checkAchievements();
  render(); save();
}

// ====== ACHIEVEMENTS ======
function checkAchievements() {
  let any = false;
  for (const a of achievements) {
    if (!state.achievements[a.id] && a.check(state)) {
      state.achievements[a.id] = true;
      toast(`🏆 ${a.name}`, true);
      any = true;
    }
  }
  if (checkSkinUnlocks()) any = true;
  if (any) save();
}

// ====== TOASTS ======
function toast(msg, big = false) {
  const area = $('toast-area');
  // Cap stacked toasts so a burst doesn't bury the screen
  while (area.children.length >= 6) area.firstChild.remove();
  const t = document.createElement('div');
  t.className = 'toast' + (big ? ' big' : '');
  t.textContent = msg;
  area.appendChild(t);
  setTimeout(() => t.remove(), 3700);
}

// ====== TABS ======
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    tab.classList.add('active');
    $('tab-' + tab.dataset.tab).classList.remove('hidden');
    // Force an immediate render of the newly visible tab so it's not blank for 100ms.
    render();
  });
});

// ====== EVENTS ======
$('bunny-wrap').addEventListener('click', clickBunny);
$('station-wrap').addEventListener('click', clickStation);
$('sequencer-wrap').addEventListener('click', clickSequencer);
$('open-dna-btn').addEventListener('click', openDnaModal);
$('accelerator-wrap').addEventListener('click', clickAccelerator);
$('open-parts-btn').addEventListener('click', () => {
  $('parts-modal').classList.remove('hidden');
  renderPartsModal();
});
$('buddy-wrap').addEventListener('click', () => {
  if (state.buddy.mission && Date.now() >= state.buddy.missionEndsAt) claimMission();
  else openMissionModal();
});
$('open-missions-btn').addEventListener('click', openMissionModal);
$('train-buddy-btn').addEventListener('click', trainBuddy);
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => $(btn.dataset.close).classList.add('hidden'));
});
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.add('hidden'); });
});
$('launch-btn').addEventListener('click', launchMoon);
$('launch-mars-btn').addEventListener('click', launchMars);
$('launch-glacio-btn').addEventListener('click', launchGlacio);
$('quantum-btn').addEventListener('click', crossToQuantum);
$('dimension-travel-btn').addEventListener('click', crossDimension);
$('prestige-btn').addEventListener('click', doPrestige);
$('prestige-level-btn').addEventListener('click', doPrestigeLevel);

$('save-btn').addEventListener('click', () => { save(); toast('💾 Saved!'); });
$('download-save-btn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'pancake-bunny-save.json';
  document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  toast('📁 Save downloaded');
});
$('upload-save-btn').addEventListener('click', () => $('upload-save-input').click());
$('upload-save-input').addEventListener('change', e => {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      state = mergeState(JSON.parse(ev.target.result));
      updateBodyClasses();
      save(); render(); toast('📂 Loaded');
    } catch (err) { alert('Bad save file'); }
  };
  reader.readAsText(file);
  e.target.value = '';
});
$('export-btn').addEventListener('click', () => {
  prompt('Copy your save code:', btoa(JSON.stringify(state)));
});
$('import-btn').addEventListener('click', () => {
  const data = prompt('Paste your save code:'); if (!data) return;
  try {
    state = mergeState(JSON.parse(atob(data.trim())));
    updateBodyClasses();
    save(); render(); toast('📥 Loaded!');
  } catch (err) { alert('Bad save code'); }
});
$('reset-btn').addEventListener('click', () => {
  if (!confirm('Reset everything? You cannot undo this.')) return;
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem(LAST_SEEN_KEY);
  state = defaultState();
  $('raid-layer').innerHTML = '';
  $('raid-warning').classList.add('hidden');
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  if (guardEl) { guardEl.remove(); guardEl = null; }
  updateBodyClasses();
  render();
  toast('🔥 Reset done');
});
$('sound-toggle').addEventListener('change', e => {
  audioState.enabled = e.target.checked;
  localStorage.setItem('bunny_sound', audioState.enabled ? '1' : '0');
});
$('volume-slider').addEventListener('input', e => {
  audioState.volume = e.target.value / 100;
  localStorage.setItem('bunny_volume', audioState.volume.toString());
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    return;
  }
  if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
    e.preventDefault();
    clickBunny();
  }
});

window.addEventListener('beforeunload', () => { save(); });
window.addEventListener('pagehide', () => { save(); });
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') save();
});

// ====== INIT ======
initAudio();
load();
probeCheatFile();

// First-run welcome modal (only the very first time on a clean save)
const WELCOME_SEEN_KEY = 'pancakeBunny_welcomeSeen';
function maybeShowWelcome() {
  const wel = $('welcome-modal');
  if (!wel) return;
  const seen = localStorage.getItem(WELCOME_SEEN_KEY) === '1';
  // Show only if no save AND no seen flag
  if (seen || state.totalClicks > 0 || state.lifetimeCarrots > 0) return;
  wel.classList.remove('hidden');
  const closeBtn = $('welcome-start-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      wel.classList.add('hidden');
      localStorage.setItem(WELCOME_SEEN_KEY, '1');
    });
  }
  wel.addEventListener('click', e => {
    if (e.target === wel) {
      wel.classList.add('hidden');
      localStorage.setItem(WELCOME_SEEN_KEY, '1');
    }
  });
}
setTimeout(maybeShowWelcome, 100);

if (!state.lifetimeCarrots && state.totalCarrots) state.lifetimeCarrots = state.totalCarrots;
for (const k of ['carrots','totalCarrots','lifetimeCarrots','scrap','fuel','iron','research','moondust','starFragments']) {
  if (typeof state[k] !== 'number' || isNaN(state[k]) || state[k] < 0) state[k] = 0;
}

$('sound-toggle').checked = audioState.enabled;
$('volume-slider').value = Math.round(audioState.volume * 100);

updateBodyClasses();

(function applyOffline() {
  const last = parseInt(localStorage.getItem(LAST_SEEN_KEY) || '0', 10);
  if (!last) return;
  const dt = Math.min((Date.now() - last) / 1000, 3600 * 4);
  const cps = getPerSec();
  const gain = cps * dt * 0.20;
  if (gain >= 1) {
    state.carrots += gain;
    state.totalCarrots += gain;
    state.lifetimeCarrots += gain;
    setTimeout(() => toast(`💤 Offline: +${fmt(gain)} carrots`), 400);
  }
  state.scrap    += getScrapPerSec()    * dt * 0.20;
  state.fuel     += getFuelPerSec()     * dt * 0.20;
  state.research += getResearchPerSec() * dt * 0.20;
  state.iron     += getIronPerSec()     * dt * 0.20;
  state.quarks   += getQuarksPerSec()   * dt * 0.20;
  state.atoms    += getAtomsPerSec()    * dt * 0.20;
})();

render();
setInterval(tick, 100);
setInterval(save, 5000);
