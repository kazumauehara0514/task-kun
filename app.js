// ============================================
// タスクくん — App Logic
// ============================================

const DEFAULT_CATS = { work: '仕事', personal: 'プライベート', uncategorized: '未分類' };
const CAT_COLORS = ['#2563EB','#DB2777','#A8A49C','#059669','#D97706','#7C3AED','#DC2626','#0891B2','#4F46E5','#EA580C'];
let CAT = { ...DEFAULT_CATS };
const PRI = { high: '高', mid: '中', low: '低' };
const STATUS = { todo: '未着手', wip: '進行中', done: '完了' };
let FTITLES = { all: 'すべてのタスク', done: '完了済みタスク', wip: '進行中タスク', todo: '未着手タスク' };

function loadCategories() {
  const custom = JSON.parse(localStorage.getItem('tkun_cats') || '[]');
  CAT = { ...DEFAULT_CATS };
  custom.forEach(c => { CAT[c.key] = c.label; });
  FTITLES = { all: 'すべてのタスク', done: '完了済みタスク' };
  Object.keys(CAT).forEach(k => { FTITLES[k] = CAT[k]; });
}
function saveCategories() {
  const custom = Object.keys(CAT)
    .filter(k => !(k in DEFAULT_CATS))
    .map(k => ({ key: k, label: CAT[k] }));
  localStorage.setItem('tkun_cats', JSON.stringify(custom));
}
function addCategory(label) {
  const key = 'cat_' + Date.now().toString(36);
  CAT[key] = label;
  FTITLES[key] = label;
  saveCategories();
  return key;
}
function getCatColor(key) {
  const keys = Object.keys(CAT);
  const idx = keys.indexOf(key);
  return CAT_COLORS[idx % CAT_COLORS.length] || CAT_COLORS[0];
}
const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const DAYS = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];

// ── Notion Seed ──
const SEED=[
  {id:'n1',title:'【Bellissima Japan】マニュアル作成',category:'work',priority:'high',due:'2026-03-15',status:'todo',subtasks:[],createdAt:1741824e6,updatedAt:1741824e6},
  {id:'n2',title:'『UTAGEまかせる君』のオウンドメディア構築',category:'work',priority:'high',due:'2026-03-15',status:'todo',subtasks:[],createdAt:1741823e6,updatedAt:1741823e6},
  {id:'n3',title:'【CXO・カタリスタ】マニュアル作成（リニューアル）',category:'work',priority:'mid',due:'2026-03-20',status:'todo',subtasks:[],createdAt:1741822e6,updatedAt:1741822e6},
  {id:'n4',title:'自分用ToDo管理アプリを作る',category:'personal',priority:'mid',due:'2026-03-31',status:'todo',subtasks:[],createdAt:1741821e6,updatedAt:1741821e6},
  {id:'n5',title:'Notionからの引越し',category:'personal',priority:'mid',due:'2026-03-31',status:'todo',subtasks:[],createdAt:1741820e6,updatedAt:1741820e6},
  {id:'n6',title:'インボイス登録',category:'work',priority:'mid',due:'2026-03-20',status:'todo',subtasks:[],createdAt:1741819e6,updatedAt:1741819e6},
  {id:'n7',title:'ベリッシマmuj次回の申し込みフロー',category:'work',priority:'low',due:'2026-03-31',status:'todo',subtasks:[],createdAt:1741818e6,updatedAt:1741818e6},
  {id:'n8',title:'【タスク】OG用フォーム回答のスプレッドシート連携整備',category:'work',priority:'high',due:'2026-03-13',status:'done',subtasks:[],createdAt:1741729e6,updatedAt:1741729e6},
  {id:'n9',title:'【Bellissima Japan】招待状形式LPの作成',category:'work',priority:'mid',due:'2026-03-16',status:'done',subtasks:[],createdAt:1741728e6,updatedAt:1741728e6},
  {id:'n10',title:'【Bellissima Japan】東京大会無料招待の回答フォーム作成',category:'work',priority:'mid',due:'2026-03-11',status:'done',subtasks:[],createdAt:1741727e6,updatedAt:1741727e6},
  {id:'n11',title:'ミスターインターナショナル 対応',category:'work',priority:'high',due:'2026-03-06',status:'done',subtasks:[],createdAt:1741726e6,updatedAt:1741726e6},
  {id:'n12',title:'藤原さんに返信 (LPのFV改善)',category:'work',priority:'high',due:'2026-03-08',status:'done',subtasks:[],createdAt:1741725e6,updatedAt:1741725e6},
  {id:'n13',title:'小田切さんの対応',category:'work',priority:'high',due:'2026-03-08',status:'done',subtasks:[],createdAt:1741724e6,updatedAt:1741724e6},
  {id:'n14',title:'比嘉さんをBRCスタンダードクラスから配信解除する',category:'work',priority:'high',due:'2026-03-04',status:'done',subtasks:[],createdAt:1741723e6,updatedAt:1741723e6},
  {id:'n15',title:'柳さんの納品物確認 (Notion)',category:'work',priority:'mid',due:'2026-03-05',status:'done',subtasks:[],createdAt:1741722e6,updatedAt:1741722e6},
  {id:'n16',title:'Area-Oneに返信 (内容の確認とお見積もり提出)',category:'work',priority:'mid',due:'2026-03-01',status:'done',subtasks:[],createdAt:1741721e6,updatedAt:1741721e6},
  {id:'n17',title:'柳さんに報酬振込予約をする (振込予定日: 3/6)',category:'work',priority:'mid',due:'2026-03-03',status:'done',subtasks:[],createdAt:1741720e6,updatedAt:1741720e6},
  {id:'n18',title:'プレダイに入会希望者の紹介する',category:'work',priority:'low',due:'2026-03-08',status:'done',subtasks:[],createdAt:1741719e6,updatedAt:1741719e6},
  {id:'n19',title:'2025年分確定申告',category:'personal',priority:'high',due:'2026-03-10',status:'done',subtasks:[],createdAt:1741718e6,updatedAt:1741718e6},
  {id:'n20',title:'秦さんに返信 (オリエン内容の確認とお見積もり提出)',category:'work',priority:'mid',due:'2026-02-28',status:'done',subtasks:[],createdAt:1741717e6,updatedAt:1741717e6},
  {id:'n21',title:'斉藤さんに返事',category:'work',priority:'high',due:'2026-02-06',status:'done',subtasks:[],createdAt:1741716e6,updatedAt:1741716e6},
  {id:'n22',title:'【カタリスタ】西田さまのメールアドレスの差し替え',category:'work',priority:'mid',due:'2026-02-16',status:'done',subtasks:[],createdAt:1741715e6,updatedAt:1741715e6},
  {id:'n23',title:'鎌鹿さんとNDA結ぶ',category:'work',priority:'mid',due:'2026-01-22',status:'done',subtasks:[],createdAt:1741714e6,updatedAt:1741714e6},
  {id:'n24',title:'1月の給与&外注費の計算をして、振込予約をする',category:'work',priority:'high',due:'2026-01-20',status:'done',subtasks:[],createdAt:1741713e6,updatedAt:1741713e6},
  {id:'n25',title:'Area-One 情報共有 (2025/01/08)',category:'work',priority:'mid',due:'2026-01-08',status:'done',subtasks:[],createdAt:1741712e6,updatedAt:1741712e6},
];

