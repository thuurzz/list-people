import { useEffect, useState } from "react";
import { People } from "types/IPeople";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

export default function Home() {
  const [listaDePessoas, setListaDePessoas] = useState<People[]>([]);

  useEffect(() => {
    handleGetPeople();
  }, []);

  async function handleGetPeople() {
    const response = await fetch("https://randomuser.me/api/?results=1000");
    const data = await response.json();
    const pessoas: People[] = data.results;
    console.log(pessoas);
    setListaDePessoas(pessoas);
  }

  const columns: GridColDef[] = [
    { field: "picture", headerName: "Picture", width: 150 },
    { field: "id", headerName: "No.", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "cell", headerName: "Cell", width: 150 },
  ];

  const rows: GridRowsProp = [
    { id: 1, name: "Hello", email: "World" },
    { id: 2, name: "DataGridPro", email: "is Awesome" },
    { id: 3, name: "MUI", email: "is Amazing" },
  ];

  return (
    <>
      {/* {listaDePessoas.map((p) => {
        return <p key={p.id.value}>{p.name.first}</p>;
      })} */}
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
}
