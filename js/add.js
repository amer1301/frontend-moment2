document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addWorkExperienceForm');
    const feedback = document.getElementById('feedback');

    if (form) {
        form.addEventListener('submit', function (event) {
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

            if (!data.companyname || !data.jobtitle || !data.location || !data.startdate || !data.description) {
                showFeedback("Alla obligatoriska fält måste fyllas i.", "error");
                return;
            }

            fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || "Ett fel uppstod");
                    });
                }
                return response.json();
            })
            .then(result => {
                showFeedback("Arbetserfarenhet tillagd!", "success");
                setTimeout(() => window.location.href = 'index.html', 1500);
            })
            .catch(error => {
                console.error('Fel vid POST:', error);
                showFeedback("Det gick inte att lägga till arbetserfarenheten: " + error.message, "error");
            });
        });
    }
    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = type;
    }
});