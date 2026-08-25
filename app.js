(function(){
"use strict";

var STORAGE_KEY = 'manifest-data-v1';

var DEFAULT_STATE = {"categories":["Travel Essentials","Clothes","Shoes","Toiletries","Medications","Nature & Weather","Other"],"items":[{"id":"te-passports","category":"Travel Essentials","name":"Passports","mode":"fixed","qty":2},{"id":"te-tz","category":"Travel Essentials","name":"T.Z. (Teudat Zehut)","mode":"fixed","qty":1},{"id":"te-license","category":"Travel Essentials","name":"Driver's license","mode":"fixed","qty":1},{"id":"te-map","category":"Travel Essentials","name":"Map","mode":"fixed","qty":1},{"id":"te-eyemask","category":"Travel Essentials","name":"Eye mask","mode":"fixed","qty":1},{"id":"cl-tshirts-nice","category":"Clothes","name":"Nice t-shirts","mode":"perDay","rate":1.2},{"id":"cl-tshirts-sport","category":"Clothes","name":"Sport / Stanford t-shirts","mode":"perDay","rate":0},{"id":"cl-socks-short","category":"Clothes","name":"Short socks","mode":"perDay","rate":1.0},{"id":"cl-socks-long","category":"Clothes","name":"Long socks","mode":"perDay","rate":0.6},{"id":"cl-pants-long","category":"Clothes","name":"Long pants","mode":"perDay","rate":0.5},{"id":"cl-capris","category":"Clothes","name":"Capris","mode":"perDay","rate":0.3},{"id":"cl-jacket","category":"Clothes","name":"Jacket / sweater wrap","mode":"fixed","qty":1,"note":"Always bring one"},{"id":"cl-shirts-ls","category":"Clothes","name":"Long sleeve shirts","mode":"perDay","rate":0.6},{"id":"cl-pjs","category":"Clothes","name":"PJs","mode":"perDay","rate":0.4},{"id":"cl-underpants","category":"Clothes","name":"Underpants","mode":"perDay","rate":1.2},{"id":"cl-bras","category":"Clothes","name":"Bras","mode":"perDay","rate":0.8},{"id":"cl-swimsuit","category":"Clothes","name":"Swim suits","mode":"fixed","qty":0},{"id":"cl-swim-coverup","category":"Clothes","name":"Bathing suit cover-up","mode":"fixed","qty":0},{"id":"cl-sunglasses","category":"Clothes","name":"Sunglasses","mode":"fixed","qty":1},{"id":"cl-pilates","category":"Clothes","name":"Pilates clothes + grippy socks","mode":"fixed","qty":0,"note":"As needed \u2014 don't forget the socks!"},{"id":"ot-wallcharger","category":"Other","name":"Wall charger + USB-C cable","mode":"fixed","qty":2},{"id":"ot-carcharger","category":"Other","name":"Car charger","mode":"fixed","qty":1},{"id":"ot-converters","category":"Other","name":"Plug converters","mode":"fixed","qty":3},{"id":"ot-glasses","category":"Other","name":"Glasses","mode":"fixed","qty":2},{"id":"ot-computer","category":"Other","name":"Computer","mode":"fixed","qty":1},{"id":"ot-computercharger","category":"Other","name":"Computer charger","mode":"fixed","qty":1},{"id":"ot-laundrybag","category":"Other","name":"Laundry bags","mode":"fixed","qty":1},{"id":"ot-watch","category":"Other","name":"Watch","mode":"fixed","qty":1},{"id":"ot-earrings","category":"Other","name":"Earrings","mode":"fixed","qty":3},{"id":"ot-necklaces","category":"Other","name":"Necklaces","mode":"fixed","qty":3},{"id":"ot-headphones","category":"Other","name":"Headphones","mode":"fixed","qty":2},{"id":"ot-hairdryer","category":"Other","name":"Hair dryer + adapter","mode":"fixed","qty":0},{"id":"ot-bagplane","category":"Other","name":"Reusable bag for the plane","mode":"fixed","qty":1},{"id":"sh-boots","category":"Shoes","name":"Boots","mode":"fixed","qty":1},{"id":"sh-heels","category":"Shoes","name":"Heels","mode":"fixed","qty":0},{"id":"sh-sandals","category":"Shoes","name":"Sandals","mode":"fixed","qty":0,"note":"Required for Israel regardless of season"},{"id":"sh-flipflops","category":"Shoes","name":"Flip flops / indoor shoes","mode":"fixed","qty":1},{"id":"sh-sneakers","category":"Shoes","name":"Sneakers","mode":"fixed","qty":1},{"id":"sh-keens","category":"Shoes","name":"Keens / Chaco / Teva sandals","mode":"fixed","qty":0},{"id":"sh-halfshoes","category":"Shoes","name":"Half shoes","mode":"fixed","qty":0},{"id":"sh-hiking","category":"Shoes","name":"Hiking boots","mode":"fixed","qty":1},{"id":"sh-slipons","category":"Shoes","name":"Cloth slip-ons","mode":"fixed","qty":3},{"id":"to-toothbrush","category":"Toiletries","name":"Toothbrush","mode":"fixed","qty":1},{"id":"to-toothpaste","category":"Toiletries","name":"Toothpaste","mode":"fixed","qty":1},{"id":"to-deodorant","category":"Toiletries","name":"Deodorant","mode":"fixed","qty":1},{"id":"to-shampoo","category":"Toiletries","name":"Shampoo","mode":"fixed","qty":1},{"id":"to-conditioner","category":"Toiletries","name":"Conditioner","mode":"fixed","qty":1},{"id":"to-shapeshifter","category":"Toiletries","name":"Shape Shifter","mode":"fixed","qty":1},{"id":"to-gel","category":"Toiletries","name":"Gel","mode":"fixed","qty":1},{"id":"to-serum","category":"Toiletries","name":"Serum","mode":"fixed","qty":1},{"id":"to-hairtowels","category":"Toiletries","name":"Hair towels","mode":"fixed","qty":2},{"id":"to-facesoap","category":"Toiletries","name":"Face soap","mode":"fixed","qty":1},{"id":"to-facelotion","category":"Toiletries","name":"Face lotion","mode":"fixed","qty":1},{"id":"to-soap","category":"Toiletries","name":"Soap","mode":"fixed","qty":1},{"id":"to-rubberbands","category":"Toiletries","name":"Rubber bands","mode":"fixed","qty":3},{"id":"to-nailfile","category":"Toiletries","name":"Nail file","mode":"fixed","qty":2},{"id":"to-concealer","category":"Toiletries","name":"Concealer","mode":"fixed","qty":1},{"id":"to-chapstick","category":"Toiletries","name":"Chapstick","mode":"fixed","qty":1},{"id":"me-naratriptan","category":"Medications","name":"Naratriptan","mode":"fixed","qty":1,"unit":"pack"},{"id":"me-albuterol","category":"Medications","name":"Albuterol","mode":"fixed","qty":1,"unit":"pack"},{"id":"me-lactaid","category":"Medications","name":"Lactaid","mode":"fixed","qty":1,"unit":"pack"},{"id":"me-cymbalta","category":"Medications","name":"Cymbalta","mode":"fixed","qty":1,"unit":"bottle"},{"id":"me-advil","category":"Medications","name":"Advil","mode":"fixed","qty":1,"unit":"bottle"},{"id":"me-ozempic","category":"Medications","name":"Ozempic","mode":"fixed","qty":1},{"id":"me-statin","category":"Medications","name":"Statin","mode":"fixed","qty":1},{"id":"me-hormonepills","category":"Medications","name":"Hormone pills","mode":"fixed","qty":1},{"id":"me-hormonepatches","category":"Medications","name":"Hormone patches","mode":"fixed","qty":1,"unit":"box"},{"id":"me-xyzal","category":"Medications","name":"Xyzal / allergy meds","mode":"fixed","qty":1,"note":"Extra important for Israel & New Orleans mosquitoes","unit":"bottle"},{"id":"na-backpack","category":"Nature & Weather","name":"Osprey backpack","mode":"fixed","qty":0},{"id":"na-gloves","category":"Nature & Weather","name":"Gloves","mode":"fixed","qty":0},{"id":"na-headband","category":"Nature & Weather","name":"Fleece headband","mode":"fixed","qty":0},{"id":"na-cowl","category":"Nature & Weather","name":"Cowl","mode":"fixed","qty":1},{"id":"na-warmers","category":"Nature & Weather","name":"Hand / foot warmers","mode":"perDay","rate":0,"note":"One per day when needed"},{"id":"na-hikingpoles","category":"Nature & Weather","name":"Hiking poles","mode":"fixed","qty":0},{"id":"na-hikingsocks","category":"Nature & Weather","name":"Hiking socks","mode":"fixed","qty":0},{"id":"na-picnicblanket","category":"Nature & Weather","name":"Picnic blanket (compact, foldable)","mode":"fixed","qty":2},{"id":"na-beachblankets","category":"Nature & Weather","name":"Beach blankets","mode":"fixed","qty":0},{"id":"na-waterbottles","category":"Nature & Weather","name":"Water bottles","mode":"fixed","qty":1},{"id":"na-insectrepellent","category":"Nature & Weather","name":"Insect repellent","mode":"fixed","qty":0},{"id":"na-sunscreen","category":"Nature & Weather","name":"Sunscreen","mode":"fixed","qty":0},{"id":"na-allergymeds","category":"Nature & Weather","name":"Allergy meds for mosquito bites","mode":"fixed","qty":0,"note":"Required anywhere there might be mosquitoes"}],"rules":[{"id":"israel","kind":"location","key":"israel","label":"Israel","note":"Extra showers & outfit changes each day \u2014 clothes and toiletries scale up. Sandals and flip flops go every time, regardless of season.","effects":[{"targetType":"category","targetValue":"Clothes","op":"multiply","value":1.5},{"targetType":"category","targetValue":"Toiletries","op":"multiply","value":1.5},{"targetType":"item","targetValue":"sh-sandals","op":"setMin","value":1},{"targetType":"item","targetValue":"sh-flipflops","op":"setMin","value":1},{"targetType":"item","targetValue":"na-allergymeds","op":"setMin","value":1}]},{"id":"neworleans","kind":"location","key":"neworleans","label":"New Orleans","note":"Rooms run freezing indoors \u2014 pack thin layers you can add and shed.","effects":[{"targetType":"item","targetValue":"cl-shirts-ls","op":"add","value":2},{"targetType":"item","targetValue":"cl-jacket","op":"add","value":1},{"targetType":"item","targetValue":"cl-pants-long","op":"add","value":2},{"targetType":"item","targetValue":"cl-socks-long","op":"add","value":2}]},{"id":"hawaii","kind":"location","key":"hawaii","label":"Hawaii","note":"Beach days \u2014 swimwear plus sun & bug protection.","effects":[{"targetType":"item","targetValue":"cl-swimsuit","op":"setMin","value":2},{"targetType":"item","targetValue":"cl-swim-coverup","op":"setMin","value":1},{"targetType":"item","targetValue":"sh-flipflops","op":"setMin","value":1},{"targetType":"item","targetValue":"na-sunscreen","op":"setMin","value":1},{"targetType":"item","targetValue":"na-insectrepellent","op":"setMin","value":1}]},{"id":"city","kind":"tripType","key":"city","label":"City","note":"General city trip — add your own adjustments in Rules.","effects":[]},{"id":"outdoors","kind":"tripType","key":"outdoors","label":"Outdoors - hiking","note":"Hiking & outdoor gear.","effects":[{"targetType":"item","targetValue":"na-backpack","op":"setMin","value":1},{"targetType":"item","targetValue":"sh-keens","op":"setMin","value":1},{"targetType":"item","targetValue":"na-hikingpoles","op":"setMin","value":1},{"targetType":"item","targetValue":"na-hikingsocks","op":"setMin","value":2}]},{"id":"beach","kind":"tripType","key":"beach","label":"Swim / beach","note":"Beach essentials for any warm-water trip.","effects":[{"targetType":"item","targetValue":"cl-swimsuit","op":"setMin","value":1},{"targetType":"item","targetValue":"cl-swim-coverup","op":"setMin","value":1},{"targetType":"item","targetValue":"sh-flipflops","op":"setMin","value":1},{"targetType":"item","targetValue":"na-beachblankets","op":"setMin","value":1},{"targetType":"item","targetValue":"na-sunscreen","op":"setMin","value":1},{"targetType":"item","targetValue":"na-insectrepellent","op":"setMin","value":1}]},{"id":"fancy","kind":"tripType","key":"fancy","label":"Fancy","note":"Dressier occasions.","effects":[{"targetType":"item","targetValue":"sh-heels","op":"setMin","value":1}]},{"id":"hot","kind":"tripType","key":"hot","label":"Hot","note":"Hot-weather protection.","effects":[{"targetType":"item","targetValue":"na-sunscreen","op":"setMin","value":1}]},{"id":"cold","kind":"tripType","key":"cold","label":"Cold","note":"Cold-weather layers.","effects":[{"targetType":"item","targetValue":"na-gloves","op":"setMin","value":1},{"targetType":"item","targetValue":"na-headband","op":"setMin","value":1},{"targetType":"item","targetValue":"na-warmers","op":"setRate","value":1}]}]};

function loadState(){
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredCloneState(DEFAULT_STATE);
    var parsed = JSON.parse(raw);
    if (!parsed || !parsed.items || !parsed.rules) return structuredCloneState(DEFAULT_STATE);
    return parsed;
  } catch (e){
    return structuredCloneState(DEFAULT_STATE);
  }
}

function structuredCloneState(s){
  return JSON.parse(JSON.stringify(s));
}

function migrateState(state){
  var changed = false;
  function findRule(key){
    for (var i = 0; i < state.rules.length; i++) if (state.rules[i].key === key) return state.rules[i];
    return null;
  }

  var neworleans = findRule('neworleans');
  if (neworleans && neworleans.label === 'New Orleans (Book Fest)'){ neworleans.label = 'New Orleans'; changed = true; }

  var beach = findRule('beach');
  if (beach && beach.label === 'Beach / Swim'){ beach.label = 'Swim / beach'; changed = true; }

  var cold = findRule('cold');
  if (cold && cold.label === 'Cold / Outdoors'){
    cold.label = 'Cold';
    cold.note = 'Cold-weather layers.';
    var keep = { 'na-gloves': 1, 'na-headband': 1, 'na-warmers': 1 };
    cold.effects = cold.effects.filter(function(e){ return keep.hasOwnProperty(e.targetValue); });
    changed = true;
  }
  if (!findRule('outdoors')){
    state.rules.push({ id: 'outdoors', kind: 'tripType', key: 'outdoors', label: 'Outdoors - hiking', note: 'Hiking & outdoor gear.', effects: [
      { targetType: 'item', targetValue: 'na-backpack', op: 'setMin', value: 1 },
      { targetType: 'item', targetValue: 'sh-keens', op: 'setMin', value: 1 },
      { targetType: 'item', targetValue: 'na-hikingpoles', op: 'setMin', value: 1 },
      { targetType: 'item', targetValue: 'na-hikingsocks', op: 'setMin', value: 2 }
    ] });
    changed = true;
  }
  if (!findRule('city')){
    state.rules.push({ id: 'city', kind: 'tripType', key: 'city', label: 'City', note: 'General city trip — add your own adjustments in Rules.', effects: [] });
    changed = true;
  }
  if (!findRule('fancy')){
    state.rules.push({ id: 'fancy', kind: 'tripType', key: 'fancy', label: 'Fancy', note: 'Dressier occasions.', effects: [
      { targetType: 'item', targetValue: 'sh-heels', op: 'setMin', value: 1 }
    ] });
    changed = true;
  }
  if (!findRule('hot')){
    state.rules.push({ id: 'hot', kind: 'tripType', key: 'hot', label: 'Hot', note: 'Hot-weather protection.', effects: [
      { targetType: 'item', targetValue: 'na-sunscreen', op: 'setMin', value: 1 }
    ] });
    changed = true;
  }

  if (state.trip && state.trip.tags && !state.trip.tripType && !state.trip.tripTypes){
    state.trip.tripType = state.trip.tags[0] || '';
    delete state.trip.tags;
    changed = true;
  }

  if (state.trip && state.trip.tripType !== undefined && !state.trip.tripTypes){
    state.trip.tripTypes = state.trip.tripType ? [state.trip.tripType] : [];
    delete state.trip.tripType;
    changed = true;
  }

  if (state.categories && state.categories.indexOf('Other') !== -1 && state.categories.indexOf('Other') !== state.categories.length - 1){
    state.categories = state.categories.filter(function(c){ return c !== 'Other'; });
    state.categories.push('Other');
    changed = true;
  }

  return changed;
}

var STATE = loadState();
if (migrateState(STATE)){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE)); } catch (e){}
}

