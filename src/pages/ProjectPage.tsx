import { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { categories } from "@/data/portfolio";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectPage() {
  const { categorySlug, projectId } = useParams<{
    categorySlug: string;
    projectId: string;
  }>();

  const category = useMemo(() => 
    categories.find((c) => c.slug === categorySlug),
    [categorySlug]
  );
  
  const project = useMemo(() => 
    category?.images.find((img) => img.id === projectId),
    [category, projectId]
  );

  if (!category || !project) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="relative">
      {/* Botón volver sticky */}
      <div className="sticky top-0 z-50 -mx-6 md:-mx-12 lg:-mx-16 px-6 md:px-12 lg:px-16 py-4 bg-background border-b border-border mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/${categorySlug}`}>
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a {category.title}</span>
          </Link>
        </Button>
      </div>

      {/* Título */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">
          {project.caption || project.alt}
        </h1>
        {project.description && (
          <p className="text-muted-foreground text-lg">{project.description}</p>
        )}
      </div>

      {/* Imágenes del proyecto */}
      {project.images && project.images.length > 0 && (
        <div className="space-y-6">
          {project.images.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`${project.alt} - imagen ${index + 1}`}
              width={1200}
              height={800}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
              className="w-full h-auto rounded-xl"
            />
          ))}
        </div>
      )}
    </section>
  );
}
