/* =============================================================
   Pancake Bunny — Ages.  Fresh rewrite.
   ============================================================= */
'use strict';

const SAVE_KEY = 'pancakeAges_v2';
const $ = id => document.getElementById(id);
const fmt = n => {
  if (!isFinite(n)) return '∞';
  if (n < 1000) return Math.floor(n).toString();
  const u = ['','K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc'];
  let i = 0;
  while (n >= 1000 && i < u.length - 1) { n /= 1000; i++; }
  return n.toFixed(2) + u[i];
};

/* ============ DATA: AGES ============ */
const AGES = [
  { id: 'stone',     name: 'Stone Age',  flavor: 'A bunny discovers berries.' },
  { id: 'bronze',    name: 'Bronze Age', flavor: 'Sparks fly from copper and tin.' },
  { id: 'iron',      name: 'Iron Age',   flavor: 'Swords for everyone.' },
  { id: 'medieval',  name: 'Medieval Era', flavor: 'Castles and cathedrals rise.' },
  { id: 'industrial',name: 'Industrial Age', flavor: 'Steam, smoke, and progress.' },
  { id: 'modern',    name: 'Modern Era', flavor: 'Computers connect everything.' },
  { id: 'space',     name: 'Space Age',  flavor: 'The bunny looks up.' },
  { id: 'cosmic',    name: 'Cosmic Age', flavor: 'Reality bends.' },
];
const ageIdx = id => AGES.findIndex(a => a.id === id);

/* ============ DATA: RESOURCES ============ */
const RES_DEFS = [
  { id: 'berries',     icon: '🫐', name: 'Berries',     fromAge: 0, title: 'Earned by clicking. The primary currency.' },
  { id: 'stone',       icon: '🪨', name: 'Stone',       fromAge: 0, title: 'Dropped by clicks once you have a Sharp Stick.' },
  { id: 'bronze',      icon: '🥉', name: 'Bronze',      fromAge: 1, title: 'Smelted at Bronze Mines.' },
  { id: 'iron',        icon: '⛓️', name: 'Iron',        fromAge: 2, title: 'Produced by Iron Forges.' },
  { id: 'gold',        icon: '🪙', name: 'Gold',        fromAge: 3, title: 'Stamped in Medieval mints.' },
  { id: 'coal',        icon: '⚫', name: 'Coal',        fromAge: 4, title: 'Mined for Industrial-Age steam.' },
  { id: 'electricity', icon: '⚡', name: 'Watts',       fromAge: 5, title: 'Generated in Modern-Era power plants.' },
  { id: 'fuel',        icon: '⛽', name: 'Fuel',        fromAge: 6, title: 'Rocket-grade. Space-Age resource.' },
  { id: 'quarks',      icon: '⚛️', name: 'Quarks',      fromAge: 7, title: 'Sub-atomic. Cosmic-Age resource.' },
];

