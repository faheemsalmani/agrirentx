'use client';

import { useState, useEffect } from 'react';
import { Terminal, X, ChevronUp, ChevronDown, Activity, AlertCircle } from 'lucide-react';

interface Log {
    id: number;
    timestamp: string;
    message: string;
    type: 'info' | 'warn' | 'error';
}

export default function DebugPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [logs, setLogs] = useState<Log[]>([]);
    const [performance, setPerformance] = useState({ fps: 0, memory: 0 });

    useEffect(() => {
        // Mock performance monitoring
        const interval = setInterval(() => {
            setPerformance({
                fps: Math.round(55 + Math.random() * 5), // Mock FPS
                memory: Math.round(performance.memory ? performance.memory : (window.performance as any).memory?.usedJSHeapSize / 1048576 || 0),
            });
        }, 1000);

        // Override console methods to capture logs
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;

        const addLog = (message: string, type: 'info' | 'warn' | 'error') => {
            setLogs(prev => [
                {
                    id: Date.now(),
                    timestamp: new Date().toLocaleTimeString(),
                    message,
                    type
                },
                ...prev.slice(0, 49) // Keep last 50 logs
            ]);
        };

        console.log = (...args) => {
            originalLog(...args);
            addLog(args.map(a => String(a)).join(' '), 'info');
        };

        console.warn = (...args) => {
            originalWarn(...args);
            addLog(args.map(a => String(a)).join(' '), 'warn');
        };

        console.error = (...args) => {
            originalError(...args);
            addLog(args.map(a => String(a)).join(' '), 'error');
        };

        // Initial logs
        console.log('AgriRentX UI initialized.');
        console.log('Premium theme loaded: Brand-Green-500');
        console.log('Viewport width: ' + window.innerWidth);

        return () => {
            clearInterval(interval);
            console.log = originalLog;
            console.warn = originalWarn;
            console.error = originalError;
        };
    }, []);

    if (process.env.NODE_ENV === 'production' && !isOpen) return null; // Hide in prod unless manually triggered (simulated here)

    return (
        <div className={`fixed bottom-4 right-4 z-[100] transition-all duration-300 ${isOpen ? 'w-96' : 'w-auto'}`}>
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden font-mono text-xs text-green-400">

                {/* Header */}
                <div
                    className="flex items-center justify-between px-3 py-2 bg-gray-800 cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center space-x-2">
                        <Terminal className="w-4 h-4" />
                        <span className="font-bold">System Status</span>
                        {isOpen && <span className="text-gray-500">|</span>}
                        {isOpen && (
                            <div className="flex space-x-3 text-[10px] text-gray-400">
                                <span className="flex items-center"><Activity className="w-3 h-3 mr-1" /> {performance.fps} FPS</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        {logs.some(l => l.type === 'error') && <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />}
                        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </div>
                </div>

                {/* Content */}
                {isOpen && (
                    <div className="h-64 overflow-y-auto p-2 bg-black/90 space-y-1">
                        {logs.length === 0 && <span className="text-gray-500 italic">No logs captured...</span>}
                        {logs.map((log) => (
                            <div key={log.id} className="flex space-x-2 border-b border-white/5 pb-1 mb-1 last:border-0">
                                <span className="text-gray-500 flex-shrink-0">[{log.timestamp}]</span>
                                <span className={`${log.type === 'error' ? 'text-red-400 font-bold' :
                                        log.type === 'warn' ? 'text-yellow-400' : 'text-green-400'
                                    }`}>
                                    {log.type === 'error' && 'ERROR: '}
                                    {log.message}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
