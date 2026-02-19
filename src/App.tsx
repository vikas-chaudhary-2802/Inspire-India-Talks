import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import CategoryDetail from "./pages/CategoryDetail";
import PersonalityDetail from "./pages/PersonalityDetail";
import HostEvent from "./pages/HostEvent";
import Contact from "./pages/Contact";
import YouthSpotlight from "./pages/YouthSpotlight";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:slug" element={<CategoryDetail />} />
          <Route path="/personality/:id" element={<PersonalityDetail />} />
          <Route path="/host-event" element={<HostEvent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/youth-spotlight" element={<YouthSpotlight />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
