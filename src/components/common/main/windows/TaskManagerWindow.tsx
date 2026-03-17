"use client";

import React, { useState } from "react";
import Window from "../Window";
import { FiCheckCircle, FiCircle, FiPlus, FiAward, FiZap, FiTarget } from "react-icons/fi";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  xp: number;
}

export default function TaskManagerWindow() {
  const { textColor, mutedTextColor, borderColor, hoverBg, panelBg } = useChatTheme();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Read Chapter 4 of Physics", completed: false, xp: 50 },
    { id: 2, text: "Complete Next.js Assignment", completed: true, xp: 100 },
    { id: 3, text: "Review Weekly Goal", completed: false, xp: 30 }
  ]);
  const [newTask, setNewTask] = useState("");
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(140);
  const xpForNextLevel = 1000;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, xp: 50 }]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextCompleted = !t.completed;
        if (nextCompleted) setXp(prev => prev + t.xp);
        else setXp(prev => Math.max(0, prev - t.xp));
        return { ...t, completed: nextCompleted };
      }
      return t;
    }));
  };

  const xpProgress = (xp / xpForNextLevel) * 100;

  return (
    <Window 
      id="tasks" 
      title="Quest Log" 
      icon={<FiTarget size={18} />}
      width="500px"
      height="600px"
    >
      <div className="flex flex-col h-full">
        {/* User Progress Header */}
        <div className={`p-6 border-b ${borderColor} ${panelBg}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white shadow-lg">
                <FiAward size={24} />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${textColor}`}>Master Scholar</h3>
                <p className={`text-xs font-medium text-amber-500 uppercase tracking-widest`}>Level {level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${textColor}`}>{xp} <span className={mutedTextColor}>XP</span></p>
              <p className={`text-[10px] font-bold ${mutedTextColor}`}>Next goal: {xpForNextLevel} XP</p>
            </div>
          </div>
          
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 relative shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-500 relative"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px]" />
            </motion.div>
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
          <h4 className={`text-[11px] font-bold uppercase tracking-widest ${mutedTextColor} mb-4`}>Active Objectives</h4>
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${task.completed ? `${borderColor} bg-white/5 opacity-60` : `${borderColor} ${hoverBg}`}`}
                onClick={() => toggleTask(task.id)}
              >
                <div className="flex items-center gap-4">
                  {task.completed ? (
                    <FiCheckCircle className="text-emerald-500" size={20} />
                  ) : (
                    <FiCircle className={mutedTextColor} size={20} />
                  )}
                  <span className={`text-[15px] font-medium transition-all ${task.completed ? 'line-through' : textColor}`}>
                    {task.text}
                  </span>
                </div>
                {!task.completed && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
                    <FiZap size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-bold text-amber-500">+{task.xp} XP</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Task Input */}
        <form onSubmit={handleAddTask} className={`p-6 border-t ${borderColor} ${panelBg}`}>
          <div className="relative">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new study quest..."
              className={`w-full py-4 pl-4 pr-16 rounded-[1.25rem] border ${borderColor} bg-transparent outline-none focus:border-emerald-500/50 transition-colors ${textColor} text-[15px]`}
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 w-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
            >
              <FiPlus size={20} />
            </button>
          </div>
        </form>
      </div>
    </Window>
  );
}
