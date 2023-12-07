import Signup from "../components/Auth/Signup"
import Header from "../components/common/Header";
import LineLoader from "../components/common/Loader/LineLoader";
import { useState } from "react";
export default function SignupPage () {
    let[loading,setLoading] = useState(false);
    return (
        <div>
            {loading ? ( <LineLoader /> ) : null}
            <Header />
            <Signup  setLoading={setLoading} />
        </div>
    )
}