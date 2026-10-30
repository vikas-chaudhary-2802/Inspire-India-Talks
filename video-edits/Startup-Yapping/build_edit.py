"""Reproducible local edit of IMG_2085.mov for Startup Yapping.

Uses the supplied recording, original synthesized music, Pillow graphics, and
FFmpeg. English captions are concise translations of the Hinglish speech.
"""
from pathlib import Path
import json
import math
import os
import re
import subprocess
import wave

import numpy as np
from PIL import ImageFont

ROOT = Path(__file__).resolve().parent
WORK = ROOT / "working"
SOURCE = Path("/Users/vikaschaudhary/Downloads/IMG_2085.mov")
FFMPEG = os.environ.get("FFMPEG_BINARY", "/private/tmp/startup-yappy-tools/lib/python3.13/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1")
FPS, SR = 30, 48000
OUTRO = 2.2
ENV = dict(os.environ)
ENV["FONTCONFIG_FILE"] = str(WORK / "fonts.conf")

# Padded sentence boundaries. Preserve the full investor sentence because the
# English automatic transcript is a paraphrase, not literal Hindi word timing.
BLOCKS = [
    (17.80, 35.98), (36.20, 42.40), (42.80, 53.55),
    (55.25, 67.33), (67.80, 72.20), (73.05, 87.00), (89.10, 91.68),
]
# Remove a repeated funding expectation and shorten only measured quiet pauses.
REMOVALS = [
    (20.32, 21.57),
    (21.962, 22.496),
    (28.926, 29.530),
    (32.371, 32.904),
    (48.716, 49.333),
]

def run(args):
    print("Running:", args[0], " ".join(args[1:5]), flush=True)
    subprocess.run(args, cwd=ROOT, env=ENV, check=True)

def make_ranges():
    ranges = []
    for begin, end in BLOCKS:
        pieces = [(begin, end)]
        for a, b in REMOVALS:
            new = []
            for s, e in pieces:
                if b <= s or a >= e:
                    new.append((s, e))
                else:
                    if s < a:
                        new.append((s, min(e, a)))
                    if e > b:
                        new.append((max(s, b), e))
            pieces = new
        ranges.extend(pieces)
    return [(round(s * FPS), round(e * FPS)) for s, e in ranges if e > s]

RANGES = make_ranges()
MAIN_FRAMES = sum(e-s for s, e in RANGES)
MAIN = MAIN_FRAMES / FPS
TOTAL = MAIN + OUTRO

def map_time(source_time):
    frames = 0
    for start, end in RANGES:
        s, e = start/FPS, end/FPS
        if source_time < s:
            return frames/FPS
        if source_time <= e:
            return frames/FPS + source_time-s
        frames += end-start
    return MAIN

def ass_time(t):
    cs = max(0, round(t*100))
    return f"{cs//360000}:{cs//6000%60:02}:{cs//100%60:02}.{cs%100:02}"

def srt_time(t):
    ms = max(0, round(t*1000))
    return f"{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}"

CAPTIONS = [
    (17.94, 20.25, "I thought funding was easy."),
    (21.62, 24.20, "Then I got a reality check."),
    (24.92, 27.26, "Raising money is difficult."),
    (27.30, 32.25, "Investors bet on two things."),
    (32.96, 34.42, "First: the founder."),
    (34.84, 36.00, "Second: the company."),
    (36.32, 39.66, "A strong founder."),
    (40.02, 42.33, "A strong college background."),
    (42.96, 46.70, "Or a startup already in the market."),
    (47.38, 49.35, "Strong traction."),
    (50.64, 51.82, "Good revenue."),
    (52.10, 53.55, "Real customers."),
    (55.32, 59.90, "But what if you're just starting?"),
    (60.62, 62.53, "What do you do then?"),
    (62.58, 63.62, "No elite college background."),
    (64.24, 65.47, "Just getting started."),
    (65.75, 67.33, "No funding yet."),
    (67.98, 70.46, "What's the next move?"),
    (70.64, 72.20, "Apply to accelerators."),
    (73.22, 75.01, "There are good accelerators."),
    (75.56, 78.05, "You may already know"),
    (78.05, 81.99, "Y Combinator."),
    (82.02, 84.36, "Apply to accelerators"),
    (84.38, 87.00, "if you're at the initial stage."),
    (89.24, 91.68, "Comment your point of view."),
]
FONT = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 62)
KEYWORDS = re.compile(r"\b(funding|easy|reality check|difficult|two things|founder|company|traction|revenue|customers|accelerators|Y Combinator|point of view)\b", re.I)

