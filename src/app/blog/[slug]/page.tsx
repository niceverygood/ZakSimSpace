import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { posts, blogCategoryLabels } from "@/lib/blog-data";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "글을 찾을 수 없어요" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <article className="mx-auto max-w-3xl px-6 lg:px-8 py-14 lg:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-ink-500 hover:text-ink-900 mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            뉴스룸으로
          </Link>

          <header className="mb-10">
            <span className="inline-flex items-center rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-bold text-ink-700">
              {blogCategoryLabels[post.category]}
            </span>
            <h1 className="mt-4 text-[28px] lg:text-[40px] font-extrabold text-ink-900 leading-[1.25] tracking-tight">
              {post.title}
            </h1>
            <p className="mt-5 text-[15px] lg:text-[17px] text-ink-500 leading-[1.75]">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-4 text-[12.5px] text-ink-500">
              <span className="font-bold text-ink-700">{post.author}</span>
              <span className="inline-flex items-center gap-1 tnum">
                <Calendar className="w-3 h-3" strokeWidth={2.5} />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1 tnum">
                <Clock className="w-3 h-3" strokeWidth={2.5} />
                {post.readMins}분
              </span>
            </div>
          </header>

          {post.image && (
            <div className="mb-10 relative aspect-[16/9] rounded-2xl overflow-hidden bg-cream-100 border border-cream-200">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          {/* Body */}
          <div className="space-y-6 text-[15px] lg:text-[16px] leading-[1.9] text-ink-700">
            {post.body.map((block, i) => {
              if (block.type === "p") return <p key={i}>{block.text}</p>;
              if (block.type === "h2")
                return (
                  <h2
                    key={i}
                    className="text-[20px] lg:text-[22px] font-extrabold text-ink-900 pt-4"
                  >
                    {block.text}
                  </h2>
                );
              if (block.type === "ul")
                return (
                  <ul key={i} className="list-disc pl-5 space-y-2">
                    {block.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              if (block.type === "quote")
                return (
                  <blockquote
                    key={i}
                    className="border-l-4 border-navy-400 bg-cream-100 rounded-r-2xl px-6 py-5"
                  >
                    <p className="text-[15.5px] text-ink-800 italic leading-[1.75]">
                      “{block.text}”
                    </p>
                    {block.cite && (
                      <p className="mt-2 text-[12.5px] text-ink-500 font-semibold">
                        — {block.cite}
                      </p>
                    )}
                  </blockquote>
                );
              return null;
            })}
          </div>

          {post.source && (
            <p className="mt-10 pt-6 border-t border-cream-200 text-[12.5px] text-ink-500">
              원문 출처 ·{" "}
              <a
                href={post.source}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-ink-900 break-all"
              >
                {post.source}
              </a>
            </p>
          )}
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="bg-cream-100 py-14 lg:py-20">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
              <h2 className="text-[20px] lg:text-[24px] font-extrabold text-ink-900 mb-6">
                같은 카테고리의 다른 글
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="block rounded-2xl bg-white border border-cream-200 p-5 hover:border-navy-300 transition-colors h-full"
                    >
                      <p className="text-[12px] text-ink-500 tnum">{r.date}</p>
                      <p className="mt-2 text-[14px] font-bold text-ink-900 leading-snug">
                        {r.title}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-navy-700">
                        읽기 <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