// ── State ──
let tasks = [];
let filter = 'all';
let showDone = false; // kept for compat
let supabaseClient = null;
let openStatusMenu = null; // id of task with open status menu

// ── Helpers ──
function uid() { return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2); }
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fmtDate(d) { const dt = new Date(d+'T00:00:00'); return `${dt.getMonth()+1}/${dt.getDate()}`; }
function fmtDateFull(d) { const dt = new Date(d+'T00:00:00'); return `${dt.getFullYear()}/${dt.getMonth()+1}/${dt.getDate()}`; }

function dueDot(due) {
  if (!due) return 'dd-none';
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(due+'T00:00:00');
  const diff = Math.round((d - today) / 864e5);
  if (diff < 0) return 'dd-overdue';
  if (diff === 0) return 'dd-today';
  if (diff <= 3) return 'dd-soon';
  return 'dd-later';
}
function dueText(due) {
  if (!due) return '';
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(due+'T00:00:00');
  const diff = Math.round((d - today) / 864e5);
  if (diff < 0) return '期限切れ';
  if (diff === 0) return '今日';
  if (diff === 1) return '明日';
  if (diff <= 3) return '近日中';
  return fmtDate(due);
}

function dateHeader() {
  const n = new Date();
  return `${MONTHS[n.getMonth()]} ${n.getDate()}, ${n.getFullYear()} · ${DAYS[n.getDay()]}`;
}

// Migrate old done:boolean to status field
function migrateStatus(t) {
  if (!t.status) {
    t.status = t.done ? 'done' : 'todo';
  }
  // keep done in sync for backward compat with sync
  t.done = t.status === 'done';
}

// ── Storage ──
function load() {
  loadCategories();
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  if (!localStorage.getItem('seed_v4')) {
    const ids = new Set(tasks.map(t => t.id));
    SEED.forEach(t => { if (!ids.has(t.id)) tasks.push(t); });
    save(); localStorage.setItem('seed_v4', '1');
  }
  tasks.forEach(t => {
    if (!t.updatedAt) t.updatedAt = t.createdAt || Date.now();
    migrateStatus(t);
  });
  save();
}
function save() { localStorage.setItem('tasks', JSON.stringify(tasks)); }
function getSyncCfg() { return JSON.parse(localStorage.getItem('tkun_sync') || 'null'); }
function setSyncCfg(c) { localStorage.setItem('tkun_sync', JSON.stringify(c)); }

// ── Task Ops ──
function addTask(d) {
  const t = { id:uid(), title:d.title, category:d.category||'uncategorized', priority:d.priority||'mid', due:d.due||null, status:'todo', done:false, description:'', tags:[], subtasks:[], createdAt:Date.now(), updatedAt:Date.now() };
  tasks.unshift(t); save(); syncPush(t); render();
}
function setStatus(id, status) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.status = status;
  t.done = status === 'done';
  t.updatedAt = Date.now();
  save(); syncPush(t); render();
}
function deleteTask(id) { tasks=tasks.filter(t=>t.id!==id); save(); syncDel(id); render(); closeDetail(); }
function updateTask(id, updates) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  Object.assign(t, updates);
  if ('status' in updates) t.done = updates.status === 'done';
  t.updatedAt = Date.now();
  save(); syncPush(t); render();
}
function addSub(tid, title) { const t=tasks.find(x=>x.id===tid); if(!t)return; t.subtasks.push({id:uid(),title,done:false}); t.updatedAt=Date.now(); save(); syncPush(t); render(); }
function toggleSub(tid,sid) { const t=tasks.find(x=>x.id===tid); if(!t)return; const s=t.subtasks.find(x=>x.id===sid); if(s)s.done=!s.done; t.updatedAt=Date.now(); save(); syncPush(t); render(); }
function delSub(tid,sid) { const t=tasks.find(x=>x.id===tid); if(!t)return; t.subtasks=t.subtasks.filter(s=>s.id!==sid); t.updatedAt=Date.now(); save(); syncPush(t); render(); }

