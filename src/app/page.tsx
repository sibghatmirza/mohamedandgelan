'use client';

import React from 'react';

import Navbar              from '@/components/layout/Navbar';
import EnvelopeIntro       from '@/components/ui/EnvelopeIntro';
import VideoBanner         from '@/components/sections/VideoBanner';
import InvitationCollage   from '@/components/sections/InvitationCollage';
import DateLocationSection from '@/components/sections/DateLocationSection';
import VenueSection        from '@/components/sections/VenueSection';
import EventsSection       from '@/components/sections/EventsSection';
import OurStorySection     from '@/components/sections/OurStorySection';
import QuranSection        from '@/components/sections/QuranSection';
import RSVPSection         from '@/components/sections/RSVPSection';
import FooterSection       from '@/components/sections/FooterSection';
import { FloatingPetals } from '@/components/ui/WatercolorIllustrations';

export default function Home() {
  return (
    <main>
      <EnvelopeIntro />
      <FloatingPetals />
      <Navbar />
      <VideoBanner />
      <InvitationCollage />
      <DateLocationSection />
      <VenueSection />
      <EventsSection />
      <OurStorySection />
      <QuranSection />
      <RSVPSection />
      <FooterSection />
    </main>
  );
}
