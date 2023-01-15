import { LinkedInIcon, TwitterIcon } from '../components/Icons'

export default function Contact() {
    return (
        <>
            <p>
                Contact forms are spam attractors. Please use a direct message
                to contact me on one of the services below.
            </p>
            <p>
                If you have a comment on a blog post here please{' '}
                <strong>use the comment link on that post&apos;s page</strong>.
                That way others have the opportunity to join us in the
                conversation. Unless of course you hate the post and have
                something derogatory to say. In that case, please use one of the
                (private) contact methods below so you don&apos;t embarrass me
                <span title="Just kidding... fire away!">🤣</span>.
            </p>

            <div className="is-flex is-justify-content-center mt-6 mr-6 pr-6">
                <div className="is-flex ml-6">
                    <a
                        href="https://www.linkedin.com/in/jeffmastry/"
                        className="has-text-link"
                    >
                        <LinkedInIcon size={64} />
                    </a>
                </div>
                <div className="ml-6">
                    <a
                        href="https://twitter.com/JeffMastry"
                        className="has-text-info"
                    >
                        <TwitterIcon size={64} />
                    </a>
                </div>
            </div>
        </>
    )
}