var persistTimer = null;
function persist(){
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(function(){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE)); } catch (e){}
  }, 150);
}

var trip = STATE.trip || { days: 7, location: '', tripTypes: [] };
var manualOverrides = STATE.manualOverrides || {};
var packed = STATE.packed || {};
var openMore = {};
STATE.trip = trip;
STATE.manualOverrides = manualOverrides;
STATE.packed = packed;

var OP_SYMBOL = { multiply: '×', add: '+', setMin: 'min', setRate: 'rate' };

function el(tag, attrs, children){
  var e = document.createElement(tag);
  attrs = attrs || {};
  for (var k in attrs){
    if (k === 'class') e.className = attrs[k];
    else if (k === 'html') e.innerHTML = attrs[k];
    else if (k === 'text') e.textContent = attrs[k];
    else if (k.indexOf('on') === 0 && typeof attrs[k] === 'function') e.addEventListener(k.slice(2), attrs[k]);
    else e.setAttribute(k, attrs[k]);
  }
  (children || []).forEach(function(c){ if (c) e.appendChild(c); });
  return e;
}

function itemById(id){
  for (var i = 0; i < STATE.items.length; i++) if (STATE.items[i].id === id) return STATE.items[i];
  return null;
}

function activeRules(){
  return STATE.rules.filter(function(r){
    if (r.kind === 'location') return r.key === trip.location;
    if (r.kind === 'tripType') return trip.tripTypes.indexOf(r.key) !== -1;
    return false;
  });
}

