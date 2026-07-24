// MediRappel - Espace aidant (aidant.html)
// Vue en lecture seule pour les aidants

const NOMS_JOURS_AIDANT = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const NOMS_MOIS_AIDANT = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];


function calculerPrisesAidant() {
    const medicaments = getMedicaments();
    const prises = [];

    medicaments.forEach(med => {
        (med.horaires || []).forEach(horaire => {
            const estFaite = isPriseFaite(med.id, horaire);
            const estEnRetard = !estFaite && isLate(horaire);
            const timeInfo = getDefaultTimeForHoraire(horaire);

            prises.push({
                med,
                horaire,
                estFaite,
                estEnRetard,
                minutes: timeInfo.hours * 60 + timeInfo.minutes,
                timeStr: formatTime(timeInfo.hours, timeInfo.minutes)
            });
        });
    });

    prises.sort((a, b) => a.minutes - b.minutes);
    return prises;
}


function afficherChipsAidant(prises) {
    const container = document.getElementById('aidant-chips');
    if (!container) return;

    if (prises.length === 0) {
        container.innerHTML = '';
        return;
    }

    const faites = prises.filter(p => p.estFaite).length;
    const enRetard = prises.filter(p => p.estEnRetard).length;
    const aVenir = prises.filter(p => !p.estFaite && !p.estEnRetard).length;

    container.innerHTML = `
        <div class="aidant-chip faite">
            <div class="num">${faites}</div>
            <div class="lbl">${icon('check')} Prise(s) effectuée(s)</div>
        </div>
        <div class="aidant-chip venir">
            <div class="num">${aVenir}</div>
            <div class="lbl">${icon('clock')} À venir</div>
        </div>
        <div class="aidant-chip retard">
            <div class="num">${enRetard}</div>
            <div class="lbl">${icon('alert-triangle')} En retard</div>
        </div>
    `;
}

function afficherPrisesAidant() {
    const container = document.getElementById('prises-aidant');
    const titreJour = document.getElementById('titre-jour-aidant');

    const today = new Date();
    const dateStr = `${NOMS_JOURS_AIDANT[today.getDay()]} ${today.getDate()} ${NOMS_MOIS_AIDANT[today.getMonth()]} ${today.getFullYear()}`;
    titreJour.textContent = `Consultation en lecture seule — ${dateStr}`;

    const medicaments = getMedicaments();
    if (medicaments.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>${icon('x-circle')} Aucun médicament enregistré.</p></div>`;
        document.getElementById('aidant-chips').innerHTML = '';
        return;
    }

    const prises = calculerPrisesAidant();
    afficherChipsAidant(prises);

    let html = '';
    prises.forEach(p => {
        let statusClass = 'venir';
        let statusText = `${icon('clock')} À venir`;

        if (p.estFaite) {
            statusClass = 'faite';
            statusText = `${icon('check')} Pris`;
        } else if (p.estEnRetard) {
            statusClass = 'retard';
            statusText = `${icon('alert-triangle')} En retard`;
        }

        html += `
            <div class="prise-row ${statusClass}">
                <div class="prise-time">${p.timeStr}</div>
                <div class="prise-info">
                    <strong>${icon('pill')} ${p.med.nom}</strong> — ${p.med.dosage}
                    <div style="font-size: 0.85rem; color: #888;">${p.horaire.charAt(0).toUpperCase() + p.horaire.slice(1)}</div>
                </div>
                <span class="prise-badge ${statusClass}">${statusText}</span>
            </div>
        `;
    });

    container.innerHTML = html;
}


let updateInterval = null;

function demarrerActualisation() {
    afficherPrisesAidant();
    updateInterval = setInterval(() => {
        afficherPrisesAidant();
    }, 60000);
}

function arreterActualisation() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    demarrerActualisation();
});

window.addEventListener('beforeunload', () => {
    arreterActualisation();
});

window.addEventListener('pageshow', () => {
    demarrerActualisation();
});

