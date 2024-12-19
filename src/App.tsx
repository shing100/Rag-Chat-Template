import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import DocumentUpload from "./components/upload/DocumentUpload";
import routes from "tempo-routes";
import Layout from "./components/layout/Layout";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="chat-theme">
      <Suspense fallback={<p>로딩중...</p>}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<DocumentUpload />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </Layout>
      </Suspense>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
