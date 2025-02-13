import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../types/TypeInputs";

import './Faucet.css';

export const Faucet = () => {
  // const { wallet, setWallet } = useContext(UserContext);
  const [transMessage, setTransMessage] = useState<string | null>(null);
  const [transError, setTransError] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    requestTransfer(data);
  };

  const requestTransfer = ({ walletId, amount }: Inputs) => {
    setTransMessage(null);
    setTransError(null);

    if (amount <= 0) {
      setIsLoading(false);
      setTransError('(Transaction error: amount must be more than 0)');
      console.error('Error al realizar la transacción: el amount debe ser mayor que 0');
      return;
    }

    try {
      setIsLoading(true);
      fetch(`http://localhost:3000/api/faucet/${walletId}/${amount}`)
      .then(res => res.json())
      .then (data => {
        console.log(data);
        setIsLoading(false);
        setTransMessage('(Transaction successful)');
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
        setTransError('(Transaction error)');
      })
    } catch (error) {
      setTransMessage('(Transaction error ' + error + ')');
      setIsLoading(false);
      console.error('Error al realizar la transacción ', error);
    }
  }

  if (isLoading) {
    return (
      <div className='grid-template-columns text-center mt-5'>
        <h1>
          Loading...
        </h1>
        <img className="spinner" src="/spin.svg" />
      </div>
    )
  } else {
    return (
      <div>
        {/* <h1>Faucet</h1> */}
        <form className="mx-auto my-5 col-12 col-md-6" name='trans_form' onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-center">Destino de los fondos solicitados</h3>
          <div className="form-group mt-3">
            <input className="form-control" placeholder="0x0..." {...register("walletId", { required: true })} />
            {errors.walletId && <p className="mt-2 text-center font-italic">Este campo es obligatorio</p>}
          </div>
          <div className="form-group mt-3">
            <input className="form-control text-right" placeholder="0.00" {...register("amount", { required: true })} />
            {errors.amount && <p className="mt-2 text-center font-italic">Este campo es obligatorio</p>}
          </div>
          <div className="form-group mt-3">
            <input className="form-control btn btn-primary" type="submit" />
          </div>
          <div>
            {transMessage && <p className="text-center text-success font-italic">{transMessage}</p>}
            {transError && <p className="text-center text-danger font-italic">{transError}</p>}
          </div>
        </form>
      </div>
    )
  }
}