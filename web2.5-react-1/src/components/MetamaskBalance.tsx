import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../data/inputs";

export const MetamaskBalance = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  };

  console.log(watch("walletId"));

  return (
    <>
      <div className="">
        <button style={{ padding: 10, margin: 10 }} onClick={connect}>
          Connect
        </button>
        {connected && (
          <div>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}

            <form className="mx-auto my-5 w-50" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-center">Destino de la transacción</h3>
              <div className="form-group mt-3">
                <input className="form-control" placeholder="0x0..." {...register("walletId", { required: true })} />
                {errors.walletId && <span>This field is required</span>}
              </div>
              <div className="form-group mt-3">
                <input className="form-control text-right" placeholder="0.00" {...register("amount", { required: true })} />
                {errors.amount && <span>This field is required</span>}
              </div>
              <div className="form-group mt-3">
                <input className="form-control btn btn-primary" type="submit" />
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};