function matchesTarget(eff, item){
  if (eff.targetType === 'category') return item.category === eff.targetValue;
  return item.id === eff.targetValue;
}

function effectiveRate(item){
  var rate = item.mode === 'perDay' ? item.rate : 0;
  if (item.mode === 'perDay'){
    activeRules().forEach(function(rule){
      rule.effects.forEach(function(eff){
        if (eff.op === 'setRate' && matchesTarget(eff, item)) rate = Math.max(rate, eff.value);
      });
    });
  }
  return rate;
}

function computeItem(item){
  var rules = activeRules();
  var base = item.mode === 'fixed' ? item.qty : Math.ceil(effectiveRate(item) * trip.days);
  var qty = base;
  var adjustments = [];

  rules.forEach(function(rule){
    rule.effects.forEach(function(eff){
      if (eff.op === 'multiply' && matchesTarget(eff, item)){
        var before = qty;
        qty = Math.ceil(qty * eff.value);
        if (qty !== before) adjustments.push({ rule: rule, text: '×' + eff.value });
      }
    });
  });
  rules.forEach(function(rule){
    rule.effects.forEach(function(eff){
      if (eff.op === 'add' && matchesTarget(eff, item) && eff.value){
        qty += eff.value;
        adjustments.push({ rule: rule, text: '+' + eff.value });
      }
    });
  });
  rules.forEach(function(rule){
    rule.effects.forEach(function(eff){
      if (eff.op === 'setMin' && matchesTarget(eff, item) && qty < eff.value){
        qty = eff.value;
        adjustments.push({ rule: rule, text: 'min ' + eff.value });
      }
    });
  });

  if (qty === 0 && item.tags && item.tags.length && trip.tripTypes.some(function(t){ return item.tags.indexOf(t) !== -1; })){
    qty = 1;
  }

  var manual = false;
  if (manualOverrides.hasOwnProperty(item.id)){
    qty = manualOverrides[item.id];
    manual = true;
  }
  if (qty < 0) qty = 0;
  return { qty: qty, adjustments: adjustments, manual: manual };
}

