import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, Document, INLINES } from "@contentful/rich-text-types";
import { ArticleImage } from "@/components/contentful/ArticleImage.component";
import { ComponentRichImage } from "@/lib/__generated/sdk";
import { CtfImage } from "@/components/contentful/CtfImage.component";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export type EmbeddedEntryType = ComponentRichImage | null;

export interface ContentfulRichTextInterface {
  json: Document;
  links?:
    | {
        entries: {
          block: Array<EmbeddedEntryType>;
        };
      }
    | any;
}

function getFileName(text: string) {
  return text.split("#");
}

export const EmbeddedEntry = (entry: EmbeddedEntryType) => {
  switch (entry?.__typename) {
    case "ComponentRichImage":
      return <ArticleImage image={entry} />;
    default:
      return null;
  }
};

export const contentfulBaseRichTextOptions = ({
  links,
}: ContentfulRichTextInterface): Options => ({
  renderMark: {
    [MARKS.BOLD]: (text) => {
      return <b key={`${text}-key`}>{text}</b>;
    },
    [MARKS.ITALIC]: (text) => {
      return <i key={`${text}-key`}>{text}</i>;
    },
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      if (node.data.uri.includes("https://")) {
        return (
          <a
            className="text-blue-500 underline hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
            href={node.data.uri}
          >
            {children}
          </a>
        );
      }

      return <Link href={node.data.uri}>{children}</Link>;
    },

    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const entry = links?.entries?.block?.find(
        (item: EmbeddedEntryType) => item?.sys?.id === node.data.target.sys.id
      );

      if (!entry) return null;

      return <EmbeddedEntry {...entry} />;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset = links?.assets?.block?.find(
        (item: any) => item?.sys?.id === node.data.target.sys.id
      );
      if (!asset) return null;
      return (
        <>
          <figure>
            <div className="flex justify-center">
              <CtfImage
                nextImageProps={{
                  className: twMerge(
                    "mt-0 mb-0 ",
                    "rounded-2xl border border-gray300 shadow-lg"
                  ),
                }}
                {...asset}
              />
              ;
            </div>
          </figure>
        </>
      );
    },
  },
});

export const CtfRichText = ({ json, links }: ContentfulRichTextInterface) => {
  const baseOptions = contentfulBaseRichTextOptions({ links, json });
  if (!json) return null; // IF there is no content, return null

  return (
    <article className="prose prose-lg max-w-none">
      {documentToReactComponents(json, baseOptions)}
    </article>
  );
};