def wrap(text, width=850):
    words, lines, line = text.split(), [], ""
    for word in words:
        test = (line + " " + word).strip()
        if FONT.getlength(test) > width and line:
            lines.append(line)
            line = word
        else:
            line = test
    if line:
        lines.append(line)
    return r"\N".join(lines)

EVENTS = []
def event(start, end, text, style="Title", layer=4):
    if end-start < .08:
        return
    EVENTS.append(f"Dialogue: {layer},{ass_time(start)},{ass_time(end)},{style},,0,0,0,,{text}")

def source_event(a, b, text, style="Title", layer=4):
    event(map_time(a), map_time(b), text, style, layer)

def rect(start, end, x, y, w, h, color="17110C", alpha="16", layer=2):
    tags = rf"{{\an7\pos({x},{y})\bord0\shad0\1c&H{color}&\1a&H{alpha}&\fad(100,120)\p1}}"
    event(start, end, tags + f"m 0 0 l {w} 0 {w} {h} 0 {h}", "Vector", layer)

def text_at(x, y, text, size=70, color="FFFFFF", animate=True, align=5):
    motion = r"\fscx108\fscy108\t(0,160,\fscx100\fscy100)" if animate else ""
    return rf"{{\an{align}\pos({x},{y})\fs{size}\1c&H{color}&\fad(110,130){motion}}}" + text

def drawing(start, end, path, color="62FAC8", layer=2):
    event(start,end,rf"{{\an7\pos(0,0)\bord0\shad0\1c&H{color}&\fad(120,120)\p1}}"+path,"Vector",layer)

def circle_path(x,y,r):
    k=round(r*.5523)
    return f"m {x-r} {y} b {x-r} {y-k} {x-k} {y-r} {x} {y-r} b {x+k} {y-r} {x+r} {y-k} {x+r} {y} b {x+r} {y+k} {x+k} {y+r} {x} {y+r} b {x-k} {y+r} {x-r} {y+k} {x-r} {y}"

def native_cards(inv_start,inv_end,tr_start,tr_end):
    # Vector card backdrops keep the render finite and avoid buffering several
    # simultaneous looping full-resolution PNG streams.
    for a,b in [(inv_start,inv_end),(tr_start,tr_end)]:
        rect(a,b,0,130,1080,1542,"17110C","00",1)
        for x in range(90,1000,110):
            rect(a,b,x,210,1,1280,"211B14","00",2)
        for y in range(240,1500,110):
            rect(a,b,60,y,920,1,"211B14","00",2)
    for y in [640,900]:
        rect(inv_start,inv_end,90,y,880,190,"29221A","00",3)
        rect(inv_start,inv_end,115,y+45,5,100,"62FAC8","00",3)
    for x in [225,510,795]:
        drawing(tr_start,tr_end,circle_path(x,850,94),"40362A",3)
        drawing(tr_start,tr_end,circle_path(x,850,91),"1C1510",3)
    drawing(tr_start,tr_end,"m 155 902 l 211 846 247 864 294 793 287 789 244 854 208 836 148 895","62FAC8",4)
    drawing(tr_start,tr_end,"m 263 790 l 296 790 296 823 289 823 289 797 263 797","62FAC8",4)
    event(tr_start,tr_end,text_at(510,850,"₹",105,"62FAC8",False),"Title",4)
    for x,y,r in [(774,818,18),(823,829,15)]:
        drawing(tr_start,tr_end,circle_path(x,y,r),"62FAC8",4)
        drawing(tr_start,tr_end,circle_path(x,y,r-5),"1C1510",4)
    drawing(tr_start,tr_end,"m 737 895 b 737 855 809 855 809 895 l 804 895 b 804 862 742 862 742 895","62FAC8",4)
    drawing(tr_start,tr_end,"m 810 893 b 810 862 850 862 850 893 l 845 893 b 845 869 815 869 815 893","62FAC8",4)

