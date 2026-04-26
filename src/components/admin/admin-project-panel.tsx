"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Plus, Trash2, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { refreshAdminSession } from "@/lib/admin-auth";
import {
  filterProjectsByProfile,
  type PortfolioProject,
  type ProjectFormInput,
  usePortfolioProjects,
} from "@/lib/project-store";
import type { Profile } from "@/lib/profile";

type LinkDraft = { title: string; link: string };

type FormState = ProjectFormInput & {
  technologyDraft: string;
  descriptionDraft: string;
  caseDraft: Record<"problem" | "approach" | "architecture" | "challenges" | "outcome", string>;
  webLinkDraft: LinkDraft;
  githubDraft: LinkDraft;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function createEmptyForm(category: Profile = "web"): FormState {
  return {
    category,
    title: "",
    slug: "",
    company: "",
    timePeriod: "",
    descriptionDetail: [],
    technologies: [],
    images: [],
    links: {
      videoType: undefined,
      videoUrl: "",
      webLink: [],
      github: [],
    },
    caseStudy: {
      problem: [],
      approach: [],
      architecture: [],
      challenges: [],
      outcome: [],
    },
    isFeatured: category === "web",
    technologyDraft: "",
    descriptionDraft: "",
    caseDraft: {
      problem: "",
      approach: "",
      architecture: "",
      challenges: "",
      outcome: "",
    },
    webLinkDraft: { title: "", link: "" },
    githubDraft: { title: "", link: "" },
  };
}

function mapToForm(project: PortfolioProject): FormState {
  return {
    category: project.category,
    title: project.title,
    slug: project.slug,
    company: project.company ?? "",
    timePeriod: project.timePeriod ?? "",
    descriptionDetail: [...(project.descriptionDetail ?? [])],
    technologies: [...(project.technologies ?? [])],
    images: [...(project.images ?? [])],
    links: {
      videoType: project.links?.videoType,
      videoUrl: project.links?.videoUrl ?? "",
      webLink: [...(project.links?.webLink ?? [])].map((l) => ({ ...l, id: String(l.id) })),
      github: [...(project.links?.github ?? [])].map((l) => ({ ...l, id: String(l.id) })),
    },
    caseStudy: {
      problem: [...(project.caseStudy?.problem ?? [])],
      approach: [...(project.caseStudy?.approach ?? [])],
      architecture: [...(project.caseStudy?.architecture ?? [])],
      challenges: [...(project.caseStudy?.challenges ?? [])],
      outcome: [...(project.caseStudy?.outcome ?? [])],
    },
    isFeatured: project.isFeatured ?? false,
    technologyDraft: "",
    descriptionDraft: "",
    caseDraft: {
      problem: "",
      approach: "",
      architecture: "",
      challenges: "",
      outcome: "",
    },
    webLinkDraft: { title: "", link: "" },
    githubDraft: { title: "", link: "" },
  };
}

function generateItemId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const CASE_KEYS = ["problem", "approach", "architecture", "challenges", "outcome"] as const;
type CaseKey = (typeof CASE_KEYS)[number];

export function AdminProjectPanel() {
  const [isAuthChecked, setIsAuthChecked] = React.useState(false);
  const [isAuthed, setIsAuthed] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState<Profile>("web");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [form, setForm] = React.useState<FormState>(createEmptyForm("web"));
  const [error, setError] = React.useState("");

  const { items, hydrated, addProject, updateProject, deleteProject } = usePortfolioProjects();

  React.useEffect(() => {
    let cancelled = false;
    void (async () => {
      const ok = await refreshAdminSession();
      if (cancelled) return;
      setIsAuthed(ok);
      setIsAuthChecked(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleProjects = React.useMemo(
    () => filterProjectsByProfile(items, activeCategory),
    [items, activeCategory]
  );

  function resetForm(category: Profile = form.category) {
    setForm(createEmptyForm(category));
    setEditingId(null);
    setError("");
  }

  function setCategory(category: Profile) {
    setActiveCategory(category);
    setForm((prev) => ({ ...createEmptyForm(category), isFeatured: prev.isFeatured }));
    setEditingId(null);
    setError("");
  }

  function addDescriptionPoint() {
    const value = form.descriptionDraft.trim();
    if (!value) return;
    setForm((prev) => ({
      ...prev,
      descriptionDetail: [...prev.descriptionDetail, value],
      descriptionDraft: "",
    }));
  }

  function addTechnology() {
    const value = form.technologyDraft.trim();
    if (!value) return;
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(value)
        ? prev.technologies
        : [...prev.technologies, value],
      technologyDraft: "",
    }));
  }

  function addCasePoint(key: CaseKey) {
    const value = form.caseDraft[key].trim();
    if (!value) return;
    setForm((prev) => ({
      ...prev,
      caseStudy: {
        ...prev.caseStudy,
        [key]: [...(prev.caseStudy?.[key] ?? []), value],
      },
      caseDraft: { ...prev.caseDraft, [key]: "" },
    }));
  }

  function addLink(type: "webLink" | "github") {
    const draft = type === "webLink" ? form.webLinkDraft : form.githubDraft;
    if (!draft.title.trim() || !draft.link.trim()) return;
    setForm((prev) => ({
      ...prev,
      links: {
        ...prev.links,
        [type]: [
          ...(prev.links?.[type] ?? []),
          { id: generateItemId(), title: draft.title.trim(), link: draft.link.trim() },
        ],
      },
      ...(type === "webLink"
        ? { webLinkDraft: { title: "", link: "" } }
        : { githubDraft: { title: "", link: "" } }),
    }));
  }

  async function handleScreenshotUpload(files: FileList | null) {
    if (!files?.length) return;
    const entries = await Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise<{ src: string; title: string; description?: string }>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              const src = typeof reader.result === "string" ? reader.result : "";
              resolve({
                src,
                title: form.title || file.name.replace(/\.[^/.]+$/, ""),
                description: "Website image.",
              });
            };
            reader.readAsDataURL(file);
          })
      )
    );

    setForm((prev) => ({ ...prev, images: [...prev.images, ...entries] }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const slug = slugify(form.slug || form.title);
    if (!form.title.trim()) return setError("Project title is required.");
    if (!slug) return setError("Slug is required.");
    if (!form.descriptionDetail.length) return setError("Add at least one overview point.");
    if (!form.technologies.length) return setError("Add at least one technology.");
    if (!form.images.length) return setError("Upload at least one screenshot.");

    const payload: ProjectFormInput = {
      category: form.category,
      title: form.title,
      slug,
      company: form.company,
      timePeriod: form.timePeriod,
      descriptionDetail: form.descriptionDetail,
      technologies: form.technologies,
      images: form.images,
      links: {
        videoType: form.links?.videoType,
        videoUrl: form.links?.videoUrl,
        webLink: form.links?.webLink,
        github: form.links?.github,
      },
      caseStudy: form.caseStudy,
      isFeatured: form.isFeatured,
    };

    if (editingId) {
      updateProject(editingId, payload);
    } else {
      addProject(payload);
    }

    resetForm(form.category);
  }

  function onEdit(project: PortfolioProject) {
    setEditingId(project.id);
    setActiveCategory(project.category);
    setForm(mapToForm(project));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onDelete(project: PortfolioProject) {
    if (!window.confirm(`Delete "${project.title}" project?`)) return;
    deleteProject(project.id);
    if (editingId === project.id) resetForm(project.category);
  }

  if (!isAuthChecked || !hydrated) {
    return <div className="glass rounded-3xl p-6 text-sm text-muted-foreground">Loading...</div>;
  }

  if (!isAuthed) {
    return (
      <div className="glass rounded-3xl p-6 space-y-3">
        <p className="text-sm text-muted-foreground">
          Please login on `/admin` first to manage projects.
        </p>
        <Button asChild className="rounded-xl">
          <Link href="/admin">Go to Admin Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="glass rounded-3xl p-6 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Project Admin</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Add projects with screenshots, gallery media, links, and full case-study data.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
              Back to Experience Admin
            </Link>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 md:p-7 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight">
            {editingId ? "Edit Project" : "Add New Project"}
          </h2>
          <Tabs value={form.category} onValueChange={(value) => (value === "web" || value === "finance") && setCategory(value)}>
            <TabsList>
              <TabsTrigger value="web">Web Development</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Title</label>
            <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value, slug: p.slug || slugify(e.target.value) }))} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: slugify(e.target.value) }))} placeholder="auto-generated-from-title" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Company / Client</label>
            <Input value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Time Period</label>
            <Input value={form.timePeriod} onChange={(e) => setForm((p) => ({ ...p, timePeriod: e.target.value }))} placeholder="Published on Dec 3, 2025" />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={Boolean(form.isFeatured)}
            onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))}
          />
          Mark as featured case study
        </label>

        <div className="space-y-3">
          <label className="text-sm font-medium">Overview / Description Points</label>
          <div className="flex gap-2">
            <Input
              value={form.descriptionDraft}
              onChange={(e) => setForm((p) => ({ ...p, descriptionDraft: e.target.value }))}
              placeholder="Add one bullet point"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addDescriptionPoint();
                }
              }}
            />
            <Button type="button" variant="outline" className="rounded-xl" onClick={addDescriptionPoint}>
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {form.descriptionDetail.map((point, idx) => (
              <div key={`${point}-${idx}`} className="rounded-xl border border-border/60 px-3 py-2 text-sm flex justify-between gap-2">
                <span>{point}</span>
                <button type="button" onClick={() => setForm((p) => ({ ...p, descriptionDetail: p.descriptionDetail.filter((_, i) => i !== idx) }))}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Technologies</label>
          <div className="flex gap-2">
            <Input
              value={form.technologyDraft}
              onChange={(e) => setForm((p) => ({ ...p, technologyDraft: e.target.value }))}
              placeholder="e.g. Shopify"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTechnology();
                }
              }}
            />
            <Button type="button" variant="outline" className="rounded-xl" onClick={addTechnology}>
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="rounded-full border-border/60 bg-black/10">
                {tech}
                <button type="button" className="ml-2" onClick={() => setForm((p) => ({ ...p, technologies: p.technologies.filter((t) => t !== tech) }))}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Project Screenshots (for gallery/carousel)</label>
          <Input type="file" accept="image/*" multiple onChange={(e) => handleScreenshotUpload(e.target.files)} />
          <div className="grid gap-3 sm:grid-cols-2">
            {form.images.map((img, idx) => (
              <div key={`${img.src}-${idx}`} className="rounded-2xl border border-border/60 p-3 space-y-2">
                <div className="h-28 rounded-xl bg-black/20 overflow-hidden">
                  <img src={img.src} alt={img.title} className="h-full w-full object-cover" />
                </div>
                <Input
                  value={img.title}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      images: p.images.map((item, i) =>
                        i === idx ? { ...item, title: e.target.value } : item
                      ),
                    }))
                  }
                  placeholder="Screenshot title"
                />
                <Textarea
                  value={img.description ?? ""}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      images: p.images.map((item, i) =>
                        i === idx ? { ...item, description: e.target.value } : item
                      ),
                    }))
                  }
                  className="min-h-[80px]"
                  placeholder="Screenshot description"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => setForm((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }))}
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Video Type</label>
            <select
              className="flex h-11 w-full rounded-2xl border border-border/60 bg-background/40 px-4 py-2 text-sm shadow-sm outline-none"
              value={form.links?.videoType ?? ""}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  links: {
                    ...p.links,
                    videoType: e.target.value
                      ? (e.target.value as "loom" | "googleDrive")
                      : undefined,
                  },
                }))
              }
            >
              <option value="">None</option>
              <option value="loom">Loom</option>
              <option value="googleDrive">Google Drive</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Video URL / Drive File ID</label>
            <Input
              value={form.links?.videoUrl ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, links: { ...p.links, videoUrl: e.target.value } }))}
            />
          </div>
        </div>

        {(["webLink", "github"] as const).map((type) => {
          const isWebLink = type === "webLink";
          const draft = isWebLink ? form.webLinkDraft : form.githubDraft;
          const list = isWebLink ? form.links?.webLink ?? [] : form.links?.github ?? [];

          return (
            <div key={type} className="space-y-3">
              <label className="text-sm font-medium">{isWebLink ? "Website Links" : "GitHub Links"}</label>
              <div className="grid gap-2 md:grid-cols-[1fr_2fr_auto]">
                <Input
                  value={draft.title}
                  onChange={(e) =>
                    isWebLink
                      ? setForm((p) => ({ ...p, webLinkDraft: { ...p.webLinkDraft, title: e.target.value } }))
                      : setForm((p) => ({ ...p, githubDraft: { ...p.githubDraft, title: e.target.value } }))
                  }
                  placeholder="Button title"
                />
                <Input
                  value={draft.link}
                  onChange={(e) =>
                    isWebLink
                      ? setForm((p) => ({ ...p, webLinkDraft: { ...p.webLinkDraft, link: e.target.value } }))
                      : setForm((p) => ({ ...p, githubDraft: { ...p.githubDraft, link: e.target.value } }))
                  }
                  placeholder="https://..."
                />
                <Button type="button" variant="outline" className="rounded-xl" onClick={() => addLink(type)}>
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {list.map((entry) => (
                  <div key={String(entry.id)} className="rounded-xl border border-border/60 px-3 py-2 text-sm flex justify-between gap-2">
                    <span className="truncate">{entry.title}: {entry.link}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          links: {
                            ...p.links,
                            [type]: (p.links?.[type] ?? []).filter((l) => String(l.id) !== String(entry.id)),
                          },
                        }))
                      }
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Case Study Sections</h3>
          {CASE_KEYS.map((key) => (
            <div key={key} className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">{key}</label>
              <div className="flex gap-2">
                <Input
                  value={form.caseDraft[key]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, caseDraft: { ...p.caseDraft, [key]: e.target.value } }))
                  }
                  placeholder={`Add ${key} point`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCasePoint(key);
                    }
                  }}
                />
                <Button type="button" variant="outline" className="rounded-xl" onClick={() => addCasePoint(key)}>
                  Add
                </Button>
              </div>
              <div className="space-y-1">
                {(form.caseStudy?.[key] ?? []).map((point, idx) => (
                  <div key={`${point}-${idx}`} className="rounded-xl border border-border/60 px-3 py-2 text-sm flex justify-between gap-2">
                    <span>{point}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          caseStudy: {
                            ...p.caseStudy,
                            [key]: (p.caseStudy?.[key] ?? []).filter((_, i) => i !== idx),
                          },
                        }))
                      }
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" className="rounded-xl">{editingId ? "Save Project" : "Add Project"}</Button>
          <Button type="button" variant="outline" className="rounded-xl" onClick={() => resetForm(form.category)}>
            Clear Form
          </Button>
        </div>
      </form>

      <div className="glass rounded-3xl p-6 md:p-7 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight">Existing Projects</h2>
          <Tabs value={activeCategory} onValueChange={(value) => (value === "web" || value === "finance") && setActiveCategory(value)}>
            <TabsList>
              <TabsTrigger value="web">Web ({filterProjectsByProfile(items, "web").length})</TabsTrigger>
              <TabsTrigger value="finance">Finance ({filterProjectsByProfile(items, "finance").length})</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="space-y-3">
          {visibleProjects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-border/60 bg-background/35 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{project.title}</div>
                  <p className="text-sm text-muted-foreground">{project.company}</p>
                </div>
                <div className="flex gap-2">
                  {project.isFeatured ? <Badge variant="secondary" className="rounded-full">Featured</Badge> : null}
                  <Button type="button" variant="outline" size="sm" className="rounded-xl" onClick={() => onEdit(project)}>
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button type="button" variant="destructive" size="sm" className="rounded-xl" onClick={() => onDelete(project)}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {!visibleProjects.length ? (
            <p className="text-sm text-muted-foreground">No projects found in this category.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
