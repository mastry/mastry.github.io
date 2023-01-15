import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import prism from 'rehype-prism'
import math from 'remark-math'
import parse from 'remark-parse'
import rehype from 'remark-rehype'
import mathjax from 'rehype-mathjax'
import stringify from 'rehype-stringify'
import { Content } from 'mdast'

const contentDirectory = path.join(process.cwd(), 'content')

export interface PostData {
    id: string
    title: string
    date: string
    draft: boolean
    contentHtml: string
    category: string
    tags: string[]
}

export function getSortedPostsData(): PostData[] {
    // Get file names under /posts
    const fileNames = fs.readdirSync(contentDirectory)
    const allPostsData = fileNames.map((fileName): PostData => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(contentDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        return {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
            draft: matterResult.data.draft,
            contentHtml: '',
            category: matterResult.data.category || '',
            tags: matterResult.data.tags || '',
        }
    })

    return sortPostsByDate(allPostsData)
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(contentDirectory)

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        }
    })
}

export function getPublishedPosts() {
    let posts = getSortedPostsData()
    return posts.filter((p) => !p.draft)
}

export async function getPostData(id: string): Promise<PostData> {
    const fullPath = path.join(contentDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Rewrites image paths to a valid URL
    const visitImage = (content: any) => {
        if (content.tagName === 'img') {
            const parts = content.properties.src.split('%5C')
            const fileName = parts[parts.length - 1]
            content.properties.src = `/images/posts/${id}/${fileName}`
        } else if (content.children) {
            content.children.forEach((c: any) => {
                visitImage(c)
            })
        }
    }

    // Convert markdown into HTML
    const processedContent = await unified()
        .use(parse)
        .use(rehype)
        .use(() => (tree) => {
            tree.children.forEach((child) => {
                visitImage(child)
            })
        })
        .use(math)
        .use(prism)
        .use(mathjax)
        .use(stringify)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        draft: matterResult.data.draft,
        contentHtml,
        category: matterResult.data.category || '',
        tags: matterResult.data.tags || '',
    }
}

function sortPostsByDate(posts: PostData[]) {
    return posts.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}
