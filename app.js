/* Protyabartan / Media Connect
   English ships in the HTML. This file swaps it for Bangla, drives the
   chronology rail, and provides the motion fallback for browsers without
   scroll-driven animations. No scroll listeners are used anywhere. */

const T = {
  en: {
    navDay: "The day",
    navGallery: "Gallery",
    navPress: "Press",
    navMedia: "Media",
    brand: "Media Connect",
    heroKicker: "14 September 2026",
    heroTitle: "Protyabartan",
    heroSub: "A Media Connect at Rabindra Okakura Bhawan. Krishi Ratna League Bengal begins.",
    ctaKit: "Press kit",
    fDate: "Date",
    fDateV: "Monday, 14 September 2026",
    fPlace: "Venue",
    fPlaceV: "Rabindra Okakura Bhawan, DD Block, Salt Lake, Kolkata",
    fTheme: "Theme",
    fThemeV: "Protyabartan, the homecoming",
    fActs: "Named that morning",
    fActsV: "KRL Bengal. Mahila Wing. Krishak Samaj Durga Puja 2026.",
    inviteTitle: "The invitation, as printed",
    inviteLede: "Issued in English and Bangla from Bharatiya Krishak Samaj West Bengal and KarmYog. The card is an artefact of the morning. Body copy of this essay names only those who were in the hall.",
    capInviteEn: "English invitation. 9:30 AM. Rabindra Okakura Bhawan.",
    capInviteBn: "Bengali invitation. Same morning, same hall.",
    capBanner: "The welcome banner over the stage. Swagatam. A Media Connect Session.",
    progTitle: "The printed programme",
    progLede: "The order as issued. Photographs below carry the live room.",
    progFrom: "09:30",
    progTo: "11:10",
    p1t: "09:30", p1: "Sacred opening. KarmYog Seva Mantra and Vande Mataram.",
    p2t: "09:35", p2: "Welcome and stage call. Smt. Reena J. Sarkar.",
    p3t: "09:40", p3: "Video testimonial. Shri Partha S. Chatterjee, Global Ambassador, BKS West Bengal. Video keynote from Dr. Krishan Bir Chaudhary.",
    p4t: "09:50", p4: "Foundational vision and KRL Bengal launch. MahAcharya Shri Sourabh J. Sarkar.",
    p5t: "10:05", p5: "Felicitation of Smt. Rinku Majumder Ghosh, Adhyaksha, Mahila Wing.",
    p6t: "10:10", p6: "Ministerial address. Shri Dudh Kumar Mondal, Hon'ble Minister of Agriculture, West Bengal.",
    p7t: "10:25", p7: "Keynote. Smt. Rinku Majumder Ghosh.",
    p8t: "10:35", p8: "Guest of Honour. Shri Debashish Dhar, MLA, Sonarpur Uttar.",
    p9t: "10:45", p9: "Krishak Samaj Durga Puja 2026 announcement. Smt. Reena J. Sarkar.",
    p10t: "10:50", p10: "Media questions. MahAcharyaJi and Smt. Rinku Majumder Ghosh.",
    p11t: "11:10", p11: "Vote of thanks and National Anthem. Smt. Reena J. Sarkar.",
    roomTitle: "The room",
    roomLede: "Bamboo, diya, tulsi, a yellow cloth on the lectern. The hall at Okakura before the first greeting.",
    capStage: "Stage set. Welcome banner, puja, and the four invited faces as printed.",
    openTitle: "The greeting",
    capOpen: "MahAcharya Shri Sourabh J. Sarkar at the lectern. Smt. Reena J. Sarkar, Smt. Rinku Majumder Ghosh, and Shri Dudh Kumar Mondal on the bamboo seats.",
    parthaTitle: "The video testimonial",
    parthaLede: "The hall played the film of Shri Partha S. Chatterjee, Global Ambassador and Senior Advisor for AI, Technology and Energy Transition, Bharatiya Krishak Samaj West Bengal.",
    parthaName: "Shri Partha S. Chatterjee",
    parthaRole: "Global Ambassador, BKS West Bengal",
    capPartha: "The card that sat with the film. Four minutes forty-seven seconds.",
    playFilm: "Play the video testimonial",
    playClip: "Play clip",
    noCaptions: "Captions for this film are not yet available.",
    minTitle: "The Minister",
    minLede: "Shri Dudh Kumar Mondal, Hon'ble Minister of Agriculture, West Bengal, was on the stage at the opening. Krishi Ratna League Bengal was named in that room.",
    capMinListen: "MahAcharyaJi at the lectern. Rinku and the Minister listening.",
    nMin: "Shri Dudh Kumar Mondal",
    rMin: "Hon'ble Minister of Agriculture, West Bengal",
    capMinFeature: "Shri Dudh Kumar Mondal, Hon'ble Minister of Agriculture, with Smt. Rinku Majumder Ghosh and Smt. Reena J. Sarkar.",
    rinkuTitle: "Adhyaksha",
    rinkuLede: "Smt. Rinku Majumder Ghosh was felicitated as Adhyaksha of the Mahila Wing, Bharatiya Krishak Samaj West Bengal. The badge sat on the pink sari for the rest of the morning.",
    capTrio: "Smt. Reena J. Sarkar, Smt. Rinku Majumder Ghosh, Shri Debashish Dhar.",
    nRinku: "Smt. Rinku Majumder Ghosh",
    rRinku: "Adhyaksha, Mahila Wing, Bharatiya Krishak Samaj",
    capBell: "The bell. Standing for the felicitation. MahAcharyaJi, Reena, Rinku, Dhar.",
    capRinkuPodium: "Smt. Rinku Majumder Ghosh at the lectern. The keynote, 10:25.",
    dharTitle: "Guest of Honour",
    dharLede: "Shri Debashish Dhar, MLA, Sonarpur Uttar, addressed the hall from the yellow-draped lectern.",
    capGarland: "A garland on the Guest of Honour. The hall photographing.",
    nDhar: "Shri Debashish Dhar",
    rDhar: "MLA, Sonarpur Uttar",
    voicesTitle: "What the stage carried",
    voicesNote: "The argument of the morning, in each voice. Exact words from the recordings will replace these lines.",
    v1n: "Shri Dudh Kumar Mondal",
    v1r: "Hon'ble Minister of Agriculture, West Bengal",
    v1: "The farmer is not a backdrop to policy. Krishi Ratna League puts the field at the centre of Bengal's next public contest.",
    v2n: "Smt. Rinku Majumder Ghosh",
    v2r: "Adhyaksha, Mahila Wing, Bharatiya Krishak Samaj",
    v2: "Half of Bengal's farm is a woman. The Mahila Wing is not a side room of the Samaj.",
    v3n: "Shri Debashish Dhar",
    v3r: "MLA, Sonarpur Uttar",
    v3: "Protyabartan is not nostalgia. It is the village asking its children to stand with the soil again.",
    v4n: "MahAcharya Shri Sourabh J. Sarkar",
    v4r: "State President, BKS West Bengal. KarmYog Ashram",
    v4: "A league with a working farm at the end of it, not a trophy on a shelf.",
    launchTitle: "Krishi Ratna League Bengal",
    capLaunch: "Launch of Krishi Ratna League Bengal on the screen. MahAcharyaJi at the lectern. Reena, Rinku, Dhar seated.",
    hallTitle: "The hall",
    capHall: "Press, farmers, the team. Rabindra Okakura Bhawan.",
    pressTitle: "The press huddle",
    pressLede: "After the programme the mics closed in. MahAcharyaJi, Smt. Rinku Majumder Ghosh, Shri Debashish Dhar and Smt. Reena J. Sarkar took the questions together. Bonglive, 24 Ghanta and the rest of the room stayed until the last answer.",
    capPanel: "The press panel. Seated with Reena, MahAcharyaJi, Rinku and Dhar. Mics on the yellow cloth.",
    capHuddle: "Cameras in. MahAcharyaJi facing the room.",
    capPressDhar: "Shri Debashish Dhar to the mics.",
    capClose: "Outside Rabindra Okakura Bhawan after the morning.",
    galleryTitle: "From the hall",
    galleryLede: "Stills and clips from the Media Connect. The Krishi Ratna League intro played behind the welcome.",
    g1: "From the stage into the hall.",
    g2: "The Minister of Agriculture.",
    g3: "Green room. A clay cup for the Minister.",
    g4: "Shri Debashish Dhar at the lectern.",
    g5: "The press, full stage.",
    g6: "Smt. Reena J. Sarkar.",
    g7: "Krishi Ratna League Bengal on the screen.",
    gv1: "Clip from the hall.",
    gv2: "Clip from the hall.",
    gv3: "Clip from the hall.",
    gv4: "Clip from the hall.",
    gv5: "Clip from the hall.",
    gv6: "Clip from the hall.",
    gv7: "Clip from the hall.",
    mediaTitle: "In the media",
    mediaLede: "A running record of the coverage. Clippings, broadcast and video from the morning of 14 September 2026 are added here as they appear.",
    mediaVidName: "Media Connect, on camera",
    mediaVidRole: "YouTube · 14 September 2026",
    mediaVidCap: "Footage from the Media Connect session at Rabindra Okakura Bhawan.",
    mediaVidLink: "Watch on YouTube",
    clipOutlet: "Hello Evening Kolkata",
    clipPage: "Page 07",
    clipDate: "14 September 2026",
    clipHead: "Focus on better facilities for Farmers in WB",
    clipBody: "Reported by Asish Basak on the Hello Kolkata Focus page. The Media Connect session, the Krishi Ratna League announcement, and Smt. Rinku Majumder Ghosh on the holistic development of farmers after her induction as Chief of the Ladies Wing, BKS West Bengal.",
    clipDl: "Download the page (PDF)",
    capClip: "Hello Evening Kolkata, page 07, Monday, 14 September 2026.",
    releaseTag: "Press release",
    releaseRef: "BKS-WB/PR/2026/09-14",
    releaseHead: "Bharatiya Krishak Samaj West Bengal with KarmYog for the 21st Century",
    releaseBody: "Issued for immediate release. Ref BKS-WB/PR/2026/09-14. Krishi Ratna League launched with AI-driven farmer outreach, Smt. Rinku Majumder Ghosh felicitated as State Adhyaksha, and the Durga Puja 2026 theme Protyabartan unveiled. English and Bangla, two pages.",
    releaseDl: "Download the press release (PDF)",
    capRelease: "Press release, first page. English and Bangla, two pages.",
    footOrgs: "Bharatiya Krishak Samaj West Bengal, with KarmYog for the 21st Century.",
    footPhotos: "Photographs: Bumba and Shubhashis.",
    footRsvp: "Smt. Reena J. Sarkar +91 98300 24611. Shri Ram Badrinathan +91 91677 19898.",
    footPlace: "State office: F-127, Downtown Mall, Uniworld City, New Town, Kolkata 700156.",
  },
  bn: {
    navDay: "সেই দিন",
    navGallery: "গ্যালারি",
    navPress: "প্রেস",
    navMedia: "সংবাদমাধ্যম",
    brand: "মিডিয়া সংযোগ",
    heroKicker: "১৪ সেপ্টেম্বর ২০২৬",
    heroTitle: "প্রত্যাবর্তন",
    heroSub: "রবীন্দ্র ওকাকুরা ভবনে একটি মিডিয়া সংযোগ অনুষ্ঠান. কৃষি রত্ন লীগ বাংলা শুরু.",
    ctaKit: "প্রেস কিট",
    fDate: "তারিখ",
    fDateV: "সোমবার, ১৪ সেপ্টেম্বর ২০২৬",
    fPlace: "স্থান",
    fPlaceV: "রবীন্দ্র ওকাকুরা ভবন, ডিডি ব্লক, সল্টলেক, কলকাতা",
    fTheme: "থিম",
    fThemeV: "প্রত্যাবর্তন, ফিরে আসা",
    fActs: "সেই সকালে যা ঘোষিত",
    fActsV: "কৃষি রত্ন লীগ বাংলা. মহিলা শাখা. কৃষক সমাজের দুর্গা পূজা ২০২৬.",
    inviteTitle: "নিমন্ত্রণপত্র, যেমন ছাপা হয়েছিল",
    inviteLede: "ইংরেজি ও বাংলায়. ভারতীয় কৃষক সমাজ পশ্চিমবঙ্গ এবং কর্মযোগ. ছাপা কার্ডটি সেই সকালের একটি দলিল. এই রচনায় নাম শুধু তাঁদেরই, যাঁরা হলে ছিলেন.",
    capInviteEn: "ইংরেজি নিমন্ত্রণপত্র. সকাল ৯:৩০. রবীন্দ্র ওকাকুরা ভবন.",
    capInviteBn: "বাংলা নিমন্ত্রণপত্র. একই সকাল, একই হল.",
    capBanner: "মঞ্চের উপরে স্বাগত ব্যানার. স্বাগতম. একটি মিডিয়া সংযোগ অনুষ্ঠান.",
    progTitle: "ছাপা কার্যক্রম",
    progLede: "যে ক্রমে লেখা হয়েছিল. নিচের ছবিগুলি সেই ঘরকে ধরেছে.",
    progFrom: "০৯:৩০",
    progTo: "১১:১০",
    p1t: "০৯:৩০", p1: "পবিত্র সূচনা. কর্মযোগ সেবা মন্ত্র ও বন্দে মাতরম.",
    p2t: "০৯:৩৫", p2: "স্বাগত ও মঞ্চ আহ্বান. শ্রীমতি রীনা জে. সরকার.",
    p3t: "০৯:৪০", p3: "ভিডিও সাক্ষ্য. শ্রী পার্থ এস. চ্যাটার্জি, গ্লোবাল অ্যাম্বাসেডর, বি কে এস পশ্চিমবঙ্গ. ড. কৃষণ বীর চৌধুরীর ভিডিও মূল বক্তব্য.",
    p4t: "০৯:৫০", p4: "মূল দর্শন ও কৃষি রত্ন লীগ বাংলা উদ্বোধন. মহাচার্য শ্রী সৌরভ জে. সরকার.",
    p5t: "১০:০৫", p5: "শ্রীমতি রিঙ্কু মজুমদার ঘোষের সম্মাননা. অধ্যক্ষা, মহিলা শাখা.",
    p6t: "১০:১০", p6: "মন্ত্রীর ভাষণ. শ্রী দুধ কুমার মণ্ডল, মাননীয় কৃষিমন্ত্রী, পশ্চিমবঙ্গ.",
    p7t: "১০:২৫", p7: "মূল ভাষণ. শ্রীমতি রিঙ্কু মজুমদার ঘোষ.",
    p8t: "১০:৩৫", p8: "প্রধান অতিথি. শ্রী দেবাশীষ ধর, বিধায়ক, সোনারপুর উত্তর.",
    p9t: "১০:৪৫", p9: "কৃষক সমাজের দুর্গা পূজা ২০২৬ ঘোষণা. শ্রীমতি রীনা জে. সরকার.",
    p10t: "১০:৫০", p10: "মিডিয়া প্রশ্ন. মহাচার্যজি ও শ্রীমতি রিঙ্কু মজুমদার ঘোষ.",
    p11t: "১১:১০", p11: "ধন্যবাদ ও জাতীয় সঙ্গীত. শ্রীমতি রীনা জে. সরকার.",
    roomTitle: "ঘর",
    roomLede: "বাঁশ, প্রদীপ, তুলসি, হলুদ কাপড়ে ঢাকা বেদি. প্রথম নমস্কারের আগে ওকাকুরার হল.",
    capStage: "মঞ্চ. স্বাগত ব্যানার, পূজা, এবং ছাপা নিমন্ত্রণের চার মুখ.",
    openTitle: "নমস্কার",
    capOpen: "মহাচার্য শ্রী সৌরভ জে. সরকার বেদিতে. শ্রীমতি রীনা জে. সরকার, শ্রীমতি রিঙ্কু মজুমদার ঘোষ, শ্রী দুধ কুমার মণ্ডল বাঁশের আসনে.",
    parthaTitle: "ভিডিও সাক্ষ্য",
    parthaLede: "হলে দেখানো হয় শ্রী পার্থ এস. চ্যাটার্জির সাক্ষ্যচিত্র. তিনি ভারতীয় কৃষক সমাজ পশ্চিমবঙ্গের গ্লোবাল অ্যাম্বাসেডর এবং এআই, প্রযুক্তি ও শক্তি রূপান্তরের সিনিয়র অ্যাডভাইজার.",
    parthaName: "শ্রী পার্থ এস. চ্যাটার্জি",
    parthaRole: "গ্লোবাল অ্যাম্বাসেডর, বি কে এস পশ্চিমবঙ্গ",
    capPartha: "ছবির সঙ্গে যে কার্ডটি ছিল. চার মিনিট সাতচল্লিশ সেকেন্ড.",
    playFilm: "ভিডিও সাক্ষ্য চালান",
    playClip: "ক্লিপ চালান",
    noCaptions: "এই ছবির সাবটাইটেল এখনও নেই.",
    minTitle: "মন্ত্রী",
    minLede: "শ্রী দুধ কুমার মণ্ডল, মাননীয় কৃষিমন্ত্রী, পশ্চিমবঙ্গ, মিডিয়া সংযোগের সূচনায় মঞ্চে ছিলেন. কৃষি রত্ন লীগ বাংলা সেই ঘরেই নাম পেল.",
    capMinListen: "বেদিতে মহাচার্যজি. রিঙ্কু ও মন্ত্রী শুনছেন.",
    nMin: "শ্রী দুধ কুমার মণ্ডল",
    rMin: "মাননীয় কৃষিমন্ত্রী, পশ্চিমবঙ্গ",
    capMinFeature: "শ্রী দুধ কুমার মণ্ডল, মাননীয় কৃষিমন্ত্রী, শ্রীমতি রিঙ্কু মজুমদার ঘোষ ও শ্রীমতি রীনা জে. সরকারের সঙ্গে.",
    rinkuTitle: "অধ্যক্ষা",
    rinkuLede: "শ্রীমতি রিঙ্কু মজুমদার ঘোষকে ভারতীয় কৃষক সমাজ পশ্চিমবঙ্গের মহিলা শাখার অধ্যক্ষা হিসেবে সম্মাননা জানানো হয়. গোলাপি শাড়িতে ব্যাজটি সকালভর ছিল.",
    capTrio: "শ্রীমতি রীনা জে. সরকার, শ্রীমতি রিঙ্কু মজুমদার ঘোষ, শ্রী দেবাশীষ ধর.",
    nRinku: "শ্রীমতি রিঙ্কু মজুমদার ঘোষ",
    rRinku: "অধ্যক্ষা, মহিলা শাখা, ভারতীয় কৃষক সমাজ",
    capBell: "ঘণ্টা. সম্মাননায় দাঁড়ানো. মহাচার্যজি, রীনা, রিঙ্কু, ধর.",
    capRinkuPodium: "বেদিতে শ্রীমতি রিঙ্কু মজুমদার ঘোষ. মূল ভাষণ, ১০:২৫.",
    dharTitle: "প্রধান অতিথি",
    dharLede: "শ্রী দেবাশীষ ধর, বিধায়ক, সোনারপুর উত্তর, হলুদ কাপড়ে ঢাকা বেদি থেকে হলকে সম্বোধন করেন.",
    capGarland: "প্রধান অতিথিকে মালা. হল ছবি তুলছে.",
    nDhar: "শ্রী দেবাশীষ ধর",
    rDhar: "বিধায়ক, সোনারপুর উত্তর",
    voicesTitle: "মঞ্চ যা বলেছিল",
    voicesNote: "সেই সকালের যুক্তি, প্রতিটি কণ্ঠে. রেকর্ডিং থেকে ঠিক কথাগুলি পরে বসবে.",
    v1n: "শ্রী দুধ কুমার মণ্ডল",
    v1r: "মাননীয় কৃষিমন্ত্রী, পশ্চিমবঙ্গ",
    v1: "কৃষক নীতির পেছনের দৃশ্য নন. কৃষি রত্ন লীগ বাংলার পরের জনপ্রতিযোগিতার কেন্দ্রে ক্ষেতকে রাখে.",
    v2n: "শ্রীমতি রিঙ্কু মজুমদার ঘোষ",
    v2r: "অধ্যক্ষা, মহিলা শাখা, ভারতীয় কৃষক সমাজ",
    v2: "বাংলার ক্ষেতের অর্ধেক একজন নারী. মহিলা শাখা সমাজের পাশের ঘর নয়.",
    v3n: "শ্রী দেবাশীষ ধর",
    v3r: "বিধায়ক, সোনারপুর উত্তর",
    v3: "প্রত্যাবর্তন নস্টালজিয়া নয়. গ্রাম তার সন্তানদের মাটির পাশে দাঁড়াতে বলছে.",
    v4n: "মহাচার্য শ্রী সৌরভ জে. সরকার",
    v4r: "রাজ্য সভাপতি, বি কে এস পশ্চিমবঙ্গ. কর্মযোগ আশ্রম",
    v4: "শেষে একটি কাজ করা খামার নিয়ে লীগ, তাকে তাকের ট্রফি নয়.",
    launchTitle: "কৃষি রত্ন লীগ বাংলা",
    capLaunch: "পর্দায় কৃষি রত্ন লীগ বাংলার উদ্বোধন. বেদিতে মহাচার্যজি. আসনে রীনা, রিঙ্কু, ধর.",
    hallTitle: "হল",
    capHall: "প্রেস, কৃষক, দল. রবীন্দ্র ওকাকুরা ভবন.",
    pressTitle: "প্রেস আড্ডা",
    pressLede: "অনুষ্ঠানের পর মাইক্রোফোন এগিয়ে এল. মহাচার্যজি, শ্রীমতি রিঙ্কু মজুমদার ঘোষ, শ্রী দেবাশীষ ধর এবং শ্রীমতি রীনা জে. সরকার একসঙ্গে প্রশ্ন নিলেন. বংলাইভ, ২৪ ঘণ্টা এবং ঘরের বাকিরা শেষ উত্তর পর্যন্ত ছিলেন.",
    capPanel: "প্রেস প্যানেল. রীনা, মহাচার্যজি, রিঙ্কু ও ধর. হলুদ কাপড়ে মাইক.",
    capHuddle: "ক্যামেরা এগিয়ে. মহাচার্যজি ঘরের দিকে.",
    capPressDhar: "মাইকের সামনে শ্রী দেবাশীষ ধর.",
    capClose: "রবীন্দ্র ওকাকুরা ভবনের বাইরে, সকালের পর.",
    galleryTitle: "হল থেকে",
    galleryLede: "মিডিয়া সংযোগের ছবি ও ক্লিপ. স্বাগত ব্যানারের পেছনে কৃষি রত্ন লীগের ইন্ট্রো চলে.",
    g1: "মঞ্চ থেকে হলের দিকে.",
    g2: "কৃষিমন্ত্রী.",
    g3: "গ্রিন রুম. মন্ত্রীর জন্য মাটির কাপ.",
    g4: "বেদিতে শ্রী দেবাশীষ ধর.",
    g5: "প্রেস, পুরো মঞ্চ.",
    g6: "শ্রীমতি রীনা জে. সরকার.",
    g7: "পর্দায় কৃষি রত্ন লীগ বাংলা.",
    gv1: "হলের ক্লিপ.",
    gv2: "হলের ক্লিপ.",
    gv3: "হলের ক্লিপ.",
    gv4: "হলের ক্লিপ.",
    gv5: "হলের ক্লিপ.",
    gv6: "হলের ক্লিপ.",
    gv7: "হলের ক্লিপ.",
    mediaTitle: "সংবাদমাধ্যমে",
    mediaLede: "সংবাদ-প্রচারের চলমান নথি. ১৪ই সেপ্টেম্বর ২০২৬ সকালের কাগজের কাটিং, সম্প্রচার ও ভিডিও যত প্রকাশিত হবে, এখানেই যুক্ত হবে.",
    mediaVidName: "ক্যামেরায় মিডিয়া সংযোগ",
    mediaVidRole: "ইউটিউব · ১৪ সেপ্টেম্বর ২০২৬",
    mediaVidCap: "রবীন্দ্র ওকাকুরা ভবনে মিডিয়া সংযোগ অনুষ্ঠানের ফুটেজ.",
    mediaVidLink: "ইউটিউবে দেখুন",
    clipOutlet: "হ্যালো ইভনিং কলকাতা",
    clipPage: "পৃষ্ঠা ০৭",
    clipDate: "১৪ সেপ্টেম্বর ২০২৬",
    clipHead: "Focus on better facilities for Farmers in WB",
    clipBody: "‘হ্যালো কলকাতা ফোকাস’ পাতায় আশিস বসাকের প্রতিবেদন. মিডিয়া সংযোগ অনুষ্ঠান, কৃষি রত্ন লিগের ঘোষণা, এবং ভারতীয় কৃষক সমাজ পশ্চিমবঙ্গের মহিলা শাখার প্রধান হিসেবে অভিষেকের পর কৃষকের সার্বিক উন্নয়ন নিয়ে শ্রীমতি রিঙ্কু মজুমদার ঘোষের বক্তব্য.",
    clipDl: "পৃষ্ঠাটি ডাউনলোড করুন (পিডিএফ)",
    capClip: "হ্যালো ইভনিং কলকাতা, পৃষ্ঠা ০৭, সোমবার, ১৪ সেপ্টেম্বর ২০২৬.",
    releaseTag: "প্রেস বিজ্ঞপ্তি",
    releaseRef: "BKS-WB/PR/2026/09-14",
    releaseHead: "ভারতীয় কৃষক সমাজ পশ্চিমবঙ্গ, কর্মযোগ ফর দ্য ২১স্ট সেঞ্চুরির সঙ্গে",
    releaseBody: "অবিলম্বে প্রকাশের জন্য. স্মারক নং BKS-WB/PR/2026/09-14. এআই-ভিত্তিক কৃষক কল্যাণ উদ্যোগ সহ ‘কৃষি রত্ন লিগ’-এর সূচনা, রাজ্য অধ্যক্ষা হিসেবে শ্রীমতি রিঙ্কু মজুমদার ঘোষকে সংবর্ধনা, এবং দুর্গাপূজা ২০২৬-এর থিম ‘প্রত্যাবর্তন’ উন্মোচন. ইংরেজি ও বাংলা, দুই পৃষ্ঠা.",
    releaseDl: "প্রেস বিজ্ঞপ্তি ডাউনলোড করুন (পিডিএফ)",
    capRelease: "প্রেস বিজ্ঞপ্তি, প্রথম পৃষ্ঠা. ইংরেজি ও বাংলা, দুই পৃষ্ঠা.",
    footOrgs: "ভারতীয় কৃষক সমাজ পশ্চিমবঙ্গ, কর্মযোগ ফর দ্য ২১স্ট সেঞ্চুরির সঙ্গে.",
    footPhotos: "ছবি: বুম্বা এবং শুভাশিস.",
    footRsvp: "শ্রীমতি রীনা জে. সরকার +৯১ ৯৮৩০০ ২৪৬১১. শ্রী রাম বদ্রীনাথন +৯১ ৯১৬৭৭ ১৯৮৯৮.",
    footPlace: "রাজ্য কার্যালয়: এফ-১২৭, ডাউনটাউন মল, ইউনিওয়ার্ল্ড সিটি, নিউ টাউন, কলকাতা ৭০০১৫৬.",
  },
};

