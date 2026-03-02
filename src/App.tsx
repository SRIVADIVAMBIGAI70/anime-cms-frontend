import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Splash from "./pages/Splash";
import Index from "./pages/Index";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AddEditPost from "./pages/AddEditPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<><Navbar /><Index /></>} />
          <Route path="/post/:id" element={<><Navbar /><SinglePost /></>} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/admin" element={<><Navbar /><Admin /></>} />
          <Route path="/admin/new" element={<><Navbar /><AddEditPost /></>} />
          <Route path="/admin/edit/:id" element={<><Navbar /><AddEditPost /></>} />
          <Route path="*" element={<><Navbar /><NotFound /></>} />
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
