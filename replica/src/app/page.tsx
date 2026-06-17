import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import CoursesSection from "@/components/CoursesSection";
import PlacementsSection from "@/components/PlacementsSection";
import CampusLife from "@/components/CampusLife";
import GallerySection from "@/components/GallerySection";
import NewsAnnouncements from "@/components/NewsAnnouncements";
import Footer from "@/components/Footer";
import CampusBuddyChat from "@/components/CampusBuddyChat";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Top information bar */}
      <TopBar />

      {/* 2. Main navigation header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 3. Hero/banner carousel */}
        <HeroCarousel />

        {/* 4. About section & statistics */}
        <AboutSection />

        {/* 5. Courses and Programs section */}
        <CoursesSection />

        {/* 6. Placement highlights */}
        <PlacementsSection />

        {/* 7. Campus facilities */}
        <CampusLife />

        {/* 9. Gallery section */}
        <GallerySection />

        {/* 10. News and announcements */}
        <NewsAnnouncements />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* 🤖 Campus Buddy AI — Floating Assistant (top-right, fixed) */}
      <CampusBuddyChat />
    </div>
  );
}
