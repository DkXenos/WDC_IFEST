"use client";

import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type TutorialStep = {
  title: string;
  description: string;
  target?: string;
};

const STEPS: TutorialStep[] = [
  {
    title: "Welcome to WeLearn Desktop",
    description: "This quick tour will guide you through the core controls so you can start studying faster.",
  },
  {
    title: "Top Navigation Bar",
    description: "This bar gives you quick system-style access to app menus, stats, and status.",
    target: "navbar",
  },
  {
    title: "File Menu",
    description: "Open the FILE menu to access desktop-like actions and shortcuts.",
    target: "file-menu",
  },
  {
    title: "Now Playing",
    description: "Use the play icon to check what music is currently playing while you study.",
    target: "now-playing",
  },
  {
    title: "App Dock",
    description: "Launch your apps from the dock. Open windows can be dragged and resized like macOS.",
    target: "dock",
  },
];

const STORAGE_KEY = "welearn_tutorial_seen";

import { useWindows } from "./WindowContext";

export default function InteractiveTutorial() {
  const { showTutorialButton } = useWindows();
  const [isOpen, setIsOpen] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [targetRect, setTargetRect] = React.useState<DOMRect | null>(null);

  const step = STEPS[stepIndex];
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const updateTargetRect = React.useCallback(() => {
    if (!isOpen || !step.target) {
      setTargetRect(null);
      return;
    }

    const el = document.querySelector<HTMLElement>(`[data-tutorial-id="${step.target}"]`);
    if (!el) {
      setTargetRect(null);
      return;
    }

    setTargetRect(el.getBoundingClientRect());
  }, [isOpen, step.target]);

  React.useEffect(() => {
    const seen = window.localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      setIsOpen(true);
      toast.success("Interactive tutorial started");
    }
  }, []);

  React.useEffect(() => {
    updateTargetRect();

    if (!isOpen) return;

    window.addEventListener("resize", updateTargetRect);
    window.addEventListener("scroll", updateTargetRect, true);
    return () => {
      window.removeEventListener("resize", updateTargetRect);
      window.removeEventListener("scroll", updateTargetRect, true);
    };
  }, [isOpen, stepIndex, updateTargetRect]);

  React.useEffect(() => {
    if (!isOpen) return;
    toast.info(`Step ${stepIndex + 1}/${STEPS.length}: ${step.title}`);
  }, [isOpen, step.title, stepIndex]);

  const closeTutorial = (completed: boolean) => {
    setIsOpen(false);
    window.localStorage.setItem(STORAGE_KEY, "true");

    if (completed) {
      toast.success("Tutorial completed. You're all set.");
    } else {
      toast("Tutorial skipped. You can restart it anytime.");
    }
  };

  const handleNext = () => {
    if (stepIndex === STEPS.length - 1) {
      closeTutorial(true);
      return;
    }

    setStepIndex((prev) => prev + 1);
  };

  const handleReplay = () => {
    setStepIndex(0);
    setIsOpen(true);
    toast.success("Tutorial restarted");
  };

  return (
    <>
      {!isOpen && showTutorialButton && (
        <div className="fixed right-4 bottom-24 z-120">
          <Button onClick={handleReplay} variant="secondary">
            Show Tutorial
          </Button>
        </div>
      )}

      {isOpen && (
        <>
          <div className="fixed inset-0 z-110 pointer-events-none bg-black/35" />

          {targetRect && (
            <div
              className="fixed z-111 pointer-events-none rounded-2xl border border-emerald-300/90 shadow-[0_0_0_2px_rgba(16,185,129,0.55)]"
              style={{
                top: targetRect.top - 6,
                left: targetRect.left - 6,
                width: targetRect.width + 12,
                height: targetRect.height + 12,
              }}
            />
          )}

          <div className="fixed inset-x-0 bottom-6 z-120 flex justify-center px-4 pointer-events-none">
            <Card className="w-full max-w-xl border border-border/80 shadow-2xl pointer-events-auto">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{step.title}</CardTitle>
                  <Badge variant="outline">Step {stepIndex + 1} / {STEPS.length}</Badge>
                </div>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progress} />
              </CardContent>
              <CardFooter className="justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => closeTutorial(false)}>
                    Skip
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                    disabled={stepIndex === 0}
                  >
                    Back
                  </Button>
                </div>
                <Button onClick={handleNext}>
                  {stepIndex === STEPS.length - 1 ? "Finish" : "Next"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
