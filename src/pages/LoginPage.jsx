import Login from "../components/Auth/Login";
import Header from "../components/common/Header";
import { useState } from "react";
import LineLoader from "../components/common/Loader/LineLoader";
export default function LoginPage () {
    let[loading,setLoading] = useState(false);
    return (
        <div>
            {loading ? ( <LineLoader /> ) : null}
            <Header />
            <Login setLoading={setLoading} />
        </div>
    )
}