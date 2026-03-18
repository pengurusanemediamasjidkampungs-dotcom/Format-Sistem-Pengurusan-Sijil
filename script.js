// 1. Logik Antaramuka (Alpine.js Data)
document.addEventListener('alpine:init', () => {
    Alpine.data('systemStatus', () => ({
        active: false,
        pulse: false,
        toggleActive() {
            this.active = !this.active;
            this.pulse = true;
            setTimeout(() => this.pulse = false, 500);
            
            if (this.active) {
                console.log("Sistem Sijil: Online");
                // Panggil fungsi muat data jika perlu
            }
        }
    }));
});

// 2. Integrasi Data & Fungsi Sijil (Sedia Ada)
let masterData = [];

async function loadData() {
    // ... kod loadData anda yang sedia ada ...
}

// Tambah fungsi-fungsi lain (hantarKeTelegram, filterData, etc) di bawah ini
