import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { twMerge } from "tailwind-merge";

type Props = {
  input: string,
  className?: string
};

export default function FormattedText({ input, className }: Props) {

  const defaultTextClass = twMerge("text-slate-600 dark:text-slate-100", className)

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="font-bold" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="font-bold" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="font-bold" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="font-bold" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="font-bold" {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 className="font-bold" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className={ twMerge("list-disc ml-4", defaultTextClass) } {...props} />
        ),
        ol: ({node, ...props}) => (
          <ol className={ twMerge("list-decimal ml-4" + defaultTextClass) } {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className={defaultTextClass} {...props} />
        ),
        hr: ({ node, ...props }) => (
          <span {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className={ twMerge("pl-3 ml-2 border-l-2 border-slate-400", defaultTextClass) } {...props} />
        ),
        code: ({ node, ...props }) => (
          <span className={"font-mono whitespace-pre-wrap text-ukraine-blue bg-slate-200 text-sm p-1 rounded-md break-all"} {...props} />
        ),
        a: ({ node, ...props }) => (
          <a
            className={
              "text-ukraine-blue border-b-2 border-opacity-25 hover:border-opacity-100 border-b-ukraine-blue transition-all duration-200 no-underline"
            }
            target="_blank"
            {...props}
          />
        ),
      }}
    >
      { input }
    </ReactMarkdown>
  );
}
