// Tuza Dekorasyon - varsayilan icerik (DB yoksa ve ilk tohumlama icin).
// Panelden duzenlenince DB kayitlari bu varsayilanlarin yerini alir.

export const services = [
  {
    slug: "boya-badana",
    image: "/projects/dekoratif-duvar-boya.jpeg",
    title: "Boya Badana",
    summary:
      "İç ve dış mekân boya badana uygulamaları ile mekânlarınıza ferah, temiz ve estetik bir görünüm.",
    description:
      "Profesyonel boya badana uygulamalarımızda yüzey hazırlığından son kata kadar her aşamayı titizlikle yürütüyoruz. Su bazlı, silikonlu ve dekoratif boya seçenekleriyle salon, yatak odası, ofis ve tüm yaşam alanlarınıza uzun ömürlü, pürüzsüz bir yüzey kazandırıyoruz. Duvar hazırlığı, astar, macun ve renk danışmanlığı dahil anahtar teslim boya hizmeti sunuyoruz.",
    icon: "paint",
    features: ["İç cephe plastik ve silikonlu boya", "Dekoratif ve efektli boya uygulamaları", "Yüzey hazırlığı, macun ve astar", "Renk danışmanlığı"],
    sortOrder: 1,
  },
  {
    slug: "dis-cephe-mantolama",
    title: "Dış Cephe Mantolama",
    summary:
      "Isı yalıtımı ile enerji tasarrufu sağlayan, binanızı dış etkenlere karşı koruyan mantolama sistemleri.",
    description:
      "Dış cephe mantolama hizmetimiz binanızın ısı kaybını azaltarak yakıt giderlerinizi düşürür, iç mekân konforunu artırır. EPS ve taş yünü levhalar, file, sıva ve dekoratif kaplama ile TSE standartlarında, uzun ömürlü ve estetik bir dış cephe elde edersiniz. Nem ve küf oluşumunu engeller, binanızın değerini yükseltiriz.",
    icon: "insulation",
    features: ["EPS ve taş yünü ısı yalıtım levhaları", "Enerji tasarrufu ve ısı konforu", "Dekoratif dış cephe kaplama", "Nem ve küfe karşı koruma"],
    sortOrder: 2,
  },
  {
    slug: "alci-siva",
    title: "Alçı Sıva",
    summary:
      "Duvarlarınıza pürüzsüz, dayanıklı ve boyaya hazır bir yüzey kazandıran alçı sıva uygulamaları.",
    description:
      "Makine ve el ile alçı sıva uygulamalarımız, duvarlarınızda düzgün ve dayanıklı bir zemin oluşturur. Kaba ve saten alçı çözümleriyle boya öncesi kusursuz bir yüzey elde edilir; köşeler ve yüzeyler terazisinde, düzgün şekilde tamamlanır.",
    icon: "plaster",
    features: ["Makine sıva ve el sıvası", "Kaba ve saten alçı", "Terazisinde düzgün yüzeyler", "Boyaya hazır zemin"],
    sortOrder: 3,
  },
  {
    slug: "alcipan",
    title: "Alçıpan Uygulama",
    summary:
      "Bölme duvar, niş, gizli aydınlatma ve dekoratif tasarımlar için modern alçıpan sistemleri.",
    description:
      "Alçıpan sistemlerimiz ile bölme duvarlar, dekoratif nişler, raf ve gizli aydınlatma detayları oluşturuyoruz. Hafif, uygulaması hızlı ve estetik çözümlerle mekânlarınızı fonksiyonel ve şık hale getiriyoruz. Ses ve ısı yalıtımlı alçıpan seçenekleri de sunuyoruz.",
    icon: "drywall",
    features: ["Bölme duvar ve giydirme duvar", "Dekoratif niş ve raf tasarımları", "Gizli aydınlatma detayları", "Ses ve ısı yalıtımlı çözümler"],
    sortOrder: 4,
  },
  {
    slug: "asma-tavan",
    image: "/projects/ic-mekan-tv-unitesi.jpg",
    title: "Asma Tavan",
    summary:
      "Aydınlatma ve dekorasyonu birleştiren alçıpan, gergi ve dekoratif asma tavan uygulamaları.",
    description:
      "Asma tavan uygulamalarımızla mekânlarınıza modern bir hava katıyoruz. Alçıpan, gergi tavan ve dekoratif tavan çözümleriyle gizli aydınlatma, kademeli tavan ve özel tasarımlar oluşturuyoruz. Hem estetik hem de tesisat gizleme açısından pratik çözümler sunuyoruz.",
    icon: "ceiling",
    features: ["Alçıpan ve gergi tavan", "Kademeli ve dekoratif tavan", "Gizli LED aydınlatma", "Tesisat gizleme çözümleri"],
    sortOrder: 5,
  },
  {
    slug: "duvar-kagidi",
    image: "/projects/duvar-kagidi-orkide.jpeg",
    title: "Duvar Kağıdı",
    summary:
      "Kaliteli malzeme ve titiz işçilikle duvarlarınıza karakter katan duvar kağıdı uygulamaları.",
    description:
      "Duvar kağıdı uygulamalarımızda yüzey hazırlığından ek yerlerinin kusursuz birleştirilmesine kadar her detaya özen gösteriyoruz. Desenli, düz, üç boyutlu ve dokulu duvar kağıdı seçenekleriyle salon, yatak odası ve çocuk odalarınıza özgün bir dokunuş kazandırıyoruz.",
    icon: "wallpaper",
    features: ["Desenli, düz ve dokulu duvar kağıdı", "Kusursuz ek birleşimleri", "Yüzey hazırlığı ve astar", "Geniş desen ve renk seçeneği"],
    sortOrder: 6,
  },
  {
    slug: "parke-doseme",
    title: "Parke Döşeme",
    summary:
      "Estetik, dayanıklı ve mekâna uygun laminat, lamine ve masif parke döşeme hizmeti.",
    description:
      "Parke döşeme hizmetimizde zemin hazırlığından süpürgelik montajına kadar tüm süreci profesyonelce tamamlıyoruz. Laminat, lamine ve masif parke seçenekleriyle mekânlarınıza sıcak, dayanıklı ve şık bir zemin kazandırıyoruz. Eski zeminlerin sökümü ve yenileme işleri de kapsamımızdadır.",
    icon: "parquet",
    features: ["Laminat, lamine ve masif parke", "Zemin hazırlığı ve tesviye", "Süpürgelik ve geçiş profilleri", "Eski zemin sökümü ve yenileme"],
    sortOrder: 7,
  },
  {
    slug: "anahtar-teslim-dekorasyon",
    image: "/projects/ic-mekan-tv-unitesi.jpg",
    title: "Anahtar Teslim Dekorasyon",
    summary:
      "Projelendirmeden uygulamaya kadar tüm sürecin tek elden yönetildiği komple dekorasyon çözümü.",
    description:
      "Anahtar teslim dekorasyon hizmetimizle ev, ofis ve iş yerlerinizin tüm yenileme sürecini baştan sona üstleniyoruz. Tasarım ve planlamadan boya, zemin, tavan, elektrik ve mobilya koordinasyonuna kadar her aşamayı tek elden yönetiyor; size zamandan ve stresten tasarruf ettiren bütüncül bir çözüm sunuyoruz.",
    icon: "turnkey",
    features: ["Tasarım ve projelendirme", "Tüm iş kalemlerinin koordinasyonu", "Ev, ofis ve iş yeri yenileme", "Tek elden anahtar teslim"],
    sortOrder: 8,
  },
];

