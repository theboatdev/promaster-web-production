import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/products/detail/ProductGallery";
import ProjectDetailMeta from "@/components/projects/detail/ProjectDetailMeta";
import ProjectDetailSections from "@/components/projects/detail/ProjectDetailSections";
import ProjectCTA from "@/components/projects/detail/ProjectCTA";
import {
  getAllProjectParams,
  getProjectDetailBySlug,
} from "@/lib/projects/detail";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectParams();
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectDetailBySlug(slug);

  if (!project) {
    return { title: "Project Not Found | Pro Master" };
  }

  return {
    title: `${project.name} | Pro Master Projects`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectDetailBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="page-main">
        <div className="project-detail-nav">
          <Link href="/projects" className="project-detail-back">
            ← All Projects
          </Link>
        </div>

        <div className="detail-wrap">
          <ProductGallery images={project.images} productName={project.name} />

          <div className="detail-info detail-info--project">
            <ProjectDetailMeta project={project} />
            <ProjectDetailSections project={project} />
            <ProjectCTA project={project} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
