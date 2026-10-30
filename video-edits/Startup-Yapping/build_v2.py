"""Enhanced edition: audible original music, moving cutaways, video wipes.

Keeps the original spoken edit and V1 deliverable. All new media is original.
Run with the NumPy/Pillow-enabled temporary video environment.
"""
from pathlib import Path
import json
import math
import subprocess
import numpy as np
import build_edit as base

ROOT=Path(__file__).resolve().parent
WORK=ROOT/"working"
V2=WORK/"v2"
ANIM=WORK/"animation-v2"
AUDIO=WORK/"audio/v2"
FF=base.FFMPEG
FPS,SR=30,48000
TOTAL=base.TOTAL
FRAME_COUNT=round(TOTAL*FPS)
HOST_FRAMES=base.MAIN_FRAMES-1
FOUNDATION=WORK/"main-render.mp4"
OUTPUT=ROOT/"Startup-Yapping-Enhanced-Reel-V2.mp4"
CUTAWAYS=[
    {"name":"funding","start":91,"end":231,"file":"funding-reality.mp4"},
    {"name":"investors","start":281,"end":458,"file":"investors.mp4"},
    {"name":"traction","start":781,"end":947,"file":"traction.mp4"},
    {"name":"accelerator","start":1394,"end":1499,"file":"accelerator.mp4"},
]
BSF="h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1"

def run(args):
    print("Running",Path(args[-1]).name,flush=True)
    subprocess.run(args,cwd=ROOT,env=base.ENV,check=True)

def caption_file():
    V2.mkdir(parents=True,exist_ok=True)
    source=(WORK/"render.ass").read_text()
    header=source.split("[Events]")[0]
    events=[row for row in source.splitlines() if row.startswith("Dialogue:") and ",Caption," in row]
    (V2/"captions.ass").write_text(header+"[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n"+"\n".join(events)+"\n")

