// ===== 背景轮播 =====
(function backgroundSlideshow() {
    const slides = document.querySelectorAll('.bg-slide');
    if (slides.length < 2) return;

    const interval = 6000;
    let current = 0;
    let timer = null;

    // 预加载所有背景图，避免首次切换时闪白
    slides.forEach(slide => {
        const layer = slide.querySelector('.bg-slide-sharp');
        if (!layer) return;
        const match = layer.style.backgroundImage.match(/url\(['"]?([^'")]+)['"]?\)/);
        if (match) {
            const img = new Image();
            img.src = match[1];
        }
    });

    // 生成轮播指示点
    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'slideshow-dots';
    const dots = [];
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('button');
        dot.className = 'slideshow-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', '切换到第 ' + (i + 1) + ' 张背景');
        dot.addEventListener('click', () => {
            show(i);
            resetTimer();
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
    }
    document.body.appendChild(dotsWrap);

    function show(index) {
        slides[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(() => show(current + 1), interval);
    }

    resetTimer();
})();

// ===== 常用网站链接（图标随机分配） =====
(function renderLinks() {
    const container = document.getElementById('linksGrid');
    if (!container) return;

    const sites = [
        { name: '哔哩哔哩', url: 'https://www.bilibili.com' },
        { name: '微博', url: 'https://weibo.com' },
        { name: '知乎', url: 'https://www.zhihu.com' },
        { name: 'GitHub', url: 'https://github.com' },
        { name: '抖音', url: 'https://www.douyin.com' },
        { name: '小红书', url: 'https://www.xiaohongshu.com' },
        { name: '网易云音乐', url: 'https://music.163.com' },
        { name: 'CSDN', url: 'https://www.csdn.net' },
        { name: '掘金', url: 'https://juejin.cn' },
        { name: 'QQ', url: 'https://im.qq.com' },
        { name: '微信', url: 'https://weixin.qq.com' },
        { name: '百度贴吧', url: 'https://tieba.baidu.com' }
    ];

    // 你的图标文件（动画 GIF）。1~7 已存在；8~12 待你补充，命名保持 8.gif ~ 12.gif。
    const icons = [
        'assets/images/icons/1.gif',
        'assets/images/icons/2.gif',
        'assets/images/icons/3.gif',
        'assets/images/icons/4.gif',
        'assets/images/icons/5.gif',
        'assets/images/icons/6.gif',
        'assets/images/icons/7.gif',
        'assets/images/icons/8.webp',
        'assets/images/icons/9.png',
        'assets/images/icons/10.png',
        'assets/images/icons/11.png',
        'assets/images/icons/12.png'
    ];

    // Fisher-Yates 洗牌：随机打乱顺序，每个图标只出现一次（不重复）
    const shuffled = [...icons];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    sites.forEach((site, index) => {
        const icon = shuffled[index];

        const link = document.createElement('a');
        link.className = 'link-card';
        link.href = site.url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.title = site.name;

        const img = document.createElement('img');
        img.className = 'icon';
        img.src = icon;
        img.alt = site.name;
        img.loading = 'lazy';
        img.decoding = 'async';

        const name = document.createElement('span');
        name.className = 'link-name';
        name.textContent = site.name;

        link.appendChild(img);
        link.appendChild(name);
        container.appendChild(link);
    });
})();

// ===== 粒子生成 =====
(function createParticles() {
    const container = document.getElementById('particles');
    const count = 40;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (8 + Math.random() * 12) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.width = (1 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
})();
