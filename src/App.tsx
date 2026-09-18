import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import MemberLayout from "@/components/MemberLayout";
import Index from "./pages/Index";
import BookClubs from "./pages/BookClubs";
import Subscriptions from "./pages/Subscriptions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookClubPost from "./pages/BookClubPost";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/account/Dashboard";
import Profile from "./pages/account/Profile";
import Subscription from "./pages/account/Subscription";
import Reading from "./pages/account/Reading";
import Content from "./pages/account/Content";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/book-clubs" element={<BookClubs />} />
            <Route path="/book-clubs/:slug" element={<BookClubPost />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin" element={<Admin />} />

            {/* Protected member panel */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MemberLayout />}>
                <Route path="/account" element={<Dashboard />} />
                <Route path="/account/profile" element={<Profile />} />
                <Route path="/account/subscription" element={<Subscription />} />
                <Route path="/account/reading" element={<Reading />} />
                <Route path="/account/content" element={<Content />} />
              </Route>
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
