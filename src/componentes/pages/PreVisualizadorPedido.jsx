import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function CorrectRenderLink(props) {
  return (
    <Link tabIndex={props.tabIndex} href="/#tab-sequence">
      more info
    </Link>
  );
}

function WrongRenderLink() {
  return <Link href="/#tab-sequence">more info</Link>;
}

const correctColumns = [
  { field: "link", renderCell: CorrectRenderLink, width: 800 },
];

const wrongColumns = [
  { field: "link", renderCell: WrongRenderLink, width: 800 },
];

const rows = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export default function PreVisualizadorPedido() {
  return (
    <Grid
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      container
      spacing={1}
    >
      <Grid
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        item
        xs={12}
        md={12}
      >
        <Box sx={{ height: 300 }}>
          <DataGrid
            rows={rows}
            columns={correctColumns}
            hideFooterSelectedRowCount
          />
        </Box>
      </Grid>
    </Grid>
  );
}
