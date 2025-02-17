import { Link, useParams } from "react-router"
import { getBlockData } from "../services/backend";
import { useQuery } from "@tanstack/react-query";

export const Block = () => {
  const { blockNumber } = useParams();

  const { data, isLoading, isError } = useQuery({ queryKey: ['blockData', blockNumber], queryFn: () => getBlockData(blockNumber || '') });

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
          Block data:
        </p>
        <table className="table">
          <tbody>
            {data.transactions.map((tx, index) => (
              <tr key={index}>
                <th>
                  Transaction {index + 1}:
                </th>
                <td>
                  <Link to={`/tx/${tx}`}> {tx} </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <pre className="border p-3">
          {JSON.stringify(data, null, 2) || 'No data'}
        </pre>
      </div>
    )
  }
}