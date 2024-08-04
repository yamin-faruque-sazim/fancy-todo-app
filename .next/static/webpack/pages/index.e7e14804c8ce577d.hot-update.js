"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./modules/HomePage/containers/MainContainer.tsx":
/*!*******************************************************!*\
  !*** ./modules/HomePage/containers/MainContainer.tsx ***!
  \*******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mantine/core */ \"./node_modules/@mantine/core/esm/index.mjs\");\n/* harmony import */ var _components_TaskForm_TaskForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/TaskForm/TaskForm */ \"./modules/HomePage/components/TaskForm/TaskForm.tsx\");\n/* harmony import */ var _components_TaskList_TaskList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/TaskList/TaskList */ \"./modules/HomePage/components/TaskList/TaskList.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst MainContainer = ()=>{\n    _s();\n    const [tasks, setTasks] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [filter, setFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"all\");\n    const [history, setHistory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [redoArray, setRedoArray] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [editingTaskId, setEditingTaskId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const savedTasks = window.localStorage.getItem(\"my-tasks\");\n        if (savedTasks) {\n            const parsedTasks = JSON.parse(savedTasks);\n            setTasks(parsedTasks.map((task)=>({\n                    ...task,\n                    dueDate: new Date(task.dueDate)\n                })));\n        }\n    }, []);\n    // Load tasks from localStorage on the client side only\n    // Empty dependency array, runs only once on component mount\n    // Save tasks to localStorage whenever tasks state changes\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if ( true && tasks.length > 0) {\n            window.localStorage.setItem(\"my-tasks\", JSON.stringify(tasks));\n        }\n    }, [\n        tasks\n    ]);\n    const addTask = (task)=>{\n        setHistory((prevHistory)=>[\n                ...prevHistory,\n                tasks\n            ]);\n        setTasks((prevTasks)=>[\n                task,\n                ...prevTasks\n            ]);\n        setRedoArray([]);\n    };\n    const deleteTask = (id)=>{\n        setHistory((prevHistory)=>[\n                ...prevHistory,\n                tasks\n            ]);\n        setTasks((prevTasks)=>prevTasks.filter((task)=>task.id !== id));\n        setRedoArray([]);\n    };\n    const toggleCompletedTask = (id)=>{\n        setHistory((prevHistory)=>[\n                ...prevHistory,\n                tasks\n            ]);\n        setTasks((prevTasks)=>prevTasks.map((task)=>task.id === id ? {\n                    ...task,\n                    completed: !task.completed\n                } : task));\n        setRedoArray([]);\n    };\n    const deleteCompletedTasks = ()=>{\n        setHistory((prevHistory)=>[\n                ...prevHistory,\n                tasks\n            ]);\n        setTasks((prevTasks)=>prevTasks.filter((task)=>!task.completed));\n        setRedoArray([]);\n    };\n    const startEditingTask = (id)=>{\n        setEditingTaskId(id);\n    };\n    const saveTask = (updatedTask)=>{\n        setHistory((prevHistory)=>[\n                ...prevHistory,\n                tasks\n            ]);\n        setTasks((prevTasks)=>prevTasks.map((task)=>task.id === updatedTask.id ? updatedTask : task));\n        setEditingTaskId(null);\n        setRedoArray([]);\n    };\n    const undo = ()=>{\n        setHistory((prevHistory)=>{\n            if (prevHistory.length > 0) {\n                const lastState = prevHistory[prevHistory.length - 1];\n                setRedoArray((prevRedoState)=>[\n                        ...prevRedoState,\n                        tasks\n                    ]);\n                setTasks(lastState);\n                return prevHistory.slice(0, prevHistory.length - 1);\n            }\n            return prevHistory;\n        });\n    };\n    const redo = ()=>{\n        setRedoArray((prevRedoState)=>{\n            if (prevRedoState.length > 0) {\n                const nextState = prevRedoState[prevRedoState.length - 1];\n                setHistory((prevHistory)=>[\n                        ...prevHistory,\n                        tasks\n                    ]);\n                setTasks(nextState);\n                return prevRedoState.slice(0, prevRedoState.length - 1);\n            }\n            return prevRedoState;\n        });\n    };\n    const applyFilter = (tasks, filter)=>{\n        switch(filter){\n            case \"all\":\n                return tasks.sort((a, b)=>{\n                    if (a.completed && !b.completed) return 1;\n                    if (!a.completed && b.completed) return -1;\n                    return 0;\n                });\n            case \"priority-high-low\":\n                return tasks.filter((task)=>!task.completed).sort((a, b)=>a.priority - b.priority);\n            case \"priority-low-high\":\n                return tasks.filter((task)=>!task.completed).sort((a, b)=>b.priority - a.priority);\n            case \"due-date-asc\":\n                return tasks.filter((task)=>!task.completed).sort((a, b)=>a.dueDate.getTime() - b.dueDate.getTime());\n            case \"completed\":\n                return tasks.filter((task)=>task.completed);\n            case \"active\":\n                return tasks.filter((task)=>!task.completed);\n            case \"high\":\n                return tasks.filter((task)=>!task.completed).filter((task)=>task.priority === 1);\n            case \"medium\":\n                return tasks.filter((task)=>!task.completed).filter((task)=>task.priority === 2);\n            case \"low\":\n                return tasks.filter((task)=>!task.completed).filter((task)=>task.priority === 3);\n            default:\n                return tasks;\n        }\n    };\n    const filteredTasks = applyFilter(tasks, filter);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Container, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"App\",\n                children: \"To Do Application\"\n            }, void 0, false, {\n                fileName: \"Y:\\\\Work pj\\\\fancy-todo-app\\\\modules\\\\HomePage\\\\containers\\\\MainContainer.tsx\",\n                lineNumber: 150,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_TaskForm_TaskForm__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                addTask: addTask,\n                deleteCompletedTasks: deleteCompletedTasks,\n                setFilter: setFilter,\n                filter: filter\n            }, void 0, false, {\n                fileName: \"Y:\\\\Work pj\\\\fancy-todo-app\\\\modules\\\\HomePage\\\\containers\\\\MainContainer.tsx\",\n                lineNumber: 151,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                disabled: history.length === 0,\n                onClick: undo,\n                mb: 10,\n                color: \"var(--mantine-color-violet-5)\",\n                children: \"Undo\"\n            }, void 0, false, {\n                fileName: \"Y:\\\\Work pj\\\\fancy-todo-app\\\\modules\\\\HomePage\\\\containers\\\\MainContainer.tsx\",\n                lineNumber: 157,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                disabled: redoArray.length === 0,\n                onClick: redo,\n                mb: 10,\n                color: \"var(--mantine-color-pink-5)\",\n                ml: 10,\n                children: \"Redo\"\n            }, void 0, false, {\n                fileName: \"Y:\\\\Work pj\\\\fancy-todo-app\\\\modules\\\\HomePage\\\\containers\\\\MainContainer.tsx\",\n                lineNumber: 165,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_TaskList_TaskList__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                sortedTasks: filteredTasks,\n                deleteTask: deleteTask,\n                toggleCompletedTask: toggleCompletedTask,\n                startEditingTask: startEditingTask,\n                editingTaskId: editingTaskId,\n                saveTask: saveTask\n            }, void 0, false, {\n                fileName: \"Y:\\\\Work pj\\\\fancy-todo-app\\\\modules\\\\HomePage\\\\containers\\\\MainContainer.tsx\",\n                lineNumber: 174,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"Y:\\\\Work pj\\\\fancy-todo-app\\\\modules\\\\HomePage\\\\containers\\\\MainContainer.tsx\",\n        lineNumber: 149,\n        columnNumber: 5\n    }, undefined);\n};\n_s(MainContainer, \"Q5Vf1Ghv4o+ywqFp+xgDsdNZVVo=\");\n_c = MainContainer;\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainContainer);\nvar _c;\n$RefreshReg$(_c, \"MainContainer\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9tb2R1bGVzL0hvbWVQYWdlL2NvbnRhaW5lcnMvTWFpbkNvbnRhaW5lci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE0QztBQUNNO0FBRUs7QUFDQTtBQUV2RCxNQUFNTSxnQkFBMEI7O0lBQzlCLE1BQU0sQ0FBQ0MsT0FBT0MsU0FBUyxHQUFHUiwrQ0FBUUEsQ0FBUyxFQUFFO0lBQzdDLE1BQU0sQ0FBQ1MsUUFBUUMsVUFBVSxHQUFHViwrQ0FBUUEsQ0FBUztJQUM3QyxNQUFNLENBQUNXLFNBQVNDLFdBQVcsR0FBR1osK0NBQVFBLENBQVcsRUFBRTtJQUNuRCxNQUFNLENBQUNhLFdBQVdDLGFBQWEsR0FBR2QsK0NBQVFBLENBQVcsRUFBRTtJQUN2RCxNQUFNLENBQUNlLGVBQWVDLGlCQUFpQixHQUFHaEIsK0NBQVFBLENBQWdCO0lBRWxFQyxnREFBU0EsQ0FBQztRQUNSLE1BQU1nQixhQUFhQyxPQUFPQyxZQUFZLENBQUNDLE9BQU8sQ0FBQztRQUMvQyxJQUFJSCxZQUFZO1lBQ2QsTUFBTUksY0FBY0MsS0FBS0MsS0FBSyxDQUFDTjtZQUMvQlQsU0FDRWEsWUFBWUcsR0FBRyxDQUFDLENBQUNDLE9BQWdCO29CQUMvQixHQUFHQSxJQUFJO29CQUNQQyxTQUFTLElBQUlDLEtBQUtGLEtBQUtDLE9BQU87Z0JBQ2hDO1FBRUo7SUFDRixHQUFHLEVBQUU7SUFFTCx1REFBdUQ7SUFDeEQsNERBQTREO0lBRTNELDBEQUEwRDtJQUMxRHpCLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxLQUE2QixJQUFJTSxNQUFNcUIsTUFBTSxHQUFHLEdBQUc7WUFFbkRWLE9BQU9DLFlBQVksQ0FBQ1UsT0FBTyxDQUFDLFlBQVlQLEtBQUtRLFNBQVMsQ0FBQ3ZCO1FBRTNEO0lBQ0YsR0FBRztRQUFDQTtLQUFNO0lBRVYsTUFBTXdCLFVBQVUsQ0FBQ047UUFDZmIsV0FBVyxDQUFDb0IsY0FBZ0I7bUJBQUlBO2dCQUFhekI7YUFBTTtRQUNuREMsU0FBUyxDQUFDeUIsWUFBYztnQkFBQ1I7bUJBQVNRO2FBQVU7UUFDNUNuQixhQUFhLEVBQUU7SUFDakI7SUFFQSxNQUFNb0IsYUFBYSxDQUFDQztRQUNsQnZCLFdBQVcsQ0FBQ29CLGNBQWdCO21CQUFJQTtnQkFBYXpCO2FBQU07UUFDbkRDLFNBQVMsQ0FBQ3lCLFlBQWNBLFVBQVV4QixNQUFNLENBQUMsQ0FBQ2dCLE9BQVNBLEtBQUtVLEVBQUUsS0FBS0E7UUFDL0RyQixhQUFhLEVBQUU7SUFDakI7SUFFQSxNQUFNc0Isc0JBQXNCLENBQUNEO1FBQzNCdkIsV0FBVyxDQUFDb0IsY0FBZ0I7bUJBQUlBO2dCQUFhekI7YUFBTTtRQUNuREMsU0FBUyxDQUFDeUIsWUFDUkEsVUFBVVQsR0FBRyxDQUFDLENBQUNDLE9BQ2JBLEtBQUtVLEVBQUUsS0FBS0EsS0FBSztvQkFBRSxHQUFHVixJQUFJO29CQUFFWSxXQUFXLENBQUNaLEtBQUtZLFNBQVM7Z0JBQUMsSUFBSVo7UUFHL0RYLGFBQWEsRUFBRTtJQUNqQjtJQUVBLE1BQU13Qix1QkFBdUI7UUFDM0IxQixXQUFXLENBQUNvQixjQUFnQjttQkFBSUE7Z0JBQWF6QjthQUFNO1FBQ25EQyxTQUFTLENBQUN5QixZQUFjQSxVQUFVeEIsTUFBTSxDQUFDLENBQUNnQixPQUFTLENBQUNBLEtBQUtZLFNBQVM7UUFDbEV2QixhQUFhLEVBQUU7SUFDakI7SUFFQSxNQUFNeUIsbUJBQW1CLENBQUNKO1FBQ3hCbkIsaUJBQWlCbUI7SUFDbkI7SUFFQSxNQUFNSyxXQUFXLENBQUNDO1FBQ2hCN0IsV0FBVyxDQUFDb0IsY0FBZ0I7bUJBQUlBO2dCQUFhekI7YUFBTTtRQUNuREMsU0FBUyxDQUFDeUIsWUFDUkEsVUFBVVQsR0FBRyxDQUFDLENBQUNDLE9BQVVBLEtBQUtVLEVBQUUsS0FBS00sWUFBWU4sRUFBRSxHQUFHTSxjQUFjaEI7UUFFdEVULGlCQUFpQjtRQUNqQkYsYUFBYSxFQUFFO0lBQ2pCO0lBRUEsTUFBTTRCLE9BQU87UUFDWDlCLFdBQVcsQ0FBQ29CO1lBQ1YsSUFBSUEsWUFBWUosTUFBTSxHQUFHLEdBQUc7Z0JBQzFCLE1BQU1lLFlBQVlYLFdBQVcsQ0FBQ0EsWUFBWUosTUFBTSxHQUFHLEVBQUU7Z0JBQ3JEZCxhQUFhLENBQUM4QixnQkFBa0I7MkJBQUlBO3dCQUFlckM7cUJBQU07Z0JBQ3pEQyxTQUFTbUM7Z0JBQ1QsT0FBT1gsWUFBWWEsS0FBSyxDQUFDLEdBQUdiLFlBQVlKLE1BQU0sR0FBRztZQUNuRDtZQUNBLE9BQU9JO1FBQ1Q7SUFDRjtJQUVBLE1BQU1jLE9BQU87UUFDWGhDLGFBQWEsQ0FBQzhCO1lBQ1osSUFBSUEsY0FBY2hCLE1BQU0sR0FBRyxHQUFHO2dCQUM1QixNQUFNbUIsWUFBWUgsYUFBYSxDQUFDQSxjQUFjaEIsTUFBTSxHQUFHLEVBQUU7Z0JBQ3pEaEIsV0FBVyxDQUFDb0IsY0FBZ0I7MkJBQUlBO3dCQUFhekI7cUJBQU07Z0JBQ25EQyxTQUFTdUM7Z0JBQ1QsT0FBT0gsY0FBY0MsS0FBSyxDQUFDLEdBQUdELGNBQWNoQixNQUFNLEdBQUc7WUFDdkQ7WUFDQSxPQUFPZ0I7UUFDVDtJQUNGO0lBRUEsTUFBTUksY0FBYyxDQUFDekMsT0FBZUU7UUFDbEMsT0FBUUE7WUFDTixLQUFLO2dCQUNILE9BQU9GLE1BQU0wQyxJQUFJLENBQUMsQ0FBQ0MsR0FBR0M7b0JBQ3BCLElBQUlELEVBQUViLFNBQVMsSUFBSSxDQUFDYyxFQUFFZCxTQUFTLEVBQUUsT0FBTztvQkFDeEMsSUFBSSxDQUFDYSxFQUFFYixTQUFTLElBQUljLEVBQUVkLFNBQVMsRUFBRSxPQUFPLENBQUM7b0JBQ3pDLE9BQU87Z0JBQ1Q7WUFDRixLQUFLO2dCQUNILE9BQU85QixNQUNKRSxNQUFNLENBQUMsQ0FBQ2dCLE9BQVMsQ0FBQ0EsS0FBS1ksU0FBUyxFQUNoQ1ksSUFBSSxDQUFDLENBQUNDLEdBQUdDLElBQU1ELEVBQUVFLFFBQVEsR0FBR0QsRUFBRUMsUUFBUTtZQUMzQyxLQUFLO2dCQUNILE9BQU83QyxNQUNKRSxNQUFNLENBQUMsQ0FBQ2dCLE9BQVMsQ0FBQ0EsS0FBS1ksU0FBUyxFQUNoQ1ksSUFBSSxDQUFDLENBQUNDLEdBQUdDLElBQU1BLEVBQUVDLFFBQVEsR0FBR0YsRUFBRUUsUUFBUTtZQUMzQyxLQUFLO2dCQUNILE9BQU83QyxNQUNKRSxNQUFNLENBQUMsQ0FBQ2dCLE9BQVMsQ0FBQ0EsS0FBS1ksU0FBUyxFQUNoQ1ksSUFBSSxDQUFDLENBQUNDLEdBQUdDLElBQU1ELEVBQUV4QixPQUFPLENBQUMyQixPQUFPLEtBQUtGLEVBQUV6QixPQUFPLENBQUMyQixPQUFPO1lBQzNELEtBQUs7Z0JBQ0gsT0FBTzlDLE1BQU1FLE1BQU0sQ0FBQyxDQUFDZ0IsT0FBU0EsS0FBS1ksU0FBUztZQUM5QyxLQUFLO2dCQUNILE9BQU85QixNQUFNRSxNQUFNLENBQUMsQ0FBQ2dCLE9BQVMsQ0FBQ0EsS0FBS1ksU0FBUztZQUMvQyxLQUFLO2dCQUNILE9BQU85QixNQUNKRSxNQUFNLENBQUMsQ0FBQ2dCLE9BQVMsQ0FBQ0EsS0FBS1ksU0FBUyxFQUNoQzVCLE1BQU0sQ0FBQyxDQUFDZ0IsT0FBU0EsS0FBSzJCLFFBQVEsS0FBSztZQUN4QyxLQUFLO2dCQUNILE9BQU83QyxNQUNKRSxNQUFNLENBQUMsQ0FBQ2dCLE9BQVMsQ0FBQ0EsS0FBS1ksU0FBUyxFQUNoQzVCLE1BQU0sQ0FBQyxDQUFDZ0IsT0FBU0EsS0FBSzJCLFFBQVEsS0FBSztZQUN4QyxLQUFLO2dCQUNILE9BQU83QyxNQUNKRSxNQUFNLENBQUMsQ0FBQ2dCLE9BQVMsQ0FBQ0EsS0FBS1ksU0FBUyxFQUNoQzVCLE1BQU0sQ0FBQyxDQUFDZ0IsT0FBU0EsS0FBSzJCLFFBQVEsS0FBSztZQUV4QztnQkFDRSxPQUFPN0M7UUFDWDtJQUNGO0lBRUEsTUFBTStDLGdCQUFnQk4sWUFBWXpDLE9BQU9FO0lBRXpDLHFCQUNFLDhEQUFDTixvREFBU0E7OzBCQUNSLDhEQUFDb0Q7Z0JBQUdDLFdBQVU7MEJBQU07Ozs7OzswQkFDcEIsOERBQUNwRCxxRUFBUUE7Z0JBQ1AyQixTQUFTQTtnQkFDVE8sc0JBQXNCQTtnQkFDdEI1QixXQUFXQTtnQkFDWEQsUUFBUUE7Ozs7OzswQkFFViw4REFBQ1AsaURBQU1BO2dCQUNMdUQsVUFBVTlDLFFBQVFpQixNQUFNLEtBQUs7Z0JBQzdCOEIsU0FBU2hCO2dCQUNUaUIsSUFBSTtnQkFDSkMsT0FBUTswQkFDVDs7Ozs7OzBCQUdELDhEQUFDMUQsaURBQU1BO2dCQUNMdUQsVUFBVTVDLFVBQVVlLE1BQU0sS0FBSztnQkFDL0I4QixTQUFTWjtnQkFDVGEsSUFBSTtnQkFDSkMsT0FBUTtnQkFDUkMsSUFBSTswQkFDTDs7Ozs7OzBCQUdELDhEQUFDeEQscUVBQVFBO2dCQUNQeUQsYUFBYVI7Z0JBQ2JwQixZQUFZQTtnQkFDWkUscUJBQXFCQTtnQkFDckJHLGtCQUFrQkE7Z0JBQ2xCeEIsZUFBZUE7Z0JBQ2Z5QixVQUFVQTs7Ozs7Ozs7Ozs7O0FBSWxCO0dBakxNbEM7S0FBQUE7QUFtTE4sK0RBQWVBLGFBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbW9kdWxlcy9Ib21lUGFnZS9jb250YWluZXJzL01haW5Db250YWluZXIudHN4P2NhYjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBCdXR0b24sIENvbnRhaW5lciB9IGZyb20gXCJAbWFudGluZS9jb3JlXCI7XHJcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vdHlwZXMvVGFza1wiO1xyXG5pbXBvcnQgVGFza0Zvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvVGFza0Zvcm0vVGFza0Zvcm1cIjtcclxuaW1wb3J0IFRhc2tMaXN0IGZyb20gXCIuLi9jb21wb25lbnRzL1Rhc2tMaXN0L1Rhc2tMaXN0XCI7XHJcblxyXG5jb25zdCBNYWluQ29udGFpbmVyOiBSZWFjdC5GQyA9ICgpID0+IHtcclxuICBjb25zdCBbdGFza3MsIHNldFRhc2tzXSA9IHVzZVN0YXRlPFRhc2tbXT4oW10pO1xyXG4gIGNvbnN0IFtmaWx0ZXIsIHNldEZpbHRlcl0gPSB1c2VTdGF0ZTxzdHJpbmc+KFwiYWxsXCIpO1xyXG4gIGNvbnN0IFtoaXN0b3J5LCBzZXRIaXN0b3J5XSA9IHVzZVN0YXRlPFRhc2tbXVtdPihbXSk7XHJcbiAgY29uc3QgW3JlZG9BcnJheSwgc2V0UmVkb0FycmF5XSA9IHVzZVN0YXRlPFRhc2tbXVtdPihbXSk7XHJcbiAgY29uc3QgW2VkaXRpbmdUYXNrSWQsIHNldEVkaXRpbmdUYXNrSWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBzYXZlZFRhc2tzID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibXktdGFza3NcIik7XHJcbiAgICBpZiAoc2F2ZWRUYXNrcykge1xyXG4gICAgICBjb25zdCBwYXJzZWRUYXNrcyA9IEpTT04ucGFyc2Uoc2F2ZWRUYXNrcyk7XHJcbiAgICAgIHNldFRhc2tzKFxyXG4gICAgICAgIHBhcnNlZFRhc2tzLm1hcCgodGFzazogVGFzaykgPT4gKHtcclxuICAgICAgICAgIC4uLnRhc2ssXHJcbiAgICAgICAgICBkdWVEYXRlOiBuZXcgRGF0ZSh0YXNrLmR1ZURhdGUpLFxyXG4gICAgICAgIH0pKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gTG9hZCB0YXNrcyBmcm9tIGxvY2FsU3RvcmFnZSBvbiB0aGUgY2xpZW50IHNpZGUgb25seVxyXG4gLy8gRW1wdHkgZGVwZW5kZW5jeSBhcnJheSwgcnVucyBvbmx5IG9uY2Ugb24gY29tcG9uZW50IG1vdW50XHJcblxyXG4gIC8vIFNhdmUgdGFza3MgdG8gbG9jYWxTdG9yYWdlIHdoZW5ldmVyIHRhc2tzIHN0YXRlIGNoYW5nZXNcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgdGFza3MubGVuZ3RoID4gMCkge1xyXG4gICAgICBcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJteS10YXNrc1wiLCBKU09OLnN0cmluZ2lmeSh0YXNrcykpO1xyXG5cclxuICAgIH1cclxuICB9LCBbdGFza3NdKTtcclxuXHJcbiAgY29uc3QgYWRkVGFzayA9ICh0YXNrOiBUYXNrKSA9PiB7XHJcbiAgICBzZXRIaXN0b3J5KChwcmV2SGlzdG9yeSkgPT4gWy4uLnByZXZIaXN0b3J5LCB0YXNrc10pO1xyXG4gICAgc2V0VGFza3MoKHByZXZUYXNrcykgPT4gW3Rhc2ssIC4uLnByZXZUYXNrc10pO1xyXG4gICAgc2V0UmVkb0FycmF5KFtdKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBkZWxldGVUYXNrID0gKGlkOiBzdHJpbmcpID0+IHtcclxuICAgIHNldEhpc3RvcnkoKHByZXZIaXN0b3J5KSA9PiBbLi4ucHJldkhpc3RvcnksIHRhc2tzXSk7XHJcbiAgICBzZXRUYXNrcygocHJldlRhc2tzKSA9PiBwcmV2VGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmlkICE9PSBpZCkpO1xyXG4gICAgc2V0UmVkb0FycmF5KFtdKTtcclxuICB9O1xyXG5cclxuICBjb25zdCB0b2dnbGVDb21wbGV0ZWRUYXNrID0gKGlkOiBzdHJpbmcpID0+IHtcclxuICAgIHNldEhpc3RvcnkoKHByZXZIaXN0b3J5KSA9PiBbLi4ucHJldkhpc3RvcnksIHRhc2tzXSk7XHJcbiAgICBzZXRUYXNrcygocHJldlRhc2tzKSA9PlxyXG4gICAgICBwcmV2VGFza3MubWFwKCh0YXNrKSA9PlxyXG4gICAgICAgIHRhc2suaWQgPT09IGlkID8geyAuLi50YXNrLCBjb21wbGV0ZWQ6ICF0YXNrLmNvbXBsZXRlZCB9IDogdGFza1xyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgc2V0UmVkb0FycmF5KFtdKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBkZWxldGVDb21wbGV0ZWRUYXNrcyA9ICgpID0+IHtcclxuICAgIHNldEhpc3RvcnkoKHByZXZIaXN0b3J5KSA9PiBbLi4ucHJldkhpc3RvcnksIHRhc2tzXSk7XHJcbiAgICBzZXRUYXNrcygocHJldlRhc2tzKSA9PiBwcmV2VGFza3MuZmlsdGVyKCh0YXNrKSA9PiAhdGFzay5jb21wbGV0ZWQpKTtcclxuICAgIHNldFJlZG9BcnJheShbXSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc3RhcnRFZGl0aW5nVGFzayA9IChpZDogc3RyaW5nKSA9PiB7XHJcbiAgICBzZXRFZGl0aW5nVGFza0lkKGlkKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzYXZlVGFzayA9ICh1cGRhdGVkVGFzazogVGFzaykgPT4ge1xyXG4gICAgc2V0SGlzdG9yeSgocHJldkhpc3RvcnkpID0+IFsuLi5wcmV2SGlzdG9yeSwgdGFza3NdKTtcclxuICAgIHNldFRhc2tzKChwcmV2VGFza3MpID0+XHJcbiAgICAgIHByZXZUYXNrcy5tYXAoKHRhc2spID0+ICh0YXNrLmlkID09PSB1cGRhdGVkVGFzay5pZCA/IHVwZGF0ZWRUYXNrIDogdGFzaykpXHJcbiAgICApO1xyXG4gICAgc2V0RWRpdGluZ1Rhc2tJZChudWxsKTtcclxuICAgIHNldFJlZG9BcnJheShbXSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdW5kbyA9ICgpID0+IHtcclxuICAgIHNldEhpc3RvcnkoKHByZXZIaXN0b3J5KSA9PiB7XHJcbiAgICAgIGlmIChwcmV2SGlzdG9yeS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgbGFzdFN0YXRlID0gcHJldkhpc3RvcnlbcHJldkhpc3RvcnkubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgc2V0UmVkb0FycmF5KChwcmV2UmVkb1N0YXRlKSA9PiBbLi4ucHJldlJlZG9TdGF0ZSwgdGFza3NdKTtcclxuICAgICAgICBzZXRUYXNrcyhsYXN0U3RhdGUpO1xyXG4gICAgICAgIHJldHVybiBwcmV2SGlzdG9yeS5zbGljZSgwLCBwcmV2SGlzdG9yeS5sZW5ndGggLSAxKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcHJldkhpc3Rvcnk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZWRvID0gKCkgPT4ge1xyXG4gICAgc2V0UmVkb0FycmF5KChwcmV2UmVkb1N0YXRlKSA9PiB7XHJcbiAgICAgIGlmIChwcmV2UmVkb1N0YXRlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSBwcmV2UmVkb1N0YXRlW3ByZXZSZWRvU3RhdGUubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgc2V0SGlzdG9yeSgocHJldkhpc3RvcnkpID0+IFsuLi5wcmV2SGlzdG9yeSwgdGFza3NdKTtcclxuICAgICAgICBzZXRUYXNrcyhuZXh0U3RhdGUpO1xyXG4gICAgICAgIHJldHVybiBwcmV2UmVkb1N0YXRlLnNsaWNlKDAsIHByZXZSZWRvU3RhdGUubGVuZ3RoIC0gMSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHByZXZSZWRvU3RhdGU7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBhcHBseUZpbHRlciA9ICh0YXNrczogVGFza1tdLCBmaWx0ZXI6IHN0cmluZyk6IFRhc2tbXSA9PiB7XHJcbiAgICBzd2l0Y2ggKGZpbHRlcikge1xyXG4gICAgICBjYXNlIFwiYWxsXCI6XHJcbiAgICAgICAgcmV0dXJuIHRhc2tzLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgIGlmIChhLmNvbXBsZXRlZCAmJiAhYi5jb21wbGV0ZWQpIHJldHVybiAxO1xyXG4gICAgICAgICAgaWYgKCFhLmNvbXBsZXRlZCAmJiBiLmNvbXBsZXRlZCkgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIGNhc2UgXCJwcmlvcml0eS1oaWdoLWxvd1wiOlxyXG4gICAgICAgIHJldHVybiB0YXNrc1xyXG4gICAgICAgICAgLmZpbHRlcigodGFzaykgPT4gIXRhc2suY29tcGxldGVkKVxyXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucHJpb3JpdHkgLSBiLnByaW9yaXR5KTtcclxuICAgICAgY2FzZSBcInByaW9yaXR5LWxvdy1oaWdoXCI6XHJcbiAgICAgICAgcmV0dXJuIHRhc2tzXHJcbiAgICAgICAgICAuZmlsdGVyKCh0YXNrKSA9PiAhdGFzay5jb21wbGV0ZWQpXHJcbiAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYi5wcmlvcml0eSAtIGEucHJpb3JpdHkpO1xyXG4gICAgICBjYXNlIFwiZHVlLWRhdGUtYXNjXCI6XHJcbiAgICAgICAgcmV0dXJuIHRhc2tzXHJcbiAgICAgICAgICAuZmlsdGVyKCh0YXNrKSA9PiAhdGFzay5jb21wbGV0ZWQpXHJcbiAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5kdWVEYXRlLmdldFRpbWUoKSAtIGIuZHVlRGF0ZS5nZXRUaW1lKCkpO1xyXG4gICAgICBjYXNlIFwiY29tcGxldGVkXCI6XHJcbiAgICAgICAgcmV0dXJuIHRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5jb21wbGV0ZWQpO1xyXG4gICAgICBjYXNlIFwiYWN0aXZlXCI6XHJcbiAgICAgICAgcmV0dXJuIHRhc2tzLmZpbHRlcigodGFzaykgPT4gIXRhc2suY29tcGxldGVkKTtcclxuICAgICAgY2FzZSBcImhpZ2hcIjpcclxuICAgICAgICByZXR1cm4gdGFza3NcclxuICAgICAgICAgIC5maWx0ZXIoKHRhc2spID0+ICF0YXNrLmNvbXBsZXRlZClcclxuICAgICAgICAgIC5maWx0ZXIoKHRhc2spID0+IHRhc2sucHJpb3JpdHkgPT09IDEpO1xyXG4gICAgICBjYXNlIFwibWVkaXVtXCI6XHJcbiAgICAgICAgcmV0dXJuIHRhc2tzXHJcbiAgICAgICAgICAuZmlsdGVyKCh0YXNrKSA9PiAhdGFzay5jb21wbGV0ZWQpXHJcbiAgICAgICAgICAuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnByaW9yaXR5ID09PSAyKTtcclxuICAgICAgY2FzZSBcImxvd1wiOlxyXG4gICAgICAgIHJldHVybiB0YXNrc1xyXG4gICAgICAgICAgLmZpbHRlcigodGFzaykgPT4gIXRhc2suY29tcGxldGVkKVxyXG4gICAgICAgICAgLmZpbHRlcigodGFzaykgPT4gdGFzay5wcmlvcml0eSA9PT0gMyk7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiB0YXNrcztcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBmaWx0ZXJlZFRhc2tzID0gYXBwbHlGaWx0ZXIodGFza3MsIGZpbHRlcik7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Q29udGFpbmVyPlxyXG4gICAgICA8aDEgY2xhc3NOYW1lPVwiQXBwXCI+VG8gRG8gQXBwbGljYXRpb248L2gxPlxyXG4gICAgICA8VGFza0Zvcm1cclxuICAgICAgICBhZGRUYXNrPXthZGRUYXNrfVxyXG4gICAgICAgIGRlbGV0ZUNvbXBsZXRlZFRhc2tzPXtkZWxldGVDb21wbGV0ZWRUYXNrc31cclxuICAgICAgICBzZXRGaWx0ZXI9e3NldEZpbHRlcn1cclxuICAgICAgICBmaWx0ZXI9e2ZpbHRlcn1cclxuICAgICAgLz5cclxuICAgICAgPEJ1dHRvblxyXG4gICAgICAgIGRpc2FibGVkPXtoaXN0b3J5Lmxlbmd0aCA9PT0gMH1cclxuICAgICAgICBvbkNsaWNrPXt1bmRvfVxyXG4gICAgICAgIG1iPXsxMH1cclxuICAgICAgICBjb2xvcj17YHZhcigtLW1hbnRpbmUtY29sb3ItdmlvbGV0LTUpYH1cclxuICAgICAgPlxyXG4gICAgICAgIFVuZG9cclxuICAgICAgPC9CdXR0b24+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBkaXNhYmxlZD17cmVkb0FycmF5Lmxlbmd0aCA9PT0gMH1cclxuICAgICAgICBvbkNsaWNrPXtyZWRvfVxyXG4gICAgICAgIG1iPXsxMH1cclxuICAgICAgICBjb2xvcj17YHZhcigtLW1hbnRpbmUtY29sb3ItcGluay01KWB9XHJcbiAgICAgICAgbWw9ezEwfVxyXG4gICAgICA+XHJcbiAgICAgICAgUmVkb1xyXG4gICAgICA8L0J1dHRvbj5cclxuICAgICAgPFRhc2tMaXN0XHJcbiAgICAgICAgc29ydGVkVGFza3M9e2ZpbHRlcmVkVGFza3N9XHJcbiAgICAgICAgZGVsZXRlVGFzaz17ZGVsZXRlVGFza31cclxuICAgICAgICB0b2dnbGVDb21wbGV0ZWRUYXNrPXt0b2dnbGVDb21wbGV0ZWRUYXNrfVxyXG4gICAgICAgIHN0YXJ0RWRpdGluZ1Rhc2s9e3N0YXJ0RWRpdGluZ1Rhc2t9XHJcbiAgICAgICAgZWRpdGluZ1Rhc2tJZD17ZWRpdGluZ1Rhc2tJZH1cclxuICAgICAgICBzYXZlVGFzaz17c2F2ZVRhc2t9XHJcbiAgICAgIC8+XHJcbiAgICA8L0NvbnRhaW5lcj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFpbkNvbnRhaW5lcjtcclxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiQnV0dG9uIiwiQ29udGFpbmVyIiwiVGFza0Zvcm0iLCJUYXNrTGlzdCIsIk1haW5Db250YWluZXIiLCJ0YXNrcyIsInNldFRhc2tzIiwiZmlsdGVyIiwic2V0RmlsdGVyIiwiaGlzdG9yeSIsInNldEhpc3RvcnkiLCJyZWRvQXJyYXkiLCJzZXRSZWRvQXJyYXkiLCJlZGl0aW5nVGFza0lkIiwic2V0RWRpdGluZ1Rhc2tJZCIsInNhdmVkVGFza3MiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicGFyc2VkVGFza3MiLCJKU09OIiwicGFyc2UiLCJtYXAiLCJ0YXNrIiwiZHVlRGF0ZSIsIkRhdGUiLCJsZW5ndGgiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiYWRkVGFzayIsInByZXZIaXN0b3J5IiwicHJldlRhc2tzIiwiZGVsZXRlVGFzayIsImlkIiwidG9nZ2xlQ29tcGxldGVkVGFzayIsImNvbXBsZXRlZCIsImRlbGV0ZUNvbXBsZXRlZFRhc2tzIiwic3RhcnRFZGl0aW5nVGFzayIsInNhdmVUYXNrIiwidXBkYXRlZFRhc2siLCJ1bmRvIiwibGFzdFN0YXRlIiwicHJldlJlZG9TdGF0ZSIsInNsaWNlIiwicmVkbyIsIm5leHRTdGF0ZSIsImFwcGx5RmlsdGVyIiwic29ydCIsImEiLCJiIiwicHJpb3JpdHkiLCJnZXRUaW1lIiwiZmlsdGVyZWRUYXNrcyIsImgxIiwiY2xhc3NOYW1lIiwiZGlzYWJsZWQiLCJvbkNsaWNrIiwibWIiLCJjb2xvciIsIm1sIiwic29ydGVkVGFza3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./modules/HomePage/containers/MainContainer.tsx\n"));

/***/ })

});