function setDays(n){
  trip.days = Math.max(1, Math.min(60, n || 1));
  persist();
  renderPlan();
}

function addLocation(){
  var name = window.prompt('Destination name (e.g. Portugal):');
  if (!name) return null;
  name = name.trim();
  if (!name) return null;
  var key = 'loc' + Math.random().toString(36).slice(2, 8);
  STATE.rules.push({ id: key, kind: 'location', key: key, label: name, note: '', effects: [] });
  return key;
}

function toggleTripType(key, on){
  var idx = trip.tripTypes.indexOf(key);
  if (on && idx === -1) trip.tripTypes.push(key);
  else if (!on && idx !== -1) trip.tripTypes.splice(idx, 1);
  persist();
  renderPlan();
}

function adjustQty(id, delta){
  var item = itemById(id);
  var current = manualOverrides.hasOwnProperty(id) ? manualOverrides[id] : computeItem(item).qty;
  manualOverrides[id] = Math.max(0, current + delta);
  persist();
  renderPlan();
}

function forceAdd(id){
  var item = itemById(id);
  var computed = computeItem(item).qty;
  manualOverrides[id] = computed > 0 ? computed : 1;
  persist();
  renderPlan();
}

function togglePacked(id){
  packed[id] = !packed[id];
  persist();
  var row = document.querySelector('.item-row[data-id="' + cssEscape(id) + '"]');
  if (row) row.classList.toggle('packed', !!packed[id]);
  updateProgress();
}

