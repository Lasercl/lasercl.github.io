const socials = [
  {
    label: "Instagram",
    icon: "fa-brands fa-instagram",
    href: "https://www.instagram.com/laser_cl?igsh=MTU0YzV3YzNxeGxiNg==",
  },
  {
    label: "LinkedIn",
    icon: "fa-brands fa-linkedin-in",
    href: "https://www.linkedin.com/in/laser-clauss-latupeirissa-6a4a3829a/",
  },
  { label: "YouTube", icon: "fa-brands fa-youtube", href: "#" },
  { label: "WhatsApp", icon: "fa-brands fa-whatsapp", href: "https://wa.me/6282134361144" },
  { label: "GitHub", icon: "fa-brands fa-github", href: "https://github.com/Lasercl" },
];

export default function Contact() {
  return (
    <section className="min-h-screen flex items-center pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto text-center w-full">
        <p className="text-primary font-medium tracking-widest uppercase mb-2">Let's connect</p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 glow-text">Get In Touch</h1>
        <p className="text-gray-400 max-w-xl mx-auto mb-12">
          Have a project in mind, or just want to say hi? Reach out through any of the platforms
          below.
        </p>

        <div className="glass-card p-8 md:p-12 flex flex-wrap justify-center gap-8">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="group flex flex-col items-center gap-3 transition-transform hover:scale-110"
            >
              <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-2xl text-gray-300 group-hover:text-white group-hover:bg-primary/30 group-hover:border-primary/50 transition-all duration-300">
                <i className={social.icon} />
              </div>
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
