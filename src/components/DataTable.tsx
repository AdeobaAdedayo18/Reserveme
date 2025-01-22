interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T;
    cell?: (value: any) => React.ReactNode;
  }[];
}

const DataTable = ({ data, columns }: DataTableProps<T>) => {
  // Component logic here
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((row, i) => (
              <tr key={i}>
                {columns.map((column, j) => (
                  <td
                    key={j}
                    className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
                  >
                    {column.cell
                      ? column.cell(row[column.accessor])
                      : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