// ── Status Menu ──
function showStatusMenu(id, evt) {
  evt.stopPropagation();
  closeStatusMenu();
  openStatusMenu = id;
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  const btn = evt.currentTarget;
  const rect = btn.getBoundingClientRect();
  const menu = document.createElement('div');
  menu.className = 'status-menu';
  menu.id = 'status-menu';
  menu.innerHTML = ['todo','wip','done'].map(s =>
    `<button class="sm-opt ${t.status===s?'active':''}" data-status="${s}">
      <span class="sm-icon sm-${s}"></span>${STATUS[s]}
    </button>`
  ).join('');
  document.body.appendChild(menu);
  // Position
  const mw = 140, mh = menu.offsetHeight || 110;
  let left = rect.left + rect.width / 2 - mw / 2;
  let top = rect.bottom + 6;
  if (left < 8) left = 8;
  if (left + mw > window.innerWidth - 8) left = window.innerWidth - mw - 8;
  if (top + mh > window.innerHeight - 8) top = rect.top - mh - 6;
  menu.style.left = left + 'px';
  menu.style.top = top + 'px';
  menu.querySelectorAll('.sm-opt').forEach(b => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      setStatus(id, b.dataset.status);
      closeStatusMenu();
    });
  });
  setTimeout(() => document.addEventListener('click', closeStatusMenu, { once: true }), 10);
}
function closeStatusMenu() {
  const m = document.getElementById('status-menu');
  if (m) m.remove();
  openStatusMenu = null;
}

// ── Task Detail ──
function openDetail(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  const dd = dueDot(t.due);
  const panel = document.getElementById('detail-panel');
  const bg = document.getElementById('detail-bg');

  panel.innerHTML = `
    <div class="det-header">
      <button class="det-back" id="det-close">← 戻る</button>
    </div>
    <div class="det-body">
      <div class="det-status-row">
        <span class="sm-icon sm-${t.status}"></span>
        <select class="det-sel" id="det-status">
          <option value="todo" ${t.status==='todo'?'selected':''}>未着手</option>
          <option value="wip" ${t.status==='wip'?'selected':''}>進行中</option>
          <option value="done" ${t.status==='done'?'selected':''}>完了</option>
        </select>
      </div>
      <input class="det-title-input" type="text" id="det-title-inp" value="${esc(t.title)}">
      <div class="det-props">
        <div class="det-prop">
          <span class="det-label">カテゴリー</span>
          <select class="det-sel" id="det-cat">
            ${Object.keys(CAT).map(k => `<option value="${k}" ${t.category===k?'selected':''}>${esc(CAT[k])}</option>`).join('')}
          </select>
        </div>
        <div class="det-prop">
          <span class="det-label">優先度</span>
          <select class="det-sel" id="det-pri">
            <option value="high" ${t.priority==='high'?'selected':''}>高</option>
            <option value="mid" ${t.priority==='mid'?'selected':''}>中</option>
            <option value="low" ${t.priority==='low'?'selected':''}>低</option>
          </select>
        </div>
        <div class="det-prop">
          <span class="det-label">期限</span>
          <input class="det-date" type="date" id="det-due" value="${t.due||''}">
        </div>
      </div>
      <div class="det-divider"></div>
      <div class="det-desc-section">
        <div class="det-label">詳細</div>
        <textarea class="det-desc" id="det-desc" rows="3" placeholder="メモや詳細を入力...">${esc(t.description||'')}</textarea>
      </div>
      <div class="det-divider"></div>
      <div class="det-tag-section">
        <div class="det-label">タグ</div>
        <div class="det-tags" id="det-tags">
          ${(t.tags||[]).map(tag => `<span class="tag-chip">${esc(tag)}<button class="tag-rm" data-tag="${esc(tag)}">&times;</button></span>`).join('')}
        </div>
        <div class="tag-add-row">
          <input class="tag-inp" type="text" id="det-tag-inp" placeholder="タグを入力してEnter...">
        </div>
      </div>
      <div class="det-divider"></div>
      <button class="det-delete" id="det-del-btn">このタスクを削除</button>
    </div>
  `;

  panel.classList.add('vis');
  bg.classList.add('vis');

  document.getElementById('det-close').addEventListener('click', () => { saveDetailEdits(t.id); closeDetail(); });
  bg.addEventListener('click', () => { saveDetailEdits(t.id); closeDetail(); });
  document.getElementById('det-status').addEventListener('change', (e) => {
    setStatus(t.id, e.target.value);
    openDetail(t.id);
  });
  document.getElementById('det-cat').addEventListener('change', () => saveDetailEdits(t.id));
  document.getElementById('det-pri').addEventListener('change', () => saveDetailEdits(t.id));
  document.getElementById('det-due').addEventListener('change', () => saveDetailEdits(t.id));
  // Tag add
  document.getElementById('det-tag-inp').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const val = e.target.value.trim();
    if (!val) return;
    if (!t.tags) t.tags = [];
    if (!t.tags.includes(val)) {
      t.tags.push(val);
      t.updatedAt = Date.now();
      save(); syncPush(t); render();
      openDetail(t.id);
    }
    e.target.value = '';
  });
  // Tag remove
  document.querySelectorAll('.tag-rm').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const tag = btn.dataset.tag;
      t.tags = (t.tags||[]).filter(x => x !== tag);
      t.updatedAt = Date.now();
      save(); syncPush(t); render();
      openDetail(t.id);
    });
  });
  document.getElementById('det-del-btn').addEventListener('click', () => {
    if (confirm('「' + t.title + '」を削除しますか？')) deleteTask(t.id);
  });
}
function saveDetailEdits(id) {
  const titleInp = document.getElementById('det-title-inp');
  const catSel = document.getElementById('det-cat');
  const priSel = document.getElementById('det-pri');
  const dueInp = document.getElementById('det-due');
  const descInp = document.getElementById('det-desc');
  if (!titleInp) return;
  const updates = {};
  const newTitle = titleInp.value.trim();
  if (newTitle) updates.title = newTitle;
  updates.category = catSel.value;
  updates.priority = priSel.value;
  updates.due = dueInp.value || null;
  updates.description = descInp.value;
  updateTask(id, updates);
}
function closeDetail() {
  document.getElementById('detail-panel').classList.remove('vis');
  document.getElementById('detail-bg').classList.remove('vis');
}
function doAddSubDetail(tid) {
  const inp = document.getElementById('det-sub-inp');
  if (!inp || !inp.value.trim()) return;
  addSub(tid, inp.value.trim());
  openDetail(tid);
}

