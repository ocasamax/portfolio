import { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { categories } from "@/data/portfolio";
import { Gallery } from "@/components/Gallery";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const category = useMemo(() => 
    categories.find((c) => c.slug === slug),
    [slug]
  );

  if (!category) return <Navigate to="/" replace />;

  return (
    <section>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {category.title}
        </h1>
        {category.subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">{category.subtitle}</p>
        )}
      </div>

      <Gallery images={category.images} categorySlug={category.slug} />
    </section>
  );
}
