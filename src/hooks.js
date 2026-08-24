import { useEffect, useState } from "react";

/* Smooth section navigation */
export function useSectionNavigation() {
  useEffect(() => {
    const handler = (event) => {
      const target = event.target.closest("[data-scroll]");
      if (!target) return;

      const id = target.getAttribute("data-scroll");
      const section = document.getElementById(id);

      if (section) {
        event.preventDefault();
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);
}

/* Active section detection */
export function useActiveSection(ids = []) {
  const [active, setActive] = useState(ids[0] || "");

  useEffect(() => {
    if (!ids.length) return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.2, 0.5, 0.8]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/* Dark / light theme */
export function useTheme() {
  const getInitialTheme = () => {
    const saved = localStorage.getItem("portfolio-theme");

    if (saved === "dark" || saved === "light") {
      return saved;
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "light" : "dark"
    );
  };

  return {
    theme,
    toggleTheme
  };
}

/* Mobile menu */
export function useMobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return {
    open,
    openMenu: () => setOpen(true),
    closeMenu: () => setOpen(false),
    toggleMenu: () => setOpen((value) => !value)
  };
}

/* Scroll progress */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      setProgress(
        Math.min(
          100,
          Math.max(
            0,
            (window.scrollY / documentHeight) * 100
          )
        )
      );
    };

    update();

    window.addEventListener("scroll", update, {
      passive: true
    });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

/* Reduced-motion preference */
export function useReducedMotion() {
  const getPreference = () => {
    if (typeof window === "undefined") return false;

    return window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  };

  const [reduced, setReduced] = useState(getPreference);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const handleChange = () => {
      setReduced(media.matches);
    };

    media.addEventListener?.("change", handleChange);

    return () => {
      media.removeEventListener?.("change", handleChange);
    };
  }, []);

  return reduced;
}
