import {Head} from "next/document";

export default function Title({title}){
    return (
        <Head>
            <title>{title} | Zoomgetting</title>
        </Head>
    )
}