import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../services/backend";

export const Balance = () => {
  const { address } = useParams();

  const { data, isLoading, isError } = useQuery({ queryKey: ['balance', address], queryFn: () => getBalance(address || '')});

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center mt-5'>
        <h3>
          Loading...
        </h3>
      </div>
    )
  } else if (isError) {
    return (
      <div className='d-flex justify-content-center align-items-center h-50'>
        <h1>Error</h1>
      </div>
    )
  } else if (data) {
    return (
      <div className="py-3 my-4">
        <p className="text-center fs-5">
          Account Balance:
        </p>
        <pre className="border p-3">
            {JSON.stringify(data, null, 2) || 'No data'}
        </pre>
      </div>
    )
  }
}