interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    stepLabels?: string[];
}

export default function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
    const defaultLabels = Array.from({ length: totalSteps }, (_, i) => `Step ${i + 1}`);
    const labels = stepLabels || defaultLabels;

    return (
        <div className="w-full max-w-md mx-auto mb-8">
            <div className="flex justify-center items-center">
                {/* Steps e traços */}
                {labels.map((label, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isActive = stepNumber === currentStep;
                    const isLastStep = index === labels.length - 1;

                    return (
                        <div key={stepNumber} className="flex justify-between items-center">
                            {/* Círculo do step */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                                        isCompleted
                                            ? 'bg-[#EFA339] text-[#121417]'
                                            : isActive
                                            ? 'bg-[#EFA339] text-[#121417]'
                                            : 'bg-[#34373D] text-[#9FA3AD]'
                                    }`}
                                >
                                    {isCompleted ? '✓' : stepNumber}
                                </div>

                                {/* Label do step */}
                                <span
                                    className={`mt-2 text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                                        isCompleted || isActive
                                            ? 'text-foreground'
                                            : 'text-[#9FA3AD]'
                                    }`}
                                >
                                    {label}
                                </span>
                            </div>

                            {!isLastStep && (
                                <div className="flex items-center mx-8">
                                    <div className="flex gap-1">
                                        <div
                                            className={`w-20 h-0.5 transition-all duration-300 ${
                                                stepNumber < currentStep
                                                    ? 'bg-[#EFA339]'
                                                    : 'bg-[#34373D]'
                                            }`}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}