
document.addEventListener('DOMContentLoaded', function () {

    const data = [
        { sexe: "Masculin", salon: "Barber Classic", coiffeur: "Bob", services: ["Coupe", "Rasage"] },
        { sexe: "Féminin", salon: "Salon Luminance", coiffeur: "Alice", services: ["Coupe", "Coloration"] },
        { sexe: "Féminin", salon: "Salon Luminance", coiffeur: "Marie", services: ["Coupe", "Coloration", "Balayage"] },
        { sexe: "Masculin", salon: "Barber King", coiffeur: "Jean", services: ["Rasage", "Coupe"] },
        { sexe: "Unisexe", salon: "Studio Universel", coiffeur: "Alex", services: ["Stylisme", "Coupe"] },
        { sexe: "Féminin", salon: "Salon Luminance", coiffeur: "Sophie", services: ["Extension", "Coloration"] },
        { sexe: "Masculin", salon: "The Gentlemen", coiffeur: "Richard", services: ["Coupe", "Soins du visage"] },
        { sexe: "Unisexe", salon: "Chez Chris", coiffeur: "Chris", services: ["Coupe", "Coloration", "Soins du visage"] },
        { sexe: "Féminin", salon: "Diva Salon", coiffeur: "Clara", services: ["Manucure", "Pédicure"] },
        { sexe: "Masculin", salon: "Barber Classic", coiffeur: "Olivier", services: ["Rasage traditionnel", "Taille de barbe"] },
        { sexe: "Unisexe", salon: "Salon Moderne", coiffeur: "Jordan", services: ["Coupe moderne", "Coloration tendance"] },
        { sexe: "Féminin", salon: "Salon de Beauté", coiffeur: "Émilie", services: ["Soin du visage", "Massage capillaire"] }

    ];
    const sexeFilter = document.getElementById('sexeFilter');
    const salonFilter = document.getElementById('salonFilter');
    const coiffeurFilter = document.getElementById('coiffeurFilter');
    const serviceFilter = document.getElementById('serviceFilter');

    const salonFilterDiv = salonFilter.closest('.control');
    const coiffeurFilterDiv = coiffeurFilter.closest('.control');
    const serviceFilterDiv = serviceFilter.closest('.control');
    const filters = document.getElementById('filters'); 
    const dateSelection = document.getElementById('dateSelection'); 

    const nextStepBtn = document.getElementById('nextStepBtn');
    const leftSide = document.querySelector('.left-side'); 

    salonFilterDiv.style.display = 'none';
    coiffeurFilterDiv.style.display = 'none';
    serviceFilterDiv.style.display = 'none';
    nextStepBtn.style.display = 'none';

    // pour verifier si toutes les sélections ont été faites
    function checkAllSelections() {
        const sexeSelected = document.querySelector('input[name="sexe"]:checked') !== null;
        const salonSelected = salonFilter.value !== "";
        const coiffeurSelected = coiffeurFilter.value !== "";
        const serviceSelected = serviceFilter.value !== "";

        // affiche le bouton etape suivante quand toutes les selections faites
        if (sexeSelected && salonSelected && coiffeurSelected && serviceSelected) {
            nextStepBtn.style.display = 'block';
        } else {
            nextStepBtn.style.display = 'none';
        }
    }

    // écouteurs d'événements pour vérifier les sélections à chaque modification
    document.querySelectorAll('input[name="sexe"]').forEach((radio) => {
        radio.addEventListener('change', checkAllSelections);
    });

    salonFilter.addEventListener('change', checkAllSelections);
    coiffeurFilter.addEventListener('change', checkAllSelections);
    serviceFilter.addEventListener('change', checkAllSelections);

    document.querySelectorAll('input[name="sexe"]').forEach((radio) => {
        radio.addEventListener('change', function () {
            if (this.checked) {
                fillSalonDropdown(this.value); // remplir le sélecteur par le sexe
                salonFilterDiv.style.display = 'block'; // affiche le prochain choix (salon)
                salonFilter.disabled = false; // active le sélecteur de salon
            }
        });
    });

    salonFilter.addEventListener('change', function () {
        if (this.value) {
            fillCoiffeurDropdown(this.value); // remplir le sélecteur par coiffeur
            coiffeurFilterDiv.style.display = 'block'; // affiche le prochain choix (coiffeur)
            coiffeurFilter.disabled = false; // active le sélecteur de coiffeur
        }
    });

    coiffeurFilter.addEventListener('change', function () {
        if (this.value) {
            fillServiceDropdown(this.value); // remplir le sélecteur dpar service
            serviceFilterDiv.style.display = 'block'; // affiche le prochain choix (service)
            serviceFilter.disabled = false; // active le sélecteur de service
        }
    });

    function fillSalonDropdown(sexe) {
        const salons = [...new Set(data.filter(item => item.sexe === sexe).map(item => item.salon))];
        const salonDropdown = document.getElementById('salonFilter');
        salonDropdown.innerHTML = '<option value="">Sélectionnez le Salon</option>';
        salons.forEach(salon => {
            salonDropdown.innerHTML += `<option value="${salon}">${salon}</option>`;
        });
        salonDropdown.disabled = false;
    }

    function fillCoiffeurDropdown(salon) {
        const coiffeurs = [...new Set(data.filter(item => item.salon === salon).map(item => item.coiffeur))];
        const coiffeurDropdown = document.getElementById('coiffeurFilter');
        coiffeurDropdown.innerHTML = '<option value="">Sélectionnez le Coiffeur</option>';
        coiffeurs.forEach(coiffeur => {
            coiffeurDropdown.innerHTML += `<option value="${coiffeur}">${coiffeur}</option>`;
        });
        coiffeurDropdown.disabled = false;
    }

    function fillServiceDropdown(coiffeur) {
        const services = data.find(item => item.coiffeur === coiffeur).services;
        const serviceDropdown = document.getElementById('serviceFilter');
        serviceDropdown.innerHTML = '<option value="">Sélectionnez le Service</option>';
        services.forEach(service => {
            serviceDropdown.innerHTML += `<option value="${service}">${service}</option>`;
        });
        serviceDropdown.disabled = false;
    }

    const datesContainer = document.getElementById('dateSelection');
    const moreTimesBtn = document.getElementById('moreTimesBtn');
    const titreHoraire = document.getElementById('selecthoraire');
    const titreRdv = document.getElementById('rdv');

    dateSelection.style.display = 'none';
    moreTimesBtn.style.display = 'none';
    titreHoraire.style.display = 'none';
    titreRdv.style.display = 'block';
    // Exemple de dates à afficher
    const dates = [
        "04/22/24 13:00", "04/22/24 14:00", "04/22/24 15:00",
        "04/23/24 10:00", "04/23/24 11:00", "04/23/24 12:00",
        "04/24/24 09:00", "04/24/24 11:00", "04/24/24 14:00",
        "04/25/24 10:00", "04/25/24 12:00", "04/25/24 15:00",
        "04/26/24 09:30", "04/26/24 11:30", "04/26/24 14:30",
        "04/27/24 10:30", "04/28/24 13:30", "04/28/24 15:00"
    ];

    let currentIndex = 0; // pour suivre le nombre de plages affichées
    nextStepBtn.addEventListener('click', function () {
        // cacher les filtres et afficher les plages
        filters.style.display = 'none';
        titreRdv.style.display = 'none';
        dateSelection.style.display = 'block';
        moreTimesBtn.style.display = 'block';
        titreHoraire.style.display = 'block';


        // Remplissez et affichez les premières plages horaires disponibles
        showNextDates();
        moreTimesBtn.addEventListener('click', showNextDates);

    });

    //pour afficher les plages horaires
    function showNextDates() {
        const nextIndex = Math.min(currentIndex + 5, dates.length); // limite de 5 dates
        for (let i = currentIndex; i < nextIndex; i++) {
            const date = dates[i];
            const label = document.createElement('label');
            label.style.fontSize = '20px'
            label.style.lineHeight = '1.8'
            label.className = 'radio';
            label.innerHTML = `<input type="radio" name="date" value="${date}"> ${date}`;
            label.querySelector('input').addEventListener('change', function () {
                updateSummaryWithDate(this.value);
            });
            datesContainer.appendChild(label);
        }
        currentIndex = nextIndex;

        // afficher ou masquer le bouton "Voir plus" si besoin
        moreTimesBtn.style.display = currentIndex < dates.length ? 'block' : 'none';
    }
    //pr afficher les selections
    function showSelections() {
        const salon = document.getElementById('salonFilter').value;
        const coiffeur = document.getElementById('coiffeurFilter').value;
        const service = document.getElementById('serviceFilter').value;

        // creer le summary des selections
        const summary = document.createElement('div');
        summary.id = 'summary'; 
        summary.innerHTML = `
            <p><strong>Salon</strong><br> ${salon}</p>
            <p><strong>Coiffeur</strong><br> ${coiffeur}</p>
            <p><strong>Service</strong><br> ${service}</p>
        `;

        // inserer le summary dans cote droit
        const rightSide = document.querySelector('.right-side');
        rightSide.innerHTML = ''; 
        rightSide.appendChild(summary);
    }

    nextStepBtn.addEventListener('click', function () {
        // cacher les autres elements pr montrer les plages horaire
        filters.style.display = 'none';
        dateSelection.style.display = 'block';
        moreTimesBtn.style.display = 'block';

        showNextDates();
        moreTimesBtn.addEventListener('click', showNextDates);

        // Afficher les sélections sur le côté droit
        showSelections();
    });
    function updateSummaryWithDate(date) {
        const summary = document.querySelector('#summary');
        if (!summary) {
            //rien si ya pas de summary
            return;
        }

        // Recherchez un paragraphe existant pour la date et mettez-le à jour ou créez-en un nouveau
        let dateParagraph = summary.querySelector('#selectedDate');
        if (!dateParagraph) {
            dateParagraph = document.createElement('p');
            dateParagraph.id = 'selectedDate';
            summary.appendChild(dateParagraph);
        }
        dateParagraph.innerHTML = `<strong>Date<br></strong> ${date}`;

        let confirmButton = summary.querySelector('#confirmButton');
        if (!confirmButton) {
            confirmButton = document.createElement('button');
            confirmButton.id = 'confirmButton';
            confirmButton.textContent = 'Confirmer le rendez-vous';
            confirmButton.className = 'button is-primary';
            confirmButton.style.marginTop = '20px';
            summary.appendChild(confirmButton);

            confirmButton.addEventListener('click', function () {
                alert('Rendez-vous confirmé !');
            });
        }
    }

});