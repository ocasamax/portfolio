import { useEffect, useMemo, useState } from "react";
import { useParams, Navigate, useOutletContext } from "react-router-dom";
import { categories } from "@/data/portfolio";
import { Gallery } from "@/components/Gallery";
import { CategorySearch } from "@/components/CategorySearch";
import type { LayoutOutletContext } from "@/components/Layout";

export default function CategoryPage() {
  const { setMobileHeaderAction } = useOutletContext<LayoutOutletContext>();
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredImages = useMemo(() => {
    if (!category) return [];
    if (!normalizedQuery) return category.images;

    return category.images.filter((image) => {
      const searchableValues = [image.caption, image.alt, image.description, image.id];
      return searchableValues.some((value) => value?.toLowerCase().includes(normalizedQuery));
    });
  }, [category, normalizedQuery]);

  useEffect(() => {
    if (!category) {
      setMobileHeaderAction(null);
      return;
    }

    setMobileHeaderAction(
      <CategorySearch
        value={searchQuery}
        onValueChange={setSearchQuery}
        categoryTitle={category.title}
        showDesktop={false}
        showMobile
        mobileButtonClassName="ml-0"
      />,
    );

    return () => setMobileHeaderAction(null);
  }, [category, searchQuery, setMobileHeaderAction]);

  if (!category) return <Navigate to="/" replace />;

  return (
    <section>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{category.title}</h1>
          {category.subtitle && <p className="mt-2 text-sm text-muted-foreground">{category.subtitle}</p>}
        </div>
        <CategorySearch
          value={searchQuery}
          onValueChange={setSearchQuery}
          categoryTitle={category.title}
          showDesktop
          showMobile={false}
        />
      </div>

      {filteredImages.length > 0 ? (
        <Gallery images={filteredImages} categorySlug={category.slug} />
      ) : (
        <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-12 text-center text-sm text-muted-foreground">
          No se encontraron proyectos para "{searchQuery.trim()}".
        </div>
      )}
    </section>
  );
}
