import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';
import { BLOG_POSTS } from '../data/storeAndBlogData';

export function Blog() {
  return (
    <div>
      <PageHeader
        eyebrow="Reflections & Articles"
        title="Cultured Pearl Blog"
        subtitle="Insights on faith, sisterhood, community service, and intentional Christian living."
      />

      <Section tone="pearl">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                className="bg-sand/20 rounded-2xl overflow-hidden border border-sand shadow-soft hover:shadow-hover transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-espresso/60 mb-2">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-espresso mb-3 leading-snug">
                      {post.title}
                    </h3>

                    <p className="font-sans text-xs text-espresso/70 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-sand text-xs text-espresso/80">
                      {post.content.map((p, idx) => (
                        <p key={idx} className="line-clamp-2">{p}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <span className="text-xs uppercase tracking-wider text-gold font-bold">
                    By {post.author}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
