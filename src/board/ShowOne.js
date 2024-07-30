import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container} from "react-bootstrap";

let ShowOne = () => {
    // 비동기통신  // jquery axis  // nodejs axios
    let [data, setData] = useState({})
    let params = useParams()
    let id = parseInt(params.id)
    let navigate = useNavigate()

    let goBack = () =>{
        navigate(-1)
    }

    useEffect(()=>{
        let selectOne  = async()=>{
            try{
                let resp = await axios.get(`http://localhost:8080/board/showOne/` + id, {})
                //(json객체)
                if (resp.status === 200)
                    setData(resp.data) //javascript 객체로 바꿈
            }catch(e){
                console.error(e)
            }
        }
        //test() ->selectOne 으로 바뀜
        selectOne()
    }, [id])

    return (
        <Container className={"mt-3"}>

                <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <td colSpan={2}>제목: {data.title}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>글번호: {data.id}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>작성자: {data.writerId}</td>
                    </tr>
                    <tr>
                        <td>작성일:{data.writtenTime}</td>
                        <td>수정일:{data.modifiedTime}</td>
                    </tr>
                    <td colSpan={2}>내용: {data.text}</td>
                    </tbody>
                </Table>
        </Container>
    );

}
export default ShowOne