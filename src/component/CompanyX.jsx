import { Button } from 'antd'
import Input from 'antd/lib/input/Input'
import React, { useEffect, useState } from 'react'
import "./CompantX.css"
const CompanyX = () => {

    const [pincode, setPincode] = useState([]);
    const [company, setCompany] = useState([]);

    const [pin, setPin] = useState("");
    const [weight, setWeight] = useState("");
    const [ratetype, setRatetype] = useState("");

    const [display, setDisplay] = useState(0);




    const getPinCodeData = async() => {
        await fetch(`https://couriercompanyx.herokuapp.com/PinCode`)
        .then((d) => d.json())
        .then((res) =>{
            setPincode(res);
            // console.log(res);
        })
    }

    const getCompanyData = async() => {
        await fetch(`https://couriercompanyx.herokuapp.com/CourierCompany`)
        .then((d) => d.json())
        .then((res) =>{
            setCompany(res);
            // console.log(res);
        })
    }


      useEffect(()=>{
        getPinCodeData()
        getCompanyData()
    },[]);


    const btnSubmit = (e) =>{
        e.preventDefault();

        let filterPin = pincode.filter((e)=>{
            return +pin === e.CustomerPincode
        })
        // filterZone(filterPin)

        let zone = filterPin.map((e) => {
                return e.Zone;
        })
        let filterzone = zone.join("");
        let priz = company.filter((e)=>{
            return filterzone === e.Zone && ratetype === e.RateType;
        })
        // checkprice(priz);

        let first_Price = priz.map((e) =>{
            return e.First
        });

        let afterAdd_Price = priz.map((e) =>{
            return e.Every_Additional
        });


        let firstKg_Price  = +first_Price.join("")
        let After_Add_Price = +afterAdd_Price.join("")

        let weightinto2 = Math.floor(2 * weight);

        let finalPrice = firstKg_Price;
        for(let i = 1; i < weightinto2; i++){
            finalPrice +=After_Add_Price
        }


        setDisplay(finalPrice.toFixed(2))
        console.log(finalPrice.toFixed(2));

        
    }



  return (
    <div className="div_main">


        <form>
            <Input className="Input_box" type="number" placeholder="Enter PinCode" onChange={(e) => setPin(e.target.value)}/>
            <br />
            <Input className="Input_box" type="number" placeholder="Weight In Kg" onChange={(e) => setWeight(e.target.value)}/>
            <br />
            <select defaultValue="RateType" className="select_box" onChange={(e) => setRatetype(e.target.value) } >
                <option value="Forward">Forward</option>
                <option value="Forward & RTO">Forward & RTO</option>
            </select>
            <br />
            <Button className="btn" onClick={btnSubmit}>Check Final Price</Button>
        </form>

        <h2 className="display">Expected Rate:-► {display}</h2>

    </div>
  )
}

export default CompanyX