// ── Render ──
function getCounts() {
  const active = tasks.filter(t => t.status !== 'done');
  const done = tasks.filter(t => t.status === 'done');
  const wip = tasks.filter(t => t.status === 'wip');
  const counts = {
    all: active.length,
    done: done.length,
    wip: wip.length,
    total: tasks.length
  };
  Object.keys(CAT).forEach(k => {
    counts[k] = active.filter(t => t.category === k).length;
  });
  return counts;
}

function render() {
  const c = getCounts();
  const ds = dateHeader();

  // Desktop nav
  const nd = document.getElementById('nav-date'); if(nd) nd.textContent = ds;
  const ns = document.getElementById('nav-stats');
  if(ns) {
    ns.innerHTML = `<button class="nstat ns-all ${filter==='all'?'nstat-active':''}" data-filter="all"><div class="nstat-dot"></div>${c.total} すべて</button><button class="nstat ns-wip ${filter==='wip'?'nstat-active':''}" data-filter="wip"><div class="nstat-dot"></div>${c.wip} 進行中</button><button class="nstat ns-todo ${filter==='todo'?'nstat-active':''}" data-filter="todo"><div class="nstat-dot"></div>${c.all - c.wip} 未着手</button>`;
    ns.querySelectorAll('.nstat').forEach(b => b.addEventListener('click', () => { filter = b.dataset.filter; render(); }));
  }

  // Mobile header
  const md = document.getElementById('mob-date'); if(md) md.textContent = ds;
  const mf = document.getElementById('mob-frac'); if(mf) mf.textContent = `${c.done}/${c.total}`;
  const ms = document.getElementById('mob-stats');
  if(ms) {
    ms.innerHTML = `<button class="stat-pill sp-all ${filter==='all'?'sp-active':''}" data-filter="all"><div class="stat-dot"></div>${c.total} すべて</button><button class="stat-pill sp-wip ${filter==='wip'?'sp-active':''}" data-filter="wip"><div class="stat-dot"></div>${c.wip} 進行中</button><button class="stat-pill sp-todo ${filter==='todo'?'sp-active':''}" data-filter="todo"><div class="stat-dot"></div>${c.all - c.wip} 未着手</button>`;
    ms.querySelectorAll('.stat-pill').forEach(b => b.addEventListener('click', () => { filter = b.dataset.filter; render(); }));
  }

  // Cat tabs (mobile)
  renderCatTabs(c);

  // Sidebar (desktop)
  renderSidebar(c);

  // Toolbar
  const tt = document.getElementById('tb-title'); if(tt) tt.textContent = FTITLES[filter]||'すべて';
  const tdb = document.getElementById('tb-done-toggle');
  if(tdb) tdb.style.display = 'none';

  // Update category selects in add forms
  const catOpts = Object.keys(CAT).map(k => `<option value="${k}">${esc(CAT[k])}</option>`).join('');
  const mobCat = document.getElementById('mob-cat'); if(mobCat) mobCat.innerHTML = catOpts;
  const dfCat = document.getElementById('df-cat'); if(dfCat) dfCat.innerHTML = catOpts;

  // Task list
  renderTasks(c);
}

function renderCatTabs(c) {
  const el = document.getElementById('cat-tabs');
  if (!el) return;
  const tabs = [
    { key:'all', label:'すべて' },
    ...Object.keys(CAT).map(k => ({ key: k, label: CAT[k] })),
    { key:'done', label:'完了済み' },
  ];
  el.innerHTML = tabs.map(t =>
    `<button class="ctab ${filter===t.key ? 'active-'+t.key : ''}" data-filter="${t.key}">${t.label}</button>`
  ).join('');
  el.querySelectorAll('.ctab').forEach(b => b.addEventListener('click', () => { filter = b.dataset.filter; render(); }));
}

