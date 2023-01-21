import React, { useState } from 'react'
import Link from 'next/link'
import {
    CloseIcon,
    FatbrainIcon,
    GitHubIcon,
    LinkedInIcon,
    MenuIcon,
    RssIcon,
    TwitterIcon,
} from './Icons'

const Drawer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="is-hidden-tablet">
            <div className="is-flex is-justify-content-space-between">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="button is-dark"
                    data-show="quickview"
                    data-target="quickviewDefault"
                >
                    <MenuIcon size={24} />
                </button>
            </div>
            <div
                id="drawer"
                className="has-background-dark"
                style={{
                    width: isOpen ? '100vw' : 0,
                    padding: isOpen ? '3rem 1rem' : 0,
                }}
            >
                <div className="is-flex is-justify-content-space-between">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="button is-dark ml-2"
                    >
                        <CloseIcon size={24} />
                    </button>
                </div>
                <section className="is-flex is-flex-direction-column">
                    <div className="column is-flex">
                        <div className="column is-flex is-flex-direction-column is-size-5">
                            <Link href="/">
                                <span
                                    className="mb-3"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </span>
                            </Link>
                            <Link href="/about">
                                <span
                                    className="mb-3"
                                    onClick={() => setIsOpen(false)}
                                >
                                    About
                                </span>
                            </Link>
                            <Link href="/contact">
                                <span
                                    className="mb-3"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Contact
                                </span>
                            </Link>
                        </div>
                        <div className="column">
                            <FatbrainIcon size={128} />
                        </div>
                    </div>
                    <hr />
                    <div className="has-text-centered">
                        <a
                            className="mr-5"
                            href="https://twitter.com/JeffMastry"
                        >
                            <TwitterIcon size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/jeffmastry/"
                            className="mr-5"
                        >
                            <LinkedInIcon size={24} />
                        </a>
                        <a href="https://github.com/mastry" className="">
                            <GitHubIcon size={24} />
                        </a>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Drawer
