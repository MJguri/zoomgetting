import Navi from "./Navi";

export default function Layout({children}){
    return (
        <>
            <Navi />
            <div>{children}</div>
        </>
        );
}