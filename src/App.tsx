import { lazy } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import { ThemeColorProvider } from './hooks/useThemeColor';
import { store } from './store';
import './styles.css';



// Ленивая загрузка компонентов упражнений
const Home = lazy(() => import('./modules/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
// const Exercise1 = lazy(() => import('./exercises/Exercise1'));
// const Exercise2 = lazy(() => import('./exercises/Exercise2'));
// const Exercise3 = lazy(() => import('./exercises/Exercise3'));
// const Exercise4 = lazy(() => import('./exercises/Exercise4'));
// const Exercise5 = lazy(() => import('./exercises/Exercise5'));
// const Exercise6 = lazy(() => import('./exercises/Exercise6'));
// const Exercise7 = lazy(() => import('./exercises/Exercise7'));
// const Exercise8 = lazy(() => import('./exercises/Exercise8/Exercise8'));
// const Exercise9 = lazy(() => import('./exercises/Exercise9/Exercise9'));
// const Exercise10 = lazy(() => import('./exercises/Exercise10/Exercise10'));

// Добавьте больше упражнений по мере необходимости


function App() {
    // return <RouterTest/>
    return (
  
        <Provider store={store}>
            <Router>
                <ThemeColorProvider>
                    <Routes>
                        <Route element={<Layout/>}>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/tasks" element={<Tasks/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                        </Route>
                    </Routes>
                </ThemeColorProvider>
            </Router>
        </Provider>

    )
    // return (
    //     <ThemeProvider>
    //         <Provider store={store}>
    //             <Router>
    //                 <div className="app-container">
    //                     <nav className="main-nav">
    //                         <div className="logo">React Advanced</div>
    //                         <ul className="nav-links">
    //                             <li><Link to="/">Главная</Link></li>
    //                             {/*<li><Link to="/exercise1">Упр 1: Хуки и События</Link></li>*/}
    //                             {/*<li><Link to="/exercise2">Упр 2</Link></li>*/}
    //                             {/*<li><Link to="/exercise3">Упр 3</Link></li>*/}
    //                             {/*<li><Link to="/exercise4">Упр 4</Link></li>*/}
    //                             {/*<li><Link to="/exercise5">Упр 5</Link></li>*/}
    //                             {/*<li><Link to="/exercise6">Упр 6</Link></li>*/}
    //                             {/*<li><Link to="/exercise7">Упр 7</Link></li>*/}
    //                             {/*<li><Link to="/exercise8">Упр 8</Link></li>*/}
    //                             {/*<li><Link to="/exercise9">Упр 9</Link></li>*/}
    //                             {/*<li><Link to="/exercise10">Упр 10</Link></li>*/}
    //                         </ul>
    //                     </nav>
    //
    //                     <main className="content">
    //                         <Suspense fallback={<div className="loading">Загрузка...</div>}>
    //                             <Routes>
    //                                 {/*<Route path="/" element={<Home/>}  />*/}
    //                                 {/*<Route path="/exercise1" element={<Exercise1/>}/>*/}
    //                                 {/*<Route path="/exercise2" element={<Exercise2/>}/>*/}
    //                                 {/*<Route path="/exercise3" element={<Exercise3/>}/>*/}
    //                                 {/*<Route path="/exercise4" element={<Exercise4/>}/>*/}
    //                                 {/*<Route path="/exercise5" element={<Exercise5/>}/>*/}
    //                                 {/*<Route path="/exercise6" element={<Exercise6/>}/>*/}
    //                                 {/*<Route path="/exercise7" element={<Exercise7/>}/>*/}
    //                                 {/*<Route path="/exercise8" element={<Exercise8/>}/>*/}
    //                                 {/*<Route path="/exercise9" element={<Exercise9/>}/>*/}
    //                                 {/*<Route path="/exercise10" element={<Exercise10/>}/>*/}
    //                             </Routes>
    //
    //                         </Suspense>
    //                     </main>
    //                 </div>
    //             </Router>
    //         </Provider>
    //     </ThemeProvider>
    // )
}

export default App