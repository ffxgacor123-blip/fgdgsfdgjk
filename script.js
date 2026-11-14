/* SCRIPT.JS — logika web. Biasanya tidak perlu diedit. */
const app = document.getElementById("app");
const inputCari = document.getElementById("inputCari");
let timerBanner = null;

document.getElementById("logo").textContent = SITE.nama;
document.getElementById("footerNama").textContent = "© " + SITE.nama;
document.title = "Download Game - " + SITE.nama;

const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function coverHTML(g){
  const style = g.gambar ? `style="background-image:url('${esc(g.gambar)}')"` : "";
  return `<div class="cover" ${style}>${g.gambar ? "" : esc(g.nama.charAt(0))}</div>`;
}

function kartuHTML(g){
  return `<article class="kartu">
    <a href="#/game/${esc(g.id)}">${coverHTML(g)}</a>
    <div class="isi">
      <h3>${esc(g.nama)}</h3>
      <div class="meta">${esc(g.platform)} • ${esc(g.ukuran)}</div>
      <a class="btn" href="#/game/${esc(g.id)}">Download</a>
    </div>
  </article>`;
}

/* ---------- BANNER ---------- */
function bannerHTML(){
  const slides = BANNERS.map((b,i)=>{
    const bg = b.gambar ? `style="background-image:url('${esc(b.gambar)}')"` : "";
    return `<div class="slide ${b.gambar?"":"polos"} ${i===0?"aktif":""}" ${bg}>
      <h2>${esc(b.judul)}</h2><p>${esc(b.teks)}</p></div>`;
  }).join("");
  const titik = BANNERS.map((_,i)=>`<button class="${i===0?"aktif":""}" data-i="${i}" aria-label="Banner ${i+1}"></button>`).join("");
  return `<section class="banner" id="banner">${slides}<div class="titik">${titik}</div></section>`;
}

function jalankanBanner(){
  clearInterval(timerBanner);
  const el = document.getElementById("banner");
  if(!el) return;
  const slides = [...el.querySelectorAll(".slide")];
  const titik = [...el.querySelectorAll(".titik button")];
  let n = 0;
  const tampil = i => {
    n = (i + slides.length) % slides.length;
    slides.forEach((s,k)=>s.classList.toggle("aktif",k===n));
    titik.forEach((t,k)=>t.classList.toggle("aktif",k===n));
  };
  titik.forEach(t=>t.addEventListener("click",()=>{tampil(+t.dataset.i);}));
  if(slides.length>1) timerBanner = setInterval(()=>tampil(n+1),4500);
}

/* ---------- HALAMAN ---------- */
function halamanBeranda(){
  const populer = GAMES.filter(g=>g.populer);
  app.innerHTML = bannerHTML() +
    `<div class="judul-bagian"><h2>Game Populer</h2><a class="lihat" href="#/semua">Lihat Semua</a></div>
     <div class="grid">${populer.map(kartuHTML).join("")}</div>`;
  jalankanBanner();
}

function halamanSemua(){
  app.innerHTML = `<div class="judul-bagian"><h2>Semua Game</h2></div>
    <div class="grid">${GAMES.map(kartuHTML).join("")}</div>`;
}

function halamanCari(q){
  const hasil = GAMES.filter(g=>g.nama.toLowerCase().includes(q.toLowerCase()));
  app.innerHTML = `<div class="judul-bagian"><h2>Hasil cari: ${esc(q)}</h2></div>` +
    (hasil.length ? `<div class="grid">${hasil.map(kartuHTML).join("")}</div>`
                  : `<p class="kosong">Game "${esc(q)}" tidak ditemukan. Coba nama lain.</p>`);
}

