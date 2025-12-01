export function Box({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#1b1d22] border border-[#34373D] rounded-lg p-6">
            {children}
        </div>
    );
}