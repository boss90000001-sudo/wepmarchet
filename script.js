// ========== قاموس اللغات ==========
const i18n = {
    ar: {
        delivery_info: '🚚 توصيل لجميع المحافظات | الدفع عند الاستلام',
        nav_all: 'الكل', nav_luxury: 'فاخرة', nav_sports: 'رياضية', nav_smart: 'ذكية', nav_classic: 'كلاسيكية',
        hero_title: 'الوقت بلمسة فاخرة', hero_desc: 'أحدث تشكيلات الساعات الفاخرة، الرياضية، الذكية والكلاسيكية – توصلك لباب المنزل',
        contact_title: 'خدمة العملاء', contact_desc: 'للطلب أو الاستفسار تواصل معنا مباشرة', payment_info: '  ندعم الدفع عبر الكريمي، المحافظ الإلكترونية، أو الدفع عند الاستلام حقوق النشر محفوضه للمهندس عبدالرحمن ثابت ',
        category_luxury: 'فاخرة', category_sports: 'رياضية', category_smart: 'ذكية', category_classic: 'كلاسيكية',
        buy_btn: 'شراء الآن',
        reviews_title: 'التقييمات',
        review_name_placeholder: 'اسمك',
        review_comment_placeholder: 'اكتب تعليقك...',
        submit_review_btn: 'أرسل'
    },
    en: {
        delivery_info: '🚚 Delivery to all governorates | Cash on delivery',
        nav_all: 'All', nav_luxury: 'Luxury', nav_sports: 'Sports', nav_smart: 'Smart', nav_classic: 'Classic',
        hero_title: 'Time with a Luxurious Touch', hero_desc: 'Latest collections of luxury, sports, smart and classic watches – delivered to your doorstep',
        contact_title: 'Customer Service', contact_desc: 'Order or inquire directly via WhatsApp', payment_info: 'We accept Kreemi, e-wallets, or cash on delivery',
        category_luxury: 'Luxury', category_sports: 'Sports', category_smart: 'Smart', category_classic: 'Classic',
        buy_btn: 'Buy Now',
        reviews_title: 'Reviews',
        review_name_placeholder: 'Your name',
        review_comment_placeholder: 'Write your comment...',
        submit_review_btn: 'Submit'
    }
};

let currentLang = 'ar';
const langToggle = document.getElementById('langToggle');

function translate(key) {
    return i18n[currentLang]?.[key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = translate(key);
        } else {
            el.textContent = translate(key);
        }
    });
}

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    langToggle.textContent = currentLang === 'ar' ? 'English' : 'العربية';
    applyTranslations();
    renderProducts(currentFilter);
});

