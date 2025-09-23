import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import WhyChooseUs from "./pages/WhyChooseUs";
import Team from "./pages/Team";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle.tsx";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
import AdminLayout from './pages/admin/AdminLayout';
import BlogsList from './pages/admin/BlogsList';
import BlogEditor from './pages/admin/BlogEditor';
import CareersList from './pages/admin/CareersList';
import CareerEditor from './pages/admin/CareerEditor';
import TeamList from './pages/admin/TeamList';
import TeamEditor from './pages/admin/TeamEditor';
import ServicesList from './pages/admin/ServicesList';
import ServiceEditor from './pages/admin/ServiceEditor';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            {/* Temporarily disabled career pages
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:careerId" element={<CareerDetail />} />
            */}
            <Route path="/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/team" element={<Team />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/contact" element={<Contact />} />
            {/* Admin area - No authentication required for development */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="services" replace />} />
              <Route path="services" element={<ServicesList />} />
              <Route path="services/new" element={<ServiceEditor />} />
              <Route path="services/edit/:id" element={<ServiceEditor />} />
              <Route path="blogs" element={<BlogsList />} />
              <Route path="blogs/new" element={<BlogEditor />} />
              <Route path="blogs/:id" element={<BlogEditor />} />
              <Route path="careers" element={<CareersList />} />
              <Route path="careers/new" element={<CareerEditor />} />
              <Route path="careers/:id" element={<CareerEditor />} />
              <Route path="team" element={<TeamList />} />
              <Route path="team/new" element={<TeamEditor />} />
              <Route path="team/:id" element={<TeamEditor />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
