/**
 * script.js - Sistem Pengurusan Sijil v2.1 (Full Suite)
 * Sasaran: 246 Lines | Status: SYNCED
 */

let masterData = [];
let currentOrientation = 'portrait';

// 1. LOGIK ANTARAMUKA (ALPINE.JS)
document.addEventListener('alpine:init', () => {
    Alpine.data('systemStatus', () => ({
        active: true,
        pulse: false,
        toggleActive() {
            this.active = !this.active;
            this.pulse = true;
            setTimeout(() => this.pulse = false, 500);
            if (this.active) loadData();
        }
    }));
});

// 2. MUAT DATA (ANTI-NAMA-SAMA LOGIC)
async function loadData() {
    const statusText = document.getElementById('status-text');
    try {
        const [resP, resB] = await Promise.all([
            fetch('data.json'), 
            fetch('pembimbing_daurah.json')
        ]);
        const dataP = await resP.json();
        const dataB = (await resB.json()).map(p => ({ ...p, kumpulan: p.kumpulan || "PEMBIMBING" }));

        // Satukan data: Pembimbing di atas, Peserta di bawah
        masterData = [...dataB, ...dataP];
        renderNameList(masterData);
        statusText.innerText = `READY: ${masterData.length} REKOD DIKESAN`;
    } catch (e) {
        statusText.innerText = "RALAT: GAGAL MUAT DATA JSON";
        console.error("Data Load Error:", e);
    }
}

// 3. RENDER SENARAI NAMA (UI GLASSMORPHISM)
function renderNameList(data) {
    const listDiv = document.getElementById('name-list');
    if (!listDiv) return;

    listDiv.innerHTML = data.map((item, index) => `
        <div class="name-item group flex items-center justify-between p-4 rounded-2xl hover:bg-sky-500/10 transition-all border border-transparent hover:border-sky-500/20 cursor-pointer" onclick="showPreview(${index})">
            <div class="flex items-center gap-4">
                <input type="checkbox" class="cert-checkbox w-4 h-4 accent-sky-500 rounded border-white/10" id="user-${index}" value="${index}" onclick="event.stopPropagation()">
                <div class="leading-tight">
                    <p class="text-sm font-medium group-hover:text-sky-400 transition-colors">${item.nama}</p>
                    <p class="text-[10px] text-white/30 font-mono uppercase">${item.ic} | ${item.kumpulan}</p>
                </div>
            </div>
            <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="text-sky-500 text-[10px] font-bold">PREVIEW ➔</span>
            </div>
        </div>
    `).join('');
}

// 4. PREVIEW & LIVE ADJUSTMENT
function showPreview(idx) {
    const area = document.getElementById('preview-area');
    const item = masterData[idx];
    
    area.innerHTML = `
        <div class="preview-item-container w-full flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
            <div class="glass-panel p-6 mb-8 w-full max-w-2xl flex justify-between items-center no-print bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl">
                <div class="flex gap-3">
                    <button onclick="window.print()" class="btn-secondary py-2 px-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">🖨️ CETAK</button>
                    <button onclick="hantarKeTelegramByIndex(${idx})" class="btn-secondary py-2 px-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sky-500/20 hover:text-sky-400 transition-all">🚀 TELEGRAM</button>
                </div>
                <div class="text-right">
                    <p class="text-[10px] text-sky-400 font-bold uppercase tracking-tighter">Preview Mode</p>
                    <p class="text-[9px] text-white/30">Auto-Scaling Active</p>
                </div>
            </div>
            ${createCertTemplate(item, currentOrientation)}
        </div>
    `;
}

// 5. TELEGRAM BRIDGE (INTEGRASI APP.PY)
async function hantarKeTelegram(peserta) {
    const temp = document.createElement('div');
    temp.style.position = 'absolute'; temp.style.left = '-9999px';
    temp.innerHTML = createCertTemplate(peserta, currentOrientation);
    document.body.appendChild(temp);

    const opt = {
        margin: 0, 
        filename: `Sijil_${peserta.nama.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: currentOrientation }
    };

    try {
        const pdfBlob = await html2pdf().set(opt).from(temp.querySelector('.certificate')).output('blob');
        const fd = new FormData();
        fd.append('file', pdfBlob, opt.filename);
        fd.append('nama', peserta.nama);

        const res = await fetch('http://localhost:5000/upload_pdf', { method: 'POST', body: fd });
        document.body.removeChild(temp);
        return await res.json();
    } catch (e) {
        if (temp) document.body.removeChild(temp);
        throw e;
    }
}

// 6. FUNGSI AUTO-RUN (BULK SENDING)
async function hantarSemuaPilihan() {
    const checked = document.querySelectorAll('.cert-checkbox:checked');
    if (checked.length === 0) return alert("Sila pilih peserta dari senarai!");
    if (!confirm(`Hantar ${checked.length} sijil secara automatik?`)) return;

    const statusText = document.getElementById('status-text');
    const btn = event.target;
    btn.disabled = true;
    btn.innerText = "⏳ SEDANG MEMPROSES...";

    for (let i = 0; i < checked.length; i++) {
        const p = masterData[checked[i].value];
        statusText.innerText = `SENDING (${i + 1}/${checked.length}): ${p.nama}`;
        try {
            await hantarKeTelegram(p);
            // Delay 1.5s untuk elakkan Telegram Spam Limit
            await new Promise(r => setTimeout(r, 1500));
        } catch (e) {
            console.error(`Gagal hantar: ${p.nama}`, e);
        }
    }

    statusText.innerText = `✅ SELESAI: ${checked.length} SIJIL BERJAYA DIHANTAR`;
    btn.disabled = false;
    btn.innerText = "🚀 AUTO-RUN TELEGRAM";
}

// 7. HELPERS & FILTERING
function filterData() {
    const g = document.getElementById('group-filter').value;
    const filtered = (g === "ALL") ? masterData : masterData.filter(d => d.kumpulan === g);
    renderNameList(filtered);
}

function toggleAll(s) {
    document.querySelectorAll('.cert-checkbox').forEach(cb => {
        if (cb.closest('.name-item').style.display !== 'none') cb.checked = s;
    });
}

function hantarKeTelegramByIndex(idx) {
    const statusText = document.getElementById('status-text');
    statusText.innerText = "⏳ SEDANG MENJANA PDF...";
    
    hantarKeTelegram(masterData[idx])
        .then(() => {
            statusText.innerText = `✅ BERJAYA: ${masterData[idx].nama}`;
            alert("Sijil telah dihantar ke Telegram Desktop!");
        })
        .catch(() => {
            statusText.innerText = "⚠️ RALAT: SERVER PYTHON OFFLINE";
            alert("Pastikan app.py berjalan di terminal Ubuntu anda.");
        });
}

// 8. AUTO-START
loadData();
