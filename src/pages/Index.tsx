import { useState, useCallback, useEffect } from "react";
import { sceneHotspots, ppeHotspots } from "@/data/hotspots";
import HotspotImage from "@/components/HotspotImage";
import Checklist from "@/components/Checklist";
import ProgressBar from "@/components/ProgressBar";
import fireSceneImg from "@/assets/fire-scene.jpg";
import ppeImg from "@/assets/ppe-firefighter.jpg";

type Tab = "scene" | "ppe";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("scene");
  const [sceneFound, setSceneFound] = useState<Set<string>>(new Set());
  const [ppeFound, setPpeFound] = useState<Set<string>>(new Set());
  const [completionSent, setCompletionSent] = useState(false);

  const handleSceneFind = useCallback((id: string) => {
    setSceneFound((prev) => new Set(prev).add(id));
  }, []);

  const handlePpeFind = useCallback((id: string) => {
    setPpeFound((prev) => new Set(prev).add(id));
  }, []);

  const allDone =
    sceneFound.size === sceneHotspots.length &&
    ppeFound.size === ppeHotspots.length;

  useEffect(() => {
    if (allDone && !completionSent) {
      setCompletionSent(true);
      window.parent.postMessage({ type: "complete" }, "*");
    }
  }, [allDone, completionSent]);

  const restart = () => {
    setSceneFound(new Set());
    setPpeFound(new Set());
    setCompletionSent(false);
    setActiveTab("scene");
  };

  const sceneDone = sceneFound.size === sceneHotspots.length;
  const ppeDone = ppeFound.size === ppeHotspots.length;

  return (
    <div className="min-h-screen h-screen overflow-hidden flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              🔥 Spot the Hazard
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
              Identify all hazards to complete the activity
            </p>
          </div>
          <button
            onClick={restart}
            className="bg-card text-card-foreground border border-border px-4 py-2 rounded-lg font-semibold text-sm hover:bg-secondary transition-colors"
          >
            ↻ Restart
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-3 sm:pt-4 flex gap-2">
        <button
          onClick={() => setActiveTab("scene")}
          className={`px-3 sm:px-4 py-2.5 rounded-t-lg font-semibold text-xs sm:text-sm transition-all
            ${activeTab === "scene"
              ? "bg-card text-primary border border-border border-b-0"
              : "bg-secondary/50 text-muted-foreground"
            }`}
        >
          Part 1: Fire Scene {sceneDone && "✅"}
        </button>
        <button
          onClick={() => setActiveTab("ppe")}
          className={`px-3 sm:px-4 py-2.5 rounded-t-lg font-semibold text-xs sm:text-sm transition-all
            ${activeTab === "ppe"
              ? "bg-card text-primary border border-border border-b-0"
              : "bg-secondary/50 text-muted-foreground"
            }`}
        >
          Part 2: PPE Inspection {ppeDone && "✅"}
        </button>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 pb-4 overflow-hidden">
        <div className="bg-card border border-border rounded-b-lg rounded-tr-lg p-4 sm:p-6 h-full overflow-y-auto">
          {/* Scene Panel */}
          {activeTab === "scene" && (
            <div>
              <h2 className="text-lg font-bold text-foreground">Fire Scene Hazards</h2>
              <p className="text-muted-foreground text-sm mb-3">
                Click on the hazard areas in the image. Find all {sceneHotspots.length} hazards.
              </p>

              <ProgressBar
                found={sceneFound.size}
                total={sceneHotspots.length}
                label="hazards found"
              />

              <div className="mb-4">
                <HotspotImage
                  imageSrc={fireSceneImg}
                  imageAlt="Fire scene with hazards to identify"
                  hotspots={sceneHotspots}
                  foundIds={sceneFound}
                  onFind={handleSceneFind}
                  aspectClass="aspect-[1920/800]"
                />
              </div>

              <Checklist hotspots={sceneHotspots} foundIds={sceneFound} />
            </div>
          )}

          {/* PPE Panel */}
          {activeTab === "ppe" && (
            <div>
              <h2 className="text-lg font-bold text-foreground">PPE & SCBA Inspection</h2>
              <p className="text-muted-foreground text-sm mb-3">
                Click (or tap) each piece of gear. Review all {ppeHotspots.length} items.
              </p>

              <ProgressBar
                found={ppeFound.size}
                total={ppeHotspots.length}
                label="items reviewed"
              />

              <div className="mb-4 flex justify-center">
                <div className="w-full max-w-[420px]">
                  <HotspotImage
                    imageSrc={ppeImg}
                    imageAlt="Firefighter in full PPE gear"
                    hotspots={ppeHotspots}
                    foundIds={ppeFound}
                    onFind={handlePpeFind}
                    aspectClass="aspect-auto"
                    containerClass="[&>img]:object-contain [&>img]:h-auto"
                  />
                </div>
              </div>

              <Checklist hotspots={ppeHotspots} foundIds={ppeFound} />
            </div>
          )}

          {/* Completion Banner */}
          {allDone && (
            <div
              className="mt-4 p-4 rounded-lg bg-success-dim border border-success/30 text-center"
              style={{ animation: "fadeIn 0.25s ease" }}
            >
              <p className="text-success font-extrabold text-lg">
                🎉 All Hazards Identified!
              </p>
              <p className="text-success/85 text-sm mt-1">
                You've successfully completed both parts of the activity.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
