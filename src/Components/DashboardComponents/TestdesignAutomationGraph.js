export default function TestDesignAutomationGraph() {
  return (
    <Paper variant="outlined">
      <HighchartsReact highcharts={Highcharts} options={testDesignGraphData} />
      <Stack direction="row" spacing={1} style={{ marginLeft: "20px" }}>
        <Brightness5Icon style={{ color: "rgb(124, 181, 236)" }} />
        <Typography>Automation</Typography>
        <Language />
        <Typography>Defects</Typography>
        <AdbIcon style={{ color: "rgb(144, 237, 125)" }} />
        <Typography>Coverage</Typography>
      </Stack>
      <TableContainer style={{ marginTop: "20px", marginBottom: "10px" }}>
        <Table sx={{ minWidth: 600 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Summary</TableCell>
              <TableCell align="right">Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row_data.map((row) => (
              <TableRow
                key={row.summary}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.summary}
                </TableCell>
                <TableCell align="right">{row.info}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
