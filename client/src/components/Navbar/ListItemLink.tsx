import { ElementType, forwardRef } from "react";
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { SvgIconProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";

type NavItem = {
  route: string;
  name: string;
  icon: ElementType<SvgIconProps>;
};

type Props = {
  open: boolean;
  item: NavItem;
};

const StyledNavLink = styled(RouterNavLink)(({ theme }) => ({
  "&.active": {
    backgroundColor: theme.palette.action.selected,

    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },

    "&:focus": {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => (
  <StyledNavLink ref={ref} {...props} />
));

const ListItemLink = ({ open, item }: Props) => {
  const { route, name, icon } = item;
  const NavIcon = icon;

  return (
    <Tooltip title={name} key={route} arrow placement={"right"}>
      <ListItemButton
        component={NavLink}
        to={route}
        sx={[
          {
            minHeight: 48,
            px: 2.5,
            "&.active": {
              backgroundColor: (theme) => theme.palette.action.selected,
              color: (theme) => theme.palette.primary.main,
            },
          },
          open
            ? {
                justifyContent: "initial",
              }
            : {
                justifyContent: "center",
              },
        ]}
      >
        {icon && (
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: "center",
            }}
          >
            <NavIcon color="primary" />
          </ListItemIcon>
        )}
      </ListItemButton>
    </Tooltip>
  );
};

export default ListItemLink;
