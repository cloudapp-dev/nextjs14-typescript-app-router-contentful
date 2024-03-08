import { ArticleContent } from "@/components/contentful/ArticleContent.component";
import { client } from "@/lib/client";
import { notFound } from "next/navigation";

async function BlogPostPage() {
  const [blogPagedata] = await Promise.all([
    client.pageBlogPost({
      slug: "testblogpost",
    }),
  ]);

  const blogPost = blogPagedata.pageBlogPostCollection?.items[0];

  if (!blogPost) {
    // If a blog post can't be found,
    // tell Next.js to render a 404 page.
    return notFound();
  }

  const relatedPosts = blogPost?.relatedBlogPostsCollection?.items;

  if (!blogPost || !relatedPosts) return null;

  return (
    <>
      <div className="mt-4" />
      <ArticleContent article={blogPost} />
    </>
  );
}

export default BlogPostPage;