function cssEscape(s){ return s.replace(/[^a-zA-Z0-9_-]/g, '\\$&'); }

function updateProgress(){
  var rows = document.querySelectorAll('#checklist .item-row[data-id]');
  var total = rows.length, done = 0;
  rows.forEach(function(r){ if (packed[r.getAttribute('data-id')]) done++; });
  var fill = document.getElementById('progress-fill');
  var label = document.getElementById('progress-label');
  if (fill) fill.style.width = (total ? (done / total * 100) : 0) + '%';
  if (label) label.textContent = done + ' / ' + total + ' packed';
}

function resetTrip(){
  manualOverrides = {};
  packed = {};
  STATE.manualOverrides = manualOverrides;
  STATE.packed = packed;
  persist();
  renderPlan();
}

function resetToDefaults(){
  if (!window.confirm('Reset the base list and rules back to the originals? Your current trip selections stay put.')) return;
  var fresh = structuredCloneState(DEFAULT_STATE);
  STATE.items = fresh.items;
  STATE.rules = fresh.rules;
  STATE.categories = fresh.categories;
  persist();
  renderPlan();
  renderBaseList();
  renderRules();
}

// ---------- Rendering: Plan view ----------

function renderPlan(){
  var view = document.getElementById('view-plan');
  view.innerHTML = '';

  var panel = el('div', { class: 'panel trip-panel' });

  var daysField = el('div', { class: 'field' }, [
    el('label', { text: 'Days' }),
    el('div', { class: 'stepper' }, [
      el('button', { type: 'button', text: '−', onclick: function(){ setDays(trip.days - 1); } }),
      el('input', { type: 'number', id: 'days-input', value: trip.days, min: '1', max: '60' }),
      el('button', { type: 'button', text: '+', onclick: function(){ setDays(trip.days + 1); } })
    ])
  ]);
  panel.appendChild(daysField);

  var locSelect = el('select', { class: 'select-field' });
  locSelect.appendChild(el('option', { value: '', text: 'None' }));
  STATE.rules.filter(function(r){ return r.kind === 'location'; }).forEach(function(r){
    var o = el('option', { value: r.key, text: r.label });
    if (trip.location === r.key) o.setAttribute('selected', '');
    locSelect.appendChild(o);
  });
  locSelect.appendChild(el('option', { value: '__new__', text: 'New…' }));
  locSelect.addEventListener('change', function(){
    if (locSelect.value === '__new__'){
      var newKey = addLocation();
      trip.location = newKey || trip.location;
      persist();
      renderPlan();
      renderRules();
      return;
    }
    trip.location = locSelect.value;
    persist();
    renderPlan();
  });
  panel.appendChild(el('div', { class: 'field' }, [ el('label', { text: 'Destination' }), locSelect ]));

  var typeGroup = el('div', { class: 'checkbox-group' });
  STATE.rules.filter(function(r){ return r.kind === 'tripType'; }).forEach(function(r){
    var cbId = 'triptype-' + r.key;
    var cb = el('input', { type: 'checkbox', id: cbId });
    cb.checked = trip.tripTypes.indexOf(r.key) !== -1;
    cb.addEventListener('change', function(){ toggleTripType(r.key, cb.checked); });
    typeGroup.appendChild(el('label', { class: 'checkbox-label', for: cbId, title: r.note }, [
      cb, document.createTextNode(r.label)
    ]));
  });
  panel.appendChild(el('div', { class: 'field' }, [ el('label', { text: 'Trip type' }), typeGroup ]));

  view.appendChild(panel);

  var strip = el('div', { class: 'rule-strip' });
  activeRules().forEach(function(r){
    strip.appendChild(el('span', { class: 'rule-chip', title: r.note }, [
      el('span', { class: 'dot' }), document.createTextNode(r.label)
    ]));
  });
  view.appendChild(strip);

  var progressRow = el('div', { class: 'progress-row' }, [
    el('span', { id: 'progress-label', text: '0 / 0 packed' }),
    el('div', { class: 'progress-track' }, [ el('div', { class: 'progress-fill', id: 'progress-fill' }) ]),
    el('button', { class: 'btn ghost', type: 'button', text: 'Reset for new trip', onclick: resetTrip })
  ]);
  view.appendChild(progressRow);

  var grid = el('div', { class: 'cat-grid', id: 'checklist' });
  STATE.categories.forEach(function(cat){
    var catItems = STATE.items.filter(function(it){ return it.category === cat; });
    var visible = [], hidden = [];
    catItems.forEach(function(it){
      var r = computeItem(it);
      if (r.qty > 0) visible.push({ item: it, r: r }); else hidden.push(it);
    });

    var card = el('article', { class: 'cat-card' });
    card.appendChild(el('header', {}, [
      el('h2', { text: cat }),
      el('span', { class: 'count mono', text: String(visible.length) })
    ]));

    var list = el('ul', { class: 'item-list' });
    visible.forEach(function(v){
      list.appendChild(renderItemRow(v.item, v.r));
    });
    card.appendChild(list);

    if (hidden.length){
      var det = el('details', { class: 'more' });
      if (openMore[cat]) det.setAttribute('open', '');
      det.addEventListener('toggle', function(){ openMore[cat] = det.open; });
      det.appendChild(el('summary', { text: hidden.length + ' more not needed for this trip' }));
      var hlist = el('ul', { class: 'item-list' });
      hidden.forEach(function(it){
        hlist.appendChild(el('li', { class: 'item-row muted' }, [
          el('span', { class: 'item-name', text: it.name }),
          el('button', { class: 'add-btn', type: 'button', text: '+ Add', onclick: function(){ forceAdd(it.id); } })
        ]));
      });
      det.appendChild(hlist);
      card.appendChild(det);
    }

    grid.appendChild(card);
  });
  view.appendChild(grid);

  updateProgress();

  var daysInput = document.getElementById('days-input');
  daysInput.addEventListener('change', function(){ setDays(parseInt(daysInput.value, 10)); });
}

