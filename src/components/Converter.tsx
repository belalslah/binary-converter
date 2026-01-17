'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Binary, Type, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { StatsDisplay } from '@/components/StatsDisplay';
import { textToBinary, binaryToText } from '@/lib/converter';

export function Converter() {
    const [text, setText] = React.useState('');
    const [binary, setBinary] = React.useState('');
    const [error, setError] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Auto-convert Text -> Binary
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);
        setError(false);

        try {
            if (!newText) {
                setBinary('');
                return;
            }
            const result = textToBinary(newText);
            setBinary(result);
        } catch (err) {
            console.error(err);
            // Fail silently on typing, or clear binary? Usually keep last valid or clear.
            // For text->binary it's hard to fail, but safeguards are good.
        }
    };

    // Auto-convert Binary -> Text
    const handleBinaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newBinary = e.target.value;
        setBinary(newBinary);

        try {
            if (!newBinary.trim()) {
                setText('');
                setError(false);
                return;
            }
            const result = binaryToText(newBinary);
            setText(result);
            setError(false);
        } catch (err) {
            // Don't update text if binary is invalid (e.g. user typing '2')
            // but do set error flag
            setError(true);
            // We keep the old text or perhaps don't clear it to avoid flickering.
        }
    };

    const clearAll = () => {
        setText('');
        setBinary('');
        setError(false);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setText(content);
            // Trigger the sync
            try {
                setBinary(textToBinary(content));
                setError(false);
            } catch (err) {
                console.error(err);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const downloadResult = () => {
        const element = document.createElement("a");
        const file = new Blob([binary], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "binary_output.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
            {/* Header Section */}
            <div className="mb-8 md:mb-12 text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-xs text-zinc-400 font-medium"
                >
                    <Sparkles size={12} className="text-emerald-400" />
                    <span>Premium Conversion Tool</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4"
                >
                    Text <span className="text-zinc-600">to</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Binary</span>
                </motion.h1>
            </div>

            {/* Main Converter Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="glass-panel rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/10 ring-1 ring-white/10"
            >
                {/* Statistics Bar */}
                <StatsDisplay text={text} />

                <div className="flex flex-col lg:flex-row gap-6 bg-zinc-950/40 p-6 md:p-8">

                    {/* Text Input Section */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex items-center justify-between pb-2 border-b border-emerald-500/10">
                            <div className="flex items-center gap-2 text-emerald-400 font-medium">
                                <Type size={18} />
                                <h3>Plain Text</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".txt"
                                    onChange={handleFileUpload}
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-xs h-7 gap-1.5 text-zinc-400 hover:text-emerald-400"
                                >
                                    <Upload size={12} /> Upload .txt
                                </Button>
                            </div>
                        </div>
                        <TextArea
                            label="Enter text or paste here..."
                            placeholder="Type here to convert instantly..."
                            value={text}
                            onChange={handleTextChange}
                            onClear={() => {
                                setText('');
                                setBinary('');
                                setError(false);
                            }}
                            className="min-h-[300px]"
                        />
                    </div>

                    {/* Divider - Responsive */}
                    <div className="hidden lg:flex items-center justify-center">
                        <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />
                    </div>
                    <div className="lg:hidden w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

                    {/* Binary Input Section */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex items-center justify-between pb-2 border-b border-teal-500/10">
                            <div className="flex items-center gap-2 text-teal-400 font-medium">
                                <Binary size={18} />
                                <h3>Binary Output</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                {binary && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={downloadResult}
                                        className="text-xs h-7 gap-1.5 text-zinc-400 hover:text-teal-400"
                                    >
                                        <Download size={12} /> Download
                                    </Button>
                                )}
                            </div>
                        </div>
                        <TextArea
                            label="Binary result"
                            placeholder="Or type/paste binary here..."
                            value={binary}
                            onChange={handleBinaryChange}
                            onClear={() => {
                                setBinary('');
                                setText('');
                                setError(false);
                            }}
                            isError={error}
                            className="min-h-[300px] font-mono text-xs md:text-sm tracking-wide leading-relaxed"
                        />
                    </div>

                </div>

                {/* Footer Actions inside Card */}
                <div className="px-6 py-4 bg-zinc-900/30 border-t border-white/5 flex justify-center md:justify-end gap-3">
                    <Button
                        onClick={clearAll}
                        className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm px-6"
                        size="sm"
                    >
                        Reset All
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
