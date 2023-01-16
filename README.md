# The Blog

This is a Next.js-based blog using Typescript and [Bulma](https://bulma.io/). Content is written in markdown and converted to HTML by tools in the [unified/rehype](https://unifiedjs.com/) ecosystem. Markdown frontmatter is parsed with [graymatter](https://github.com/jonschlinkert/gray-matter). Syntax highlighting is handled by [Prism](https://prismjs.com/).

## Quirks, Anomalies, and Other Disturbing Things

### CSS Conflicts

Bulma and Prism both use the `.numbers` and `.tags` CSS classes so numbers are completely hosed in code blocks. To fix this I added this code to `_app.tsx` to rename those tags in Prism:

```typescript
Prism.plugins.customClass.map({ number: 'prism-number', tag: 'prism-tag' })
```

### Custom Styles

Bulma styles that I don't like or styles that Bulma does not have are overridden or added (respectively) in `/styles/theme.css`

### Image Handling

I like to use Typora to edit blog posts so I needed a way to handle images that worked in Typora and on the deployed blog site. I achieved this by configuring Typora to save all images in the `../public/images/posts/${filename}` folder. Then I wrote a `unified` "plugin" (really just a function) to rewrite the local path that Typora embeds in the markdown to a valid site URL. Here's a snippet of that code (from `/lib/posts.ts`):

```typescript
export async function getPostData(id: string): Promise<PostData> {

    ...

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
        ...

        .use(() => (tree) => {
            tree.children.forEach((child) => {
                visitImage(child)
            })
        })

        ...
}
```
