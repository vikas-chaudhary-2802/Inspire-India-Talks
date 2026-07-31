import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import PersonalityDetail from "./pages/PersonalityDetail";
import HostEvent from "./pages/HostEvent";
import Contact from "./pages/Contact";
import YouthSpotlight from "./pages/YouthSpotlight";
import NotFound from "./pages/NotFound";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import TreeVolution from "./pages/TreeVolution";
import BusinessInsights from "./pages/BusinessInsights";
import BusinessInsightDetail from "./pages/BusinessInsightDetail";
import FoundersStories from "./pages/InspiringVoices"; // Re-purposed as Founders Stories
import NewsletterStatus from "./pages/NewsletterStatus";

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
          <Route path="/founders-talk" element={<FoundersStories />} />
          <Route path="/personality/:id" element={<PersonalityDetail />} />
          <Route path="/host-event" element={<HostEvent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/youth-spotlight" element={<YouthSpotlight />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/tree-volution" element={<TreeVolution />} />
          <Route path="/business-insights" element={<BusinessInsights feed="insights" />} />
          <Route path="/business-legacy" element={<BusinessInsights feed="legacy" />} />
          <Route path="/startup-stories" element={<BusinessInsights feed="startups" />} />
          <Route path="/business-insights/:id" element={<BusinessInsightDetail />} />
          <Route path="/newsletter/confirmed" element={<NewsletterStatus variant="confirmed" />} />
          <Route path="/newsletter/unsubscribed" element={<NewsletterStatus variant="unsubscribed" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
