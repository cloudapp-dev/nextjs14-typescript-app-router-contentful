import { ArticleContent } from "@/components/contentful/ArticleContent.component";
import { client } from "@/lib/client";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/components/contentful/ArticleHero";
import { ArticleTileGrid } from "@/components/contentful/ArticleTileGrid";
import { Container } from "@/components/contentful/container/Container";
import { draftMode } from "next/headers";

interface BlogPostPageParams {
  slug: string;
  locale: string;
}

interface BlogPostPageProps {
  params: BlogPostPageParams;
}

const locales = ["de-DE"]; //Fake locales for the purpose of the example
// Tell Next.js about all our blog posts so
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<BlogPostPageParams[]> {
  const dataPerLocale = locales
    ? await Promise.all(
        locales.map((locale) => client.pageBlogPostCollection({ limit: 100 }))
      )
    : [];

  const paths = dataPerLocale
    .flatMap((data, index) =>
      data.pageBlogPostCollection?.items.map((blogPost) =>
        blogPost?.slug
          ? {
              slug: blogPost.slug,
              locale: locales?.[index] || "",
            }
          : undefined
      )
    )
    .filter(Boolean);

  return paths as BlogPostPageParams[];
}

async function BlogPostPage({ params }: BlogPostPageProps) {
  const { isEnabled } = draftMode();
  const [blogPagedata] = await Promise.all([
    client.pageBlogPost({
      slug: params.slug.toString(),
      preview: isEnabled,
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
      <Container>
        <ArticleHero
          article={blogPost}
          isReversedLayout={true}
          isHomePage={false}
        />
      </Container>
      <Container className="max-w-4xl mt-8">
        <ArticleContent article={blogPost} />
      </Container>
      {relatedPosts.length > 0 && (
        <Container className="max-w-5xl mt-8">
          <h2 className="mb-4 md:mb-6">Related Posts</h2>
          <ArticleTileGrid className="md:grid-cols-2" articles={relatedPosts} />
        </Container>
      )}
    </>
  );
}

export default BlogPostPage;
