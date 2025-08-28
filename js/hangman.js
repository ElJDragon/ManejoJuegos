// ===== Palabras + pistas =====
var programming_languages = [
  { w: "python",     h: "Lenguaje muy usado en ciencia de datos y automatización." },
  { w: "javascript", h: "Lenguaje del navegador; también corre en Node.js." },
  { w: "mongodb",    h: "Base de datos NoSQL orientada a documentos." },
  { w: "json",       h: "Formato de intercambio de datos basado en texto." },
  { w: "java",       h: "OO sobre la JVM; muy usado en backend y Android clásico." },
  { w: "html",       h: "Lenguaje de marcado para la estructura de páginas web." },
  { w: "css",        h: "Hojas de estilo para diseño y presentación web." },
  { w: "c",          h: "Lenguaje de bajo nivel para sistemas y embebidos." },
  { w: "csharp",     h: "Lenguaje de Microsoft para .NET (se escribe C#)." },
  { w: "golang",     h: "Lenguaje de Google conocido como Go, concurrente y rápido." },
  { w: "kotlin",     h: "Lenguaje moderno para Android (oficial de Google)." },
  { w: "php",        h: "Lenguaje muy usado en backend web tradicional." },
  { w: "sql",        h: "Lenguaje para consultar y manejar bases de datos relacionales." },
  { w: "ruby",       h: "Lenguaje popular por el framework Rails." }
];

// ===== Claves de storage =====
const LS_PLAYER   = 'player_name';
const LS_BOARD    = 'ah_scoreboard'; // [{name,wins,losses,bestStreak}]
const LS_STREAKS  = 'ah_streaks';    // { name: currentStreak }

// ===== Estado juego =====
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

// ===== Pistas =====
let currentHint = "";
let hintUsed = false;

// ===== Util =====
const $ = s => document.querySelector(s);

// ---------- Scoreboard helpers ----------
function loadScoreboard(){
  try{ const x = JSON.parse(localStorage.getItem(LS_BOARD) || '[]'); return Array.isArray(x)? x : []; }
  catch{ return []; }
}
function saveScoreboard(arr){ localStorage.setItem(LS_BOARD, JSON.stringify(arr)); }

function getRecord(name){
  const board = loadScoreboard();
  let rec = board.find(r => r.name === name);
  if(!rec){ rec = { name, wins:0, losses:0, bestStreak:0 }; board.push(rec); saveScoreboard(board); }
  return rec;
}
function setRecord(rec){
  const board = loadScoreboard();
  const i = board.findIndex(r => r.name === rec.name);
  if(i === -1) board.push(rec); else board[i] = rec;
  saveScoreboard(board);
}

function loadStreak(name){
  try{
    const m = JSON.parse(localStorage.getItem(LS_STREAKS) || '{}');
    return m[name] || 0;
  }catch{ return 0; }
}
function saveStreak(name, value){
  const m = (()=>{ try{ return JSON.parse(localStorage.getItem(LS_STREAKS) || '{}'); }catch{ return {}; }})();
  m[name] = value;
  localStorage.setItem(LS_STREAKS, JSON.stringify(m));
}

function getActivePlayer(){ return localStorage.getItem(LS_PLAYER) || 'Invitado'; }

// ---------- UI: racha y tablero ----------
function renderBestStreak(){
  const name = getActivePlayer();
  const rec  = getRecord(name);
  const el   = $('#bestStreak');
  if(el) el.textContent = rec.bestStreak || 0;
}
function renderScoreboard(){
  const tbody = $('#scoreboardBody');
  if(!tbody) return;
  const board = loadScoreboard();

  // Orden: más victorias, luego mejor racha, luego menos derrotas
  board.sort((a,b)=> (b.wins - a.wins) || (b.bestStreak - a.bestStreak) || (a.losses - b.losses));

  tbody.innerHTML = board.map((r,idx)=>`
    <tr>
      <td>${idx+1}</td>
      <td>${r.name}</td>
      <td>${r.wins}</td>
      <td>${r.losses}</td>
      <td>${r.bestStreak}</td>
    </tr>
  `).join('');
}

// Registrar resultado y actualizar UI
function recordResult(win){
  const name = getActivePlayer();
  let rec = getRecord(name);
  let cur = loadStreak(name);

  if(win){
    rec.wins++;
    cur = cur + 1;
    if(cur > rec.bestStreak) rec.bestStreak = cur;
  }else{
    rec.losses++;
    cur = 0; // romper racha
  }

  saveStreak(name, cur);
  setRecord(rec);
  renderBestStreak();
  renderScoreboard();
}

