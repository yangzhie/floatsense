import { useControls } from "react-zoom-pan-pinch";
import { RiZoomInFill, RiZoomOutFill } from "react-icons/ri";
import { RiResetLeftFill } from "react-icons/ri";

function ZoomControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="flex justify-center gap-3 mb-2">
        <button 
            className="text-xl"
            onClick={() => zoomIn()}
        >
            <RiZoomInFill />
        </button>

        <button 
            className="text-xl"
            onClick={() => zoomOut()}
        >
            <RiZoomOutFill />
        </button>

        <button 
            className="text-xl"
            onClick={() => resetTransform()}
        >
            <RiResetLeftFill />
        </button>
    </div>
  );
};

export default ZoomControls;