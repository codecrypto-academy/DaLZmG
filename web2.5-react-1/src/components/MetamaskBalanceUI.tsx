import { MetaMaskButton, useAccount, useSDK, useSignMessage } from "@metamask/sdk-react-ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../data/inputs";

function AppReady() {
  const {
    data: signData,
    isError: isSignError,
    isLoading: isSignLoading,
    isSuccess: isSignSuccess,
    signMessage,
  } = useSignMessage({
    message: "gm wagmi frens",
  })

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  };

  console.log(watch("walletId"));

  const { isConnected } = useAccount()

  const manageErrors = () => {
    console.log('Error managed');
    if (isSignSuccess || isSignError) {
      return (
        <div className="d-flex justify-content-center mt-3 w-50 mx-auto">
        <span className="mx-auto">
          {isSignSuccess && <div className="text-center">Signature: {signData}</div>}
          {isSignError && <div className="text-center">Error signing message</div>}
        </span>
      </div>
      )
    } else {
      return '';
    }
  }

  return (
    <div>
      <h3 className="text-center">Origen de la transacción</h3>
      <div className="d-flex justify-content-center mt-3">
        <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
      </div>
      {isConnected && (
        <>
          <div className="d-flex justify-content-center mt-3 w-50 mx-auto">
            <button className="form-control btn btn-primary" disabled={isSignLoading} onClick={() => signMessage()}>
              Sign message
            </button>
          </div>
          {manageErrors()}

          <form className="mx-auto my-5 col-12 col-md-6" onSubmit={handleSubmit(onSubmit)}>
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
        </>
      )}
    </div>
  )
}

export const MetamaskBalanceUI = () => {
  const { ready } = useSDK()

  if (!ready) {
    return (
      <div className='d-flex justify-content-center align-items-center h-50'>
        <h1>
          Loading...
        </h1>
      </div>
    )
  } else {
    return <AppReady />
  }

}
