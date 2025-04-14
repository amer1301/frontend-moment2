const apiUrl = 'http://localhost:3000/api/workexperience';

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
                    li.innerHTML = `
                        <strong>${item.companyname}</strong> (${item.jobtitle})<br>
                        Plats: ${item.location} | Start: ${item.startdate} | Slut: ${item.enddate || 'Pågående'}<br>
                        Beskrivning: ${item.description}<br>
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

// Lägg till en arbetserfarenhet
document.getElementById('addWorkExperienceForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        companyname: formData.get('companyname'),
        jobtitle: formData.get('jobtitle'),
        location: formData.get('location'),
        startdate: formData.get('startdate'),
        enddate: formData.get('enddate'),
        description: formData.get('description')
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(result => {
        console.log(result);
        alert('Arbetserfarenhet tillagd!');
        window.location.href = 'index.html'; // Omdirigera tillbaka till listan
    })
    .catch(error => {
        console.error('Error posting data:', error);
        alert('Det gick inte att lägga till arbetserfarenheten.');
    });
});

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

// Om vi är på index.html, hämta och visa alla arbetserfarenheter
if (document.getElementById('workExperienceList')) {
    fetchWorkExperience();
}
