import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import ShowOne from "./board/ShowOne";
import ShowList from "./board/showList";
import Write from "./Write";
import Update from "./update";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/board/ShowOne/:id" element={<ShowOne/>}/>
                <Route path="/board/ShowList/:pageNo" element={<ShowList/>}/>
                <Route path="/board/write" element={<Write/>}/>
                <Route path="/board/update/:boardNo" element={<Update/>}/>
            </Routes>
        </div>
    );
}

export default App;
