import {Button, Container, FormControl, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

let Update =()=> {
    let params = useParams()
    let boardNo = params.boardNo

    let [inputs,setInputs] = useState({
        title:'',
        text:''
    })
    let onChange = (e)=>{
        let {name,value} = e.target
        setInputs({
            ...inputs,
            [name]:value
        })
    }
    // let onSubmit= (e)=>{
    //     e.preventDefault()
    //     let resp = await axios.post(`http://localhost:8080/board/update/${id}`,inputs)
    //
    // }

    let navigate=useNavigate()
    let moveToNext=(boardNo)=>{
        navigate(`/board/showOne/${boardNo}`)
    }
    let onSubmit = async (e) =>{
        e.preventDefault()
        let resp= await axios.post(`http://localhost:8080/board/update`, inputs)
        if(resp.status === 200){
            moveToNext(resp.data.destId)
        }
    }
    useEffect(() => {
        let getUpdate = async()=>{
            let resp = await axios.get('http://localhost:8080/board/showOne/'+boardNo)
            if(resp.status === 200){
                // console.log(resp.data)
                setInputs(resp.data) //input 받는 코드
            }
        }
        getUpdate()

    }, []);

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <td colSpan={2}>{boardNo}번 글 수정하기</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>제목</td>
                        <td><FormControl type={'text'}
                                         name={'title'}
                                         value={inputs.title} onChange={onChange}
                        /></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                                <textarea
                                    name={'text'}
                                    className={'form-control'}
                                    value={inputs.text} onChange={onChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={'text-center'}>
                            <Button type={'submit'}>수정하기</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    );
}
export default Update