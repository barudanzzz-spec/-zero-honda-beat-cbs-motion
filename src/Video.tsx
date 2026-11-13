import React from "react";
import {
  AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";

type Props = {
  whatsapp: string;
  dp: string;
  presenter: string;
  voiceover?: string;
};

const RED = "#d71920";
const DARK = "#171717";
const CREAM = "#fff8f1";

const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};

const SceneTitle: React.FC<{kicker: string; title: string; subtitle?: string; frame: number}> = ({
  kicker, title, subtitle, frame,
}) => {
  const {fps} = useVideoConfig();
  const y = spring({frame, fps, config: {damping: 15, stiffness: 110}});
  return (
    <div style={{transform: `translateY(${interpolate(y, [0, 1], [55, 0])}px)`, opacity: y}}>
      <div style={{fontSize: 25, letterSpacing: 5, fontWeight: 900, color: RED}}>{kicker}</div>
      <div style={{fontSize: 72, lineHeight: 1.03, fontWeight: 950, color: DARK, marginTop: 16, whiteSpace: "pre-line"}}>{title}</div>
      {subtitle ? <div style={{fontSize: 31, lineHeight: 1.3, color: "#555", marginTop: 22, fontWeight: 550}}>{subtitle}</div> : null}
    </div>
  );
};

const Presenter: React.FC<{frame: number; fps: number}> = ({frame, fps}) => {
  const enter = spring({frame, fps, config: {damping: 14, stiffness: 90}});
  const bob = Math.sin(frame / 11) * 8;
  return (
    <div style={{
      position: "absolute", right: 18, bottom: 0, width: 510, height: 850,
      transform: `translate(${interpolate(enter, [0, 1], [150, 0])}px, ${bob}px) scale(${interpolate(enter, [0, 1], [.9, 1])})`,
      transformOrigin: "bottom center", filter: "drop-shadow(0 22px 24px #0002)",
    }}>
      <Img src={staticFile("honda-presenter.png")} style={{width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom"}} />
    </div>
  );
};

const Motor: React.FC<{frame: number; fps: number}> = ({frame, fps}) => {
  const enter = spring({frame, fps, config: {damping: 13, stiffness: 95}});
  const drift = Math.sin(frame / 17) * 7;
  return (
    <div style={{
      width: 850, height: 570, transform: `translateY(${interpolate(enter, [0, 1], [90, 0]) + drift}px) scale(${interpolate(enter, [0, 1], [.82, 1])})`,
      opacity: enter, filter: "drop-shadow(0 24px 22px #0003)",
    }}>
      <Img src={staticFile("beat-cbs.png")} style={{width: "100%", height: "100%", objectFit: "contain"}} />
    </div>
  );
};

const Pill: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{display: "inline-flex", padding: "14px 24px", borderRadius: 999, background: RED, color: "white", fontSize: 25, fontWeight: 900, letterSpacing: 1}}>
    {children}
  </div>
);