export const projects = [
  {
    slug: "sehitkamil-daire-anahtar-teslim",
    image: "/projects/ic-mekan-tv-unitesi.jpg",
    gallery: [
      "/projects/duvar-kagidi-orkide.jpeg",
      "/projects/duvar-kagidi-manzara.jpeg",
      "/projects/dekoratif-duvar-boya.jpeg",
    ],
    title: "Şehitkamil Daire Anahtar Teslim Yenileme",
    service: "anahtar-teslim-dekorasyon",
    location: "Şehitkamil, Gaziantep",
    description:
      "Üç artı bir dairenin komple yenilenmesi: boya, alçıpan asma tavan, parke ve duvar kağıdı uygulamaları tek elden tamamlandı.",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "villa-dis-cephe-mantolama",
    title: "Villa Dış Cephe Mantolama",
    service: "dis-cephe-mantolama",
    location: "Gaziantep",
    description:
      "Müstakil villanın taş yünü ile mantolanması ve dekoratif dış cephe kaplaması; ısı yalıtımı ve modern görünüm.",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "ofis-asma-tavan-aydinlatma",
    title: "Ofis Asma Tavan ve Gizli Aydınlatma",
    service: "asma-tavan",
    location: "Şehitkamil, Gaziantep",
    description:
      "Ofis mekânında kademeli alçıpan asma tavan ve gizli LED aydınlatma ile modern bir çalışma ortamı.",
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "salon-dekoratif-boya",
    image: "/projects/dekoratif-duvar-boya.jpeg",
    gallery: ["/projects/duvar-kagidi-orkide.jpeg", "/projects/duvar-kagidi-manzara.jpeg"],
    title: "Salon Dekoratif Boya Uygulaması",
    service: "boya-badana",
    location: "Gaziantep",
    description:
      "Salon duvarlarında efektli dekoratif boya ve saten alçı ile pürüzsüz, sıcak bir atmosfer.",
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "yatak-odasi-parke-duvar-kagidi",
    image: "/projects/duvar-kagidi-orkide.jpeg",
    gallery: ["/projects/duvar-kagidi-manzara.jpeg"],
    title: "Yatak Odası Parke ve Duvar Kağıdı",
    service: "parke-doseme",
    location: "Şehitkamil, Gaziantep",
    description:
      "Laminat parke döşeme ve baş ucu duvarında desenli duvar kağıdı ile şık bir yatak odası yenilemesi.",
    featured: false,
    sortOrder: 5,
  },
  {
    slug: "magaza-alcipan-bolme",
    title: "Mağaza Alçıpan Bölme Duvar",
    service: "alcipan",
    location: "Gaziantep",
    description:
      "Ticari mağazada alçıpan bölme duvar ve dekoratif niş uygulamaları ile fonksiyonel bir satış alanı.",
    featured: false,
    sortOrder: 6,
  },
];