function renderSidebar(c) {
  const el = document.getElementById('sidebar');
  if (!el) return;
  const catItems = Object.keys(CAT).map(k =>
    `<button class="sb-item ${filter===k?'active':''}" data-filter="${k}">
      <span class="sb-dot" style="background:${getCatColor(k)}"></span> ${esc(CAT[k])} <span class="sb-count">${c[k]||0}</span>
    </button>`
  ).join('');
  el.innerHTML = `
    <div class="sb-section">
      <div class="sb-label">ビュー</div>
      <button class="sb-item ${filter==='all'?'active':''}" data-filter="all">
        <span style="font-size:13px">📋</span> すべて <span class="sb-count">${c.total}</span>
      </button>
      <button class="sb-item ${filter==='wip'?'active':''}" data-filter="wip">
        <span class="sb-dot" style="background:var(--wip)"></span> 進行中 <span class="sb-count">${c.wip}</span>
      </button>
      <button class="sb-item ${filter==='todo'?'active':''}" data-filter="todo">
        <span class="sb-dot" style="background:var(--text4)"></span> 未着手 <span class="sb-count">${c.all - c.wip}</span>
      </button>
    </div>
    <div class="sb-divider"></div>
    <div class="sb-section">
      <div class="sb-label">カテゴリー</div>
      ${catItems}
      <button class="sb-add-cat" id="sb-add-cat">+ 追加</button>
    </div>
    <div class="sb-divider"></div>
    <div class="sb-section">
      <button class="sb-item sb-archive ${filter==='done'?'active':''}" data-filter="done">
        完了済みタスク <span class="sb-count">${c.done}</span>
      </button>
    </div>
  `;
  el.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => { filter = b.dataset.filter; render(); }));
  document.getElementById('sb-add-cat').addEventListener('click', () => {
    const name = prompt('新しいカテゴリー名:');
    if (!name || !name.trim()) return;
    addCategory(name.trim());
    render();
  });
}

function renderTasks() {
  const el = document.getElementById('scroll');

  // "done" filter: show only completed tasks
  if (filter === 'done') {
    const done = tasks.filter(t => t.status === 'done');
    if (done.length === 0) {
      el.innerHTML = '<div class="empty"><div class="empty-icon">✓</div><p>完了済みタスクはありません</p></div>';
    } else {
      el.innerHTML = '<div class="task-section">' +
        `<div class="sec-head">— 完了済み (${done.length})</div>` +
        done.map((t,i) => renderRow(t, i+1)).join('') +
        '</div>';
    }
    return;
  }

  // Status filter (wip / todo)
  if (filter === 'wip' || filter === 'todo') {
    const statusFiltered = tasks.filter(t => t.status === filter);
    const label = filter === 'wip' ? '進行中' : '未着手';
    const po2 = { high:0, mid:1, low:2 };
    const so2 = { wip:0, todo:1 };
    statusFiltered.sort((a,b) => {
      if (po2[a.priority] !== po2[b.priority]) return po2[a.priority] - po2[b.priority];
      if (a.due && b.due) return a.due < b.due ? -1 : 1;
      if (a.due) return -1; if (b.due) return 1;
      if ((so2[a.status]||1) !== (so2[b.status]||1)) return (so2[a.status]||1) - (so2[b.status]||1);
      return b.createdAt - a.createdAt;
    });
    if (statusFiltered.length === 0) {
      el.innerHTML = `<div class="empty"><div class="empty-icon">📋</div><p>${label}のタスクはありません</p></div>`;
    } else {
      el.innerHTML = '<div class="task-section">' +
        `<div class="sec-head">— ${label} (${statusFiltered.length})</div>` +
        statusFiltered.map((t,i) => renderRow(t, i+1)).join('') +
        '</div>';
    }
    return;
  }

  const filtered = tasks.filter(t => filter==='all' || t.category===filter);
  const active = filtered.filter(t => t.status !== 'done');

  const po = { high:0, mid:1, low:2 };
  const so = { wip:0, todo:1 };
  active.sort((a,b) => {
    if (po[a.priority] !== po[b.priority]) return po[a.priority] - po[b.priority];
    if (a.due && b.due) return a.due < b.due ? -1 : 1;
    if (a.due) return -1; if (b.due) return 1;
    if ((so[a.status]||1) !== (so[b.status]||1)) return (so[a.status]||1) - (so[b.status]||1);
    return b.createdAt - a.createdAt;
  });

  let html = '';
  if (active.length === 0) {
    html = '<div class="empty"><div class="empty-icon">✓</div><p>タスクがありません</p></div>';
  } else {
    html += '<div class="task-section">';
    html += `<div class="sec-head">— 未完了 (${active.length})</div>`;
    html += active.map((t,i) => renderRow(t, i+1)).join('');
    html += '</div>';
  }
  el.innerHTML = html;
}

function priClass(p) { return p==='high'?'pri-high':p==='low'?'pri-low':'pri-mid'; }
function dueClass(due) {
  if (!due) return '';
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(due+'T00:00:00');
  const diff = Math.round((d - today) / 864e5);
  if (diff <= 2) return 'due-urgent';
  if (diff <= 7) return 'due-soon';
  return 'due-ok';
}