/* ============ DATA: SKILLS ============ */
/* Each skill: id, age, icon, name, desc, cost, effects, requires?
   effects keys:
     clickAdd        — flat add to per-click
     clickMult       — multiplicative bonus on per-click (0.5 = +50%)
     globalMult      — multiplicative bonus on global mult (0.25 = +25%)
     perSecAdd       — flat add to passive per-sec
     stonePerClick   — extra chance of stone per click (0-1)
     bronzePerSec    — passive bronze/sec
     ironPerSec      — passive iron/sec
     goldPerSec      — passive gold/sec
     coalPerSec      — passive coal/sec
     wattsPerSec     — passive electricity/sec
     fuelPerSec      — passive fuel/sec
     quarksPerSec    — passive quarks/sec
     helperMult      — multiplicative bonus on helper output
     critChance      — % chance per click to crit (×5)
     advance         — when bought, sets next age id (one per age)
*/
const SKILLS = [
  // ===== STONE =====
  { id: 'st_paws',   age: 'stone', icon: '✋', name: 'Strong Paws',  desc: '+1 per click',         cost: { berries: 15 },  effects: { clickAdd: 1 } },
  { id: 'st_stick',  age: 'stone', icon: '🌿', name: 'Sharp Stick',  desc: '+3 per click, clicks have a chance for 🪨', cost: { berries: 60 }, requires: ['st_paws'], effects: { clickAdd: 3, stonePerClick: 0.35 } },
  { id: 'st_fire',   age: 'stone', icon: '🔥', name: 'Make Fire',    desc: '+15% global multiplier', cost: { berries: 200 }, requires: ['st_stick'], effects: { globalMult: 0.15 } },
  { id: 'st_cave',   age: 'stone', icon: '🦴', name: 'Cave Painting',desc: '+5 per click',         cost: { berries: 500, stone: 5 }, requires: ['st_fire'], effects: { clickAdd: 5 } },
  { id: 'st_tribe',  age: 'stone', icon: '👥', name: 'Form Tribe',   desc: '+30% global multiplier · +0.5/sec', cost: { berries: 1200, stone: 12 }, requires: ['st_cave'], effects: { globalMult: 0.30, perSecAdd: 0.5 } },
  { id: 'st_adv',    age: 'stone', icon: '🥉', name: 'Discover Bronze', desc: 'Advance to the Bronze Age.', cost: { berries: 3000, stone: 30 }, requires: ['st_tribe'], effects: { advance: 'bronze' } },

  // ===== BRONZE =====
  { id: 'br_smelt',  age: 'bronze', icon: '⚒️', name: 'Smelting',     desc: '+12 per click',        cost: { berries: 2500, stone: 20 }, effects: { clickAdd: 12 } },
  { id: 'br_pottery',age: 'bronze', icon: '🏺', name: 'Pottery',      desc: '+20% global · helpers +20%', cost: { berries: 5000 }, requires: ['br_smelt'], effects: { globalMult: 0.20, helperMult: 0.20 } },
  { id: 'br_mine',   age: 'bronze', icon: '⛏️', name: 'Bronze Mine',  desc: '+0.4 bronze/sec',      cost: { berries: 8000, stone: 50 }, requires: ['br_smelt'], effects: { bronzePerSec: 0.4 } },
  { id: 'br_wheel',  age: 'bronze', icon: '🛞', name: 'The Wheel',    desc: '+50% click power',     cost: { berries: 15000, bronze: 10 }, requires: ['br_mine'], effects: { clickMult: 0.50 } },
  { id: 'br_writing',age: 'bronze', icon: '📜', name: 'Writing',      desc: '+25% global · +3/sec', cost: { berries: 30000, bronze: 20 }, requires: ['br_pottery'], effects: { globalMult: 0.25, perSecAdd: 3 } },
  { id: 'br_adv',    age: 'bronze', icon: '⚔️', name: 'Forge Iron',   desc: 'Advance to the Iron Age.', cost: { berries: 60000, bronze: 40 }, requires: ['br_wheel','br_writing'], effects: { advance: 'iron' } },

  // ===== IRON =====
  { id: 'ir_sword',  age: 'iron', icon: '⚔️', name: 'Iron Sword',    desc: '+40 per click',         cost: { berries: 90000, bronze: 20 }, effects: { clickAdd: 40 } },
  { id: 'ir_forge',  age: 'iron', icon: '🔥', name: 'Iron Forge',    desc: '+1 iron/sec',           cost: { berries: 130000, bronze: 30 }, effects: { ironPerSec: 1 } },
  { id: 'ir_plow',   age: 'iron', icon: '🌾', name: 'Iron Plow',     desc: '+40% global · +15/sec', cost: { berries: 220000 }, requires: ['ir_sword'], effects: { globalMult: 0.40, perSecAdd: 15 } },
  { id: 'ir_aqua',   age: 'iron', icon: '💧', name: 'Aqueduct',      desc: 'Helpers +50%',          cost: { berries: 350000, iron: 20 }, requires: ['ir_forge'], effects: { helperMult: 0.50 } },
  { id: 'ir_chariot',age: 'iron', icon: '🐎', name: 'Chariot',       desc: '+100% click power',     cost: { berries: 600000, iron: 40 }, requires: ['ir_plow'], effects: { clickMult: 1.00 } },
  { id: 'ir_adv',    age: 'iron', icon: '🏰', name: 'Found Kingdom', desc: 'Advance to the Medieval Era.', cost: { berries: 1500000, iron: 80 }, requires: ['ir_aqua','ir_chariot'], effects: { advance: 'medieval' } },

  // ===== MEDIEVAL =====
  { id: 'md_castle', age: 'medieval', icon: '🏰', name: 'Castle',     desc: '+50% global',          cost: { berries: 3000000, iron: 50 }, effects: { globalMult: 0.50 } },
  { id: 'md_knight', age: 'medieval', icon: '🛡️', name: 'Knight Order',desc: '+200 per click',     cost: { berries: 5000000, iron: 80 }, requires: ['md_castle'], effects: { clickAdd: 200 } },
  { id: 'md_mint',   age: 'medieval', icon: '🪙', name: 'Royal Mint', desc: '+0.5 gold/sec',        cost: { berries: 8000000, iron: 100 }, requires: ['md_castle'], effects: { goldPerSec: 0.5 } },
  { id: 'md_cathedr',age: 'medieval', icon: '⛪', name: 'Cathedral',  desc: '+60% global · 5% crit chance', cost: { berries: 15000000, gold: 20 }, requires: ['md_knight'], effects: { globalMult: 0.60, critChance: 0.05 } },
  { id: 'md_guild',  age: 'medieval', icon: '🛒', name: 'Guild Hall', desc: 'Helpers +75% · +100/sec', cost: { berries: 25000000, gold: 40 }, requires: ['md_mint'], effects: { helperMult: 0.75, perSecAdd: 100 } },
  { id: 'md_adv',    age: 'medieval', icon: '🖨️', name: 'Printing Press', desc: 'Advance to the Industrial Age.', cost: { berries: 80000000, gold: 100 }, requires: ['md_cathedr','md_guild'], effects: { advance: 'industrial' } },

  // ===== INDUSTRIAL =====
  { id: 'in_engine', age: 'industrial', icon: '🚂', name: 'Steam Engine', desc: '+800 per click',  cost: { berries: 150000000, gold: 60 }, effects: { clickAdd: 800 } },
  { id: 'in_factory',age: 'industrial', icon: '🏭', name: 'Factory',  desc: '+1000/sec',           cost: { berries: 300000000, gold: 100 }, requires: ['in_engine'], effects: { perSecAdd: 1000 } },
  { id: 'in_mine',   age: 'industrial', icon: '⛏️', name: 'Coal Mine',desc: '+2 coal/sec',         cost: { berries: 500000000, gold: 150 }, requires: ['in_engine'], effects: { coalPerSec: 2 } },
  { id: 'in_rail',   age: 'industrial', icon: '🚆', name: 'Railroad', desc: '+100% click · helpers +100%', cost: { berries: 1000000000, coal: 30 }, requires: ['in_factory'], effects: { clickMult: 1.00, helperMult: 1.00 } },
  { id: 'in_tele',   age: 'industrial', icon: '📡', name: 'Telegraph',desc: '+80% global · +5000/sec', cost: { berries: 2200000000, coal: 60 }, requires: ['in_mine'], effects: { globalMult: 0.80, perSecAdd: 5000 } },
  { id: 'in_adv',    age: 'industrial', icon: '⚡', name: 'Tame Electricity', desc: 'Advance to the Modern Era.', cost: { berries: 5e9, coal: 120 }, requires: ['in_rail','in_tele'], effects: { advance: 'modern' } },

  // ===== MODERN =====
  { id: 'md2_bulb',  age: 'modern', icon: '💡', name: 'Lightbulb',    desc: '+0.5 watts/sec',      cost: { berries: 1e10, coal: 50 }, effects: { wattsPerSec: 0.5 } },
  { id: 'md2_comp',  age: 'modern', icon: '💻', name: 'Computer',     desc: '+5000 per click',     cost: { berries: 2e10, coal: 80 }, requires: ['md2_bulb'], effects: { clickAdd: 5000 } },
  { id: 'md2_inet',  age: 'modern', icon: '🌐', name: 'Internet',     desc: '+150% global · +50000/sec', cost: { berries: 5e10, electricity: 10 }, requires: ['md2_comp'], effects: { globalMult: 1.50, perSecAdd: 50000 } },
  { id: 'md2_sat',   age: 'modern', icon: '🛰️', name: 'Satellites',   desc: 'Helpers +150% · crit +10%', cost: { berries: 1e11, electricity: 25 }, requires: ['md2_inet'], effects: { helperMult: 1.50, critChance: 0.10 } },
  { id: 'md2_quant', age: 'modern', icon: '⚛️', name: 'Quantum Mechanics', desc: '+1 fuel/sec · +200% click', cost: { berries: 3e11, electricity: 50 }, requires: ['md2_sat'], effects: { fuelPerSec: 1, clickMult: 2.00 } },
  { id: 'md2_adv',   age: 'modern', icon: '🚀', name: 'Build a Rocket', desc: 'Advance to the Space Age.', cost: { berries: 1e12, electricity: 100, fuel: 30 }, requires: ['md2_quant'], effects: { advance: 'space' } },

  // ===== SPACE =====
  { id: 'sp_moon',   age: 'space', icon: '🌙', name: 'Moon Landing',  desc: '+200% global multiplier', cost: { berries: 5e12, fuel: 40 }, effects: { globalMult: 2.00 } },
  { id: 'sp_mars',   age: 'space', icon: '🔴', name: 'Mars Mission',  desc: '+800% click power',   cost: { berries: 1.5e13, fuel: 80 }, requires: ['sp_moon'], effects: { clickMult: 8.00 } },
  { id: 'sp_accel',  age: 'space', icon: '⚛️', name: 'Particle Accelerator', desc: '+2 quarks/sec', cost: { berries: 4e13, fuel: 150 }, requires: ['sp_mars'], effects: { quarksPerSec: 2 } },
  { id: 'sp_iss',    age: 'space', icon: '🛰️', name: 'Space Station', desc: 'Helpers +300% · +1M/sec', cost: { berries: 1e14, quarks: 30 }, requires: ['sp_accel'], effects: { helperMult: 3.00, perSecAdd: 1e6 } },
  { id: 'sp_jump',   age: 'space', icon: '🌀', name: 'Quantum Jump',  desc: '+500% global · crit +15%', cost: { berries: 3e14, quarks: 80 }, requires: ['sp_iss'], effects: { globalMult: 5.00, critChance: 0.15 } },
  { id: 'sp_adv',    age: 'space', icon: '🌌', name: 'Tear Spacetime', desc: 'Advance to the Cosmic Age.', cost: { berries: 1e15, quarks: 200 }, requires: ['sp_jump'], effects: { advance: 'cosmic' } },

  // ===== COSMIC =====
  { id: 'cs_star',   age: 'cosmic', icon: '⭐', name: 'Star Forge',   desc: '+1000% click power',  cost: { berries: 5e15, quarks: 300 }, effects: { clickMult: 10.00 } },
  { id: 'cs_galaxy', age: 'cosmic', icon: '🌌', name: 'Galaxy Map',   desc: '+1000% global',       cost: { berries: 2e16, quarks: 600 }, requires: ['cs_star'], effects: { globalMult: 10.00 } },
  { id: 'cs_dyson',  age: 'cosmic', icon: '☀️', name: 'Dyson Sphere', desc: '+5/sec watts · +5/sec fuel · +5/sec quarks', cost: { berries: 1e17, quarks: 1200 }, requires: ['cs_galaxy'], effects: { wattsPerSec: 5, fuelPerSec: 5, quarksPerSec: 5 } },
  { id: 'cs_dim',    age: 'cosmic', icon: '🔮', name: 'Dimension Lens', desc: 'Helpers ×10', cost: { berries: 5e17, quarks: 2500 }, requires: ['cs_dyson'], effects: { helperMult: 9.00 } },
  { id: 'cs_god',    age: 'cosmic', icon: '👁️', name: 'Cosmic Awareness', desc: '+5000% click · +5000% global · crit 50%', cost: { berries: 1e19, quarks: 8000 }, requires: ['cs_dim'], effects: { clickMult: 50.00, globalMult: 50.00, critChance: 0.50 } },
];

