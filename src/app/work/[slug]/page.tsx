import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WorkDetail } from "@/components/work/work-detail";
import { getAllSlugs, getWorkBySlug } from "@/lib/data/work";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) return { title: "Not found" };
  return {
    title: item.title,
    description: item.shortDescription,
    openGraph: {
      title: item.title,
      description: item.shortDescription,
      images: [item.thumbnail],
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <Header />
      <main>
        <WorkDetail work={item} />
      </main>
      <Footer />
    </>
  );
}
