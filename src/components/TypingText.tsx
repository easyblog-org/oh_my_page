import { useState, useEffect, useRef, useMemo, useCallback, type ReactNode, type RefObject } from "react";

interface TypingTextProps {
  texts: string[];
  nickname?: string;
  highlightNickname?: boolean;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  repeatCount?: number;
  resetOnHover?: boolean;
  hoverContainerRef?: RefObject<HTMLElement | null>;
  className?: string;
}

export function TypingText({
  texts,
  nickname,
  highlightNickname = true,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1500,
  repeatCount = 0,
  resetOnHover = false,
  hoverContainerRef,
  className,
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roundCount, setRoundCount] = useState(0);
  const [isStopped, setIsStopped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const longestText = useMemo(() => {
    return texts.reduce((a, b) => (a.length >= b.length ? a : b), "");
  }, [texts]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetState = useCallback(() => {
    clearTimer();
    setDisplayText("");
    setIsDeleting(false);
    setCurrentIndex(0);
    setRoundCount(0);
    setIsStopped(false);
  }, [clearTimer]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!resetOnHover) return;

    const target = hoverContainerRef?.current;
    if (!target) return;

    target.addEventListener("mouseenter", resetState);
    return () => target.removeEventListener("mouseenter", resetState);
  }, [resetOnHover, hoverContainerRef, resetState]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (texts.length === 0) return;
    if (isStopped) return;

    const currentFullText = texts[currentIndex];

    if (!isDeleting) {
      if (displayText.length < currentFullText.length) {
        timerRef.current = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        const isLastText = currentIndex === texts.length - 1;
        const hasReachedMaxRounds = repeatCount > 0 && roundCount + 1 >= repeatCount;

        if (isLastText && hasReachedMaxRounds) {
          timerRef.current = setTimeout(() => {
            setIsStopped(true);
          }, pauseDuration);
        } else {
          timerRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    } else {
      if (displayText.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        const isLastText = currentIndex === texts.length - 1;

        if (isLastText) {
          setRoundCount((prev) => prev + 1);
          setCurrentIndex(0);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      }
    }

    return clearTimer;
  }, [displayText, isDeleting, currentIndex, roundCount, isStopped, texts, typingSpeed, deletingSpeed, pauseDuration, repeatCount, prefersReducedMotion]);

  const renderHighlightedText = useCallback(
    (text: string): ReactNode => {
      if (!highlightNickname || !nickname || currentIndex !== 0) {
        return text;
      }

      const fullText = texts[0] ?? "";
      const nicknameIndex = fullText.indexOf(nickname);
      if (nicknameIndex === -1) return text;

      const prefixEnd = nicknameIndex;
      const nicknameEnd = nicknameIndex + nickname.length;

      if (text.length <= prefixEnd) return text;

      const prefix = text.slice(0, prefixEnd);
      const namePart = text.slice(prefixEnd, Math.min(nicknameEnd, text.length));
      const suffix = text.slice(Math.min(nicknameEnd, text.length));

      return (
        <>
          {prefix}
          <span style={{ color: "#3b82f6" }}>{namePart}</span>
          {suffix}
        </>
      );
    },
    [highlightNickname, nickname, currentIndex, texts]
  );

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {renderHighlightedText(texts[0] ?? "")}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div
        className={className}
        style={{ visibility: "hidden", whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        aria-hidden="true"
      >
        {longestText}
      </div>
      <div
        className={`absolute top-0 left-0 right-0 ${className ?? ""}`}
        style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
      >
        {renderHighlightedText(displayText)}
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1.2em",
            backgroundColor: "currentColor",
            marginLeft: "2px",
            verticalAlign: "middle",
            animation: isStopped ? "none" : "typing-blink 1s step-end infinite",
            opacity: isStopped ? 0.6 : undefined,
          }}
        />
      </div>
      <style>{`
        @keyframes typing-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
