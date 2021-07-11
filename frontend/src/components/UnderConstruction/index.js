import './UnderConstruction.css'
import backgroundImage from '../../images/factory.jpg'

const UnderConstruction = () => {

    return (
        <div className='ConstructionCont'>
            <div className='ConstructionTitle'>
                Under Construction
            </div>
            <div className='ConstructionText'>
                The Tech-Adepts are working hard on getting this page ready...
            </div>
            <img
                className='BackgroundImage'
                src={backgroundImage}
                alt='Warzone Orkz 1© by Sergei Panin; https://www.artstation.com/artwork/W2wbOQ' />
        </div>
    )
}

export default UnderConstruction
