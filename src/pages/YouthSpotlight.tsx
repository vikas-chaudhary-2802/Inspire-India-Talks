import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Video, FileText, Sparkles, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { approvedYouthStories, type YouthSpotlightStory } from "@/data/youthSpotlightStories";

const WEB3FORMS_KEY = "4cde47b8-4bc1-40b8-8166-72179e1d74e9";

const categories = [
  "Social Impact",
  "Innovation",
  "Leadership",
  "Environment",
  "Culture",
  "Personal Growth",
];

const MAX_WORDS = 300;

const YouthSpotlight = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [articleText, setArticleText] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const wordCount = articleText.trim() ? articleText.trim().split(/\s+/).filter(Boolean).length : 0;
  const isOverLimit = wordCount > MAX_WORDS;

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    const name = formData.get("name") as string;
    const college = formData.get("college") as string;
    const city = formData.get("city") as string;
    const category = formData.get("category") as string;
    const video = formData.get("videoLink") as string;
    const article = formData.get("article") as string;
    const honeypot = formData.get("website") as string;

    // Honeypot check
    if (honeypot) {
      newErrors.honeypot = "Spam detected";
      setErrors(newErrors);
      return false;
    }

    if (!name?.trim()) newErrors.name = "Full name is required";
    if (!college?.trim()) newErrors.college = "College/School is required";
    if (!city?.trim()) newErrors.city = "City is required";
    if (!category?.trim()) newErrors.category = "Category is required";
    if (!consentChecked) newErrors.consent = "Consent is required";

    // At least one of video or article required
    if (!video?.trim() && !article?.trim()) {
      newErrors.content = "Please provide either a video link or an article";
    }

    // Article validation
    if (article?.trim()) {
      const words = article.trim().split(/\s+/).filter(Boolean).length;
      if (words > MAX_WORDS) {
        newErrors.article = `Article must be ${MAX_WORDS} words or less (currently ${words} words)`;
      }
      if (words === 0) {
        newErrors.article = "Article cannot be empty";
      }
    }

    // Video link validation (if provided)
    if (video?.trim() && !video.includes("drive.google.com")) {
      newErrors.videoLink = "Please provide a valid Google Drive link";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!validateForm(formData)) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      formData.append("access_key", WEB3FORMS_KEY);
      formData.append("subject", "Youth Spotlight Submission — Inspire India Talks");
      formData.append("from_name", "Inspire India Talks — Youth Spotlight");
      formData.append("category", categoryValue);
      if (consentChecked) formData.append("consent", "accepted");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setShowSuccess(true);
        formRef.current?.reset();
        setArticleText("");
        setVideoLink("");
        setCategoryValue("");
        setConsentChecked(false);
        setErrors({});

        toast({
          title: "Submission Successful! ✅",
          description: "Your story has been submitted. We'll review it and get back to you soon.",
        });

        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Error",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden gradient-mesh">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">Youth Spotlight</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold glow-text">
              Share Your <span className="text-primary">Inspiring Story</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-lg">
              Are you a student making a difference? Submit your inspiring story through a 60-second video or a 300-word article and get featured on our platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Submission Guidelines</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Video className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Video Submission</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a 60-second inspiring video to Google Drive and share the link. Ensure the video is publicly accessible.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Article Submission</h3>
                  <p className="text-sm text-muted-foreground">
                    Write a compelling 300-word article sharing your inspiring journey, impact, or achievement.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground mb-2">What We're Looking For:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Authentic stories of impact and inspiration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Clear demonstration of leadership or innovation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Positive impact on community or society</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Original content (no plagiarism)</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Submission Form */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-8"
          >
            {showSuccess ? (
              <div className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-6">
                  Your submission has been received. Our team will review it and get back to you within 5-7 business days.
                </p>
                <Button
                  onClick={() => setShowSuccess(false)}
                  variant="outline"
                  className="rounded-xl"
                >
                  Submit Another Story
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot Field - Hidden */}
                <input
                  ref={honeypotRef}
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute opacity-0 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Full Name */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    name="name"
                    required
                    placeholder="Your full name"
                    className={`bg-background/50 border-border/50 ${errors.name ? "border-destructive" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* College/School and City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      College/School <span className="text-primary">*</span>
                    </label>
                    <Input
                      name="college"
                      required
                      placeholder="Your college or school"
                      className={`bg-background/50 border-border/50 ${errors.college ? "border-destructive" : ""}`}
                    />
                    {errors.college && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.college}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      City <span className="text-primary">*</span>
                    </label>
                    <Input
                      name="city"
                      required
                      placeholder="Your city"
                      className={`bg-background/50 border-border/50 ${errors.city ? "border-destructive" : ""}`}
                    />
                    {errors.city && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">
                    Category <span className="text-primary">*</span>
                  </label>
                  <Select value={categoryValue} onValueChange={setCategoryValue} required>
                    <SelectTrigger className={`bg-background/50 border-border/50 ${errors.category ? "border-destructive" : ""}`}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.category}
                    </p>
                  )}
                </div>

                {/* Video Link */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">
                    Google Drive Video Link <span className="text-muted-foreground">(Optional)</span>
                  </label>
                  <Input
                    name="videoLink"
                    type="url"
                    placeholder="https://drive.google.com/file/d/..."
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    className={`bg-background/50 border-border/50 ${errors.videoLink ? "border-destructive" : ""}`}
                  />
                  {errors.videoLink && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.videoLink}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Make sure your Google Drive file is set to "Anyone with the link can view"
                  </p>
                </div>

                {/* Article */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">
                    Article <span className="text-muted-foreground">(Optional, max {MAX_WORDS} words)</span>
                  </label>
                  <Textarea
                    name="article"
                    rows={8}
                    placeholder="Share your inspiring story in 300 words or less..."
                    value={articleText}
                    onChange={(e) => setArticleText(e.target.value)}
                    className={`bg-background/50 border-border/50 resize-none ${errors.article || isOverLimit ? "border-destructive" : ""}`}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      {errors.article && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.article}
                        </p>
                      )}
                      {errors.content && !errors.article && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.content}
                        </p>
                      )}
                    </div>
                    <p className={`text-xs ${isOverLimit ? "text-destructive" : wordCount > MAX_WORDS * 0.9 ? "text-primary" : "text-muted-foreground"}`}>
                      {wordCount} / {MAX_WORDS} words
                    </p>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consentChecked}
                    onCheckedChange={(checked) => setConsentChecked(!!checked)}
                    className={`mt-1 ${errors.consent ? "border-destructive" : ""}`}
                  />
                  <label htmlFor="consent" className="text-sm text-foreground cursor-pointer">
                    I confirm that the content I'm submitting is original and I have the right to share it. I understand that my submission will be reviewed before being published.{" "}
                    <span className="text-primary">*</span>
                  </label>
                </div>
                {errors.consent && (
                  <p className="text-xs text-destructive flex items-center gap-1 -mt-2">
                    <AlertCircle className="h-3 w-3" /> {errors.consent}
                  </p>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full rounded-xl py-6 text-base font-medium"
                  disabled={isSubmitting || isOverLimit}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" /> Submit Story
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Approved Stories Section */}
      {approvedYouthStories.length > 0 && (
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">Featured Stories</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12">
              Spotlight on <span className="text-primary">Youth Achievers</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedYouthStories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </Layout>
  );
};

// Story Card Component
const StoryCard = ({ story, index }: { story: YouthSpotlightStory; index: number }) => {
  const [showFullArticle, setShowFullArticle] = useState(false);
  const articlePreview = story.article ? story.article.substring(0, 150) + "..." : null;
  const isTruncated = story.article && story.article.length > 150;

  // Convert Google Drive link to embeddable format
  const getEmbedUrl = (driveLink: string) => {
    const fileIdMatch = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card-hover p-6 flex flex-col h-full"
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {story.category}
          </span>
          {story.videoLink && (
            <Video className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <h3 className="font-serif text-xl font-bold text-foreground mb-1">{story.name}</h3>
        <p className="text-sm text-muted-foreground">
          {story.college} • {story.city}
        </p>
      </div>

      {/* Video Embed */}
      {story.videoLink && getEmbedUrl(story.videoLink) && (
        <div className="mb-4 aspect-video rounded-lg overflow-hidden bg-muted">
          <iframe
            src={getEmbedUrl(story.videoLink)!}
            className="w-full h-full"
            allow="autoplay"
            title={`Video by ${story.name}`}
          />
        </div>
      )}

      {/* Article Content */}
      {story.article && (
        <div className="flex-1 mb-4">
          <p className="text-sm text-foreground/80 leading-relaxed">
            {showFullArticle ? story.article : articlePreview}
          </p>
          {isTruncated && (
            <button
              onClick={() => setShowFullArticle(!showFullArticle)}
              className="text-primary text-xs font-medium mt-2 hover:underline"
            >
              {showFullArticle ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-border/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Approved {new Date(story.approvedDate).toLocaleDateString()}</span>
          {story.videoLink && (
            <a
              href={story.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              Watch video <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default YouthSpotlight;