def audio_mix():
    raw=base.read_wav(WORK/"speech-clean.wav")
    parts=[]
    for start,end in base.RANGES:
        chunk=raw[round(start/FPS*SR):round(end/FPS*SR)].copy()
        fade=min(round(.008*SR),len(chunk)//2)
        chunk[:fade]*=np.linspace(0,1,fade)[:,None]
        chunk[-fade:]*=np.linspace(1,0,fade)[:,None]
        parts.append(chunk)
    samples=round(TOTAL*SR)
    voice=np.zeros((samples,2),dtype=np.float32)
    joined=np.concatenate(parts,axis=0); voice[:len(joined)]=joined
    base.write_wav(V2/"voice-only.wav",voice)
    balanced=V2/"music-balanced.wav"
    run([FF,"-hide_banner","-loglevel","error","-y","-i",str(AUDIO/"music-v2.wav"),
         "-af","highpass=f=55,equalizer=f=220:t=q:w=0.8:g=-1.5,lowpass=f=10500",
         "-ar",str(SR),"-c:a","pcm_s16le",str(balanced)])
    bed=base.read_wav(balanced)[:samples]

    # Responsive ducking: keep the music present and protect quiet words.
    block=960
    blocks=math.ceil(samples/block)
    mono=np.mean(voice,axis=1)
    padded=np.pad(mono,(0,blocks*block-samples))
    rms=np.sqrt(np.mean(padded.reshape(blocks,block)**2,axis=1))
    target=np.where(rms>.008,-2.5,0).astype(np.float32)
    duck=np.zeros(blocks,dtype=np.float32)
    state=0.
    for i,goal in enumerate(target):
        coefficient=math.exp(-.02/(.045 if goal<state else .32))
        state=coefficient*state+(1-coefficient)*goal
        duck[i]=state
    times=np.arange(samples,dtype=np.float32)/SR
    gain_db=np.full(samples,-11.5,dtype=np.float32)
    gain_db+=np.interp(times,np.arange(blocks)*.02,duck).astype(np.float32)
    for cut in CUTAWAYS:
        a,b=cut["start"]/FPS,cut["end"]/FPS
        swell=np.clip((times-a)/.2,0,1)*np.clip((b-times)/.2,0,1)
        gain_db+=swell*1.0
    outro=HOST_FRAMES/FPS
    lift=np.clip((times-outro)/.6,0,1)
    gain_db=(1-lift)*gain_db+lift*(-5.5)
    envelope=10**(gain_db/20)
    envelope*=np.clip(times/.45,0,1)
    envelope*=np.clip((TOTAL-times)/.65,0,1)
    music=bed*envelope[:,None]
    mix=voice+music
    effect_times=[]
    for cut in CUTAWAYS:
        for when in [cut["start"]/FPS,cut["end"]/FPS-.20]:
            effect_times.append((max(0,when-.03),"whoosh-v2.wav",-18))
    effect_times += [(91/FPS+.08,"impact-v2.wav",-21),
                     (281/FPS+2.9,"chime-v2.wav",-23),
                     (281/FPS+4.77,"chime-v2.wav",-23),
                     (781/FPS+2.62,"chime-v2.wav",-25),
                     (outro,"chime-v2.wav",-18)]
    for when,name,gain in effect_times:
        effect=base.read_wav(AUDIO/name)
        start=round(when*SR); n=min(len(effect),samples-start)
        mix[start:start+n]+=effect[:n]*10**(gain/20)
    peak=float(np.max(np.abs(mix))); ceiling=10**(-1.6/20)
    scale=min(1.,ceiling/max(peak,1e-9))
    mix*=scale; voice*=scale; music*=scale
    base.write_wav(V2/"audio-final-v2.wav",mix)
    base.write_wav(V2/"music-mixed-only.wav",music)
    base.write_wav(V2/"voice-only.wav",voice)
    stats={"duration":TOTAL,"sample_rate":SR,"mix_peak_dbfs":20*math.log10(float(np.max(np.abs(mix)))),
           "voice_rms_dbfs":20*math.log10(float(np.sqrt(np.mean(voice**2)))),
           "music_rms_dbfs":20*math.log10(float(np.sqrt(np.mean(music[:round(outro*SR)]**2)))),
           "music":"Original 112 BPM electric piano / synth groove, automatic speech ducking",
           "base_music_gain_db":-11.5,"speech_duck_db":2.5,"outro_music_gain_db":-5.5}
    (ROOT/"v2-audio-checks.json").write_text(json.dumps(stats,indent=2))
    print(json.dumps(stats),flush=True)

def encode_options(frames):
    return ["-an","-frames:v",str(frames),"-r","30","-c:v","h264_videotoolbox",
            "-profile:v","high","-b:v","8M","-pix_fmt","yuv420p","-bsf:v",BSF,
            "-map_metadata","-1","-movflags","+faststart"]

def host_segment(index,start,end):
    path=V2/f"segment-{index:02}-host.mp4"
    run([FF,"-hide_banner","-loglevel","error","-y","-hwaccel","videotoolbox",
         "-ss",f"{start/FPS:.6f}","-i",str(FOUNDATION),
         "-vf","setpts=PTS-STARTPTS,fps=30,tpad=stop_mode=clone:stop=2"]+encode_options(end-start)+[str(path)])
    return path

def animated_segment(index,cut):
    start,end=cut["start"],cut["end"]
    frames=end-start; duration=frames/FPS; transition=6
    path=V2/f"segment-{index:02}-{cut['name']}.mp4"
    graph=[
        "[0:v]fps=30,format=yuv420p,settb=1/30,setpts=PTS-STARTPTS,split=2[h1][h2]",
        f"[h1]trim=end_frame={transition},setpts=PTS-STARTPTS,fps=30,settb=1/30[head]",
        f"[h2]trim=start_frame={frames-transition}:end_frame={frames},setpts=PTS-STARTPTS,fps=30,settb=1/30[tail]",
        f"[1:v]trim=end_frame={frames},fps=30,format=yuv420p,settb=1/30,setpts=PTS-STARTPTS+{start}/(30*TB),ass=working/v2/captions.ass,setpts=PTS-STARTPTS,fps=30,settb=1/30[anim]",
        "[head][anim]xfade=transition=wiperight:duration=0.2:offset=0,fps=30,settb=1/30[entered]",
        f"[entered][tail]xfade=transition=wipeleft:duration=0.2:offset={duration-.2:.6f},fps=30,tpad=stop_mode=clone:stop=2,format=yuv420p[v]",
    ]
    file=V2/f"filter-{cut['name']}.txt"; file.write_text(";\n".join(graph))
    run([FF,"-hide_banner","-loglevel","warning","-y","-hwaccel","videotoolbox",
         "-ss",f"{start/FPS:.6f}","-t",f"{duration:.6f}","-i",str(FOUNDATION),
         "-i",str(ANIM/cut["file"]),"-filter_complex_threads","1","-filter_complex_script",str(file),
         "-map","[v]"]+encode_options(frames)+[str(path)])
    return path

def render():
    caption_file()
    clips=[]; cursor=0; index=0
    for cut in CUTAWAYS:
        if cursor<cut["start"]:
            clips.append(host_segment(index,cursor,cut["start"])); index+=1
        clips.append(animated_segment(index,cut)); index+=1; cursor=cut["end"]
    if cursor<HOST_FRAMES:
        clips.append(host_segment(index,cursor,HOST_FRAMES))
    clips.append(WORK/"end-render.mp4")
    listing=V2/"concat.txt"
    listing.write_text("\n".join("file '"+str(path)+"'" for path in clips)+"\n")
    run([FF,"-hide_banner","-loglevel","warning","-y","-f","concat","-safe","0","-i",str(listing),
         "-i",str(V2/"audio-final-v2.wav"),"-map","0:v:0","-map","1:a:0","-c:v","copy","-bsf:v",BSF,
         "-c:a","aac","-b:a","256k","-ar","48000","-t",f"{TOTAL:.6f}",
         "-map_metadata","-1","-movflags","+faststart",str(OUTPUT)])
    (ROOT/"v2-timeline.json").write_text(json.dumps({"brand":"Startup Yapping","duration":TOTAL,
        "output":str(OUTPUT),"animation_windows":[dict(c,start_seconds=c["start"]/FPS,end_seconds=c["end"]/FPS) for c in CUTAWAYS],
        "transitions":"0.2s moving video wipes at cutaway entrances/exits","original_speech_preserved":True},indent=2))

if __name__=="__main__":
    import sys
    V2.mkdir(parents=True,exist_ok=True)
    audio_mix()
    if "--audio-only" not in sys.argv:
        render()
