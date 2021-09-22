import gif from '../../images/example.gif'
import './Features.css'
import backgroundImage from '../../images/headshot.jpg'

// const FeatureCard = () => {
//     return (

//     )
// }

const Features = () => {
    return (
        <>
            <div className='FeaturesParentCont'>
                <div className='FeaturesSubCont'>
                    <div className='FeaturesGifCont Top'>
                        <img className='FeaturesGif' alt='Example Gif' src={gif} />
                    </div>
                    <div className='FeatureParentTextCont'>
                        <div className='FeaturesTextCont Left'>
                            <div className='FeaturesTitle'>Create Games</div>
                            <div className='FeaturesText'>Create a System to be the home for your Planetary Empires Campaign. Each System will hold all of your maps, players, and teams. </div>
                        </div>
                        <div className='FeaturesTextCont Right'>
                            <div className='FeaturesTitle'>Make Your Own Maps</div>
                            <div className='FeaturesText'>Using the map creator, you can draw out hexigonal maps to use within your Campaign.</div>
                        </div>
                    </div>
                    <div className='FeaturesGifCont TopRight Bot'>
                        <img className='FeaturesGif' alt='Example Gif' src={gif} />
                    </div>
                </div>
                <div className='FeaturesSubCont Bot'>
                    <div className='FeaturesGifCont BottomLeft Top'>
                        <img className='FeaturesGif' alt='Example Gif' src={gif} />
                    </div>
                    <div className='FeatureParentTextCont Bot'>
                        <div className='FeaturesTextCont Left'>
                            <div className='FeaturesTitle'>Invite Your Players</div>
                            <div className='FeaturesText'></div>
                        </div>
                        <div className='FeaturesTextCont Right'>
                            <div className='FeaturesTitle'>Play the Game</div>
                            <div className='FeaturesText'></div>
                        </div>
                    </div>
                    <div className='FeaturesGifCont Bot'>
                        <img className='FeaturesGif' alt='Example Gif' src={gif} />
                    </div>
                </div>
            </div>
            <img
                className='BackgroundImage'
                src={backgroundImage}
                alt='Unnamed by Games Workshop; https://www.warhammer-community.com/2019/10/16/space-marines-preview-the-imperial-fistsgw-homepage-post-1/#gallery-1' />
        </>
    )
}

export default Features
