"use client";

import * as React from "react";
import Link from "next/link";
import { Pencil, Trash2, LogOut, Plus, X, Bold, Italic, List } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  filterExperiencesByCategory,
  formatExperienceTimePeriod,
  getExperienceCompanyLabel,
  type ExperienceCategory,
  type ExperienceFormInput,
  type PortfolioExperience,
  usePortfolioExperiences,
} from "@/lib/experience-store";
import { isAdminAuthenticated, loginAdmin, logoutAdmin } from "@/lib/admin-auth";
import { renderRichTextToHtml } from "@/lib/rich-text";

type FormState = ExperienceFormInput & {
  skillDraft: string;
  highlightsDraft: string;
};

function createEmptyForm(category: ExperienceCategory = "finance"): FormState {
  return {
    category,
    title: "",
    company: "",
    location: "",
    fromDate: "",
    toDate: "",
    isPresent: true,
    description: "",
    highlights: [],
    skills: [],
    logo: "",
    skillDraft: "",
    highlightsDraft: "",
  };
}

function mapExperienceToForm(item: PortfolioExperience): FormState {
  return {
    category: item.category,
    title: item.title,
    company: item.company,
    location: item.location,
    fromDate: item.fromDate,
    toDate: item.toDate,
    isPresent: item.isPresent,
    description: item.description,
    highlights: [...item.highlights],
    skills: [...item.skills],
    logo: item.logo,
    skillDraft: "",
    highlightsDraft: "",
  };
}

const CATEGORY_LABEL: Record<ExperienceCategory, string> = {
  finance: "Finance",
  web: "Web Development",
};