def prepare_captions():
    EVENTS.clear()
    srt = []
    for a, b, text in CAPTIONS:
        start, end = map_time(a), map_time(b)
        if end-start < .15:
            continue
        styled = KEYWORDS.sub(lambda m: r"{\1c&H62FAC8&}" + m.group(0) + r"{\1c&HFFFFFF&}", wrap(text))
        event(start, end, r"{\an2\pos(520,1600)\fad(65,75)}" + styled, "Caption", 8)
        srt.append(f"{len(srt)+1}\n{srt_time(start)} --> {srt_time(end)}\n{text}\n")
    (ROOT/"Startup-Yapping-English-Captions.srt").write_text("\n".join(srt))

    # Expectation/reality contrast appears below the speaker's face.
    a, b = 0, map_time(20.26)
    rect(a, b, 60, 1240, 920, 180)
    event(a, b, text_at(520, 1276, "WHAT I THOUGHT", 30, "ABB7BE", False))
    event(a, b, text_at(520, 1360, "FUNDING IS EASY?", 74, "62FAC8"))
    a, b = map_time(22.60), map_time(27.26)
    rect(a, b, 60, 1240, 920, 180)
    event(a, b, text_at(520, 1334, "REALITY CHECK", 80, "5791FF"))

    # Two-card investor explainer. Stagger the labels with the original speech.
    inv_start, inv_end = map_time(29.50), map_time(36.00)
    event(inv_start, inv_end, text_at(520, 420, "INVESTORS BET ON", 60, "FFFFFF"))
    event(inv_start+.18, inv_end, text_at(520, 514, "TWO THINGS.", 86, "62FAC8"))
    source_event(32.96, 36.00, text_at(166, 735, "01", 45, "62FAC8"))
    source_event(32.96, 36.00, text_at(580, 735, "THE FOUNDER", 65))
    source_event(34.84, 36.00, text_at(166, 995, "02", 45, "62FAC8"))
    source_event(34.84, 36.00, text_at(580, 995, "THE COMPANY", 65))

    # Motion graphic illustrating three signals. No fabricated figures.
    traction_start, traction_end = map_time(47.38), map_time(53.55)
    native_cards(inv_start,inv_end,traction_start,traction_end)
    event(traction_start, traction_end, text_at(520, 474, "PROOF THAT", 74))
    event(traction_start+.1, traction_end, text_at(520, 575, "IT WORKS.", 92, "62FAC8"))
    for source_start, x, label in [(47.38,225,"TRACTION"), (50.64,510,"REVENUE"), (52.10,795,"CUSTOMERS")]:
        start = map_time(source_start)
        event(start, traction_end, text_at(x,1045,label,37,"62FAC8"))
        rect(start, traction_end, x-78, 1100, 156, 5, "62FAC8", "00", 4)

    # A question beat, practical next step, and accelerator example.
    a, b = map_time(55.32), map_time(59.90)
    rect(a,b,60,1240,920,180)
    event(a,b,text_at(520,1334,"JUST STARTING?",74,"62FAC8"))
    a, b = map_time(70.64), map_time(75.01)
    rect(a,b,60,1240,920,180)
    event(a,b,text_at(520,1276,"ONE ROUTE TO EXPLORE",30,"ABB7BE",False))
    event(a,b,text_at(520,1360,"ACCELERATORS",78,"62FAC8"))
    a, b = map_time(80.70), map_time(84.37)
    rect(a,b,60,1240,920,180)
    event(a,b,text_at(520,1276,"AN EXAMPLE",30,"ABB7BE",False))
    event(a,b,text_at(520,1360,"Y COMBINATOR",74,"5791FF"))

    # Chapter labels and a quietly animated playback line in the matte.
    for a,b,label in [(0,map_time(27.28),"01 / THE REALITY CHECK"),
                      (map_time(27.28),map_time(55.25),"02 / WHAT INVESTORS BACK"),
                      (map_time(55.25),MAIN,"03 / WHERE TO START")]:
        event(a,b,text_at(60,1711,label,28,"A09486",False,4),"Small",5)
    event(0,MAIN,r"{\an7\pos(0,0)\bord0\shad0\1c&H352A21&\p1}m 60 1741 l 980 1741 980 1747 60 1747","Vector",5)
    event(0,MAIN,rf"{{\an7\pos(0,0)\bord0\shad0\1c&H62FAC8&\clip(60,1740,60,1748)\t(0,{round(MAIN*1000)},\clip(60,1740,980,1748))\p1}}m 60 1741 l 980 1741 980 1747 60 1747","Vector",6)
    a, b = map_time(89.24), MAIN
    rect(a,b,95,1240,850,120,"62FAC8","00",3)
    event(a,b,text_at(520,1300,"WHAT'S YOUR POV?",61,"17110C"),"Title",4)

    header = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Caption,Arial,62,&H00FFFFFF,&H0062FAC8,&H00110B08,&H99000000,-1,0,0,0,100,100,0,0,1,3,2,2,80,120,320,1
