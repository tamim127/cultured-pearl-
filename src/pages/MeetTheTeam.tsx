import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';
import { fetchTeamMembers, fetchPageContent, useWixLiveRefresh, GenericPageContent } from '../services/wixClient';
import { TeamMember, TEAM_MEMBERS } from '../data/teamData';

export function MeetTheTeam() {
  const [team, setTeam] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<GenericPageContent>({
    eyebrow: 'Leadership & Stewards',
    pageTitle: 'Meet the Team',
    description: "Committed to the cause — devoted servant leaders guiding women and families toward purpose, dignity, and God's light.",
  });

  const loadTeam = useCallback(() => {
    fetchPageContent('TeamPage', pageData).then(setPageData);
    fetchTeamMembers()
      .then((data) => {
        if (data && data.length > 0) {
          setTeam(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadTeam();
  }, [loadTeam]);

  useWixLiveRefresh(loadTeam);

  return (
    <div>
      <PageHeader
        eyebrow={pageData.eyebrow || 'Leadership & Stewards'}
        title={pageData.pageTitle || 'Meet the Team'}
        subtitle={pageData.description}
      />

      <Section tone="sand">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Eyebrow text="Our Guiding Scripture" />
          <blockquote className="font-serif text-2xl md:text-3xl text-espresso italic mt-6 leading-relaxed">
            &ldquo;Strength and dignity are her clothing, and she laughs at the time to come. She opens her mouth with wisdom, and the teaching of kindness is on her tongue.&rdquo;
          </blockquote>
          <p className="mt-4 text-xs font-sans uppercase tracking-[0.2em] text-gold font-bold">— Proverbs 31:25-26 ESV</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-pearl rounded-2xl h-96 border border-sand/80 shadow-soft" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-pearl rounded-2xl overflow-hidden border border-sand/80 shadow-soft hover:shadow-hover transition duration-300 flex flex-col"
              >
                <div className="relative h-72 overflow-hidden bg-sand/30">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-pearl">
                    <h3 className="font-serif text-2xl font-bold leading-tight drop-shadow">{member.name}</h3>
                    <p className="text-xs uppercase tracking-widest text-gold-soft font-medium mt-1">{member.role}</p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  {member.education && (
                    <p className="text-xs font-sans text-espresso/60 italic pb-2 border-b border-sand">
                      {member.education}
                    </p>
                  )}

                  <div className="space-y-3 text-sm text-espresso/80 leading-relaxed font-sans">
                    {member.bio.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {member.quote && (
                    <div className="mt-4 p-4 rounded-xl bg-sand/40 border-l-2 border-gold text-xs italic text-espresso/70">
                      {member.quote}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
