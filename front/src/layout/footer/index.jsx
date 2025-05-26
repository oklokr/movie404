import { Box, Typography } from "@mui/material"

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "#00000024",
        color: "gray",
        py: 4,
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        고객센터: 02-1234-5678 | 이메일: support@not404.com
      </Typography>
      <Typography variant="caption" color="gray">
        © {new Date().getFullYear()} Not404 Cinema. All rights reserved.
      </Typography>
    </Box>
  )
}
