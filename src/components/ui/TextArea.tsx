import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Copy, Check, X } from 'lucide-react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    onClear?: () => void;
    isError?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, label, onClear, isError, value, ...props }, ref) => {
        const [copied, setCopied] = React.useState(false);

        const handleCopy = async () => {
            if (!value) return;
            await navigator.clipboard.writeText(value.toString());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        return (
            <div className="relative flex flex-col gap-2 w-full h-full group">
                <div className="flex items-center justify-between px-1">
                    <label className="text-sm font-medium text-zinc-400 group-focus-within:text-emerald-400 transition-colors">
                        {label}
                    </label>
                    <div className="flex items-center gap-2">
                        {value && (
                            <button
                                onClick={handleCopy}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm",
                                    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                                    "hover:bg-emerald-500 hover:text-white hover:border-emerald-500"
                                )}
                                title="Copy to clipboard"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        )}
                        {value && onClear && (
                            <button
                                onClick={onClear}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm",
                                    "bg-red-500/10 text-red-400 border border-red-500/20",
                                    "hover:bg-red-500 hover:text-white hover:border-red-500"
                                )}
                                title="Clear"
                            >
                                <X size={14} />
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                <div className="relative flex-1">
                    <textarea
                        ref={ref}
                        value={value}
                        className={cn(
                            "w-full h-full min-h-[300px] resize-none rounded-2xl p-4 font-mono text-sm",
                            "bg-zinc-900/50 border border-zinc-800",
                            "focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50",
                            "placeholder:text-zinc-600 text-zinc-200",
                            "transition-all duration-200",
                            isError && "border-red-500/50 focus:ring-red-500/20 focus:border-red-500/50",
                            className
                        )}
                        spellCheck={false}
                        {...props}
                    />
                    {isError && (
                        <div className="absolute bottom-4 right-4 text-xs text-red-400 bg-red-950/80 px-2 py-1 rounded border border-red-500/20 backdrop-blur-sm">
                            Invalid Binary
                        </div>
                    )}
                </div>
            </div>
        );
    }
);
TextArea.displayName = 'TextArea';

export { TextArea };
