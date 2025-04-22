const apiUrl = 'http://localhost:3000/api/workexperience';

// Om vi är på index.html, hämta och visa alla arbetserfarenheter
document.addEventListener('DOMContentLoaded', function() {
    // Kontrollera om elementet finns på sidan innan vi försöker ändra det
    const list = document.getElementById('workExperienceList');
    
    if (list) {
        fetchWorkExperience(); // Anropa funktionen om elementet finns
    }
});

// Hämta alla arbetserfarenheter
function fetchWorkExperience() {
    fetch(apiUrl)
        .then(response => {
            // Kontrollera om svaret är okej (HTTP-status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  // Om vi har fått ett korrekt svar, omvandla till JSON
        })
        .then(data => {
            const list = document.getElementById('workExperienceList');
            list.innerHTML = ''; // Töm listan innan vi fyller på den igen
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
                        <button onclick="deleteWorkExperience(${item.id})">Ta bort</button>
                    `;
                    list.appendChild(li);
                });
                
                
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const list = document.getElementById('workExperienceList');
            list.innerHTML = '<li>Det gick inte att hämta arbetserfarenheter.</li>';
        });
}

// Ta bort en arbetserfarenhet
function deleteWorkExperience(id) {
    if (confirm("Är du säker på att du vill ta bort denna arbetserfarenhet?")) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            console.log(result);
            alert('Arbetserfarenhet borttagen!');
            fetchWorkExperience(); // Uppdatera listan
        })
        .catch(error => {
            console.error('Error deleting data:', error);
            alert('Det gick inte att ta bort arbetserfarenheten.');
        });
    }
}

