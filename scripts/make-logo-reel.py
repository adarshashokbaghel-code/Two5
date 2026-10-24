#!/usr/bin/env python3
"""Build the scroll-scrubbed Two5 logo reel from brand layers."""

from __future__ import annotations

import math
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image

# Warm paper field so the black mark reads against the reel.
FIELD = (230, 226, 216, 255)

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"
OUT_DIR = Path("/tmp/two5-logo-reel")
VIDEO = BRAND / "logo-reel.mp4"
POSTER = BRAND / "logo-reel-poster.jpg"

WIDTH, HEIGHT = 1920, 1080
FPS = 24
SECONDS = 5
FRAMES = FPS * SECONDS


def clamp(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))


def remap(value: float, start: float, end: float) -> float:
    if end <= start:
        return 1.0
    return clamp((value - start) / (end - start))


def ease_in_out(t: float) -> float:
    t = clamp(t)
    if t < 0.5:
        return 4 * t * t * t
    return 1 - ((-2 * t + 2) ** 3) / 2


def ease_out(t: float) -> float:
    t = clamp(t)
    return 1 - (1 - t) ** 3


def key_black(image: Image.Image, threshold: int = 22) -> Image.Image:
    arr = np.array(image)
    peak = arr[:, :, :3].max(axis=2).astype(np.int16)
    lifted = np.clip((peak - threshold) * 4, 0, 255).astype(np.uint8)
    arr[:, :, 3] = (arr[:, :, 3].astype(np.uint16) * lifted // 255).astype(np.uint8)
    return Image.fromarray(arr)


def load_fit(path: Path, punch_black: bool = False) -> Image.Image:
    image = Image.open(path).convert("RGBA")
    if punch_black:
        image = key_black(image)
    fitted = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    scale = min(WIDTH / image.width, HEIGHT / image.height)
    size = (max(1, int(image.width * scale)), max(1, int(image.height * scale)))
    resized = image.resize(size, Image.Resampling.LANCZOS)
    fitted.paste(resized, ((WIDTH - size[0]) // 2, (HEIGHT - size[1]) // 2), resized)
    return fitted


def apply_opacity(image: Image.Image, opacity: float) -> Image.Image:
    if opacity >= 0.999:
        return image
    out = image.copy()
    alpha = out.getchannel("A").point(lambda px: int(px * clamp(opacity)))
    out.putalpha(alpha)
    return out


def transform(image: Image.Image, x: float, y: float, rot: float, scale: float) -> Image.Image:
    work = image
    if abs(scale - 1.0) > 0.001:
        size = (
            max(1, int(image.width * scale)),
            max(1, int(image.height * scale)),
        )
        work = image.resize(size, Image.Resampling.LANCZOS)
    if abs(rot) > 0.05:
        work = work.rotate(rot, resample=Image.Resampling.BICUBIC, expand=True)
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    px = (WIDTH - work.width) // 2 + int(x)
    py = (HEIGHT - work.height) // 2 + int(y)
    canvas.paste(work, (px, py), work)
    return canvas


def explode_amount(t: float) -> float:
    if t < 0.16:
        return 0.0
    if t < 0.48:
        return ease_in_out(remap(t, 0.16, 0.48))
    return 1.0 - ease_in_out(remap(t, 0.48, 0.84))


def compose(t: float, assets: dict[str, Image.Image]) -> Image.Image:
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), FIELD)
    explode = explode_amount(t)

    pieces = (
        ("gray", -40, -160, -5.0, 1.06),
        ("yellow", -300, 80, -7.0, 1.08),
        ("red", 320, -40, 6.0, 1.08),
        ("blue", 70, -220, 8.0, 1.10),
    )
    if explode > 0.001:
        for name, ox, oy, rot, start_scale in pieces:
            canvas.alpha_composite(
                transform(
                    assets[name],
                    ox * explode,
                    oy * explode,
                    rot * explode,
                    1.0 + (start_scale - 1.0) * explode,
                )
            )

    assembled_opacity = 1.0 - explode
    if assembled_opacity > 0.01:
        if t < 0.2:
            scale = 1.03 - 0.03 * ease_out(remap(t, 0.0, 0.2))
        elif t > 0.8:
            scale = 1.04 - 0.04 * ease_out(remap(t, 0.8, 1.0))
        else:
            scale = 1.0
        canvas.alpha_composite(
            apply_opacity(transform(assets["assembled"], 0, 0, 0, scale), assembled_opacity)
        )

    if 0.78 <= t <= 0.9:
        flash = math.sin(remap(t, 0.78, 0.9) * math.pi) * 0.1
        flare = Image.new("RGBA", (WIDTH, HEIGHT), (240, 192, 32, int(255 * flash)))
        canvas.alpha_composite(flare)

    grain = assets["grain"].copy()
    grain = apply_opacity(grain, 0.14 + 0.04 * math.sin(t * math.pi))
    canvas.alpha_composite(grain)
    return canvas.convert("RGB")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    grain = Image.open(BRAND / "grain.png").convert("RGBA").resize((WIDTH, HEIGHT))
    gray = load_fit(BRAND / "layer-gray.png")
    yellow = load_fit(BRAND / "layer-yellow.png")
    red = load_fit(BRAND / "layer-red.png")
    blue = load_fit(BRAND / "layer-blue.png")
    assembled = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    for piece in (gray, yellow, red, blue):
        assembled.alpha_composite(piece)
    assets = {
        "gray": gray,
        "yellow": yellow,
        "red": red,
        "blue": blue,
        "assembled": assembled,
        "grain": grain,
    }

    for index in range(FRAMES):
        t = index / (FRAMES - 1)
        frame = compose(t, assets)
        frame.save(OUT_DIR / f"f_{index:04d}.jpg", quality=92, optimize=True)
        if index in {0, FRAMES // 2, FRAMES - 1}:
            print(f"frame {index + 1}/{FRAMES}")

    compose(0.0, assets).save(POSTER, quality=92, optimize=True)

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-framerate",
            str(FPS),
            "-i",
            str(OUT_DIR / "f_%04d.jpg"),
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-vf",
            "scale=1280:720",
            "-g",
            "2",
            "-crf",
            "23",
            "-preset",
            "slow",
            "-movflags",
            "+faststart",
            "-an",
            str(VIDEO),
        ],
        check=True,
    )
    print(f"wrote {VIDEO} ({VIDEO.stat().st_size / 1024:.0f} KB)")
    print(f"wrote {POSTER}")


if __name__ == "__main__":
    main()
