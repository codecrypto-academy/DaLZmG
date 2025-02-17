import { Link, useParams } from "react-router"
import { getTxData } from "../services/backend";
import { useQuery } from "@tanstack/react-query";

export const Tx = () => {
  const { txNumber } = useParams();

  const { data, isLoading, isError } = useQuery({ queryKey: ['txData', txNumber], queryFn: () => getTxData(txNumber || '')});

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
          Transaction data:
        </p>
        <table className="table">
          <tbody>
            <tr>
              <th>
                Block Number:
              </th>
              <td>
                <Link to={`/block/${data.blockNumber}`}> {data.blockNumber || ''} </Link>
              </td>
            </tr>
            <tr>
              <th>
                From:
              </th>
              <td>
                <Link to={`/balance/${data.from}`}> {data.from || ''} </Link>
              </td>
            </tr>
            <tr>
              <th>
                To:
              </th>
              <td>
                <Link to={`/balance/${data.to}`}> {data.to || ''} </Link>
              </td>
            </tr>
            <tr>
              <th>
                Value:
              </th>
              <td>
                {data.value || ''}
              </td>
            </tr>
          </tbody>
        </table>
        <pre className="border p-3">
            {JSON.stringify(data, null, 2) || 'No data'}
        </pre>
      </div>
    )
  }
}