/* ============ DATA: HELPERS ============ */
/* Each helper: id, age, img, name, basePerSec, baseCost, growth (per buy) */
const HELPERS = [
  { id: 'ant',      fromAge: 'stone',     img: 'helper_ant.png',      name: 'Ant Colony',  perSec: 0.2,  baseCost: 30,     growth: 1.18 },
  { id: 'snail',    fromAge: 'stone',     img: 'helper_snail.png',    name: 'Snail',       perSec: 0.6,  baseCost: 120,    growth: 1.20 },
  { id: 'mouse',    fromAge: 'stone',     img: 'helper_mouse.png',    name: 'Mouse',       perSec: 2,    baseCost: 500,    growth: 1.22 },
  { id: 'hamster',  fromAge: 'bronze',    img: 'helper_hamster.png',  name: 'Hamster',     perSec: 8,    baseCost: 4000,   growth: 1.24 },
  { id: 'beaver',   fromAge: 'bronze',    img: 'helper_beaver.png',   name: 'Beaver',      perSec: 25,   baseCost: 18000,  growth: 1.26 },
  { id: 'squirrel', fromAge: 'iron',      img: 'helper_squirrel.png', name: 'Squirrel',    perSec: 80,   baseCost: 80000,  growth: 1.28 },
  { id: 'bunny',    fromAge: 'iron',      img: 'helper_bunny.png',    name: 'Bunny Friend',perSec: 250,  baseCost: 350000, growth: 1.30 },
  { id: 'hedgehog', fromAge: 'medieval',  img: 'helper_hedgehog.png', name: 'Hedgehog',    perSec: 800,  baseCost: 1.5e6,  growth: 1.32 },
  { id: 'tortoise', fromAge: 'medieval',  img: 'helper_tortoise.png', name: 'Tortoise',    perSec: 2500, baseCost: 6e6,    growth: 1.34 },
  { id: 'fox',      fromAge: 'industrial',img: 'helper_fox.png',      name: 'Fox',         perSec: 9000, baseCost: 2.5e7,  growth: 1.36 },
  { id: 'sparrow',  fromAge: 'industrial',img: 'helper_sparrow.png',  name: 'Sparrow',     perSec: 30000,baseCost: 1e8,    growth: 1.38 },
  { id: 'badger',   fromAge: 'modern',    img: 'helper_badger.png',   name: 'Badger',      perSec: 120000,baseCost: 5e8,    growth: 1.40 },
  { id: 'raccoon',  fromAge: 'modern',    img: 'helper_raccoon.png',  name: 'Raccoon',     perSec: 500000,baseCost: 2.5e9,  growth: 1.42 },
  { id: 'eagle',    fromAge: 'space',     img: 'helper_eagle.png',    name: 'Eagle',       perSec: 2e6,   baseCost: 1.5e10, growth: 1.44 },
  { id: 'buddy',    fromAge: 'cosmic',    img: 'npc_buddy.png',       name: 'Buddy',       perSec: 1e7,   baseCost: 1e11,   growth: 1.46 },
];

