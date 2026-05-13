"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "@/components/ui/PageHeader";
import { siteConfig } from "@/lib/site-config";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setErrorMsg("Something went wrong. Please try again or email us directly.");
      setStatus("error");
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: Phone, label: "Phone", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}` },
    { icon: MapPin, label: "Address", value: siteConfig.contact.address },
    { icon: Clock, label: "Hours", value: siteConfig.contact.hours },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Get in Touch"
        subtitle="Have a question or want to work together? We'd love to hear from you."
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="h-11"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="h-11 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                  >
                    <option value="">Select a topic...</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Project Quote">Project Quote</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Support">Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="min-h-[150px]"
                  />
                </div>

                {status === "error" && (
                  <p role="alert" className="text-destructive text-sm font-medium">
                    {errorMsg}
                  </p>
                )}

                {status === "success" && (
                  <p role="status" className="text-green-600 text-sm font-medium">
                    Message sent successfully! We&apos;ll get back to you soon.
                  </p>
                )}

                <Button type="submit" disabled={status === "sending"} className="px-6 py-3 h-auto">
                  <Send size={18} className="mr-2" />
                  {status === "sending" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-muted rounded-2xl p-8 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-6">Contact Info</h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                          <Icon size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          {item.href ? (
                            <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">{item.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