// ========== بيانات الساعات مع مصفوفة للتقييمات (تم تصحيح مسارات الصور لتطابق ما هو مرفوع) ==========
const watches = [
    { id: 1, name: {ar: 'ساعة لوسيرن الفاخرة', en: 'Lucerne Luxury Watch'}, category: 'luxury', priceYER: 70000, specs: {ar:'هيكل ذهبي، مينا عرق اللؤلؤ', en:'Gold case, mother-of-pearl dial'}, img: 'images/Lucerne Luxury Watch.jpeg', reviews: [] },
    { id: 2, name: {ar: 'ساعة كرونوغراف ملكية', en: 'Royal Chronograph'}, category: 'luxury', priceYER: 63000, specs: {ar:'حركة سويسرية، حزام جلد تمساح', en:'Swiss movement, crocodile strap'}, img: 'images/Royal Chronograph.jpeg', reviews: [] },
    { id: 3, name: {ar: 'ساعة ريسر الرياضية', en: 'Racer Sports Watch'}, category: 'sports', priceYER: 42000, specs: {ar:'مقاومة ماء 200م، كرونوغراف', en:'200m water resistance, chronograph'}, img: 'images/Adventure Pro.jpeg', reviews: [] },
    { id: 4, name: {ar: 'ساعة أدفنتشر برو', en: 'Adventure Pro'}, category: 'sports', priceYER: 35000, specs: {ar:'مينا كربوني، حزام مطاط', en:'Carbon dial, rubber strap'}, img: 'images/Adventure Pro.jpeg', reviews: [] },
    { id: 5, name: {ar: 'ساعة سمارت تاتش', en: 'Smart Touch'}, category: 'smart', priceYER: 56000, specs: {ar:'شاشة AMOLED، مراقبة صحية', en:'AMOLED display, health tracking'}, img: 'images/Active Gear .jpeg', reviews: [] },
    { id: 6, name: {ar: 'ساعة إلكترونيك جير', en: 'Electronic Gear'}, category: 'smart', priceYER: 49000, specs: {ar:'بطارية 7 أيام، اتصال بلوتوث', en:'7-day battery, Bluetooth calling'}, img: 'images/Active Gear .jpeg', reviews: [] },
    { id: 7, name: {ar: 'ساعة هيريتيج كلاسيك', en: 'Heritage Classic'}, category: 'classic', priceYER: 21000, specs: {ar:'جلد بني، مينا أبيض', en:'Brown leather, white dial'}, img: 'images/Classic Moon.jpeg', reviews: [] },
    { id: 8, name: {ar: 'ساعة فينتاج 1920', en: 'Vintage 1920'}, category: 'classic', priceYER: 28000, specs: {ar:'تصميم رجعي، هيكل نحاسي', en:'Retro design, brass case'}, img: 'images/Classic Moon.jpeg', reviews: [] },
    { id: 9,  name: {ar: 'ساعة لوسيرن ستار', en: 'Lucerne Star'}, category: 'luxury', priceYER: 70000, specs: {ar:'مينا مرصع، حزام فولاذي', en:'Studded dial, steel strap'}, img: 'images/(Crown Gold).jpeg', reviews: [] },
    { id: 10, name: {ar: 'ساعة كراون جولد', en: 'Crown Gold'}, category: 'luxury', priceYER: 77000, specs: {ar:'ذهب وردي، حركة أوتوماتيك', en:'Rose gold, automatic movement'}, img: 'images/(Crown Gold).jpeg', reviews: [] },
    { id: 11, name: {ar: 'ساعة سبيد ريسر', en: 'Speed Racer'}, category: 'sports', priceYER: 35000, specs: {ar:'عداد سرعة، حزام سيليكون', en:'Tachymeter, silicone strap'}, img: 'images/Deep Dive.jpeg', reviews: [] },
    { id: 12, name: {ar: 'ساعة ديب دايف', en: 'Deep Dive'}, category: 'sports', priceYER: 40000, specs: {ar:'مقاومة 300م، صمام هليوم', en:'300m WR, helium valve'}, img: 'images/Deep Dive.jpeg', reviews: [] },
    { id: 13, name: {ar: 'ساعة فيت تريك', en: 'Fit Trek'}, category: 'smart', priceYER: 49000, specs: {ar:'GPS مدمج، مراقبة نوم', en:'Built-in GPS, sleep tracking'}, img: 'images/Fit Trek.jpeg', reviews: [] },
    { id: 14, name: {ar: 'ساعة تيك برو', en: 'Tech Pro'}, category: 'smart', priceYER: 55000, specs: {ar:'شاشة LTPO، شحن لاسلكي', en:'LTPO display, wireless charging'}, img: 'images/Fit Trek.jpeg', reviews: [] },
    { id: 15, name: {ar: 'ساعة كلاسيك مون', en: 'Classic Moon'}, category: 'classic', priceYER: 28000, specs: {ar:'طور القمر، جلد إيطالي', en:'Moonphase, Italian leather'}, img: 'images/Classic Moon.jpeg', reviews: [] },
    { id: 16, name: {ar: 'ساعة فينتاج ستايل', en: 'Vintage Style'}, category: 'classic', priceYER: 32000, specs: {ar:'مينا مشع، هيكل نحاس', en:'Luminous dial, brass case'}, img: 'images/Elegant Dream.jpeg', reviews: [] },
    { id: 17, name: {ar: 'ساعة إليجنت دريم', en: 'Elegant Dream'}, category: 'luxury', priceYER: 60000, specs: {ar:'سوار من السيراميك', en:'Ceramic bracelet'}, img: 'images/Elegant Dream.jpeg', reviews: [] },
    { id: 18, name: {ar: 'ساعة أكتيف جير', en: 'Active Gear'}, category: 'sports', priceYER: 38000, specs: {ar:'مقاومة صدمات، إضاءة خلفية', en:'Shock resistant, backlight'}, img: 'images/Active Gear .jpeg', reviews: [] }
];

// أسعار الصرف
const exchangeRates = { USD: 530, SAR: 140 };

function convertPrice(yemeniRiyal, currency) {
    if (currency === 'YER') return yemeniRiyal;
    if (currency === 'USD') return (yemeniRiyal / exchangeRates.USD).toFixed(2);
    if (currency === 'SAR') return (yemeniRiyal / exchangeRates.SAR).toFixed(2);
}

let currentFilter = 'all';
let selectedCurrency = 'YER';

