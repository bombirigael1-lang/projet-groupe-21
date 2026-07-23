
// MediRappel - Gestion des rappels et calendrier (calendrier.html)

let updateInterval = null;
let filtreActuel = 'toutes';

const NOMS_JOURS_CAL = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const NOMS_MOIS_CAL = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function calculerRappelsDuJour() {
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
function afficherRappelsDuJour() {
    const medicaments = getMedicaments();
    const container = document.getElementById('rappels-du-jour');
    const titreJour = document.getElementById('titre-jour');
    const messageStatut = document.getElementById('message-statut');

    const today = new Date();
    const dateStr = `${NOMS_JOURS_CAL[today.getDay()]} ${today.getDate()} ${NOMS_MOIS_CAL[today.getMonth()]} ${today.getFullYear()}`;
    titreJour.textContent = 'Mes prises du jour';

    if (medicaments.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Veuillez <a href="medicaments.html" style="color: #1ba098; font-weight: bold;">ajouter vos médicaments</a> d'abord.</p>
            </div>
        `;
        messageStatut.textContent = '';
        return;
    }

    const toutesLesPrises = calculerRappelsDuJour();
    const nbTotal = toutesLesPrises.length;
    const nbFaites = toutesLesPrises.filter(p => p.estFaite).length;

    // Message de statut global
    const pourcentage = nbTotal > 0 ? Math.round((nbFaites / nbTotal) * 100) : 0;
    messageStatut.innerHTML = `${dateStr} — <strong>${icon('bar-chart')} Progression :</strong> ${nbFaites}/${nbTotal} médicament(s) pris (${pourcentage}%)`;
    if (pourcentage === 100) {
        messageStatut.style.color = '#28a745';
    } else if (pourcentage >= 50) {
        messageStatut.style.color = '#f0ad4e';
    } else {
        messageStatut.style.color = '#d9534f';
    }

    // Applique le filtre de l'onglet actif
    const prisesAffichees = toutesLesPrises.filter(p => {
        if (filtreActuel === 'toutes') return true;
        if (filtreActuel === 'venir') return !p.estFaite && !p.estEnRetard;
        if (filtreActuel === 'retard') return p.estEnRetard;
        if (filtreActuel === 'faites') return p.estFaite;
        return true;
    });

    if (prisesAffichees.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Aucune prise dans cette catégorie.</p></div>';
        return;
    }

    let html = '';
    prisesAffichees.forEach(p => {
        let statusClass = 'venir';
        let statusText = `${icon('clock')} À venir`;
        let actionBtn = `<button class="btn btn-success" onclick="marquerCommeEffectuee('${p.med.id}', '${p.horaire}', '${p.med.nom.replace(/'/g, "\\'")}')">${icon('check')} J'ai pris ce médicament</button>`;

        if (p.estFaite) {
            statusClass = 'faite';
            statusText = `${icon('check')} Prise effectuée`;
            actionBtn = '';
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
                ${actionBtn}
            </div>
        `;
    });

    container.innerHTML = html;
}


function marquerCommeEffectuee(medicamentId, horaire, nomMedicament) {
    const today = formatDateToString();

    if (isPriseFaite(medicamentId, horaire)) {
        alert('Cette prise a déjà été marquée comme effectuée.');
        return;
    }

    markAsDone(medicamentId, nomMedicament, horaire, today);

    const successMsg = document.createElement('div');
    successMsg.className = 'alert alert-success';
    successMsg.style.position = 'fixed';
    successMsg.style.top = '20px';
    successMsg.style.right = '20px';
    successMsg.style.zIndex = '1000';
    successMsg.innerHTML = `${icon('check')} ${nomMedicament} marqué comme pris !`;
    document.body.appendChild(successMsg);

    setTimeout(() => successMsg.remove(), 3000);

    afficherRappelsDuJour();
}


function changerFiltre(filtre) {
    filtreActuel = filtre;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filtre);
    });
    afficherRappelsDuJour();
}

function demarrerVerificationHeure() {
    afficherRappelsDuJour();
    updateInterval = setInterval(() => {
        afficherRappelsDuJour();
    }, 60000);
}

function arreterVerificationHeure() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => changerFiltre(btn.dataset.filter));
    });

    demarrerVerificationHeure();
});

window.addEventListener('beforeunload', () => {
    arreterVerificationHeure();
});

window.addEventListener('pageshow', () => {
    demarrerVerificationHeure();
});
