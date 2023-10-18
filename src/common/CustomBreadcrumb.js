import React from "react";
import { Breadcrumbs, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
function CustomBreadcrumb({ items, onClick }) {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      {items.map((item, index) => (
        <Link
          key={index}
          component={RouterLink}
          onClick={(event) => onClick(event, item)}
          to={`/dashboard/${item.toLowerCase()}`}
          style={{
            textDecoration: "none",
            color: "#00AB55",
            cursor: "pointer",
          }}
        >
          {item}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export default CustomBreadcrumb;
