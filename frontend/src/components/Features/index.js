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
                    <img className='FeaturesGif Top' src={gif} />
                    <div>
                        <div>Title</div>
                        <div>Esse duis reprehenderit ullamco esse eu commodo id ut pariatur non irure ea. Elit et consequat nostrud nisi amet elit fugiat id fugiat aliquip.Ea laborum elit Lorem dolore magna pariatur fugiat non non aliqua sunt veniam ad.Sint ex quis proident voluptate quis velit.</div>
                    </div>
                </div>
                <div className='FeaturesSubCont Bottom'>
                    <div>
                        <div>Title</div>
                        <div>Esse duis reprehenderit ullamco esse eu commodo id ut pariatur non irure ea. Elit et consequat nostrud nisi amet elit fugiat id fugiat aliquip.Ea laborum elit Lorem dolore magna pariatur fugiat non non aliqua sunt veniam ad.Sint ex quis proident voluptate quis velit.</div>
                    </div>
                    <img className='FeaturesGif' src={gif} />
                </div>
                <div className='FeaturesSubCont Top'>
                    <div>
                        <div>Title</div>
                        <div>Esse duis reprehenderit ullamco esse eu commodo id ut pariatur non irure ea. Elit et consequat nostrud nisi amet elit fugiat id fugiat aliquip.Ea laborum elit Lorem dolore magna pariatur fugiat non non aliqua sunt veniam ad.Sint ex quis proident voluptate quis velit.</div>
                    </div>
                    <img className='FeaturesGif' src={gif} />
                </div>
                <div className='FeaturesSubCont Bottom'>
                    <img className='FeaturesGif' src={gif} />
                    <div>
                        <div>Title</div>
                        <div>Esse duis reprehenderit ullamco esse eu commodo id ut pariatur non irure ea. Elit et consequat nostrud nisi amet elit fugiat id fugiat aliquip.Ea laborum elit Lorem dolore magna pariatur fugiat non non aliqua sunt veniam ad.Sint ex quis proident voluptate quis velit.</div>
                    </div>
                </div>
            </div>
            <img
                className='BackgroundImage'
                src={backgroundImage}
                alt='' />
        </>
    )
}

export default Features
