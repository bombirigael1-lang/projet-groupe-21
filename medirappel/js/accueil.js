// MediRappel - Script pour la page d'accueil

const NOMS_JOURS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const NOMS_MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];


function calculerPrisesJour() {
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


function afficherDateDuJour() {
    const el = document.getElementById('date-du-jour');
    if (!el) return;
    const today = new Date();
    el.textContent = `${NOMS_JOURS[today.getDay()]} ${today.getDate()} ${NOMS_MOIS[today.getMonth()]} ${today.getFullYear()}`;
}

function afficherStatsAccueil(prises) {
    const container = document.getElementById('home-stats');
    if (!container) return;

    if (prises.length === 0) {
        container.innerHTML = '';
        return;
    }

    const restantes = prises.filter(p => !p.estFaite).length;
    const prochaine = prises.find(p => !p.estFaite);
    const enRetard = prises.filter(p => p.estEnRetard);

    let html = `
        <div class="home-stat">
            <div class="value">${restantes}</div>
            <div class="label">Prise${restantes > 1 ? 's' : ''} restante${restantes > 1 ? 's' : ''} aujourd'hui</div>
        </div>
        <div class="home-stat">
            <div class="value">${prochaine ? prochaine.timeStr : icon('check')}</div>
            <div class="label">${prochaine ? 'Prochaine prise — ' + prochaine.med.nom : 'Toutes les prises sont faites'}</div>
        </div>
    `;

    if (enRetard.length > 0) {
        html += `
            <div class="home-stat alert">
                <div class="value">${icon('alert-triangle')} Rappel important</div>
                <div>${enRetard.map(p => p.med.nom).join(', ')} en retard — pensez à prendre votre médicament dès maintenant.</div>
            </div>
        `;
    }

    container.innerHTML = html;
}


function afficherPrisesDuJourAccueil() {
    afficherDateDuJour();

    const container = document.getElementById('prises-du-jour');
    const prises = calculerPrisesJour();

    if (prises.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>${icon('x-circle')} Aucun médicament enregistré.</p>
                <a href="medicaments.html" class="btn btn-primary" style="display: inline-block; margin-top: 1rem;">
                    ${icon('plus')} Ajouter un médicament
                </a>
            </div>
        `;
        return;
    }

    afficherStatsAccueil(prises);

    let html = '';
    prises.forEach(p => {
        let statusClass = 'venir';
        let statusText = `${icon('clock')} À venir`;

        if (p.estFaite) {
            statusClass = 'faite';
            statusText = `${icon('check')} Faite`;
        } else if (p.estEnRetard) {
            statusClass = 'retard';
            statusText = `${icon('alert-triangle')} En retard`;
        }

        const nomEchappe = p.med.nom.replace(/'/g, "\\'");

        html += `
            <div class="prise-row ${statusClass}">
                <div class="prise-time">${p.timeStr}</div>
                <div class="prise-info">
                    <strong>${icon('pill')} ${p.med.nom}</strong> — ${p.med.dosage}
                    <div style="font-size: 0.85rem; color: #888;">${p.horaire.charAt(0).toUpperCase() + p.horaire.slice(1)}</div>
                </div>
                <span class="prise-badge ${statusClass}">${statusText}</span>
                ${!p.estFaite ? `<button class="btn btn-success" onclick="marquerDepuisAccueil('${p.med.id}', '${p.horaire}', '${nomEchappe}')">${icon('check')} J'ai pris</button>` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
}


function marquerDepuisAccueil(medicamentId, horaire, nomMedicament) {
    if (isPriseFaite(medicamentId, horaire)) return;
    markAsDone(medicamentId, nomMedicament, horaire, formatDateToString());
    afficherPrisesDuJourAccueil();
}


document.addEventListener('DOMContentLoaded', afficherPrisesDuJourAccueil);
