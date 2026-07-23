import React from "react";
import { Icon } from "./Icon.jsx";
import { Placeholder } from "./Placeholder.jsx";

export function ServiceCard({ service, index = 0 }) {
  return (
    <a
      href={`/hizmetler/${service.slug}`}
      className="card card-hover group flex flex-col overflow-hidden"
    >
      <Placeholder image={service.image} icon={service.icon} label={service.title} seed={index} />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-clay/10 text-clay transition-colors group-hover:bg-clay group-hover:text-white">
          <Icon name={service.icon} className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-espresso">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-espresso-soft">{service.summary}</p>
        <span className="link-underline mt-4 text-sm">
          Detayları Gör
          <Icon name="arrow" className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

export function ProjectCard({ project, index = 0 }) {
  return (
    <a
      href={`/referanslar/${project.slug}`}
      className="card card-hover group flex flex-col overflow-hidden"
    >
      <div className="relative">
        <Placeholder image={project.image} icon="turnkey" label={project.title} seed={index + 1} />
        {project.location && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-espresso backdrop-blur-sm">
            <Icon name="location" className="h-3.5 w-3.5 text-clay" />
            {project.location}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-espresso">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-espresso-soft line-clamp-3">
          {project.description}
        </p>
        <span className="link-underline mt-4 text-sm">
          İncele
          <Icon name="arrow" className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

export function PostCard({ post, index = 0 }) {
  return (
    <a href={`/blog/${post.slug}`} className="card card-hover group flex flex-col overflow-hidden">
      <Placeholder image={post.cover} icon="sparkle" label={post.title} seed={index + 2} ratio="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-6">
        {post.tags?.length > 0 && (
          <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-clay">
            {post.tags[0]}
          </span>
        )}
        <h3 className="text-lg font-semibold leading-snug text-espresso transition-colors group-hover:text-clay">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-espresso-soft line-clamp-3">
          {post.excerpt}
        </p>
        <span className="link-underline mt-4 text-sm">
          Devamını Oku
          <Icon name="arrow" className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}
