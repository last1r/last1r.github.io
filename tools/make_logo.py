"""
Персональный знак last1r + favicon + Open Graph-обложка.

Концепция знака: цифра «1» из ника last1r — вертикальный стержень с флагом
(как в моноширинном шрифте), от которого на уровне середины уходит короткая
параллельная диагональ — нога буквы «r». Тот же наклон, что и у флага, поэтому
знак читается и как «1r», и как ветка (branch) в схеме репозитория, и как
курсор в терминале. Никаких фигурных скобок и прочего клише.

Запуск:  .venv/Scripts/python.exe tools/make_logo.py
"""

import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "images", "branding")
ASSETS = os.path.join(ROOT, "assets")
os.makedirs(OUT, exist_ok=True)

ACCENT = (53, 224, 255)
ACCENT_2 = (79, 125, 255)
BG = (7, 10, 18)
INK = (234, 240, 251)
MUTE = (122, 136, 158)

# --- геометрия знака на сетке 32x32 ------------------------------------------
# стержень «1» с флагом
STEM = [(9.0, 11.6), (14.6, 7.0), (14.6, 26.0)]
# «r»: диагональ, параллельная флагу
BRANCH = [(14.6, 17.0), (21.4, 11.4)]
WEIGHT = 3.0  # доля от 32


def draw_mark(d, s, ox, oy, color, weight=WEIGHT):
    """Рисуем знак в масштабе s со смещением (ox, oy)."""
    w = max(1, round(weight * s))
    d.line([(ox + x * s, oy + y * s) for x, y in STEM], fill=color, width=w, joint="curve")
    d.line([(ox + x * s, oy + y * s) for x, y in BRANCH], fill=color, width=w)
    # скруглённые концы
    r = w / 2
    for cap in (STEM[0], STEM[-1], BRANCH[0], BRANCH[-1]):
        cx, cy = ox + cap[0] * s, oy + cap[1] * s
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)


SVG_MARK = (
    '<path d="M9 11.6 14.6 7 14.6 26" stroke="currentColor" stroke-width="3" '
    'stroke-linecap="round" stroke-linejoin="round" fill="none"/>\n'
    '  <path d="M14.6 17 21.4 11.4" stroke="currentColor" stroke-width="3" '
    'stroke-linecap="round" fill="none"/>'
)

# --- 1. standalone SVG (знак в плитке) ---------------------------------------
with open(os.path.join(OUT, "logo.svg"), "w", encoding="utf-8") as f:
    f.write(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" '
        'role="img" aria-label="last1r">\n'
        '  <defs>\n'
        '    <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">\n'
        '      <stop offset="0" stop-color="#0d1320"/>\n'
        '      <stop offset="1" stop-color="#070a12"/>\n'
        '    </linearGradient>\n'
        '  </defs>\n'
        '  <rect width="32" height="32" rx="8" fill="url(#tile)"/>\n'
        '  <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="none" '
        'stroke="#35e0ff" stroke-opacity="0.3"/>\n'
        '  <g color="#35e0ff">\n  ' + SVG_MARK.replace("\n", "\n  ") + "\n  </g>\n"
        "</svg>\n"
    )

# --- 2. SVG только знак (для подстановки в HTML/тёмный и светлый фон) --------
for name, col in (("logo-mark.svg", "#35e0ff"), ("logo-mark-dark.svg", "#070a12")):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        f.write(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" '
            'role="img" aria-label="last1r">\n  '
            + SVG_MARK.replace("currentColor", col) + "\n</svg>\n"
        )

# --- 3. favicon / apple-touch -------------------------------------------------
def tile_icon(size, path, radius=8):
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    s = size / 32
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius * s, fill=BG + (255,))
    d.rounded_rectangle(
        [0.5, 0.5, size - 1.5, size - 1.5], radius=radius * s,
        outline=ACCENT + (77,), width=max(1, round(s)),
    )
    draw_mark(d, s, 0, 0, ACCENT + (255,))
    im.save(path, "PNG", optimize=True)
    print(f"{os.path.basename(path):22} {size}x{size} {os.path.getsize(path)//1024 or '<1'} KB")


tile_icon(64, os.path.join(OUT, "favicon-64.png"))
tile_icon(180, os.path.join(OUT, "apple-touch-icon.png"), radius=36)

# --- 4. лист предпросмотра знака в 3 размерах --------------------------------
prev = Image.new("RGB", (560, 200), BG)
pd = ImageDraw.Draw(prev)
for i, size in enumerate((160, 64, 24)):
    x = 20 + [0, 200, 290][i]
    y = [20, 20, 60][i]
    s = size / 32
    pd.rounded_rectangle([x, y, x + size, y + size], radius=8 * s, fill=BG, outline=(40, 50, 66))
    draw_mark(pd, s, x, y, ACCENT)