const root = document.documentElement;

/* ------------------------------------------------------------ language -- */

function topmostSection() {
  const secs = document.querySelectorAll("main > section, footer");
  for (const s of secs) {
    const r = s.getBoundingClientRect();
    if (r.bottom > 80) return s;
  }
  return null;
}

function apply(lang, keepPlace) {
  const pack = T[lang] || T.en;
  const anchor = keepPlace ? topmostSection() : null;
  const offset = anchor ? anchor.getBoundingClientRect().top : 0;

  root.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = pack[el.getAttribute("data-i18n")];
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll(".lang button").forEach((b) => {
    b.setAttribute("aria-checked", b.dataset.lang === lang ? "true" : "false");
  });

  // Bengali sets taller lines, so hold the reader where they were reading.
  if (anchor) {
    const behavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollBy(0, anchor.getBoundingClientRect().top - offset);
    root.style.scrollBehavior = behavior;
  }

  try { localStorage.setItem("krl-lang", lang); } catch (_) {}
}

let startLang = "en";
try { startLang = localStorage.getItem("krl-lang") || "en"; } catch (_) {}
if (startLang === "bn") apply("bn", false);
else document.querySelectorAll(".lang button").forEach((b) => {
  b.setAttribute("aria-checked", b.dataset.lang === "en" ? "true" : "false");
});