function halamanDetail(id){
  const g = GAMES.find(x=>x.id===id);
  if(!g){ app.innerHTML = `<p class="kosong">Game tidak ditemukan.</p>`; return; }
  app.innerHTML = `<a class="kembali" href="#/semua">← Kembali</a>
  <section class="detail">
    ${coverHTML(g)}
    <div>
      <h1>${esc(g.nama)}</h1>
      <p class="deskripsi">${esc(g.deskripsi)}</p>
      <div class="info">
        <div><span>Ukuran</span><span>${esc(g.ukuran)}</span></div>
        <div><span>Platform</span><span>${esc(g.platform)}</span></div>
        <div><span>Versi</span><span>${esc(g.versi)}</span></div>
      </div>
      <button class="btn btn-dl" id="btnDl">Download</button>
      <div class="progres" id="progres">
        <div class="bar"><i id="barIsi"></i></div>
        <div class="status" id="status"></div>
      </div>
    </div>
  </section>`;
  document.getElementById("btnDl").addEventListener("click",()=>unduh(g));
}

/* ---------- DOWNLOAD LANGSUNG DI WEB ---------- */
function simpanBlob(blob, nama){
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = nama;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 10000);
}

async function unduh(g){
  const btn = document.getElementById("btnDl");
  const box = document.getElementById("progres");
  const bar = document.getElementById("barIsi");
  const st  = document.getElementById("status");
  btn.disabled = true; btn.textContent = "Mengunduh...";
  box.classList.add("tampil"); bar.style.width = "0"; st.textContent = "Menyiapkan file...";
  try{
    const res = await fetch(g.link);
    if(!res.ok) throw new Error("HTTP " + res.status);
    const total = +res.headers.get("Content-Length") || 0;
    const reader = res.body.getReader();
    const bagian = []; let terima = 0;
    for(;;){
      const {done,value} = await reader.read();
      if(done) break;
      bagian.push(value); terima += value.length;
      if(total){
        bar.style.width = (terima/total*100).toFixed(1) + "%";
        st.textContent = `${(terima/1048576).toFixed(1)} MB / ${(total/1048576).toFixed(1)} MB`;
      }else{
        st.textContent = `${(terima/1048576).toFixed(1)} MB terunduh`;
      }
    }
    bar.style.width = "100%";
    simpanBlob(new Blob(bagian), g.namaFile || g.nama);
    st.textContent = "Selesai. File sudah tersimpan.";
    btn.textContent = "Download Lagi";
  }catch(err){
    /* Cadangan: kalau server file melarang unduh lewat web (CORS), pakai download biasa */
    st.textContent = "Mengunduh dengan cara cadangan...";
    const a = document.createElement("a");
    a.href = g.link; a.download = g.namaFile || ""; a.rel = "noopener";
    document.body.appendChild(a); a.click(); a.remove();
    btn.textContent = "Download Lagi";
  }
  btn.disabled = false;
}

/* ---------- ROUTER ---------- */
function atur(){
  clearInterval(timerBanner);
  const h = location.hash || "#/";
  document.querySelectorAll(".nav a").forEach(a=>a.classList.remove("aktif"));
  if(h.startsWith("#/game/")){
    halamanDetail(decodeURIComponent(h.slice(7)));
  }else if(h.startsWith("#/cari/")){
    halamanCari(decodeURIComponent(h.slice(7)));
  }else if(h === "#/semua"){
    document.querySelector('[data-nav="semua"]').classList.add("aktif");
    halamanSemua();
  }else{
    document.querySelector('[data-nav="beranda"]').classList.add("aktif");
    halamanBeranda();
  }
  window.scrollTo(0,0);
}

document.getElementById("formCari").addEventListener("submit",e=>{
  e.preventDefault();
  const q = inputCari.value.trim();
  location.hash = q ? "#/cari/" + encodeURIComponent(q) : "#/semua";
});
inputCari.addEventListener("input",()=>{
  const q = inputCari.value.trim();
  if(q) location.hash = "#/cari/" + encodeURIComponent(q);
});
window.addEventListener("hashchange",atur);
atur();
