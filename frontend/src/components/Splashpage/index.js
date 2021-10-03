import backgroundImage from '../../images/overlook.jpg'
import gif from '../../images/example.gif'
import './Splashpage.css'

const Splashpage = () => {


    return (
        <div className='SplashPageMainParent'>
            {gif && <div className='SplashPageInfoCont'>
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
                            by Games Workshop. <br /> <br /> The game rules and accompanying map board and pieces
                            allow you to wage a campaign across a planetary-size landscape. It is
                            designed to assist you in running evocative, <br /> narrative-driven campaigns.
                        </div>
                    </div>
                    <div className='SplashPageTextContRight'>
                        <div className='SplashPageText'>
                            This site helps you organize players, systems, and maps, allowing you to run
                            a Planetary Empires game all in one place! <br /><br />
                            Create an account, create a System, invite your
                            friends, and make multiple Maps to play on!
                        </div>
                    </div>
                </div>
                <div className='gifCont'>
                    <img className='gif' src={gif} alt='Example Usage of App' />
                </div>
            </div>}
            <img
                className='BackgroundImage'
                src={backgroundImage}
                loading='eager'
                alt='Gather the troops© by Eddy González Dávila; https://www.artstation.com/artwork/OolJ3K' />
        </div>
    )
}

export default Splashpage
