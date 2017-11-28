import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Markdown from 'react-markdown'
import ErrorMessage from '../components/ErrorMessage'

const PostContent = ({ data: { loading, error, post } }) => {
  if (error) return <ErrorMessage message='Error loading post.' />
  if (!loading) {
    return (
      <article>
        <h1>{post.title}</h1>
        <div className='placeholder'>
          <img src={`https://media.graphcms.com/resize=w:650,h:366,fit:crop/${post.coverImage.handle}`} />
        </div>
        <Markdown
          source={post.content}
          escapeHtml={false}
        />
        <style jsx>{`
          .placeholder {
            height: 366px;
            background-color: #eee;
          }
        `}</style>
      </article>
    )
  }
  return <h2>Loading post...</h2>
}

export const singlePost = gql`
  query singlePost($slug: String!) {
    post: Post(slug: $slug) {
      id
      slug
      title
      coverImage {
        handle
      }
      content
      dateAndTime
    }
  }
`

export default graphql(singlePost, {
  options: ({ slug }) => ({ variables: { slug } })
})(PostContent)
