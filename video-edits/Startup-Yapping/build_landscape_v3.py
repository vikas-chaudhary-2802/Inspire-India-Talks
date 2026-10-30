"""Landscape revision preserving every sample of the complete source speech.

Only visuals are replaced by timed cutaways; narration is continuous 0..93.82s.
Captions use original source seconds, with conditions and outcomes kept together.
"""
from pathlib import Path
import json,math,subprocess,sys
import numpy as np
from PIL import Image,ImageDraw,ImageFont
import build_edit as old

ROOT=Path(__file__).resolve().parent; WORK=ROOT/"working"; V3=WORK/"v3"
ANIM=WORK/"animation-v3-landscape"; FF=old.FFMPEG
FPS,SR,W,H=30,48000,1920,1080
VOICE=old.read_wav(WORK/"speech-clean.wav")
SOURCE_AUDIO_SECONDS=len(VOICE)/SR
MAIN_FRAMES=math.ceil(SOURCE_AUDIO_SECONDS*FPS)
MAIN=MAIN_FRAMES/FPS; END_FRAMES=66
TOTAL=(MAIN_FRAMES+END_FRAMES)/FPS
BSF="h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1"
FONT="/System/Library/Fonts/Supplemental/Arial Bold.ttf"
CUTS=[
    {"name":"investors","start":885,"end":1065,"file":"investors.mp4"},
    {"name":"traction","start":1422,"end":1590,"file":"traction.mp4"},
    {"name":"accelerator","start":2119,"end":2227,"file":"accelerator.mp4"},
]

def run(args):
    print("Running",Path(args[-1]).name,flush=True)
    subprocess.run(args,cwd=ROOT,env=old.ENV,check=True)

def encoded(frames,rate="8M"):
    return ["-an","-frames:v",str(frames),"-r","30","-c:v","h264_videotoolbox","-profile:v","high",
            "-b:v",rate,"-pix_fmt","yuv420p","-bsf:v",BSF,"-map_metadata","-1","-movflags","+faststart"]

