/* ================================================================
   LUMIÈRE – AI SKIN ANALYZER  (analyzer.js)
   Mock AI via Rules Engine – no external API needed
   ================================================================ */

// ──────────────────────────────────────────────────────────────
// RULES ENGINE – Skin type profiles
// ──────────────────────────────────────────────────────────────
const SKIN_PROFILES = {
    oily: {
        label: 'Oily Skin',
        icon: '💧',
        color: '#dbeafe',
        desc: 'Your skin produces excess sebum, leading to a shiny appearance, enlarged pores, and a tendency toward breakouts.',
        concerns: ['Acne', 'Oiliness', 'Enlarged Pores'],
        tips: 'Use lightweight, non-comedogenic products. Look for niacinamide and BHA to control shine and clear pores. Always wear SPF.',
        categories: ['cleanser', 'toner', 'serum', 'sunscreen', 'powder'],
        skinTypeKey: 'oily'
    },
    dry: {
        label: 'Dry Skin',
        icon: '🌸',
        color: '#fce7f3',
        desc: 'Your skin lacks moisture and natural oils, which can cause tightness, flakiness, and a dull complexion.',
        concerns: ['Dryness', 'Flakiness', 'Dull Tone'],
        tips: 'Layer hydrating products — toner, essence, serum, then moisturiser. Use cream-based formulas with ceramides and hyaluronic acid.',
        categories: ['cleanser', 'serum', 'moisturizer', 'mask', 'sunscreen'],
        skinTypeKey: 'dry'
    },
    combination: {
        label: 'Combination Skin',
        icon: '⚖️',
        color: '#fef9c3',
        desc: 'Your skin has both oily areas (T-zone) and dry areas (cheeks). Balance is the key to your perfect routine.',
        concerns: ['Acne', 'Dryness', 'Pigmentation', 'Dark Circles'],
        tips: 'Multi-mask to treat different zones. Use gel moisturisers that hydrate without adding oil. Niacinamide works great for balance.',
        categories: ['cleanser', 'toner', 'serum', 'moisturizer', 'sunscreen'],
        skinTypeKey: 'combination'
    },
    sensitive: {
        label: 'Sensitive Skin',
        icon: '🌿',
        color: '#dcfce7',
        desc: 'Your skin reacts easily to products and environment, showing redness, irritation, or stinging. Gentle care is essential.',
        concerns: ['Sensitivity', 'Redness', 'Irritation'],
        tips: 'Choose fragrance-free, minimal-ingredient products. Centella asiatica and ceramides are your best friends. Patch-test new products first.',
        categories: ['cleanser', 'moisturizer', 'mask', 'sunscreen', 'serum'],
        skinTypeKey: 'sensitive'
    },
    normal: {
        label: 'Normal Skin',
        icon: '✨',
        color: '#f0fdf4',
        desc: 'Lucky you — your skin is well-balanced, with small pores, minimal blemishes, and a radiant complexion.',
        concerns: ['Maintenance', 'Anti-Aging', 'Brightening'],
        tips: 'Focus on prevention and glow. Vitamin C serums brighten, SPF protects, and a gentle routine keeps things balanced year-round.',
        categories: ['cleanser', 'serum', 'moisturizer', 'sunscreen', 'lip'],
        skinTypeKey: 'all'
    }
};

// Routine step definitions
const ROUTINE_STEPS = ['Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen'];

