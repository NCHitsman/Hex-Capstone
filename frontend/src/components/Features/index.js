import gif from '../../images/example.gif'
import './Features.css'
import backgroundImage from '../../images/headshot.jpg'

const FeatureCard = () => {
    return (
        <div>
            <div>
                <div>
                    <div></div>
                    <div className='FeatureCardGifCont'>
                        <img className='FeatureCardGif' src={gif} alt='Example Usage of App' />
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div>

            </div>
            <img
            className='BackgroundImage'
            src={backgroundImage}
            alt='' />
        </div>
    )
}

const Features = () => {
    return (
        <>
            <div>
                <FeatureCard side='left' />
                <FeatureCard side='right' />
                <FeatureCard side='left' />
                <FeatureCard side='right' />
            </div>
        </>
    )
}

export default Features
