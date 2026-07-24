
function afficherMedicaments() {
    const medicaments = getMedicaments();
    const container = document.getElementById('medicaments-list');
    const compteur = document.getElementById('nb-medicaments');
    if (compteur) compteur.textContent = medicaments.length;

    if (medicaments.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>${icon('x-circle')} Aucun médicament enregistré. Veuillez en ajouter un.</p></div>`;
        return;
    }

    let html = '';
    medicaments.forEach(med => {
        const horairesList = (med.horaires || [])
            .map(h => h.charAt(0).toUpperCase() + h.slice(1))
            .join(', ');

        html += `
            <div class="medicament-item">
                <div class="item-info">
                    <h3>${icon('pill')} ${med.nom}</h3>
                    <p><strong>Dosage :</strong> ${med.dosage}</p>
                    <p><strong>À prendre :</strong> ${horairesList}</p>
                </div>
                <div class="item-actions">
                    <button class="btn btn-secondary" onclick="modifierMedicament('${med.id}')">${icon('edit')} Modifier</button>
                    <button class="btn btn-danger" onclick="supprimerMedicament('${med.id}')">${icon('trash')} Supprimer</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}


function modifierMedicament(medicamentId) {
    const medicament = getMedicamentById(medicamentId);
    if (!medicament) return;

    document.getElementById('edit-id').value = medicament.id;
    document.getElementById('nom').value = medicament.nom;
    document.getElementById('dosage').value = medicament.dosage;

    document.querySelectorAll('input[name="horaires"]').forEach(cb => {
        cb.checked = (medicament.horaires || []).includes(cb.value);
    });

    document.getElementById('form-title').textContent = `Modifier « ${medicament.nom} »`;
    document.getElementById('submit-btn').innerHTML = `${icon('save')} Enregistrer les modifications`;
    document.getElementById('cancel-edit-btn').style.display = 'inline-block';

    document.getElementById('form-medicament').scrollIntoView({ behavior: 'smooth', block: 'start' });
}


function annulerEdition() {
    document.getElementById('form-medicament').reset();
    document.getElementById('edit-id').value = '';
    document.getElementById('form-title').textContent = 'Ajouter un nouveau médicament';
    document.getElementById('submit-btn').innerHTML = `${icon('plus')} Ajouter le médicament`;
    document.getElementById('cancel-edit-btn').style.display = 'none';
}


function ajouterMedicament(e) {
    e.preventDefault();

    const nom = document.getElementById('nom').value;
    const dosage = document.getElementById('dosage').value;
    const editId = document.getElementById('edit-id').value;

    const horaireCheckboxes = document.querySelectorAll('input[name="horaires"]:checked');
    const horaires = Array.from(horaireCheckboxes).map(cb => cb.value);

    if (horaires.length === 0) {
        alert('Veuillez sélectionner au moins un horaire.');
        return;
    }

    let messageSucces = '';

    if (editId) {
        
        const medicaments = getMedicaments();
        const index = medicaments.findIndex(m => m.id === editId);
        if (index !== -1) {
            medicaments[index] = { ...medicaments[index], nom: nom.trim(), dosage: dosage.trim(), horaires };
            saveMedicaments(medicaments);
            messageSucces = `${icon('check')} "${nom}" a été modifié avec succès !`;
        }
        annulerEdition();
    } else {
       
        addMedicament(nom, dosage, horaires);
        document.getElementById('form-medicament').reset();
        messageSucces = `${icon('check')} "${nom}" a été ajouté avec succès !`;
    }

    afficherMedicaments();

    const container = document.getElementById('medicaments-list');
    const successMsg = document.createElement('div');
    successMsg.className = 'alert alert-success';
    successMsg.innerHTML = messageSucces;
    container.parentNode.insertBefore(successMsg, container);

    setTimeout(() => successMsg.remove(), 3000);
}


function supprimerMedicament(medicamentId) {
    const medicament = getMedicamentById(medicamentId);
    if (!medicament) return;

    if (confirm(`Êtes-vous sûr de vouloir supprimer "${medicament.nom}" ?`)) {
        deleteMedicament(medicamentId);

        
        if (document.getElementById('edit-id').value === medicamentId) {
            annulerEdition();
        }

        afficherMedicaments();

        const container = document.getElementById('medicaments-list');
        const deleteMsg = document.createElement('div');
        deleteMsg.className = 'alert alert-info';
        deleteMsg.innerHTML = `${icon('check')} "${medicament.nom}" a été supprimé.`;
        container.parentNode.insertBefore(deleteMsg, container);

        setTimeout(() => deleteMsg.remove(), 3000);
    }
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-medicament');
    if (form) {
        form.addEventListener('submit', ajouterMedicament);
    }

    const cancelBtn = document.getElementById('cancel-edit-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', annulerEdition);
    }

    afficherMedicaments();
});

