
const FeatureCard = () => {
    return(
        <div>
            <div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>

                </div>
            </div>
            <div>

            </div>
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