document.querySelectorAll(".lang button").forEach((b) => {
  b.addEventListener("click", () => apply(b.dataset.lang, true));
});

/* ---------------------------------------------- motion capability gate -- */

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasScrollTimeline =
  typeof CSS !== "undefined" &&
  CSS.supports &&
  CSS.supports("animation-timeline", "view()");

// Only mark the fallback when JS is actually running, so a broken script can
// never leave content hidden.
if (!hasScrollTimeline && !reduced) {
  root.classList.add("no-sdt"); // already set inline in <head>; harmless repeat
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
  );
  document.querySelectorAll(".rise, .lift, .prow, .voices li").forEach((el) => io.observe(el));
}

/* ----------------------------------------------------- chronology rail -- */

const railRead = document.querySelector(".rail-read");
if (railRead && !reduced) {
  const marked = document.querySelectorAll("[data-rail]");
  const railIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) railRead.textContent = e.target.dataset.rail;
      }
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  marked.forEach((el) => railIO.observe(el));
}

/* --------------------------------------------------------- hero motion -- */
/* The background loop is atmosphere, not information. It is fetched only
   when the connection and the viewport can afford it; otherwise the still
   stands in and nothing is lost. */

const heroVideo = document.querySelector(".hero-video");
if (heroVideo) {
  const conn = navigator.connection || {};
  const slow = conn.saveData === true || /^([23]g|slow-2g)$/.test(conn.effectiveType || "");
  const roomy = window.matchMedia("(min-width: 900px)").matches;

  if (!reduced && !slow && roomy) {
    const load = () => {
      heroVideo.src = "video/krl-intro-bg.mp4";
      heroVideo.addEventListener(
        "playing",
        () => heroVideo.classList.add("ready"),
        { once: true }
      );
      heroVideo.play().catch(() => {});
    };
    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });
  }
}

