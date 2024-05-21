document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const houseId = urlParams.get('houseId');

    if (houseId) {
        fetch('housesIMG.xml')
           .then(response => response.text())
           .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
           .then(data => {
                const imageBlocks = Array.from(data.getElementsByTagName('block'));
                const targetBlock = imageBlocks[houseId - 1];
                if (targetBlock) {
                    const images = Array.from(targetBlock.getElementsByTagName('img'));
                    const sliderContainer = document.querySelector('.slider-container');
                    images.forEach((img, index) => {
                        const slideDiv = document.createElement('div');
                        slideDiv.className = 'slide';
                        const imgElement = document.createElement('img');
                        imgElement.src = img.textContent;
                        imgElement.name = `Image ${index + 1}`;
                        imgElement.id = 'houseImage';
                        slideDiv.appendChild(imgElement);
                        sliderContainer.appendChild(slideDiv);
                    });
                } else {
                    console.error('Блок с изображениями для данного ID не найден');
                }
            })
           .catch(error => console.error('Ошибка при загрузке XML файла:', error));
    }
});