prev.save(os.path.join(OUT, "_preview.png"), "PNG")

# --- 5. Open Graph-обложка 1200x630 ------------------------------------------
FONTS = r"C:\Windows\Fonts"


def font(name, size):
    for cand in name:
        p = os.path.join(FONTS, cand)
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


f_word = font(["consolab.ttf", "consola.ttf", "cour.ttf"], 92)
f_name = font(["segoeuib.ttf", "arialbd.ttf", "arial.ttf"], 44)
f_tag = font(["consola.ttf", "cour.ttf"], 23)
f_small = font(["consola.ttf", "cour.ttf"], 18)

W, H = 1200, 630
og = Image.new("RGB", (W, H), BG)
od = ImageDraw.Draw(og, "RGBA")

# сетка + свечение — те же мотивы, что на сайте
for gx in range(0, W + 1, 40):
    od.line([(gx, 0), (gx, H)], fill=(53, 224, 255, 9))
for gy in range(0, H + 1, 40):
    od.line([(0, gy), (W, gy)], fill=(53, 224, 255, 9))
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse([860 - 520, 90 - 520, 860 + 520, 90 + 520], fill=(79, 125, 255, 70))
gd.ellipse([120 - 420, 600 - 420, 120 + 420, 600 + 420], fill=(53, 224, 255, 44))
# мягкое свечение: без размытия круги читаются как наложенные плашки
glow = glow.filter(ImageFilter.GaussianBlur(150))
og = Image.blend(og, Image.alpha_composite(og.convert("RGBA"), glow).convert("RGB"), 0.95)
od = ImageDraw.Draw(og, "RGBA")

od.rectangle([0, 0, 8, H], fill=ACCENT)

# --- портрет справа: скошенный блок в стиле Hero-рамки ---
px0, py0, pw = 782, 96, 336
try:
    port = Image.open(os.path.join(ROOT, "assets", "images", "portrait", "portrait-main.webp")).convert("RGB")
    ph = round(pw * port.height / port.width)
    port = port.resize((pw, ph), Image.LANCZOS)
    mask = Image.new("L", (pw, ph), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, pw - 1, ph - 1], radius=44, fill=255)
    og.paste(port, (px0, py0), mask)
    od = ImageDraw.Draw(og, "RGBA")
    od.rounded_rectangle([px0, py0, px0 + pw, py0 + ph], radius=44, outline=(53, 224, 255, 80), width=2)
    od.text((px0, py0 + ph + 16), "PORTRAIT / SUBJECT", font=f_small, fill=(122, 136, 158, 255))
except Exception as exc:  # портрет опционален
    print("og: портрет не добавлен:", exc)

# --- знак в плитке + ник ---
ts = 104
od.rounded_rectangle([70, 66, 70 + ts, 66 + ts], radius=24, fill=(13, 19, 32, 255),
                     outline=(53, 224, 255, 90), width=2)
draw_mark(od, ts / 32, 70, 66, ACCENT, weight=3.0)
od.text((70 + ts + 26, 74), "last1r", font=f_word, fill=INK)
od.text((70 + ts + 30, 74 + 100), "PORTFOLIO · 2026", font=f_small, fill=(122, 136, 158, 255))

# --- текстовый блок ---
od.text((70, 252), "Артём Бабанин", font=f_name, fill=INK)
od.text((70, 318), "Backend · AI · Telegram-боты", font=f_tag, fill=ACCENT)
od.text((70, 352), "Computer Vision · Информационные системы", font=f_tag, fill=(160, 176, 198, 255))
od.line([(70, 404), (700, 404)], fill=(30, 40, 56, 255), width=1)

rows = [
    ("STUDY", "Университет «Сириус», 1 курс"),
    ("SHIP", "StudyMate · CV-тренер · школьный бот"),
    ("STATUS", "OPEN TO TECHNOLOGY PROJECTS"),
]
y = 432
for k, v in rows:
    od.text((70, y + 2), k, font=f_small, fill=(122, 136, 158, 255))
    od.text((232, y), v, font=f_tag, fill=(203, 215, 232, 255))
    y += 44

og.save(os.path.join(ASSETS, "og-cover.png"), "PNG", optimize=True)
print(f"{'og-cover.png':22} 1200x630 {os.path.getsize(os.path.join(ASSETS, 'og-cover.png'))//1024} KB")
print("готово")