/* ============ DATA: SKINS ============ */
const SKINS = [
  { id: 'default',    name: 'Pancake Bunny',    desc: 'The classic. Always equipped at start.', src: 'bunny.png',           cond: () => true },
  { id: 'cartoon',    name: 'Cartoon Bunny',    desc: 'Reach the Modern Era.',                  src: 'bunny_cartoon.png',    cond: () => ageIdx(S.currentAge) >= 5 },
  { id: 'spaceBunny', name: 'Space Bunny',      desc: 'Reach the Space Age.',                   src: 'bunny_space.png',      cond: () => ageIdx(S.currentAge) >= 6 },
  { id: 'invincible', name: 'Invincible Bunny', desc: 'Reach the Cosmic Age.',                  src: 'bunny_invincible.png', cond: () => ageIdx(S.currentAge) >= 7 },
  { id: 'butterDawg', name: 'Butter Dawg',      desc: 'Click the bunny 5,000 times.',           src: 'bunny_butterdawg.png', cond: () => S.totalClicks >= 5000 },
];

/* ============ DATA: ACHIEVEMENTS ============ */
const ACHS = [
  { id: 'first', icon: '👆', name: 'First Click',  desc: 'Click the bunny once',     check: s => s.totalClicks >= 1 },
  { id: 'c100',  icon: '💯', name: 'Centurion',    desc: 'Click 100 times',          check: s => s.totalClicks >= 100 },
  { id: 'c1k',   icon: '🔨', name: 'Hammer Time',  desc: 'Click 1,000 times',        check: s => s.totalClicks >= 1000 },
  { id: 'c10k',  icon: '⚡', name: 'Iron Wrist',   desc: 'Click 10,000 times',       check: s => s.totalClicks >= 10000 },
  { id: 'h1',    icon: '🐾', name: 'Adopted',      desc: 'Buy your first helper',    check: s => Object.values(s.helpers).some(n => n > 0) },
  { id: 'h25',   icon: '🐺', name: 'Pack Leader',  desc: 'Own 25 helpers total',     check: s => sumHelpers() >= 25 },
  { id: 'h100',  icon: '👑', name: 'Empire',       desc: 'Own 100 helpers total',    check: s => sumHelpers() >= 100 },
  { id: 'sk5',   icon: '🌳', name: 'Branching',    desc: 'Learn 5 skills',           check: s => Object.keys(s.skills).length >= 5 },
  { id: 'sk20',  icon: '🌲', name: 'Polymath',     desc: 'Learn 20 skills',          check: s => Object.keys(s.skills).length >= 20 },
  { id: 'a1',    icon: '🥉', name: 'Bronzed',      desc: 'Reach the Bronze Age',     check: s => ageIdx(s.currentAge) >= 1 },
  { id: 'a2',    icon: '⚔️', name: 'Forged',       desc: 'Reach the Iron Age',       check: s => ageIdx(s.currentAge) >= 2 },
  { id: 'a3',    icon: '🏰', name: 'Crowned',      desc: 'Reach the Medieval Era',   check: s => ageIdx(s.currentAge) >= 3 },
  { id: 'a4',    icon: '🏭', name: 'Industrialist',desc: 'Reach the Industrial Age', check: s => ageIdx(s.currentAge) >= 4 },
  { id: 'a5',    icon: '💻', name: 'Connected',    desc: 'Reach the Modern Era',     check: s => ageIdx(s.currentAge) >= 5 },
  { id: 'a6',    icon: '🚀', name: 'Astronaut',    desc: 'Reach the Space Age',      check: s => ageIdx(s.currentAge) >= 6 },
  { id: 'a7',    icon: '🌌', name: 'Cosmic',       desc: 'Reach the Cosmic Age',     check: s => ageIdx(s.currentAge) >= 7 },
  { id: 'sk30',  icon: '👁️', name: 'Enlightened',  desc: 'Learn every skill',        check: s => Object.keys(s.skills).length >= SKILLS.length },
];

/* ============ STATE ============ */
function defaultState() {
  return {
    res: { berries: 0, stone: 0, bronze: 0, iron: 0, gold: 0, coal: 0, electricity: 0, fuel: 0, quarks: 0 },
    skills: {},        // skillId: true
    helpers: {},       // helperId: count
    achievements: {},
    currentAge: 'stone',
    activeSkin: 'default',
    unlockedSkins: { default: true },
    totalClicks: 0,
    settings: { sound: true, volume: 0.4, dark: true, noMotion: false },
  };
}
let S = defaultState();

/* ============ SAVE / LOAD ============ */
function save() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) {}
}
function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return;
    S = Object.assign(defaultState(), parsed);
    // Defensive merges for nested objects
    S.res = Object.assign({ berries: 0, stone: 0, bronze: 0, iron: 0, gold: 0, coal: 0, electricity: 0, fuel: 0, quarks: 0 }, parsed.res || {});
    S.skills = parsed.skills || {};
    S.helpers = parsed.helpers || {};
    S.achievements = parsed.achievements || {};
    S.unlockedSkins = Object.assign({ default: true }, parsed.unlockedSkins || {});
    S.settings = Object.assign({ sound: true, volume: 0.4, dark: true, noMotion: false }, parsed.settings || {});
    if (!AGES.find(a => a.id === S.currentAge)) S.currentAge = 'stone';
    if (!SKINS.find(s => s.id === S.activeSkin)) S.activeSkin = 'default';
    for (const k of Object.keys(S.res)) if (!isFinite(S.res[k]) || S.res[k] < 0) S.res[k] = 0;
  } catch (e) { console.warn('Load failed:', e); }
}

/* ============ MATH ============ */
function hasSkill(id) { return !!S.skills[id]; }
function ageReached(ageId) { return ageIdx(S.currentAge) >= ageIdx(ageId); }
function sumHelpers() { let n = 0; for (const k of Object.keys(S.helpers)) n += S.helpers[k]; return n; }

