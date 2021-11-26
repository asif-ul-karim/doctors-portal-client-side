import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_51Jw6oUBytNCHlzmuu2uxxiaIdY8dw5tPTujSw5AP1zEgmNGenV8DEsFHepZI3ACvggta7d8CuBAhjNTlrbsUpf7W00DVhTVSys')

const Payment = () => {
    const {appoinmentId} = useParams()
    const [appointment, setAppointment] = useState({})

    useEffect(()=>{
        fetch(`http://localhost:5000/appointments/${appoinmentId}`)
        .then(res=>res.json())
        .then(data=>setAppointment(data))
    },[appoinmentId])
    return (
        <div>
            <h2>Please Pay for :  {appointment.patientName} for {appointment.serviceName} </h2>
            <h4>Pay : ${appointment.price}</h4>
            <Elements stripe={stripePromise}>
            <CheckoutForm
            appointment={appointment}
            />
            </Elements>
        </div>
    );
};

export default Payment;