import gif from '../../images/example.gif'
import './Features.css'
import backgroundImage from '../../images/headshot.jpg'

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
                            <div className='FeaturesText'>Create a System to be the home for your Planetary Empires Campaign. Each System will hold all of your maps, players, and teams. Create a team for each Faction you plan on having in your game. Now lets create some Planets and Moons to play on!</div>
                        </div>
                        <div className='FeaturesTextCont Right'>
                            <div className='FeaturesTitle'>Make Your Own Maps</div>
                            <div className='FeaturesText'>Using the map creator, you can draw out hexagonal maps to use within your Campaign. Once you have the base outline you like, hit 'Create Map' and it will take you to the new Map page.</div>
                        </div>
                    </div>
                    <div className='FeaturesGifCont Bot'>
                        <img className='FeaturesGif' alt='Example Gif' src={gif} />
                    </div>
                </div>
                <div className='FeaturesSubCont Bot'>
                    <div className='FeaturesGifCont Top'>
                        <img className='FeaturesGif' alt='Example Gif' src={gif} />
                    </div>
                    <div className='FeatureParentTextCont Bot'>
                        <div className='FeaturesTextCont Left'>
                            <div className='FeaturesTitle'>Invite Your Players</div>
                            <div className='FeaturesText'>Once your players create accounts, you can invite them using their username, and add them to your teams! Make them either players or Captains, who are able to edit the map for their team.</div>
                        </div>
                        <div className='FeaturesTextCont Right'>
                            <div className='FeaturesTitle'>Play the Game</div>
                            <div className='FeaturesText'>It is time to play games of Warhammer 40k to fight over territory! Use the points you obtain to build Command Bastions, Power Stations, Shield Generators, and Manufactorums. Keep track of everything you need to run a successful Planetary Empires Campaign!</div>
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
