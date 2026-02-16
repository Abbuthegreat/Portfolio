import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import InterestsSection from "../components/InterestsSection";
import ProjectsSection from "../components/ProjectsSection";
import ResumeSection from "../components/ResumeSection";
import AchievementsSection from "../components/AchievementsSection";
import ExperienceSection from "../components/ExperienceSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <InterestsSection />
      <ProjectsSection />
      <ResumeSection />
      <AchievementsSection />
      <ExperienceSection />
      <Footer />
    </div>
  );
};

export default Index;
