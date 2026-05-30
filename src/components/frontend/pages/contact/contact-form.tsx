"use client";

import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
    const { toast } = useToast();
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            toast({ title: "Please fill in all required fields", variant: "destructive" });
            return;
        }
        toast({ title: "Message sent!", description: "We'll get back to you shortly." });
        setForm({ name: "", email: "", subject: "", message: "" });
    };



    return (
        <section className="py-24 bg-background">
            <div className="container">
                <div className="grid md:grid-cols-3 gap-16 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-heading text-lg font-bold uppercase tracking-tight mb-4">Get In Touch</h3>
                            <div className="space-y-4">
                                <a href="mailto:lbnow2016@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                    <Mail className="w-4 h-4 text-primary" />
                                    lbnow2016@gmail.com
                                </a>
                                <a href="tel:09069755436" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                    <Phone className="w-4 h-4 text-primary" />
                                    09069755436
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Name *</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        maxLength={100}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Email *</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        maxLength={255}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Subject</label>
                                <input
                                    type="text"
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    maxLength={200}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Message *</label>
                                <textarea
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    rows={6}
                                    className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                    maxLength={1000}
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm