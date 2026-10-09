import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDownToLine, ArrowUp, ArrowUpRight, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { PROFILE } from "@/data/site";
import { RegMark } from "@/components/Header";
import Reveal from "./Reveal";

const fieldCls =
  "w-full border-0 border-b border-background/25 bg-transparent px-0 py-3 text-base text-background placeholder:text-background/40 focus:border-spot focus:outline-none focus:ring-0 focus-visible:outline-none";

/** "Proof mode" easter egg: toggles the baseline grid (button or G key). */
const useProofMode = () => {
  const [on, setOn] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("proof-mode", on);
  }, [on]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.key.toLowerCase() === "g" && !e.metaKey && !e.ctrlKey && !e.altKey) setOn((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return [on, setOn] as const;
};

const Contact = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [proof, setProof] = useProofMode();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      toast.success(t("site.contact.copied"));
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast(t("site.contact.copyFailed", { email: PROFILE.email }));
    }
  };

  // The site has no backend: the form composes an email in the visitor's
  // own mail app instead of pretending to send it.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = form.subject.trim() || t("site.contact.subjectDefault");
    const body = `${form.message.trim()}\n\n— ${form.name.trim()}${form.email ? ` (${form.email.trim()})` : ""}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const socials = Object.entries(PROFILE.links).filter(([, url]) => url);

  return (
    <section id="contact" aria-labelledby="contact-title" className="ink-panel relative bg-foreground text-background">
      <div className="mx-auto max-w-[1280px] px-4 pb-10 pt-20 sm:px-6 sm:pt-28 lg:px-10">
        <Reveal as="header">
          <div className="flex items-baseline gap-3 border-t border-background pt-3">
            <span className="font-mono text-xs text-spot">05</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-background/60">{t("site.contact.label")}</span>
          </div>
          <h2 id="contact-title" className="mt-8 max-w-5xl text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-background">
            {t("site.contact.titleA")} <em className="font-serif font-normal italic tracking-normal text-spot">{t("site.contact.titleEm")}</em>{" "}
            {t("site.contact.titleB")}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/70">{t("index.contactSectionIntro")}</p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-background/60">{t("site.contact.emailCta")}</p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="group mt-3 inline-flex max-w-full items-center gap-3 break-all text-[clamp(1.5rem,3.6vw,2.75rem)] font-semibold tracking-tight text-background"
            >
              <span className="ink-link">{PROFILE.email}</span>
              <ArrowUpRight className="h-7 w-7 shrink-0 text-spot transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-background/30 px-5 py-3 text-sm font-semibold transition-colors hover:border-background"
              >
                {copied ? <Check className="h-4 w-4 text-spot" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copied ? t("site.contact.copied") : t("site.contact.copy")}
              </button>
              <a
                href={PROFILE.cvUrl}
                download={PROFILE.cvFileName}
                className="inline-flex items-center gap-2 rounded-full bg-spot px-5 py-3 text-sm font-semibold text-[#141312] transition-transform hover:-translate-y-0.5"
              >
                <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
                {t("site.contact.cv")}
              </a>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-background/20 pt-6 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-background/60">{t("contact.locationLabel")}</dt>
                <dd className="mt-1">{t("index.contactLocationValue")}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-background/60">{t("index.workModelLabel")}</dt>
                <dd className="mt-1">{t("index.workModelValue")}</dd>
              </div>
            </dl>
            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-4 text-sm">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="ink-link capitalize">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
            <form onSubmit={onSubmit} className="space-y-2" aria-describedby="form-note">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-background/60">{t("site.contact.formTitle")}</p>
              <div className="grid gap-x-6 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">{t("index.formNameLabel")}</span>
                  <input
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t("index.formNameLabel")}
                    className={fieldCls}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">{t("index.formEmailLabel")}</span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t("index.formEmailLabel").replace(" *", "")}
                    className={fieldCls}
                  />
                </label>
              </div>
              <label className="block">
                <span className="sr-only">{t("index.formSubjectLabel")}</span>
                <input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder={t("index.formSubjectPlaceholder")}
                  className={fieldCls}
                />
              </label>
              <label className="block">
                <span className="sr-only">{t("index.formMessageLabel")}</span>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t("index.formMessagePlaceholder")}
                  className={`${fieldCls} resize-none`}
                />
              </label>
              <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-spot hover:text-[#141312]"
                >
                  {t("site.contact.send")}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <p id="form-note" className="pt-2 text-xs leading-relaxed text-background/55">
                {t("site.contact.formNote")}
              </p>
            </form>
          </Reveal>
        </div>

        {/* Footer / colophon */}
        <footer className="mt-24 grid gap-6 border-t border-background/20 pt-6 text-xs text-background/60 sm:grid-cols-[1fr_auto_auto] sm:items-center">
          <div className="flex items-center gap-3">
            <RegMark className="h-4 w-4 text-background" />
            <span>
              © {new Date().getFullYear()} {PROFILE.name}. {t("site.footer.colophon")}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setProof(!proof)}
            aria-pressed={proof}
            title={t("site.footer.proofHint")}
            className="inline-flex items-center gap-2 justify-self-start font-mono uppercase tracking-[0.14em] transition-colors hover:text-background"
          >
            <span className={`h-2 w-2 rounded-full border border-current ${proof ? "bg-spot" : ""}`} aria-hidden="true" />
            {t("site.footer.proof")}
          </button>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 justify-self-start font-mono uppercase tracking-[0.14em] transition-colors hover:text-background"
          >
            {t("site.footer.back")}
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
