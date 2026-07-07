interface ImageZoomOverlayProps {
  src: string | null;
  onClose: () => void;
}

export default function ImageZoomOverlay({ src, onClose }: ImageZoomOverlayProps) {
  const open = src !== null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/90 transition-opacity duration-700 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {src && (
        <img
          src={src}
          alt="Zoomed project screenshot"
          className={`max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl transform transition-transform duration-700 ${
            open ? "scale-100" : "scale-90"
          }`}
        />
      )}
    </div>
  );
}