/* ----------------------------------------------------- click to play ---- */
/* No clip is fetched until the reader asks for it. Eight posters cost a few
   lazy images; eight <video> elements cost eight connections and a poster
   each, none of which lazy-load. */

document.querySelectorAll(".play-shot").forEach((btn) => {
  btn.addEventListener("click", () => {
    const src = btn.dataset.video;
    if (!src || btn.dataset.playing) return;
    btn.dataset.playing = "1";

    const v = document.createElement("video");
    v.src = src;
    v.controls = true;
    v.autoplay = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    const still = btn.querySelector("img");
    if (still) { v.width = still.width; v.height = still.height; }

    btn.replaceChildren(v);
    btn.classList.add("is-playing");
    v.play().catch(() => {});
  });
});

/* ------------------------------------------------------------ lightbox -- */

const lb = document.querySelector(".lightbox");
if (lb && typeof lb.showModal === "function") {
  const lbImg = lb.querySelector("img");
  const lbCap = lb.querySelector(".lb-cap");
  let opener = null;

  document.querySelectorAll("button.shot").forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = btn.querySelector("img");
      opener = btn;
      lbImg.src = btn.dataset.full || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = btn.dataset.cap || "";
      lb.showModal();
    });
  });

  const shut = () => lb.close();
  lb.querySelector(".lb-close").addEventListener("click", shut);
  lb.addEventListener("click", (e) => { if (e.target === lb) shut(); });
  lb.addEventListener("close", () => {
    lbImg.removeAttribute("src");
    if (opener) { opener.focus(); opener = null; }
  });
}

/* ------------------------------------------------- reel drag-to-pan ----- */
/* Only where the track is actually a scroller: below 900px, without
   scroll-driven animation support, or under reduced motion. When the pan is
   pinned, vertical scroll already drives it and there is nothing to drag. */

const track = document.querySelector(".pan-track");
if (track && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let down = false, startX = 0, startLeft = 0, moved = 0;
  const scrollable = () => track.scrollWidth > track.clientWidth + 4;

  track.addEventListener("pointerdown", (e) => {
    if (!scrollable() || e.target.closest("video")) return;
    down = true; moved = 0;
    startX = e.clientX;
    startLeft = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
    track.style.cursor = "grabbing";
  });

  track.addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    track.scrollLeft = startLeft - dx;
  });

  const release = (e) => {
    if (!down) return;
    down = false;
    track.style.cursor = "";
    try { track.releasePointerCapture(e.pointerId); } catch (_) {}
  };
  track.addEventListener("pointerup", release);
  track.addEventListener("pointercancel", release);

  // a drag should not also fire the lightbox
  track.addEventListener("click", (e) => {
    if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
  }, true);
}
