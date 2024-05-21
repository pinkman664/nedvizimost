document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const houseId = urlParams.get('houseId');

    if (houseId) {
        fetch('houses.xml')
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const house = data.getElementsByTagName('house')[houseId - 1];
                if (house) {
                    house.getElementsByTagName('parameter').forEach(parameter => {
                        const valueName = parameter.getElementsByTagName('value')[0].getAttribute('name');
                        const valueText = parameter.getElementsByTagName('value')[0].textContent;
                        document.getElementById(valueName).textContent = valueText;
                    });
                } else {
                    document.getElementById('houseInfo').innerHTML = 'Дом не найден';
                }
            })
            .catch(error => console.error('Ошибка:', error));
    }
});
