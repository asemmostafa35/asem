"use client";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useInView } from "react-intersection-observer";
import { useElementSize } from "@/hooks/useElementSize";
import { cn } from "@/lib/cn";
import { livePreviewQueue } from "@/lib/live-preview-queue";

const DESKTOP_WIDTH = 1280;
const MOBILE_WIDTH = 390;
const PREVIEW_RETENTION_MS = 8_000;

interface LivePreviewProps {
  /** The project's real deployed URL: this is what gets loaded. */
  url: string;
  title: string;
  /** Lets the visitor scroll / click inside the site (used in the details modal). Cards are non-interactive. */
  interactive?: boolean;
  className?: string;
}

interface FrameProps {
  url: string;
  title: string;
  interactive: boolean;
  width: number;
  height: number;
  scale: number;
  loaded: boolean;
  onLoaded: () => void;
}

/** Holds the iframe and loading skeleton while its preview is active. */
function Frame({
  url,
  title,
  interactive,
  width,
  height,
  scale,
  loaded,
  onLoaded,
}: FrameProps) {
  return (
    <>
      <iframe
        src={url}
        className={cn(
          "absolute left-0 top-0 max-w-none origin-top-left border-0 bg-white transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        )}
        title={`${title} live website`}
        referrerPolicy="no-referrer"
        sandbox={
          interactive
            ? "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            : "allow-scripts allow-same-origin"
        }
        tabIndex={interactive ? 0 : -1}
        onLoad={() => {
          onLoaded();
        }}
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          pointerEvents: interactive ? "auto" : "none",
        }}
      />
    </>
  );
}

/**
 * Renders the ACTUAL website inside a box.
 * The site is loaded in an iframe at a real desktop viewport (1280px wide) and scaled down with CSS to fit,
 * like a miniature browser. In an interactive preview on a narrow screen we switch to a 390px "mobile" viewport.
 *
 * Performance: a live site is a full web app (scripts, animations, images), so loading six at once is heavy.
 * The iframe is lazy-mounted near the viewport, retained briefly after loading, and removed afterward.
 * A small queue (lib/live-preview-queue.ts) prevents several previews from starting at once.
 */
export default function LivePreview({
  url,
  title,
  interactive = false,
  className,
}: LivePreviewProps) {
  const [sizeRef, size] = useElementSize<HTMLDivElement>();
  const { ref: viewRef, inView } = useInView({ rootMargin: "80px 0px" });
  const [loaded, setLoaded] = useState(false);
  const retentionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const viewportWidth =
    interactive && size.width > 0 && size.width < 560
      ? MOBILE_WIDTH
      : DESKTOP_WIDTH;
  const scale = size.width / viewportWidth;
  const viewportHeight = scale > 0 ? size.height / scale : 0;

  const id = useId();
  useEffect(() => {
    if (interactive) return;
    if (inView) {
      if (retentionTimer.current) clearTimeout(retentionTimer.current);
      retentionTimer.current = null;
      livePreviewQueue.request(id);
    } else if (!loaded) {
      livePreviewQueue.release(id);
    } else {
      retentionTimer.current = setTimeout(() => {
        setLoaded(false);
        livePreviewQueue.release(id);
        retentionTimer.current = null;
      }, PREVIEW_RETENTION_MS);
    }
  }, [id, inView, interactive, loaded]);
  useEffect(
    () => () => {
      if (retentionTimer.current) clearTimeout(retentionTimer.current);
      livePreviewQueue.release(id);
    },
    [id],
  );
  const granted = useSyncExternalStore(
    livePreviewQueue.subscribe,
    () => livePreviewQueue.isGranted(id),
    () => false,
  );
  const active = (interactive || granted) && size.width > 0;

  return (
    <div
      ref={sizeRef}
      className={cn(
        "relative aspect-[16/10] overflow-hidden bg-thirdary [contain:layout_paint]",
        interactive && "aspect-[4/5] sm:aspect-[16/10]",
        className,
      )}
    >
      <div ref={viewRef} className="absolute inset-0">
        {active && (
          <>
            {!loaded && (
              <div
                aria-hidden="true"
                className="absolute inset-0 animate-pulse bg-text-secondary/10"
              />
            )}
            <Frame
              url={url}
              title={title}
              interactive={interactive}
              width={viewportWidth}
              height={viewportHeight}
              scale={scale}
              loaded={loaded}
              onLoaded={() => {
                setLoaded(true);
                livePreviewQueue.loaded(id);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
