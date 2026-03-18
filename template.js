/**
 * TEMPLATE ENGINE - template.js
 * Rekaan: Minimalis, Sky Blue Accent, High-Contrast for Printing.
 */

function createCertTemplate(data, orientation = 'portrait') {
    // Tentukan kelas orientasi
    const orientationClass = orientation === 'landscape' ? 'landscape' : 'portrait';
    
    // Logik Nama: Jika nama terlalu panjang, kecilkan saiz font secara automatik
    const nameSize = data.nama.length > 25 ? 'text-[22pt]' : 'text-[28pt]';

    return `
        <div class="certificate ${orientationClass} bg-white text-slate-900 relative overflow-hidden shadow-2xl mx-auto my-4 border-[12px] border-double border-sky-100 print:shadow-none print:border-none" 
             style="width: 210mm; height: 297mm; padding: 20mm; font-family: 'Inter', sans-serif;">
            
            <div class="absolute -top-20 -right-20 w-64 h-64 bg-sky-50/50 rounded-full blur-3xl print:hidden"></div>
            <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl print:hidden"></div>

            <div class="flex flex-col items-center text-center space-y-4 mb-12">
                <img src="logo_masjid.png" class="w-[180px] object-contain mb-2" alt="Logo Masjid">
                <img src="khatmklsb.png" class="w-[250px] object-contain opacity-90" alt="Khat Masjid">
                <div class="h-1 w-24 bg-sky-500 rounded-full mt-2"></div>
            </div>

            <div class="text-center space-y-8">
                <h1 class="text-sky-600 font-medium tracking-[0.3em] uppercase text-sm">Sijil Penghargaan & Penyertaan</h1>
                
                <div class="py-10">
                    <p class="text-slate-400 text-xs tracking-widest uppercase mb-4">Dengan ini disahkan bahawa</p>
                    <h2 class="${nameSize} font-bold text-slate-800 tracking-tight uppercase leading-tight drop-shadow-sm">
                        ${data.nama}
                    </h2>
                    <p class="text-slate-500 font-mono text-sm mt-2">${data.ic}</p>
                </div>

                <div class="max-w-md mx-auto">
                    <p class="text-slate-600 leading-relaxed text-sm">
                        Telah berjaya mengikuti dan menyelesaikan program 
                        <span class="font-semibold text-slate-800 italic">Daurah Al-Quran 2026</span> 
                        yang dianjurkan oleh Biro Pendidikan Masjid dengan jayanya.
                    </p>
                </div>
            </div>

            <div class="absolute bottom-[30mm] left-0 right-0 px-[20mm]">
                <div class="flex justify-between items-end border-t border-slate-100 pt-8">
                    
                    <div class="text-left space-y-1">
                        <p class="text-[10px] text-slate-400 uppercase tracking-tighter">Kumpulan:</p>
                        <p class="text-xs font-bold text-sky-700">${data.kumpulan}</p>
                        <p class="text-[10px] text-slate-400">Tarikh: 15 Mac 2026</p>
                    </div>

                    <div class="flex flex-col items-center">
                        <img src="logo_daurahquran.png" class="w-[80px] grayscale opacity-30 mb-2" alt="Program Logo">
                    </div>

                    <div class="text-center relative">
                        <img src="signature.png" class="w-[120px] absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none" alt="Tandatangan">
                        <div class="w-48 border-b border-slate-300 mb-2"></div>
                        <p class="text-[11px] font-bold text-slate-800 uppercase">Pengerusi Biro Pendidikan</p>
                        <p class="text-[9px] text-slate-400 uppercase tracking-widest">Daurah Al-Quran 2026</p>
                    </div>

                </div>
            </div>

            <div class="absolute bottom-4 right-8 opacity-10">
                <span class="text-[8px] font-mono tracking-tighter">DQ2026-REF-${data.ic.slice(-4)}</span>
            </div>

        </div>
    `;
}
