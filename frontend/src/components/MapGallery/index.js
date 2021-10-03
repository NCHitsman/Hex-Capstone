import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import map1 from '../../images/map1.PNG'
import map2 from '../../images/map2.PNG'
import map3 from '../../images/map3.PNG'
import './MapGallery.css'
import backgroundImage from '../../images/factory.jpg'

const handleDragStart = (e) => e.preventDefault();

const items = [
    <img className='GalleryImg' alt='MapExampleImg' src={map1} onDragStart={handleDragStart} />,
    <img className='GalleryImg' alt='MapExampleImg' src={map2} onDragStart={handleDragStart} />,
    <img className='GalleryImg' alt='MapExampleImg' src={map3} onDragStart={handleDragStart} />,
];

const MapGallery = () => {
    return (
        <>
            <div className='CarouselHolder'>
                <AliceCarousel mouseTracking items={items} />
            </div>
            <img
                className='BackgroundImage'
                src={backgroundImage}
                alt='Warzone Orkz 1© by Sergei Panin; https://www.artstation.com/artwork/W2wbOQ' />
        </>
    );
}

export default MapGallery
