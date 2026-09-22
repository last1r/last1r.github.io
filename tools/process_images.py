"""
Обработка исходных фотографий для сайта-портфолио.

Запуск:  .venv/Scripts/python.exe tools/process_images.py
Вход:    C:\\Users\\1\\Desktop\\фото\\...
Выход:   assets/images/<назначение>/*.webp  (+ favicon/og в assets/images/branding/)

Скрипт идемпотентен: пересоздаёт все производные файлы из оригиналов.
"""

import os
from PIL import Image, ImageOps

SRC = r"C:\Users\1\Desktop\фото"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "images")

ACCENT = (53, 224, 255)
BG = (7, 10, 18)


def load(*parts):
    im = Image.open(os.path.join(SRC, *parts))
    return ImageOps.exif_transpose(im).convert("RGB")


def crop_to(im, ratio, anchor_y=0.5):
    """ratio = w/h. anchor_y — какая доля высоты остаётся сверху."""
    w, h = im.size
    cur = w / h
    if cur > ratio:                       # слишком широкий — режем по бокам
        nw = int(h * ratio)
        x0 = (w - nw) // 2
        box = (x0, 0, x0 + nw, h)
    else:                                 # слишком высокий — режем сверху/снизу
        nh = int(w / ratio)
        y0 = int((h - nh) * anchor_y)
        box = (0, y0, w, y0 + nh)
    return im.crop(box)


def save(im, sub, name, width, q=82):
    im = im.copy()
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    d = os.path.join(OUT, sub)
    os.makedirs(d, exist_ok=True)
    p = os.path.join(d, name)
    im.save(p, "WEBP", quality=q, method=6, optimize=True)
    print(f"{name:34} {im.size[0]}x{im.size[1]:5}  {os.path.getsize(p)//1024:4} KB")
    return p


# ---------- 1. Портрет ----------
# Кадр героя в Hero-рамке ~480x530 (4 / 4.4), лицо в верхней половине —
# поэтому кроп с якорем чуть выше центра и 2x разрешение.
p = load("мое фото", "Gemini_Generated_Image_ubykvhubykvhubyk (1).jpeg")
save(crop_to(p, 4 / 4.4, anchor_y=0.30), "portrait", "portrait-main.webp", 960, q=80)

# ---------- 2. Университет ----------
# Ночной фасад: широкая полоса с подсвеченной вывеской (верх 2/3 кадра).
n = load("университет", "orig.jpg")
w, h = n.size
n = n.crop((0, int(h * 0.055), w, int(h * 0.80)))
save(n, "university", "university-night.webp", 1600, q=78)

# Дневной кадр с горами: небольшой «вставоч»-снимок рядом с карточкой.
m = load("университет", "6ox4r1eabops4h88okopn8xszn6ecnyi.jpg")
save(m, "university", "university-mountains.webp", 760, q=74)

# ---------- 3. StudyMate ----------
# Скриншот чата: убираем статус-бар Android и нижнюю половину экрана.
# Цельный кадр «вопрос + варианты ответа» читается и с 336px в ширину,
# а весь телефон на всю высоту колонки растянул бы карточку проекта.
c = load("studymate", "photo_2026-02-07_23-17-06.jpg")
w, h = c.size
c = c.crop((0, round(h * 0.048), w, round(h * 0.648)))
save(c, "studymate", "studymate-chat.webp", 560, q=82)


# Титульный слайд презентации: нижние углы содержат ФИО, номер школы,
# город и ФИО руководителя -> обрезаем всё, что ниже верхней границы текста.
s = load("studymate", "photo_2026-09-22_15-08-57.jpg")
sw, sh = s.size
gray = s.convert("L")
left = gray.crop((0, int(sh * 0.72), int(sw * 0.30), sh))
right = gray.crop((int(sw * 0.70), int(sh * 0.72), sw, sh))
top_text = sh
for region in (left, right):
    px = region.load()
    for y in range(region.height):
        if any(px[x, y] < 120 for x in range(region.width)):
            top_text = min(top_text, int(sh * 0.72) + y)
            break
print("слайд: персональный текст начинается с y =", top_text, "из", sh)
# -26px: ровно под рядом кнопок макета телефона. Если обрезать по самому
# тексту, тёмный блок описания перерезается посередине строки.
s = s.crop((0, 0, sw, top_text - 26))
save(s, "studymate", "studymate-presentation.webp", 1240, q=80)

# ---------- 4. Спортивное приложение ----------
g = load("приложение для физкультуры", "Gemini_Generated_Image_sa16nnsa16nnsa16.jpg")
save(g, "sport", "sport-trainer.webp", 960, q=80)

# ---------- 5. Итог ----------
# Знак, favicon и OG-обложку собирает tools/make_logo.py — там же источник
# геометрии логотипа, поэтому не дублируем его здесь.
print("готово")