export function AdminExperiencePanel() {
  const descriptionRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authError, setAuthError] = React.useState("");

  const [form, setForm] = React.useState<FormState>(createEmptyForm("finance"));
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState("");
  const [activeListCategory, setActiveListCategory] =
    React.useState<ExperienceCategory>("finance");

  const { items, hydrated, addExperience, updateExperience, deleteExperience } =
    usePortfolioExperiences();

  React.useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
    setIsCheckingAuth(false);
  }, []);

  function resetForm(nextCategory: ExperienceCategory = form.category) {
    setForm(createEmptyForm(nextCategory));
    setEditingId(null);
    setFormError("");
  }

  function handleCategoryChange(value: string) {
    if (value !== "finance" && value !== "web") return;
    const nextCategory = value as ExperienceCategory;
    setForm((prev) => ({ ...createEmptyForm(nextCategory), logo: prev.logo }));
    setEditingId(null);
    setFormError("");
  }

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ok = loginAdmin(username, password);
    if (!ok) {
      setAuthError("Invalid admin credentials.");
      return;
    }

    setAuthError("");
    setIsAuthenticated(true);
    setPassword("");
  }

  function handleLogout() {
    logoutAdmin();
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  }

  function addSkill() {
    const value = form.skillDraft.trim();
    if (!value) return;
    if (form.skills.includes(value)) {
      setForm((prev) => ({ ...prev, skillDraft: "" }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      skills: [...prev.skills, value],
      skillDraft: "",
    }));
  }

  function addHighlight() {
    const value = form.highlightsDraft.trim();
    if (!value) return;

    setForm((prev) => ({
      ...prev,
      highlights: [...prev.highlights, value],
      highlightsDraft: "",
    }));
  }

  function removeSkill(skill: string) {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item !== skill),
    }));
  }

  function removeHighlight(index: number) {
    setForm((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  }

  function onLogoUpload(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const nextLogo = reader.result;
      if (typeof nextLogo === "string") {
        setForm((prev) => ({ ...prev, logo: nextLogo }));
      }
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!form.title.trim()) {
      setFormError("Job designation / title is required.");
      return;
    }
    if (!form.company.trim()) {
      setFormError("Company name is required.");
      return;
    }
    if (!form.fromDate) {
      setFormError("From date is required.");
      return;
    }
    if (!form.isPresent && !form.toDate) {
      setFormError("Please enter a To date or select Present.");
      return;
    }
    if (!form.description.trim()) {
      setFormError("Description is required.");
      return;
    }
    if (!form.skills.length) {
      setFormError("Add at least one skill.");
      return;
    }

    const payload: ExperienceFormInput = {
      category: form.category,
      title: form.title,
      company: form.company,
      location: form.location,
      fromDate: form.fromDate,
      toDate: form.isPresent ? "" : form.toDate,
      isPresent: form.isPresent,
      description: form.description,
      highlights: form.highlights,
      skills: form.skills,
      logo: form.logo,
    };

    if (editingId) {
      updateExperience(editingId, payload);
    } else {
      addExperience(payload);
    }

    resetForm(form.category);
  }

  function handleEdit(item: PortfolioExperience) {
    setEditingId(item.id);
    setForm(mapExperienceToForm(item));
    setActiveListCategory(item.category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(item: PortfolioExperience) {
    const confirmDelete = window.confirm(
      `Delete "${item.title}" from ${CATEGORY_LABEL[item.category]} experience?`
    );
    if (!confirmDelete) return;
    deleteExperience(item.id);

    if (editingId === item.id) {
      resetForm(item.category);
    }
  }

  const financeItems = filterExperiencesByCategory(items, "finance");
  const webItems = filterExperiencesByCategory(items, "web");
  const visibleItems = activeListCategory === "finance" ? financeItems : webItems;

  function applyDescriptionFormat(
    mode: "bold" | "italic" | "bullet"
  ) {
    const textarea = descriptionRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? start;
    const selected = form.description.slice(start, end);

    let replacement = selected;
    if (mode === "bold") {
      replacement = selected ? `**${selected}**` : "**bold text**";
    } else if (mode === "italic") {
      replacement = selected ? `*${selected}*` : "*italic text*";
    } else {
      const lines = (selected || "Bullet point").split("\n");
      replacement = lines.map((line) => `- ${line.replace(/^[-*]\s+/, "")}`).join("\n");
    }

    const next =
      form.description.slice(0, start) +
      replacement +
      form.description.slice(end);

    setForm((prev) => ({ ...prev, description: next }));

    requestAnimationFrame(() => {
      const cursor = start + replacement.length;
      textarea.focus();
      textarea.setSelectionRange(cursor, cursor);
    });
  }

  if (isCheckingAuth || !hydrated) {
    return (
      <section className="space-y-4 py-10">
        <div className="glass rounded-3xl p-8 text-sm text-muted-foreground">
          Loading admin panel...
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="max-w-xl mx-auto space-y-5 py-10">
        <div className="glass rounded-3xl p-7 space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">Admin Login</h1>
          <p className="text-sm text-muted-foreground">
            This route is hidden from the public navbar. Sign in as admin to add,
            edit, and delete portfolio experiences.
          </p>
          <p className="text-xs text-muted-foreground">
            Default credentials: <span className="font-medium">admin</span> /{" "}
            <span className="font-medium">admin123</span>
          </p>
        </div>

        <form onSubmit={handleLogin} className="glass rounded-3xl p-7 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter admin username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
          </div>

          {authError ? <p className="text-sm text-destructive">{authError}</p> : null}

          <Button type="submit" className="rounded-xl">
            Login as Admin
          </Button>
        </form>
      </section>
    );
  }

  return (
    <section className="space-y-8 py-6">
      <div className="glass rounded-3xl p-6 md:p-7 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Experience Admin
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage Finance and Web Development experience cards shown on the
            portfolio.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild type="button" variant="outline" className="rounded-xl">
            <Link href="/admin/projects">Manage Projects</Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 md:p-7 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight">
            {editingId ? "Edit Experience" : "Add New Experience"}
          </h2>
          <Tabs value={form.category} onValueChange={handleCategoryChange}>
            <TabsList>
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="web">Web Development</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {form.category === "finance" ? "Job Designation" : "Role / Job Title"}
            </label>
            <Input
              value={form.title}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, title: event.target.value }))
              }
              placeholder="e.g. Senior Executive Billing & Accounts Receivable"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {form.category === "finance" ? "Company Name" : "Company / Client Name"}
            </label>
            <Input
              value={form.company}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, company: event.target.value }))
              }
              placeholder="e.g. I2c Inc."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              value={form.location}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, location: event.target.value }))
              }
              placeholder="e.g. Lahore, Pakistan"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Company Logo Upload</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(event) => onLogoUpload(event.target.files?.[0] ?? null)}
            />
            {form.logo ? (
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl border border-border/60 bg-black/10 p-2">
                  <img
                    src={form.logo}
                    alt="Uploaded company logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => setForm((prev) => ({ ...prev, logo: "" }))}
                >
                  Remove Logo
                </Button>
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">From Date</label>
            <Input
              type="month"
              value={form.fromDate}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, fromDate: event.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">To Date</label>
            <Input
              type="month"
              disabled={form.isPresent}
              value={form.toDate}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, toDate: event.target.value }))
              }
            />
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={form.isPresent}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    isPresent: event.target.checked,
                    toDate: event.target.checked ? "" : prev.toDate,
                  }))
                }
              />
              Show as Present
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-sm font-medium">Description</label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() => applyDescriptionFormat("bold")}
              >
                <Bold className="h-4 w-4" />
                Bold
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() => applyDescriptionFormat("italic")}
              >
                <Italic className="h-4 w-4" />
                Italic
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() => applyDescriptionFormat("bullet")}
              >
                <List className="h-4 w-4" />
                Bullet
              </Button>
            </div>
          </div>
          <Textarea
            ref={descriptionRef}
            value={form.description}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, description: event.target.value }))
            }
            placeholder={
              form.category === "finance"
                ? "Write a short summary of finance responsibilities."
                : "Write a short summary of web development work."
            }
            className="min-h-[110px]"
          />
          <div className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3">
            <div className="text-xs text-muted-foreground mb-2">Preview</div>
            <div
              className="text-sm text-muted-foreground leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_strong]:text-foreground [&_em]:italic [&_.rt-space]:h-2"
              dangerouslySetInnerHTML={{
                __html: renderRichTextToHtml(form.description || ""),
              }}
            />
          </div>
        </div>

        {form.category === "web" ? (
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Key Highlights / Achievements (optional)
            </label>
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                value={form.highlightsDraft}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    highlightsDraft: event.target.value,
                  }))
                }
                placeholder="Type one highlight and click add"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addHighlight();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={addHighlight}
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>

            {form.highlights.length ? (
              <div className="space-y-2">
                {form.highlights.map((highlight, index) => (
                  <div
                    key={`${highlight}-${index}`}
                    className="rounded-xl border border-border/60 px-3 py-2 text-sm flex items-center justify-between gap-2"
                  >
                    <span>{highlight}</span>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => removeHighlight(index)}
                      aria-label="Remove highlight"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="space-y-3">
          <label className="text-sm font-medium">Skills (add multiple)</label>
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              value={form.skillDraft}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, skillDraft: event.target.value }))
              }
              placeholder="Type a skill and click add"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={addSkill}
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>

          {form.skills.length ? (
            <div className="flex flex-wrap gap-2">
              {form.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="rounded-full border-border/60 bg-black/10"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          ) : null}
        </div>

        {formError ? <p className="text-sm text-destructive">{formError}</p> : null}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" className="rounded-xl">
            {editingId ? "Save Changes" : "Add Experience"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={() => resetForm(form.category)}
          >
            Clear Form
          </Button>
        </div>
      </form>

      <div className="glass rounded-3xl p-6 md:p-7 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight">
            Existing Experiences
          </h2>
          <Tabs
            value={activeListCategory}
            onValueChange={(value) => {
              if (value === "finance" || value === "web") {
                setActiveListCategory(value);
              }
            }}
          >
            <TabsList>
              <TabsTrigger value="finance">Finance ({financeItems.length})</TabsTrigger>
              <TabsTrigger value="web">Web ({webItems.length})</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {!visibleItems.length ? (
          <p className="text-sm text-muted-foreground">
            No experience added yet for {CATEGORY_LABEL[activeListCategory]}.
          </p>
        ) : (
          <div className="space-y-3">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-border/60 bg-background/35 p-4"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-base font-semibold">{item.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {getExperienceCompanyLabel(item)}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="rounded-full">
                      {formatExperienceTimePeriod(item)}
                    </Badge>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-xl"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="rounded-xl"
                      onClick={() => handleDelete(item)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
