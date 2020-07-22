;(function(){
    const map = document.getElementById('yaMap')

    if (map && map.dataset.geoObject) {

        let geoObj = JSON.parse(map.dataset.geoObject)

        ymaps.ready(init);
        function init() {
            let myMap = new ymaps.Map('yaMap', {
                center: [55.717573, 37.840559],
                zoom: 10,
                controls: []
            });

            myMap.behaviors.disable(['scrollZoom'])

            for (const geo of geoObj)
                ymaps
                    .geocode(geo.query, {results: 1})
                    .then(function (res) {
                        let firstGeoObject = res.geoObjects.get(0),
                            coords = firstGeoObject.geometry.getCoordinates()

                        firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
                        firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

                        let placemark = new ymaps.Placemark(coords, {
                            balloonContent: geo.query,
                            hintContent: geo.title,
                            balloonContentHeader: geo.title,
                        }, {
                            hideIconOnBalloonOpen: false,
                            balloonOffset: [100, -50],
                            balloonMaxWidth: 331,
                            iconLayout: 'default#image',
                            iconImageOffset: [-35, -80],
                            iconImageHref: geo.marker,
                            iconImageSize: [85, 100],
                        })

                        myMap.geoObjects.add(placemark);
                    })
        }
    }
})();