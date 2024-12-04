export default function Modal({ children }: {children: React.ReactNode;}) {
    return (
        <div style={{backgroundColor: "rgba(0,0,0,0.8)"}} className="absolute top-0 left-0 h-full w-full z-40">
            <div className="flex flex-row min-h-screen justify-center items-center opacity-100 z-50">
                {children}
            </div>
        </div>
    );
};
