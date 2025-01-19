import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const StartPage = () => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div ref={componentRef}>
        <div>dapepoekdpekdokwpdkwpoekpwokdowekpekdowp</div>
      </div>
      <button onClick={handlePrint}>Print</button>
    </>
  );
};
