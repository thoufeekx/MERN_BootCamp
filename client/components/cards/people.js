import { Avatar } from "antd";
import { useContext } from "react";
import moment from 'moment';
import { useRouter } from "next/router";
import { UserContext } from "../../context";


//function to display follow part

const People = ({people}) =>{
    //{people} is props from parent component

    // state hooks

    //context
    const [state] = useContext(UserContext);
    const router = useRouter();


    return (
        <>
        <pre>{JSON.stringify(people, null, 4)}</pre>
        </>
    )
}

export default People;