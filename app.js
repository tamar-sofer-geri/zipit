(function(){
"use strict";

var STORAGE_KEY = 'manifest-data-v1';

var DEFAULT_STATE = {"categories":["Travel Essentials","Clothes","Shoes","Toiletries","Medications","Outdoor Gear","Other"],"items":[{"id":"te-passports","category":"Travel Essentials","name":"Passports","mode":"fixed","qty":2},{"id":"te-tz","category":"Travel Essentials","name":"T.Z. (Teudat Zehut)","mode":"fixed","qty":1},{"id":"te-license","category":"Travel Essentials","name":"Driver's license","mode":"fixed","qty":1},{"id":"te-map","category":"Travel Essentials","name":"Map","mode":"fixed","qty":1},{"id":"te-eyemask","category":"Travel Essentials","name":"Eye mask","mode":"fixed","qty":1},{"id":"cl-tshirts-nice","category":"Clothes","name":"Nice t-shirts","mode":"perDay","rate":1.2},{"id":"cl-tshirts-sport","category":"Clothes","name":"Sport / Stanford t-shirts","mode":"perDay","rate":0},{"id":"cl-socks-short","category":"Clothes","name":"Short socks","mode":"perDay","rate":1.0},{"id":"cl-socks-long","category":"Clothes","name":"Long socks","mode":"perDay","rate":0.6},{"id":"cl-pants-long","category":"Clothes","name":"Long pants","mode":"perDay","rate":0.5},{"id":"cl-capris","category":"Clothes","name":"Capris","mode":"perDay","rate":0.3},{"id":"cl-jacket","category":"Clothes","name":"Jacket / sweater wrap","mode":"fixed","qty":1,"note":"Always bring one"},{"id":"cl-shirts-ls","category":"Clothes","name":"Long sleeve shirts","mode":"perDay","rate":0.6},{"id":"cl-pjs","category":"Clothes","name":"PJs","mode":"perDay","rate":0.4},{"id":"cl-underpants","category":"Clothes","name":"Underpants","mode":"perDay","rate":1.2},{"id":"cl-bras","category":"Clothes","name":"Bras","mode":"perDay","rate":0.8},{"id":"cl-swimsuit","category":"Clothes","name":"Swim suits","mode":"fixed","qty":0},{"id":"cl-swim-coverup","category":"Clothes","name":"Bathing suit cover-up","mode":"fixed","qty":0},{"id":"cl-sunglasses","category":"Clothes","name":"Sunglasses","mode":"fixed","qty":1},{"id":"cl-pilates","category":"Clothes","name":"Pilates clothes + grippy socks","mode":"fixed","qty":0,"note":"As needed \u2014 don't forget the socks!"},{"id":"ot-wallcharger","category":"Other","name":"Wall charger + USB-C cable","mode":"fixed","qty":2},{"id":"ot-carcharger","category":"Other","name":"Car charger","mode":"fixed","qty":1},{"id":"ot-converters","category":"Other","name":"Plug converters","mode":"fixed","qty":3},{"id":"ot-glasses","category":"Other","name":"Glasses","mode":"fixed","qty":2},{"id":"ot-computer","category":"Other","name":"Computer","mode":"fixed","qty":1},{"id":"ot-computercharger","category":"Other","name":"Computer charger","mode":"fixed","qty":1},{"id":"ot-laundrybag","category":"Other","name":"Laundry bags","mode":"fixed","qty":1},{"id":"ot-watch","category":"Other","name":"Watch","mode":"fixed","qty":1},{"id":"ot-earrings","category":"Other","name":"Earrings","mode":"fixed","qty":3},{"id":"ot-necklaces","category":"Other","name":"Necklaces","mode":"fixed","qty":3},{"id":"ot-headphones","category":"Other","name":"Headphones","mode":"fixed","qty":2},{"id":"ot-hairdryer","category":"Other","name":"Hair dryer + adapter","mode":"fixed","qty":0},{"id":"ot-bagplane","category":"Other","name":"Reusable bag for the plane","mode":"fixed","qty":1},{"id":"sh-boots","category":"Shoes","name":"Boots","mode":"fixed","qty":1},{"id":"sh-heels","category":"Shoes","name":"Heels","mode":"fixed","qty":0},{"id":"sh-sandals","category":"Shoes","name":"Sandals","mode":"fixed","qty":0,"note":"Required for Israel regardless of season"},{"id":"sh-flipflops","category":"Shoes","name":"Flip flops / indoor shoes","mode":"fixed","qty":1},{"id":"sh-sneakers","category":"Shoes","name":"Sneakers","mode":"fixed","qty":1},{"id":"sh-keens","category":"Shoes","name":"Keens / Chaco / Teva sandals","mode":"fixed","qty":0},{"id":"sh-halfshoes","category":"Shoes","name":"Half shoes","mode":"fixed","qty":0},{"id":"sh-hiking","category":"Shoes","name":"Hiking boots","mode":"fixed","qty":1},{"id":"sh-slipons","category":"Shoes","name":"Cloth slip-ons","mode":"fixed","qty":3},{"id":"to-toothbrush","category":"Toiletries","name":"Toothbrush","mode":"fixed","qty":1},{"id":"to-toothpaste","category":"Toiletries","name":"Toothpaste","mode":"fixed","qty":1},{"id":"to-deodorant","category":"Toiletries","name":"Deodorant","mode":"fixed","qty":1},{"id":"to-shampoo","category":"Toiletries","name":"Shampoo","mode":"fixed","qty":1},{"id":"to-conditioner","category":"Toiletries","name":"Conditioner","mode":"fixed","qty":1},{"id":"to-shapeshifter","category":"Toiletries","name":"Shape Shifter","mode":"fixed","qty":1},{"id":"to-gel","category":"Toiletries","name":"Gel","mode":"fixed","qty":1},{"id":"to-serum","category":"Toiletries","name":"Serum","mode":"fixed","qty":1},{"id":"to-hairtowels","category":"Toiletries","name":"Hair towels","mode":"fixed","qty":2},{"id":"to-facesoap","category":"Toiletries","name":"Face soap","mode":"fixed","qty":1},{"id":"to-facelotion","category":"Toiletries","name":"Face lotion","mode":"fixed","qty":1},{"id":"to-soap","category":"Toiletries","name":"Soap","mode":"fixed","qty":1},{"id":"to-rubberbands","category":"Toiletries","name":"Rubber bands","mode":"fixed","qty":3},{"id":"to-nailfile","category":"Toiletries","name":"Nail file","mode":"fixed","qty":2},{"id":"to-concealer","category":"Toiletries","name":"Concealer","mode":"fixed","qty":1},{"id":"to-chapstick","category":"Toiletries","name":"Chapstick","mode":"fixed","qty":1},{"id":"me-naratriptan","category":"Medications","name":"Naratriptan","mode":"fixed","qty":1,"unit":"pack"},{"id":"me-albuterol","category":"Medications","name":"Albuterol","mode":"fixed","qty":1,"unit":"pack"},{"id":"me-lactaid","category":"Medications","name":"Lactaid","mode":"fixed","qty":1,"unit":"pack"},{"id":"me-cymbalta","category":"Medications","name":"Cymbalta","mode":"fixed","qty":1,"unit":"bottle"},{"id":"me-advil","category":"Medications","name":"Advil","mode":"fixed","qty":1,"unit":"bottle"},{"id":"me-ozempic","category":"Medications","name":"Ozempic","mode":"fixed","qty":1},{"id":"me-statin","category":"Medications","name":"Statin","mode":"fixed","qty":1},{"id":"me-hormonepills","category":"Medications","name":"Hormone pills","mode":"fixed","qty":1},{"id":"me-hormonepatches","category":"Medications","name":"Hormone patches","mode":"fixed","qty":1,"unit":"box"},{"id":"me-xyzal","category":"Medications","name":"Xyzal / allergy meds","mode":"fixed","qty":1,"note":"Extra important for Israel & New Orleans mosquitoes","unit":"bottle"},{"id":"na-backpack","category":"Outdoor Gear","name":"Osprey backpack","mode":"fixed","qty":0},{"id":"na-gloves","category":"Outdoor Gear","name":"Gloves","mode":"fixed","qty":0},{"id":"na-headband","category":"Outdoor Gear","name":"Fleece headband","mode":"fixed","qty":0},{"id":"na-cowl","category":"Outdoor Gear","name":"Cowl","mode":"fixed","qty":1},{"id":"na-warmers","category":"Outdoor Gear","name":"Hand / foot warmers","mode":"perDay","rate":0,"note":"One per day when needed"},{"id":"na-hikingpoles","category":"Outdoor Gear","name":"Hiking poles","mode":"fixed","qty":0},{"id":"na-hikingsocks","category":"Outdoor Gear","name":"Hiking socks","mode":"fixed","qty":0},{"id":"na-picnicblanket","category":"Outdoor Gear","name":"Picnic blanket (compact, foldable)","mode":"fixed","qty":2},{"id":"na-beachblankets","category":"Outdoor Gear","name":"Beach blankets","mode":"fixed","qty":0},{"id":"na-waterbottles","category":"Outdoor Gear","name":"Water bottles","mode":"fixed","qty":1},{"id":"na-insectrepellent","category":"Outdoor Gear","name":"Insect repellent","mode":"fixed","qty":0},{"id":"na-sunscreen","category":"Outdoor Gear","name":"Sunscreen","mode":"fixed","qty":0},{"id":"na-allergymeds","category":"Outdoor Gear","name":"Allergy meds for mosquito bites","mode":"fixed","qty":0,"note":"Required anywhere there might be mosquitoes"}],"destinations":[{"key":"israel","label":"Israel","note":"Destination-specific needs for Israel."},{"key":"neworleans","label":"New Orleans","note":"Rooms run freezing indoors \u2014 thin layers you can add and shed."},{"key":"hawaii","label":"Hawaii","note":"Beach days \u2014 swimwear plus sun & bug protection."}],"tripTypes":[{"key":"city","label":"City","note":"General city trip."},{"key":"outdoors","label":"Outdoors - hiking","note":"Hiking & outdoor gear."},{"key":"beach","label":"Swim / beach","note":"Beach essentials for any warm-water trip."},{"key":"fancy","label":"Fancy","note":"Dressier occasions."},{"key":"hot","label":"Hot","note":"Hot-weather protection."},{"key":"cold","label":"Cold","note":"Cold-weather layers."},{"key":"international","label":"International","note":"Any trip outside the US."}],"savedPlans":[]};

function loadState(){
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredCloneState(DEFAULT_STATE);
    var parsed = JSON.parse(raw);
    if (!parsed || !parsed.items) return structuredCloneState(DEFAULT_STATE);
    return parsed;
  } catch (e){
    return structuredCloneState(DEFAULT_STATE);
  }
}

function structuredCloneState(s){
  return JSON.parse(JSON.stringify(s));
}

var DEST_KEYS = ['israel', 'neworleans', 'hawaii'];

function migrateState(state){
  var changed = false;

  if (state.rules){
    var seen = {};
    var tripTypes = [];
    state.rules.forEach(function(r){
      if (seen[r.key]) return;
      seen[r.key] = true;
      tripTypes.push({ key: r.key, label: r.label, note: r.note || '' });
    });
    state.tripTypes = tripTypes;
    delete state.rules;
    changed = true;
  }
  if (!state.tripTypes) state.tripTypes = structuredCloneState(DEFAULT_STATE.tripTypes);

  if (!state.destinations){
    var moved = state.tripTypes.filter(function(t){ return DEST_KEYS.indexOf(t.key) !== -1; });
    state.destinations = moved;
    state.tripTypes = state.tripTypes.filter(function(t){ return DEST_KEYS.indexOf(t.key) === -1; });
    changed = true;
  }

  var hasDestKey = function(key){ return state.destinations.some(function(t){ return t.key === key; }); };
  DEFAULT_STATE.destinations.forEach(function(d){
    if (!hasDestKey(d.key)){ state.destinations.push(structuredCloneState(d)); changed = true; }
  });

  var hasTypeKey = function(key){ return state.tripTypes.some(function(t){ return t.key === key; }); };
  DEFAULT_STATE.tripTypes.forEach(function(t){
    if (!hasTypeKey(t.key)){ state.tripTypes.push(structuredCloneState(t)); changed = true; }
  });

  if (!state.savedPlans){ state.savedPlans = []; changed = true; }

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
  if (state.trip && state.trip.location){
    if (!state.trip.tripTypes) state.trip.tripTypes = [];
    if (state.trip.tripTypes.indexOf(state.trip.location) === -1) state.trip.tripTypes.push(state.trip.location);
    delete state.trip.location;
    changed = true;
  } else if (state.trip && state.trip.location === ''){
    delete state.trip.location;
    changed = true;
  }
  if (state.trip && state.trip.tripTypes && state.trip.destination === undefined){
    var foundDest = state.trip.tripTypes.filter(function(k){ return DEST_KEYS.indexOf(k) !== -1; })[0];
    state.trip.destination = foundDest || '';
    state.trip.tripTypes = state.trip.tripTypes.filter(function(k){ return DEST_KEYS.indexOf(k) === -1; });
    changed = true;
  }

  (state.savedPlans || []).forEach(function(plan){
    if (plan.tripTypes && plan.destination === undefined){
      var pd = plan.tripTypes.filter(function(k){ return DEST_KEYS.indexOf(k) !== -1; })[0];
      plan.destination = pd || '';
      plan.tripTypes = plan.tripTypes.filter(function(k){ return DEST_KEYS.indexOf(k) === -1; });
      changed = true;
    }
  });

  if (state.categories && state.categories.indexOf('Other') !== -1 && state.categories.indexOf('Other') !== state.categories.length - 1){
    state.categories = state.categories.filter(function(c){ return c !== 'Other'; });
    state.categories.push('Other');
    changed = true;
  }

  if (state.categories && state.categories.indexOf('Nature & Weather') !== -1){
    state.categories = state.categories.map(function(c){ return c === 'Nature & Weather' ? 'Outdoor Gear' : c; });
    state.items.forEach(function(it){ if (it.category === 'Nature & Weather') it.category = 'Outdoor Gear'; });
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

var trip = STATE.trip || { days: 7, destination: '', tripTypes: [] };
var manualOverrides = STATE.manualOverrides || {};
var packed = STATE.packed || {};
var extraItems = STATE.extraItems || [];
var openMore = {};
STATE.trip = trip;
STATE.manualOverrides = manualOverrides;
STATE.packed = packed;
STATE.extraItems = extraItems;
if (STATE.activePlanId === undefined) STATE.activePlanId = null;

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

function tagLabel(key){
  var all = STATE.destinations.concat(STATE.tripTypes);
  var t = all.filter(function(x){ return x.key === key; })[0];
  return t ? t.label : key;
}

function baseQty(item){
  return item.mode === 'fixed' ? item.qty : Math.ceil((item.rate || 0) * trip.days);
}

function computeItem(item){
  var tags = item.tags || [];
  var destMatch = trip.destination && tags.indexOf(trip.destination) !== -1;
  var typeMatch = trip.tripTypes.some(function(t){ return tags.indexOf(t) !== -1; });
  var qty = (destMatch || typeMatch) ? baseQty(item) : 0;
  if (manualOverrides.hasOwnProperty(item.id)) qty = manualOverrides[item.id];
  if (qty < 0) qty = 0;
  return { qty: qty };
}

function setDays(n){
  trip.days = Math.max(1, Math.min(60, n || 1));
  persist();
  renderPlan();
}

function toggleTripType(key, on){
  var idx = trip.tripTypes.indexOf(key);
  if (on && idx === -1) trip.tripTypes.push(key);
  else if (!on && idx !== -1) trip.tripTypes.splice(idx, 1);
  persist();
  renderPlan();
}

function setDestination(key){
  trip.destination = key;
  persist();
  renderPlan();
}

function addDestination(onAdded){
  showPrompt('Add a destination', '', 'e.g. Portugal', function(name){
    var key = 'dest' + Math.random().toString(36).slice(2, 8);
    STATE.destinations.push({ key: key, label: name, note: '' });
    onAdded(key);
  });
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
  var base = baseQty(item);
  manualOverrides[id] = base > 0 ? base : 1;
  persist();
  renderPlan();
}

function addExtraItem(name){
  extraItems.push({ id: 'extra' + Math.random().toString(36).slice(2, 9), name: name, qty: 1 });
  persist();
  renderPlan();
}

function adjustExtraQty(id, delta){
  var item = extraItems.filter(function(it){ return it.id === id; })[0];
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  persist();
  renderPlan();
}

function removeExtraItem(id){
  extraItems = extraItems.filter(function(it){ return it.id !== id; });
  STATE.extraItems = extraItems;
  delete packed[id];
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

function showPrompt(title, defaultValue, placeholder, onConfirm){
  var dialog = document.getElementById('prompt-dialog');
  dialog.innerHTML = '';
  dialog.appendChild(el('div', { class: 'dialog-header' }, [ el('h2', { text: title }) ]));

  var input = el('input', { class: 'editor-input', type: 'text', value: defaultValue || '', placeholder: placeholder || '' });
  var body = el('div', { class: 'item-editor' }, [ el('div', { class: 'field' }, [ input ]) ]);
  dialog.appendChild(body);

  function confirm(){
    var v = input.value.trim();
    dialog.close();
    if (v) onConfirm(v);
  }

  input.addEventListener('keydown', function(e){ if (e.key === 'Enter'){ e.preventDefault(); confirm(); } });

  var footer = el('div', { class: 'dialog-footer' }, [
    el('button', { class: 'btn ghost', type: 'button', text: 'Cancel', onclick: function(){ dialog.close(); } }),
    el('button', { class: 'btn primary', type: 'button', text: 'OK', onclick: confirm })
  ]);
  dialog.appendChild(footer);

  dialog.showModal();
  input.focus();
  input.select();
}

function showConfirm(message, confirmLabel, onConfirm){
  var dialog = document.getElementById('prompt-dialog');
  dialog.innerHTML = '';
  dialog.appendChild(el('div', { class: 'dialog-header' }, [ el('h2', { text: 'Are you sure?' }) ]));
  dialog.appendChild(el('div', { class: 'item-editor' }, [ el('p', { class: 'confirm-message', text: message }) ]));

  var footer = el('div', { class: 'dialog-footer' }, [
    el('button', { class: 'btn ghost', type: 'button', text: 'Cancel', onclick: function(){ dialog.close(); } }),
    el('button', { class: 'btn primary', type: 'button', text: confirmLabel || 'OK', onclick: function(){ dialog.close(); onConfirm(); } })
  ]);
  dialog.appendChild(footer);

  dialog.showModal();
}

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
  extraItems = [];
  STATE.manualOverrides = manualOverrides;
  STATE.packed = packed;
  STATE.extraItems = extraItems;
  persist();
  renderPlan();
}

function resetToDefaults(){
  showConfirm('Reset the base list back to the originals? Your current trip selections and saved plans stay put.', 'Reset', function(){
    var fresh = structuredCloneState(DEFAULT_STATE);
    STATE.items = fresh.items;
    STATE.categories = fresh.categories;
    persist();
    renderPlan();
    renderBaseList();
  });
}

// ---------- Saved Plans ----------

function findPlan(id){
  return STATE.savedPlans.filter(function(p){ return p.id === id; })[0] || null;
}

function currentPlanSnapshot(name){
  return {
    id: 'plan' + Math.random().toString(36).slice(2, 9),
    name: name,
    days: trip.days,
    destination: trip.destination,
    tripTypes: trip.tripTypes.slice(),
    packed: JSON.parse(JSON.stringify(packed)),
    manualOverrides: JSON.parse(JSON.stringify(manualOverrides)),
    extraItems: JSON.parse(JSON.stringify(extraItems)),
    updatedAt: Date.now()
  };
}

function savePlan(){
  var active = STATE.activePlanId ? findPlan(STATE.activePlanId) : null;
  if (active){
    active.days = trip.days;
    active.destination = trip.destination;
    active.tripTypes = trip.tripTypes.slice();
    active.packed = JSON.parse(JSON.stringify(packed));
    active.manualOverrides = JSON.parse(JSON.stringify(manualOverrides));
    active.extraItems = JSON.parse(JSON.stringify(extraItems));
    active.updatedAt = Date.now();
    persist();
    renderPlan();
    renderPlans();
    return;
  }
  savePlanAs();
}

function savePlanAs(){
  showPrompt('Name this plan', 'Trip', '', function(name){
    var plan = currentPlanSnapshot(name);
    STATE.savedPlans.push(plan);
    STATE.activePlanId = plan.id;
    persist();
    renderPlan();
    renderPlans();
  });
}

function loadPlan(id){
  var plan = findPlan(id);
  if (!plan) return;
  trip.days = plan.days;
  trip.destination = plan.destination || '';
  trip.tripTypes = plan.tripTypes.slice();
  packed = JSON.parse(JSON.stringify(plan.packed));
  manualOverrides = JSON.parse(JSON.stringify(plan.manualOverrides));
  extraItems = JSON.parse(JSON.stringify(plan.extraItems || []));
  STATE.trip = trip;
  STATE.packed = packed;
  STATE.manualOverrides = manualOverrides;
  STATE.extraItems = extraItems;
  STATE.activePlanId = id;
  persist();
  switchTab('plan');
  renderPlan();
  renderPlans();
}

function newPlan(){
  trip.days = 7;
  trip.destination = '';
  trip.tripTypes = [];
  packed = {};
  manualOverrides = {};
  extraItems = [];
  STATE.trip = trip;
  STATE.packed = packed;
  STATE.manualOverrides = manualOverrides;
  STATE.extraItems = extraItems;
  STATE.activePlanId = null;
  persist();
  switchTab('plan');
  renderPlan();
  renderPlans();
}

function renamePlan(id){
  var plan = findPlan(id);
  if (!plan) return;
  showPrompt('Rename plan', plan.name, '', function(name){
    plan.name = name;
    persist();
    renderPlans();
    renderPlan();
  });
}

function deletePlan(id){
  var plan = findPlan(id);
  if (!plan) return;
  showConfirm('Delete "' + plan.name + '"? This can\'t be undone.', 'Delete', function(){
    STATE.savedPlans = STATE.savedPlans.filter(function(p){ return p.id !== id; });
    if (STATE.activePlanId === id) STATE.activePlanId = null;
    persist();
    renderPlans();
    renderPlan();
  });
}

// ---------- Rendering: Plan view ----------

function renderPlan(){
  var view = document.getElementById('view-plan');
  view.innerHTML = '';

  var active = STATE.activePlanId ? findPlan(STATE.activePlanId) : null;
  var planBar = el('div', { class: 'plan-bar' }, [
    el('span', { class: 'plan-name', text: active ? active.name : 'Unsaved plan' }),
    el('div', { class: 'plan-bar-actions' }, [
      el('button', { class: 'btn ghost', type: 'button', text: active ? 'Save' : 'Save plan…', onclick: savePlan }),
      active ? el('button', { class: 'btn ghost', type: 'button', text: 'Save as new…', onclick: savePlanAs }) : null,
      el('button', { class: 'btn ghost', type: 'button', text: '+ New plan', onclick: newPlan })
    ])
  ]);
  view.appendChild(planBar);

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

  var destSelect = el('select', { class: 'select-field' });
  destSelect.appendChild(el('option', { value: '', text: 'None' }));
  STATE.destinations.forEach(function(d){
    var o = el('option', { value: d.key, text: d.label });
    if (trip.destination === d.key) o.setAttribute('selected', '');
    destSelect.appendChild(o);
  });
  destSelect.appendChild(el('option', { value: '__new__', text: 'New…' }));
  destSelect.addEventListener('change', function(){
    if (destSelect.value === '__new__'){
      addDestination(function(key){ setDestination(key); });
      renderPlan();
      return;
    }
    setDestination(destSelect.value);
  });
  panel.appendChild(el('div', { class: 'field' }, [ el('label', { text: 'Destination' }), destSelect ]));

  var typeGroup = el('div', { class: 'checkbox-group' });
  STATE.tripTypes.forEach(function(t){
    var cbId = 'triptype-' + t.key;
    var cb = el('input', { type: 'checkbox', id: cbId });
    cb.checked = trip.tripTypes.indexOf(t.key) !== -1;
    cb.addEventListener('change', function(){ toggleTripType(t.key, cb.checked); });
    typeGroup.appendChild(el('label', { class: 'checkbox-label', for: cbId, title: t.note }, [
      cb, document.createTextNode(t.label)
    ]));
  });
  panel.appendChild(el('div', { class: 'field' }, [ el('label', { text: 'Trip type' }), typeGroup ]));

  view.appendChild(panel);

  var activeTags = trip.tripTypes.slice();
  if (trip.destination) activeTags.unshift(trip.destination);
  if (activeTags.length){
    var strip = el('div', { class: 'rule-strip' });
    activeTags.forEach(function(key){
      strip.appendChild(el('span', { class: 'rule-chip' }, [
        el('span', { class: 'dot' }), document.createTextNode(tagLabel(key))
      ]));
    });
    view.appendChild(strip);
  }

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

  var extraCard = el('article', { class: 'cat-card' });
  extraCard.appendChild(el('header', {}, [
    el('h2', { text: 'Extra items for this trip' }),
    el('span', { class: 'count mono', text: String(extraItems.length) })
  ]));
  var extraList = el('ul', { class: 'item-list' });
  extraItems.forEach(function(it){
    extraList.appendChild(renderExtraItemRow(it));
  });
  extraCard.appendChild(extraList);

  var extraNameInput = el('input', { class: 'editor-input', type: 'text', placeholder: 'e.g. Dress for the wedding' });
  var addExtraBtn = el('button', { class: 'btn ghost', type: 'button', text: '+ Add', onclick: function(){
    var name = extraNameInput.value.trim();
    if (!name) return;
    addExtraItem(name);
  } });
  extraNameInput.addEventListener('keydown', function(e){ if (e.key === 'Enter'){ e.preventDefault(); addExtraBtn.click(); } });
  extraCard.appendChild(el('div', { class: 'extra-add-row' }, [ extraNameInput, addExtraBtn ]));

  grid.appendChild(extraCard);
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
    el('span', { class: 'qty mono', text: String(r.qty) }),
    el('button', { type: 'button', text: '+', onclick: function(){ adjustQty(item.id, 1); } })
  ]);
  row.appendChild(qc);

  return row;
}

function renderExtraItemRow(item){
  var row = el('li', { class: 'item-row' + (packed[item.id] ? ' packed' : ''), 'data-id': item.id });

  var cb = el('input', { type: 'checkbox' });
  cb.checked = !!packed[item.id];
  cb.addEventListener('change', function(){ togglePacked(item.id); });
  row.appendChild(el('label', { class: 'check' }, [ cb, el('span', {}) ]));

  row.appendChild(el('div', { class: 'item-main' }, [ el('span', { class: 'item-name', text: item.name }) ]));

  var qc = el('div', { class: 'qty-control' }, [
    el('button', { type: 'button', text: '−', onclick: function(){ adjustExtraQty(item.id, -1); } }),
    el('span', { class: 'qty mono', text: String(item.qty) }),
    el('button', { type: 'button', text: '+', onclick: function(){ adjustExtraQty(item.id, 1); } })
  ]);
  row.appendChild(qc);

  row.appendChild(el('button', { class: 'icon-btn', type: 'button', text: '✕', title: 'Remove', onclick: function(){ removeExtraItem(item.id); } }));

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
    metaParts.push(item.tags.map(tagLabel).join(', '));
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

  function buildTagField(fieldLabel, list){
    var group = el('div', { class: 'chip-group' });
    list.forEach(function(t){
      var on = item.tags.indexOf(t.key) !== -1;
      var chip = el('button', {
        type: 'button', class: 'chip chip-sm' + (on ? ' selected' : ''), text: t.label,
        onclick: function(){
          var idx = item.tags.indexOf(t.key);
          if (idx === -1) item.tags.push(t.key); else item.tags.splice(idx, 1);
          chip.classList.toggle('selected');
          persist();
        }
      });
      group.appendChild(chip);
    });
    var labelRow = el('div', { class: 'field-label-row' }, [
      el('label', { text: fieldLabel }),
      el('button', {
        type: 'button', class: 'link-btn', text: 'Select all',
        onclick: function(){
          list.forEach(function(t){ if (item.tags.indexOf(t.key) === -1) item.tags.push(t.key); });
          persist();
          openItemEditor(item);
        }
      })
    ]);
    return el('div', { class: 'field' }, [ labelRow, group ]);
  }

  body.appendChild(buildTagField('Destination', STATE.destinations));
  body.appendChild(buildTagField('Trip type', STATE.tripTypes));

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

// ---------- Rendering: Plans view ----------

function renderPlans(){
  var view = document.getElementById('view-plans');
  view.innerHTML = '';

  view.appendChild(el('div', { class: 'toolbar' }, [
    el('button', { class: 'btn', type: 'button', text: '+ New plan', onclick: newPlan })
  ]));

  if (!STATE.savedPlans.length){
    view.appendChild(el('div', { class: 'empty-hint', text: 'No saved plans yet. Set up a trip on Plan, then tap "Save plan…".' }));
    return;
  }

  STATE.savedPlans.slice().sort(function(a, b){ return b.updatedAt - a.updatedAt; }).forEach(function(plan){
    var isActive = STATE.activePlanId === plan.id;
    var packedCount = Object.keys(plan.packed).filter(function(k){ return plan.packed[k]; }).length;
    var meta = plan.days + ' day' + (plan.days === 1 ? '' : 's');
    var planTags = (plan.destination ? [plan.destination] : []).concat(plan.tripTypes);
    if (planTags.length) meta += ' · ' + planTags.map(tagLabel).join(', ');

    var card = el('div', { class: 'plan-card' + (isActive ? ' active' : '') }, [
      el('div', { class: 'plan-card-main' }, [
        el('div', { class: 'plan-card-name', text: plan.name }),
        el('div', { class: 'item-summary-meta', text: meta })
      ]),
      el('div', { class: 'plan-card-actions' }, [
        el('button', { class: 'btn ghost', type: 'button', text: isActive ? 'Loaded' : 'Load', onclick: function(){ loadPlan(plan.id); } }),
        el('button', { class: 'icon-btn', type: 'button', text: '✎', title: 'Rename', onclick: function(){ renamePlan(plan.id); } }),
        el('button', { class: 'icon-btn', type: 'button', text: '✕', title: 'Delete', onclick: function(){ deletePlan(plan.id); } })
      ])
    ]);
    view.appendChild(card);
  });
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
        '<button class="tab" data-tab="plans">Saved Plans</button>' +
        '<button class="tab" data-tab="baselist">Base List</button>' +
      '</nav>' +
    '</header>' +
    '<main>' +
      '<section id="view-plan" class="view active"></section>' +
      '<section id="view-plans" class="view"></section>' +
      '<section id="view-baselist" class="view"></section>' +
    '</main>' +
    '<dialog id="item-dialog" class="item-dialog"></dialog>' +
    '<dialog id="prompt-dialog" class="item-dialog prompt-dialog"></dialog>';

  document.querySelectorAll('.tab').forEach(function(b){
    b.addEventListener('click', function(){ switchTab(b.getAttribute('data-tab')); });
  });

  document.getElementById('item-dialog').addEventListener('close', function(){ renderBaseList(); });

  renderPlan();
  renderBaseList();
  renderPlans();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
