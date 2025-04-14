import { Link, Outlet, useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError();
    console.log(error);

    return (
        <>
            <nav>
                <Link to={"/"}>Customer</Link>
                <Link to={"/training"}>Training</Link>
            </nav>
            <Outlet />
            <h1>Page not found</h1>
        </>

    )
}