// Concern icon map
const CONCERN_ICONS = {
    'Acne':           { icon: '🔴', bg: '#ffe4e6', label: 'Acne',            sub: 'Detected' },
    'Dryness':        { icon: '💧', bg: '#dbeafe', label: 'Dryness',          sub: 'Detected' },
    'Flakiness':      { icon: '🌬️', bg: '#e0f2fe', label: 'Flakiness',        sub: 'Detected' },
    'Oiliness':       { icon: '✨', bg: '#dcfce7', label: 'Oiliness',         sub: 'Detected' },
    'Enlarged Pores': { icon: '🔵', bg: '#ede9fe', label: 'Enlarged Pores',   sub: 'Detected' },
    'Pigmentation':   { icon: '🟡', bg: '#fef9c3', label: 'Pigmentation',     sub: 'Detected' },
    'Dark Circles':   { icon: '👁️', bg: '#ede9fe', label: 'Dark Circles',     sub: 'Detected' },
    'Dull Tone':      { icon: '🌥️', bg: '#f4f4f5', label: 'Dull Tone',        sub: 'Detected' },
    'Sensitivity':    { icon: '🌸', bg: '#fce7f3', label: 'Sensitivity',      sub: 'Detected' },
    'Redness':        { icon: '❤️', bg: '#ffe4e6', label: 'Redness',          sub: 'Detected' },
    'Irritation':     { icon: '⚡', bg: '#fff7ed', label: 'Irritation',       sub: 'Detected' },
    'Maintenance':    { icon: '💎', bg: '#f0fdf4', label: 'Maintenance',      sub: 'Recommended' },
    'Anti-Aging':     { icon: '⏳', bg: '#fef9c3', label: 'Anti-Aging',       sub: 'Focus' },
    'Brightening':    { icon: '☀️', bg: '#fef9c3', label: 'Brightening',      sub: 'Focus' },
};

// ──────────────────────────────────────────────────────────────
// MOCK ANALYSIS ENGINE
// Simulates AI by using image pixel sampling + weighted random
// with realistic distribution matching real skin statistics
// ──────────────────────────────────────────────────────────────
function runAnalysisEngine(imageDataUrl, callback) {
    const img = new Image();
    img.onload = () => {
        // Sample the image to get dominant colour info
        const canvas = document.createElement('canvas');
        canvas.width = 80; canvas.height = 80;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 80, 80);
        const data = ctx.getImageData(0, 0, 80, 80).data;

        let r = 0, g = 0, b = 0, n = 0;
        for (let i = 0; i < data.length; i += 4) {
            r += data[i]; g += data[i+1]; b += data[i+2]; n++;
        }
        r /= n; g /= n; b /= n;

        // Heuristic rules based on colour channels
        const brightness = (r + g + b) / 3;
        const redness    = r - (g + b) / 2;
        const yellowness = (r + g) / 2 - b;

        // Score each type
        const scores = {
            oily:        Math.max(0, brightness - 130) + Math.max(0, yellowness - 20),
            dry:         Math.max(0, 130 - brightness) + Math.max(0, -redness),
            sensitive:   Math.max(0, redness - 15),
            combination: Math.max(0, brightness - 100) * 0.5 + Math.max(0, 100 - brightness) * 0.3,
            normal:      40 // baseline
        };

        // Normalise and pick with weighted random (adds variety)
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        let rand = Math.random() * total;
        let chosen = 'combination';
        for (const [type, score] of Object.entries(scores)) {
            rand -= score;
            if (rand <= 0) { chosen = type; break; }
        }

        callback(SKIN_PROFILES[chosen]);
    };
    img.src = imageDataUrl;
}

// ──────────────────────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────────────────────
let saStream       = null;
let saFacingMode   = 'user';
let saCapturedUrl  = null;
let saUploadedUrl  = null;
let saCurrentMode  = 'camera'; // 'camera' | 'upload'

// ──────────────────────────────────────────────────────────────
// TAB SWITCHING
// ──────────────────────────────────────────────────────────────
function saTab(mode) {
    saCurrentMode = mode;
    document.getElementById('tab-camera').classList.toggle('active', mode === 'camera');
    document.getElementById('tab-upload').classList.toggle('active', mode === 'upload');
    document.getElementById('sa-camera-view').style.display = mode === 'camera' ? 'block' : 'none';
    document.getElementById('sa-upload-view').style.display = mode === 'upload'  ? 'block' : 'none';

    if (mode === 'camera') {
        // Reset camera view
        resetCameraView();
    } else {
        saStopCamera();
    }
}