export const posts = [
  {
    slug: "dis-cephe-mantolama-neden-onemli",
    title: "Dış Cephe Mantolama Neden Önemli?",
    excerpt:
      "Mantolama ile hem ısı yalıtımı sağlanır hem de yakıt giderleri ciddi oranda düşer. İşte binanız için mantolamanın faydaları.",
    tags: ["mantolama", "ısı yalıtımı", "enerji tasarrufu"],
    content:
      "<p>Dış cephe mantolama, binanızın dış yüzeyini ısı yalıtım levhalarıyla kaplayarak ısı kaybını en aza indiren bir uygulamadır. Kış aylarında ısınma, yaz aylarında serinleme giderlerinizi düşürür.</p><h2>Mantolamanın Başlıca Faydaları</h2><ul><li><strong>Enerji tasarrufu:</strong> Isı kaybı azaldığı için yakıt tüketimi düşer.</li><li><strong>Konfor:</strong> İç mekân sıcaklığı daha dengeli olur.</li><li><strong>Nem ve küf koruması:</strong> Yoğuşma engellenir, duvarlarda küf oluşumu azalır.</li><li><strong>Bina ömrü:</strong> Cephe dış etkenlerden korunur, yapının ömrü uzar.</li></ul><p>Gaziantep genelinde dış cephe mantolama için Tuza Dekorasyon ile ücretsiz keşif ve teklif alabilirsiniz.</p>",
    published: true,
  },
  {
    slug: "ic-mekan-boya-renk-secimi",
    title: "İç Mekân Boya Renk Seçimi Rehberi",
    excerpt:
      "Doğru renk seçimi mekânınızı daha ferah, sıcak veya modern gösterebilir. İç mekân boya renkleri için pratik öneriler.",
    tags: ["boya", "renk", "dekorasyon"],
    content:
      "<p>Boya rengi, bir mekânın algısını tamamen değiştirebilir. Küçük odalarda açık tonlar ferahlık hissi verirken, koyu tonlar sıcak ve şık bir atmosfer yaratır.</p><h2>Öneriler</h2><ul><li><strong>Küçük odalar:</strong> Kırık beyaz, açık bej ve toprak tonları mekânı büyütür.</li><li><strong>Salonlar:</strong> Bir duvarı vurgu rengiyle boyamak derinlik katar.</li><li><strong>Yatak odaları:</strong> Sakinleştiren nötr ve pastel tonları tercih edin.</li></ul><p>Renk seçiminde kararsız kaldıysanız, Tuza Dekorasyon ekibi yerinde renk danışmanlığı sunar.</p>",
    published: true,
  },
  {
    slug: "parke-mi-laminat-mi",
    title: "Parke mi, Laminat mı? Zemin Kaplama Seçimi",
    excerpt:
      "Zemin kaplaması seçerken dayanıklılık, maliyet ve estetik arasında denge kurmak gerekir. Parke ve laminat karşılaştırması.",
    tags: ["parke", "laminat", "zemin"],
    content:
      "<p>Zemin kaplaması, mekânın hem görünümünü hem de kullanım konforunu belirler. Parke ve laminat en çok tercih edilen iki seçenektir.</p><h2>Karşılaştırma</h2><ul><li><strong>Laminat parke:</strong> Ekonomik, çizilmeye dayanıklı ve kolay uygulanır.</li><li><strong>Lamine parke:</strong> Gerçek ahşap görünümü sunar, daha doğal bir his verir.</li><li><strong>Masif parke:</strong> En uzun ömürlü ve prestijli seçenek, zımparalanarak yenilenebilir.</li></ul><p>Mekânınıza en uygun zemin çözümü için Tuza Dekorasyon ekibine danışabilirsiniz.</p>",
    published: true,
  },
];
