import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import map1 from '../../images/map1.PNG'
import map2 from '../../images/map2.PNG'
import map3 from '../../images/map3.PNG'
import './MapGallery.css'
import backgroundImage from '../../images/eddy-gonzalez-davila-kasrkins.jpg'

const handleDragStart = (e) => e.preventDefault();

const items = [
    <div className='GalleryImg'>
        <img className='MapExampleImg' alt='MapExampleImg' src={map1} onDragStart={handleDragStart} />
    </div>,
    <div className='GalleryImg'>
        <img className='MapExampleImg' alt='MapExampleImg' src={map2} onDragStart={handleDragStart} />
    </div>,
    <div className='GalleryImg'>
        <img className='MapExampleImg' alt='MapExampleImg' src={map3} onDragStart={handleDragStart} />
    </div>,
];

const MapGallery = () => {
    return (
        <>
            <div className='CarouselHolder'>
                <AliceCarousel
                    autoPlay={true}
                    autoPlayInterval={1500}
                    disableButtonsControls={true}
                    infinite={true}
                    mouseTracking
                    items={items}
                />
            </div>
            <img
                className='BackgroundImage'
                src={backgroundImage}
                loading='eager'
                alt='Kasrkin© by Eddy González Dávila; https://www.artstation.com/artwork/rAnEP6' />
        </>
    );
}

export default MapGallery
