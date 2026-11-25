import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Core Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { MeetTheTeam } from './pages/MeetTheTeam';
import { Debutante } from './pages/Debutante';
import { Scholarship } from './pages/Scholarship';
import { Events } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { GetInvolved } from './pages/GetInvolved';
import { Give } from './pages/Give';
import { Shop } from './pages/Shop';
import { Gallery } from './pages/Gallery';
import { Videos } from './pages/Videos';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Sisterhood } from './pages/Sisterhood';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-pearl text-espresso antialiased">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <p className="font-serif text-lg italic text-espresso/60">Loading Cultured Pearl...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/meet-the-team" element={<MeetTheTeam />} />
            <Route path="/debutante" element={<Debutante />} />
            <Route path="/scholarship" element={<Scholarship />} />
            <Route path="/purposefullifescholarship" element={<Scholarship />} />
            
            {/* Events Routes */}
            <Route path="/events" element={<Events />} />
            <Route path="/upcoming-events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/event-details/:slug" element={<EventDetail />} />

            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/give" element={<Give />} />
            <Route path="/shop" element={<Shop />} />
            
            {/* Galleries & Media */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery-1" element={<Gallery />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/members" element={<Sisterhood />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
