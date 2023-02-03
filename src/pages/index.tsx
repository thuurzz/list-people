import { ReactNode, useEffect, useState } from "react";
import { People } from "types/IPeople";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import uuid from "react-uuid";
import Image from "next/image";
import { Button } from "@mui/material";

interface Row {
  picture: string;
  id: string;
  name: string;
  email: string;
  cell: string;
}

export default function Home() {
  const [listaDePessoas, setListaDePessoas] = useState<Row[]>([]);

  useEffect(() => {
    handleGetPeople();
  }, []);

  async function handleGetPeople() {
    const response = await fetch("https://randomuser.me/api/?results=5000");
    const data = await response.json();
    const pessoas: People[] = data.results;

    const rows = pessoas.map((p) => {
      return {
        id: p.id.value !== null ? p.id.value : uuid(),
        picture: p.picture.thumbnail,
        name: p.name.first,
        email: p.email,
        cell: p.cell,
      };
    });

    setListaDePessoas(rows);
  }

  const columns: GridColDef[] = [
    {
      field: "picture",
      headerName: "Picture",
      width: 150,
      renderCell: (link) => <img src={link.row.picture} alt={""} />,
    },
    { field: "id", headerName: "No.", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "cell", headerName: "Cell", width: 150 },
  ];

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <DataGrid rows={listaDePessoas} columns={columns} />
      </div>
    </>
  );
}
