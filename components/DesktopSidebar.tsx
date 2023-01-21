import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LinkedInIcon, RssIcon, GitHubIcon, TwitterIcon } from './Icons'

const Sidebar: React.FC = () => {
    const router = useRouter()

    const activeStyle = 'has-text-info'
    const inactiveStyle = 'has-text-grey-light'

    const isActive = (path: string) => {
        if (path === '/') {
            return router.pathname === '/' ? activeStyle : inactiveStyle
        } else {
            return router.pathname.startsWith(path)
                ? activeStyle
                : inactiveStyle
        }
    }

    const showArrowstyle = ''
    const hideArrowStyle = 'is-invisible'

    const showIndicator = (path: string) => {
        if (path === '/') {
            return router.pathname === '/' ? showArrowstyle : hideArrowStyle
        } else {
            return router.pathname.startsWith(path)
                ? showArrowstyle
                : hideArrowStyle
        }
    }

    return (
        <div className="is-flex is-flex-direction-column">
            <div className="is-flex is-justify-content-center is-hidden-mobile">
                <div className="mb-5 is-flex is-flex-direction-column">
                    <Link href="/" className="pb-2">
                        <span className={`${isActive('/')}`}>
                            <span className={showIndicator('/')}>⚉ </span>
                            Home
                        </span>
                    </Link>
                    <Link href="/projects" className="pb-2">
                        <span className={`${isActive('/projects')}`}>
                            <span className={showIndicator('/projects')}>
                                ⚉{' '}
                            </span>
                            Projects
                        </span>
                    </Link>
                    <Link href="/about" className="pb-2">
                        <span className={`${isActive('/about')}`}>
                            <span className={showIndicator('/about')}>
                                ⚉{' '}
                            </span>
                            About
                        </span>
                    </Link>
                    <Link href="/contact" className="pb-2">
                        <span className={`${isActive('/contact')}`}>
                            <span className={showIndicator('/contact')}>
                                ⚉{' '}
                            </span>
                            Contact
                        </span>
                    </Link>
                </div>
            </div>
            <div className="is-flex is-justify-content-center mt-5 is-hidden-mobile">
                <nav>
                    <a
                        className="nav-link has-text-grey-dark mr-3"
                        href="https://www.twitter.com/JeffMastry/"
                    >
                        <TwitterIcon size={16} />
                    </a>
                    <a
                        className="nav-link has-text-grey-dark mr-3"
                        href="https://www.linkedin.com/in/jeffmastry/"
                    >
                        <LinkedInIcon size={16} />
                    </a>
                    <a
                        className="nav-link has-text-grey-dark"
                        href="https://github.com/mastry"
                    >
                        <GitHubIcon size={16} />
                    </a>
                </nav>
            </div>

            <div className="dropdown is-hidden-tablet">
                <div className="dropdown-trigger">
                    <button
                        className="button"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu5"
                    >
                        <span>Left aligned</span>
                        <span className="icon is-small">
                            <i
                                className="fas fa-angle-down"
                                aria-hidden="true"
                            ></i>
                        </span>
                    </button>
                </div>
                <div
                    className="dropdown-menu is-hidden-tablet"
                    id="dropdown-menu5"
                    role="menu"
                >
                    <div className="dropdown-content">
                        <div className="dropdown-item">
                            <p>
                                The dropdown is <strong>left-aligned</strong> by
                                default.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
