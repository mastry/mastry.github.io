import React from 'react'
import Prism from 'prismjs'
import { getAllPostIds, getPostData, PostData } from '../../lib/posts'
import Date from '../../components/Date'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'

type Props = {
    post: PostData
}

interface Params extends ParsedUrlQuery {
    id: string
}

const Post: React.FC<Props> = (props) => {
    React.useEffect(() => {
        Prism.highlightAll()
    }, [])

    const tags = props.post.tags.length > 0 ? `(${props.post.tags.join()})` : ''

    return (
        <>
            <div>
                <h1 className="title">{props.post.title}</h1>
                <Date dateString={props.post.date} className="has-text-grey" />
                {props.post.draft ? (
                    <p className="is-size-3 has-text-weight-bold">
                        ✱✱✱ DRAFT ✱✱✱
                    </p>
                ) : (
                    <></>
                )}
                <div
                    className="mt-5"
                    dangerouslySetInnerHTML={{ __html: props.post.contentHtml }}
                />
                <hr />
                <p className="mt-5 is-italic">{`${props.post.category} ${tags}`}</p>
            </div>
        </>
    )
}

// This is called at build time by Next
export const getStaticProps: GetStaticProps<Props, Params> = async (
    context
) => {
    const post = await getPostData(context.params!.id)
    return {
        props: {
            post,
        },
    }
}

// This is called at build time by Next
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false,
    }
}

export default Post