// ──────────────────────────────────────────────────────────────
// CAMERA
// ──────────────────────────────────────────────────────────────
async function saStartCamera() {
    try {
        if (saStream) saStopCamera();
        saStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: saFacingMode, width: { ideal: 1280 }, height: { ideal: 960 } }
        });
        const video = document.getElementById('sa-video');
        video.srcObject = saStream;
        video.style.display = 'block';

        // Show captured img if was showing
        document.getElementById('sa-captured-img').style.display = 'none';

        // Restore overlay
        document.querySelector('.sa-scan-overlay').style.display = 'flex';

        document.getElementById('sa-start-btn').style.display = 'none';
        document.getElementById('sa-capture-btn').innerHTML = '<i class="fa-solid fa-camera"></i> Capture &amp; Analyse';
        document.getElementById('sa-capture-btn').onclick = saCapture;
    } catch (e) {
        showToast('Camera not available. Please upload a photo instead.');
        saTab('upload');
    }
}

function saStopCamera() {
    if (saStream) {
        saStream.getTracks().forEach(t => t.stop());
        saStream = null;
    }
}

function switchCamera() {
    saFacingMode = saFacingMode === 'user' ? 'environment' : 'user';
    saStartCamera();
}

function saCapture() {
    const video  = document.getElementById('sa-video');
    const canvas = document.getElementById('sa-canvas');
    if (!saStream || video.readyState < 2) { showToast('Please start the camera first.'); return; }

    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (saFacingMode === 'user') { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
    ctx.drawImage(video, 0, 0);

    saCapturedUrl = canvas.toDataURL('image/jpeg', 0.9);
    saStopCamera();

    // Show the captured still
    const img = document.getElementById('sa-captured-img');
    img.src = saCapturedUrl;
    img.style.display = 'block';
    video.style.display = 'none';
    document.querySelector('.sa-scan-overlay').style.display = 'none';

    // Change button to Analyse
    document.getElementById('sa-capture-btn').innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Analyse';
    document.getElementById('sa-capture-btn').onclick = () => saRunAnalysis(saCapturedUrl);
    document.getElementById('sa-start-btn').style.display = 'inline-flex';
    document.getElementById('sa-start-btn').innerHTML = '<i class="fa-solid fa-rotate-left"></i> Retake';
    document.getElementById('sa-start-btn').onclick = () => {
        saStartCamera();
        document.getElementById('sa-start-btn').style.display = 'none';
    };
}

function resetCameraView() {
    const video = document.getElementById('sa-video');
    video.style.display = 'block';
    document.getElementById('sa-captured-img').style.display = 'none';
    document.querySelector('.sa-scan-overlay').style.display = 'flex';
    document.getElementById('sa-start-btn').style.display = 'inline-flex';
    document.getElementById('sa-start-btn').innerHTML = '<i class="fa-solid fa-video"></i> Start Camera';
    document.getElementById('sa-start-btn').onclick = saStartCamera;
    document.getElementById('sa-capture-btn').innerHTML = '<i class="fa-solid fa-camera"></i> Capture &amp; Analyse';
    document.getElementById('sa-capture-btn').onclick = saCapture;
}

// ──────────────────────────────────────────────────────────────
// UPLOAD
// ──────────────────────────────────────────────────────────────
function saHandleUpload(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        saUploadedUrl = e.target.result;
        document.getElementById('sa-upload-img').src = saUploadedUrl;
        document.getElementById('sa-upload-preview').style.display = 'block';
        document.querySelector('.sa-upload-drop').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function saAnalyseUploaded() {
    if (saUploadedUrl) saRunAnalysis(saUploadedUrl);
}

// ──────────────────────────────────────────────────────────────
// ANALYSIS FLOW
// ──────────────────────────────────────────────────────────────
function saRunAnalysis(imageDataUrl) {
    // Show analysing state in results card
    document.getElementById('sa-empty-state').style.display    = 'none';
    document.getElementById('sa-analysing-state').style.display = 'block';
    document.getElementById('sa-results-state').style.display   = 'none';

    // Animate steps
    const stepIds = ['astep-1','astep-2','astep-3','astep-4'];
    stepIds.forEach(id => {
        document.getElementById(id).classList.remove('active','done');
    });
    document.getElementById('astep-1').classList.add('active');

    let step = 0;
    const stepInterval = setInterval(() => {
        if (step < stepIds.length - 1) {
            document.getElementById(stepIds[step]).classList.remove('active');
            document.getElementById(stepIds[step]).classList.add('done');
            step++;
            document.getElementById(stepIds[step]).classList.add('active');
        }
    }, 700);

    // Run engine after animation
    setTimeout(() => {
        runAnalysisEngine(imageDataUrl, profile => {
            clearInterval(stepInterval);
            stepIds.forEach(id => document.getElementById(id).classList.add('done'));
            setTimeout(() => renderResults(profile, imageDataUrl), 400);
        });
    }, 3000);
}

// ──────────────────────────────────────────────────────────────
// RENDER RESULTS
// ──────────────────────────────────────────────────────────────
function renderResults(profile, imageDataUrl) {
    // Transition
    document.getElementById('sa-analysing-state').style.display = 'none';
    document.getElementById('sa-results-state').style.display   = 'block';

    // Skin type header
    document.getElementById('sa-skin-icon').textContent       = profile.icon;
    document.getElementById('sa-skin-type-name').textContent  = profile.label;
    document.getElementById('sa-skin-type-name').style.color  = '#db2777';
    document.getElementById('sa-skin-type-desc').textContent  = profile.desc;

    // Concerns grid
    const grid = document.getElementById('sa-concerns-grid');
    grid.innerHTML = profile.concerns.map(c => {
        const info = CONCERN_ICONS[c] || { icon: '●', bg: '#f4f4f5', label: c, sub: 'Detected' };
        return `
        <div class="sa-concern-card">
            <div class="sa-concern-icon-wrap" style="background:${info.bg}">${info.icon}</div>
            <div>
                <strong>${info.label}</strong>
                <p class="sa-concern-sub">${info.sub}</p>
            </div>
        </div>`;
    }).join('');

    // Recommended products — pick 4 from matching categories
    const rec = pickRecommendedProducts(profile);
    const recGrid = document.getElementById('sa-rec-products');
    recGrid.innerHTML = rec.map(p => `
        <div class="sa-rec-card" onclick="navigatePath('/product/${p.id}')">
            <img src="${p.image}" alt="${p.name}" onerror="this.style.background='#fbcfe8';this.style.display='block'">
            <div class="sa-rec-body">
                <p class="sa-rec-brand">${formatCategory(p.category)}</p>
                <p class="sa-rec-name">${p.name}</p>
                <p class="sa-rec-price">$${p.price.toFixed(2)}</p>
                <button class="sa-rec-btn" onclick="event.stopPropagation();navigatePath('/product/${p.id}')">View Product</button>
            </div>
        </div>`
    ).join('');

    // Bottom: Recommended Routine
    renderRoutine(profile);
}

function pickRecommendedProducts(profile) {
    const result = [];
    const used   = new Set();
    // Try to get one product per priority category
    for (const cat of profile.categories) {
        const match = products.find(p =>
            p.category === cat &&
            (p.skinType === profile.skinTypeKey || p.skinType === 'all') &&
            !used.has(p.id)
        );
        if (match) { result.push(match); used.add(match.id); }
        if (result.length >= 4) break;
    }
    // Fill remaining slots from any matching product
    if (result.length < 4) {
        for (const p of products) {
            if (!used.has(p.id) && (p.skinType === profile.skinTypeKey || p.skinType === 'all')) {
                result.push(p); used.add(p.id);
            }
            if (result.length >= 4) break;
        }
    }
    return result;
}

function renderRoutine(profile) {
    document.getElementById('sa-routine-empty').style.display   = 'none';
    document.getElementById('sa-routine-content').style.display = 'block';

    // Map routine steps → best matching product
    const stepsEl  = document.getElementById('sa-routine-steps');
    const dotsEl   = document.getElementById('sa-routine-dots');
    const catMap   = { Cleanser: 'cleanser', Toner: 'toner', Serum: 'serum', Moisturizer: 'moisturizer', Sunscreen: 'sunscreen' };
    const used     = new Set();
    const routine  = [];

    for (const step of ROUTINE_STEPS) {
        const cat = catMap[step];
        const prod = products.find(p =>
            p.category === cat &&
            (p.skinType === profile.skinTypeKey || p.skinType === 'all') &&
            !used.has(p.id)
        ) || products.find(p => p.category === cat && !used.has(p.id));
        if (prod) { routine.push({ step, prod }); used.add(prod.id); }
    }

    stepsEl.innerHTML = routine.map((item, i) => `
        <div class="sa-routine-step">
            <img src="${item.prod.image}" alt="${item.prod.name}" onerror="this.style.background='#fbcfe8'">
            <p class="sa-routine-step-label">${item.step}</p>
            <p class="sa-routine-step-brand">${item.prod.name.split(' ').slice(0,3).join(' ')}</p>
            <p class="sa-routine-step-price">$${item.prod.price.toFixed(2)}</p>
        </div>`
    ).join('');

    dotsEl.innerHTML = routine.map((_, i) => `
        <div class="sa-routine-dot">${i + 1}</div>
        ${i < routine.length - 1 ? '<div class="sa-routine-line"></div>' : ''}`
    ).join('');
}

function formatCategory(cat) {
    const map = {
        cleanser: 'Cleanser', toner: 'Toner', serum: 'Serum',
        moisturizer: 'Moisturizer', sunscreen: 'Sunscreen',
        mask: 'Mask', body: 'Body Care', hair: 'Hair Care',
        hand: 'Hand Care', powder: 'Powder', lip: 'Lip Care', mist: 'Mist'
    };
    return map[cat] || cat;
}

// ──────────────────────────────────────────────────────────────
// RESET
// ──────────────────────────────────────────────────────────────
function saReset() {
    saCapturedUrl = null;
    saUploadedUrl = null;

    document.getElementById('sa-empty-state').style.display    = 'block';
    document.getElementById('sa-analysing-state').style.display = 'none';
    document.getElementById('sa-results-state').style.display   = 'none';

    document.getElementById('sa-routine-empty').style.display   = 'block';
    document.getElementById('sa-routine-content').style.display = 'none';

    // Reset upload view
    document.getElementById('sa-upload-preview').style.display = 'none';
    const drop = document.querySelector('.sa-upload-drop');
    if (drop) drop.style.display = 'flex';
    document.getElementById('sa-file-input').value = '';

    // Reset camera view
    if (saCurrentMode === 'camera') {
        resetCameraView();
    }
}

// ──────────────────────────────────────────────────────────────
// HOOK INTO SITE ROUTING
// ──────────────────────────────────────────────────────────────
// Extend the existing handleRoute to include skin-analysis and routine
const _origHandleRoute = window.handleRoute;
window.handleRoute = function(path, push) {
    _origHandleRoute && _origHandleRoute(path, push);

    if (path === '/skin-analysis') {
        // Auto-start camera when page loads
        setTimeout(() => {
            if (!saStream) saStartCamera();
        }, 300);
    } else {
        // Stop camera when leaving page
        saStopCamera();
    }

    // Handle /routine page
    if (path === '/routine') {
        const s = document.getElementById('routine');
        if (s) { s.classList.add('active'); }
    }
};

// Also patch init in case handleRoute already ran
document.addEventListener('DOMContentLoaded', () => {
    // Add /routine and /skin-analysis to the router map if needed
    const origHandleRoute = window.handleRoute;

    // Patch navigatePath to support skin-analysis
    const origNavigatePath = window.navigatePath;
    window.navigatePath = function(path) {
        if (path === '/skin-analysis' || path === '/routine') {
            history.pushState(null, '', path);
            document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === path);
            });
            const id = path === '/skin-analysis' ? 'skin-analysis' : 'routine';
            const section = document.getElementById(id);
            if (section) { section.classList.add('active'); window.scrollTo(0, 0); }
            if (path === '/skin-analysis' && !saStream) setTimeout(saStartCamera, 200);
            else saStopCamera();
        } else {
            saStopCamera();
            origNavigatePath(path);
        }
    };
});
