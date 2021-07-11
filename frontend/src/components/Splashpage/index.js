import backgroundImage from '../../images/overlook.jpg'
import gif from '../../images/example.gif'
import './Splashpage.css'

const Splashpage = () => {


    return (
        <div className='SplashPageMainParent'>
            <div className='SplashPageInfoCont'>
                <div className='SplashPageTextCont'>
                    <div className='SplashPageTitle'>
                        Welcome To Planetary Empires
                    </div>
                    <div className='SplashPageDetail'>
                        A Warhammer 40k Narrative Companion Game
                    </div>
                    <div className='SplashPageTextContLeft'>
                        <div className='SplashPageText'>
                            Planetary Empires is an expansion game for Warhammer 40,000 released
                            by Games Workshop. The game rules and accompanying map board and pieces
                            allow you to wage a campaign across a planetary-size landscape. It is
                            designed to help you run evocative, narrative-driven campaign.
                        </div>
                    </div>
                    <div className='SplashPageTextContRight'>
                        <div className='SplashPageText'>
                            This site helps you organize players, systems, and maps, allowing you to run
                            a Planetary Empires game all in one place! Create an account, make a System, invite your
                            friends, and make multiple Maps to play on!
                        </div>
                    </div>
                </div>
                <div className='gifCont'>
                    <img className='gif' src={gif} alt='Example Usage of App' />
                </div>
            </div>
            <img className='BackgroundImage' src={backgroundImage} alt='Warhammer 40K Nebula© by jordi van hees; https://www.artstation.com/artwork/W294dN' />
        </div>
    )
}

export default Splashpage
