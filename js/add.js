document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addWorkExperienceForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Förhindrar standardinladdning

            const formData = new FormData(event.target);
            const data = {
                companyname: formData.get('companyname'),
                jobtitle: formData.get('jobtitle'),
                location: formData.get('location'),
                startdate: formData.get('startdate'),
                enddate: formData.get('enddate'),
                description: formData.get('description')
            };

            console.log("Data som skickas:", data);

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                console.log('Arbetserfarenhet tillagd:', result);
                alert('Arbetserfarenhet tillagd!');
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Error posting data:', error);
                alert('Det gick inte att lägga till arbetserfarenheten.');
            });
        });
    }
});
