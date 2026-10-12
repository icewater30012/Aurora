// Created: 2026-10-10 20:45:10 +0800
// i18n.js – Chinese / English language switch
// Loaded BEFORE Leaflet and map.js

(function () {
  var ZH = {
    lang: 'zh',
    // page titles
    page_map_title: '北歐路線方案比較',
    page_map_subtitle: '出發：2026/10/24 AMS→ARN　｜　回程：2026/11/07 離阿姆斯特丹　｜　歐洲在地 14 天',
    page_details_title: '各國細節：每日行程與備用清單',

    // nav
    nav_to_details: '📋 各國細節：每日行程與備用清單 →',
    nav_to_map: '← 回到路線與交通總表',

    // map
    map_section_header: '互動地圖　— 切換圖層、選區域或日期，點擊標記看說明',
    all_days: '全部日期',
    btn_route: '路線',
    btn_plan: '預設行程景點',
    btn_backup: '備用景點',
    region_all: '全覽',
    region_nl: '荷蘭',
    region_stockholm: '斯德哥爾摩',
    region_abisko: '阿比斯庫',
    region_narvik: 'Narvik／Evenes',
    region_lofoten: '羅浮敦',
    region_tromso: '特羅姆瑟',
    map_click_title: '點擊說明',
    map_click_desc: '點地圖上的城市、景點或路線，這裡會顯示詳細說明。路線依實際道路繪製（火車為示意），景點座標來自 OpenStreetMap，標「概估」的位置請以 Google Maps 為準。',
    route_click: '點擊路線標記可看交通方式說明。',
    backup: '備用',

    // legend
    leg_fly: '飛機',
    leg_train: '火車',
    leg_bus: '巴士',
    leg_drive: '自駕',
    leg_plan: '預設行程',
    leg_backup: '備用清單',
    leg_city: '住宿城市',

    // table
    tbl_title: '行程總覽表',
    tbl_stop: '站點',
    tbl_stay: '住宿',
    tbl_transport: '交通工具',
    tbl_time: '時間',
    tbl_platform: '訂票平台',
    tbl_cost: '費用',

    // details tabs
    tab_se: '🇸🇪 瑞典',
    tab_no: '🇳🇴 挪威',
    tab_nl: '🇳🇱 荷蘭',
    hint_drag: '卡牌可以拖曳：換天、改順序，或在「每日行程」與「備用清單」之間移動。變更會自動存在這個瀏覽器裡。',
    hint_nl: '住朋友家，之後有荷蘭地陪。這裡只是簡單的預設安排，之後可以隨時拖曳調整。',
    backup_title: '💤 備用清單',
    backup_hint: '沒排進哪一天，想去時再挑',
    reset_btn: '↺ 還原預設',
    add_btn: '＋ 新增項目',
    filter_all: '全部',
    confirm_reset: '要清除你拖曳與新增的所有變更，還原成預設行程嗎？',

    // footer
    footer: '底圖 © Esri　｜　路線與景點座標 © OpenStreetMap contributors　｜　Made with IBM Bob',

    // lang toggle
    lang_toggle: 'EN',
    lang_toggle_title: 'Switch to English',
  };

  var EN = {
    lang: 'en',
    page_map_title: 'Nordic Route Comparison',
    page_map_subtitle: 'Depart: 2026/10/24 AMS→ARN  |  Return: 2026/11/07 from Amsterdam  |  14 days in Europe',
    page_details_title: 'Country Details: Daily Schedule & Backup List',

    nav_to_details: '📋 Daily Schedule & Backup List →',
    nav_to_map: '← Back to Route & Transport Overview',

    map_section_header: 'Interactive Map — toggle layers, select region or date, click markers for details',
    all_days: 'All days',
    btn_route: 'Route',
    btn_plan: 'Default Spots',
    btn_backup: 'Backup Spots',
    region_all: 'Overview',
    region_nl: 'Netherlands',
    region_stockholm: 'Stockholm',
    region_abisko: 'Abisko',
    region_narvik: 'Narvik / Evenes',
    region_lofoten: 'Lofoten',
    region_tromso: 'Tromsø',
    map_click_title: 'Click a marker',
    map_click_desc: 'Click a city, spot, or route line to see details here. Routes are illustrative (trains may be approximate). Coordinates from OpenStreetMap — use Google Maps for precise navigation.',
    route_click: 'Click a route line for transport details.',
    backup: 'Backup',

    leg_fly: 'Flight',
    leg_train: 'Train',
    leg_bus: 'Bus',
    leg_drive: 'Self-drive',
    leg_plan: 'Default schedule',
    leg_backup: 'Backup list',
    leg_city: 'Accommodation city',

    tbl_title: 'Itinerary Overview',
    tbl_stop: 'Stop',
    tbl_stay: 'Accommodation',
    tbl_transport: 'Transport',
    tbl_time: 'Time',
    tbl_platform: 'Booking',
    tbl_cost: 'Cost',

    tab_se: '🇸🇪 Sweden',
    tab_no: '🇳🇴 Norway',
    tab_nl: '🇳🇱 Netherlands',
    hint_drag: 'Drag cards: change day, reorder, or move between Daily Schedule and Backup List. Changes are saved in this browser.',
    hint_nl: 'Staying with a local friend — a Dutch guide will join later. This is a simple default plan; feel free to drag and adjust.',
    backup_title: '💤 Backup List',
    backup_hint: 'Not yet scheduled — pick when ready',
    reset_btn: '↺ Reset to default',
    add_btn: '＋ Add item',
    filter_all: 'All',
    confirm_reset: 'Clear all drag-and-drop changes and reset to the default schedule?',

    footer: 'Basemap © Esri  |  Routes & coordinates © OpenStreetMap contributors  |  Made with IBM Bob',

    lang_toggle: '中文',
    lang_toggle_title: '切換為中文',
  };

  /* Active locale — default Chinese */
  window.I18N = ZH;

  /* ── Apply translations to static DOM ── */
  function applyDOM() {
    var L = window.I18N;
    /* Generic data-i18n attributes */
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (L[key] !== undefined) el.textContent = L[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-html');
      if (L[key] !== undefined) el.innerHTML = L[key];
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-title');
      if (L[key] !== undefined) el.setAttribute('title', L[key]);
    });
    /* html lang attribute */
    document.documentElement.lang = L.lang === 'en' ? 'en' : 'zh-TW';
    /* document title */
    if (document.querySelector('[data-page-title]')) {
      var k = document.querySelector('[data-page-title]').getAttribute('data-page-title');
      if (L[k]) document.title = L[k];
    }
    /* Lang toggle button text */
    var tb = document.getElementById('lang-toggle');
    if (tb) { tb.textContent = L.lang_toggle; tb.title = L.lang_toggle_title; }
  }

  /* ── Toggle ── */
  function toggle() {
    window.I18N = (window.I18N.lang === 'zh') ? EN : ZH;
    applyDOM();
    /* Notify map.js if loaded */
    if (typeof window.MAP_REFRESH_LANG === 'function') window.MAP_REFRESH_LANG();
    /* Notify details.js if loaded */
    if (typeof window.DETAILS_REFRESH_LANG === 'function') window.DETAILS_REFRESH_LANG();
  }

  /* ── Inject toggle button after DOM ready ── */
  function injectButton() {
    if (document.getElementById('lang-toggle')) return;
    var btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.type = 'button';
    btn.textContent = ZH.lang_toggle;
    btn.title = ZH.lang_toggle_title;
    btn.style.cssText = [
      'position:fixed', 'top:12px', 'right:14px', 'z-index:9999',
      'padding:5px 14px', 'border-radius:999px',
      'border:1.5px solid #3b82d4', 'background:#fff', 'color:#3b82d4',
      'font-size:13px', 'font-weight:700', 'cursor:pointer',
      'box-shadow:0 1px 6px rgba(0,0,0,.14)', 'transition:background .15s'
    ].join(';');
    btn.addEventListener('mouseenter', function() { btn.style.background = '#eff6ff'; });
    btn.addEventListener('mouseleave', function() { btn.style.background = '#fff'; });
    btn.addEventListener('click', toggle);
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { injectButton(); applyDOM(); });
  } else {
    injectButton();
    applyDOM();
  }

  /* expose for external use */
  window.I18N_TOGGLE = toggle;
  window.I18N_APPLY  = applyDOM;
})();