function renderItemRow(item, r){
  var row = el('li', { class: 'item-row' + (packed[item.id] ? ' packed' : ''), 'data-id': item.id });

  var cb = el('input', { type: 'checkbox' });
  cb.checked = !!packed[item.id];
  cb.addEventListener('change', function(){ togglePacked(item.id); });
  row.appendChild(el('label', { class: 'check' }, [ cb, el('span', {}) ]));

  var main = el('div', { class: 'item-main' }, [ el('span', { class: 'item-name', text: item.name }) ]);
  if (item.note) main.appendChild(el('span', { class: 'item-subnote', text: item.note }));
  row.appendChild(main);

  var qc = el('div', { class: 'qty-control' }, [
    el('button', { type: 'button', text: '−', onclick: function(){ adjustQty(item.id, -1); } }),
    el('span', { class: 'qty mono', text: String(r.qty) + (item.unit ? ' ' + item.unit : '') }),
    el('button', { type: 'button', text: '+', onclick: function(){ adjustQty(item.id, 1); } })
  ]);
  row.appendChild(qc);

  return row;
}

// ---------- Rendering: Base List view ----------

function renderBaseList(){
  var view = document.getElementById('view-baselist');
  view.innerHTML = '';

  view.appendChild(el('div', { class: 'toolbar' }, [
    el('button', { class: 'btn ghost', type: 'button', text: 'Reset base list to defaults', onclick: resetToDefaults }),
    el('span', { class: 'status-msg', text: 'Changes save automatically on this device.' })
  ]));

  STATE.categories.forEach(function(cat){
    var catItems = STATE.items.filter(function(it){ return it.category === cat; });
    var card = el('div', { class: 'edit-card' });
    card.appendChild(el('header', {}, [ el('h2', { text: cat }), el('span', { class: 'count mono', text: String(catItems.length) }) ]));

    var list = el('ul', { class: 'item-list edit-list' });
    catItems.forEach(function(item){
      list.appendChild(renderItemSummaryRow(item));
    });
    card.appendChild(list);

    card.appendChild(el('button', {
      class: 'btn ghost add-row-btn', type: 'button', text: '+ Add item',
      onclick: function(){
        var id = 'custom-' + Math.random().toString(36).slice(2, 9);
        var item = { id: id, category: cat, name: 'New item', mode: 'fixed', qty: 1, tags: [] };
        STATE.items.push(item);
        persist();
        renderBaseList();
        openItemEditor(item);
      }
    }));

    view.appendChild(card);
  });
}

function renderItemSummaryRow(item){
  if (!item.tags) item.tags = [];
  var metaParts = [ item.mode === 'fixed' ? ('Fixed · ' + item.qty) : ('Per day · ' + item.rate + '/day') ];
  if (item.tags.length){
    metaParts.push(item.tags.map(function(k){
      var r = STATE.rules.filter(function(rr){ return rr.kind === 'tripType' && rr.key === k; })[0];
      return r ? r.label : k;
    }).join(', '));
  }
  var row = el('li', { class: 'item-row edit-summary-row', onclick: function(){ openItemEditor(item); } }, [
    el('div', { class: 'item-main' }, [
      el('span', { class: 'item-name', text: item.name }),
      el('span', { class: 'item-summary-meta', text: metaParts.join(' · ') })
    ]),
    el('span', { class: 'summary-arrow', text: '›' })
  ]);
  return row;
}

