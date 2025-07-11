import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import.meta.env.VITE_API_URL

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
const fetchTodos = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/todos`);
  setTodos(res.data);
};

const addTodo = async () => {
  if (!task.trim()) return;
  await axios.post(`${import.meta.env.VITE_API_URL}/todos`, { task });
  setTask("");
  fetchTodos();
};

  useEffect(() => {
    fetchTodos();
  }, []);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-600 dark:bg-zinc-900 transition-colors duration-300 flex items-center justify-center p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariant}
          className="bg-white dark:bg-zinc-800 shadow-2xl rounded-3xl p-8 max-w-md w-full space-y-6 relative overflow-hidden"
        >
          {/* Toggle Switch */}
          <div className="absolute top-4 right-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-xl"
            >
              {darkMode ? "🌙" : "☀️"}
            </motion.button>
          </div>

          <motion.h1
            className="text-3xl font-bold text-gray-800 dark:text-white text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            📝 Todo List
          </motion.h1>

          {/* Input Row */}
          <motion.div
            className="flex space-x-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <input
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter a task..."
            />
            <motion.button
              onClick={addTodo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition"
            >
              Add
            </motion.button>
          </motion.div>

          {/* Todo List */}
          <motion.ul
            className="space-y-2 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-600"
            variants={containerVariant}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {todos.map((t, i) => (
                <motion.li
                  key={t._id || i}
                  variants={itemVariant}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="bg-gray-100 dark:bg-zinc-700 px-4 py-2 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-600 text-gray-800 dark:text-white"
                >
                  {t.task}
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
};

export default TodoApp;
