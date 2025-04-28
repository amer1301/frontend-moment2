const apiUrl = 'http://localhost:3000/api/workexperience';

// DOMContentLoaded – när sidan är färdigladdad
document.addEventListener('DOMContentLoaded', function() {
    const list = document.getElementById('workExperienceList');
    if (list) {
        fetchWorkExperience();
    }
});

// Hämta alla arbetserfarenheter
function fetchWorkExperience() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const list = document.getElementById('workExperienceList');
            list.innerHTML = ''; // Töm listan

            if (data.length === 0) {
                list.innerHTML = '<li>Inga arbetserfarenheter tillagda än.</li>';
            } else {
                data.forEach(item => {
                    const li = document.createElement('li');

                    const formattedStartDate = new Date(item.startdate).toLocaleDateString('sv-SE');
                    let formattedEndDate = 'Pågående';

                    if (item.enddate) {
                        const parsedEndDate = new Date(item.enddate);
                        if (!isNaN(parsedEndDate)) {
                            formattedEndDate = parsedEndDate.toLocaleDateString('sv-SE');
                        }
                    }

                    li.innerHTML = `
                        <strong>${item.companyname}</strong> (${item.jobtitle})<br>
                        <strong>Plats: </strong>${item.location}<br> 
                        <strong>Start: </strong>${formattedStartDate}<br>
                        <strong>Slut: </strong>${formattedEndDate}<br>
                        <strong>Beskrivning: </strong>${item.description}<br>
                        <button onclick="deleteWorkExperience('${item._id}')">Ta bort</button>
                    `;
                    list.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            showFeedback("Kunde inte hämta arbetserfarenheter. Kontrollera anslutningen till API:t.", "error");
        });
}

// Ta bort en arbetserfarenhet
function deleteWorkExperience(id) {
    const feedback = document.getElementById('feedback');
    if (!feedback) return;

    feedback.innerHTML = `
        <span>Vill du ta bort denna arbetserfarenhet?</span>
        <button id="confirmDelete">Ja</button>
        <button id="cancelDelete">Nej</button>
    `;
    feedback.className = "confirm";

    // Lyssna på knapptryckningarna
    document.getElementById('confirmDelete').addEventListener('click', () => {
        // Utför DELETE-anrop
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            return response.json();
        })
        .then(() => {
            showFeedback("Arbetserfarenhet borttagen!", "success");
            fetchWorkExperience(); // Uppdatera listan
        })
        .catch(error => {
            console.error(error);
            showFeedback("Fel vid borttagning.", "error");
        });
    });

    document.getElementById('cancelDelete').addEventListener('click', () => {
        feedback.innerHTML = ''; // Rensa meddelandet
    });
}


// Visuell feedbackfunktion
function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = message;
    feedback.className = type; // success, error eller annat

    // Ta bort feedbackmeddelandet efter 3 sekunder
    setTimeout(() => {
        feedback.innerHTML = ''; // Ta bort texten
    }, 3000); // 3000ms = 3 sekunder
}