function getEffectsSum() {
  const sum = { clickAdd: 0, clickMult: 0, globalMult: 0, perSecAdd: 0, stonePerClick: 0,
    bronzePerSec: 0, ironPerSec: 0, goldPerSec: 0, coalPerSec: 0, wattsPerSec: 0,
    fuelPerSec: 0, quarksPerSec: 0, helperMult: 0, critChance: 0 };
  for (const id of Object.keys(S.skills)) {
    const sk = SKILLS.find(x => x.id === id);
    if (!sk) continue;
    for (const k of Object.keys(sk.effects || {})) {
      if (k === 'advance') continue;
      sum[k] = (sum[k] || 0) + sk.effects[k];
    }
  }
  return sum;
}

function getPerClick() {
  const eff = getEffectsSum();
  const base = 1 + eff.clickAdd;
  const mult = (1 + eff.globalMult) * (1 + eff.clickMult);
  return Math.max(1, Math.floor(base * mult));
}
function getCritChance() { return Math.min(0.95, getEffectsSum().critChance); }

function getHelperPerSec() {
  const eff = getEffectsSum();
  let total = 0;
  for (const h of HELPERS) {
    const owned = S.helpers[h.id] || 0;
    total += owned * h.perSec;
  }
  return total * (1 + eff.helperMult) * (1 + eff.globalMult);
}
function getSkillPerSec() {
  const eff = getEffectsSum();
  return eff.perSecAdd * (1 + eff.globalMult);
}
function getPerSec() { return getHelperPerSec() + getSkillPerSec(); }
function getResPerSec(resId) {
  const eff = getEffectsSum();
  const key = resId + 'PerSec';
  return eff[key] || 0;
}

function helperBuyCost(h) {
  const owned = S.helpers[h.id] || 0;
  return Math.ceil(h.baseCost * Math.pow(h.growth, owned));
}

/* ============ COSTS ============ */
function canAfford(cost) {
  for (const k of Object.keys(cost)) {
    if ((S.res[k] || 0) < cost[k]) return false;
  }
  return true;
}
function pay(cost) {
  for (const k of Object.keys(cost)) S.res[k] -= cost[k];
}
function costStr(cost) {
  const out = [];
  for (const k of Object.keys(cost)) {
    const def = RES_DEFS.find(r => r.id === k);
    out.push(`${def ? def.icon : '?'} ${fmt(cost[k])}`);
  }
  return out.join(' ');
}

/* ============ AUDIO ============ */
const audioPool = [];
for (let i = 0; i < 6; i++) audioPool.push(new Audio('click.mp3'));
let audioIdx = 0;
function playClickSfx() {
  if (!S.settings.sound) return;
  const a = audioPool[audioIdx];
  audioIdx = (audioIdx + 1) % audioPool.length;
  try {
    a.volume = S.settings.volume;
    a.playbackRate = 0.9 + Math.random() * 0.2;
    a.currentTime = 0;
    a.play().catch(() => {});
  } catch (e) {}
}

/* ============ CLICK ============ */
function clickBunny(ev) {
  let gain = getPerClick();
  let crit = false;
  if (Math.random() < getCritChance()) { gain *= 5; crit = true; }
  S.res.berries += gain;
  S.totalClicks += 1;
  // Stone drop chance from Sharp Stick
  const sc = getEffectsSum().stonePerClick;
  if (sc > 0 && Math.random() < sc) S.res.stone += 1;
  spawnFloater(ev, (crit ? '✨CRIT ' : '') + '+' + fmt(gain), crit ? 'crit' : '');
  playClickSfx();
  flashPill('berries');
  checkAchievements();
  renderResources();
  if (S.totalClicks % 7 === 0) save();
}
function spawnFloater(ev, text, cls) {
  const wrap = $('bunny-wrap'), fx = $('click-fx');
  if (!wrap || !fx) return;
  if (S.settings.noMotion) return;
  const rect = wrap.getBoundingClientRect();
  let x = rect.width / 2, y = rect.height / 2;
  if (ev && typeof ev.clientX === 'number') {
    x = ev.clientX - rect.left;
    y = ev.clientY - rect.top;
  }
  const f = document.createElement('div');
  f.className = 'floater' + (cls ? ' ' + cls : '');
  f.textContent = text;
  f.style.left = x + 'px';
  f.style.top = y + 'px';
  fx.appendChild(f);
  setTimeout(() => f.remove(), 1100);
}

/* ============ SKILLS ============ */
function buySkill(id) {
  const sk = SKILLS.find(x => x.id === id);
  if (!sk || S.skills[id]) return;
  if (!skillReqsMet(sk)) { toast('Locked', false); return; }
  if (!canAfford(sk.cost)) { toast('Not enough resources', false); return; }
  pay(sk.cost);
  S.skills[id] = true;
  toast(`🌳 Learned: ${sk.name}`, true);
  // Skill might advance age
  if (sk.effects.advance) advanceAge(sk.effects.advance);
  checkAchievements();
  renderAll();
  save();
}
function skillReqsMet(sk) {
  if (ageIdx(S.currentAge) < ageIdx(sk.age)) return false;
  if (sk.requires) for (const r of sk.requires) if (!S.skills[r]) return false;
  return true;
}

/* ============ HELPERS ============ */
function buyHelper(id) {
  const h = HELPERS.find(x => x.id === id);
  if (!h) return;
  if (ageIdx(S.currentAge) < ageIdx(h.fromAge)) { toast('Locked — wrong age', false); return; }
  const cost = helperBuyCost(h);
  if (S.res.berries < cost) { toast('Need more 🫐 berries', false); return; }
  S.res.berries -= cost;
  S.helpers[id] = (S.helpers[id] || 0) + 1;
  toast(`🐾 Hired ${h.name} (${S.helpers[id]})`);
  checkAchievements();
  renderAll();
  save();
}

/* ============ AGE ADVANCE ============ */
function advanceAge(toAge) {
  S.currentAge = toAge;
  toast(`🎉 Welcome to the ${AGES[ageIdx(toAge)].name}!`, true);
  applyAgeBodyClass();
  checkAchievements();
  renderAll();
  save();
}
function applyAgeBodyClass() {
  for (const a of AGES) document.body.classList.remove('age-' + a.id);
  document.body.classList.add('age-' + S.currentAge);
}

