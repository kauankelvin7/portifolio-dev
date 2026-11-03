import { Header } from "@/components/layout/Header";
import ContactSection from "@/features/contact/ContactSection";
import { GitHubSyncSection } from "@/features/github-sync/GitHubSyncSection";
import { PortfolioHome } from "@/features/portfolio/PortfolioHome";

export default function Home() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <Header />
      <main id="main-content">
        <PortfolioHome />
        <GitHubSyncSection />
        <ContactSection />
      </main>
    </div>
  );
}
