#!/usr/bin/env python3
"""Generates the seamless dithered background textures in assets/.
Each texture is a 384x384 RGBA tile: white pixels (lighter shade) and black pixels (darker
shade) at low alpha, so it adapts to whatever page colour sits underneath.
  water.png      blue   - flowing currents and caustic ripples
  leaves.png     green  - overlapping leaves with veins
  roots.png      brown  - branching tree roots
  mountains.png  rose   - layered, faceted mountain ridges
Run:  python3 tools/make-textures.py
"""
import math, random, os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

N = 384
OUT = os.path.join(os.path.dirname(__file__), '..', 'assets')

def bayer(n):
    if n == 1: return np.array([[0]])
    b = bayer(n // 2)
    return np.block([[4*b, 4*b+2], [4*b+3, 4*b+1]])
BAY = np.tile((bayer(8) + 0.5) / 64, (N // 8, N // 8))

def M(v):
    return int(max(0, min(255, (v + 1) * 127.5)))

def unM(img):
    return np.array(img).astype(float) / 127.5 - 1

def smooth(a, b, x):
    u = np.clip((x - a) / (b - a), 0, 1)
    return u * u * (3 - 2 * u)

def dither(f, name, la=30, da=95, lo=0.08, hi=0.9):
    """f in [-1,1]: positive -> light pixels, negative -> dark pixels (ordered dither)."""
    light = smooth(lo, hi, f); dark = smooth(lo, hi, -f)
    a = np.zeros((N, N, 4), np.uint8)
    a[light > BAY] = (255, 255, 255, la)
    a[dark > BAY] = (0, 0, 0, da)
    Image.fromarray(a, 'RGBA').save(os.path.join(OUT, name), optimize=True)

def wrap_draw(draw_fn, scale=2):
    """Draw onto a periodic canvas: draw_fn(draw, ox, oy) is called for 9 shifted copies."""
    S = N * scale
    img = Image.new('L', (S, S), 128)
    return img, S

# ------------------------------------------------------------------ water
def water():
    t = np.linspace(0, 2*np.pi, N, endpoint=False)
    X, Y = np.meshgrid(t, t)
    # long horizontal currents with a rolling wave
    cur = np.sin(2*Y + 1.5*np.sin(X + 0.4) + 0.9*np.sin(2*X - Y + 1.0))
    cur2 = np.sin(5*Y + 2.0*np.sin(2*X + 1.7) + 1.1*np.sin(3*X + Y))
    # caustic web: thin bright lines where warped sines cross zero
    U = 4*X + 1.3*np.sin(2*Y + 0.3) + 0.8*np.sin(X + Y)
    V = 4*Y + 1.3*np.sin(2*X + 1.1) + 0.8*np.cos(X - Y)
    web = np.exp(-6.0*np.abs(np.sin(U)*np.sin(V))**0.7) - 0.18
    f = 0.55*cur + 0.25*cur2 + 0.95*web
    f = f / np.abs(f).max()
    dither(f, 'water.png', la=34, da=95, lo=0.06, hi=0.85)

# ------------------------------------------------------------------ leaves
def leaves():
    random.seed(7)
    scale = 2; S = N*scale
    h = Image.new('L', (S, S), 128)
    def leaf_poly(cx, cy, L, W, ang, bend):
        pts_l, pts_r, mid = [], [], []
        for i in range(0, 41):
            t = i/40
            x = (t - 0.5) * L
            w = W * (math.sin(math.pi*t)**0.85) * (1 - 0.25*t)
            yb = bend * math.sin(math.pi*t) * L
            pts_l.append((x, yb - w)); pts_r.append((x, yb + w)); mid.append((x, yb))
        ca, sa = math.cos(ang), math.sin(ang)
        rot = lambda p: (cx + p[0]*ca - p[1]*sa, cy + p[0]*sa + p[1]*ca)
        return [rot(p) for p in pts_l], [rot(p) for p in pts_r], [rot(p) for p in mid]
    leaves_ = []
    G = 6
    for gx in range(G):
        for gy in range(G):
            cx = (gx + 0.5) * S / G + random.uniform(-45, 45)
            cy = (gy + 0.5) * S / G + random.uniform(-45, 45)
            leaves_.append((cx, cy, random.uniform(150, 235), random.uniform(38, 58),
                            random.uniform(0, 2*math.pi), random.uniform(-0.08, 0.08)))
    random.shuffle(leaves_)
    def paint(img, fn):
        d = ImageDraw.Draw(img)
        for (cx, cy, L, W, ang, bend) in leaves_:
            for ox in (-S, 0, S):
                for oy in (-S, 0, S):
                    fn(d, cx+ox, cy+oy, L, W, ang, bend)
    # painter's order: shadow, body halves, veins
    def shadow(d, cx, cy, L, W, ang, bend):
        l, r, m = leaf_poly(cx+8, cy+10, L*1.02, W*1.06, ang, bend)
        d.polygon(l + r[::-1], fill=M(-0.8))
    def body(d, cx, cy, L, W, ang, bend):
        l, r, m = leaf_poly(cx, cy, L, W, ang, bend)
        d.polygon(l + m[::-1], fill=M(0.55))      # lit half
        d.polygon(m + r[::-1], fill=M(0.12))      # shaded half
        d.polygon(l + r[::-1], outline=M(-0.6))
    def veins(d, cx, cy, L, W, ang, bend):
        l, r, m = leaf_poly(cx, cy, L, W, ang, bend)
        d.line(m, fill=M(-0.85), width=3)
        for i in range(5, 38, 4):
            for side in (l, r):
                p0 = m[i]; p1 = side[min(i+5, 40)]
                d.line([p0, p1], fill=M(-0.55), width=2)
    # draw leaf by leaf (each fully, so later leaves overlap earlier ones)
    d = ImageDraw.Draw(h)
    for (cx, cy, L, W, ang, bend) in leaves_:
        for ox in (-S, 0, S):
            for oy in (-S, 0, S):
                shadow(d, cx+ox, cy+oy, L, W, ang, bend)
                body(d, cx+ox, cy+oy, L, W, ang, bend)
                veins(d, cx+ox, cy+oy, L, W, ang, bend)
    h = h.resize((N, N), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.8))
    f = unM(h)
    dither(f, 'leaves.png', la=32, da=100, lo=0.10, hi=0.8)

# ------------------------------------------------------------------ roots
def roots():
    random.seed(11)
    scale = 2; S = N*scale
    h = Image.new('L', (S, S), 128)
    strokes = []   # (polyline, width)
    def grow(x, y, ang, length, width, depth):
        pts = [(x, y)]
        step = 6
        n = int(length/step)
        for i in range(n):
            ang += random.uniform(-0.28, 0.28) + 0.04*math.sin(i*0.35 + depth)
            # roots drift downward
            ang += (math.pi/2 - ang) * 0.025
            x += math.cos(ang)*step; y += math.sin(ang)*step
            pts.append((x, y))
            w = max(1.4, width * (1 - i/n*0.75))
            if depth < 3 and random.random() < 0.075 and w > 2.2:
                grow(x, y, ang + random.choice((-1, 1))*random.uniform(0.5, 1.0),
                     length*random.uniform(0.45, 0.7), w*0.62, depth+1)
        strokes.append((pts, width))
    for gx in range(4):
        for gy in range(3):
            grow((gx + 0.5) * S / 4 + random.uniform(-70, 70), (gy + 0.5) * S / 3 + random.uniform(-70, 70),
                 math.pi/2 + random.uniform(-0.6, 0.6), random.uniform(300, 480), random.uniform(9, 13), 0)
    d = ImageDraw.Draw(h)
    def tapered(pts, width, off, val, extra=0):
        n = len(pts)
        for i in range(n-1):
            w = max(1, int((width*(1 - i/n*0.75)) + extra))
            a = (pts[i][0]+off[0], pts[i][1]+off[1]); b = (pts[i+1][0]+off[0], pts[i+1][1]+off[1])
            d.line([a, b], fill=M(val), width=w)
            d.ellipse([b[0]-w/2, b[1]-w/2, b[0]+w/2, b[1]+w/2], fill=M(val))
    for ox in (-S, 0, S):
        for oy in (-S, 0, S):
            for pts, w in strokes: tapered(pts, w, (ox+7, oy+9), -0.85, 5)   # shadow
    for ox in (-S, 0, S):
        for oy in (-S, 0, S):
            for pts, w in strokes: tapered(pts, w, (ox, oy), 0.42, 2)          # body
    for ox in (-S, 0, S):
        for oy in (-S, 0, S):
            for pts, w in strokes: tapered(pts, w*0.45, (ox-2, oy-2), 0.95, 0)   # lit ridge
    h = h.resize((N, N), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.7))
    dither(unM(h), 'roots.png', la=34, da=100, lo=0.10, hi=0.8)

# ------------------------------------------------------------------ mountains
def mountains():
    random.seed(3)
    x = np.arange(N)
    f = np.zeros((N, N))
    layers = 6
    band = N / layers
    rng = np.random.RandomState(5)
    for i in range(layers):
        base = band*(i + 0.95)
        amp = band*(1.5 + 0.12*i)
        ph = rng.uniform(0, 2*np.pi, 4)
        parts = []
        for j, (fr, wgt) in enumerate(((2, 1.0), (5, 0.55), (11, 0.28), (23, 0.12))):
            parts.append(wgt * (1 - np.abs(np.sin(fr*np.pi*x/N + ph[j]))))
        ridge = sum(parts); ridge = ridge/ridge.max()
        top = base - amp*ridge
        low = sum(parts[:3]); low = low/low.max()
        k = 17
        pad = np.concatenate([low[-k:], low, low[:k]])
        sm = np.convolve(pad, np.ones(k)/k, mode='same')[k:-k]
        slope = np.gradient(sm)
        depth = 0.10 + 0.06*i
        for xi in x:
            y0 = int(max(0, top[xi])); y1 = int(min(N, base + band*0.6))
            if y0 >= N: continue
            ys = np.arange(y0, y1)
            t = (ys - top[xi]) / max(1.0, (y1 - top[xi]))
            xs = (xi + 0.85*(ys - top[xi])).astype(int) % N      # shear -> diagonal ridge lines
            lit = slope[xs] < 0
            col = np.where(lit, 0.52, -0.38) - depth
            f[ys % N, xi] = col*(1 - 0.35*np.clip(t, 0, 1))
        for xi in x:
            yy = int(top[xi]) % N
            f[yy, xi] = 0.95
            f[(yy+1) % N, xi] = 0.65
    img = Image.fromarray(np.clip((f + 1) * 127.5, 0, 255).astype(np.uint8), 'L').filter(ImageFilter.GaussianBlur(0.9))
    dither(unM(img), 'mountains.png', la=36, da=95, lo=0.08, hi=0.85)

if __name__ == '__main__':
    water(); leaves(); roots(); mountains()
    print('done')
