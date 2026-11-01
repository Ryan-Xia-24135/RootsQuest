#!/usr/bin/env python3
"""Turns heading photos into monochrome, ordered-dithered versions in a page colour
(same look as home-01..05). Writes assets/dz-<photo>-<ramp>.png.   Run: python3 tools/make-headings.py"""
import os, numpy as np
from PIL import Image, ImageOps, ImageFilter

A = os.path.join(os.path.dirname(__file__), '..', 'assets')
W, H, DOT = 1512, 982, 2           # output size; each dither dot is DOT px

RAMPS = {   # dark -> light, five tones per colour
  'lake': ['#050d16', '#0e2a44', '#1f5a87', '#6aa3c9', '#d6ebf7'],
  'green': ['#04100a', '#0e3023', '#1f6b4c', '#7fbf9c', '#dff3e6'],
  'bark': ['#0f0803', '#35200f', '#7a4a26', '#c28a58', '#f1dcc3'],
}
JOBS = [  # (source photo, ramp)
  ('about-project-photo.jpg', 'lake'), ('about-project-photo.jpg', 'bark'),
  ('student-writing.jpg', 'bark'), ('student-writing.jpg', 'green'),
  ('card-singapore-image.jpg', 'lake'), ('card-microsoft-image.jpg', 'lake'),
  ('course-systems-map.jpg', 'lake'), ('course-lofi-prototype.jpg', 'green'),
  ('about-forest-photo.jpg', 'green'), ('about-forest-photo.jpg', 'bark'),
  ('pinecones.jpg', 'green'), ('pinecones.jpg', 'bark'), ('spider-web.jpg', 'bark'),
]

def bayer(n):
    if n == 1: return np.array([[0]])
    b = bayer(n // 2)
    return np.block([[4*b, 4*b+2], [4*b+3, 4*b+1]])

def hexrgb(h): return tuple(int(h[i:i+2], 16) for i in (1, 3, 5))

def make(src, ramp):
    im = Image.open(os.path.join(A, src)).convert('L')
    im = ImageOps.fit(im, (W // DOT, H // DOT), Image.LANCZOS, centering=(0.5, 0.5))
    im = ImageOps.autocontrast(im, cutoff=1.5).filter(ImageFilter.GaussianBlur(0.4))
    v = (np.array(im).astype(float) / 255) ** 1.15          # slightly darker mid-tones
    pal = np.array([hexrgb(c) for c in RAMPS[ramp]], dtype=np.uint8)
    L = len(pal)
    h, w = v.shape
    thr = np.tile((bayer(8) + 0.5) / 64, (h // 8 + 1, w // 8 + 1))[:h, :w]
    t = v * (L - 1)
    lo = np.floor(t).astype(int); frac = t - lo
    idx = np.clip(lo + (frac > thr), 0, L - 1)
    out = Image.fromarray(pal[idx], 'RGB').resize((w * DOT, h * DOT), Image.NEAREST)
    name = 'dz-%s-%s.png' % (os.path.splitext(src)[0], ramp)
    out.convert('P', palette=Image.ADAPTIVE, colors=16).save(os.path.join(A, name), optimize=True)
    return name

if __name__ == '__main__':
    for s, r in JOBS: print(make(s, r))
