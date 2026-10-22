/**
 * ============================================================================
 * LOGIC CHÍNH CỦA THIỆP MỜI ĐÁM CƯỚI ONLINE
 * ============================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.WEDDING_CONFIG;
  if (!cfg) return;

  // 1. ĐỌC TÊN KHÁCH MỜI TỪ URL (VD: ?to=Anh+Tuấn+và+Gia+đình hoặc ?khach=Chị+Lan)
  const urlParams = new URLSearchParams(window.location.search);
  const guestNameFromUrl =
    urlParams.get("to") ||
    urlParams.get("khach") ||
    urlParams.get("guest") ||
    "Quý Khách";

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  const setAttr = (id, attr, val) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, val);
  };

  // 2. RENDER DỮ LIỆU CẶP ĐÔI & NGÀY CƯỚI
  const groomInitial = cfg.groom.firstName.trim().split(" ").pop().charAt(0);
  const brideInitial = cfg.bride.firstName.trim().split(" ").pop().charAt(0);
  setText("intro-monogram", `${groomInitial} & ${brideInitial}`);
  setText("intro-groom", cfg.groom.firstName);
  setText("intro-bride", cfg.bride.firstName);
  setText("intro-guest-name", guestNameFromUrl);
  setText("intro-date", cfg.weddingDate.displayDate);

  setText("hero-groom", cfg.groom.firstName);
  setText("hero-bride", cfg.bride.firstName);
  setText("hero-guest-name", guestNameFromUrl);
  setText("hero-day", cfg.weddingDate.dayOfWeek);
  setText("hero-date", cfg.weddingDate.displayDate);
  setText("hero-lunar", cfg.weddingDate.lunarDate);

  const heroBg = document.getElementById("hero-bg");
  if (heroBg) {
    heroBg.style.backgroundImage = `url('${cfg.weddingDate.heroImage}')`;
  }

  // Điền sẵn tên khách mời vào form RSVP nếu có tên riêng trên URL
  const guestInput = document.getElementById("guest-name");
  if (guestInput && guestNameFromUrl !== "Quý Khách") {
    guestInput.value = guestNameFromUrl;
  }

  // Thông tin Cô Dâu & Chú Rể
  setText("wedding-quote", `"${cfg.weddingDate.quote}"`);
  setAttr("groom-avatar", "src", cfg.groom.avatar);
  setText("groom-fullname", cfg.groom.fullName);
  setText("groom-bio", cfg.groom.bio);
  setText("groom-father", `Cha: ${cfg.groom.parents.father}`);
  setText("groom-mother", `Mẹ: ${cfg.groom.parents.mother}`);
  setText("groom-address", cfg.groom.address);

  setAttr("bride-avatar", "src", cfg.bride.avatar);
  setText("bride-fullname", cfg.bride.fullName);
  setText("bride-bio", cfg.bride.bio);
  setText("bride-father", `Cha: ${cfg.bride.parents.father}`);
  setText("bride-mother", `Mẹ: ${cfg.bride.parents.mother}`);
  setText("bride-address", cfg.bride.address);

  setText("footer-couple", `${cfg.groom.firstName} & ${cfg.bride.firstName}`);
  setText("footer-date", cfg.weddingDate.displayDate);
  document.title = `Thiệp Mời Cưới | ${cfg.groom.firstName} & ${cfg.bride.firstName}`;

  // 3. RENDER TIMELINE CHUYỆN TÌNH YÊU
  const storyContainer = document.getElementById("story-timeline");
  if (storyContainer && Array.isArray(cfg.loveStory)) {
    storyContainer.innerHTML = cfg.loveStory
      .map(
        (item) => `
        <div class="story-item fade-up">
          <img class="story-img" src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="story-content">
            <span class="story-date">${item.date}</span>
            <h3 class="story-title">${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </div>
      `
      )
      .join("");
  }

  // 4. RENDER LỊCH TRÌNH SỰ KIỆN & BẢN ĐỒ GOOGLE MAPS
  const eventsContainer = document.getElementById("events-grid");
  if (eventsContainer && Array.isArray(cfg.events)) {
    eventsContainer.innerHTML = cfg.events
      .map(
        (ev) => `
        <div class="event-card fade-up">
          <div>
            <div class="event-icon"><i class="fa-solid ${ev.icon || "fa-heart"}"></i></div>
            <h3 class="event-title">${ev.title}</h3>
            <ul class="event-meta">
              <li><i class="fa-regular fa-clock"></i> <span><strong>${ev.time}</strong> — ${ev.date}</span></li>
              <li><i class="fa-solid fa-building-columns"></i> <span><strong>${ev.venue}</strong></span></li>
              <li><i class="fa-solid fa-location-dot"></i> <span>${ev.address}</span></li>
            </ul>
          </div>
          <div>
            <iframe
              class="event-map-frame"
              src="${ev.embedMapUrl}"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Bản đồ ${ev.title}"
            ></iframe>
            <a href="${ev.mapLink}" target="_blank" rel="noopener noreferrer" class="btn-outline btn-full">
              <i class="fa-solid fa-diamond-turn-right"></i> Mở Google Maps Chỉ Đường
            </a>
          </div>
        </div>
      `
      )
      .join("");
  }

  // 5. RENDER ALBUM ẢNH CƯỚI & LIGHTBOX
  const galleryContainer = document.getElementById("gallery-grid");
  let currentPhotoIndex = 0;

  if (galleryContainer && Array.isArray(cfg.gallery)) {
    galleryContainer.innerHTML = cfg.gallery
      .map(
        (photo, idx) => `
        <div class="gallery-item fade-up" data-index="${idx}">
          <img src="${photo.url}" alt="${photo.caption || "Ảnh cưới"}" loading="lazy" />
          <div class="gallery-caption">${photo.caption || ""}</div>
        </div>
      `
      )
      .join("");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");

    const openLightbox = (index) => {
      currentPhotoIndex = (index + cfg.gallery.length) % cfg.gallery.length;
      const item = cfg.gallery[currentPhotoIndex];
      lightboxImg.src = item.url;
      lightboxCaption.textContent = item.caption || "";
      lightbox.classList.add("active");
    };

    galleryContainer.querySelectorAll(".gallery-item").forEach((el) => {
      el.addEventListener("click", () => {
        openLightbox(Number(el.dataset.index));
      });
    });

    document.getElementById("lightbox-close")?.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
    document.getElementById("lightbox-prev")?.addEventListener("click", () => {
      openLightbox(currentPhotoIndex - 1);
    });
    document.getElementById("lightbox-next")?.addEventListener("click", () => {
      openLightbox(currentPhotoIndex + 1);
    });
    lightbox?.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("active");
    });
  }

  // 6. RENDER HỘP MỪNG CƯỚI (QR NGÂN HÀNG) & NÚT COPY SỐ TÀI KHOẢN
  setText("gift-groom-name", cfg.groom.fullName);
  setAttr("groom-qr", "src", cfg.groom.bank.qrUrl);
  setText("groom-bank-name", cfg.groom.bank.bankName);
  setText("groom-account-holder", cfg.groom.bank.accountHolder);
  setText("groom-account-number", cfg.groom.bank.accountNumber);

  setText("gift-bride-name", cfg.bride.fullName);
  setAttr("bride-qr", "src", cfg.bride.bank.qrUrl);
  setText("bride-bank-name", cfg.bride.bank.bankName);
  setText("bride-account-holder", cfg.bride.bank.accountHolder);
  setText("bride-account-number", cfg.bride.bank.accountNumber);

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const targetId = btn.getAttribute("data-copy-target");
      const accNumber = document.getElementById(targetId)?.textContent?.trim();
      if (!accNumber) return;
      try {
        await navigator.clipboard.writeText(accNumber);
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check"></i> Đã sao chép: ${accNumber}`;
        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 2500);
      } catch {
        alert(`Số tài khoản: ${accNumber}`);
      }
    });
  });

  // 7. CÔNG CỤ TẠO LINK THIỆP CÁ NHÂN HÓA CHO TỪNG KHÁCH MỜI
  const customGuestInput = document.getElementById("custom-guest-input");
  const copyCustomLinkBtn = document.getElementById("copy-custom-link-btn");
  const customLinkPreview = document.getElementById("custom-link-preview");

  const buildPersonalizedUrl = (name) => {
    const base = window.location.origin + window.location.pathname;
    if (!name.trim()) return base;
    return `${base}?to=${encodeURIComponent(name.trim())}`;
  };

  customGuestInput?.addEventListener("input", () => {
    const link = buildPersonalizedUrl(customGuestInput.value);
    if (customLinkPreview) {
      customLinkPreview.textContent = customGuestInput.value.trim()
        ? `Link gửi khách: ${link}`
        : "";
    }
  });

  copyCustomLinkBtn?.addEventListener("click", async () => {
    const link = buildPersonalizedUrl(customGuestInput?.value || "");
    try {
      await navigator.clipboard.writeText(link);
      if (customLinkPreview) {
        customLinkPreview.textContent = `Đã sao chép link thiệp: ${link}`;
      }
    } catch {
      alert(link);
    }
  });

  // 8. ĐẾM NGƯỢC NGÀY CƯỚI (COUNTDOWN TIMER)
  const targetTime = new Date(cfg.weddingDate.isoDate).getTime();
  const updateCountdown = () => {
    const now = Date.now();
    const diff = Math.max(0, targetTime - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setText("cd-days", String(days).padStart(2, "0"));
    setText("cd-hours", String(hours).padStart(2, "0"));
    setText("cd-minutes", String(minutes).padStart(2, "0"));
    setText("cd-seconds", String(seconds).padStart(2, "0"));
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 9. MỞ PHONG BÌ THIỆP & PHÁT NHẠC NỀN TỰ ĐỘNG
  const envelopeOverlay = document.getElementById("envelope-overlay");
  const openBtn = document.getElementById("open-invitation-btn");
  const bgMusic = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");

  if (bgMusic && cfg.music?.url) {
    bgMusic.src = cfg.music.url;
  }

  let isPlayingMusic = false;
  const toggleMusic = async (forcePlay = false) => {
    if (!bgMusic) return;
    try {
      if (forcePlay || bgMusic.paused) {
        await bgMusic.play();
        isPlayingMusic = true;
        musicToggle?.classList.add("playing");
      } else {
        bgMusic.pause();
        isPlayingMusic = false;
        musicToggle?.classList.remove("playing");
      }
    } catch {
      // Trình duyệt chặn autoplay khi chưa tương tác
    }
  };

  openBtn?.addEventListener("click", () => {
    envelopeOverlay?.classList.add("opened");
    document.body.classList.remove("locked-scroll");
    toggleMusic(true);
  });

  musicToggle?.addEventListener("click", () => {
    toggleMusic();
  });

  // 10. SỔ LƯU BÚT & GỬI FORM RSVP VỀ GOOGLE SHEETS
  const STORAGE_KEY = "wedding_guestbook_wishes_v1";
  const wishesListEl = document.getElementById("wishes-list");
  const wishCountEl = document.getElementById("wish-count");

  const getSavedWishes = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return [...saved, ...(cfg.defaultWishes || [])];
    } catch {
      return cfg.defaultWishes || [];
    }
  };

  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const renderWishes = () => {
    const allWishes = getSavedWishes();
    if (wishCountEl) {
      wishCountEl.textContent = `${allWishes.length} lời chúc`;
    }
    if (wishesListEl) {
      wishesListEl.innerHTML = allWishes
        .map(
          (w) => `
          <div class="wish-item">
            <div class="wish-item-top">
              <span class="wish-author">${escapeHtml(w.name)}</span>
              <span class="wish-meta">${escapeHtml(w.relation || "Khách quý")} • ${escapeHtml(w.time || "Vừa xong")}</span>
            </div>
            <p class="wish-text">${escapeHtml(w.message)}</p>
          </div>
        `
        )
        .join("");
    }
  };

  renderWishes();

  // Gợi ý nhanh lời chúc
  document.querySelectorAll(".chip-suggest").forEach((chip) => {
    chip.addEventListener("click", () => {
      const msgTextarea = document.getElementById("guest-message");
      if (msgTextarea) {
        msgTextarea.value = chip.getAttribute("data-wish") || "";
        msgTextarea.focus();
      }
    });
  });

  const rsvpForm = document.getElementById("rsvp-form");
  const rsvpSubmitBtn = document.getElementById("rsvp-submit-btn");
  const rsvpStatus = document.getElementById("rsvp-status");

  rsvpForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(rsvpForm);
    const entry = {
      name: (formData.get("name") || "").toString().trim(),
      phone: (formData.get("phone") || "").toString().trim(),
      side: (formData.get("side") || "").toString(),
      attendance: (formData.get("attendance") || "").toString(),
      guests: (formData.get("guests") || "").toString(),
      message: (formData.get("message") || "").toString().trim(),
      timestamp: new Date().toLocaleString("vi-VN")
    };

    if (!entry.name || !entry.message) return;

    rsvpSubmitBtn.disabled = true;
    rsvpSubmitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi lời chúc...`;

    // Lưu ngay vào Sổ lưu bút trên trình duyệt để hiển thị tức thì
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      existing.unshift({
        name: entry.name,
        relation: `${entry.side} (${entry.attendance})`,
        message: entry.message,
        time: "Vừa xong"
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      renderWishes();
    } catch {
      // Bỏ qua nếu trình duyệt chặn LocalStorage
    }

    // Nếu đã cấu hình Google Sheets Web App URL thì gửi về Google Sheets
    if (cfg.googleSheetWebAppUrl && cfg.googleSheetWebAppUrl.startsWith("http")) {
      try {
        await fetch(cfg.googleSheetWebAppUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(entry)
        });
      } catch (err) {
        console.warn("Không thể đồng bộ Google Sheets:", err);
      }
    }

    rsvpSubmitBtn.disabled = false;
    rsvpSubmitBtn.innerHTML = `<i class="fa-regular fa-paper-plane"></i> Gửi Xác Nhận & Lời Chúc`;
    if (rsvpStatus) {
      rsvpStatus.className = "form-status success";
      rsvpStatus.textContent =
        "Cảm ơn bạn rất nhiều! Lời chúc và xác nhận tham dự đã được gửi tới Cô Dâu & Chú Rể ♥";
    }
    rsvpForm.reset();
  });

  // 11. HIỆU ỨNG CUỘN REVEAL (INTERSECTION OBSERVER)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

  // 12. HIỆU ỨNG CÁNH HOA RƠI NHẸ NHÀNG (CANVAS)
  const canvas = document.getElementById("petals-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petalCount = 18;
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 6 + Math.random() * 8,
      speedY: 0.5 + Math.random() * 0.9,
      speedX: -0.4 + Math.random() * 0.8,
      angle: Math.random() * Math.PI * 2,
      spin: -0.015 + Math.random() * 0.03,
      opacity: 0.25 + Math.random() * 0.35
    }));

    const drawPetals = () => {
      ctx.clearRect(0, 0, width, height);
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.3;
        p.angle += p.spin;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, p.size / 3, 0, p.size);
        ctx.bezierCurveTo(-p.size, p.size / 3, -p.size / 2, -p.size / 2, 0, 0);
        ctx.fillStyle = `rgba(228, 193, 178, ${p.opacity})`;
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(drawPetals);
    };

    drawPetals();
  }
});

