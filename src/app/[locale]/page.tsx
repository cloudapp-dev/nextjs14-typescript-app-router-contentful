import { ArticleContent } from "@/components/contentful/ArticleContent.component";
import { createTranslation } from "@/app/i18n/server";
import { client } from "@/lib/client";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/components/contentful/ArticleHero";
import { ArticleTileGrid } from "@/components/contentful/ArticleTileGrid";
import { Container } from "@/components/contentful/container/Container";
import { draftMode } from "next/headers";
import { locales, LocaleTypes } from "@/app/i18n/settings";

interface PageParams {
  slug: string;
  locale: string;
}

interface PageProps {
  params: PageParams;
}

async function BlogPostPage({ params }: PageProps) {
  const { isEnabled } = draftMode();

  const [blogPagedata] = await Promise.all([
    client.pageBlogPost({
      slug: "/",
      locale: params.locale.toString(),
      preview: isEnabled,
    }),
  ]);

  const blogPost = blogPagedata.pageBlogPostCollection?.items[0];

  if (!blogPost) {
    // If a blog post can't be found,
    // tell Next.js to render a 404 page.
    return notFound();
  }

  // Internationalization, get the translation function
  const { t } = await createTranslation(params.locale as LocaleTypes, "common");

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
          {/* Without internationalization: */}
          {/* <h2 className="mb-4 md:mb-6">Related Posts</h2> */}
          {/* With internationalization: */}
          <h2 className="mb-4 md:mb-6">{t("blog.relatedArticles")}</h2>
          <ArticleTileGrid className="md:grid-cols-2" articles={relatedPosts} />
        </Container>
      )}
    </>
  );
}

export default BlogPostPage;