/* ============ ACHIEVEMENTS ============ */
function checkAchievements() {
  let any = false;
  for (const a of ACHS) {
    if (!S.achievements[a.id] && a.check(S)) {
      S.achievements[a.id] = true;
      toast(`🏆 ${a.name}`, true);
      any = true;
    }
  }
  // Skin unlocks
  for (const s of SKINS) {
    if (!S.unlockedSkins[s.id] && s.cond()) {
      S.unlockedSkins[s.id] = true;
      toast(`🎨 Skin unlocked: ${s.name}`, true);
      any = true;
    }
  }
  if (any) save();
}

/* ============ SKINS ============ */
function setSkin(id) {
  if (!S.unlockedSkins[id]) return;
  S.activeSkin = id;
  applySkinImg();
  renderSkins();
  save();
}
function applySkinImg() {
  const s = SKINS.find(x => x.id === S.activeSkin) || SKINS[0];
  $('bunny-img').src = s.src;
}

/* ============ TOAST ============ */
function toast(msg, big) {
  const area = $('toasts');
  if (!area) return;
  // Cap stacked toasts
  while (area.children.length >= 5) area.removeChild(area.firstChild);
  const t = document.createElement('div');
  t.className = 'toast' + (big ? ' big' : '');
  t.textContent = msg;
  area.appendChild(t);
  setTimeout(() => t.remove(), 3700);
}

/* ============ RENDER ============ */
let lastTab = 'tree';
function renderAll() {
  renderHeader();
  renderResources();
  renderBunny();
  renderHelperStrip();
  renderAgeProgress();
  renderTab(lastTab);
}
function renderHeader() {
  $('current-age').textContent = AGES[ageIdx(S.currentAge)].name;
}
function renderResources() {
  const box = $('resources');
  // Only show resources that are 'unlocked' (current age >= their fromAge)
  const visible = RES_DEFS.filter(r => ageIdx(S.currentAge) >= r.fromAge || S.res[r.id] > 0);
  const html = visible.map(r =>
    `<span class="res-pill" id="res-${r.id}" title="${r.title}">${r.icon} ${r.name} <b>${fmt(S.res[r.id] || 0)}</b></span>`
  ).join('');
  if (box.dataset.last !== html.length + '|' + visible.map(r => r.id).join(',')) {
    box.innerHTML = html;
    box.dataset.last = html.length + '|' + visible.map(r => r.id).join(',');
  } else {
    // Idempotent value update for tabular numerics
    for (const r of visible) {
      const el = box.querySelector(`#res-${r.id} b`);
      if (el) {
        const v = fmt(S.res[r.id] || 0);
        if (el.textContent !== v) el.textContent = v;
      }
    }
  }
}
function flashPill(resId) {
  const el = $('res-' + resId);
  if (!el) return;
  el.classList.remove('flash');
  void el.offsetWidth;
  el.classList.add('flash');
}
function renderBunny() {
  $('per-click').textContent = '+' + fmt(getPerClick());
  $('per-sec').textContent = '+' + fmt(getPerSec());
  applySkinImg();
  $('bunny-title').textContent = SKINS.find(s => s.id === S.activeSkin).name;
}
function renderHelperStrip() {
  const strip = $('helpers-strip');
  const owned = HELPERS.filter(h => (S.helpers[h.id] || 0) > 0);
  const sig = owned.map(h => h.id + ':' + S.helpers[h.id]).join('|');
  if (strip.dataset.sig === sig) return;
  strip.dataset.sig = sig;
  strip.innerHTML = '';
  for (const h of owned) {
    const chip = document.createElement('div');
    chip.className = 'helper-chip';
    chip.title = `${h.name} — ${S.helpers[h.id]} owned, +${fmt(h.perSec)}/sec each`;
    chip.innerHTML = `<img src="${h.img}" alt=""><div class="count">${S.helpers[h.id]}</div>`;
    strip.appendChild(chip);
  }
}
function renderAgeProgress() {
  // Find the advance-skill of current age and the cheapest cost gate to display
  const adv = SKILLS.find(s => s.age === S.currentAge && s.effects.advance);
  const wrap = $('age-progress-wrap');
  const btn = $('advance-age-btn');
  if (!adv) {
    wrap.style.opacity = 0.5;
    $('age-progress-label').textContent = '— end of known history —';
    $('age-progress-fill').style.width = '100%';
    btn.classList.add('hidden');
    return;
  }
  if (S.skills[adv.id]) {
    wrap.style.opacity = 0.5;
    $('age-progress-label').textContent = '— already advanced —';
    $('age-progress-fill').style.width = '100%';
    btn.classList.add('hidden');
    return;
  }
  wrap.style.opacity = 1;
  // Progress is the % toward affording the advance cost (worst resource)
  let worst = 1;
  for (const k of Object.keys(adv.cost)) {
    worst = Math.min(worst, (S.res[k] || 0) / adv.cost[k]);
  }
  $('age-progress-fill').style.width = (worst * 100).toFixed(1) + '%';
  $('age-progress-label').textContent =
    `Next age: ${AGES[ageIdx(adv.effects.advance)].name} — needs ${costStr(adv.cost)}`;
  btn.classList.toggle('hidden', !canAfford(adv.cost) || !skillReqsMet(adv));
  if (btn.classList.contains('hidden') === false) {
    btn.textContent = `🎉 Advance: ${AGES[ageIdx(adv.effects.advance)].name}`;
    btn.onclick = () => buySkill(adv.id);
  }
}

function renderTab(tabId) {
  if (tabId === 'tree')         renderSkillTree();
  else if (tabId === 'helpers') renderHelpers();
  else if (tabId === 'achievements') renderAchievements();
  else if (tabId === 'skins')   renderSkins();
}