function openItemEditor(item){
  var dialog = document.getElementById('item-dialog');
  dialog.innerHTML = '';
  if (!item.tags) item.tags = [];

  var header = el('div', { class: 'dialog-header' }, [
    el('h2', { text: 'Edit item' }),
    el('button', { class: 'icon-btn', type: 'button', text: '✕', title: 'Close', onclick: function(){ dialog.close(); renderBaseList(); } })
  ]);
  dialog.appendChild(header);

  var body = el('div', { class: 'item-editor' });

  var nameInput = el('input', { type: 'text', class: 'editor-input', value: item.name });
  nameInput.addEventListener('input', function(){ item.name = nameInput.value; persist(); });
  body.appendChild(el('div', { class: 'field' }, [ el('label', { text: 'Name' }), nameInput ]));

  var catSelect = el('select', { class: 'select-field' });
  STATE.categories.forEach(function(c){
    var o = el('option', { value: c, text: c });
    if (item.category === c) o.setAttribute('selected', '');
    catSelect.appendChild(o);
  });
  catSelect.addEventListener('change', function(){ item.category = catSelect.value; persist(); });
  body.appendChild(el('div', { class: 'field' }, [ el('label', { text: 'Category' }), catSelect ]));

  var tagGroup = el('div', { class: 'chip-group' });
  var tripTypeRules = STATE.rules.filter(function(r){ return r.kind === 'tripType'; });
  tripTypeRules.forEach(function(r){
    var on = item.tags.indexOf(r.key) !== -1;
    var chip = el('button', {
      type: 'button', class: 'chip chip-sm' + (on ? ' selected' : ''), text: r.label,
      onclick: function(){
        var idx = item.tags.indexOf(r.key);
        if (idx === -1) item.tags.push(r.key); else item.tags.splice(idx, 1);
        chip.classList.toggle('selected');
        persist();
      }
    });
    tagGroup.appendChild(chip);
  });
  var tagLabelRow = el('div', { class: 'field-label-row' }, [
    el('label', { text: 'Trip type' }),
    el('button', {
      type: 'button', class: 'link-btn', text: 'Select all',
      onclick: function(){
        item.tags = tripTypeRules.map(function(r){ return r.key; });
        persist();
        openItemEditor(item);
      }
    })
  ]);
  body.appendChild(el('div', { class: 'field' }, [ tagLabelRow, tagGroup ]));

  var modeSelect = el('select', { class: 'select-field' });
  ['fixed', 'perDay'].forEach(function(m){
    var opt = el('option', { value: m, text: m === 'fixed' ? 'Fixed' : 'Per day' });
    if (item.mode === m) opt.setAttribute('selected', '');
    modeSelect.appendChild(opt);
  });
  modeSelect.addEventListener('change', function(){
    if (modeSelect.value === 'fixed'){ item.mode = 'fixed'; item.qty = item.qty || 1; delete item.rate; }
    else { item.mode = 'perDay'; item.rate = item.rate || 0; delete item.qty; }
    persist();
    openItemEditor(item);
  });
  body.appendChild(el('div', { class: 'field' }, [ el('label', { text: 'Mode' }), modeSelect ]));

  var qtyInput = el('input', { class: 'editor-input', type: 'number', step: item.mode === 'perDay' ? '0.1' : '1', min: '0',
    value: item.mode === 'perDay' ? item.rate : item.qty });
  qtyInput.addEventListener('input', function(){
    var v = parseFloat(qtyInput.value) || 0;
    if (item.mode === 'perDay') item.rate = v; else item.qty = v;
    persist();
  });
  body.appendChild(el('div', { class: 'field' }, [ el('label', { text: item.mode === 'perDay' ? 'Rate per day' : 'Quantity' }), qtyInput ]));

  var noteInput = el('input', { class: 'editor-input', type: 'text', value: item.note || '', placeholder: 'Optional' });
  noteInput.addEventListener('input', function(){ item.note = noteInput.value || undefined; persist(); });
  body.appendChild(el('div', { class: 'field' }, [ el('label', { text: 'Notes' }), noteInput ]));

  dialog.appendChild(body);

  var footer = el('div', { class: 'dialog-footer' }, [
    el('button', {
      class: 'btn ghost', type: 'button', text: 'Delete item',
      onclick: function(){
        STATE.items = STATE.items.filter(function(it){ return it.id !== item.id; });
        STATE.rules.forEach(function(rule){
          rule.effects = rule.effects.filter(function(eff){ return !(eff.targetType === 'item' && eff.targetValue === item.id); });
        });
        persist();
        dialog.close();
        renderBaseList();
      }
    }),
    el('button', { class: 'btn primary', type: 'button', text: 'Done', onclick: function(){ dialog.close(); renderBaseList(); } })
  ]);
  dialog.appendChild(footer);

  dialog.showModal();
}

// ---------- Rendering: Rules view ----------

function renderRules(){
  var view = document.getElementById('view-rules');
  view.innerHTML = '';

  view.appendChild(el('div', { class: 'toolbar' }, [
    el('button', {
      class: 'btn', type: 'button', text: '+ Add rule', onclick: function(){
        var key = 'custom' + Math.random().toString(36).slice(2, 7);
        STATE.rules.push({ id: key, kind: 'tripType', key: key, label: 'New rule', note: '', effects: [] });
        persist();
        renderRules();
      }
    }),
    el('span', { class: 'status-msg', text: 'Changes save automatically on this device.' })
  ]));

  if (!STATE.rules.length) view.appendChild(el('div', { class: 'empty-hint', text: 'No rules yet.' }));

  STATE.rules.forEach(function(rule){
    view.appendChild(renderRuleCard(rule));
  });
}