function renderProducts(filter = 'all') {
    const container = document.getElementById('productsContainer');
    const filtered = filter === 'all' ? watches : watches.filter(w => w.category === filter);
    container.innerHTML = filtered.map(watch => {
        const name = watch.name[currentLang] || watch.name.ar;
        const specs = watch.specs[currentLang] || watch.specs.ar;
        const priceYER = watch.priceYER;
        const priceDisplay = convertPrice(priceYER, selectedCurrency);
        const currencySymbol = selectedCurrency === 'USD' ? '$' : selectedCurrency === 'SAR' ? 'ر.س' : 'ريال يمني';
        
        // بناء HTML للتقييمات السابقة
        let reviewsHTML = '';
        if (watch.reviews.length > 0) {
            reviewsHTML = watch.reviews.map(r => `
                <div class="review-item">
                    <strong>${r.name}</strong> - ${'★'.repeat(r.rating)}<br>
                    <small>${r.comment}</small>
                </div>
            `).join('');
        } else {
            reviewsHTML = `<p style="color:var(--text-muted); font-size:0.8rem;">${currentLang === 'ar' ? 'لا توجد تقييمات بعد' : 'No reviews yet'}</p>`;
        }

        return `
        <div class="product-card" data-cat="${watch.category}" data-id="${watch.id}">
            <img src="${watch.img}" alt="${name}" class="product-img" loading="lazy">
            <div class="product-body">
                <span class="product-category">${translate('category_' + watch.category)}</span>
                <h3 class="product-title">${name}</h3>
                <p class="product-specs">${specs}</p>
                <div class="price-box" onclick="toggleCurrencyPopup(event, ${watch.priceYER}, this)">
                    ${priceDisplay} ${currencySymbol}
                    <span style="font-size:0.7rem;">▼</span>
                    <div class="popup-currency">
                        <button onclick="setCurrency(event, 'YER', ${watch.priceYER})">ريال يمني</button>
                        <button onclick="setCurrency(event, 'USD', ${watch.priceYER})">دولار $</button>
                        <button onclick="setCurrency(event, 'SAR', ${watch.priceYER})">ريال سعودي</button>
                    </div>
                </div>
                <button class="buy-btn" onclick="alert('شكرًا لك! سيتم التواصل معك على الرقم 733271081')">
                    ${translate('buy_btn')}
                </button>
                
                <!-- قسم التقييمات داخل الكارد -->
                <div class="product-reviews">
                    <h4>${translate('reviews_title')}</h4>
                    <div class="reviews-list" id="reviews-${watch.id}">
                        ${reviewsHTML}
                    </div>
                    <div class="review-form-inline">
                        <input type="text" class="review-name-input" placeholder="${translate('review_name_placeholder')}" id="name-${watch.id}">
                        <div class="inline-stars" id="stars-${watch.id}">
                            <span data-value="1">☆</span><span data-value="2">☆</span><span data-value="3">☆</span><span data-value="4">☆</span><span data-value="5">☆</span>
                        </div>
                        <textarea class="review-comment-input" placeholder="${translate('review_comment_placeholder')}" rows="2" id="comment-${watch.id}"></textarea>
                        <button class="submit-review-btn" onclick="submitReview(${watch.id})">${translate('submit_review_btn')}</button>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');
    
    // إعادة ربط أحداث النجوم لكل منتج بعد التحديث
    document.querySelectorAll('.inline-stars').forEach(starContainer => {
        const stars = starContainer.querySelectorAll('span');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const val = star.getAttribute('data-value');
                stars.forEach(s => s.classList.remove('active'));
                for(let i=0; i<val; i++) stars[i].classList.add('active');
                starContainer.setAttribute('data-rating', val);
            });
        });
    });
}

// دالة إرسال تقييم جديد لساعة محددة
window.submitReview = function(watchId) {
    const nameInput = document.getElementById(`name-${watchId}`);
    const commentInput = document.getElementById(`comment-${watchId}`);
    const starsContainer = document.getElementById(`stars-${watchId}`);
    const rating = starsContainer.getAttribute('data-rating') || 0;
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();
    
    if (!name || rating == 0) {
        alert(currentLang === 'ar' ? 'يرجى كتابة الاسم واختيار التقييم' : 'Please enter name and rating');
        return;
    }
    
    // البحث عن الساعة في المصفوفة
    const watch = watches.find(w => w.id === watchId);
    if (watch) {
        watch.reviews.push({ name, rating: parseInt(rating), comment });
        
        // تحديث عرض التقييمات لهذه الساعة فقط
        const reviewsList = document.getElementById(`reviews-${watchId}`);
        const reviewHTML = `
            <div class="review-item">
                <strong>${name}</strong> - ${'★'.repeat(rating)}<br>
                <small>${comment}</small>
            </div>`;
        // إذا كانت هذه أول تقييم نزيل رسالة "لا توجد تقييمات"
        if (watch.reviews.length === 1) {
            reviewsList.innerHTML = reviewHTML;
        } else {
            reviewsList.insertAdjacentHTML('afterbegin', reviewHTML);
        }
        
        // مسح الحقول
        nameInput.value = '';
        commentInput.value = '';
        starsContainer.querySelectorAll('span').forEach(s => s.classList.remove('active'));
        starsContainer.removeAttribute('data-rating');
        
        alert(currentLang === 'ar' ? 'تم إضافة التقييم بنجاح!' : 'Review added successfully!');
    }
};

function toggleCurrencyPopup(e, basePrice, element) {
    e.stopPropagation();
    const popup = element.querySelector('.popup-currency');
    const allPopups = document.querySelectorAll('.popup-currency');
    allPopups.forEach(p => { if (p !== popup) p.style.display = 'none'; });
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

function setCurrency(e, currency, basePrice) {
    e.stopPropagation();
    selectedCurrency = currency;
    document.querySelectorAll('.popup-currency').forEach(p => p.style.display = 'none');
    renderProducts(currentFilter);
}

window.addEventListener('click', () => {
    document.querySelectorAll('.popup-currency').forEach(p => p.style.display = 'none');
});

// التصنيفات
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        currentFilter = link.dataset.cat;
        renderProducts(currentFilter);
    });
});

// التشغيل الأول
applyTranslations();
renderProducts('all');
