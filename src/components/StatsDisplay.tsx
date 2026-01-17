import * as React from 'react';
import { motion } from 'framer-motion';
import { Hash, AlignLeft, HardDrive } from 'lucide-react';

interface StatsDisplayProps {
    text: string;
}

export function StatsDisplay({ text }: StatsDisplayProps) {
    const stats = React.useMemo(() => {
        return {
            chars: text.length,
            words: text.trim() ? text.trim().split(/\s+/).length : 0,
            bytes: new TextEncoder().encode(text).length
        };
    }, [text]);

    return (
        <div className="flex flex-wrap items-center justify-center gap-4 py-4 px-6 bg-zinc-900/50 border-y border-emerald-500/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <Hash size={14} className="text-emerald-500" />
                <span><span className="font-mono text-emerald-400">{stats.chars}</span> Characters</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <AlignLeft size={14} className="text-teal-500" />
                <span><span className="font-mono text-teal-400">{stats.words}</span> Words</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <HardDrive size={14} className="text-cyan-500" />
                <span><span className="font-mono text-cyan-400">{stats.bytes}</span> Bytes (UTF-8)</span>
            </div>
        </div>
    );
}
