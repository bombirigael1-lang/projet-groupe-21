
const storageMemory = {};

/**
 * Lit une valeur depuis le stockage avec une sauvegarde de secours en mémoire.
 * @param {string} key - Clé de stockage
 * @param {*} fallback - Valeur par défaut
 * @returns {*} Valeur lue ou valeur par défaut
 */
function getStoredValue(key, fallback = []) {
    try {
        if (typeof window === 'undefined' || !window.localStorage) {
            return storageMemory[key] ?? fallback;
        }

        const data = window.localStorage.getItem(key);
        if (data === null || data === undefined || data === '') {
            return fallback;
        }

        const parsed = JSON.parse(data);
        storageMemory[key] = parsed;
        return parsed;
    } catch (error) {
        console.warn(`Impossible de lire la clé ${key} depuis le stockage.`, error);
        return storageMemory[key] ?? fallback;
    }
}

/**
 * Écrit une valeur dans le stockage avec sauvegarde en mémoire.
 * @param {string} key - Clé de stockage
 * @param {*} value - Valeur à enregistrer
 * @returns {boolean} true si l'enregistrement a réussi
 */
function setStoredValue(key, value) {
    try {
        if (typeof window === 'undefined' || !window.localStorage) {
            storageMemory[key] = value;
            return false;
        }

        window.localStorage.setItem(key, JSON.stringify(value));
        storageMemory[key] = value;
        return true;
    } catch (error) {
        console.warn(`Impossible d'écrire la clé ${key} dans le stockage.`, error);
        storageMemory[key] = value;
        return false;
    }
}


function getMedicaments() {
    return getStoredValue('medirappel_medicaments', []);
}


function saveMedicaments(medicaments) {
    setStoredValue('medirappel_medicaments', Array.isArray(medicaments) ? medicaments : []);
}


function addMedicament(nom, dosage, horaires) {
    const medicaments = getMedicaments();
    const id = Date.now().toString();
    const nouveauMedicament = {
        id,
        nom: nom.trim(),
        dosage: dosage.trim(),
        horaires: horaires || []
    };
    medicaments.push(nouveauMedicament);
    saveMedicaments(medicaments);
    return nouveauMedicament;
}


function deleteMedicament(medicamentId) {
    let medicaments = getMedicaments();
    medicaments = medicaments.filter(m => m.id !== medicamentId);
    saveMedicaments(medicaments);
}


function getMedicamentById(medicamentId) {
    const medicaments = getMedicaments();
    return medicaments.find(m => m.id === medicamentId) || null;
}


function getHistorique() {
    return getStoredValue('medirappel_historique', []);
}


function saveHistorique(historique) {
    setStoredValue('medirappel_historique', Array.isArray(historique) ? historique : []);
}


function markAsDone(medicamentId, nomMedicament, horaire, date) {
    const historique = getHistorique();
    const id = Date.now().toString();
    const record = {
        id,
        medicamentId,
        nomMedicament,
        horaire,
        date,
        statut: 'faite',
        timestamp: new Date().toISOString()
    };
    historique.push(record);
    saveHistorique(historique);
    return record;
}


function getHistoriqueByDate(date) {
    const historique = getHistorique();
    return historique.filter(h => h.date === date);
}


function getHistoriqueLastDays(days = 7) {
    const historique = getHistorique();
    const today = new Date();
    const endDate = new Date(today);
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date(today);
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(today.getDate() - days + 1);

    return historique.filter(h => {
        const hDate = new Date(`${h.date}T00:00:00`);
        return hDate >= startDate && hDate <= endDate;
    });
}


function getComplianceStats(days = 7) {
    const medicaments = getMedicaments();
    const historique = getHistoriqueLastDays(days);

    const today = new Date();
    const startDate = new Date(today);
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(today.getDate() - days + 1);

    let totalAttendus = 0;
    let totalFaites = 0;

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
        const dateStr = formatDateToString(d);

        medicaments.forEach(med => {
            const horaires = Array.isArray(med.horaires) ? med.horaires : [];
            totalAttendus += horaires.length;
        });

        const prisesAujourdhui = historique.filter(entry => entry.date === dateStr);
        totalFaites += prisesAujourdhui.length;
    }

    const taux = totalAttendus > 0 ? Math.round((totalFaites / totalAttendus) * 100) : 0;

    return {
        totalAttendus,
        totalFaites,
        tauxConformite: taux,
        percent: taux + '%'
    };
}


function formatDateToString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


function formatTime(hours = 0, minutes = 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function getDefaultTimeForHoraire(horaire) {
    const times = {
        'matin': { hours: 7, minutes: 0 },
        'midi': { hours: 12, minutes: 0 },
        'soir': { hours: 19, minutes: 0 },
        'nuit': { hours: 22, minutes: 0 }
    };
    return times[horaire] || { hours: 12, minutes: 0 };
}


function isLate(horaire) {
    const now = new Date();
    const horaireTime = getDefaultTimeForHoraire(horaire);
    const scheduledTime = new Date();
    scheduledTime.setHours(horaireTime.hours, horaireTime.minutes, 0);

    // Retard si plus de 30 minutes après l'heure prévue et prise non faite
    const diff = now.getTime() - scheduledTime.getTime();
    const thirtyMinutesMs = 30 * 60 * 1000;
    
    return diff > thirtyMinutesMs;
}


function isPriseFaite(medicamentId, horaire) {
    const today = formatDateToString();
    const historique = getHistoriqueByDate(today);
    return historique.some(h => h.medicamentId === medicamentId && h.horaire === horaire);
}


function exportData() {
    return JSON.stringify({
        medicaments: getMedicaments(),
        historique: getHistorique(),
        exportDate: new Date().toISOString()
    }, null, 2);
}


function importData(jsonData) {
    try {
        const data = JSON.parse(jsonData);
        if (data.medicaments) saveMedicaments(data.medicaments);
        if (data.historique) saveHistorique(data.historique);
        return true;
    } catch (e) {
        console.error('Erreur lors de l\'import des données:', e);
        return false;
    }
}