Style: Title,Arial,70,&H00FFFFFF,&H0062FAC8,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,0,0,5,60,100,0,1
Style: Small,Arial,28,&H00A09486,&H0062FAC8,&H00000000,&H00000000,0,0,0,0,100,100,1.3,0,1,0,0,4,60,100,0,1
Style: Vector,Arial,20,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0,0,7,0,0,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    (WORK/"render.ass").write_text(header+"\n".join(EVENTS)+"\n")
    (WORK/"fonts.conf").write_text('''<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd">
<fontconfig><dir>/System/Library/Fonts</dir><dir>/System/Library/Fonts/Supplemental</dir><cachedir>/private/tmp/startup-yapping-font-cache</cachedir></fontconfig>''')
    timeline = {"brand":"Startup Yapping", "source":str(SOURCE), "format":"1080x1920, 30 fps, SDR Rec.709",
                "speech_language":"Hinglish", "captions":"Concise English translations",
                "main_duration":MAIN, "duration":TOTAL,
                "source_ranges":[{"in":s/FPS,"out":e/FPS} for s,e in RANGES],
                "graphics":{"investors":[inv_start,inv_end],"traction":[traction_start,traction_end]},
                "audio":"Original voice; original synthesized 110 BPM music and effects"}
    (ROOT/"edit-timeline.json").write_text(json.dumps(timeline,indent=2))

def read_wav(path):
    with wave.open(str(path)) as w:
        assert w.getframerate()==SR and w.getsampwidth()==2
        channels=w.getnchannels()
        arr=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32).reshape(-1,channels)/32768
    return np.repeat(arr,2,axis=1) if channels==1 else arr

