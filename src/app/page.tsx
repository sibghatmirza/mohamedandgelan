'use client';

import React from 'react';

import VideoIntro           from '@/components/ui/VideoIntro';
import LangToggle           from '@/components/ui/LangToggle';
import InvitationHero       from '@/components/sections/InvitationHero';
import CountdownSection     from '@/components/sections/CountdownSection';
import DateLocationSection  from '@/components/sections/DateLocationSection';
import EventsSection        from '@/components/sections/EventsSection';
import VenueSection         from '@/components/sections/VenueSection';
import AccommodationSection from '@/components/sections/AccommodationSection';
import RSVPSection          from '@/components/sections/RSVPSection';
import FooterSection        from '@/components/sections/FooterSection';
import MusicPlayer          from '@/components/ui/MusicPlayer';

export default function Home() {
  return (
    <main>
      {/* Opening banner video → fades to the invitation */}
      <VideoIntro />
      <LangToggle />
      {/* 1 — Invitation (bismillah + names + message) */}
      <InvitationHero />
      {/* 2 — Countdown */}
      <CountdownSection />
      {/* 3 — Date & Location */}
      <DateLocationSection />
      {/* 4 — Agenda */}
      <EventsSection />
      {/* 5 — Venue details */}
      <VenueSection />
      {/* 6 — Accommodation */}
      <AccommodationSection />
      {/* 7 — RSVP */}
      <RSVPSection />
      <FooterSection />
      <MusicPlayer src="/music/enta-omry.mp3" startAt={56} />
    </main>
  );
}
