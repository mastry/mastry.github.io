import React, { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { PostData } from '../lib/posts'
import { getSortedPostsData } from '../lib/posts'

interface Props {
    allPostsData: PostData[]
}

const Index: React.FC<Props> = (props) => {
    return (
        <>
            <Head>
                <link
                    key="rss-feed"
                    rel="alternative"
                    type="application/rss+xml"
                    title="Jeff Mastry"
                    href="/feed"
                />
            </Head>
            {props.allPostsData.map((post) => (
                <Link href={`/posts/${post.id}`} key={post.id}>
                    <div className="columns">
                        <div className="column is-9 has-text-dark has-text-weight-bold">
                            <span title={`${post.title} (${post.date})`}>
                                {post.title}
                            </span>
                        </div>
                        <div className="column is-3 is-hidden-mobile has-text-grey">
                            {post.date?.substring(0, 10)}
                        </div>
                    </div>
                </Link>
            ))}
        </>
    )
}
export default Index

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData,
        },
    }
}