function categoryOptions(selected){
  return STATE.categories.map(function(c){
    var o = el('option', { value: c, text: c });
    if (c === selected) o.setAttribute('selected', '');
    return o;
  });
}
function itemOptions(selected){
  return STATE.items.map(function(it){
    var o = el('option', { value: it.id, text: it.category + ' – ' + it.name });
    if (it.id === selected) o.setAttribute('selected', '');
    return o;
  });
}

function renderRuleCard(rule){
  var card = el('div', { class: 'rule-card' });

  var top = el('div', { class: 'rule-card-top' });
  var labelInput = el('input', { type: 'text', value: rule.label });
  labelInput.addEventListener('input', function(){ rule.label = labelInput.value; persist(); });
  top.appendChild(labelInput);
  top.appendChild(el('span', { class: 'kind-pill', text: rule.kind === 'location' ? 'Location' : 'Trip type' }));
  top.appendChild(el('button', {
    class: 'icon-btn', type: 'button', text: '✕', title: 'Delete rule',
    onclick: function(){
      STATE.rules = STATE.rules.filter(function(r){ return r.id !== rule.id; });
      persist();
      renderRules();
    }
  }));
  card.appendChild(top);

  var noteInput = el('input', { class: 'rule-note-input', type: 'text', value: rule.note || '', placeholder: 'When does this apply, and why?' });
  noteInput.addEventListener('input', function(){ rule.note = noteInput.value; persist(); });
  card.appendChild(noteInput);

  var effectsWrap = el('div', { class: 'effects' });
  rule.effects.forEach(function(eff, idx){
    effectsWrap.appendChild(renderEffectRow(rule, eff, idx));
  });
  card.appendChild(effectsWrap);

  var footer = el('div', { class: 'rule-card-footer' }, [
    el('button', {
      class: 'btn ghost', type: 'button', text: '+ Add effect', onclick: function(){
        rule.effects.push({ targetType: 'category', targetValue: STATE.categories[0], op: 'multiply', value: 1 });
        persist();
        renderRules();
      }
    })
  ]);
  card.appendChild(footer);

  return card;
}

function renderEffectRow(rule, eff, idx){
  var row = el('div', { class: 'effect-row' });

  var typeSelect = el('select');
  [['category', 'Category'], ['item', 'Item']].forEach(function(pair){
    var o = el('option', { value: pair[0], text: pair[1] });
    if (eff.targetType === pair[0]) o.setAttribute('selected', '');
    typeSelect.appendChild(o);
  });
  typeSelect.addEventListener('change', function(){
    eff.targetType = typeSelect.value;
    eff.targetValue = eff.targetType === 'category' ? STATE.categories[0] : STATE.items[0].id;
    persist();
    renderRules();
  });
  row.appendChild(typeSelect);

  var targetSelect = el('select', { class: 'effect-target' });
  (eff.targetType === 'category' ? categoryOptions(eff.targetValue) : itemOptions(eff.targetValue)).forEach(function(o){ targetSelect.appendChild(o); });
  targetSelect.addEventListener('change', function(){ eff.targetValue = targetSelect.value; persist(); });
  row.appendChild(targetSelect);

  var opSelect = el('select');
  [['multiply', '× multiply'], ['add', '+ add'], ['setMin', 'set minimum'], ['setRate', 'set per-day rate']].forEach(function(pair){
    var o = el('option', { value: pair[0], text: pair[1] });
    if (eff.op === pair[0]) o.setAttribute('selected', '');
    opSelect.appendChild(o);
  });
  opSelect.addEventListener('change', function(){ eff.op = opSelect.value; persist(); });
  row.appendChild(opSelect);

  var valInput = el('input', { type: 'number', step: '0.1', value: eff.value });
  valInput.addEventListener('input', function(){ eff.value = parseFloat(valInput.value) || 0; persist(); });
  row.appendChild(valInput);

  row.appendChild(el('button', {
    class: 'icon-btn', type: 'button', text: '✕', title: 'Remove effect',
    onclick: function(){ rule.effects.splice(idx, 1); persist(); renderRules(); }
  }));

  return row;
}

// ---------- Tabs ----------

function switchTab(tab){
  document.querySelectorAll('.tab').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-tab') === tab); });
  document.querySelectorAll('.view').forEach(function(v){ v.classList.toggle('active', v.id === 'view-' + tab); });
}

// ---------- Boot ----------

function boot(){
  var root = document.getElementById('root');
  root.innerHTML =
    '<header class="topbar">' +
      '<div class="brand"><span class="brand-mark">🧳</span><div><h1>Zip It!</h1><p class="eyebrow">packing, calculated</p></div></div>' +
      '<nav class="tabs" role="tablist">' +
        '<button class="tab active" data-tab="plan">Plan</button>' +
        '<button class="tab" data-tab="baselist">Base List</button>' +
        '<button class="tab" data-tab="rules">Rules</button>' +
      '</nav>' +
    '</header>' +
    '<main>' +
      '<section id="view-plan" class="view active"></section>' +
      '<section id="view-baselist" class="view"></section>' +
      '<section id="view-rules" class="view"></section>' +
    '</main>' +
    '<dialog id="item-dialog" class="item-dialog"></dialog>';

  document.querySelectorAll('.tab').forEach(function(b){
    b.addEventListener('click', function(){ switchTab(b.getAttribute('data-tab')); });
  });

  document.getElementById('item-dialog').addEventListener('close', function(){ renderBaseList(); });

  renderPlan();
  renderBaseList();
  renderRules();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
