import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Listmovie from './components/ListMovie';

import 'antd/dist/reset.css';
import { ToastContainer } from 'react-toastify';
import EditMovieTicket from './components/EditMovieTicket';

import { OpenRoutes } from './routing/OpenRoutes';
import CreateAccount from './view/Account/CreateAccount';
import OverviewAccount from './view/Account/ListAccount';
import ServiceBusinessAdmin from './view/BusinessAdmin/ServiceBusinessAdmin';
import AddMoviePage from './view/AddMoviePage';
import ListBusinessAdmin from './view/BusinessAdmin/ListBusinessAdmin';
import CreateCategory from './view/Category/CreateCategory';
import ListCategory from './view/Category/ListCategory';
import ListMoviePage from './view/ListMoviePage';
import CreateSubCategory from './view/SubCategory/CreateSubCategory';
import ListSubCategory from './view/SubCategory/ListSubCategory';
import LoginPage from './view/login_page';
import CreateBusinessAdmin from './view/BusinessAdmin/CreateBusinessAdmin';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <OpenRoutes>
                                <LoginPage />
                            </OpenRoutes>
                        }
                    />
                    <Route path="/listmovie">
                        <Route path=":id" element={<EditMovieTicket />} />
                        <Route index element={<ListMoviePage />} />
                    </Route>
                    <Route path="/listmovie1">
                        <Route path=":id" element={<EditMovieTicket />} />
                        <Route index element={<Listmovie />} />
                    </Route>
                    <Route path="/addmovie">
                        <Route path=":id" element={<AddMoviePage />} />
                        <Route index element={<AddMoviePage />} />
                    </Route>
                    <Route path="/addmovie1" element={<EditMovieTicket />} />
                    <Route path="/createAccount" element={<CreateAccount />} />
                    <Route
                        path="/createAccount/:id"
                        element={<CreateAccount />}
                    />
                    <Route
                        path="/listUsers"
                        element={<OverviewAccount />}
                    ></Route>
                    <Route
                        path="/createCategory"
                        element={<CreateCategory />}
                    />
                    <Route
                        path="/createCategory/:id"
                        element={<CreateCategory />}
                    />
                    <Route path="/listCategory" element={<ListCategory />} />
                    <Route
                        path="/createSubCategory"
                        element={<CreateSubCategory />}
                    />
                    <Route
                        path="/createSubCategory/:id"
                        element={<CreateSubCategory />}
                    />
                    <Route
                        path="/listSubCategory"
                        element={<ListSubCategory />}
                    />
                    <Route
                        path="/createBusinessAdmin"
                        element={<CreateBusinessAdmin />}
                    />

                    <Route path="/listBusinessAdmin">
                        <Route index element={<ListBusinessAdmin />} />
                        <Route path=":id" element={<ServiceBusinessAdmin />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
        </div>
    );
}

export default App;
