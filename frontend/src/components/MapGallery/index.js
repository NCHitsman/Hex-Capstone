import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import gif from '../../images/example.gif'
import './MapGallery.css'
import backgroundImage from '../../images/factory.jpg'

const handleDragStart = (e) => e.preventDefault();

const items = [
    <img className='GalleryImg' alt='MapExampleImg' src={gif} onDragStart={handleDragStart} />,
    <img className='GalleryImg' alt='MapExampleImg' src={gif} onDragStart={handleDragStart} />,
    <img className='GalleryImg' alt='MapExampleImg' src={gif} onDragStart={handleDragStart} />,
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
