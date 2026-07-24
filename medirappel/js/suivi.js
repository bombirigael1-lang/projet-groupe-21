// MediRappel - Suivi et statistiques (suivi.html)

const NOMS_JOURS_COURT = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
const NOMS_JOURS_SUIVI = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const NOMS_MOIS_SUIVI = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function getDailyStats(days = 7) {
    const medicaments = getMedicaments();
    const totalParJour = medicaments.reduce((somme, med) => somme + ((med.horaires || []).length), 0);
    const historique = getHistorique();
    const today = new Date();
    const result = [];

    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = formatDateToString(d);
        const faites = historique.filter(h => h.date === dateStr).length;
        const pct = totalParJour > 0 ? Math.round((faites / totalParJour) * 100) : 0;

        result.push({ dateStr, label: NOMS_JOURS_COURT[d.getDay()], pct: Math.min(pct, 100) });
    }

    return result;
}

function afficherProgressRing() {
    const stats = getComplianceStats(7);
    const ring = document.getElementById('progress-ring');
    const pctEl = document.getElementById('progress-pct');
    if (!ring || !pctEl) return;

    const angle = Math.round(stats.tauxConformite * 3.6);
    ring.style.background = `conic-gradient(#1ba098 0deg ${angle}deg, #e5e5e5 ${angle}deg 360deg)`;
    pctEl.textContent = stats.tauxConformite + '%';

    const banner = document.getElementById('bravo-banner');
    if (banner) {
        if (stats.totalAttendus === 0) {
            banner.innerHTML = '';
        } else if (stats.tauxConformite >= 80) {
            banner.innerHTML = `<div class="alert alert-success">${icon('party')} <strong>Bravo !</strong> Vous avez pris ${stats.tauxConformite}% de vos médicaments cette semaine.</div>`;
        } else if (stats.tauxConformite >= 50) {
            banner.innerHTML = `<div class="alert alert-warning">Vous avez pris ${stats.tauxConformite}% de vos médicaments cette semaine. Encore un effort !</div>`;
        } else {
            banner.innerHTML = `<div class="alert alert-danger">Votre taux de conformité est de ${stats.tauxConformite}% cette semaine. N'hésitez pas à activer vos rappels.</div>`;
        }
    }
}


function afficherWeekChart() {
    const container = document.getElementById('week-chart');
    if (!container) return;

    const jours = getDailyStats(7);
    container.innerHTML = jours.map(j => `
        <div class="week-bar-col">
            <div class="week-bar ${j.pct < 50 ? 'low' : ''}" style="height: ${Math.max(j.pct, 4)}%;" title="${j.pct}%"></div>
            <div class="week-bar-label">${j.label}</div>
        </div>
    `).join('');
}

function afficherHistorique() {
    const container = document.getElementById('historique-container');
    const historique = getHistoriqueLastDays(7);

    if (historique.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>${icon('calendar')} Aucune prise enregistrée sur les 7 derniers jours. Marquez des prises depuis la page Rappels pour alimenter l’historique.</p></div>`;
        return;
    }

    const parDate = {};
    historique.forEach(h => {
        if (!parDate[h.date]) parDate[h.date] = [];
        parDate[h.date].push(h);
    });

    const dates = Object.keys(parDate).sort().reverse();
    let html = '';

    dates.forEach(date => {
        const d = new Date(date + 'T00:00:00');
        const dateFormatted = `${NOMS_JOURS_SUIVI[d.getDay()]} ${d.getDate()} ${NOMS_MOIS_SUIVI[d.getMonth()]} ${d.getFullYear()}`;

        html += `<h3 style="color: #14524b; margin-top: 2rem; margin-bottom: 1rem; border-bottom: 2px solid #1ba098; padding-bottom: 0.5rem;">${icon('calendar')} ${dateFormatted}</h3>`;

        parDate[date].forEach(prise => {
            html += `
                <div class="historique-item">
                    <div class="item-info">
                        <h3>${icon('pill')} ${prise.nomMedicament}</h3>
                        <p><strong>Horaire :</strong> ${prise.horaire.charAt(0).toUpperCase() + prise.horaire.slice(1)}</p>
                    </div>
                    <div class="item-actions">
                        <span class="status-badge status-done">${icon('check')} Effectuée</span>
                    </div>
                </div>
            `;
        });
    });

    container.innerHTML = html;
}


function actualiser() {
    afficherProgressRing();
    afficherWeekChart();
    afficherHistorique();
}

document.addEventListener('DOMContentLoaded', () => {
    actualiser();
});
