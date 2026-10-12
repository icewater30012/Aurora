// Created: 2026-10-10 20:45:10 +0800
// Arctic Route Map – Leaflet JS logic

(function () {
  /* ── i18n helpers ── */
  function t(key) { return (window.I18N && window.I18N[key]) ? window.I18N[key] : key; }

  /* ────────────────────────────────────────────────────────
     DATA: spots (plan = default schedule, backup = backup)
  ──────────────────────────────────────────────────────── */
  var SPOTS = [
    // ── Stockholm ──
    { id:'sto-city-hall',   lat:59.3274, lng:18.0541, region:'stockholm', day:'10/25', type:'plan',   name:'市政廳',          name_en:'Stockholm City Hall',    note:'Stockholm',       note_en:'Stockholm', url:'https://www.google.com/maps/search/?api=1&query=Stockholm+City+Hall' },
    { id:'sto-gamla-stan',  lat:59.3251, lng:18.0710, region:'stockholm', day:'10/25', type:'plan',   name:'老城區 Gamla Stan', name_en:'Gamla Stan',             note:'歷史老城區',       note_en:'Historic Old Town', url:'https://www.google.com/maps/search/?api=1&query=Gamla+Stan+Stockholm' },
    { id:'sto-skeppsbro',   lat:59.3231, lng:18.0739, region:'stockholm', day:'10/25', type:'plan',   name:'Skeppsbro Bakery', name_en:'Skeppsbro Bakery',        note:'肉桂捲',          note_en:'Cinnamon buns', url:'https://www.google.com/maps/search/?api=1&query=Skeppsbro+Bakery+Stockholm' },
    { id:'sto-montelius',   lat:59.3202, lng:18.0564, region:'stockholm', day:'10/25', type:'plan',   name:'Monteliusvägen', name_en:'Monteliusvägen',           note:'日落觀景',         note_en:'Sunset viewpoint', url:'https://www.google.com/maps/search/?api=1&query=Monteliusv%C3%A4gen+Stockholm' },
    { id:'sto-restaurant',  lat:59.3334, lng:18.0607, region:'stockholm', day:'10/25', type:'plan',   name:'Restaurang AG',   name_en:'Restaurang AG',           note:'牛排晚餐',         note_en:'Steak dinner', url:'https://www.google.com/maps/search/?api=1&query=Restaurang+AG+Stockholm' },
    { id:'sto-kajsas',      lat:59.3327, lng:18.0651, region:'stockholm', day:'10/26', type:'plan',   name:'Kajsas Fisk',     name_en:'Kajsas Fisk',             note:'魚湯 11:00',       note_en:'Fish soup 11:00', url:'https://www.google.com/maps/search/?api=1&query=Kajsas+Fisk+Stockholm' },
    { id:'sto-vasa',        lat:59.3279, lng:18.0916, region:'stockholm', day:'10/26', type:'plan',   name:'Vasa Museum',     name_en:'Vasa Museum',             note:'瓦薩沉船博物館',    note_en:'Historic warship museum', url:'https://www.google.com/maps/search/?api=1&query=Vasa+Museum+Stockholm' },
    { id:'sto-skansen',     lat:59.3246, lng:18.1053, region:'stockholm', day:'10/26', type:'plan',   name:'Skansen',         name_en:'Skansen',                 note:'露天博物館',        note_en:'Open-air museum', url:'https://www.google.com/maps/search/?api=1&query=Skansen+Stockholm' },
    { id:'sto-fotografiska', lat:59.3180, lng:18.0842, region:'stockholm', day:'10/24', type:'plan',  name:'Fotografiska',    name_en:'Fotografiska',            note:'備案',             note_en:'Optional', url:'https://www.google.com/maps/search/?api=1&query=Fotografiska+Stockholm' },
    // Stockholm backup
    { id:'sto-kungstr',     lat:59.3322, lng:18.0706, region:'stockholm', day:null, type:'backup', name:'Kungsträdgården', name_en:'Kungsträdgården',           note:'國王花園',         note_en:'Royal Garden', url:'https://www.google.com/maps/search/?api=1&query=Kungstr%C3%A4dg%C3%A5rden+Stockholm' },
    { id:'sto-drottning',   lat:59.3345, lng:18.0631, region:'stockholm', day:null, type:'backup', name:'Drottninggatan',  name_en:'Drottninggatan',            note:'皇后街',           note_en:'Queen Street shopping', url:'https://www.google.com/maps/search/?api=1&query=Drottninggatan+Stockholm' },
    { id:'sto-icebar',      lat:59.3355, lng:18.0687, region:'stockholm', day:null, type:'backup', name:'ICEBAR Stockholm', name_en:'ICEBAR Stockholm',          note:'冰酒吧',           note_en:'Ice bar', url:'https://www.google.com/maps/search/?api=1&query=ICEBAR+Stockholm' },
    { id:'sto-avicii',      lat:59.3310, lng:18.0590, region:'stockholm', day:null, type:'backup', name:'Avicii Experience', name_en:'Avicii Experience',       note:'音樂博物館',        note_en:'Music museum', url:'https://www.google.com/maps/search/?api=1&query=Avicii+Experience+Stockholm' },

    // ── Abisko ──
    { id:'abi-canyon',      lat:68.3595, lng:18.8297, region:'abisko', day:'10/27', type:'plan',   name:'阿比斯庫峽谷步道', name_en:'Abisko Canyon Trail',      note:'峽谷健行',         note_en:'Canyon hike', url:'https://www.google.com/maps/search/?api=1&query=Abisko+Canyon' },
    { id:'abi-lake',        lat:68.3501, lng:18.8112, region:'abisko', day:'10/27', type:'plan',   name:'Njakajaure 湖岸', name_en:'Njakajaure Lakeside',       note:'湖岸步道',         note_en:'Lakeside trail', url:'https://www.google.com/maps/search/?api=1&query=Njakajaure+Abisko' },
    { id:'abi-kungsleden',  lat:68.3630, lng:18.8350, region:'abisko', day:'10/28', type:'plan',   name:'Kungsleden 國王步道', name_en:'Kungsleden Trail',      note:'北歐著名長途步道',   note_en:'Famous Nordic long-distance trail', url:'https://www.google.com/maps/search/?api=1&query=Kungsleden+Abisko' },
    { id:'abi-cable',       lat:68.3567, lng:18.8154, region:'abisko', day:'10/28', type:'plan',   name:'Aurora Sky Station 纜車', name_en:'Aurora Sky Station Cable Car', note:'待確認', note_en:'To be confirmed', url:'https://www.google.com/maps/search/?api=1&query=Aurora+Sky+Station+Abisko' },

    // ── Lofoten ──
    { id:'lof-svolvaer',    lat:68.2342, lng:14.5674, region:'lofoten', day:'10/29', type:'plan',   name:'Svolvær',         name_en:'Svolvær',                 note:'羅浮敦主城',        note_en:'Main town of Lofoten', url:'https://www.google.com/maps/search/?api=1&query=Svolv%C3%A6r' },
    { id:'lof-haukland',    lat:68.1563, lng:13.5337, region:'lofoten', day:'10/29', type:'plan',   name:'Haukland Beach',  name_en:'Haukland Beach',          note:'Mannen 步道',       note_en:'Mannen hike', url:'https://www.google.com/maps/search/?api=1&query=Haukland+Beach' },
    { id:'lof-nusfjord',    lat:68.0627, lng:13.3238, region:'lofoten', day:'10/29', type:'plan',   name:'Nusfjord',        name_en:'Nusfjord',                note:'古老漁村',          note_en:'Oldest preserved fishing village', url:'https://www.google.com/maps/search/?api=1&query=Nusfjord' },
    { id:'lof-reinebringen',lat:67.9319, lng:13.0914, region:'lofoten', day:'10/30', type:'plan',   name:'Reinebringen',    name_en:'Reinebringen',            note:'最美山頂步道',       note_en:'Iconic summit hike', url:'https://www.google.com/maps/search/?api=1&query=Reinebringen' },
    { id:'lof-hamn',        lat:67.9261, lng:13.0786, region:'lofoten', day:'10/30', type:'plan',   name:'Hamnøy',          name_en:'Hamnøy',                  note:'紅色漁屋',          note_en:'Red fishermen cabins', url:'https://www.google.com/maps/search/?api=1&query=Hamn%C3%B8y' },
    { id:'lof-sakris',      lat:67.9293, lng:13.0862, region:'lofoten', day:'10/30', type:'plan',   name:'Sakrisøy',        name_en:'Sakrisøy',                note:'黃色漁屋',          note_en:'Yellow fishermen cabins', url:'https://www.google.com/maps/search/?api=1&query=Sakris%C3%B8y' },
    { id:'lof-anita',       lat:67.9290, lng:13.0853, region:'lofoten', day:'10/30', type:'plan',   name:'Anita\'s Sjømat', name_en:"Anita's Sjømat",          note:'魚漢堡、煙燻鮭魚',   note_en:'Fish burger & smoked salmon', url:'https://www.google.com/maps/search/?api=1&query=Anita%27s+Sj%C3%B8mat' },
    { id:'lof-bakeriet',    lat:67.8773, lng:12.9715, region:'lofoten', day:'10/31', type:'plan',   name:'Bakeriet i Å',    name_en:'Bakeriet i Å',            note:'肉桂捲 kanelboller', note_en:'Cinnamon buns', url:'https://www.google.com/maps/search/?api=1&query=Bakeriet+i+%C3%85+Lofoten' },
    { id:'lof-museum',      lat:67.8765, lng:12.9721, region:'lofoten', day:'10/31', type:'plan',   name:'挪威漁村博物館',   name_en:'Norwegian Fishing Village Museum', note:'',          note_en:'', url:'https://www.google.com/maps/search/?api=1&query=Norwegian+Fishing+Village+Museum' },
    { id:'lof-ramberg',     lat:68.0916, lng:13.2063, region:'lofoten', day:'11/1',  type:'plan',   name:'Ramberg Beach',   name_en:'Ramberg Beach',           note:'',                  note_en:'', url:'https://www.google.com/maps/search/?api=1&query=Ramberg+Beach' },
    { id:'lof-henningsvær', lat:68.1533, lng:14.1993, region:'lofoten', day:'11/1',  type:'plan',   name:'Henningsvær',     name_en:'Henningsvær',             note:'漁村',              note_en:'Fishing village', url:'https://www.google.com/maps/search/?api=1&query=Henningsv%C3%A6r' },
    // Lofoten backup
    { id:'lof-kvalvika',    lat:68.0483, lng:13.4232, region:'lofoten', day:null, type:'backup', name:'Kvalvika Beach',   name_en:'Kvalvika Beach',          note:'選配',              note_en:'Optional', url:'https://www.google.com/maps/search/?api=1&query=Kvalvika+Beach' },
    { id:'lof-a',           lat:67.8773, lng:12.9713, region:'lofoten', day:null, type:'backup', name:'Å 公路盡頭',       name_en:'Å Village',               note:'傳統漁村',          note_en:'Traditional fishing village', url:'https://www.google.com/maps/search/?api=1&query=%C3%85+i+Lofoten' },
    { id:'lof-torrefish',   lat:68.2301, lng:14.5691, region:'lofoten', day:null, type:'backup', name:'乾鱈魚博物館',     name_en:'Stockfish Museum',        note:'Tørrfiskmuseum',    note_en:'Tørrfiskmuseum', url:'https://www.google.com/maps/search/?api=1&query=Lofoten+T%C3%B8rrfiskmuseum' },

    // ── Tromsø ──
    { id:'tro-raketten',    lat:69.6489, lng:18.9553, region:'tromso', day:'11/2',  type:'plan',   name:'Raketten Bar & Pølse', name_en:'Raketten Bar & Pølse', note:'馴鹿肉香腸堡',      note_en:'Reindeer sausage burger', url:'https://www.google.com/maps/search/?api=1&query=Raketten+Bar+P%C3%B8lse+Troms%C3%B8' },
    { id:'tro-cable',       lat:69.6531, lng:18.9841, region:'tromso', day:'11/2',  type:'plan',   name:'Fjellheisen 纜車', name_en:'Fjellheisen Cable Car',   note:'俯瞰特羅姆瑟',       note_en:'Panorama over Tromsø', url:'https://www.google.com/maps/search/?api=1&query=Fjellheisen+Troms%C3%B8' },
    { id:'tro-whale',       lat:69.6489, lng:18.9550, region:'tromso', day:'11/3',  type:'plan',   name:'賞鯨',             name_en:'Whale Watching',          note:'16:30 出發',        note_en:'Departs 16:30', url:'https://www.google.com/maps/search/?api=1&query=whale+watching+Troms%C3%B8' },
    { id:'tro-pust',        lat:69.6512, lng:18.9501, region:'tromso', day:'11/3',  type:'plan',   name:'Pust 桑拿',        name_en:'Pust Sauna',              note:'',                  note_en:'', url:'https://www.google.com/maps/search/?api=1&query=Pust+Troms%C3%B8' },

    // ── Amsterdam ──
    { id:'ams-canal',       lat:52.3728, lng:4.8936,  region:'nl', day:'11/04', type:'plan',   name:'運河遊船',          name_en:'Canal Cruise',            note:'',                  note_en:'', url:'https://www.google.com/maps/search/?api=1&query=Amsterdam+canal+cruise' },
    { id:'ams-vangogh',     lat:52.3584, lng:4.8811,  region:'nl', day:'11/05', type:'plan',   name:'梵谷博物館',        name_en:'Van Gogh Museum',         note:'',                  note_en:'', url:'https://www.google.com/maps/search/?api=1&query=Van+Gogh+Museum+Amsterdam' },
    { id:'ams-vondelpark',  lat:52.3579, lng:4.8686,  region:'nl', day:'11/05', type:'plan',   name:'Vondelpark',        name_en:'Vondelpark',              note:'公園',               note_en:'City park', url:'https://www.google.com/maps/search/?api=1&query=Vondelpark+Amsterdam' },
    { id:'ams-market',      lat:52.3640, lng:4.9005,  region:'nl', day:'11/05', type:'plan',   name:'Albert Cuypmarkt', name_en:'Albert Cuypmarkt',         note:'市集',               note_en:'Market', url:'https://www.google.com/maps/search/?api=1&query=Albert+Cuypmarkt+Amsterdam' },
    { id:'ams-windmill',    lat:52.4744, lng:4.8144,  region:'nl', day:'11/06', type:'plan',   name:'Zaanse Schans 風車村', name_en:'Zaanse Schans Windmills', note:'待確認',            note_en:'To be confirmed', url:'https://www.google.com/maps/search/?api=1&query=Zaanse+Schans' },
    { id:'ams-adam',        lat:52.3892, lng:4.9003,  region:'nl', day:'11/06', type:'plan',   name:'A\'DAM Lookout',   name_en:"A'DAM Lookout",            note:'全景觀景台',         note_en:'Panorama lookout', url:'https://www.google.com/maps/search/?api=1&query=A%27DAM+Lookout+Amsterdam' },
    // Amsterdam backup
    { id:'ams-giethoorn',   lat:52.7458, lng:6.0792,  region:'nl', day:null, type:'backup', name:'羊角村 Giethoorn',  name_en:'Giethoorn',                note:'水上村莊',           note_en:'Venice of the North', url:'https://www.google.com/maps/search/?api=1&query=Giethoorn' },
  ];

  /* ── City markers (accommodation stops) ── */
  var CITIES = [
    { id:'c-ams',    lat:52.3731, lng:4.8922,  name:'阿姆斯特丹', name_en:'Amsterdam',  region:'nl',        note:'10/24 出發 & 11/04 回程',   note_en:'Depart 10/24 & Return 11/04' },
    { id:'c-sto',    lat:59.3326, lng:18.0649, name:'斯德哥爾摩', name_en:'Stockholm',  region:'stockholm', note:'10/24–10/26 (2晚)',          note_en:'10/24–10/26 (2 nights)' },
    { id:'c-abi',    lat:68.3541, lng:18.8300, name:'阿比斯庫',   name_en:'Abisko',     region:'abisko',    note:'10/27–10/29 (2晚)',          note_en:'10/27–10/29 (2 nights)' },
    { id:'c-lof',    lat:68.2287, lng:14.5630, name:'羅浮敦',     name_en:'Lofoten',    region:'lofoten',   note:'10/29–11/02 (4晚)',          note_en:'10/29–11/02 (4 nights)' },
    { id:'c-tro',    lat:69.6492, lng:18.9553, name:'特羅姆瑟',   name_en:'Tromsø',     region:'tromso',    note:'11/02–11/04 (2晚)',          note_en:'11/02–11/04 (2 nights)' },
  ];

  /* ── Routes ── */
  var ROUTES = [
    { id:'r-fly1',  type:'fly',   coords:[[52.3080,4.7642],[59.6519,17.9186]], label:'KLM KL1219 AMS→ARN', label_en:'KLM KL1219 AMS→ARN',  color:'#7c5cd8', dash:'8,6' },
    { id:'r-train1',type:'train', coords:[[59.3326,18.0649],[66.1300,17.1300],[68.3541,18.8300]], label:'夜臥火車 STK→Abisko', label_en:'Night train STK→Abisko', color:'#3b82d4', dash:null },
    { id:'r-train2',type:'train', coords:[[68.3541,18.8300],[68.4384,17.4268]], label:'火車 Abisko→Narvik', label_en:'Train Abisko→Narvik', color:'#3b82d4', dash:null },
    { id:'r-bus1',  type:'bus',   coords:[[68.4384,17.4268],[68.4914,16.6798]], label:'200號巴士 Narvik→EVE', label_en:'Bus 200 Narvik→EVE', color:'#d97706', dash:'6,5' },
    { id:'r-drive1',type:'drive', coords:[[68.4914,16.6798],[68.2342,14.5674],[68.0627,13.3238],[67.9261,13.0786],[68.1533,14.1993],[68.4914,16.6798]], label:'自駕 EVE↔羅浮敦', label_en:'Self-drive EVE↔Lofoten', color:'#16a34a', dash:null },
    { id:'r-fly2',  type:'fly',   coords:[[68.4914,16.6798],[69.6830,18.9094]], label:'Widerøe EVE→TOS', label_en:'Widerøe EVE→TOS', color:'#7c5cd8', dash:'8,6' },
    { id:'r-fly3',  type:'fly',   coords:[[69.6830,18.9094],[59.9127,10.7461],[52.3080,4.7642]], label:'KLM TOS→OSL→AMS', label_en:'KLM TOS→OSL→AMS', color:'#7c5cd8', dash:'8,6' },
  ];

  /* ── Region bounds ── */
  var BOUNDS = {
    all:       [[47,0],[71,25]],
    nl:        [[51.5,3.8],[53.8,7.5]],
    stockholm: [[59.0,17.5],[59.7,18.7]],
    abisko:    [[67.8,17.5],[68.8,20.0]],
    narvik:    [[68.1,16.0],[68.7,18.0]],
    lofoten:   [[67.5,12.5],[68.6,15.5]],
    tromso:    [[69.3,18.0],[70.0,20.0]],
  };

  /* ─────────────────────────────────────────
     MAP INIT
  ───────────────────────────────────────── */
  var map = L.map('map', { zoomControl: true, scrollWheelZoom: true }).fitBounds(BOUNDS.all);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri',
    maxZoom: 18
  }).addTo(map);

  /* ── Icon factories ── */
  function planIcon(label) {
    return L.divIcon({ className:'', iconAnchor:[8,8], popupAnchor:[0,-10],
      html:'<div style="width:16px;height:16px;background:#3b82d4;border:2px solid #fff;border-radius:50%;box-shadow:0 0 0 1.5px #3b82d4;"></div>'
    });
  }
  function backupIcon() {
    return L.divIcon({ className:'', iconAnchor:[8,8], popupAnchor:[0,-10],
      html:'<div style="width:14px;height:14px;background:#fff;border:2.5px dashed #9ca3af;border-radius:50%;"></div>'
    });
  }
  function cityIcon() {
    return L.divIcon({ className:'', iconAnchor:[8,8], popupAnchor:[0,-12],
      html:'<div style="width:16px;height:16px;background:#e05c3a;border:2px solid #fff;border-radius:50%;box-shadow:0 0 0 1.5px #e05c3a;"></div>'
    });
  }

  /* ── Layer groups ── */
  var lgRoute  = L.layerGroup().addTo(map);
  var lgPlan   = L.layerGroup().addTo(map);
  var lgBackup = L.layerGroup().addTo(map);
  var lgCity   = L.layerGroup().addTo(map);

  /* ── Info panel ── */
  var infoPanel = document.getElementById('info-panel');
  function showInfo(html) { if (infoPanel) infoPanel.innerHTML = html; }
  function defaultInfo() {
    showInfo('<h3>' + t('map_click_title') + '</h3><p>' + t('map_click_desc') + '</p>');
  }

  /* ── Draw routes ── */
  function drawRoutes() {
    lgRoute.clearLayers();
    ROUTES.forEach(function(r) {
      var opts = { color: r.color, weight: 3, opacity: 0.85 };
      if (r.dash) opts.dashArray = r.dash;
      var line = L.polyline(r.coords, opts).addTo(lgRoute);
      var lbl = (window.I18N && window.I18N.lang === 'en') ? (r.label_en || r.label) : r.label;
      line.on('click', function() { showInfo('<h3>' + lbl + '</h3><p style="color:#57606a;font-size:12px">' + t('route_click') + '</p>'); });
    });
  }

  /* ── Draw city labels ── */
  function drawCities() {
    lgCity.clearLayers();
    CITIES.forEach(function(c) {
      var nm   = (window.I18N && window.I18N.lang === 'en') ? (c.name_en || c.name) : c.name;
      var note = (window.I18N && window.I18N.lang === 'en') ? (c.note_en || c.note) : c.note;
      var marker = L.marker([c.lat, c.lng], { icon: cityIcon(), title: nm }).addTo(lgCity);
      var label = L.marker([c.lat + 0.018, c.lng], { icon: L.divIcon({
        className:'city-label', iconAnchor:[-2,10],
        html: '<span style="background:rgba(255,255,255,0.9);padding:1px 5px;border-radius:3px;font-size:11px;font-weight:700;color:#1f2328;white-space:nowrap">' + nm + '</span>'
      })}).addTo(lgCity);
      marker.on('click', function() {
        showInfo('<h3>' + nm + '</h3><p style="color:#57606a;font-size:12px">' + note + '</p>');
      });
    });
  }

  /* ── Draw spots ── */
  var allSpotMarkers = [];
  function drawSpots() {
    lgPlan.clearLayers();
    lgBackup.clearLayers();
    allSpotMarkers = [];
    SPOTS.forEach(function(s) {
      var nm   = (window.I18N && window.I18N.lang === 'en') ? (s.name_en || s.name) : s.name;
      var note = (window.I18N && window.I18N.lang === 'en') ? (s.note_en || s.note) : s.note;
      var icon  = s.type === 'plan' ? planIcon() : backupIcon();
      var group = s.type === 'plan' ? lgPlan : lgBackup;
      var marker = L.marker([s.lat, s.lng], { icon: icon, title: nm, spotData: s }).addTo(group);
      var mapLink = s.url ? ('<br><a href="' + s.url + '" target="_blank" rel="noopener noreferrer" style="font-size:11px;color:#3b82d4">📍 Google Maps</a>') : '';
      var dayLabel = s.day ? ('<span style="font-size:11px;color:#57606a">' + (window.I18N && window.I18N.lang === 'en' ? 'Day: ' : '日期：') + s.day + '</span><br>') : '';
      var backBadge = s.type === 'backup' ? ('<span style="font-size:10px;background:#e5e7eb;color:#57606a;padding:1px 5px;border-radius:3px;margin-bottom:3px;display:inline-block">' + t('backup') + '</span><br>') : '';
      marker.on('click', function() {
        showInfo('<h3>' + nm + '</h3>' + backBadge + dayLabel + '<p style="color:#57606a;font-size:12px">' + (note || '') + '</p>' + mapLink);
      });
      allSpotMarkers.push(marker);
    });
  }

  /* ── Initial draw ── */
  drawRoutes();
  drawCities();
  drawSpots();
  defaultInfo();

  /* ─────────────────────────────────────────
     DAY SELECTOR
  ───────────────────────────────────────── */
  var daySel = document.getElementById('day-sel');
  if (daySel) {
    var days = [];
    SPOTS.forEach(function(s) { if (s.day && days.indexOf(s.day) === -1) days.push(s.day); });
    days.sort();
    var optAll = document.createElement('option');
    optAll.value = 'all';
    optAll.textContent = t('all_days');
    daySel.appendChild(optAll);
    days.forEach(function(d) {
      var o = document.createElement('option');
      o.value = d; o.textContent = d;
      daySel.appendChild(o);
    });
    daySel.addEventListener('change', applyFilters);
  }

  /* ─────────────────────────────────────────
     LAYER TOGGLE BUTTONS
  ───────────────────────────────────────── */
  var layerState = { route: true, plan: true, backup: true };

  document.querySelectorAll('#layer-bar .toggle-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var layer = btn.dataset.layer;
      if (!layer) return;
      layerState[layer] = !layerState[layer];
      btn.classList.toggle('active', layerState[layer]);
      applyFilters();
    });
  });

  /* ─────────────────────────────────────────
     REGION BUTTONS
  ───────────────────────────────────────── */
  document.querySelectorAll('#region-bar .toggle-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#region-bar .toggle-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var region = btn.dataset.region;
      if (BOUNDS[region]) map.fitBounds(BOUNDS[region], { animate: true, duration: 0.5 });
    });
  });

  /* ─────────────────────────────────────────
     APPLY FILTERS (layer visibility + day filter)
  ───────────────────────────────────────── */
  function applyFilters() {
    var selDay = daySel ? daySel.value : 'all';

    if (layerState.route) { if (!map.hasLayer(lgRoute)) lgRoute.addTo(map); }
    else { if (map.hasLayer(lgRoute)) map.removeLayer(lgRoute); }

    if (layerState.plan) { if (!map.hasLayer(lgPlan)) lgPlan.addTo(map); }
    else { if (map.hasLayer(lgPlan)) map.removeLayer(lgPlan); }

    if (layerState.backup) { if (!map.hasLayer(lgBackup)) lgBackup.addTo(map); }
    else { if (map.hasLayer(lgBackup)) map.removeLayer(lgBackup); }

    // Day filter: hide/show individual plan markers
    if (layerState.plan) {
      lgPlan.eachLayer(function(marker) {
        var sd = marker.options.spotData;
        if (!sd) return;
        var visible = (selDay === 'all' || sd.day === selDay);
        if (visible) {
          if (!map.hasLayer(marker)) lgPlan.addLayer(marker);
          marker.setOpacity(1);
        } else {
          marker.setOpacity(0.12);
        }
      });
    }
  }

  /* ─────────────────────────────────────────
     LANGUAGE REFRESH – called by i18n.js
  ───────────────────────────────────────── */
  window.MAP_REFRESH_LANG = function() {
    drawRoutes();
    drawCities();
    drawSpots();
    defaultInfo();
    // re-populate day selector label
    if (daySel && daySel.options[0]) {
      daySel.options[0].textContent = t('all_days');
    }
    applyFilters();
  };

})();