function renderSkillTree() {
  const pane = $('pane-tree');
  let html = '';
  for (let i = 0; i < AGES.length; i++) {
    const age = AGES[i];
    const reached = ageIdx(S.currentAge) >= i;
    const ageSkills = SKILLS.filter(s => s.age === age.id);
    html += `<div class="age-group"><div class="age-group-header${reached ? '' : ' locked'}">${age.name}${reached ? '' : ' 🔒'}</div>`;
    if (!reached) {
      html += `<div class="skill locked"><div class="icon">⏳</div><div class="body"><div class="name">Reach this age to see its skills</div><div class="desc">${age.flavor}</div></div></div>`;
    } else {
      for (const sk of ageSkills) {
        const owned = !!S.skills[sk.id];
        const reqsOK = skillReqsMet(sk);
        const aff = !owned && reqsOK && canAfford(sk.cost);
        let cls = 'skill';
        if (owned) cls += ' owned';
        else if (aff) cls += ' affordable';
        else if (!reqsOK || !canAfford(sk.cost)) cls += '';
        if (!reqsOK) cls += ' locked';
        const status = owned ? 'LEARNED ✓' : (reqsOK ? (aff ? 'BUY' : '') : '🔒');
        const reqNote = !owned && sk.requires ? `<div class="desc" style="opacity:0.7">Requires: ${sk.requires.map(r => SKILLS.find(x => x.id === r).name).join(', ')}</div>` : '';
        html += `<div class="${cls}" data-skill="${sk.id}">
          <div class="icon">${sk.icon}</div>
          <div class="body">
            <div class="name">${sk.name}</div>
            <div class="desc">${sk.desc}</div>
            ${reqNote}
            ${owned ? '' : `<div class="cost">${costStr(sk.cost)}</div>`}
          </div>
          <div class="status">${status}</div>
        </div>`;
      }
    }
    html += '</div>';
  }
  if (pane.dataset.sig !== html.length + '|' + Object.keys(S.skills).length + '|' + S.currentAge) {
    pane.innerHTML = html;
    pane.dataset.sig = html.length + '|' + Object.keys(S.skills).length + '|' + S.currentAge;
    pane.querySelectorAll('.skill.affordable').forEach(div => {
      div.addEventListener('click', () => buySkill(div.dataset.skill));
    });
  }
}

function renderHelpers() {
  const pane = $('pane-helpers');
  let html = '';
  // Group by age
  for (let i = 0; i < AGES.length; i++) {
    const age = AGES[i];
    const reached = ageIdx(S.currentAge) >= i;
    const list = HELPERS.filter(h => h.fromAge === age.id);
    if (list.length === 0) continue;
    if (!reached) continue;
    html += `<div class="age-group"><div class="age-group-header">${age.name}</div>`;
    for (const h of list) {
      const owned = S.helpers[h.id] || 0;
      const cost = helperBuyCost(h);
      const aff = S.res.berries >= cost;
      html += `<div class="entry${aff ? ' affordable' : ''}">
        <div class="icon"><img src="${h.img}" alt=""></div>
        <div class="body">
          <div class="name">${h.name} <span style="color:var(--fg-3); font-weight:500">×${owned}</span></div>
          <div class="desc">+${fmt(h.perSec)}/sec each · Total +${fmt(owned * h.perSec)}/sec</div>
          <div class="cost" style="font-size:0.82em; color:var(--accent); margin-top:2px; font-weight:600">🫐 ${fmt(cost)}</div>
        </div>
        <button class="action" ${aff ? '' : 'disabled'} data-helper="${h.id}">${aff ? 'HIRE' : 'NEED 🫐'}</button>
      </div>`;
    }
    html += '</div>';
  }
  if (pane.dataset.sig !== html.length + '|' + JSON.stringify(S.helpers)) {
    pane.innerHTML = html;
    pane.dataset.sig = html.length + '|' + JSON.stringify(S.helpers);
    pane.querySelectorAll('button[data-helper]').forEach(btn => {
      btn.addEventListener('click', () => buyHelper(btn.dataset.helper));
    });
  }
}

function renderAchievements() {
  const pane = $('pane-achievements');
  const unlocked = ACHS.filter(a => S.achievements[a.id]).length;
  let html = `<div class="muted" style="margin-bottom:10px">${unlocked} / ${ACHS.length} trophies earned.</div>`;
  for (const a of ACHS) {
    const u = !!S.achievements[a.id];
    html += `<div class="entry ${u ? 'unlocked' : 'locked'}">
      <div class="icon">${a.icon}</div>
      <div class="body">
        <div class="name">${a.name}</div>
        <div class="desc">${a.desc}</div>
      </div>
      <div class="status" style="color: ${u ? 'var(--good)' : 'var(--fg-3)'}; font-weight:700; font-size:0.78em">${u ? '✓' : '🔒'}</div>
    </div>`;
  }
  pane.innerHTML = html;
}

function renderSkins() {
  const pane = $('pane-skins');
  let html = '';
  for (const s of SKINS) {
    const unlocked = !!S.unlockedSkins[s.id];
    const active = S.activeSkin === s.id;
    html += `<div class="entry ${unlocked ? 'unlocked' : 'locked'}">
      <div class="icon"><img src="${s.src}" alt=""${unlocked ? '' : ' style="filter:grayscale(1) brightness(0.4)"'}></div>
      <div class="body">
        <div class="name">${s.name}</div>
        <div class="desc">${unlocked ? s.desc : '🔒 ' + s.desc}</div>
      </div>
      <button class="action ${active ? 'active' : ''}" ${unlocked && !active ? '' : 'disabled'} data-skin="${s.id}">${active ? '✓ ACTIVE' : (unlocked ? 'EQUIP' : 'LOCKED')}</button>
    </div>`;
  }
  pane.innerHTML = html;
  pane.querySelectorAll('button[data-skin]').forEach(btn => {
    btn.addEventListener('click', () => setSkin(btn.dataset.skin));
  });
}

/* ============ TABS ============ */
function setActiveTab(tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('active', p.id === 'pane-' + tabId));
  lastTab = tabId;
  renderTab(tabId);
}