def ass_header():
    return """[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 2
ScaledBorderAndShadow: yes
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Caption,Arial,48,&H00FFFFFF,&H0062FAC8,&H00110B08,&H99000000,-1,0,0,0,100,100,0,0,1,3,2,2,160,160,65,1
Style: Title,Arial,50,&H00FFFFFF,&H0062FAC8,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,0,0,5,0,0,0,1
Style: Vector,Arial,20,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0,0,7,0,0,0,1
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

def art():
    V3.mkdir(parents=True,exist_ok=True)
    overlay=Image.new("RGBA",(W,H),(0,0,0,0)); draw=ImageDraw.Draw(overlay)
    for y in range(870,H):
        alpha=round(185*((y-870)/(H-870))**1.2)
        draw.line((0,y,W,y),fill=(8,12,17,alpha))
    draw.rounded_rectangle((50,26,425,99),radius=20,fill=(12,17,23,218))
    draw.text((72,48),"STARTUP",font=ImageFont.truetype(FONT,32),fill=(248,250,252))
    draw.text((238,48),"YAPPING",font=ImageFont.truetype(FONT,32),fill=(200,250,98))
    overlay.save(V3/"landscape-overlay.png")
    # A separate wide end card follows the complete spoken goodbye.
    end=Image.new("RGB",(W,H),(12,17,23)); d=ImageDraw.Draw(end)
    for r in [300,520,760]:
        d.arc((1350-r,580-r,1350+r,580+r),190,350,fill=(29,46,45),width=3)
    d.text((100,78),"STARTUP",font=ImageFont.truetype(FONT,48),fill=(248,250,252))
    d.text((348,78),"YAPPING",font=ImageFont.truetype(FONT,48),fill=(200,250,98))
    d.line((100,169,1815,169),fill=(47,59,66),width=2)
    d.text((100,327),"Your next idea",font=ImageFont.truetype(FONT,92),fill=(248,250,252))
    d.text((100,444),"starts here.",font=ImageFont.truetype(FONT,92),fill=(248,250,252))
    d.rounded_rectangle((100,650,920,755),radius=52,fill=(200,250,98))
    d.text((510,703),"FOLLOW STARTUP YAPPING",font=ImageFont.truetype(FONT,40),fill=(12,17,23),anchor="mm")
    d.text((100,980),"IDEAS / STORIES / STARTUPS",font=ImageFont.truetype(FONT,28),fill=(134,148,160))
    end.save(V3/"end-card-landscape.png")
    events=[]
    def ev(a,b,text,style="Title",layer=4):
        events.append(f"Dialogue: {layer},{old.ass_time(a)},{old.ass_time(b)},{style},,0,0,0,,{text}")
    def box(a,b):
        ev(a,b,r"{\an7\pos(1240,212)\bord0\shad0\1c&H17110C&\1a&H30&\fad(180,180)\p1}m 0 0 l 600 0 600 192 0 192","Vector",2)
    def label(a,b,y,text,size,color):
        ev(a,b,rf"{{\an5\pos(1540,{y})\fs{size}\1c&H{color}&\fad(180,180)}}"+text)
    box(.45,8.7);label(.45,8.7,272,"VIKAS",56,"FFFFFF");label(.45,8.7,348,"STARTUP YAPPING",34,"62FAC8")
    box(12.45,17.8);label(12.45,17.8,270,"MY STARTUP JOURNEY",33,"62FAC8");label(12.45,17.8,347,"What I learned",50,"FFFFFF")
    box(17.9,21.6);label(17.9,21.6,270,"WHAT I EXPECTED",31,"ABB7BE");label(17.9,21.6,347,"Easy funding",57,"62FAC8")
    box(24.9,27.55);label(24.9,27.55,306,"REALITY CHECK",56,"5791FF")
    box(81.0,84.4);label(81.0,84.4,267,"AN EXAMPLE",30,"ABB7BE");label(81.0,84.4,344,"Y COMBINATOR",54,"5791FF")
    box(89.25,91.65);label(89.25,91.65,306,"WHAT'S YOUR POV?",51,"62FAC8")
    (V3/"visual-titles.ass").write_text(ass_header()+"\n".join(events)+"\n")

def captions():
    cues=json.loads((V3/"context-captions.json").read_text())
    font=ImageFont.truetype(FONT,48)
    def wrap(text):
        lines=[]; line=""
        for word in text.split():
            test=(line+" "+word).strip()
            if line and font.getlength(test)>1520: lines.append(line);line=word
            else: line=test
        if line: lines.append(line)
        return r"\N".join(lines)
    lines=[]; srt=[]
    for i,cue in enumerate(cues):
        a,b=cue["start"],cue["end"];text=cue["text"]
        lines.append(f"Dialogue: 8,{old.ass_time(a)},{old.ass_time(b)},Caption,,0,0,0,,"
                     +r"{\an2\pos(960,1010)\fad(55,65)}"+wrap(text))
        srt.append(f"{i+1}\n{old.srt_time(a)} --> {old.srt_time(b)}\n{text}\n")
    (V3/"captions-landscape.ass").write_text(ass_header()+"\n".join(lines)+"\n")
    (ROOT/"Startup-Yapping-Landscape-English-Captions.srt").write_text("\n".join(srt))

def mix():
    samples=round(TOTAL*SR); voice=np.zeros((samples,2),dtype=np.float32)
    voice[:len(VOICE)]=VOICE  # Exactly continuous. No slices, deletions or time scaling.
    bed=old.read_wav(WORK/"audio/v3/music-v3.wav")[:samples]
    block=960; blocks=math.ceil(samples/block)
    mono=np.mean(voice,axis=1); padded=np.pad(mono,(0,blocks*block-samples))
    rms=np.sqrt(np.mean(padded.reshape(blocks,block)**2,axis=1))
    target=np.where(rms>.008,-2.5,0); duck=np.zeros(blocks); state=0.
    for i,goal in enumerate(target):
        c=math.exp(-.02/(.045 if goal<state else .32));state=c*state+(1-c)*goal;duck[i]=state
    t=np.arange(samples,dtype=np.float32)/SR
    gain=np.full(samples,-11.5,dtype=np.float32)+np.interp(t,np.arange(blocks)*.02,duck)
    lift=np.clip((t-MAIN)/.6,0,1);gain=gain*(1-lift)+(-5.5)*lift
    envelope=10**(gain/20)*np.clip(t/.7,0,1)*np.clip((TOTAL-t)/1.8,0,1)
    music=bed*envelope[:,None]; output=voice+music
    for cut in CUTS:
        for when in [cut["start"]/FPS-.025,cut["end"]/FPS-.225]:
            effect=old.read_wav(WORK/"audio/v2/whoosh-v2.wav");j=round(when*SR);n=min(len(effect),samples-j)
            output[j:j+n]+=effect[:n]*10**(-20/20)
    peak=float(np.max(np.abs(output)));scale=min(1.,10**(-1.6/20)/max(peak,1e-9))
    output*=scale;voice*=scale
    old.write_wav(V3/"voice-continuous.wav",voice)
    old.write_wav(V3/"final-audio-landscape.wav",output)
    expected=VOICE*scale
    assert np.max(np.abs(voice[:len(VOICE)]-expected))==0.
    (ROOT/"v3-speech-preservation.json").write_text(json.dumps({
        "source_audio_duration":SOURCE_AUDIO_SECONDS,"preserved_source_audio_samples":len(VOICE),
        "sample_rate":SR,"internal_audio_cuts":0,"speech_speed":1.0,"source_offset_seconds":0,
        "speech_gain":scale,"speech_continuity_max_error":0,
        "original_order":"Greeting, experience, complete funding conditions and outcome, accelerator advice, comment prompt, goodbye",
        "main_video_duration":MAIN,"final_duration":TOTAL},indent=2))

def foundation():
    path=V3/"landscape-foundation.mp4"
    graph="[0:v]fps=30,tpad=stop_mode=clone:stop=2[v0];[v0][1:v]overlay=0:0:shortest=1,ass=working/v3/visual-titles.ass,format=yuv420p[v]"
    run([FF,"-hide_banner","-loglevel","warning","-y","-hwaccel","videotoolbox","-i",str(V3/"landscape-master.mp4"),
         "-loop","1","-framerate","30","-t",f"{MAIN+.1:.6f}","-i",str(V3/"landscape-overlay.png"),
         "-filter_complex_threads","1","-filter_complex",graph,"-map","[v]"]+encoded(MAIN_FRAMES)+[str(path)])
    return path

def pieces(found):
    paths=[];cursor=0;index=0
    for cut in CUTS+[None]:
        stop=cut["start"] if cut else MAIN_FRAMES
        if cursor<stop:
            path=V3/f"piece-{index:02}-host.mp4"
            run([FF,"-hide_banner","-loglevel","error","-y","-hwaccel","videotoolbox",
                 "-ss",f"{cursor/FPS:.6f}","-i",str(found),
                 "-vf","setpts=PTS-STARTPTS,fps=30,tpad=stop_mode=clone:stop=2"]+encoded(stop-cursor)+[str(path)])
            paths.append(path);index+=1
        if not cut: break
        a,b=cut["start"],cut["end"];n=b-a;duration=n/FPS
        path=V3/f"piece-{index:02}-{cut['name']}.mp4"
        graph=[
            "[0:v]fps=30,format=yuv420p,settb=1/30,setpts=PTS-STARTPTS,split=2[h1][h2]",
            "[h1]trim=end_frame=6,setpts=PTS-STARTPTS,fps=30,settb=1/30[head]",
            f"[h2]trim=start_frame={n-6}:end_frame={n},setpts=PTS-STARTPTS,fps=30,settb=1/30[tail]",
            f"[1:v]trim=end_frame={n},setpts=PTS-STARTPTS,fps=30,format=yuv420p,settb=1/30[anim]",
            "[head][anim]xfade=transition=wiperight:duration=0.2:offset=0,fps=30,settb=1/30[entered]",
            f"[entered][tail]xfade=transition=wipeleft:duration=0.2:offset={duration-.2:.6f},fps=30,tpad=stop_mode=clone:stop=2,format=yuv420p[v]",
        ]
        file=V3/f"transition-{cut['name']}.txt";file.write_text(";\n".join(graph))
        run([FF,"-hide_banner","-loglevel","warning","-y","-hwaccel","videotoolbox",
             "-ss",f"{a/FPS:.6f}","-t",f"{duration:.6f}","-i",str(found),"-i",str(ANIM/cut["file"]),
             "-filter_complex_threads","1","-filter_complex_script",str(file),"-map","[v]"]+encoded(n)+[str(path)])
        paths.append(path);index+=1;cursor=b
    ending=V3/"end-landscape.mp4"
    run([FF,"-hide_banner","-loglevel","warning","-y","-loop","1","-framerate","30","-i",str(V3/"end-card-landscape.png"),
         "-vf","format=yuv420p,fade=t=in:st=0:d=0.12,fade=t=out:st=2.02:d=0.18"]+encoded(END_FRAMES)+[str(ending)])
    paths.append(ending)
    listing=V3/"concat.txt";listing.write_text("\n".join("file '"+str(p)+"'" for p in paths)+"\n")
    video=V3/"assembled-landscape.mp4"
    run([FF,"-hide_banner","-loglevel","error","-y","-f","concat","-safe","0","-i",str(listing),
         "-an","-c:v","copy","-bsf:v",BSF,"-map_metadata","-1","-movflags","+faststart",str(video)])
    return video

def final(video):
    captions()
    out=ROOT/"Startup-Yapping-Landscape-Complete-V3.mp4"
    run([FF,"-hide_banner","-loglevel","warning","-y","-hwaccel","videotoolbox","-i",str(video),
         "-i",str(V3/"final-audio-landscape.wav"),"-map","0:v:0","-map","1:a:0",
         "-vf","ass=working/v3/captions-landscape.ass,format=yuv420p","-frames:v",str(MAIN_FRAMES+END_FRAMES),"-r","30",
         "-c:v","h264_videotoolbox","-profile:v","high","-b:v","8M","-pix_fmt","yuv420p","-bsf:v",BSF,
         "-c:a","aac","-b:a","256k","-ar","48000","-t",f"{TOTAL:.6f}","-map_metadata","-1","-movflags","+faststart",str(out)])

if __name__=="__main__":
    art();mix()
    if "--audio-art-only" not in sys.argv:
        video=pieces(foundation())
        if "--assemble-only" not in sys.argv: final(video)
