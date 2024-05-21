document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const houseId = urlParams.get('houseId');

    if (houseId) {
        fetch('houses.xml') 
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                
                const houses = Array.from(data.getElementsByTagName('house')).map(house => {
                    const parameters = Array.from(house.getElementsByTagName('parameter')).reduce((acc, parameter) => {
                        const name = parameter.getElementsByTagName('value')[0].getAttribute('name');
                        const value = parameter.getElementsByTagName('value')[0].textContent;
                        acc[name] = value;
                        return acc;
                    }, {});
                    return parameters;
                });

                
                if (houseId <= houses.length) {
                    const house = houses[houseId - 1];
                    
                    for (const [key, value] of Object.entries(house)) {
                        const valueElement = document.querySelector(`div.value[name="${key}"]`);
                        if (valueElement) {
                            valueElement.textContent = value;
                        }
                    }
                } else {
                    console.error('Дом с таким ID не найден');
                }
            })
            .catch(error => console.error('Ошибка при загрузке XML файла:', error));
    }
});