function renderRow(t, num) {
  const dt = dueText(t.due);
  const catPart = CAT[t.category] || t.category;
  const priPart = PRI[t.priority] || '';
  const priCls = priClass(t.priority);
  const dueCls = dueClass(t.due);
  let metaHtml = '<span style="color:'+getCatColor(t.category)+';font-weight:500">' + esc(catPart) + '</span>';
  if (priPart) metaHtml += ' · <span class="'+priCls+'">' + esc(priPart) + '</span>';
  if (dt) metaHtml += ' · <span class="'+dueCls+'">' + esc(dt) + '</span>';
  if (t.tags && t.tags.length > 0) metaHtml += ' ' + t.tags.map(tag => '<span class="tag-mini">' + esc(tag) + '</span>').join(' ');

  return `<div class="trow ${t.status==='done'?'is-done':''}" data-id="${t.id}" onclick="openDetail('${t.id}')">
    <div class="tnum">${String(num).padStart(2,'0')}</div>
    <div class="sicon s-${t.status}" onclick="event.stopPropagation();showStatusMenu('${t.id}',event)"></div>
    <div class="tbody">
      <div class="ttxt ${t.status==='done'?'done-txt':''}">${esc(t.title)}</div>
      <div class="tmeta">${metaHtml}</div>
    </div>
  </div>`;
}

function toggleDoneSec() {
  const sec = document.getElementById('done-sec');
  const icon = document.getElementById('done-sec-toggle');
  if (!sec) return;
  const vis = sec.style.display !== 'none';
  sec.style.display = vis ? 'none' : '';
  if (icon) icon.classList.toggle('collapsed', vis);
}

// ── Add task from mobile ──
function addFromMobile() {
  const inp = document.getElementById('mob-inp');
  if (!inp || !inp.value.trim()) return;
  addTask({
    title: inp.value.trim(),
    category: document.getElementById('mob-cat').value,
    priority: document.getElementById('mob-pri').value,
    due: document.getElementById('mob-due').value || null,
  });
  inp.value = ''; document.getElementById('mob-due').value = '';
  document.getElementById('mob-pri').value = 'mid';
}

// ── Add task from desktop ──
function openDeskForm() {
  const f = document.getElementById('desk-form');
  f.classList.add('open');
  document.getElementById('df-title').focus();
  if (filter !== 'all') document.getElementById('df-cat').value = filter;
}
function closeDeskForm() {
  document.getElementById('desk-form').classList.remove('open');
  document.getElementById('df-title').value = '';
  document.getElementById('df-due').value = '';
  document.getElementById('df-pri').value = 'mid';
}
function submitDeskForm() {
  const title = document.getElementById('df-title').value.trim();
  if (!title) return;
  addTask({ title, category: document.getElementById('df-cat').value, priority: document.getElementById('df-pri').value, due: document.getElementById('df-due').value || null });
  closeDeskForm();
}

// ── Sync Modal ──
function openSyncModal() {
  const cfg = getSyncCfg();
  if (cfg) { document.getElementById('sync-url').value = cfg.url||''; document.getElementById('sync-key').value = cfg.key||''; }
  document.getElementById('modal-bg').classList.add('vis');
  document.getElementById('sync-modal').classList.add('vis');
}
function closeSyncModal() {
  document.getElementById('modal-bg').classList.remove('vis');
  document.getElementById('sync-modal').classList.remove('vis');
}
async function saveSyncCfg() {
  const url = document.getElementById('sync-url').value.trim();
  const key = document.getElementById('sync-key').value.trim();
  const st = document.getElementById('sync-status');
  if (!url || !key) { setSyncCfg(null); supabaseClient = null; st.className='sync-status'; closeSyncModal(); return; }
  setSyncCfg({ url, key }); st.className='sync-status'; st.textContent='接続中...'; st.style.display='block';
  try {
    // Supabaseクライアントを（再）作成
    await loadSB();
    supabaseClient = window.supabase.createClient(url, key);
    st.className='sync-status ok'; st.textContent='設定を保存しました';
    setTimeout(() => { closeSyncModal(); location.reload(); }, 1200);
  }
  catch(e) { st.className='sync-status err'; st.textContent='エラー: '+e.message; }
}

