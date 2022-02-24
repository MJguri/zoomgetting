import apiServer from "../../api/apiServer";
import {Router, useRouter} from "next/router";
import {useEffect} from "react";
import {useQuery} from "react-query";

export default function welcome() {
    // apiServer.post("login/getKaKaoAuthUrl", {})
    const router = useRouter()

    const {isLoading, error, data, isFetching} = useQuery("code", () => {
        apiServer.post("login/getKaKaoAuthUrl", router.query?.code).then((res) => res.json())
    })
    if(isLoading) return <div>loading</div>
    if (error) return <div>{`error : ${error?.message}`}</div>
    return (

        <>

            <div>회원가입 되었습니다.</div>
            <div> 더 많은 서비스를 이용하시기 위해 추가 정보를 등록하세요.</div>
            <button> 홈화면</button>
            <button> 등록</button>
        </>
    )
}