/* ============ DEBUG MENU (sentinel-file or IP gated) ============ */
let debugEnabled = false;
const DEBUG_IPS = ['71.210.15.78'];
function probeDebug() {
  // URL param
  if (location.search.includes('21467ggnp') || location.hash.includes('21467ggnp')) {
    enableDebug();
    return;
  }
  // Sentinel file
  const probe = document.createElement('script');
  probe.src = '21467.ggnp?t=' + Date.now();
  probe.async = true;
  probe.onload  = () => { enableDebug(); probe.remove(); };
  probe.onerror = () => { probe.remove(); };
  document.head.appendChild(probe);
  // IP
  probeDebugIP();
}
async function probeDebugIP() {
  try {
    const r = await fetch('https://api.ipify.org?format=text', { cache: 'no-store' });
    if (!r.ok) return;
    const ip = (await r.text()).trim();
    if (DEBUG_IPS.includes(ip)) enableDebug();
  } catch (e) {}
}
function enableDebug() {
  if (debugEnabled) return;
  debugEnabled = true;
  $('debug-section').classList.remove('hidden');
  buildDebugGrid();
}
function buildDebugGrid() {
  const grid = $('debug-grid');
  grid.innerHTML = '';
  // Resources
  for (const r of RES_DEFS) {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `<span>${r.icon} ${r.name}</span><input type="number" min="0" placeholder="amt" data-res="${r.id}"><button data-add="${r.id}">+</button>`;
    grid.appendChild(row);
  }
  // Actions
  const actions = document.createElement('div');
  actions.innerHTML = `<hr><button data-act="all-skills">Learn all skills</button>
    <button data-act="all-helpers">+10 of every helper</button>
    <button data-act="all-achs">Unlock all achievements</button>
    <button data-act="all-skins">Unlock all skins</button>
    <button data-act="age-next">Skip to next age</button>
    <button data-act="age-max">Skip to Cosmic Age</button>`;
  grid.appendChild(actions);
  grid.querySelectorAll('button[data-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.add;
      const inp = grid.querySelector(`input[data-res="${k}"]`);
      const v = Math.floor(Number(inp.value) || 0);
      if (v > 0) { S.res[k] += v; renderResources(); save(); }
    });
  });
  grid.querySelectorAll('button[data-act]').forEach(btn => {
    btn.addEventListener('click', () => {
      const a = btn.dataset.act;
      if (a === 'all-skills') { for (const sk of SKILLS) S.skills[sk.id] = true; }
      else if (a === 'all-helpers') { for (const h of HELPERS) S.helpers[h.id] = (S.helpers[h.id] || 0) + 10; }
      else if (a === 'all-achs') { for (const ach of ACHS) S.achievements[ach.id] = true; }
      else if (a === 'all-skins') { for (const s of SKINS) S.unlockedSkins[s.id] = true; }
      else if (a === 'age-next') {
        const i = ageIdx(S.currentAge);
        if (i < AGES.length - 1) advanceAge(AGES[i + 1].id);
      }
      else if (a === 'age-max') { advanceAge('cosmic'); }
      checkAchievements();
      renderAll();
      save();
    });
  });
}

/* ============ TICK ============ */
let lastTick = Date.now();
function tick() {
  const now = Date.now();
  const dt = Math.min(1, (now - lastTick) / 1000);
  lastTick = now;
  // Berries from passive sources
  S.res.berries += getPerSec() * dt;
  // Other resource generation
  for (const r of ['bronze','iron','gold','coal','electricity','fuel','quarks']) {
    const rate = getResPerSec(r === 'electricity' ? 'watts' : r);
    if (rate > 0) S.res[r] += rate * dt;
  }
  // Render cheap stuff
  renderResources();
  $('per-click').textContent = '+' + fmt(getPerClick());
  $('per-sec').textContent = '+' + fmt(getPerSec());
  renderAgeProgress();
  checkAchievements();
}

/* ============ THEME ============ */
function applyTheme() {
  document.body.classList.toggle('theme-dark', S.settings.dark);
  document.body.classList.toggle('theme-light', !S.settings.dark);
  document.body.classList.toggle('no-motion', !!S.settings.noMotion);
  $('theme-toggle').textContent = S.settings.dark ? '🌙' : '☀️';
}

/* ============ EXPORT / IMPORT ============ */
function exportSave() {
  const code = btoa(JSON.stringify(S));
  navigator.clipboard.writeText(code).then(() => toast('📤 Save copied to clipboard'));
}
async function importSave() {
  let code;
  try { code = await navigator.clipboard.readText(); } catch (e) { code = prompt('Paste save code:'); }
  if (!code) return;
  try {
    const parsed = JSON.parse(atob(code.trim()));
    S = Object.assign(defaultState(), parsed);
    S.res = Object.assign({ berries: 0, stone: 0, bronze: 0, iron: 0, gold: 0, coal: 0, electricity: 0, fuel: 0, quarks: 0 }, parsed.res || {});
    S.skills = parsed.skills || {};
    S.helpers = parsed.helpers || {};
    S.achievements = parsed.achievements || {};
    S.unlockedSkins = Object.assign({ default: true }, parsed.unlockedSkins || {});
    S.settings = Object.assign({ sound: true, volume: 0.4, dark: true, noMotion: false }, parsed.settings || {});
    applyAgeBodyClass();
    applyTheme();
    renderAll();
    save();
    toast('📥 Save loaded', true);
  } catch (e) { toast('Bad save code', false); }
}

/* ============ INIT ============ */
function init() {
  load();
  applyAgeBodyClass();
  applyTheme();
  applySkinImg();
  // Settings UI
  const sound = $('set-sound'), vol = $('set-volume'), dark = $('set-dark'), nm = $('set-no-motion');
  sound.checked = S.settings.sound; vol.value = S.settings.volume * 100;
  dark.checked = S.settings.dark; nm.checked = S.settings.noMotion;
  sound.addEventListener('change', () => { S.settings.sound = sound.checked; save(); });
  vol.addEventListener('input',  () => { S.settings.volume = vol.value / 100; save(); });
  dark.addEventListener('change',  () => { S.settings.dark = dark.checked; applyTheme(); save(); });
  nm.addEventListener('change',   () => { S.settings.noMotion = nm.checked; applyTheme(); save(); });
  // Theme toggle
  $('theme-toggle').addEventListener('click', () => {
    S.settings.dark = !S.settings.dark;
    dark.checked = S.settings.dark;
    applyTheme();
    save();
  });
  // Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => setActiveTab(tab.dataset.tab));
  });
  // Bunny click
  $('bunny-wrap').addEventListener('click', clickBunny);
  // Settings actions
  $('set-save').addEventListener('click', () => { save(); toast('💾 Saved'); });
  $('set-export').addEventListener('click', exportSave);
  $('set-import').addEventListener('click', importSave);
  $('set-reset').addEventListener('click', () => {
    if (!confirm('Hard reset? Wipes everything.')) return;
    localStorage.removeItem(SAVE_KEY);
    S = defaultState();
    applyAgeBodyClass();
    applyTheme();
    renderAll();
    toast('🔥 Reset complete', true);
  });
  // Debug
  probeDebug();
  // First render
  renderAll();
  setInterval(tick,  100);
  setInterval(save, 5000);
}

document.addEventListener('DOMContentLoaded', init);