// ── Supabase Sync ──
async function loadSB() {
  if (window.supabase) return;
  return new Promise((r, j) => { const s=document.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'; s.onload=r; s.onerror=()=>j(new Error('読み込み失敗')); document.head.appendChild(s); });
}
async function initSync() {
  const cfg = getSyncCfg(); if (!cfg||!cfg.url||!cfg.key) return;
  await loadSB();
  if (!supabaseClient) supabaseClient = window.supabase.createClient(cfg.url, cfg.key);
  await syncPull();
  supabaseClient.channel('tk').on('postgres_changes',{event:'*',schema:'public',table:'tasks'},handleRemote).subscribe();
}
async function syncPull() {
  if (!supabaseClient) return;
  const {data,error} = await supabaseClient.from('tasks').select('*');
  if (error) throw error; if (!data) return;
  const m = new Map(tasks.map(t=>[t.id,t]));
  data.forEach(r => { const rt={id:r.id,title:r.title,category:r.category||'uncategorized',priority:r.priority||'mid',due:r.due||null,status:r.status||'todo',done:!!r.done,description:r.description||'',tags:r.tags||[],createdAt:r.created_at,updatedAt:r.updated_at}; migrateStatus(rt); const l=m.get(r.id); if(!l||r.updated_at>(l.updatedAt||0))m.set(r.id,rt); });
  tasks = Array.from(m.values()); save(); render();
  const ri = new Set(data.map(d=>d.id));
  tasks.filter(t=>!ri.has(t.id)).forEach(t=>syncPush(t));
}
async function syncPush(t) {
  if (!supabaseClient) return;
  try { const ca=t.createdAt?new Date(typeof t.createdAt==='number'?t.createdAt:Date.parse(t.createdAt)).toISOString():new Date().toISOString(); const ua=t.updatedAt?new Date(typeof t.updatedAt==='number'?t.updatedAt:Date.parse(t.updatedAt)).toISOString():new Date().toISOString(); await supabaseClient.from('tasks').upsert({id:t.id,title:t.title,category:t.category,priority:t.priority,due:t.due,done:t.done,status:t.status,description:t.description||'',tags:t.tags||[],created_at:ca,updated_at:ua}); } catch(e) { console.error('sync push:', e); }
}
async function syncDel(id) {
  if (!supabaseClient) return;
  try { await supabaseClient.from('tasks').delete().eq('id', id); } catch(e) { console.error('sync del:', e); }
}
function handleRemote(p) {
  const {eventType,new:n,old:o} = p;
  if (eventType==='DELETE'&&o) { tasks=tasks.filter(t=>t.id!==o.id); }
  else if (n) { const rt={id:n.id,title:n.title,category:n.category||'uncategorized',priority:n.priority||'mid',due:n.due||null,status:n.status||'todo',done:!!n.done,description:n.description||'',tags:n.tags||[],createdAt:n.created_at,updatedAt:n.updated_at}; migrateStatus(rt); const i=tasks.findIndex(t=>t.id===n.id); if(i>=0){if(n.updated_at>(tasks[i].updatedAt||0))tasks[i]=rt;}else tasks.unshift(rt); }
  save(); render();
}

// ── Events ──
function bindEvents() {
  // Mobile add
  document.getElementById('mob-add-btn').addEventListener('click', addFromMobile);
  const mobInp = document.getElementById('mob-inp');
  mobInp.addEventListener('keydown', e => { if (e.key==='Enter') { e.preventDefault(); addFromMobile(); } });
  mobInp.addEventListener('focus', () => { setTimeout(() => mobInp.scrollIntoView({block:'end',behavior:'smooth'}), 300); });
  // Desktop add
  document.getElementById('tb-add-btn').addEventListener('click', openDeskForm);
  document.getElementById('df-cancel').addEventListener('click', closeDeskForm);
  document.getElementById('df-submit').addEventListener('click', submitDeskForm);
  document.getElementById('df-title').addEventListener('keydown', e => { if (e.key==='Enter') { e.preventDefault(); submitDeskForm(); } });
  // Done toggle
  document.getElementById('tb-done-toggle').addEventListener('click', () => { showDone = !showDone; render(); });
  // Sync
  document.getElementById('nav-sync-btn').addEventListener('click', openSyncModal);
  document.getElementById('mob-sync-btn').addEventListener('click', openSyncModal);
  document.getElementById('modal-close').addEventListener('click', closeSyncModal);
  document.getElementById('modal-bg').addEventListener('click', closeSyncModal);
  document.getElementById('modal-save').addEventListener('click', saveSyncCfg);
  // Account menu
  function toggleAcctMenu(menuId) {
    const menu = document.getElementById(menuId);
    const isOpen = menu.classList.contains('open');
    // close all menus first
    document.querySelectorAll('.acct-menu').forEach(m => m.classList.remove('open'));
    if (!isOpen) {
      menu.classList.add('open');
      setTimeout(() => document.addEventListener('click', function closeAcct(e) {
        if (!menu.contains(e.target)) { menu.classList.remove('open'); }
        document.removeEventListener('click', closeAcct);
      }), 10);
    }
  }
  document.getElementById('nav-acct-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleAcctMenu('nav-acct-menu'); });
  document.getElementById('mob-acct-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleAcctMenu('mob-acct-menu'); });
  // Logout
  document.getElementById('nav-logout-btn').addEventListener('click', logout);
  document.getElementById('mob-logout-btn').addEventListener('click', logout);
  // Keyboard
  document.addEventListener('keydown', e => {
    if (['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)) return;
    if (e.key==='n'||e.key==='N') { e.preventDefault(); if (window.innerWidth>=768) openDeskForm(); else document.getElementById('mob-inp').focus(); }
    if (e.key==='Escape') { closeDetail(); closeStatusMenu(); }
  });
}

// ── iOS keyboard viewport fix ──
function setupViewportFix() {
  if (!window.visualViewport) return;
  const app = document.getElementById('app');
  window.visualViewport.addEventListener('resize', () => {
    const diff = window.innerHeight - window.visualViewport.height;
    app.style.height = window.visualViewport.height + 'px';
    if (diff > 50) {
      document.querySelector('.mob-add')?.scrollIntoView({block:'end'});
    }
  });
  window.visualViewport.addEventListener('scroll', () => {
    app.style.height = window.visualViewport.height + 'px';
  });
}

// ── Supabase Auth ──
let authMode = 'login'; // 'login' or 'signup'

function showLockScreen() {
  const lockEl = document.getElementById('lock-screen');
  if (!lockEl) return;
  lockEl.classList.remove('hidden');

  const emailInp = document.getElementById('lock-email');
  const passInp = document.getElementById('lock-pass');
  const btn = document.getElementById('lock-btn');
  const err = document.getElementById('lock-err');
  const desc = document.getElementById('lock-desc');
  const switchBtn = document.getElementById('lock-switch');
  const toggleEl = document.getElementById('lock-toggle');

  authMode = 'login';
  emailInp.value = '';
  passInp.value = '';
  err.textContent = '';
  desc.textContent = 'ログインしてください';
  btn.textContent = 'ログイン';
  toggleEl.innerHTML = 'アカウントをお持ちでない方は<button class="lock-link" id="lock-switch">新規登録</button>';
  setTimeout(() => emailInp.focus(), 100);

  function updateMode() {
    if (authMode === 'signup') {
      desc.textContent = '新規アカウントを作成';
      btn.textContent = '登録する';
      toggleEl.innerHTML = 'すでにアカウントをお持ちの方は<button class="lock-link" id="lock-switch">ログイン</button>';
    } else {
      desc.textContent = 'ログインしてください';
      btn.textContent = 'ログイン';
      toggleEl.innerHTML = 'アカウントをお持ちでない方は<button class="lock-link" id="lock-switch">新規登録</button>';
    }
    err.textContent = '';
    document.getElementById('lock-switch').addEventListener('click', () => {
      authMode = authMode === 'login' ? 'signup' : 'login';
      updateMode();
    });
  }

  document.getElementById('lock-switch').addEventListener('click', () => {
    authMode = 'signup';
    updateMode();
  });

  // 同期設定ボタン
  const setupBtn = document.getElementById('lock-setup-btn');
  if (setupBtn) {
    setupBtn.addEventListener('click', () => {
      openSyncModal();
    });
  }

  async function doAuth() {
    const email = document.getElementById('lock-email').value.trim();
    const pass = document.getElementById('lock-pass').value;

    if (!email) { err.textContent = 'メールアドレスを入力してください'; return; }
    if (!pass) { err.textContent = 'パスワードを入力してください'; return; }
    if (pass.length < 6) { err.textContent = 'パスワードは6文字以上で入力してください'; return; }

    if (!supabaseClient) {
      err.textContent = 'Supabase未設定です。同期設定を先に行ってください';
      return;
    }

    const authBtn = document.getElementById('lock-btn');
    authBtn.disabled = true;
    authBtn.textContent = '処理中...';
    err.textContent = '';

    try {
      let result;
      if (authMode === 'signup') {
        result = await supabaseClient.auth.signUp({ email, password: pass });
      } else {
        result = await supabaseClient.auth.signInWithPassword({ email, password: pass });
      }

      if (result.error) {
        const msg = result.error.message;
        if (msg.includes('Invalid login')) err.textContent = 'メールアドレスまたはパスワードが違います';
        else if (msg.includes('already registered')) err.textContent = 'このメールアドレスは既に登録されています';
        else if (msg.includes('invalid')) err.textContent = '無効なメールアドレスです';
        else err.textContent = msg;
        authBtn.disabled = false;
        updateMode();
        return;
      }

      if (authMode === 'signup' && result.data?.user && !result.data.session) {
        // メール確認が必要な場合
        err.style.color = '#2A7A4B';
        err.textContent = '確認メールを送信しました。メールを確認してからログインしてください。';
        authMode = 'login';
        updateMode();
        authBtn.disabled = false;
        return;
      }

      // ログイン成功
      lockEl.classList.add('hidden');
      updateAcctUI(result.data.user);
      startApp();
    } catch (e) {
      err.textContent = 'エラー: ' + e.message;
      authBtn.disabled = false;
      updateMode();
    }
  }

  // イベント（毎回新しいcloneで置き換えて重複防止）
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  newBtn.addEventListener('click', doAuth);

  const newPass = passInp.cloneNode(true);
  passInp.parentNode.replaceChild(newPass, passInp);
  newPass.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); doAuth(); } });

  const newEmail = emailInp.cloneNode(true);
  emailInp.parentNode.replaceChild(newEmail, emailInp);
  newEmail.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); document.getElementById('lock-pass').focus(); } });
}

