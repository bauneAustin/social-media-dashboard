import { XMarkIcon } from "@heroicons/react/24/outline";
export default function Modal({ children, closeModalCallback }: { children: React.ReactNode, closeModalCallback: any }) {
    return (
        <div style={{backgroundColor: "rgba(0,0,0,0.8)"}} className="absolute top-0 left-0 h-full w-full z-40">
            <div className="flex flex-row min-h-screen justify-center items-center opacity-100 z-50">
                <XMarkIcon className=' w-8 h-8 cursor-pointer text-valentino-100 relative bottom-[200px] left-[620px]' onClick={closeModalCallback} />
                {children}
            </div>
        </div>
    );
};
