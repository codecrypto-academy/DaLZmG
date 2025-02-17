import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router";


type TypeFormData = {
  userData: number | string | null;
}

export const Header = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TypeFormData>();

  const saveWalletAddress: SubmitHandler<TypeFormData> = (data) => {
    const { userData } = data;

    if (userData) {
      if (/^\d+\.?\d*$/.test(userData.toString())) {
        // console.log("It's a number, check for block")
        navigate(`block/${userData}`, {});
      } else if (/^0x[a-fA-F0-9]{40}$/.test(userData.toString())) {
        // console.log("It's an eth wallet address")
        navigate(`balance/${userData}`, {});
      } else if (/^0x[a-fA-F0-9]{64}$/.test(userData.toString())) {
        // console.log("It's a tx address")
        navigate(`tx/${userData}`, {});
      } else {
        console.log("I don't know what it's")
      }
    }
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/codecrypto.png" alt="" width="30" className="d-inline-block align-text-top me-2"></img>
            Ethereum Explorer
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            </div>
          </div>
        </div>
      </nav>
      <div className="mt-2">
        <form className="input-group mw-[380px]" onSubmit={handleSubmit((data) => saveWalletAddress(data))}>
          <input className="form-control" {...register('userData')} />
          <button className="btn btn-primary">FIND</button>
        </form>
      </div>

    </header>
  )
}