function updateAcctUI(user) {
  if (!user) return;
  const initial = (user.email || 'U')[0].toUpperCase();
  const navBtn = document.getElementById('nav-acct-btn');
  const mobBtn = document.getElementById('mob-acct-btn');
  if (navBtn) navBtn.textContent = initial;
  if (mobBtn) mobBtn.textContent = initial;
}

async function logout() {
  if (supabaseClient) {
    await supabaseClient.auth.signOut();
  }
  location.reload();
}

// ── Init ──
function startApp() {
  load(); bindEvents(); render(); setupViewportFix();
  // sync pull（auth済みのsupabaseClientを再利用）
  if (supabaseClient) {
    syncPull().then(() => {
      supabaseClient.channel('tk').on('postgres_changes',{event:'*',schema:'public',table:'tasks'},handleRemote).subscribe();
    }).catch(e => console.error('sync:', e));
  }
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
}

async function initSupabaseClient() {
  const cfg = getSyncCfg();
  if (!cfg || !cfg.url || !cfg.key) return false;
  await loadSB();
  supabaseClient = window.supabase.createClient(cfg.url, cfg.key);
  return true;
}

async function init() {
  const lockEl = document.getElementById('lock-screen');

  // 同期モーダルのイベントを先に登録（ログイン前でも使えるように）
  document.getElementById('modal-close').addEventListener('click', closeSyncModal);
  document.getElementById('modal-bg').addEventListener('click', closeSyncModal);
  document.getElementById('modal-save').addEventListener('click', saveSyncCfg);

  // Supabaseクライアントを初期化
  const hasSB = await initSupabaseClient();

  if (!hasSB) {
    // Supabase未設定 → ロック画面を表示（エラーメッセージ付き）
    showLockScreen();
    const err = document.getElementById('lock-err');
    if (err) {
      err.style.color = '#C07000';
      err.textContent = 'Supabase未設定です。同期設定を先に行ってください。';
    }
    return;
  }

  // セッションを確認
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (session && session.user) {
    // ログイン済み
    if (lockEl) lockEl.classList.add('hidden');
    updateAcctUI(session.user);
    startApp();
  } else {
    // 未ログイン
    showLockScreen();
  }
}
init();
