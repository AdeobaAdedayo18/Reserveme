import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const Test = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div>
      <button onClick={() => reactToPrintFn()}>Print</button>
      <div ref={contentRef}>Content to print</div>
    </div>
  );
};
export default Test;
