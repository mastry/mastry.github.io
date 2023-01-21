import React, { useEffect } from 'react'
import Sidebar from './DesktopSidebar'
import Link from 'next/link'
import Image from 'next/image'
import Drawer from './MobileDrawer'

export interface LayoutProps {
    children: JSX.Element | JSX.Element[]
}

export const Layout: React.FC<LayoutProps> = (props) => {
    const [hasMounted, setHaMounted] = React.useState(false)

    useEffect(() => {
        setHaMounted(true)
    })

    if (!hasMounted) {
        return null
    }
    return (
        <section className="section">
            <div className="columns">
                <div className="column is-2 is-hidden-mobile">
                    <div className="is-flex is-justify-content-center">
                        <Link href="/">
                            <figure className="image is-64x64 mb-5">
                                <a>
                                    <Image
                                        src="/images/profile.jpg"
                                        width={128}
                                        height={128}
                                        style={{ borderRadius: 5 }}
                                        alt="Jeff Mastry"
                                    />
                                </a>
                            </figure>
                        </Link>
                    </div>
                </div>
                <div className="column is-7 ">
                    <div className="is-flex is-justify-content-space-between is-hidden-tablet">
                        <Drawer />
                        <Link href="/">
                            <figure className="image is-48x48 mb-5">
                                <a>
                                    <Image
                                        src="/images/profile.jpg"
                                        width={128}
                                        height={128}
                                        style={{ borderRadius: 5 }}
                                        alt="Jeff Mastry"
                                    />
                                </a>
                            </figure>
                        </Link>
                    </div>
                    <Link href="/">
                        <h1 className="is-size-4 has-text-weight-bold mt-3">
                            <a className="has-text-dark">Jeff Mastry</a>
                        </h1>
                    </Link>
                </div>
                <div className="column is-3 is-hidden-mobile"></div>
            </div>
            <div className="columns">
                <div className="column is-2 is-hidden-mobile">
                    <Sidebar />
                </div>
                <div className="column is-7">
                    <main className="">{props.children}</main>
                </div>
                <div className="column is-3 is-hidden-mobile"></div>
            </div>
        </section>
    )
}

export default Layout