export const Video: React.FC<Props> = ({whatsapp, dp, presenter, voiceover}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const fade = (start: number, end: number) => interpolate(frame, [start, start + 12, end - 12, end], [0, 1, 1, 0], clamp);
  const bgMove = interpolate(frame, [0, 1200], [0, 80], clamp);

  return (
    <AbsoluteFill style={{background: CREAM, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      {voiceover ? <Audio src={staticFile(voiceover)} volume={1} /> : null}
      <AbsoluteFill style={{background: `radial-gradient(circle at ${70 + bgMove / 4}% 20%, #ffd9d5 0%, transparent 38%), linear-gradient(145deg, #fffaf5 0%, #f5eee7 100%)`}} />
      <div style={{position: "absolute", top: 0, left: 0, width: 22, height: "100%", background: RED}} />
      <div style={{position: "absolute", top: 58, left: 65, fontSize: 25, fontWeight: 950, letterSpacing: 4, color: RED}}>HONDA • BEAT CBS</div>
      <div style={{position: "absolute", top: 55, right: 65, border: `2px solid ${RED}`, borderRadius: 30, padding: "10px 20px", color: RED, fontSize: 20, fontWeight: 900}}>PROMO DP</div>

      {/* Scene 1: Hook */}
      <div style={{position: "absolute", inset: 0, opacity: fade(0, 210), display: "flex", alignItems: "flex-start", padding: "190px 75px"}}>
        <div style={{width: 650}}>
          <Pill>INFO MOTOR HONDA</Pill>
          <div style={{fontSize: 83, lineHeight: 1.0, fontWeight: 950, color: DARK, marginTop: 34}}>Lagi cari motor<br/><span style={{color: RED}}>buat harian?</span></div>
          <div style={{fontSize: 32, color: "#555", marginTop: 28, lineHeight: 1.35}}>Kenalan dulu dengan Honda Beat CBS yang praktis untuk aktivitas sehari-hari.</div>
        </div>
      </div>
      <div style={{opacity: fade(0, 210)}}><Presenter frame={frame} fps={fps}/></div>

      {/* Scene 2: Product reveal */}
      <div style={{position: "absolute", inset: 0, opacity: fade(195, 470), display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 180}}>
        <SceneTitle kicker="HONDA BEAT CBS" title={"Ringkas. Praktis.\nSiap menemani aktivitas."} subtitle="Tampilan modern untuk mobilitas sehari-hari." frame={Math.max(0, frame - 195)}/>
        <div style={{marginTop: 28}}><Motor frame={Math.max(0, frame - 220)} fps={fps}/></div>
      </div>

      {/* Scene 3: Feature explainer */}
      <div style={{position: "absolute", inset: 0, opacity: fade(455, 720), padding: "210px 70px"}}>
        <SceneTitle kicker="KENALI FITURNYA" title="CBS, pengereman\nlebih praktis" subtitle="Combi Brake System membantu mengombinasikan pengereman depan dan belakang saat tuas rem kiri digunakan." frame={Math.max(0, frame - 455)}/>
        <div style={{position: "absolute", bottom: 155, left: 75, background: "white", borderRadius: 28, padding: "25px 30px", boxShadow: "0 15px 35px #0001", fontSize: 27, color: DARK, fontWeight: 800, maxWidth: 850}}>
          Konsultasikan cara kerja dan pilihan varian langsung dengan sales.
        </div>
      </div>
      <div style={{position: "absolute", right: -35, bottom: 15, opacity: fade(455, 720)}}><Motor frame={Math.max(0, frame - 470)} fps={fps}/></div>

      {/* Scene 4: Offer */}
      <div style={{position: "absolute", inset: 0, opacity: fade(705, 960), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <div style={{fontSize: 30, fontWeight: 950, color: RED, letterSpacing: 5}}>PENAWARAN DP</div>
        <div style={{fontSize: 115, fontWeight: 1000, color: DARK, marginTop: 24, textShadow: "0 7px 0 #00000010"}}>{dp}</div>
        <div style={{fontSize: 31, color: "#555", marginTop: 20, fontWeight: 700}}>Simulasi dan ketentuan mengikuti hasil pengajuan</div>
        <div style={{marginTop: 48, background: RED, color: "white", borderRadius: 28, padding: "24px 38px", fontSize: 33, fontWeight: 950}}>CEK PROMO SEKARANG</div>
      </div>

      {/* Scene 5: CTA */}
      <div style={{position: "absolute", inset: 0, opacity: fade(945, 1200), background: DARK, color: "white", padding: "210px 70px"}}>
        <div style={{fontSize: 28, color: "#ff777b", fontWeight: 950, letterSpacing: 5}}>MAU TANYA-TANYA DULU?</div>
        <div style={{fontSize: 78, lineHeight: 1.05, fontWeight: 950, marginTop: 28}}>Hubungi sales<br/>Honda sekarang.</div>
        <div style={{fontSize: 31, color: "#ddd", marginTop: 25, lineHeight: 1.4}}>Tanya promo, simulasi cicilan, dan proses pengajuan sesuai kebutuhanmu.</div>

        <div style={{marginTop: 55, display: "inline-flex", padding: "25px 32px", borderRadius: 22, background: "#20b85a", fontSize: 37, fontWeight: 950}}>WhatsApp: {whatsapp}</div>
        <div style={{position: "absolute", bottom: 70, left: 70, fontSize: 22, color: "#aaa"}}>{presenter} • HONDA BEAT CBS</div>
      </div>
    </AbsoluteFill>
  );
};
