/**
 * ============================================================================
 * TỆP CẤU HÌNH THIỆP CƯỚI ONLINE
 * Bạn chỉ cần sửa các thông tin trong tệp này để cá nhân hóa thiệp cưới!
 * ============================================================================
 */
window.WEDDING_CONFIG = {
  // 1. Thông tin Cô Dâu & Chú Rể
  groom: {
    firstName: "Hoàng",
    fullName: "Bùi Minh Hoàng",
    parents: {
      father: "Ông Nguyễn Văn An",
      mother: "Bà Trần Thị Bình"
    },
    address: "Quận 1, TP. Hồ Chí Minh",
    bio: "Chàng kỹ sư ấm áp, yêu thích nhiếp ảnh và luôn tin rằng hạnh phúc đơn giản là những bữa cơm nhà ấm cúng bên người thương.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bank: {
      bankName: "Vietcombank (VCB)",
      accountNumber: "0123456789",
      accountHolder: "NGUYEN MINH QUAN",
      branch: "Chi nhánh TP. HCM",
      // Link ảnh QR (dùng VietQR tự động tạo mã hoặc thay bằng đường dẫn ảnh QR của bạn)
      qrUrl: "https://img.vietqr.io/image/VCB-0123456789-compact2.png?accountName=NGUYEN%20MINH%20QUAN"
    }
  },
  bride: {
    firstName: "Mến",
    fullName: "Trần Thị Mến",
    parents: {
      father: "Ông Lê Hoàng Nam",
      mother: "Bà Phạm Thu Thủy"
    },
    address: "Quận 3, TP. Hồ Chí Minh",
    bio: "Cô gái dịu dàng, yêu hoa cỏ và những giai điệu acoustic. Cả hai là mảnh ghép hoàn hảo, mang đến cho nhau sự bình yên.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bank: {
      bankName: "Techcombank (TCB)",
      accountNumber: "9876543210",
      accountHolder: "LE THANH TRUC",
      branch: "Chi nhánh Sài Gòn",
      qrUrl: "https://img.vietqr.io/image/TCB-9876543210-compact2.png?accountName=LE%20THANH%20TRUC"
    }
  },

  // 2. Ngày giờ & Sự kiện chính (Định dạng ISO: YYYY-MM-DDTHH:mm:ss để đếm ngược chính xác)
  weddingDate: {
    isoDate: "2026-11-28T18:00:00",
    displayDate: "28 . 11 . 2026",
    dayOfWeek: "Thứ Bảy",
    lunarDate: "Nhằm ngày 20 tháng 10 năm 2026",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85",
    quote: "Hạnh phúc không phải là điểm đến, mà là hành trình chúng ta nắm tay nhau đi qua năm tháng."
  },

  // 3. Chuyện tình yêu (Love Story Timeline)
  loveStory: [
    {
      date: "Tháng 05, 2023",
      title: "Lần đầu gặp gỡ",
      description: "Một buổi chiều mưa bất chợt tại quán cà phê nhỏ ở Đà Lạt. Hai ánh mắt vô tình chạm nhau qua làn khói trà ấm áp.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80"
    },
    {
      date: "Tháng 11, 2023",
      title: "Chính thức hẹn hò",
      description: "Sau những buổi trò chuyện thâu đêm và hàng chục chuyến đi dạo phố, chúng mình đã chính thức nói lời yêu.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
    },
    {
      date: "Tháng 08, 2026",
      title: "Lời cầu hôn ngọt ngào",
      description: "Dưới ánh hoàng hôn trên biển Phú Quốc, anh đã quỳ gối cùng chiếc nhẫn lấp lánh và em đã gật đầu 'Em đồng ý!'.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
    }
  ],

  // 4. Lịch trình & Địa điểm tổ chức + Bản đồ Google Maps
  events: [
    {
      id: "vu-quy",
      title: "Lễ Vu Quy (Nhà Gái)",
      time: "09:00 Sáng",
      date: "Thứ Bảy, 28/11/2026",
      venue: "Tư Gia Nhà Gái",
      address: "123 Nguyễn Đình Chiểu, Quận 3, TP. Hồ Chí Minh",
      mapLink: "https://maps.google.com/?q=Nguyen+Dinh+Chieu+District+3+HCMC",
      embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197956!2d106.687846!3d10.778789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a9d8d1bb3%3A0x1d1b1d1b1d1b1d1b!2zUXXhuq1uIDMsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s",
      icon: "fa-rings-wedding"
    },
    {
      id: "thanh-hon",
      title: "Lễ Thành Hôn (Nhà Trai)",
      time: "11:00 Trưa",
      date: "Thứ Bảy, 28/11/2026",
      venue: "Tư Gia Nhà Trai",
      address: "456 Lê Lợi, Quận 1, TP. Hồ Chí Minh",
      mapLink: "https://maps.google.com/?q=Le+Loi+District+1+HCMC",
      embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.511510925073!2d106.6989!3d10.7721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a3b49e59%3A0xa1bd14e483a602db!2zUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s",
      icon: "fa-heart"
    },
    {
      id: "tiec-cuoi",
      title: "Tiệc Cưới Thân Mật",
      time: "18:00 Tối (Đón khách) | 19:00 Khai tiệc",
      date: "Thứ Bảy, 28/11/2026",
      venue: "Trung Tâm Hội Nghị GEM Center (Sảnh Castor - Tầng 3)",
      address: "08 Nguyễn Bỉnh Khiêm, Đa Kao, Quận 1, TP. Hồ Chí Minh",
      mapLink: "https://maps.google.com/?q=GEM+Center+Ho+Chi+Minh",
      embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.288248085199!2d106.700191!3d10.789221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc7%3A0x4db964d76bf6e18e!2sGEM%20Center!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s",
      icon: "fa-champagne-glasses"
    }
  ],

  // 5. Album ảnh cưới
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      caption: "Khoảnh khắc hạnh phúc"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
      caption: "Nắm tay nhau đi khắp thế gian"
    },
    {
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80",
      caption: "Nụ cười ngày nắng"
    },
    {
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80",
      caption: "Lời hứa trăm năm"
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
      caption: "Trong vòng tay anh"
    },
    {
      url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80",
      caption: "Ngày chung đôi"
    }
  ],

  // 6. Nhạc nền (Có thể dùng file mp3 trong thư mục assets/music.mp3 hoặc link trực tiếp)
  music: {
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112199.mp3",
    title: "Romantic Wedding Piano"
  },

  // 7. Cấu hình Google Sheets Web App URL (Apps Script)
  // Xem hướng dẫn chi tiết trong file README.md để dán link của bạn vào đây:
  googleSheetWebAppUrl: "",

  // 8. Lời chúc mẫu ban đầu (Hiển thị sẵn trên Sổ lưu bút)
  defaultWishes: [
    {
      name: "Gia đình chú Tám",
      relation: "Họ hàng nhà Trai",
      message: "Chúc hai cháu Minh Hoàng - Trần Mến trăm năm tình viên mãn, bạc đầu nghĩa phu thê! Sớm có thiên thần nhỏ nhé!",
      time: "Vừa xong"
    },
    {
      name: "Hội bạn thân Đại học",
      relation: "Bạn Chú Rể",
      message: "Cuối cùng ngày này cũng tới! Chúc mừng cặp đôi đẹp nhất năm, mãi hạnh phúc và luôn giữ nụ cười rạng rỡ như hôm nay nha!",
      time: "2 giờ trước"
    },
    {
      name: "Minh Anh & Hoàng Bảo",
      relation: "Bạn Cô Dâu",
      message: "Cô dâu Trần Mến của tụi mình xinh đẹp tuyệt vời! Chúc hai bạn có một hành trình hôn nhân ngập tràn tiếng cười và hoa hồng.",
      time: "1 ngày trước"
    }
  ]
};