// Botón limpiar tablero
function hookClearBoard(){
  const btn = $('#btnClearBoard');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    if(confirm('¿Seguro que quieres limpiar el tablero de puntajes?')){
      localStorage.removeItem(LS_BOARD);
      // No borramos rachas actuales por jugador para que sigas jugando.
      renderScoreboard();
      renderBestStreak();
    }
  });
}

// ---------- Pantalla de inicio / jugador ----------
function applyPlayerName(name){
  const label = $('#playerLabel');
  if(label) label.textContent = name || 'Invitado';
  renderBestStreak(); // refrescar racha al cambiar de jugador
}

function initStartScreen(){
  const overlay   = $('#startOverlay');
  const input     = $('#playerName');
  const playBtn   = $('#btnPlay');
  const err       = $('#nameError');
  const changeBtn = $('#btnChange');

  const saved = localStorage.getItem(LS_PLAYER);
  if(saved){
    applyPlayerName(saved);
    if(overlay) overlay.classList.add('hidden');
  }else{
    if(overlay) overlay.classList.remove('hidden');
  }

  if(playBtn){
    playBtn.addEventListener('click', ()=>{
      const name = (input && input.value.trim()) || "";
      if(name.length < 2){
        if(err) err.classList.remove('d-none');
        return;
      }
      if(err) err.classList.add('d-none');
      localStorage.setItem(LS_PLAYER, name);
      applyPlayerName(name);
      if(overlay) overlay.classList.add('hidden');
      saveStreak(name, 0); // nueva racha
      reset();
    });
  }

  if(input){
    input.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter'){ e.preventDefault(); playBtn && playBtn.click(); }
    });
    setTimeout(()=> input.focus(), 100);
  }

  if(changeBtn){
    changeBtn.addEventListener('click', ()=>{
      localStorage.removeItem(LS_PLAYER);
      applyPlayerName('Invitado');
      if(input) input.value = '';
      if(overlay) overlay.classList.remove('hidden');
      setTimeout(()=> input && input.focus(), 100);
    });
  }
}

// ---------- Juego ----------
function showHint(){
  const box = document.getElementById('hintBox');
  const txt  = document.getElementById('hintText');
  if(!box || !txt) return;

  txt.textContent = currentHint || "Sin pista disponible.";
  box.style.display = 'block';

  if(!hintUsed){
    hintUsed = true;
    mistakes++;
    updateMistakes();
    updateHangmanPicture();
    checkIfGameLost();
    const hintBtn = document.getElementById('btnHint');
    if(hintBtn) hintBtn.disabled = true;
  }
}

function randomWord() {
  const item = programming_languages[Math.floor(Math.random() * programming_languages.length)];
  answer = item.w;
  currentHint = item.h || "";

  // reset de pista visual y botón
  hintUsed = false;
  const box = document.getElementById('hintBox'); if (box) box.style.display = 'none';
  const hintBtn = document.getElementById('btnHint'); if (hintBtn) hintBtn.disabled = false;
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='${letter}'
        onClick="handleGuess('${letter}')"
      >
        ${letter}
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'Ganaste!!!';
    const hintBtn = document.getElementById('btnHint'); if(hintBtn) hintBtn.disabled = true;
    recordResult(true); // <<< NUEVO
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'El lenguaje es: ' + answer;
    document.getElementById('keyboard').innerHTML = 'Perdiste!!!';
    const hintBtn = document.getElementById('btnHint'); if(hintBtn) hintBtn.disabled = true;
    recordResult(false); // <<< NUEVO
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  // reset pista
  hintUsed = false;
  const box = document.getElementById('hintBox'); if (box) box.style.display = 'none';
  const hintBtn = document.getElementById('btnHint'); if (hintBtn) hintBtn.disabled = false;

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

// ===== Inicialización =====
document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();

// Botón de pista
const hintBtn = document.getElementById('btnHint');
if(hintBtn){ hintBtn.addEventListener('click', showHint); }

// Pantalla de inicio + cambiar jugador
initStartScreen();

// Scoreboard
renderBestStreak();
renderScoreboard();
hookClearBoard();

