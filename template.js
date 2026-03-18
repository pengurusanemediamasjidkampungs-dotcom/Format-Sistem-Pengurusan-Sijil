/**
 * TEMPLATE ENGINE - template.js
 * Rekaan: Premium Minimalist (Sky Blue Edition)
 * Fokus: Kebolehbacaan tinggi, jimat dakwat (Ink Saver), dan kemas.
 */

function createCertTemplate(data, orientation = 'portrait') {
    // 1. Ketetapan Dimensi & Orientasi
    const isLandscape = orientation === 'landscape';
    const orientationClass = isLandscape ? 'landscape' : 'portrait';
    
    // 2. Logik Saiz Font Dinamik (Anti-Pecah Barisan)
    let nameFontSize;
    const nameLength = data.nama.length;
    
    if (nameLength > 35) {
        nameFontSize = 'text-[18pt]'; // Nama sangat panjang
    } else if (nameLength > 25) {
        nameFontSize = 'text-[22pt]'; // Nama sederhana panjang
    } else {
        nameFontSize = 'text-[28pt]'; // Nama standard
    }

    // 3. Render Struktur Sijil
    return `
        <div class="certificate ${orientationClass} bg-white text-slate-900 relative overflow-hidden shadow-2xl mx-auto my-4 border-[12px] border-double border-sky-100 print:shadow-none print:border-none print:my-0" 
             style="width: 210mm; height: 297mm; padding: 20mm; font-family: 'Inter', sans-serif; box-sizing: border-box;">
            
            <div class="absolute -top-24 -right-24 w-80 h-80 bg-sky-50/50 rounded-full blur-[100px] print:hidden"></div>
            <div class="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-50/50 rounded-full blur-[100px] print:hidden"></div>

            <div class="relative z-10 flex flex-col items-center text-center space-y-5 mb-14">
                <img src="logo_masjid.png" class="w-[160px] h-auto object-contain mb-2" alt="Logo Masjid">
                <img src="khatmklsb.png" class="w-[280px] h-auto object-contain" alt="Khat Masjid">
                <div class="h-[2px] w-32 bg-gradient-to-r from-transparent via-sky-400 to-transparent mt-2"></div>
            </div>

            <div class="relative z-10 text-center space-y-10">
                <div class="space-y-2">
                    <h1 class="text-sky-600 font-semibold tracking-[0.4em] uppercase text-[11px]">Sijil Penghargaan & Penyertaan</h1>
                    <p class="text-slate-400 text-[10px] tracking-[0.2em] uppercase">No. Rujukan: DQ/2026/${data.ic.slice(-4)}</p>
                </div>
                
                <div class="py-8">
                    <p class="text-slate-500 text-xs tracking-widest uppercase mb-6">Dengan ini disahkan bahawa</p>
                    <div class="min-h-[80px] flex items-center justify-center">
                        <h2 class="${nameFontSize} font-bold text-slate-800 tracking-tight uppercase leading-tight drop-shadow-sm px-4">
                            ${data.nama}
                        </h2>
                    </div>
                    <p class="text-sky-600/70 font-mono text-sm mt-4 font-medium tracking-wider">${data.ic}</p>
                </div>

                <div class="max-w-lg mx-auto">
                    <p class="text-slate-600 leading-relaxed text-[13px]">
                        Telah berjaya mengikuti dan menyelesaikan kursus 
                        <span class="font-bold text-slate-800 italic underline decoration-sky-200 underline-offset-4">Daurah Al-Quran 2026</span> 
                        anjuran Biro Pendidikan Masjid dengan jayanya pada sesi Februari - Mac 2026.
                    </p>
                </div>
            </div>

            <div class="absolute bottom-[35mm] left-0 right-0 px-[25mm]">
                <div class="flex justify-between items-end border-t border-slate-100 pt-10">
                    
                    <div class="text-left space-y-1">
                        <p class="text-[9px] text-slate-400 uppercase tracking-widest font-medium">Kumpulan</p>
                        <p class="text-[13px] font-bold text-sky-700 tracking-tight">${data.kumpulan}</p>
                        <p class="text-[10px] text-slate-500 mt-2">Tarikh: 15 Mac 2026</p>
                    </div>

                    <div class="flex flex-col items-center opacity-40">
                        <img src="logo_daurahquran.png" class="w-[70px] h-auto grayscale" alt="Program Logo">
                    </div>

                    <div class="text-center relative min-w-[200px]">
                        <img src="signature.png" class="w-[140px] absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none select-none" alt="Tandatangan">
                        
                        <div class="w-full border-b border-slate-300 mb-3"></div>
                        <p class="text-[11px] font-bold text-slate-800 uppercase tracking-tighter leading-none">Pengerusi Biro Pendidikan</p>
                        <p class="text-[9px] text-slate-400 uppercase tracking-[0.2em] mt-1">Daurah Al-Quran 2026</p>
                    </div>

                </div>
            </div>

            <div class="absolute bottom-6 left-0 right-0 flex justify-center opacity-20 no-print">
                <span class="text-[7px] font-mono tracking-[0.5em] text-slate-400 italic">GENERATED VIA SISTEM PENGURUSAN SIJIL V2.1 BY AIMAN RAFEE</span>
            </div>

        </div>
    `;
}