def write_wav(path,arr):
    with wave.open(str(path),"wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(arr,-1,1)*32767).astype("<i2").tobytes())

def prepare_audio():
    clean = WORK/"speech-clean.wav"
    if not clean.exists():
        run([FFMPEG,"-hide_banner","-loglevel","error","-y","-i",str(SOURCE),"-vn",
             "-af","highpass=f=80,afftdn=nf=-25:nr=7,loudnorm=I=-16:TP=-1.5:LRA=9:measured_I=-20.80:measured_TP=-2.01:measured_LRA=6.40:measured_thresh=-31.45:offset=-0.46:linear=true",
             "-ar",str(SR),"-ac","2","-c:a","pcm_s16le","-map_metadata","-1",str(clean)])
    full = read_wav(clean)
    voice_chunks=[]
    for s,e in RANGES:
        chunk=full[round(s/FPS*SR):round(e/FPS*SR)].copy()
        fade=min(round(.008*SR),len(chunk)//2)
        chunk[:fade]*=np.linspace(0,1,fade)[:,None]
        chunk[-fade:]*=np.linspace(1,0,fade)[:,None]
        voice_chunks.append(chunk)
    voice=np.concatenate(voice_chunks,axis=0)
    samples=round(TOTAL*SR)
    mix=np.zeros((samples,2),dtype=np.float32)
    mix[:len(voice)]+=voice
    bed=read_wav(WORK/"audio/music-bed.wav")[:samples]
    envelope=np.ones(len(bed),dtype=np.float32)*10**(-23/20)
    fade=min(SR,len(bed)); envelope[:fade]*=np.linspace(0,1,fade)
    start=round(MAIN*SR)
    envelope[start:]*=np.linspace(1.2,1.8,len(envelope)-start)
    tail=min(round(.7*SR),len(bed)); envelope[-tail:]*=np.linspace(1,0,tail)
    mix[:len(bed)]+=bed*envelope[:,None]
    for source_time,name,gain in [(22.60,"whoosh",-25),(29.50,"whoosh",-28),
                                  (32.96,"pop",-25),(34.84,"pop",-25),
                                  (47.38,"whoosh",-28),(50.64,"pop",-28),
                                  (52.10,"pop",-28),(70.64,"whoosh",-28),
                                  (80.70,"pop",-28)]:
        effect=read_wav(WORK/f"audio/{name}.wav")
        i=round(map_time(source_time)*SR)
        count=min(len(effect),samples-i)
        mix[i:i+count]+=effect[:count]*10**(gain/20)
    # Smooth limiter protects occasional voice peaks without raising the music.
    peak=float(np.max(np.abs(mix)))
    ceiling=10**(-1.0/20)
    if peak>ceiling:
        mix*=ceiling/peak
    write_wav(WORK/"final-mix.wav",mix)
    print(f"Audio mix: {TOTAL:.2f}s, peak {20*math.log10(max(np.max(np.abs(mix)),1e-9)):.2f} dBFS",flush=True)

def prepare_video():
    master=WORK/"portrait-master.mov"
    if not master.exists():
        vf="fps=30,crop=1512:2160:820:0,zscale=w=1080:h=1542:t=linear:npl=1000,format=gbrpf32le,zscale=p=bt709,tonemap=mobius:desat=1,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,eq=brightness=0.012:contrast=1.025:saturation=1.02"
        run([FFMPEG,"-hide_banner","-loglevel","warning","-y","-hwaccel","videotoolbox","-i",str(SOURCE),
             "-map","0:v:0","-map","0:a:0","-vf",vf,"-c:v","h264_videotoolbox","-profile:v","high",
             "-b:v","12M","-c:a","pcm_s16le","-ar","48000","-ac","2","-map_metadata","-1",
             "-color_primaries","bt709","-color_trc","bt709","-colorspace","bt709",str(master)])
    dialogue=WORK/"dialogue-edit.mov"
    if not dialogue.exists():
        selection="+".join(f"gte(n,{s})*lt(n,{e})" for s,e in RANGES)
        run([FFMPEG,"-hide_banner","-loglevel","warning","-y","-hwaccel","videotoolbox","-i",str(master),
             "-an","-vf",f"select='{selection}',setpts=N/30/TB",
             "-c:v","h264_videotoolbox","-b:v","12M","-profile:v","high","-map_metadata","-1",str(dialogue)])

def render():
    timeline=json.loads((ROOT/"edit-timeline.json").read_text())
    inv_start,inv_end=timeline["graphics"]["investors"]
    tr_start,tr_end=timeline["graphics"]["traction"]
    zoom=f"1.0+0.025*abs(sin(on/150))+0.022*between(on,{round(map_time(22.6)*FPS)},{round(map_time(27.26)*FPS)})"
    main_frames=MAIN_FRAMES-1
    end_frames=round(TOTAL*FPS)-main_frames
    main_seconds=main_frames/FPS
    end_seconds=end_frames/FPS
    graph=[
        f"[0:v]zoompan=z='{zoom}':x='iw/2-iw/zoom/2':y='(ih-ih/zoom)*0.3':d=1:s=1080x1542:fps=30,pad=1080:1920:0:130:color=0x0C1117[v0]",
        "[v0][1:v]overlay=0:0:shortest=1[v1]",
        "[v1]ass=working/render.ass,format=yuv420p[vout]",
    ]
    (WORK/"render-filter.txt").write_text(";\n".join(graph))
    main_render=WORK/"main-render.mp4"
    args=[FFMPEG,"-hide_banner","-loglevel","warning","-y","-hwaccel","videotoolbox","-i",str(WORK/"dialogue-edit.mov"),
          "-loop","1","-framerate","30","-t",f"{main_seconds:.6f}","-i",str(WORK/"graphics/frame-overlay.png"),
          "-filter_complex_threads","1","-filter_complex_script",str(WORK/"render-filter.txt"),
           "-map","[vout]","-an","-frames:v",str(main_frames),"-r","30",
           "-c:v","h264_videotoolbox","-profile:v","high","-b:v","8M",
           "-pix_fmt","yuv420p","-bsf:v","h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1",
           "-map_metadata","-1","-movflags","+faststart","-color_primaries","bt709",
           "-color_trc","bt709","-colorspace","bt709","-progress",str(WORK/"render-progress.txt"),str(main_render)]
    run(args)
    end_render=WORK/"end-render.mp4"
    run([FFMPEG,"-hide_banner","-loglevel","warning","-y","-loop","1","-framerate","30",
         "-i",str(WORK/"graphics/end-card.png"),
         "-vf",f"format=yuv420p,fade=t=in:st=0:d=0.12,fade=t=out:st={end_seconds-.18:.6f}:d=0.18",
         "-frames:v",str(end_frames),"-an","-c:v","h264_videotoolbox","-profile:v","high","-b:v","8M",
         "-bsf:v","h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1",
         "-map_metadata","-1",str(end_render)])
    (WORK/"concat-video.txt").write_text("file 'main-render.mp4'\nfile 'end-render.mp4'\n")
    run([FFMPEG,"-hide_banner","-loglevel","warning","-y","-f","concat","-safe","0","-i",str(WORK/"concat-video.txt"),
         "-i",str(WORK/"final-mix.wav"),"-map","0:v:0","-map","1:a:0","-c:v","copy",
         "-bsf:v","h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1",
         "-c:a","aac","-b:a","192k","-ar","48000","-t",f"{TOTAL:.6f}",
         "-map_metadata","-1","-movflags","+faststart",str(ROOT/"Startup-Yapping-Edited-Reel.mp4")])

if __name__=="__main__":
    import sys
    prepare_captions()
    print(f"Timeline: {MAIN:.3f}s dialogue + {OUTRO:.1f}s end card = {TOTAL:.3f}s",flush=True)
    if "--assets-only" not in sys.argv:
        prepare_audio()
        prepare_video()
        if "--prepare-only" not in sys.argv:
            render()
