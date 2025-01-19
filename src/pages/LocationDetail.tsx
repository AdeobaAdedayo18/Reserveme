import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pic1 from "../assets/pexels-daiangan-102129.jpg";
import pic2 from "../assets/pexels-kaip-996329.jpg";
import pic3 from "../assets/pexels-pixabay-325876.jpg";
import pic4 from "../assets/pexels-solliefoto-298863.jpg";
import { DayPicker } from "react-day-picker";
import { Calendar } from "../components/ui/calendar";
interface Facilties {
  icon: string;
  text: string;
}
const LocationDetail = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(0);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  console.log(selectedDay);

  const preselectedDays = ["2025-01-02", "2025-01-03", "2025-01-05"];
  const disabledDays = preselectedDays.map((date) => new Date(date));
  const properties = ["cat", "dog", "mouse", "cat", "dog", "mouse"];
  const productImages = [pic1, pic2, pic3, pic4];
  const facilities: Facilties[] = [
    { icon: "living room", text: "Shared Living Room" },
    { icon: "wifi", text: "Wifi" },
    { icon: "water-heater", text: "Water Heater" },
    { icon: "kitchen", text: "Kitchen" },
    { icon: "parking", text: "Parking" },
    { icon: "gym", text: "Gym" },
  ];

  const goToPrevious = () => {
    const isFirstSlide = image === 0;
    const newIndex = isFirstSlide ? productImages.length - 1 : image - 1;
    setImage(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = image === productImages.length - 1;
    const newIndex = isLastSlide ? 0 : image + 1;
    setImage(newIndex);
  };
  return (
    <div className="bg-white h-screen w-screen px-28 py-7 overflow-x-hidden">
      <div className="h-16 w-full flex flex-row justify-between">
        <div className="max-h-8 w-8 bg-blue-500">Logo</div>
        <div>
          <button
            className="border border-2 border-slate-300 hover:border-slate-400 rounded-md p-2 max-h-full flex felx-row gap-2 items-center"
            onClick={() => {
              navigate(-1);
            }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-arrow-left-from-line"
              >
                <path d="m9 6-6 6 6 6" />
                <path d="M3 12h14" />
                <path d="M21 19V5" />
              </svg>
            </span>
            Dashboard
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[55%_45%] h-auto w-full gap-16">
        <div className="col-span-1 bg-white">
          <div className=" h-auto ">
            <div className="flex flex-col gap-4 items-center justify-evenly">
              <div className="relative">
                <img
                  src={productImages[image]}
                  alt=""
                  className="w-full h-auto rounded-md relative"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-left"
                  className="text-white cursor-pointer h-12 w-12 absolute bottom-56 transition-transform duration-200 z-10 hover:scale-125"
                  onClick={goToPrevious}
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-right"
                  className="text-white cursor-pointer h-12 w-12 absolute bottom-[220px] right-0 transition-transform duration-200 z-10 hover:scale-125"
                  onClick={goToNext}
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
              <div className="grid grid-cols-4 gap-2 ">
                <img
                  src={productImages[0]}
                  alt=""
                  className="w-[150px] h-auto  cursor-pointer rounded-md "
                  onClick={() => setImage(0)}
                />
                <img
                  src={productImages[1]}
                  alt=""
                  className="w-[150px] h-auto cursor-pointer rounded-md"
                  onClick={() => setImage(1)}
                />
                <img
                  src={productImages[2]}
                  alt=""
                  className="w-[150px] h-auto cursor-pointer rounded-md"
                  onClick={() => setImage(2)}
                />
                <img
                  src={productImages[3]}
                  alt=""
                  className="w-[150px] h-auto  cursor-pointer rounded-md"
                  onClick={() => setImage(3)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-start">
            <div>
              <p className="text-slate-700 font-bold text-4xl mb-1">
                Cucrid Auditorium
              </p>
              <p className="text-slate-500  text-16 flex flex-row gap-1 align-center mb-1">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-map-pin"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                Cucrid auditorium, 1st flooe cucrid
              </p>
            </div>
            <div className="flex flex-row items-center">
              <div className="text-slate-700 font-semibold text-4xl">$450</div>
              <div className="text-slate-400 font-semibold text-xl">/hour</div>
            </div>
          </div>
          <div className="flex flex-row">
            {properties.map((property) => (
              <div className=" mb-4 mr-4 items-center rounded-full px-2.5 py-0.5 text-sm text-red-500 font-semibold transition-colors  bg-rose-200  ">
                {property}
              </div>
            ))}
          </div>
          <div className="w-full h-auto rounded-lg bg-white mb-4 border border-1 border-slate-200 p-4">
            <h1 className="text-slate-600 font-medium text-2xl mb-1">
              Description
            </h1>
            <p className="text-slate-600 mb-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              lorem30
            </p>
            <button className="flex flex-row border text-sm  bg-rose-200 text-rose-600 py-0.5 px-2 items-center justify-center rounded-3xl">
              Show more{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-arrow-down"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="w-full h-auto rounded-lg bg-white border border-1 border-slate-200 p-4">
            <h1 className="text-slate-600 font-medium text-2xl mb-2">
              Facilities
            </h1>
            <div className="flex flex-row">
              {facilities.map((facility) => (
                <div className=" mb-4 mr-4 items-center rounded-full px-2.5 py-0.5 text-md text-slate-500 font-semibold transition-colors  bg-slate-200  ">
                  {facility.text}
                </div>
              ))}
            </div>
            <button className="flex flex-row border text-sm  bg-rose-200 text-rose-600 py-0.5 px-2 items-center justify-center rounded-3xl">
              Show more{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-arrow-down"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
        <div
          className="col-span-1 
          rounded-lg
          bg-white
          mb-4
          border
          border-1
          border-slate-400
          p-4
          h-100%
          "
        >
          <div className="w-full h-8 ">
            <h1 className="text-slate-600 font-medium text-2xl mb-1">
              Booking Request
            </h1>
            <div className="z-50 grid grid-cols-2 gap-4">
              <DayPicker
                mode="single"
                selected={selectedDay} // Consumer cannot select
                onSelect={setSelectedDay}
                disabled={disabledDays}
                modifiers={{ preselected: disabledDays }}
                modifiersClassNames={{
                  preselected: "bg-rose-400 text-rose-500 rounded-md border",
                }}
                className="p-3 w-full max-w-md "
                classNames={{
                  months:
                    "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell:
                    "text-rose-500 rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "h-9 w-9 text-center text-sm p-0 relative",
                  day: "h-9 w-9 p-0 font-normal",
                  day_range_end: "day-range-end",
                  day_selected:
                    "bg-rose-900 rounded-md border text-rose-50 hover:bg-rose-900 hover:text-rose-50",
                  day_today: "bg-rose-100 text-rose-900",
                  day_outside: "text-rose-500",
                  day_disabled: "text-rose-500 opacity-50",
                  day_range_middle: "bg-rose-100 text-rose-900",
                  day_hidden: "invisible",
                }}
              />
              {selectedDay && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg shadow-md w-full ">
                  <h3 className="text-lg font-semibold text-rose-700 mb-2">
                    You have picked:
                  </h3>
                  <p className="text-rose-600 text-xl font-bold">
                    {selectedDay.toLocaleDateString()}
                  </p>
                  <p className="mt-4 text-rose-500">
                    You can now proceed to checkout to finalize your booking.
                  </p>
                </div>
              )}
            </div>

            {selectedDay && (
              <button className="w-full bg-rose-500 text-white rounded-md transition-bg duration-300 p-2 mt-4 hover:bg-rose-600">
                Proceed to checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;
