import Layout from "@/components/Layout";
import type { ReactNode } from "react";

/**
 * Reusable page for long-form editorial/legal content (Privacy, Terms, Careers).
 * Content is passed as structured data so pages stay clean and easy to edit.
 */
export type Block = string | { list: string[] };

export interface LegalSection {
  heading?: string;
  blocks: Block[];
}

interface LegalPageProps {
  title: string;
  eyebrow?: string;
  effectiveDate?: string;
  intro?: Block[];
  sections: LegalSection[];
  footer?: ReactNode;
}

const renderBlocks = (blocks: Block[]) =>
  blocks.map((block, i) => {
    if (typeof block === "string") {
      return (
        <p key={i} className="text-[17px] leading-[1.8] text-foreground/80">
          {block}
        </p>
      );
    }
    return (
      <ul key={i} className="list-disc pl-6 space-y-1.5 text-[17px] leading-[1.7] text-foreground/80">
        {block.list.map((item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>
    );
  });

const LegalPage = ({ title, eyebrow = "Inspire India Talks", effectiveDate, intro, sections, footer }: LegalPageProps) => {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-14 md:py-20">
        <header className="border-b-4 border-foreground pb-6 mb-10">
          <span className="font-mono text-primary font-bold uppercase tracking-[0.3em] text-[11px]">{eyebrow}</span>
          <h1 className="font-serif text-4xl md:text-5xl font-black tracking-tight text-foreground mt-3">{title}</h1>
          {effectiveDate && (
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{effectiveDate}</p>
          )}
        </header>

        {intro && <div className="space-y-5 mb-10">{renderBlocks(intro)}</div>}

        <div className="space-y-10">
          {sections.map((section, i) => (
            <section key={i} className="space-y-4">
              {section.heading && (
                <h2 className="font-serif text-2xl font-bold text-foreground">{section.heading}</h2>
              )}
              {renderBlocks(section.blocks)}
            </section>
          ))}
        </div>

        {footer && <div className="mt-12 border-t border-border pt-8 text-[17px] leading-[1.8] text-foreground/80 space-y-3">{footer}</div>}
      </div>
    </Layout>
  );
};

export default LegalPage;
