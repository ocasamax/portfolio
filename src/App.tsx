import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GallerySkeleton } from "@/components/GallerySkeleton";

// Lazy load page components for code splitting
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const ProjectPage = lazy(() => import("@/pages/ProjectPage"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<GallerySkeleton />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/contact" element={<Contact />} />
              <Route path="/:slug" element={<CategoryPage />} />
              <Route path="/:categorySlug/:projectId" element={<ProjectPage />} />
              <Route path="/" element={<Navigate to="/ui-design" replace />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
